import { useState, useEffect, useRef } from 'react';
import {
    BookOpen, Code2, Terminal, FolderGit2,
    Users, Briefcase, Target, Calendar,
    Bell, AlertCircle, BarChart3, HeartHandshake,
    MessageSquare, FileText, GraduationCap, Award
} from 'lucide-react';

const stackItems = [
    { icon: BookOpen, label: "Courses", color: "text-lime-400" },
    { icon: Code2, label: "Coding Playground", color: "text-cyan-400" },
    { icon: Terminal, label: "Test Cases", color: "text-emerald-400" },
    { icon: FolderGit2, label: "Projects", color: "text-violet-400" },
    { icon: Users, label: "Mentorship", color: "text-pink-400" },
    { icon: Briefcase, label: "Internships", color: "text-amber-400" },
    { icon: Target, label: "Placements", color: "text-rose-400" },
    { icon: Calendar, label: "Events & Workshops", color: "text-blue-400" },
    { icon: Bell, label: "Exam Notifications", color: "text-yellow-400" },
    { icon: AlertCircle, label: "Important Updates", color: "text-orange-400" },
    { icon: BarChart3, label: "Progress Tracking", color: "text-teal-400" },
    { icon: HeartHandshake, label: "Career Guidance", color: "text-purple-400" },
    { icon: MessageSquare, label: "Mock Interviews", color: "text-sky-400" },
    { icon: FileText, label: "Resume Review", color: "text-indigo-400" },
    { icon: GraduationCap, label: "Learning Paths", color: "text-green-400" },
    { icon: Award, label: "Certifications", color: "text-red-400" }
];

export default function WorkspaceStack() {
    const [isPaused, setIsPaused] = useState(false);
    const row1Ref = useRef(null);
    const row2Ref = useRef(null);

    // Duplicated for seamless loop
    const duplicatedItems = [...stackItems, ...stackItems];

    useEffect(() => {
        const row1 = row1Ref.current;
        const row2 = row2Ref.current;
        if (!row1 || !row2) return;

        let animationFrameId;
        let startTime = null;
        let row1Position = 0;
        let row2Position = 0;
        const row1Speed = 0.3;
        const row2Speed = 0.4;

        const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;

            if (!isPaused) {
                const elapsed = timestamp - startTime;
                row1Position = (elapsed * row1Speed) % (row1.scrollWidth / 2);
                row2Position = (elapsed * row2Speed) % (row2.scrollWidth / 2);
                row1.style.transform = `translateX(-${row1Position}px)`;
                row2.style.transform = `translateX(-${row2Position}px)`;
            }
            animationFrameId = requestAnimationFrame(animate);
        };
        animationFrameId = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrameId);
    }, [isPaused]);

    return (
        <section className="py-16 md:py-20 bg-white">
            <div className="container mx-auto px-4 md:px-6">

                {/* Section Badge / Title (Outside Container) */}
                <div className="text-center mb-8 md:mb-10 opacity-0 animate-fade-in-down" style={{ animationFillMode: 'forwards' }}>
                    <span className="inline-block py-1 px-3 rounded-full bg-emerald-50 border border-emerald-100 mb-4 shadow-sm">
                        <span className="text-emerald-600 uppercase tracking-[0.2em] text-sm md:text-base font-bold flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                            All-in-One Platform
                        </span>
                    </span>
                </div>

                {/* Compact Dark Container */}
                <div
                    className="relative rounded-[2.5rem] overflow-hidden bg-black border border-slate-800 shadow-2xl shadow-slate-200/50 transform transition-all hover:scale-[1.01] duration-500"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                >
                    {/* Background Effects (Contained) */}
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900"></div>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-emerald-900/20 via-transparent to-transparent"></div>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-cyan-900/20 via-transparent to-transparent"></div>

                    {/* Content Wrapper */}
                    <div className="relative z-10 py-12 md:py-16">

                        {/* Header (Inside Box) */}
                        <div className="text-center mb-10 md:mb-12 px-4">
                            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                                Everything You Need in <br className="hidden md:block" />
                                One <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400">Workspace</span>
                            </h2>
                        </div>

                        {/* Animated Rows */}
                        <div className="relative overflow-hidden w-full mask-linear-fade">
                            {/* Fades for sides */}
                            <div className="absolute left-0 top-0 bottom-0 w-24 md:w-40 z-20 bg-gradient-to-r from-black via-black/80 to-transparent pointer-events-none"></div>
                            <div className="absolute right-0 top-0 bottom-0 w-24 md:w-40 z-20 bg-gradient-to-l from-black via-black/80 to-transparent pointer-events-none"></div>

                            <div className="flex flex-col gap-5 md:gap-6 py-4">
                                {/* Row 1 */}
                                <div ref={row1Ref} className="flex gap-4 md:gap-6 w-max" style={{ willChange: 'transform' }}>
                                    {duplicatedItems.map((item, index) => (
                                        <div
                                            key={`r1-${index}`}
                                            className="group flex-shrink-0 w-36 h-28 md:w-44 md:h-32 bg-gray-900/40 backdrop-blur-md rounded-2xl border border-white/5 flex flex-col items-center justify-center gap-3 hover:bg-gray-800/60 hover:border-emerald-500/30 transition-all duration-300 cursor-default"
                                        >
                                            <item.icon className={`h-6 w-6 md:h-8 md:w-8 ${item.color} opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300`} />
                                            <span className="text-xs md:text-sm font-medium text-slate-300 group-hover:text-white transition-colors text-center px-2">
                                                {item.label}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                {/* Row 2 */}
                                <div ref={row2Ref} className="flex gap-4 md:gap-6 w-max" style={{ willChange: 'transform' }}>
                                    {[...duplicatedItems].reverse().map((item, index) => (
                                        <div
                                            key={`r2-${index}`}
                                            className="group flex-shrink-0 w-36 h-28 md:w-44 md:h-32 bg-gray-900/40 backdrop-blur-md rounded-2xl border border-white/5 flex flex-col items-center justify-center gap-3 hover:bg-gray-800/60 hover:border-cyan-500/30 transition-all duration-300 cursor-default"
                                        >
                                            <item.icon className={`h-6 w-6 md:h-8 md:w-8 ${item.color} opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300`} />
                                            <span className="text-xs md:text-sm font-medium text-slate-300 group-hover:text-white transition-colors text-center px-2">
                                                {item.label}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}