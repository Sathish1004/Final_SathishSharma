import { useRef, useEffect, useState } from 'react';
import { BookOpen, Users, Layout, CheckCircle2, Code, Briefcase, GraduationCap, Trophy } from 'lucide-react';

const slides = [
    {
        id: 1,
        icon: BookOpen,
        title: "100+ Industry-Ready Courses",
        highlight: "Learn once. Apply everywhere.",
        description: [
            "Professionally structured courses designed by industry experts",
            "Video-based learning with real-world examples",
            "Certifications aligned with job requirements",
            "Beginner to advanced learning paths"
        ],
        color: "text-blue-600",
        bg: "bg-blue-50"
    },
    {
        id: 2,
        icon: Code,
        title: "Interactive Coding Platform",
        highlight: "Practice coding without leaving your browser.",
        description: [
            "Built-in code editor supports 10+ languages",
            "Real-time output and error debugging",
            "Daily coding challenges and contests",
            "Project-based learning approach"
        ],
        color: "text-purple-600",
        bg: "bg-purple-50"
    },
    {
        id: 3,
        icon: Users,
        title: "50+ Expert Mentors",
        highlight: "Learn directly from people who work in the industry.",
        description: [
            "One-on-one mentorship sessions",
            "Guidance from working professionals",
            "Career planning, resume review, and mock interviews",
            "Personalized learning support"
        ],
        color: "text-emerald-600",
        bg: "bg-emerald-50"
    },
    {
        id: 4,
        icon: Briefcase,
        title: "Jobs & Internships",
        highlight: "Connecting talent with top opportunities.",
        description: [
            "Exclusive internship listings for students",
            "Full-time job opportunities for freshers",
            "Direct application to partner companies",
            "Resume building and portfolio showcasing"
        ],
        color: "text-orange-600",
        bg: "bg-orange-50"
    },
    {
        id: 5,
        icon: Trophy,
        title: "Placement Support",
        highlight: "Your bridge from campus to corporate.",
        description: [
            "Dedicated placement cell assistance",
            "Mock aptitude tests and technical interviews",
            "Soft skills and communication training",
            "Guaranteed interview opportunities for top performers"
        ],
        color: "text-amber-600",
        bg: "bg-amber-50"
    },
    {
        id: 6,
        icon: Layout,
        title: "One Unified Student Workspace",
        highlight: "Everything you need — in one workspace.",
        description: [
            "Single login for courses, coding practice, mentorship, and jobs",
            "Track learning progress and achievements in one dashboard",
            "Seamless transition from learning → practice → placement",
            "Built for students, freshers, and career switchers"
        ],
        color: "text-indigo-600",
        bg: "bg-indigo-50"
    }
];

export default function ScrollBasedSlider() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeSlide, setActiveSlide] = useState(0);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            if (!containerRef.current) return;

            const { top, height } = containerRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            // Calculate how far we've scrolled into the container
            // We want the interaction to start when the container hits the top (or near it)
            const scrollDistance = -top;
            const totalScrollableHeight = height - windowHeight;

            if (totalScrollableHeight <= 0) return;

            // Normalize scroll progress between 0 and 1
            let normalizedProgress = scrollDistance / totalScrollableHeight;
            normalizedProgress = Math.max(0, Math.min(1, normalizedProgress));

            setProgress(normalizedProgress * 100);

            // Determine active slide based on chunks of progress
            const slideIndex = Math.floor(normalizedProgress * slides.length);
            // Clamp index to valid range (0 to slides.length - 1)
            setActiveSlide(Math.min(slides.length - 1, Math.max(0, slideIndex)));
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div ref={containerRef} className="relative h-[600vh] bg-white">
            <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">

                {/* Section Header */}
                <div className="absolute top-8 left-0 right-0 z-20 text-center px-4">
                    <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">Why Choose Student Workspace?</h2>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">A single platform designed to support learning, coding, mentorship, and careers.</p>
                </div>

                {/* Slides Container */}
                <div className="relative w-full max-w-5xl mx-auto px-6 h-[600px] flex items-center justify-center">
                    {slides.map((slide, index) => (
                        <div
                            key={slide.id}
                            className={`absolute inset-0 transition-all duration-700 ease-in-out flex flex-col items-center justify-center p-8
                        ${index === activeSlide ? 'opacity-100 translate-y-0 scale-100 z-10' :
                                    index < activeSlide ? 'opacity-0 -translate-y-10 scale-95 z-0' :
                                        'opacity-0 translate-y-10 scale-95 z-0'}
                    `}
                        >
                            <div className="bg-white rounded-[2rem] shadow-2xl border border-slate-100 p-8 md:p-12 w-full max-w-4xl mx-auto text-center transform transition-transform hover:scale-[1.01] duration-500">
                                {/* Icon */}
                                <div className={`h-20 w-20 ${slide.bg} rounded-3xl flex items-center justify-center mx-auto mb-8`}>
                                    <slide.icon className={`h-10 w-10 ${slide.color}`} />
                                </div>

                                {/* Content */}
                                <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{slide.title}</h3>
                                <p className={`text-xl font-medium ${slide.color} mb-8`}>{slide.highlight}</p>

                                <div className="grid md:grid-cols-2 gap-4 text-left max-w-2xl mx-auto">
                                    {slide.description.map((item, i) => (
                                        <div key={i} className="flex items-start gap-3">
                                            <CheckCircle2 className={`h-6 w-6 ${slide.color} shrink-0`} />
                                            <span className="text-slate-600 text-lg leading-relaxed">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Progress Indicators */}
                <div className="absolute bottom-12 left-0 right-0 z-20 flex justify-center gap-4">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => {
                                // Optional: Smooth scroll to that section position if needed
                                // For now just visual indicator as scroll drives it
                            }}
                            className={`h-3 rounded-full transition-all duration-500 
                        ${index === activeSlide ? 'w-12 bg-slate-900' : 'w-3 bg-slate-300 hover:bg-slate-400'}
                    `}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>

                {/* Scroll Progress Bar at Bottom */}
                <div className="absolute bottom-0 left-0 h-1.5 bg-slate-100 w-full">
                    <div
                        className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 transition-all duration-100 ease-out"
                        style={{ width: `${progress}%` }}
                    />
                </div>

            </div>
        </div>
    );
}
