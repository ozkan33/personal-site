import React from 'react';
import GlassCard from './GlassCard';

const HeroSection = () => {
    const skillCategories = [
        {
            category: "Frontend & AI",
            skills: ["React", "JavaScript", "MCP Integration", "AI Agents", "LLM Workflows"]
        },
        {
            category: "Backend & APIs",
            skills: ["Node.js", "Python", "API Development", "System Architecture"]
        },
        {
            category: "Testing & Automation",
            skills: ["Playwright", "Selenium", "Test Automation", "CI/CD Pipelines", "DevOps"]
        }
    ];

    return (
        <section className="relative z-10 max-w-4xl mx-auto px-4 text-center flex flex-col items-center justify-center min-h-screen py-20">

            {/* Status Badge */}
            <div className="inline-block mb-8 px-5 py-2 rounded-full border border-[var(--glass-border)] bg-[rgba(255,255,255,0.03)] backdrop-blur-md animate-float shadow-[0_0_15px_rgba(0,242,255,0.1)]">
                <span className="text-sm font-semibold text-[var(--glow-primary)] tracking-wide uppercase">
                    Based in San Diego
                </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-6xl md:text-8xl font-bold mb-8 tracking-tighter leading-[1.1]">
                <span className="block text-transparent bg-clip-text bg-gradient-to-b from-white to-[rgba(255,255,255,0.4)]">
                    Hello, I'm
                </span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[var(--glow-primary)] via-white to-[var(--glow-secondary)] animate-pulse">
                    Özkan Kahveci
                </span>
            </h1>

            {/* Bio Card */}
            <GlassCard className="text-left md:text-center backdrop-blur-2xl bg-[rgba(0,0,0,0.4)] !border-[rgba(255,255,255,0.08)] max-w-2xl mx-auto mb-12 transform transition-all hover:scale-[1.01]">
                <p className="text-lg md:text-xl text-[var(--text-secondary)] leading-relaxed mb-8 font-light">
                    Lead Software Systems Engineer architecting robust automation frameworks and scalable
                    testing infrastructure. I transform complex system challenges into elegant solutions,
                    orchestrating CI/CD pipelines, AI-driven automation, and MCP integrations that power modern software delivery.
                </p>

                {/* Tech Stack Tags - Categorized */}
                <div className="space-y-4">
                    {skillCategories.map((category) => (
                        <div key={category.category} className="flex flex-wrap justify-center gap-2">
                            {category.skills.map((skill) => (
                                <span
                                    key={skill}
                                    className="px-4 py-1.5 rounded-full text-xs font-medium bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] text-[var(--text-primary)] hover:border-[var(--glow-primary)] hover:text-[var(--glow-primary)] transition-colors cursor-default"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    ))}
                </div>
            </GlassCard>

            {/* CTA Button */}
            <div className="mt-4">
                <a href="mailto:ozkankahveci@outlook.com" className="group relative inline-block px-10 py-4 rounded-full bg-white text-black font-bold text-lg hover:scale-105 transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:shadow-[0_0_50px_rgba(0,242,255,0.4)]">
                    <span className="relative z-10">Get in Touch</span>
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[var(--glow-primary)] to-[var(--glow-secondary)] opacity-0 group-hover:opacity-20 transition-opacity blur-lg" />
                </a>
            </div>
        </section>
    );
};

export default HeroSection;
