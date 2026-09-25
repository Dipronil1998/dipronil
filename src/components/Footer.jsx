import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUp, Code2, Heart, Mail } from 'lucide-react';
import { Github, Linkedin, Twitter, Medium } from './Icons';
import { usePortfolio } from '../context/PortfolioContext';

export default function Footer() {
  const { personal = {} } = usePortfolio();
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#060910] border-t border-slate-800/80 pt-16 pb-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-slate-800/60">

          {/* Brand Col */}
          <div className="md:col-span-6 space-y-4">
            <Link to="/" className="flex items-center gap-2.5 font-bold text-xl text-white">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-cyan-500/20">
                <Code2 className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-white">
                Dipronil<span className="text-cyan-400">.dev</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm max-w-sm leading-relaxed">
              Designing and developing high quality web applications, interactive user experiences, and scalable software solutions.
            </p>
          </div>

          {/* Quick Links Col */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <a href="/#about" className="hover:text-cyan-400 transition-colors">About Me</a>
              </li>
              <li>
                <a href="/#skills" className="hover:text-cyan-400 transition-colors">Skills & Stack</a>
              </li>
              <li>
                <a href="/#projects" className="hover:text-cyan-400 transition-colors">Featured Projects</a>
              </li>
              <li>
                <Link to="/blogs" className="hover:text-cyan-400 transition-colors text-cyan-400 font-medium">
                  Technical Blogs (All)
                </Link>
              </li>
              <li>
                <a href="/#experience" className="hover:text-cyan-400 transition-colors">Experience & Education</a>
              </li>
              <li>
                <Link to="/certificates" className="hover:text-cyan-400 transition-colors text-cyan-400 font-medium">
                  Certificates & Badges
                </Link>
              </li>
              <li>
                <a href="/#contact" className="hover:text-cyan-400 transition-colors">Contact</a>
              </li>
            </ul>
          </div>

          {/* Socials & Back to Top */}
          <div className="md:col-span-3 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Connect
              </h4>
              <div className="flex items-center gap-2.5">
                <a
                  href={personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-cyan-500/40 transition-colors"
                  aria-label="GitHub"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href={personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-cyan-500/40 transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                {personal.medium && (
                  <a
                    href={personal.medium}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-cyan-500/40 transition-colors"
                    aria-label="Medium"
                  >
                    <Medium className="w-4 h-4" />
                  </a>
                )}
                {personal.twitter && (
                  <a
                    href={personal.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-cyan-500/40 transition-colors"
                    aria-label="Twitter"
                  >
                    <Twitter className="w-4 h-4" />
                  </a>
                )}
                <a
                  href={`mailto:${personal.email}`}
                  className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-cyan-500/40 transition-colors"
                  aria-label="Email"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>

            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-cyan-400 transition-colors self-start cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} Dipronil Das. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
