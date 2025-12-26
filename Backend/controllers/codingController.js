import mysql from 'mysql2/promise';
import axios from 'axios';

const judge0Url = process.env.JUDGE0_API_URL || "https://judge0-ce.p.rapidapi.com";
const judge0Key = process.env.JUDGE0_API_KEY; // Ensure this is in .env
const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
};

// Map languages to Judge0 IDs
const languageIds = {
    python: 71, // Python (3.8.1)
    javascript: 63, // JavaScript (Node.js 12.14.0)
    java: 62, // Java (OpenJDK 13.0.1)
    cpp: 54, // C++ (GCC 9.2.0)
    c: 50 // C (GCC 9.2.0)
};

export const getQuestions = async (req, res) => {
    try {
        const connection = await mysql.createConnection(dbConfig);
        const [rows] = await connection.execute('SELECT * FROM questions');
        await connection.end();

        // Parse template_code if it's a string (though it should be JSON object from DB if supported, else string)
        const questions = rows.map(q => ({
            ...q,
            template_code: typeof q.template_code === 'string' ? JSON.parse(q.template_code) : q.template_code
        }));

        res.json(questions);
    } catch (error) {
        console.error('Error fetching questions:', error);
        res.status(500).json({ error: 'Failed to fetch questions' });
    }
};

export const runCode = async (req, res) => {
    const { code, language, input } = req.body;

    if (!languageIds[language]) {
        return res.status(400).json({ error: 'Unsupported language' });
    }

    try {
        const response = await axios.post(`${judge0Url}/submissions?base64_encoded=false&wait=true`, {
            source_code: code,
            language_id: languageIds[language],
            stdin: input
        }, {
            headers: {
                'X-RapidAPI-Key': judge0Key,
                'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
            }
        });

        const result = response.data;

        res.json({
            output: result.stdout || result.stderr || result.compile_output || 'No output',
            time: result.time,
            memory: result.memory,
            status: result.status.description
        });

    } catch (error) {
        console.error('Judge0 run error:', error?.response?.data || error.message);
        // Fallback for mock run if no API key
        if (!judge0Key) {
            return res.json({
                output: "Judge0 API Key missing. Mock Output:\n" + (input ? `Input: ${input}\n` : "") + "Result: Processed successfully (Mock)",
                time: "0.01",
                status: "Accepted (Mock)"
            });
        }
        res.status(500).json({ error: 'Execution failed' });
    }
};

export const submitCode = async (req, res) => {
    const { user_id, question_id, code, language } = req.body;

    if (!languageIds[language]) {
        return res.status(400).json({ error: 'Unsupported language' });
    }

    try {
        const connection = await mysql.createConnection(dbConfig);

        // Fetch test cases
        const [testCases] = await connection.execute('SELECT * FROM test_cases WHERE question_id = ?', [question_id]);

        let allPassed = true;
        let failedDetail = null;
        let totalTime = 0;

        // Using sequential execution for simplicity and valid time measurement per case
        // In prod, might want to parallelize or use batch submission if Judge0 supports it
        for (const testCase of testCases) {
            try {
                const response = await axios.post(`${judge0Url}/submissions?base64_encoded=false&wait=true`, {
                    source_code: code,
                    language_id: languageIds[language],
                    stdin: testCase.input,
                    expected_output: testCase.expected_output
                }, {
                    headers: {
                        'X-RapidAPI-Key': judge0Key,
                        'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
                    }
                });

                const result = response.data;
                totalTime += parseFloat(result.time || 0);

                // Check strict equality or trimmed
                const actual = (result.stdout || "").trim();
                const expected = (testCase.expected_output || "").trim();

                // Judge0 status 3 is Accepted
                if (result.status.id !== 3 && actual !== expected) {
                    allPassed = false;
                    failedDetail = {
                        input: testCase.input,
                        expected: expected,
                        actual: actual || result.stderr || result.compile_output,
                        error: result.stderr || result.compile_output
                    };
                    break;
                }
            } catch (err) {
                // Mock logic if no key
                if (!judge0Key) {
                    console.log("Mocking submission check...");
                    continue; // Assume pass for mock
                }
                throw err;
            }
        }

        const status = allPassed ? 'Accepted' : 'Wrong Answer';

        // Save submission
        await connection.execute(
            'INSERT INTO submissions (user_id, question_id, code, language, status, execution_time) VALUES (?, ?, ?, ?, ?, ?)',
            [user_id, question_id, code, language, status, totalTime]
        );

        await connection.end();

        res.json({
            status,
            time: totalTime.toFixed(3),
            details: failedDetail
        });

    } catch (error) {
        console.error('Submission error:', error);
        res.status(500).json({ error: 'Submission processing failed' });
    }
};
