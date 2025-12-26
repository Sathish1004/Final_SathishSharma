import { useState, useEffect } from "react";
import {
    Users,
    BookOpen,
    Code,
    Trophy,
    Briefcase,
    GraduationCap,
    FolderKanban,
    Zap,
    TrendingUp,
    Activity,
    MoreHorizontal,
    ArrowUpRight,
    Calendar,
    Clock,
    UserCheck,
    MessageSquare,
    Plus
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import QuickAccessDrawer from "@/components/admin/QuickAccessDrawer";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip as RechartsTooltip,
    ResponsiveContainer,
    AreaChart,
    Area
} from "recharts";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface CoderStats {
    rank: number;
    name: string;
    email: string;
    solved: number;
    percent: string;
    active: string;
}

interface Course {
    name: string;
    students: number;
    progress: number;
}

interface CourseStats {
    total_enrollments: number;
    completion_rate: string;
    top_courses: Course[];
}

interface MentorshipSession {
    name: string;
    email: string;
    mentor: string;
    time: string;
    status: string;
}

interface MentorshipStats {
    total_sessions: number;
    active_mentors: number;
    upcoming_sessions: MentorshipSession[];
}

interface ProjectStats {
    pending: number;
    approved: number;
    rejected: number;
    recent: { title: string; student: string; status: string }[];
}

interface JobStats {
    active: number;
    applications: number;
    interviews: number;
    placed: number;
}

interface DashboardStats {
    total_users: number;
    daily_active_users: number;
    monthly_active_users: number;
    total_courses: number;
    problems_solved: number;
    mentors_active: number;
    projects_submitted: number;
    jobs_posted: number;
}

interface ActivityItem {
    type: string;
    message: string;
    time: string;
}

export default function DashboardOverview({ users }: { users?: any[] }) {
    const [stats, setStats] = useState<DashboardStats>({
        total_users: 0,
        daily_active_users: 0,
        monthly_active_users: 0,
        total_courses: 0,
        problems_solved: 0,
        mentors_active: 0,
        projects_submitted: 0,
        jobs_posted: 0
    });
    const [growthData, setGrowthData] = useState<any[]>([]);
    const [activityFeed, setActivityFeed] = useState<ActivityItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [timeRange, setTimeRange] = useState("week");

    // --- State for Quick Access Drawer ---
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [activeDrawerModule, setActiveDrawerModule] = useState<string | null>(null);

    // --- State for Module-Specific Analytics ---
    const [topCoders, setTopCoders] = useState<CoderStats[]>([]);
    const [courseStats, setCourseStats] = useState<CourseStats>({ total_enrollments: 0, completion_rate: '0%', top_courses: [] });
    const [mentorshipStats, setMentorshipStats] = useState<MentorshipSession[]>([]);
    const [projectStats, setProjectStats] = useState<ProjectStats>({ pending: 0, approved: 0, rejected: 0, recent: [] });
    const [jobStats, setJobStats] = useState<JobStats>({ active: 0, applications: 0, interviews: 0, placed: 0 });

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                setIsLoading(true);
                // Parallelize fetching
                const [overviewRes, growthRes, activityRes, codersRes, coursesRes, mentorshipRes, projectsRes, jobsRes] = await Promise.all([
                    fetch('http://localhost:5000/api/dashboard/overview'),
                    fetch('http://localhost:5000/api/dashboard/growth'),
                    fetch('http://localhost:5000/api/dashboard/activity'),
                    fetch('http://localhost:5000/api/dashboard/coders'),
                    fetch('http://localhost:5000/api/dashboard/courses'),
                    fetch('http://localhost:5000/api/dashboard/mentorship'),
                    fetch('http://localhost:5000/api/dashboard/projects'),
                    fetch('http://localhost:5000/api/dashboard/jobs')
                ]);

                if (overviewRes.ok) setStats(await overviewRes.json());

                if (growthRes.ok) {
                    const data = await growthRes.json();
                    // Format date for chart
                    const formattedData = data.map((d: any) => ({
                        date: new Date(d.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
                        count: d.count
                    }));
                    setGrowthData(formattedData);
                }

                if (activityRes.ok) setActivityFeed(await activityRes.json());
                if (codersRes.ok) setTopCoders(await codersRes.json());
                if (coursesRes.ok) setCourseStats(await coursesRes.json());
                if (mentorshipRes.ok) setMentorshipStats(await mentorshipRes.json());
                if (projectsRes.ok) setProjectStats(await projectsRes.json());
                if (jobsRes.ok) setJobStats(await jobsRes.json());

            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    const StatCard = ({ title, value, icon: Icon, trend, color, subtext }: any) => (
        <Card className="shadow-sm hover:shadow-md transition-all duration-200 border-slate-100">
            <CardContent className="p-6">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
                        <h3 className="text-2xl font-bold text-slate-900">{value}</h3>
                    </div>
                    <div className={`p-2 rounded-lg ${color}`}>
                        <Icon className="h-5 w-5" />
                    </div>
                </div>
                <div className="mt-4 flex items-center gap-2">
                    {trend && (
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${trend > 0 ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                            }`}>
                            {trend > 0 ? '+' : ''}{trend}%
                        </span>
                    )}
                    <span className="text-xs text-slate-400">{subtext || "vs last month"}</span>
                </div>
            </CardContent>
        </Card>
    );

    return (
        <div className="space-y-8 animate-fade-in">
            {/* Welcome Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-slate-900">Dashboard Overview</h2>
                    <p className="text-slate-500 mt-1">Welcome back, Admin. Here's what's happening today.</p>
                </div>
                <div className="flex items-center gap-3">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="gap-2 border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-slate-900">
                                <Zap className="h-4 w-4 text-amber-500" />
                                Quick Access
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56">
                            <DropdownMenuLabel>Jump to Module</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => { setActiveDrawerModule('coding'); setIsDrawerOpen(true); }}>
                                <Code className="mr-2 h-4 w-4" /> Coding Platform
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => { setActiveDrawerModule('courses'); setIsDrawerOpen(true); }}>
                                <BookOpen className="mr-2 h-4 w-4" /> Courses & Learning
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => { setActiveDrawerModule('mentorship'); setIsDrawerOpen(true); }}>
                                <GraduationCap className="mr-2 h-4 w-4" /> Mentorship
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => { setActiveDrawerModule('projects'); setIsDrawerOpen(true); }}>
                                <FolderKanban className="mr-2 h-4 w-4" /> Projects
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => { setActiveDrawerModule('jobs'); setIsDrawerOpen(true); }}>
                                <Briefcase className="mr-2 h-4 w-4" /> Jobs & Placements
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => { setActiveDrawerModule('users'); setIsDrawerOpen(true); }}>
                                <Users className="mr-2 h-4 w-4" /> Users
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => { setActiveDrawerModule('feedback'); setIsDrawerOpen(true); }}>
                                <MessageSquare className="mr-2 h-4 w-4" /> Feedback
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <Button className="gap-2 bg-primary">
                        <Plus className="h-4 w-4" />
                        Add New
                    </Button>
                </div>
            </div>

            {/* Quick Access Slide Drawer */}
            <QuickAccessDrawer
                isOpen={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
                module={activeDrawerModule}
                data={{
                    stats,
                    topCoders,
                    courseStats,
                    mentorshipStats,
                    projectStats,
                    jobStats
                }}
            />

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Total Users"
                    value={stats.total_users}
                    icon={Users}
                    color="bg-blue-50 text-blue-600"
                    trend={12}
                    subtext="vs last month"
                />
                <StatCard
                    title="Daily Active Users"
                    value={stats.daily_active_users}
                    icon={Activity}
                    color="bg-green-50 text-green-600"
                    trend={5}
                    subtext="vs yesterday"
                />
                <StatCard
                    title="Monthly Active"
                    value={stats.monthly_active_users}
                    icon={Calendar}
                    color="bg-purple-50 text-purple-600"
                    trend={8}
                    subtext="vs last month"
                />
                <StatCard
                    title="Total Courses"
                    value={stats.total_courses}
                    icon={BookOpen}
                    color="bg-orange-50 text-orange-600"
                    subtext="New course added today"
                />
                <StatCard
                    title="Problems Solved"
                    value={stats.problems_solved}
                    icon={Trophy}
                    color="bg-yellow-50 text-yellow-600"
                    trend={150}
                    subtext="this week"
                />
                <StatCard
                    title="Mentors Active"
                    value={stats.mentors_active}
                    icon={GraduationCap}
                    color="bg-pink-50 text-pink-600"
                    subtext="All slots booked"
                />
                <StatCard
                    title="Projects Submitted"
                    value={stats.projects_submitted}
                    icon={FolderKanban}
                    color="bg-indigo-50 text-indigo-600"
                    subtext="3 pending review"
                />
                <StatCard
                    title="Jobs Posted"
                    value={stats.jobs_posted}
                    icon={Briefcase}
                    color="bg-cyan-50 text-cyan-600"
                    subtext="2 closing soon"
                />
            </div>

            {/* --- Platform Growth & Activity (Bitcoin/Crypto Style) --- */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <Card className="lg:col-span-2 shadow-lg border-slate-100 overflow-hidden relative">
                    {/* Background subtle glow */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50/50 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2"></div>

                    <CardHeader className="pb-0">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div>
                                <CardTitle className="text-xl font-bold text-slate-900">Platform Growth</CardTitle>
                                <CardDescription className="text-slate-500">User registration trends</CardDescription>
                                <div className="mt-4 flex items-baseline gap-3">
                                    <h2 className="text-4xl font-extrabold text-slate-900">{stats.total_users.toLocaleString()}</h2>
                                    <span className="flex items-center gap-1 text-sm font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full border border-emerald-100">
                                        <TrendingUp className="h-3 w-3" />
                                        +12.5%
                                    </span>
                                    <span className="text-xs text-slate-400">vs last 30 days</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 self-start md:self-center">
                                <Tabs value={timeRange} onValueChange={setTimeRange} className="w-[240px]">
                                    <TabsList className="grid w-full grid-cols-3 h-9 bg-slate-100/50 p-1">
                                        <TabsTrigger value="day" className="text-xs font-medium data-[state=active]:bg-white data-[state=active]:shadow-sm">1D</TabsTrigger>
                                        <TabsTrigger value="week" className="text-xs font-medium data-[state=active]:bg-white data-[state=active]:shadow-sm">1W</TabsTrigger>
                                        <TabsTrigger value="month" className="text-xs font-medium data-[state=active]:bg-white data-[state=active]:shadow-sm">1M</TabsTrigger>
                                    </TabsList>
                                </Tabs>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="px-2 sm:px-6 pb-6 pt-6">
                        <div className="h-[320px] w-full">
                            {growthData.length > 0 ? (
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={growthData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                                        <defs>
                                            <linearGradient id="colorGrowth" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.3} />
                                                <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                        <XAxis
                                            dataKey="date"
                                            tickLine={false}
                                            axisLine={false}
                                            tick={{ fontSize: 11, fill: '#94a3b8' }}
                                            dy={10}
                                        />
                                        <YAxis
                                            tickLine={false}
                                            axisLine={false}
                                            tick={{ fontSize: 11, fill: '#94a3b8' }}
                                            tickCount={5}
                                        />
                                        <RechartsTooltip
                                            contentStyle={{
                                                backgroundColor: '#1e293b',
                                                border: 'none',
                                                borderRadius: '8px',
                                                color: '#f8fafc',
                                                boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'
                                            }}
                                            itemStyle={{ color: '#fff' }}
                                            cursor={{ stroke: '#6366f1', strokeWidth: 1, strokeDasharray: '4 4' }}
                                        />
                                        <Area
                                            type="monotone"
                                            dataKey="count"
                                            stroke="#4f46e5"
                                            strokeWidth={3}
                                            fillOpacity={1}
                                            fill="url(#colorGrowth)"
                                            activeDot={{ r: 6, strokeWidth: 0, fill: '#4f46e5' }}
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            ) : (
                                <div className="flex h-full items-center justify-center flex-col gap-2 text-slate-400">
                                    <TrendingUp className="h-8 w-8 opacity-20" />
                                    <p>No growth data available</p>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-white shadow-lg border-slate-100 flex flex-col h-full">
                    <CardHeader className="pb-4 border-b border-slate-50">
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle className="text-lg font-bold text-slate-900">Live Activity</CardTitle>
                                <CardDescription>Real-time platform events</CardDescription>
                            </div>
                            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 text-emerald-600 rounded-full text-xs font-bold border border-emerald-100 animate-pulse">
                                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                                LIVE
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0 flex-1 overflow-hidden">
                        <div className="h-[400px] overflow-y-auto custom-scrollbar p-4 space-y-5">
                            {activityFeed.length > 0 ? (
                                activityFeed.map((item, i) => (
                                    <div key={i} className="flex gap-3 group">
                                        <div className={`mt-1 h-8 w-8 rounded-lg flex items-center justify-center shrink-0 border shadow-sm transition-colors
                                            ${item.type === 'registration' ? 'bg-blue-50 border-blue-100 text-blue-600 group-hover:bg-blue-100 group-hover:border-blue-200' :
                                                item.type === 'feedback' ? 'bg-orange-50 border-orange-100 text-orange-600 group-hover:bg-orange-100 group-hover:border-orange-200' :
                                                    'bg-slate-50 border-slate-100 text-slate-600'
                                            }`}>
                                            {item.type === 'registration' && <UserCheck className="h-4 w-4" />}
                                            {item.type === 'feedback' && <MessageSquare className="h-4 w-4" />}
                                            {!['registration', 'feedback'].includes(item.type) && <Activity className="h-4 w-4" />}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between mb-0.5">
                                                <p className="text-sm font-semibold text-slate-800 truncate pr-2 group-hover:text-indigo-600 transition-colors">
                                                    {item.type === 'registration' ? 'New User' :
                                                        item.type === 'feedback' ? 'Feedback' : 'Activity'}
                                                </p>
                                                <span className="text-[10px] text-slate-400 font-mono whitespace-nowrap">
                                                    {new Date(item.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </span>
                                            </div>
                                            <p className="text-xs text-slate-600 line-clamp-1">{item.message}</p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="flex flex-col items-center justify-center h-full text-slate-400 py-8">
                                    <Activity className="h-8 w-8 mb-2 opacity-20" />
                                    <p className="text-sm">No recent activity</p>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* --- CODING PLATFORM SECTION --- */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                        <Code className="h-5 w-5 text-indigo-600" />
                        Coding Platform Analytics
                    </h3>
                    <Button variant="ghost" size="sm" className="text-indigo-600">View All</Button>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    <Card className="lg:col-span-1 bg-indigo-50 border-indigo-100">
                        <CardContent className="p-6 space-y-4">
                            <div>
                                <p className="text-sm text-indigo-600 font-medium">Items Attempted</p>
                                <p className="text-3xl font-bold text-indigo-900">4,281</p>
                            </div>
                            <div>
                                <p className="text-sm text-indigo-600 font-medium">Problems Solved</p>
                                <p className="text-3xl font-bold text-indigo-900">{stats.problems_solved}</p>
                            </div>
                            <div>
                                <p className="text-sm text-indigo-600 font-medium">Active Coders</p>
                                <p className="text-3xl font-bold text-indigo-900">142</p>
                                <p className="text-xs text-indigo-400 mt-1">Daily Avg.</p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="lg:col-span-3">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-base">Top Coders Leaderboard</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left">
                                    <thead className="text-xs text-slate-500 uppercase bg-slate-50">
                                        <tr>
                                            <th className="px-4 py-3 rounded-l-md">Rank</th>
                                            <th className="px-4 py-3">User Name</th>
                                            <th className="px-4 py-3">Email</th>
                                            <th className="px-4 py-3">Problems Solved</th>
                                            <th className="px-4 py-3">Completion %</th>
                                            <th className="px-4 py-3 rounded-r-md">Last Active</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {topCoders.length > 0 ? (
                                            topCoders.map((coder, i) => (
                                                <tr key={i} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50">
                                                    <td className="px-4 py-3 font-semibold text-slate-700">#{coder.rank}</td>
                                                    <td className="px-4 py-3 font-medium text-slate-900">{coder.name}</td>
                                                    <td className="px-4 py-3 text-slate-500">{coder.email}</td>
                                                    <td className="px-4 py-3 font-mono text-indigo-600 font-bold">{coder.solved}</td>
                                                    <td className="px-4 py-3">
                                                        <div className="flex items-center gap-2">
                                                            <div className="w-16 h-2 bg-slate-100 rounded-full overflow-hidden">
                                                                <div className="h-full bg-indigo-500" style={{ width: coder.percent }}></div>
                                                            </div>
                                                            <span className="text-xs font-medium">{coder.percent}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-3 text-slate-500">{coder.active}</td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={6} className="px-4 py-6 text-center text-slate-500">
                                                    No top coders data available.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* --- MENTORSHIP SECTION --- */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                        <GraduationCap className="h-5 w-5 text-pink-600" />
                        Mentorship Sessions
                    </h3>
                    <Button variant="ghost" size="sm" className="text-pink-600">View All Bookings</Button>
                </div>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-base">Recent Mentorship Bookings</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="text-xs text-slate-500 uppercase bg-slate-50">
                                    <tr>
                                        <th className="px-4 py-3 rounded-l-md">Student Name</th>
                                        <th className="px-4 py-3">Student Email</th>
                                        <th className="px-4 py-3">Mentor Name</th>
                                        <th className="px-4 py-3">Date & Time</th>
                                        <th className="px-4 py-3 rounded-r-md">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {mentorshipStats.length > 0 ? (
                                        mentorshipStats.map((session, i) => (
                                            <tr key={i} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50">
                                                <td className="px-4 py-3 font-medium text-slate-900">{session.name}</td>
                                                <td className="px-4 py-3 text-slate-500">{session.email}</td>
                                                <td className="px-4 py-3 text-slate-700">{session.mentor}</td>
                                                <td className="px-4 py-3 text-slate-500 font-mono text-xs">{session.time}</td>
                                                <td className="px-4 py-3">
                                                    <Badge variant="outline" className={
                                                        session.status === 'Upcoming' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                                                            session.status === 'Completed' ? 'bg-green-50 text-green-700 border-green-200' :
                                                                'bg-red-50 text-red-700 border-red-200'
                                                    }>
                                                        {session.status}
                                                    </Badge>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr><td colSpan={5} className="px-4 py-6 text-center text-slate-500">No recent sessions found.</td></tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* --- COURSES & PROJECTS (2 Cols) --- */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Courses */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                            <BookOpen className="h-5 w-5 text-orange-600" />
                            Courses Overview
                        </h3>
                    </div>
                    <Card>
                        <CardContent className="p-0">
                            <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-orange-50/30">
                                <div>
                                    <p className="text-sm text-slate-500">Total Enrollments</p>
                                    <p className="text-2xl font-bold text-slate-900">{courseStats.total_enrollments}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm text-slate-500">Completion Rate</p>
                                    <p className="text-2xl font-bold text-green-600">{courseStats.completion_rate}</p>
                                </div>
                            </div>
                            <div className="p-4">
                                <p className="text-sm font-semibold text-slate-900 mb-3">Top Performing Courses</p>
                                <div className="space-y-3">
                                    {courseStats.top_courses.length > 0 ? (
                                        courseStats.top_courses.map((course, i) => (
                                            <div key={i} className="flex items-center justify-between text-sm">
                                                <span className="text-slate-700 truncate max-w-[180px]">{course.name}</span>
                                                <div className="flex items-center gap-3">
                                                    <span className="text-slate-400 text-xs">{course.students} students</span>
                                                    <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                                        <div className="h-full bg-orange-500" style={{ width: `${course.progress}%` }}></div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-xs text-slate-400">No courses data available.</p>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Projects */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                            <FolderKanban className="h-5 w-5 text-purple-600" />
                            Project Submissions
                        </h3>
                    </div>
                    <Card>
                        <CardContent className="p-0">
                            <div className="p-4 border-b border-slate-100 flex gap-4 bg-purple-50/30">
                                <div className="flex-1">
                                    <p className="text-xs text-slate-500 uppercase tracking-wider">Pending</p>
                                    <p className="text-xl font-bold text-orange-600">{projectStats.pending}</p>
                                </div>
                                <div className="flex-1">
                                    <p className="text-xs text-slate-500 uppercase tracking-wider">Approved</p>
                                    <p className="text-xl font-bold text-green-600">{projectStats.approved}</p>
                                </div>
                                <div className="flex-1">
                                    <p className="text-xs text-slate-500 uppercase tracking-wider">Rejected</p>
                                    <p className="text-xl font-bold text-red-600">{projectStats.rejected}</p>
                                </div>
                            </div>
                            <div className="p-0">
                                <table className="w-full text-sm text-left">
                                    <tbody>
                                        {projectStats.recent.length > 0 ? (
                                            projectStats.recent.map((p, i) => (
                                                <tr key={i} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50">
                                                    <td className="px-4 py-3 font-medium text-slate-800">{p.title}</td>
                                                    <td className="px-4 py-3 text-slate-500">{p.student}</td>
                                                    <td className="px-4 py-3 text-right">
                                                        <span className={`inline-block w-2 h-2 rounded-full mr-2 ${p.status === 'Approved' ? 'bg-green-500' :
                                                            p.status === 'Pending' ? 'bg-orange-500' : 'bg-red-500'
                                                            }`}></span>
                                                        {p.status}
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr><td colSpan={3} className="px-4 py-6 text-center text-slate-500">No recent submissions.</td></tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* --- JOBS & PLACEMENTS --- */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                        <Briefcase className="h-5 w-5 text-cyan-600" />
                        Jobs & Placements
                    </h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Card className="bg-cyan-50 border-cyan-100 p-4 flex flex-col items-center justify-center text-center">
                        <p className="text-sm text-cyan-700 font-medium">Active Listings</p>
                        <p className="text-2xl font-bold text-cyan-900 mt-1">{stats.jobs_posted}</p>
                    </Card>
                    <Card className="bg-white border-slate-100 p-4 flex flex-col items-center justify-center text-center">
                        <p className="text-sm text-slate-500 font-medium">Applications</p>
                        <p className="text-2xl font-bold text-slate-900 mt-1">1,240</p>
                    </Card>
                    <Card className="bg-white border-slate-100 p-4 flex flex-col items-center justify-center text-center">
                        <p className="text-sm text-slate-500 font-medium">Interviews</p>
                        <p className="text-2xl font-bold text-slate-900 mt-1">45</p>
                    </Card>
                    <Card className="bg-white border-slate-100 p-4 flex flex-col items-center justify-center text-center">
                        <p className="text-sm text-slate-500 font-medium">Placed</p>
                        <p className="text-2xl font-bold text-green-600 mt-1">12</p>
                    </Card>
                </div>
            </div>
        </div>
    );
}


