import React from 'react';
import {
    GraduationCap,
    ArrowRight,
    Globe,
    Mail,
    Shield,
    Star,
    Heart,
    CheckCircle2
} from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-[#020617] text-slate-300 border-t border-slate-800 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-10 pointer-events-none" />
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[128px] pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[128px] pointer-events-none" />

            <div className="max-w-[1700px] mx-auto px-6 py-10 md:py-20 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 md:gap-12 lg:gap-8">

                    {/* Column 1: Brand & Description (4 cols) */}
                    <div className="lg:col-span-4 space-y-8">
                        <div className="flex items-center gap-3 text-white">
                            <img src="/images/footer_logo.png" alt="Prolync Logo" className="h-12 w-12 object-contain" />
                            <span className="text-2xl font-bold tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                                PROLYNC INFOTECH
                            </span>
                        </div>
                        <p className="text-slate-400 leading-relaxed text-lg max-w-sm">
                            Empowering learners with cutting-edge tools, mentorship, and career opportunities. Join the future of education today.
                        </p>


                    </div>

                    {/* Column 2: Prolync Student Workspace (3 cols) */}
                    <div className="lg:col-span-3">
                        <h3 className="text-white font-bold text-lg mb-8 flex items-center gap-2">
                            Quick Links
                            <span className="h-1 w-12 bg-blue-500 rounded-full ml-4"></span>
                        </h3>
                        <ul className="space-y-4">
                            {[
                                "Prolync Workspace Dashboard",
                                "Courses & Learning Paths",
                                "Coding Platform",
                                "Mentorship & 1:1 Sessions",
                                "Jobs, Internships & Placements",
                                "Projects & Mini Projects",
                                "Events & Hackathons",
                                "Certificates & Skill Badges",
                                "Student Community",
                                "Pricing & Upgrade Plans"
                            ].map((item, i) => (
                                <li key={i}>
                                    <a href="#" className="group flex items-center gap-2 hover:text-blue-400 transition-colors">
                                        <ArrowRight className="w-4 h-4 text-blue-500/0 group-hover:text-blue-500 transition-all -translate-x-2 group-hover:translate-x-0" />
                                        <span className="text-slate-400 group-hover:text-white transition-colors">{item}</span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 3: Prolync Learning Hub (3 cols) */}
                    <div className="lg:col-span-2">
                        <h3 className="text-white font-bold text-lg mb-8 flex items-center gap-2">
                            Learning Hub
                            <span className="h-1 w-8 bg-purple-500 rounded-full ml-4"></span>
                        </h3>
                        <ul className="space-y-4">
                            {[
                                "About Prolync",
                                "Privacy Policy",
                                "Terms of Use",
                                "Refund Policy",
                                "Support & FAQs",
                                "Contact Support"
                            ].map((item, i) => (
                                <li key={i}>
                                    <a href="#" className="group flex items-center gap-2 hover:text-purple-400 transition-colors">
                                        <span className="text-slate-400 group-hover:text-white transition-colors">{item}</span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>


                    {/* Column 4: Social Media (3 cols) */}
                    <div className="lg:col-span-3 space-y-6">
                        <h3 className="text-white font-bold text-lg mb-8 flex items-center gap-2">
                            Connect With Us
                            <span className="h-1 w-12 bg-blue-500 rounded-full ml-4"></span>
                        </h3>

                        <div className="text-slate-400 text-sm leading-relaxed space-y-1 mb-6">
                            <p>Block 2, Off No. 14, CIIC Campus,</p>
                            <p>Crescent University, GST Road,</p>
                            <p>Vandalur, Chennai, Tamil Nadu – 600048.</p>
                        </div>

                        <div className="flex gap-4 flex-wrap">
                            {[
                                { icon: Globe, label: 'Website', color: 'hover:bg-blue-600', href: 'https://www.prolync.in/', target: '_blank' },
                                { icon: Mail, label: 'Email', color: 'hover:bg-purple-600', href: '#', target: undefined },
                            ].map((social, idx) => (
                                <a
                                    key={idx}
                                    href={social.href}
                                    target={social.target}
                                    rel={social.target === '_blank' ? "noopener noreferrer" : undefined}
                                    className={`w-12 h-12 rounded-xl bg-slate-800/50 border border-slate-700/50 flex items-center justify-center text-slate-400 hover:text-white ${social.color} transition-all duration-300 hover:scale-110`}
                                >
                                    <social.icon className="w-5 h-5" />
                                </a>
                            ))}
                            {/* Specific Brand Icons (Simulated) */}
                            <a href="https://www.linkedin.com/company/prolync/posts/?feedView=all" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl bg-slate-800/50 border border-slate-700/50 flex items-center justify-center text-slate-400 hover:text-white hover:bg-blue-700 transition-all duration-300 hover:scale-110">
                                <span className="font-bold">in</span>
                            </a>
                            <a href="#" className="w-12 h-12 rounded-xl bg-slate-800/50 border border-slate-700/50 flex items-center justify-center text-slate-400 hover:text-white hover:bg-red-600 transition-all duration-300 hover:scale-110">
                                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" /></svg>
                            </a>
                        </div>
                    </div>

                </div>

                {/* Bottom Bar */}
                <div className="mt-20 pt-8 border-t border-slate-800/50 flex flex-col items-center justify-center gap-6 text-sm text-slate-500">
                    <p className="hover:text-blue-400 transition-colors"> <strong> © 2025</strong>   <b>Designed And Developed By Prolyncinfotech Private Limited </b>    All rights reserved.</p>
                    <div className="flex gap-8">
                        <a href="#" className="hover:text-blue-400 transition-colors">Privacy</a>
                        <a href="#" className="hover:text-blue-400 transition-colors">Security</a>
                        <a href="#" className="hover:text-blue-400 transition-colors">Sitemap</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
