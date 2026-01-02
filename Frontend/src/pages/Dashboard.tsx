import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useCourse } from '@/contexts/CourseContext';
import {
  BookOpen, Activity, PlayCircle, CheckCircle2, Clock, Calendar, ArrowRight, Zap,
  Award, Lock, Share2, Copy, Check, Flame, Trophy, Briefcase, Code, Users, Search,
  Github, Linkedin, FileText, ExternalLink
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Link, useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from "@/components/ui/use-toast";
import FeatureGuard from "@/components/FeatureGuard";
import { ActivityCalendar } from '@/components/dashboard/ActivityCalendar';
import CertificateModal from '@/components/CertificateModal';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { courses, progressMap, stats: rawStats } = useCourse();
  const firstName = user?.name?.split(' ')[0] || 'Student';

  // --- Extended Stats with Fallbacks ---
  // --- Extended Stats with Fallbacks ---
  const stats = {
    ...rawStats,
    problemsSolved: rawStats?.problemsSolved ?? 0,
    projectsSubmitted: rawStats?.projectsSubmitted ?? 0,
    badgesEarned: rawStats?.badgesEarned ?? 0,
    jobsApplied: rawStats?.jobsApplied ?? 0,
    mentorBookings: rawStats?.mentorBookings ?? 0,
    nextSession: rawStats?.nextSession ?? null
  };

  // --- Logic for Sections ---
  // Filter for Completed Courses for the Achievements section
  const completedCoursesList = courses.filter(c => progressMap[c.id]?.status === 'Completed');

  // Certificate Modal State
  const [showCertModal, setShowCertModal] = useState(false);
  const [selectedCert, setSelectedCert] = useState<any>(null);

  // Sharing State
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareUrl, setShareUrl] = useState('');
  const [copied, setCopied] = useState(false);

  const handleShareProgress = async () => {
    try {
      const dummyUrl = `https://workspace.prolync.in/share/${user?.id || 'demo'}/${Date.now()}`;
      setShareUrl(dummyUrl);
      setShowShareModal(true);
    } catch (error) {
      toast({ title: "Sharing Failed", description: "Could not generate link.", variant: "destructive" });
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast({ title: "Copied!", description: "Link copied to clipboard." });
  };

  return (
    <FeatureGuard feature="dashboard">
      <div className="container mx-auto px-4 py-8 space-y-8 animate-in fade-in duration-500 min-h-screen pb-20 bg-slate-50/50">

        {/* 1. HEADER SECTION */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
              Welcome back, {firstName}!
            </h1>
            <p className="text-slate-500 text-lg">
              Let's continue your learning journey
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Button onClick={handleShareProgress} variant="outline" className="gap-2 hidden md:flex border-blue-200 text-blue-700 hover:bg-blue-50">
              <Share2 className="h-4 w-4" /> Share Progress
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center gap-3 pl-4 border-l cursor-pointer hover:opacity-80 transition-opacity">
                  <div className="text-right hidden sm:block">
                    <p className="text-sm font-semibold text-slate-900">{user?.name}</p>
                    <p className="text-xs text-slate-500 capitalize">{user?.role}</p>
                  </div>
                  <Avatar className="h-10 w-10 border-2 border-white shadow-sm ring-2 ring-slate-100">
                    <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.email}`} />
                    <AvatarFallback>{firstName[0]}</AvatarFallback>
                  </Avatar>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer" onClick={() => navigate('/profile')}>Profile</DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer" onClick={() => navigate('/settings')}>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600 cursor-pointer" onClick={logout}>
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* 2. METRICS ROW 1 (4 COLORED BOXES) */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {/* Box 1: Courses Completed (Green Gradient) */}
          <Card
            className="border-none shadow-md overflow-hidden relative group cursor-pointer hover:shadow-lg transition-all duration-300"
            onClick={() => navigate('/courses')}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-emerald-100/50 opacity-100" />
            <div className="absolute -right-6 -top-6 h-24 w-24 bg-emerald-200/40 rounded-full blur-2xl group-hover:bg-emerald-300/40 transition-colors" />
            <CardContent className="p-6 relative isolate">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-white rounded-xl shadow-sm text-emerald-600 ring-1 ring-emerald-100">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <Badge variant="secondary" className="bg-white/80 backdrop-blur text-emerald-700 shadow-sm">
                  Verified
                </Badge>
              </div>
              <div>
                <p className="text-3xl font-bold text-slate-900 tracking-tight">{stats.completedCourses}</p>
                <p className="text-sm font-medium text-emerald-700 mt-1">Courses Completed</p>
              </div>
            </CardContent>
          </Card>

          {/* Box 2: Problems Solved (Blue Gradient) */}
          <Card
            className="border-none shadow-md overflow-hidden relative group cursor-pointer hover:shadow-lg transition-all duration-300"
            onClick={() => navigate('/coding')}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100/50 opacity-100" />
            <div className="absolute -right-6 -top-6 h-24 w-24 bg-blue-200/40 rounded-full blur-2xl group-hover:bg-blue-300/40 transition-colors" />
            <CardContent className="p-6 relative isolate">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-white rounded-xl shadow-sm text-blue-600 ring-1 ring-blue-100">
                  <Code className="h-6 w-6" />
                </div>
                <Badge variant="secondary" className="bg-white/80 backdrop-blur text-blue-700 shadow-sm">
                  Top 10%
                </Badge>
              </div>
              <div>
                <p className="text-3xl font-bold text-slate-900 tracking-tight">{stats.problemsSolved}</p>
                <p className="text-sm font-medium text-blue-700 mt-1">Problems Solved</p>
              </div>
            </CardContent>
          </Card>

          {/* Box 3: Projects Submitted (Purple Gradient) */}
          <Card
            className="border-none shadow-md overflow-hidden relative group cursor-pointer hover:shadow-lg transition-all duration-300"
            onClick={() => navigate('/projects')}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-violet-50 to-violet-100/50 opacity-100" />
            <div className="absolute -right-6 -top-6 h-24 w-24 bg-violet-200/40 rounded-full blur-2xl group-hover:bg-violet-300/40 transition-colors" />
            <CardContent className="p-6 relative isolate">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-white rounded-xl shadow-sm text-violet-600 ring-1 ring-violet-100">
                  <Briefcase className="h-6 w-6" />
                </div>
                <Badge variant="secondary" className="bg-white/80 backdrop-blur text-violet-700 shadow-sm">
                  Review Pending
                </Badge>
              </div>
              <div>
                <p className="text-3xl font-bold text-slate-900 tracking-tight">{stats.projectsSubmitted}</p>
                <p className="text-sm font-medium text-violet-700 mt-1">Projects Submitted</p>
              </div>
            </CardContent>
          </Card>

          {/* Box 4: Badges Earned (Amber Gradient) */}
          <Card
            className="border-none shadow-md overflow-hidden relative group cursor-pointer hover:shadow-lg transition-all duration-300"
            onClick={() => navigate('/profile')}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-amber-50 to-amber-100/50 opacity-100" />
            <div className="absolute -right-6 -top-6 h-24 w-24 bg-amber-200/40 rounded-full blur-2xl group-hover:bg-amber-300/40 transition-colors" />
            <CardContent className="p-6 relative isolate">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-white rounded-xl shadow-sm text-amber-600 ring-1 ring-amber-100">
                  <Trophy className="h-6 w-6" />
                </div>
                <Badge variant="secondary" className="bg-white/80 backdrop-blur text-amber-700 shadow-sm">
                  Elite
                </Badge>
              </div>
              <div>
                <p className="text-3xl font-bold text-slate-900 tracking-tight">{stats.badgesEarned}</p>
                <p className="text-sm font-medium text-amber-700 mt-1">Badges Earned</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 3. ROW 2: ACTIVITY & QUICK STATS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* LEFT: BIG BOX - ACTIVITY & STREAK (2/3) */}
          <div className="lg:col-span-2">
            <Card className="border-slate-200 shadow-sm h-full hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-xl font-bold flex items-center gap-2">
                      <Activity className="h-5 w-5 text-blue-600" />
                      Learning Activity
                    </CardTitle>
                    <p className="text-sm text-slate-500">Track your daily progress and consistency</p>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1 bg-orange-50 text-orange-600 rounded-full border border-orange-100">
                    <Flame className="h-4 w-4 fill-current" />
                    <span className="font-bold">{stats.streak} Day Streak</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* We use ActivityCalendar as the main visual here */}
                <ActivityCalendar />
              </CardContent>
            </Card>
          </div>

          {/* RIGHT: 3 SMALL BOXES (1/3) */}
          <div className="space-y-6">

            {/* 1. Active Courses */}
            <Card
              className="border-slate-200 shadow-sm hover:shadow-md transition-all group cursor-pointer"
              onClick={() => navigate('/courses')}
            >
              <CardContent className="p-5 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">Active Learning</p>
                  <p className="text-2xl font-bold text-slate-900 mt-1">{stats.activeCourses} Courses</p>
                  <div className="mt-2 w-24 h-1 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 w-2/3" />
                  </div>
                </div>
                <div className="h-10 w-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <PlayCircle className="h-5 w-5" />
                </div>
              </CardContent>
            </Card>

            {/* 2. Jobs Applied */}
            <Card
              className="border-slate-200 shadow-sm hover:shadow-md transition-all group cursor-pointer"
              onClick={() => navigate('/jobs')}
            >
              <CardContent className="p-5 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">Career Ops</p>
                  <p className="text-2xl font-bold text-slate-900 mt-1">{stats.jobsApplied} Applied</p>
                  <p className="text-xs text-slate-400 mt-1">2 Interviews Pending</p>
                </div>
                <div className="h-10 w-10 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Briefcase className="h-5 w-5" />
                </div>
              </CardContent>
            </Card>

            {/* 3. Mentor Booking */}
            <Card
              className="border-slate-200 shadow-sm hover:shadow-md transition-all group cursor-pointer"
              onClick={() => navigate('/mentors')}
            >
              <CardContent className="p-5 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">Mentorship</p>
                  {stats.nextSession ? (
                    <div>
                      <p className="text-lg font-bold text-slate-900 mt-1">{new Date(stats.nextSession.schedule_time).toLocaleDateString()}</p>
                      <p className="text-xs text-blue-600 font-medium">Upcoming Session</p>
                    </div>
                  ) : (
                    <div>
                      <p className="text-lg font-bold text-slate-900 mt-1">No Bookings</p>
                      <p className="text-xs text-blue-600 font-medium">Book a session today</p>
                    </div>
                  )}
                </div>
                <div className="h-10 w-10 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Users className="h-5 w-5" />
                </div>
              </CardContent>
            </Card>

          </div>
        </div>

        {/* 4. BOTTOM SECTIONS: MENTOR, PORTFOLIO, CERTS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* LEFT: MENTOR CARD & SOCIALS */}
          <div className="space-y-6">

            {/* Mentor Highlight */}
            <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-12 translate-x-12" />
              <div className="relative z-10">
                <h3 className="text-xl font-bold mb-2">Expert Mentorship</h3>
                <p className="text-slate-300 mb-6 max-w-md">Connect with industry experts to review your projects and guide your career path.</p>

                <div className="flex items-center gap-4">
                  <Button
                    className="bg-blue-600 hover:bg-blue-500 border-none shadow-lg shadow-blue-900/20"
                    onClick={() => navigate('/mentors')}
                  >
                    Find a Mentor
                  </Button>
                  <Button
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white/10 hover:text-white"
                    onClick={() => navigate('/mentors')}
                  >
                    My Sessions
                  </Button>
                </div>
              </div>
            </div>

            {/* Social Links & Portfolio */}
            <Card className="border-slate-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Your Portfolio & Socials</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100">
                  <div className="flex-1 truncate">
                    <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-1">Portfolio Link</p>
                    <p className="text-sm font-mono text-slate-700 truncate">workspace.prolync.in/u/{user?.id || 'me'}</p>
                  </div>
                  <Button size="sm" variant="ghost" className="h-8 w-8 text-slate-500" onClick={() => {
                    navigator.clipboard.writeText(`workspace.prolync.in/u/${user?.id}`);
                    toast({ title: "Copied" });
                  }}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <Button variant="outline" className="w-full gap-2 border-slate-200 hover:border-slate-300 hover:bg-slate-50">
                    <Github className="h-4 w-4" /> GitHub
                  </Button>
                  <Button variant="outline" className="w-full gap-2 border-slate-200 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700">
                    <Linkedin className="h-4 w-4" /> LinkedIn
                  </Button>
                  <Button variant="outline" className="w-full gap-2 border-slate-200 hover:border-red-200 hover:bg-red-50 hover:text-red-700">
                    <FileText className="h-4 w-4" /> Resume
                  </Button>
                </div>
              </CardContent>
            </Card>

          </div>

          {/* RIGHT: COURSE COMPLETION / CERTS */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-800">Your Achievements</h2>
              <Button variant="ghost" size="sm" className="text-blue-600 gap-1">
                View All <ArrowRight className="h-4 w-4" />
              </Button>
            </div>

            <ScrollArea className="h-[320px] pr-4">
              <div className="space-y-3">
                {completedCoursesList.length > 0 ? completedCoursesList.map(course => (
                  <div key={course.id} className="group p-4 bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all cursor-pointer flex items-center gap-4"
                    onClick={() => {
                      setSelectedCert({
                        courseTitle: course.title,
                        instructor: course.instructor || 'Instructor',
                        date: new Date().toLocaleDateString(),
                        certId: `CERT-${course.id}`
                      });
                      setShowCertModal(true);
                    }}
                  >
                    <div className="h-12 w-12 rounded-lg bg-amber-50 text-amber-500 flex items-center justify-center ring-1 ring-amber-100 group-hover:scale-105 transition-transform">
                      <Award className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-slate-900 line-clamp-1">{course.title}</h4>
                      <p className="text-xs text-slate-500">Completed on {new Date().toLocaleDateString()}</p>
                    </div>
                    <Button size="sm" variant="ghost" className="text-slate-400 group-hover:text-blue-600">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                )) : (
                  <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/50">
                    <Award className="h-10 w-10 text-slate-300 mx-auto mb-2" />
                    <p className="text-slate-500 font-medium">No certificates yet</p>
                    <Button variant="link" className="text-blue-600" onClick={() => window.location.href = '/courses'}>Start Learning</Button>
                  </div>
                )}

                {/* Mock Achievement for Demo */}
                <div className="p-4 bg-gradient-to-r from-slate-50 to-white rounded-xl border border-slate-200 shadow-sm flex items-center gap-4 opacity-60 grayscale">
                  <div className="h-12 w-12 rounded-lg bg-slate-200 text-slate-400 flex items-center justify-center">
                    <Trophy className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-slate-800">Coding Champion</h4>
                    <p className="text-xs text-slate-500">Solve 50 Problems</p>
                  </div>
                  <div className="w-16">
                    <Progress value={35} className="h-1.5" />
                    <p className="text-[10px] text-right mt-1 text-slate-400">12/50</p>
                  </div>
                </div>
              </div>
            </ScrollArea>
          </div>
        </div>

      </div>

      <CertificateModal
        isOpen={showCertModal}
        onClose={() => setShowCertModal(false)}
        studentName={firstName}
        courseTitle={selectedCert?.courseTitle || ''}
        instructor={selectedCert?.instructor || ''}
        date={selectedCert?.date || ''}
        certId={selectedCert?.certId || ''}
      />

      {/* Share Modal Logic */}
      <Dialog open={showShareModal} onOpenChange={setShowShareModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Share Your Progress</DialogTitle>
            <DialogDescription>
              Anyone with this link can view your read-only profile.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4 py-4">
            <div className="flex items-center space-x-2">
              <div className="grid flex-1 gap-2">
                <Label htmlFor="link" className="sr-only">Link</Label>
                <Input id="link" value={shareUrl} readOnly className="h-9" />
              </div>
              <Button type="button" size="sm" className="px-3" onClick={copyToClipboard}>
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </FeatureGuard>
  );
}
