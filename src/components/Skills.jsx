import React, { useState } from 'react';
import { 
  Code2, 
  Server, 
  Database, 
  Wrench, 
  FileCode2, 
  Palette, 
  Layout, 
  FileCode, 
  Layers, 
  Box, 
  Zap, 
  Terminal, 
  Network, 
  GitGraph, 
  FileText, 
  Shield, 
  HardDrive, 
  Activity, 
  Cloud, 
  Container, 
  CloudLightning, 
  GitBranch, 
  Send, 
  CheckCircle2, 
  TerminalSquare, 
  Workflow, 
  Sparkles 
} from 'lucide-react';
import { Figma, Swagger } from './Icons';
import { portfolioData } from '../data/portfolioData';

const iconLookup = {
  Code2,
  FileCode2,
  Palette,
  Layout,
  FileCode,
  Layers,
  Box,
  Zap,
  Server,
  Terminal,
  Network,
  GitGraph,
  FileText,
  Shield,
  Database,
  HardDrive,
  Activity,
  Cloud,
  Container,
  CloudLightning,
  GitBranch,
  Send,
  Figma,
  Swagger,
  CheckCircle2,
  TerminalSquare,
  Workflow,
};

export default function Skills() {
  const [activeTab, setActiveTab] = useState('frontend');

  const categories = [
    { id: 'frontend', name: 'Frontend', icon: Code2, data: portfolioData.skills.frontend, desc: 'Client-side architecture, reactive UI, and state management' },
    { id: 'backend', name: 'Backend & APIs', icon: Server, data: portfolioData.skills.backend, desc: 'Scalable services, routing, and asynchronous processing' },
    { id: 'databaseCloud', name: 'Databases & Cloud', icon: Database, data: portfolioData.skills.databaseCloud, desc: 'Relational & NoSQL databases, storage, and cloud hosting' },
    { id: 'tools', name: 'Tools & DevOps', icon: Wrench, data: portfolioData.skills.tools, desc: 'Version control, build tools, CI/CD, and developer tooling' },
  ];

  const currentCategory = categories.find((c) => c.id === activeTab) || categories[0];

  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-slate-950/40 scroll-mt-16">
      {/* Glow background */}
      <div className="absolute top-1/3 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Technical Expertise</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Skills & <span className="text-gradient">Technology Stack</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            A comprehensive set of modern technologies, libraries, and tools I use to deliver end-to-end digital solutions.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = activeTab === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-lg shadow-cyan-500/20 scale-105'
                    : 'bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-800/80 border border-slate-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Description */}
        <div className="text-center mb-8">
          <p className="text-sm font-mono text-cyan-400/90">
            // {currentCategory.desc}
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {currentCategory.data.map((skill) => {
            const Icon = iconLookup[skill.icon] || Code2;
            return (
              <div
                key={skill.name}
                className="glass-panel p-5 rounded-2xl border border-slate-800/80 hover:border-cyan-500/40 transition-all hover:-translate-y-1 group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-cyan-400 group-hover:bg-cyan-500/10 group-hover:text-cyan-300 transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-400 group-hover:text-cyan-400 transition-colors">
                    {skill.level}%
                  </span>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold text-white text-base group-hover:text-cyan-300 transition-colors">
                    {skill.name}
                  </h4>

                  {/* Progress bar */}
                  <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-800">
                    <div
                      className="bg-gradient-to-r from-cyan-500 to-indigo-500 h-full rounded-full transition-all duration-700 ease-out"
                      style={{ width: `${skill.level}%` }}
                    />
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
