import { Code2, Users, BookOpen, Trophy, Laptop } from 'lucide-react';

export default function SaaSBackground() {
    return (
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
            {/* 1. Base Grid Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

            {/* 2. Soft Gradient Overlay (Light Blue/Purple) */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-50/50 via-blue-50/30 to-white/80" />

            {/* 3. Floating Boxes / Cards */}
            <div className="absolute inset-0">

                {/* Card 1: Coding (Top Left) */}
                <div className="absolute top-[15%] left-[5%] animate-float-slow opacity-60 hidden lg:block">
                    <div className="bg-white/40 backdrop-blur-sm p-4 rounded-2xl border border-white/50 shadow-sm rotate-[-6deg]">
                        <div className="h-10 w-10 bg-blue-100/50 rounded-xl flex items-center justify-center mb-2">
                            <Code2 className="h-5 w-5 text-blue-600/70" />
                        </div>
                        <div className="h-2 w-20 bg-slate-200/50 rounded-full mb-1.5" />
                        <div className="h-2 w-12 bg-slate-200/50 rounded-full" />
                    </div>
                </div>
                {/* Card 2: Mentorship (Top Right) */}
                <div className="absolute top-[20%] right-[8%] animate-float-delayed opacity-60 hidden lg:block">
                    <div className="bg-white/40 backdrop-blur-sm p-4 rounded-2xl border border-white/50 shadow-sm rotate-[12deg]">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="h-8 w-8 bg-emerald-100/50 rounded-full flex items-center justify-center">
                                <Users className="h-4 w-4 text-emerald-600/70" />
                            </div>
                            <div className="h-2 w-16 bg-slate-200/50 rounded-full" />
                        </div>
                        <div className="h-2 w-full bg-slate-200/50 rounded-full" />
                    </div>
                </div>

                {/* Card 3: Learning (Middle Left - Lower) */}
                <div className="absolute top-[55%] left-[10%] animate-float-slower opacity-50 hidden lg:block">
                    <div className="bg-white/40 backdrop-blur-sm p-3 rounded-2xl border border-white/50 shadow-sm rotate-[3deg]">
                        <BookOpen className="h-8 w-8 text-indigo-500/40 mb-2" />
                        <div className="space-y-1">
                            <div className="h-1.5 w-16 bg-indigo-100/50 rounded-full" />
                            <div className="h-1.5 w-10 bg-indigo-100/50 rounded-full" />
                        </div>
                    </div>
                </div>

                {/* Card 4: Success/Trophy (Middle Right) */}
                <div className="absolute top-[45%] right-[15%] animate-float-reverse opacity-50 hidden lg:block">
                    <div className="bg-white/40 backdrop-blur-sm p-4 rounded-full border border-white/50 shadow-sm">
                        <Trophy className="h-6 w-6 text-amber-500/50" />
                    </div>
                </div>

                {/* Card 5: Laptop/Work (Bottom Centerish) */}
                <div className="absolute top-[70%] left-[40%] animate-float-slow opacity-40 hidden lg:block">
                    <div className="bg-white/30 backdrop-blur-md p-5 rounded-3xl border border-white/40 shadow-sm -rotate-3">
                        <Laptop className="h-10 w-10 text-slate-400/50" />
                    </div>
                </div>

            </div>
        </div>
    );
}
