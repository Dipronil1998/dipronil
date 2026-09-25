import React from 'react';
import { Sparkles, Code2, Server, Gauge, ShieldCheck, CheckCircle2, MapPin, Mail, Calendar, Award } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

const highlightIcons = [Code2, Server, Gauge, ShieldCheck];

export default function About() {
  const { about = {}, personal = {} } = usePortfolio();
  return (
    <section id="about" className="py-24 relative overflow-hidden scroll-mt-16">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[130px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>About Me</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Passionate About Crafting <span className="text-gradient">Digital Impact</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            A software engineer dedicated to building scalable web architecture, delighting users with intuitive UI, and writing maintainable, clean code.
          </p>
        </div>

        {/* Story & Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

          {/* Left: Bio & Quick Facts */}
          <div className="lg:col-span-6 space-y-6">
            <div className="glass-panel p-8 rounded-3xl border border-slate-800 space-y-6">
              <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                <span>Who I Am</span>
                <span className="w-12 h-0.5 bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-full" />
              </h3>

              <div className="space-y-4 text-slate-300 leading-relaxed text-sm sm:text-base">
                <p>{about.story}</p>
                <p>{about.secondaryStory}</p>
              </div>

              {/* Quick Details Chips */}
              <div className="pt-4 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 text-slate-300 text-sm">
                  <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">Location</div>
                    <div className="font-semibold text-white">{personal.location}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-slate-300 text-sm">
                  <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">Email</div>
                    <div className="font-semibold text-white truncate">{personal.email}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-slate-300 text-sm">
                  <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">Experience</div>
                    <div className="font-semibold text-white">5+ Years Building</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-slate-300 text-sm">
                  <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">Specialization</div>
                    <div className="font-semibold text-white">React & Node Stack</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Key Engineering Strengths */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {(about.highlights || []).map((item, idx) => {
              const IconComp = highlightIcons[idx % highlightIcons.length];
              return (
                <div
                  key={item.title}
                  className="glass-panel p-6 rounded-2xl border border-slate-800/80 hover:border-cyan-500/30 transition-all hover:-translate-y-1 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/15 to-indigo-500/15 flex items-center justify-center text-cyan-400 mb-4 group-hover:scale-110 group-hover:text-cyan-300 transition-all">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
