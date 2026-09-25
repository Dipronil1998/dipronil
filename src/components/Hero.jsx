import React, { useState, useEffect } from 'react';
import { ArrowRight, Download, Sparkles, FolderGit2, Briefcase, Cpu, Smile, Terminal, CheckCircle } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

const iconMap = {
  Briefcase: Briefcase,
  FolderGit2: FolderGit2,
  Cpu: Cpu,
  Smile: Smile,
};

export default function Hero() {
  const { personal, stats, isFromBackend } = usePortfolio();
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [fadeState, setFadeState] = useState('fade-in');

  useEffect(() => {
    if (!personal?.roles?.length) return;
    const interval = setInterval(() => {
      setFadeState('fade-out');
      setTimeout(() => {
        setCurrentRoleIndex((prev) => (prev + 1) % personal.roles.length);
        setFadeState('fade-in');
      }, 300);
    }, 3200);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="hero" className="relative min-h-screen pt-32 pb-20 flex flex-col justify-center overflow-hidden">
      {/* Ambient background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/15 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[450px] h-[450px] bg-indigo-500/15 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-violet-500/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b0f_1px,transparent_1px),linear-gradient(to_bottom,#1e293b0f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Main Hero Content */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">

            {/* Status Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-slate-900/80 border border-slate-700/60 backdrop-blur-md shadow-inner text-xs sm:text-sm font-medium text-slate-300">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span>{personal.availability}</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-3">
              <p className="text-slate-400 font-mono text-base sm:text-lg flex items-center justify-center lg:justify-start gap-2">
                <Terminal className="w-5 h-5 text-cyan-400" />
                <span>Hello, World! I am</span>
              </p>
              <h1 className="text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight text-white leading-tight">
                {personal.name}
              </h1>
              <div className="h-12 flex items-center justify-center lg:justify-start">
                <span className="text-xl sm:text-3xl font-semibold text-slate-300">
                  I build{' '}
                  <span
                    className={`text-gradient font-bold transition-opacity duration-300 ${fadeState === 'fade-in' ? 'opacity-100' : 'opacity-0'
                      }`}
                  >
                    {personal.roles?.[currentRoleIndex] || personal.title}
                  </span>
                </span>
              </div>
            </div>

            {/* Bio paragraph */}
            <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              {personal.bio}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-white bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:via-blue-500 hover:to-indigo-500 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>View Projects</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-slate-200 bg-slate-900/80 hover:bg-slate-800 border border-slate-700 hover:border-slate-600 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>Contact Me</span>
              </a>

              <a
                href={personal.resumeUrl}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 border border-transparent hover:border-slate-700 transition-all"
              >
                <Download className="w-4 h-4" />
                <span>Resume</span>
              </a>
            </div>

            {/* Tech Pill highlights */}
            <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-center lg:justify-start gap-2 text-xs font-mono text-slate-400">
              <span className="text-slate-400 mr-2">Core Tech:</span>
              {['React (JSX)', 'Vite', 'Tailwind CSS', 'JavaScript ES6+', 'Node.js', 'MySQL'].map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-md bg-slate-900/80 border border-slate-800 text-slate-300 hover:border-cyan-500/40 hover:text-cyan-300 transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Right Hero Visual Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md">
              {/* Outer decorative glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-600 rounded-3xl blur-xl opacity-30 animate-pulse-glow" />

              {/* Code window mock */}
              <div className="relative rounded-2xl bg-slate-950/90 border border-slate-800 shadow-2xl p-6 backdrop-blur-xl space-y-4">
                {/* Header buttons */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  </div>
                  <span className="text-xs font-mono text-slate-400">developer.config.jsx</span>
                </div>

                {/* Code syntax */}
                <div className="font-mono text-xs sm:text-sm text-slate-300 space-y-2 overflow-x-auto">
                  <p className="text-slate-400">
                    <span className="text-purple-400">const</span>{' '}
                    <span className="text-cyan-400">developer</span> = &#123;
                  </p>
                  <p className="pl-4">
                    <span className="text-slate-400">name:</span>{' '}
                    <span className="text-emerald-300">'{personal.name}'</span>,
                  </p>
                  <p className="pl-4">
                    <span className="text-slate-400">skills:</span> [
                    <span className="text-amber-300">'React'</span>,{' '}
                    <span className="text-amber-300">'Vite'</span>,{' '}
                    <span className="text-amber-300">'Tailwind'</span>,{' '}
                    <span className="text-amber-300">'Node'</span>],
                  </p>
                  <p className="pl-4">
                    <span className="text-slate-400">lovesCleanCode:</span>{' '}
                    <span className="text-cyan-400">true</span>,
                  </p>
                  <p className="pl-4">
                    <span className="text-slate-400">status:</span>{' '}
                    <span className="text-emerald-300">'Ready for Impact 🚀'</span>,
                  </p>
                  <p className="pl-4">
                    <span className="text-slate-400">contact:</span> () =&gt; &#123;
                  </p>
                  <p className="pl-8 text-cyan-300">
                    return <span className="text-indigo-400">"Let's build something amazing!"</span>;
                  </p>
                  <p className="pl-4">&#125;</p>
                  <p>&#125;;</p>
                </div>

                {/* Quick Interactive status bar */}
                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                  <div className="flex items-center gap-1.5 text-emerald-400 font-mono">
                    <CheckCircle className="w-4 h-4" />
                    <span>Build: Passing</span>
                  </div>
                  <span className="font-mono text-cyan-400">React + Vite v6</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Stats Section Bar */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, index) => {
            const IconComponent = iconMap[stat.icon] || Briefcase;
            return (
              <div
                key={index}
                className="glass-panel p-5 sm:p-6 rounded-2xl border border-slate-800/80 hover:border-cyan-500/30 transition-all hover:translate-y-[-2px] group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-colors">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                      {stat.value}
                    </div>
                    <div className="text-xs sm:text-sm text-slate-400 font-medium">
                      {stat.label}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
