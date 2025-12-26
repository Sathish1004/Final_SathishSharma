import db from '../config/db.js';

export const getSettings = async (req, res) => {
    try {
        const userId = req.user.id;
        const [rows] = await db.query('SELECT * FROM profile_settings WHERE user_id = ?', [userId]);

        if (rows.length === 0) {
            // Create default settings if not exists
            await db.query('INSERT INTO profile_settings (user_id) VALUES (?)', [userId]);
            return res.json({
                show_courses: 0,
                show_coding: 0,
                show_projects: 0,
                show_certificates: 0,
                show_hours: 0
            });
        }

        res.json(rows[0]);
    } catch (error) {
        console.error('Error fetching profile settings:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const updateSettings = async (req, res) => {
    try {
        const userId = req.user.id;
        const { show_courses, show_coding, show_projects, show_certificates, show_hours } = req.body;

        await db.query(
            `INSERT INTO profile_settings (user_id, show_courses, show_coding, show_projects, show_certificates, show_hours)
             VALUES (?, ?, ?, ?, ?, ?)
             ON DUPLICATE KEY UPDATE
             show_courses = VALUES(show_courses),
             show_coding = VALUES(show_coding),
             show_projects = VALUES(show_projects),
             show_certificates = VALUES(show_certificates),
             show_hours = VALUES(show_hours)`,
            [userId, show_courses, show_coding, show_projects, show_certificates, show_hours]
        );

        res.json({ message: 'Settings updated successfully' });
    } catch (error) {
        console.error('Error updating profile settings:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
