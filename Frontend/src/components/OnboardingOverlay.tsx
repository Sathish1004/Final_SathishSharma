import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    BookOpen,
    FolderKanban,
    Users,
    Briefcase,
} from 'lucide-react';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useAuth } from '@/contexts/AuthContext';

// Mock Data removed as per user request for clean blur background


const onboardingSlides = [
    {
        id: 1,
        avatar: "Go",
        title: "Welcome to Student Workspace ",
        description: "Your all-in-one platform to learn, practice, and grow your career.",
        animation: "animate-slide-in-left", // Left -> Center
        bg: "bg-blue-50",
    },
    {
        id: 2,
        avatar: "Go",
        title: "Learn Anytime, Anywhere",
        description: "Access 100+ curated courses designed for students and freshers.",
        animation: "animate-slide-in-right", // Right -> Center
        bg: "bg-emerald-50",
    },
    {
        id: 3,
        avatar: "Go",
        title: "Practice & Improve Coding",
        description: "Code, compile, and solve challenges directly on our platform.",
        animation: "animate-slide-in-top", // Top -> Center
        bg: "bg-purple-50",
    },
    {
        id: 4,
        avatar: "Go",
        title: "Learn from Industry Experts",
        description: "Connect with mentors for guidance, reviews, and career clarity.",
        animation: "animate-slide-in-bottom", // Bottom -> Center
        bg: "bg-orange-50",
    },
    {
        id: 5,
        avatar: "Go",
        title: "Build Real-World Projects",
        description: "Work on hands-on projects to strengthen your portfolio.",
        animation: "animate-slide-in-top-left", // Top-Left -> Center
        bg: "bg-sky-50",
    },
    {
        id: 6,
        avatar: "💼",
        title: "Get Career Ready",
        description: "Apply for internships, jobs, and placement opportunities.",
        animation: "animate-slide-in-top-right", // Top-Right -> Center
        bg: "bg-pink-50",
    }
];

export default function OnboardingOverlay() {
    const navigate = useNavigate();
    const { setShowOnboarding } = useAuth();
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isVisible, setIsVisible] = useState(true);

    const handleNext = () => {
        if (currentSlide < onboardingSlides.length - 1) {
            setCurrentSlide(prev => prev + 1);
        } else {
            handleComplete();
        }
    };

    const handleComplete = () => {
        setIsVisible(false);
        setTimeout(() => {
            setShowOnboarding(false); // Update Global Context
            localStorage.setItem('onboarding_complete', 'true');
            navigate('/dashboard');
        }, 300);
    };

    const slide = onboardingSlides[currentSlide];

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-50/50 font-sans overflow-hidden">

            {/* --- HEAVY BLUR VIOLET BACKGROUND --- */}
            <div className={cn(
                "absolute inset-0 transition-all duration-700 pointer-events-none",
                isVisible ? "opacity-100" : "opacity-0"
            )}>
                {/* Base Blur Layer */}
                <div className="absolute inset-0 bg-white/10 backdrop-blur-[12px]" />

                {/* Violet Overlay Layer */}
                <div className="absolute inset-0 bg-violet-500/20 mix-blend-overlay" />

                {/* Darker Shadow Layer for Contrast */}
                <div className="absolute inset-0 bg-slate-900/40" />
            </div>

            {/* Overlay Removed for Pure White Background */}

            {/* --- NOTIFICATION CARD --- */}
            <div className="relative w-full max-w-sm px-4 perspective-1000">
                <div
                    key={currentSlide}
                    className={cn(
                        "bg-white rounded-3xl shadow-2xl p-8 flex flex-col items-center text-center transition-all duration-500",
                        slide.animation
                    )}
                >
                    {/* Avatar Pushing Effect */}
                    <div className="mb-6 relative group">
                        <div className={cn(
                            "w-24 h-24 rounded-full flex items-center justify-center shadow-lg text-5xl select-none transform transition-transform duration-500 hover:scale-110 hover:rotate-6",
                            slide.bg
                        )}>
                            {slide.avatar}
                        </div>
                        {/* Pulse Ring */}
                        <div className={cn(
                            "absolute inset-0 rounded-full animate-ping opacity-20",
                            slide.bg
                        )} />
                    </div>

                    {/* Content */}
                    <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-3 tracking-tight">
                        {slide.title}
                    </h2>
                    <p className="text-slate-500 leading-relaxed mb-8 text-sm md:text-base font-medium">
                        {slide.description}
                    </p>

                    {/* Controls */}
                    <div className="w-full mt-auto pt-6 border-t border-slate-100">
                        <div className="flex flex-col items-center gap-6">

                            {/* Pagination Dots */}
                            <div className="flex gap-2">
                                {onboardingSlides.map((_, idx) => (
                                    <div
                                        key={idx}
                                        className={cn(
                                            "h-2 rounded-full transition-all duration-300",
                                            idx === currentSlide
                                                ? "w-8 bg-slate-900"
                                                : "w-2 bg-slate-200"
                                        )}
                                    />
                                ))}
                            </div>

                            {/* Action Buttons */}
                            <div className="w-full flex items-center justify-between px-1">
                                <button
                                    onClick={handleComplete}
                                    className="text-slate-400 hover:text-slate-600 text-sm font-semibold transition-colors px-4 py-2"
                                >
                                    Skip
                                </button>

                                {currentSlide === onboardingSlides.length - 1 ? (
                                    <Button
                                        onClick={handleComplete}
                                        className="bg-slate-900 hover:bg-slate-800 text-white rounded-xl px-6 h-11 font-semibold shadow-lg hover:shadow-xl transition-all active:scale-95"
                                    >
                                        Go to Dashboard
                                    </Button>
                                ) : (
                                    <Button
                                        onClick={handleNext}
                                        className="bg-slate-900 hover:bg-slate-800 text-white rounded-xl px-6 h-11 font-semibold shadow-md hover:shadow-lg transition-all active:scale-95"
                                    >
                                        Next
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                /* 1. Left -> Center */
                @keyframes slide-in-left {
                    0% { opacity: 0; transform: translateX(-100vw) rotate(-10deg); }
                    60% { transform: translateX(20px) rotate(2deg); }
                    100% { opacity: 1; transform: translateX(0) rotate(0); }
                }

                /* 2. Right -> Center */
                @keyframes slide-in-right {
                    0% { opacity: 0; transform: translateX(100vw) rotate(10deg); }
                    60% { transform: translateX(-20px) rotate(-2deg); }
                    100% { opacity: 1; transform: translateX(0) rotate(0); }
                }

                /* 3. Top -> Center */
                @keyframes slide-in-top {
                    0% { opacity: 0; transform: translateY(-100vh) scale(0.5); }
                    60% { transform: translateY(20px) scale(1.02); }
                    100% { opacity: 1; transform: translateY(0) scale(1); }
                }

                /* 4. Bottom -> Center */
                @keyframes slide-in-bottom {
                    0% { opacity: 0; transform: translateY(100vh) scale(0.8); }
                    60% { transform: translateY(-20px) scale(1.02); }
                    100% { opacity: 1; transform: translateY(0) scale(1); }
                }

                /* 5. Top-Left -> Center */
                @keyframes slide-in-top-left {
                    0% { opacity: 0; transform: translate(-100vw, -100vh) rotate(-45deg); }
                    60% { transform: translate(10px, 10px) rotate(5deg); }
                    100% { opacity: 1; transform: translate(0, 0) rotate(0); }
                }

                /* 6. Top-Right -> Center */
                @keyframes slide-in-top-right {
                    0% { opacity: 0; transform: translate(100vw, -100vh) rotate(45deg); }
                    60% { transform: translate(-10px, 10px) rotate(-5deg); }
                    100% { opacity: 1; transform: translate(0, 0) rotate(0); }
                }

                .animate-slide-in-left { animation: slide-in-left 0.7s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; }
                .animate-slide-in-right { animation: slide-in-right 0.7s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; }
                .animate-slide-in-top { animation: slide-in-top 0.7s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; }
                .animate-slide-in-bottom { animation: slide-in-bottom 0.7s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; }
                .animate-slide-in-top-left { animation: slide-in-top-left 0.7s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; }
                .animate-slide-in-top-right { animation: slide-in-top-right 0.7s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; }
            `}</style>
        </div>
    );
}
