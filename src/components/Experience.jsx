import React from 'react';
import { Briefcase, GraduationCap, Calendar, MapPin, Sparkles, ChevronRight } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function Experience() {
  return (
    <section id="experience" className="py-24 relative overflow-hidden bg-slate-950/40 scroll-mt-16">
      {/* Ambient background blur */}
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Career Journey</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Work Experience & <span className="text-gradient">Education</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            A track record of shipping production features, driving frontend performance, and continuous growth.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Experience Timeline (Left 7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400">
                <Briefcase className="w-5 h-5" />
              </div>
              <h3 className="text-2xl font-bold text-white">Work Experience</h3>
            </div>

            <div className="relative border-l border-slate-800 ml-4 space-y-10 pl-6 sm:pl-8">
              {portfolioData.experience.map((exp, index) => (
                <div key={index} className="relative group">
                  {/* Timeline node */}
                  <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-[#090d16] border-2 border-cyan-500 group-hover:bg-cyan-400 group-hover:scale-125 transition-all shadow-md shadow-cyan-500/20" />

                  <div className="glass-panel p-6 sm:p-7 rounded-2xl border border-slate-800/80 hover:border-cyan-500/30 transition-all hover:-translate-y-1">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <h4 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                        {exp.role}
                      </h4>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{exp.period}</span>
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-400 mb-4">
                      <span className="font-semibold text-slate-300">{exp.company}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{exp.location}</span>
                      </span>
                    </div>

                    <p className="text-slate-300 text-sm leading-relaxed mb-4">
                      {exp.description}
                    </p>

                    {/* Achievements */}
                    <div className="space-y-2">
                      {exp.achievements.map((ach, aIdx) => (
                        <div key={aIdx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-400">
                          <ChevronRight className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                          <span>{ach}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education & Testimonials (Right 5 cols) */}
          <div className="lg:col-span-5 space-y-10">
            
            {/* Education */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <h3 className="text-2xl font-bold text-white">Education</h3>
              </div>

              {portfolioData.education.map((edu, idx) => (
                <div
                  key={idx}
                  className="glass-panel p-6 sm:p-7 rounded-2xl border border-slate-800/80 hover:border-indigo-500/30 transition-all hover:-translate-y-1 group"
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{edu.period}</span>
                    </span>
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{edu.location}</span>
                    </span>
                  </div>

                  <h4 className="text-lg font-bold text-white mb-1 group-hover:text-indigo-300 transition-colors">
                    {edu.degree}
                  </h4>
                  <p className="text-sm font-medium text-slate-300 mb-3">{edu.institution}</p>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {edu.details}
                  </p>
                </div>
              ))}
            </div>

            {/* Testimonial preview */}
            {portfolioData.testimonials && portfolioData.testimonials.length > 0 && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <span>Recommendations</span>
                </h3>

                {portfolioData.testimonials.map((testi, tIdx) => (
                  <div
                    key={tIdx}
                    className="glass-panel p-6 rounded-2xl border border-slate-800/80 space-y-4"
                  >
                    <p className="text-slate-300 text-sm italic leading-relaxed">
                      "{testi.quote}"
                    </p>
                    <div className="flex items-center gap-3 pt-2 border-t border-slate-800">
                      <img
                        src={testi.avatar}
                        alt={testi.author}
                        className="w-10 h-10 rounded-full object-cover border border-cyan-500/40"
                      />
                      <div>
                        <div className="text-sm font-bold text-white">{testi.author}</div>
                        <div className="text-xs text-slate-400">{testi.title}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
