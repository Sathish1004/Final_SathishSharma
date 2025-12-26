
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import FeatureGuard from "@/components/FeatureGuard";
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    Code2,
    Play,
    CheckCircle2,
    Trophy,
    Zap,
    TrendingUp,
    Clock,
    RotateCcw,
    ChevronRight,
    Star,
    Award,
    BookOpen,
    Filter,
    Search,
    Cpu,
    Database,
    Globe,
    Layout,
    Server,
    Smartphone,
    Terminal,
    AlertCircle,
    Check,
    X,
    Maximize2,
    Minimize2,
    Settings,
    Share2,
    Copy
} from 'lucide-react';
import Editor from "@monaco-editor/react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';

// Mock Data
const problems = [
    {
        id: 1,
        title: "Two Sum",
        difficulty: "Easy",
        topic: "Arrays",
        acceptance: "48.2%",
        solved: false,
        description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
        examples: [
            { input: "nums = [2,7,11,15], target = 9", output: "[0,1]", explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]." },
            { input: "nums = [3,2,4], target = 6", output: "[1,2]" }
        ],
        constraints: ["2 <= nums.length <= 10^4", "-10^9 <= nums[i] <= 10^9", "-10^9 <= target <= 10^9"]
    },
    {
        id: 2,
        title: "Add Two Numbers",
        difficulty: "Medium",
        topic: "Linked List",
        acceptance: "39.1%",
        solved: true,
        description: "You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit.",
        examples: [],
        constraints: []
    },
    {
        id: 3,
        title: "Median of Two Sorted Arrays",
        difficulty: "Hard",
        topic: "Arrays",
        acceptance: "32.5%",
        solved: false,
        description: "Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.",
        examples: [],
        constraints: []
    },
    // Added more problems for diversity
    {
        id: 4,
        title: "Valid Parentheses",
        difficulty: "Easy",
        topic: "Stack",
        acceptance: "40.5%",
        solved: true,
        description: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
        examples: [],
        constraints: []
    },
    {
        id: 5,
        title: "Merge Intervals",
        difficulty: "Medium",
        topic: "Arrays",
        acceptance: "43.2%",
        solved: false,
        description: "Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals.",
        examples: [],
        constraints: []
    }
];

const codingKits = [
    {
        id: 1,
        title: "Blind 75",
        subtitle: "Must-do LeetCode",
        progress: 45,
        total: 75,
        color: "from-amber-500 to-orange-500",
        icon: <Target className="h-6 w-6 text-white" />
    },
    {
        id: 2,
        title: "NeetCode 150",
        subtitle: "Complete Roadmap",
        progress: 12,
        total: 150,
        color: "from-blue-500 to-cyan-500",
        icon: <Globe className="h-6 w-6 text-white" />
    },
    {
        id: 3,
        title: "Striver's SDE Sheet",
        subtitle: "Interview Ready",
        progress: 68,
        total: 180,
        color: "from-emerald-500 to-green-500",
        icon: <Briefcase className="h-6 w-6 text-white" />
    },
    {
        id: 4,
        title: "Company Wise",
        subtitle: "FAANG Prep",
        progress: 20,
        total: 200,
        color: "from-purple-500 to-pink-500",
        icon: <Building2 className="h-6 w-6 text-white" />
    }
];

const topics = [
    { name: "Arrays & Hashing", count: 45, color: "text-blue-500", bg: "bg-blue-500/10" },
    { name: "Two Pointers", count: 23, color: "text-green-500", bg: "bg-green-500/10" },
    { name: "Stack", count: 31, color: "text-purple-500", bg: "bg-purple-500/10" },
    { name: "Binary Search", count: 28, color: "text-amber-500", bg: "bg-amber-500/10" },
    { name: "Sliding Window", count: 15, color: "text-rose-500", bg: "bg-rose-500/10" },
    { name: "Linked List", count: 35, color: "text-cyan-500", bg: "bg-cyan-500/10" },
    { name: "Trees", count: 52, color: "text-emerald-500", bg: "bg-emerald-500/10" },
    { name: "Dynamic Programming", count: 64, color: "text-indigo-500", bg: "bg-indigo-500/10" },
];

const badges = [
    { id: 1, name: "Problem Solver", icon: <Trophy className="h-5 w-5" />, color: "text-yellow-500" },
    { id: 2, name: "30 Day Streak", icon: <Zap className="h-5 w-5" />, color: "text-blue-500" },
    { id: 3, name: "Algo Master", icon: <BrainCircuit className="h-5 w-5" />, color: "text-purple-500" },
];

import { BrainCircuit, Briefcase, Building2, Target } from "lucide-react";

export default function CodingPlatform() {
    const [selectedProblem, setSelectedProblem] = useState<typeof problems[0] | null>(null);
    const [activeTab, setActiveTab] = useState("description");
    const [code, setCode] = useState("// Write your solution here\nclass Solution {\n    public int[] twoSum(int[] nums, int target) {\n        \n    }\n}");
    const [language, setLanguage] = useState("java");
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [output, setOutput] = useState<string | null>(null);
    const [isRunning, setIsRunning] = useState(false);
    const [solvedProblems, setSolvedProblems] = useState<number[]>([2, 4]); // Mock initial solved
    const { toast } = useToast();
    const [searchQuery, setSearchQuery] = useState("");

    // Filtering logic
    const filteredProblems = problems.filter(p =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.topic.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Stats
    const solvedCount = solvedProblems.length;
    const totalProblems = problems.length; // In real app, total in database
    const earnedBadges = badges; // In real app, fetch based on user progress

    const handleRunCode = () => {
        setIsRunning(true);
        setOutput(null);

        // Simulate code execution
        setTimeout(() => {
            setIsRunning(false);
            // Simple mock outcome
            const isSuccess = Math.random() > 0.3;
            if (isSuccess) {
                setOutput("Accepted\nRuntime: 2ms\nMemory: 42.5MB");
                if (selectedProblem && !solvedProblems.includes(selectedProblem.id)) {
                    setSolvedProblems([...solvedProblems, selectedProblem.id]);
                    toast({
                        title: "🎉 Problem Solved!",
                        description: `You've successfully solved ${selectedProblem.title}`,
                    });
                } else {
                    toast({
                        title: "✅ Test Cases Passed",
                        description: "Good job! Code is working efficiently.",
                    });
                }
            } else {
                setOutput("Compilation Error\nLine 12: cannot find symbol\n  symbol: variable map");
                toast({
                    title: "❌ Compilation Error",
                    description: "Check your syntax and try again.",
                    variant: "destructive"
                });
            }
        }, 1500);
    };

    const getDifficultyColor = (diff: string) => {
        switch (diff) {
            case 'Easy': return 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20';
            case 'Medium': return 'text-amber-500 bg-amber-500/10 border-amber-500/20';
            case 'Hard': return 'text-rose-500 bg-rose-500/10 border-rose-500/20';
            default: return 'text-muted-foreground';
        }
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setIsFullScreen(false);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    useEffect(() => {
        if (selectedProblem) {
            // Reset code template based on language (mock)
            setCode(`// Write your ${language} solution for ${selectedProblem.title}\nclass Solution {\n    // ... \n}`);
            setOutput(null);
            setActiveTab("description");
        }
    }, [selectedProblem]);


    useEffect(() => {
        // Update solved status for problems
        problems.forEach(p => {
            p.solved = solvedProblems.includes(p.id);
        });
    }, [solvedProblems]);

    return (
        <FeatureGuard feature="coding">
            <div className="space-y-6 animate-fade-in bg-gradient-to-br from-background via-background to-primary/5 min-h-screen p-4 md:p-6">
                {/* Header with Stats (Same as before) */}
                {!selectedProblem && (
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                                Coding Platform
                            </h1>
                            <p className="text-muted-foreground mt-1">
                                Master DSA through kits and real-world scenarios
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-4">
                            {/* Stats Cards */}
                            <div className="flex items-center gap-2 bg-gradient-to-r from-primary/5 to-primary/10 px-4 py-2 rounded-lg border border-primary/20">
                                <Trophy className="h-5 w-5 text-amber-500" />
                                <div>
                                    <p className="text-sm font-medium">Problems Solved</p>
                                    <p className="text-xl font-bold">{solvedCount}<span className="text-sm text-muted-foreground">/{totalProblems}</span></p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 bg-gradient-to-r from-blue-500/5 to-blue-500/10 px-4 py-2 rounded-lg border border-blue-500/20">
                                <Zap className="h-5 w-5 text-blue-500" />
                                <div>
                                    <p className="text-sm font-medium">Day Streak</p>
                                    <p className="text-xl font-bold">15</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 bg-gradient-to-r from-emerald-500/5 to-emerald-500/10 px-4 py-2 rounded-lg border border-emerald-500/20">
                                <Award className="h-5 w-5 text-emerald-500" />
                                <div>
                                    <p className="text-sm font-medium">Badges</p>
                                    <p className="text-xl font-bold">{earnedBadges.length}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Main Content Area */}
                {selectedProblem ? (
                    // Coding Workspace (Problem Selected)
                    <div className={`grid ${isFullScreen ? 'fixed inset-0 z-50 bg-background p-0' : 'grid-cols-1 lg:grid-cols-2 gap-4 h-[calc(100vh-12rem)]'}`}>
                        {/* Left Panel: Problem Description */}
                        <Card className={`flex flex-col h-full border-border/50 backdrop-blur-sm bg-background/80 ${isFullScreen ? 'rounded-none border-0' : ''}`}>
                            <CardHeader className="flex flex-row items-center justify-between py-3 px-4 border-b border-border/50">
                                <div className="flex items-center gap-3">
                                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setSelectedProblem(null)}>
                                        <ChevronRight className="h-5 w-5 rotate-180" />
                                    </Button>
                                    <div>
                                        <CardTitle className="text-base flex items-center gap-2">
                                            {selectedProblem.id}. {selectedProblem.title}
                                            {selectedProblem.solved && <CheckCircle2 className="h-4 w-4 text-emerald-500" />}
                                        </CardTitle>
                                    </div>
                                    <Badge variant="outline" className={`${getDifficultyColor(selectedProblem.difficulty)} text-xs px-2 py-0.5`}>
                                        {selectedProblem.difficulty}
                                    </Badge>
                                </div>
                                <div className="flex items-center gap-1">
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => {
                                                    const newStatus = solvedProblems.includes(selectedProblem.id)
                                                        ? solvedProblems.filter(id => id !== selectedProblem.id)
                                                        : [...solvedProblems, selectedProblem.id];
                                                    setSolvedProblems(newStatus);
                                                }}>
                                                    <Star className={`h-4 w-4 ${solvedProblems.includes(selectedProblem.id) ? 'fill-amber-500 text-amber-500' : 'text-muted-foreground'}`} />
                                                </Button>
                                            </TooltipTrigger>
                                            <TooltipContent>Todo / Favorite</TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                </div>
                            </CardHeader>
                            <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col min-h-0">
                                <div className="px-4 border-b border-border/50">
                                    <TabsList className="w-auto justify-start h-9 bg-transparent p-0">
                                        <TabsTrigger value="description" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-4 bg-transparent">
                                            Description
                                        </TabsTrigger>
                                        <TabsTrigger value="solution" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-4 bg-transparent">
                                            Solution
                                        </TabsTrigger>
                                        <TabsTrigger value="submissions" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-4 bg-transparent">
                                            Submissions
                                        </TabsTrigger>
                                    </TabsList>
                                </div>
                                <TabsContent value="description" className="flex-1 overflow-auto p-4 space-y-4">
                                    <div className="prose dark:prose-invert max-w-none">
                                        <p>{selectedProblem.description}</p>

                                        {selectedProblem.examples.length > 0 && (
                                            <div className="space-y-3 mt-4">
                                                <h3 className="font-semibold text-sm">Examples:</h3>
                                                {selectedProblem.examples.map((ex, i) => (
                                                    <div key={i} className="bg-muted/50 p-3 rounded-md text-sm border border-border/50">
                                                        <p><strong className="text-muted-foreground">Input:</strong> <code className="bg-background px-1 rounded">{ex.input}</code></p>
                                                        <p><strong className="text-muted-foreground">Output:</strong> <code className="bg-background px-1 rounded">{ex.output}</code></p>
                                                        {ex.explanation && <p className="mt-1 text-muted-foreground">{ex.explanation}</p>}
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        {selectedProblem.constraints.length > 0 && (
                                            <div className="space-y-2 mt-4">
                                                <h3 className="font-semibold text-sm">Constraints:</h3>
                                                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                                                    {selectedProblem.constraints.map((c, i) => (
                                                        <li key={i} className="font-mono text-xs bg-muted/30 w-fit px-2 py-0.5 rounded">{c}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                    
                                    <div className="mt-8 pt-4 border-t border-border/50 grid grid-cols-2 gap-4 text-xs text-muted-foreground">
                                        <div>
                                            <span className="font-medium">Acceptance:</span> {selectedProblem.acceptance}
                                        </div>
                                        <div>
                                            <span className="font-medium">Topic:</span> {selectedProblem.topic}
                                        </div>
                                    </div>
                                </TabsContent>
                                <TabsContent value="solution" className="flex-1 p-4 flex items-center justify-center text-muted-foreground">
                                    <div className="text-center">
                                        <Lock className="h-8 w-8 mx-auto mb-2 opacity-50" />
                                        <p>Solution is locked. Solve the problem to unlock.</p>
                                    </div>
                                </TabsContent>
                                <TabsContent value="submissions" className="flex-1 p-4">
                                    <div className="text-center text-muted-foreground">
                                        <p>No submissions yet.</p>
                                    </div>
                                </TabsContent>
                            </Tabs>
                        </Card>

                        {/* Right Panel: Code Editor */}
                        <div className="flex flex-col h-full gap-2">
                            <Card className={`flex flex-col flex-1 border-border/50 overflow-hidden shadow-lg ${isFullScreen ? 'rounded-none border-0' : ''}`}>
                                <div className="flex items-center justify-between p-2 bg-muted/30 border-b border-border/50">
                                    <div className="flex items-center gap-2">
                                        <Select value={language} onValueChange={setLanguage}>
                                            <SelectTrigger className="h-8 w-[120px] bg-background/50 border-border/50 focus:ring-0">
                                                <div className="flex items-center gap-2">
                                                    <Code2 className="h-3.5 w-3.5 text-primary" />
                                                    <SelectValue />
                                                </div>
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="java">Java</SelectItem>
                                                <SelectItem value="cpp">C++</SelectItem>
                                                <SelectItem value="python">Python</SelectItem>
                                                <SelectItem value="javascript">JavaScript</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <div className="h-4 w-[1px] bg-border/50 mx-1" />
                                        <Button variant="ghost" size="sm" className="h-8 px-2 text-xs text-muted-foreground hover:text-foreground">
                                            <RotateCcw className="h-3.5 w-3.5 mr-1" />
                                            Reset
                                        </Button>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setIsFullScreen(!isFullScreen)}>
                                                        {isFullScreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                                                    </Button>
                                                </TooltipTrigger>
                                                <TooltipContent>{isFullScreen ? 'Exit Full Screen' : 'Full Screen'}</TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </div>
                                </div>
                                <div className="flex-1 relative min-h-0 bg-[#1e1e1e]">
                                    <Editor
                                        height="100%"
                                        language={language}
                                        value={code}
                                        onChange={(value) => setCode(value || "")}
                                        theme="vs-dark"
                                        options={{
                                            minimap: { enabled: false },
                                            fontSize: 14,
                                            scrollBeyondLastLine: false,
                                            automaticLayout: true,
                                            padding: { top: 16 },
                                            fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                                        }}
                                    />
                                </div>
                                <div className="p-3 bg-muted/30 border-t border-border/50 flex items-center justify-between">
                                    <Button variant="ghost" size="sm" className="h-8 text-xs">
                                        Console
                                    </Button>
                                    <div className="flex items-center gap-2">
                                        <Button variant="outline" size="sm" className="h-8" onClick={handleRunCode} disabled={isRunning}>
                                            Run Code
                                        </Button>
                                        <Button size="sm" className="h-8 gap-2 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white border-0" onClick={handleRunCode} disabled={isRunning}>
                                            {isRunning ? (
                                                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                            ) : (
                                                <Play className="h-3.5 w-3.5 fill-current" />
                                            )}
                                            Submit
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                            
                            {output && (
                                <Card className="h-1/3 min-h-[150px] border-border/50 animate-in slide-in-from-bottom duration-300">
                                    <CardHeader className="py-2 px-4 border-b border-border/50 flex flex-row items-center justify-between">
                                        <span className={`text-xs font-bold uppercase tracking-wider ${output.includes("Error") ? "text-destructive" : "text-emerald-500"}`}>
                                            {output.includes("Error") ? "Compilation Error" : "Accepted"}
                                        </span>
                                        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setOutput(null)}>
                                            <X className="h-3 w-3" />
                                        </Button>
                                    </CardHeader>
                                    <CardContent className="p-0 h-full overflow-hidden">
                                        <ScrollArea className="h-full p-4 font-mono text-sm">
                                            <pre className="whitespace-pre-wrap">{output}</pre>
                                        </ScrollArea>
                                    </CardContent>
                                </Card>
                            )}
                        </div>
                    </div>
                ) : (
                    // Problem List View (Overview)
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                            {codingKits.map((kit) => (
                                <Card key={kit.id} className="relative overflow-hidden group hover:shadow-lg transition-all duration-300 border-border/50 cursor-pointer">
                                    <div className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b ${kit.color}`} />
                                    <CardContent className="p-5">
                                        <div className="flex items-start justify-between mb-4">
                                            <div className={`p-2 rounded-lg bg-gradient-to-br ${kit.color} shadow-lg`}>
                                                {kit.icon}
                                            </div>
                                            <Badge variant="outline" className="bg-background/50 backdrop-blur">
                                                {Math.round((kit.progress / kit.total) * 100)}%
                                            </Badge>
                                        </div>
                                        <h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">{kit.title}</h3>
                                        <p className="text-sm text-muted-foreground mb-4">{kit.subtitle}</p>
                                        <div className="space-y-1">
                                            <div className="flex justify-between text-xs text-muted-foreground">
                                                <span>Progress</span>
                                                <span>{kit.progress}/{kit.total}</span>
                                            </div>
                                            <Progress value={(kit.progress / kit.total) * 100} className="h-1.5" />
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                            {/* Topics Sidebar */}
                            <div className="space-y-4">
                                <Card className="border-border/50 bg-background/80 backdrop-blur-sm sticky top-6">
                                    <CardHeader>
                                        <CardTitle className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                                            Topics
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-2">
                                        {topics.map((topic, i) => (
                                            <div key={i} className="flex items-center justify-between p-2 rounded-md hover:bg-muted/50 cursor-pointer transition-colors text-sm group">
                                                <div className="flex items-center gap-2">
                                                    <div className={`h-2 w-2 rounded-full ${topic.bg.replace('/10', '')}`} />
                                                    <span className="group-hover:text-foreground transition-colors">{topic.name}</span>
                                                </div>
                                                <Badge variant="secondary" className="h-5 px-1.5 text-[10px] font-mono">
                                                    {topic.count}
                                                </Badge>
                                            </div>
                                        ))}
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Problems List */}
                            <Tabs defaultValue="problems" className="lg:col-span-3">
                                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
                                    <div className="relative w-full sm:w-80">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            placeholder="Search problems..."
                                            className="pl-9 bg-background/50 border-border/50"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                        />
                                    </div>
                                    <div className="flex items-center gap-2 w-full sm:w-auto">
                                        <Button variant="outline" size="sm" className="gap-2 flex-1 sm:flex-none">
                                            <Filter className="h-4 w-4" />
                                            Filter
                                        </Button>
                                        <Select defaultValue="all">
                                            <SelectTrigger className="w-[130px] h-9">
                                                <SelectValue placeholder="Difficulty" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="all">All Levels</SelectItem>
                                                <SelectItem value="easy">Easy</SelectItem>
                                                <SelectItem value="medium">Medium</SelectItem>
                                                <SelectItem value="hard">Hard</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <Card className="border-border/50 overflow-hidden">
                                    <CardContent className="p-0">
                                        <div className="overflow-x-auto">
                                            <table className="w-full text-sm text-left">
                                                <thead className="text-xs text-muted-foreground uppercase bg-muted/30 border-b border-border/50">
                                                    <tr>
                                                        <th className="px-6 py-3 font-medium">Status</th>
                                                        <th className="px-6 py-3 font-medium">Title</th>
                                                        <th className="px-6 py-3 font-medium">Acceptance</th>
                                                        <th className="px-6 py-3 font-medium">Difficulty</th>
                                                        <th className="px-6 py-3 font-medium text-right">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-border/50">
                                                    {filteredProblems.map((prob) => (
                                                        <tr key={prob.id} className="bg-background/50 hover:bg-muted/30 transition-colors group">
                                                            <td className="px-6 py-4">
                                                                {prob.solved ? (
                                                                    <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                                                                ) : (
                                                                    <div className="h-5 w-5 rounded-full border-2 border-muted-foreground/30 group-hover:border-primary/50 transition-colors" />
                                                                )}
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                <div className="font-medium text-foreground group-hover:text-primary transition-colors cursor-pointer" onClick={() => setSelectedProblem(prob)}>
                                                                    {prob.id}. {prob.title}
                                                                </div>
                                                                <div className="text-xs text-muted-foreground mt-0.5 md:hidden">
                                                                    {prob.topic}
                                                                </div>
                                                            </td>
                                                            <td className="px-6 py-4 text-muted-foreground">
                                                                {prob.acceptance}
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                <Badge variant="outline" className={getDifficultyColor(prob.difficulty)}>
                                                                    {prob.difficulty}
                                                                </Badge>
                                                            </td>
                                                            <td className="px-6 py-4 text-right">
                                                                <Button size="sm" variant="ghost" className="opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => setSelectedProblem(prob)}>
                                                                    Solve <ChevronRight className="h-4 w-4 ml-1" />
                                                                </Button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Tabs>
                        </div>
                    </>
                )}
            </div>
        </FeatureGuard>
    );
}

import { Loader2, Lock } from 'lucide-react';