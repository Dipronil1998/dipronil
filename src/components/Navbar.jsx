import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Mail, Code2, ArrowUpRight, BookOpen } from 'lucide-react';
import { Github, Linkedin, Medium } from './Icons';
import { usePortfolio } from '../context/PortfolioContext';

export default function Navbar() {
  const { personal = {} } = usePortfolio();
  const location = useLocation();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const isInnerPage = location.pathname !== '/';
  const isBlogsPage = location.pathname === '/blogs' || location.pathname === '/articles';
  const isCertsPage = location.pathname === '/certificates' || location.pathname === '/certifications';
  const isProjectsPage = location.pathname === '/projects';

  const navLinks = [
    { name: 'About', href: '/#about', hash: 'about' },
    { name: 'Skills', href: '/#skills', hash: 'skills' },
    { name: 'Projects', href: '/projects', isRoute: true, match: isProjectsPage },
    { name: 'Experience', href: '/#experience', hash: 'experience' },
    { name: 'Certificates', href: '/certificates', isRoute: true, match: isCertsPage },
    { name: 'Blogs', href: '/blogs', isRoute: true, match: isBlogsPage },
    { name: 'Contact', href: '/#contact', hash: 'contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      if (isInnerPage) return;

      const sections = ['hero', 'about', 'skills', 'projects', 'articles', 'experience', 'certificates', 'contact'];

      // Check if user scrolled near the bottom of the page
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 80) {
        setActiveSection('contact');
        return;
      }

      // Check sections from bottom to top with header offset
      const scrollPosition = window.scrollY + 200;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isInnerPage]);

  const handleNavClick = (link, e) => {
    setMobileMenuOpen(false);

    if (link.isRoute || isInnerPage) {
      // Standard SPA route transition handled by React Router Link
      return;
    }

    // On home page: smooth scroll to section without route reload
    e.preventDefault();
    const el = document.getElementById(link.hash);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(link.hash);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || isInnerPage
          ? 'bg-[#090d16]/85 backdrop-blur-xl border-b border-slate-800/80 shadow-lg shadow-black/20 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Link
          to="/"
          onClick={() => {
            if (!isInnerPage) {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              setActiveSection('hero');
            }
          }}
          className="group flex items-center gap-2.5 font-bold text-xl tracking-tight text-white focus:outline-none"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-cyan-500/25 group-hover:scale-105 transition-transform duration-200">
            <Code2 className="w-5 h-5" />
          </div>
          <span className="font-extrabold bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent group-hover:to-cyan-400 transition-colors">
            Dipronil<span className="text-cyan-400">.dev</span>
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-900/60 p-1.5 rounded-full border border-slate-800/80 backdrop-blur-md">
          {navLinks.map((link) => {
            const isActive = link.isRoute
              ? link.match
              : !isInnerPage && activeSection === link.hash;

            return (
              <Link
                key={link.name}
                to={link.href}
                onClick={(e) => handleNavClick(link, e)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-semibold shadow-md shadow-cyan-500/20'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Action Button & Social Links */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href={personal.github}
            target="_blank"
            rel="me noopener noreferrer"
            aria-label="Dipronil Das GitHub Profile"
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 border border-slate-800 transition-colors"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href={personal.linkedin}
            target="_blank"
            rel="me noopener noreferrer"
            aria-label="Dipronil Das LinkedIn Profile"
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 border border-slate-800 transition-colors"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          {personal.medium && (
            <a
              href={personal.medium}
              target="_blank"
              rel="me noopener noreferrer"
              aria-label="Dipronil Das Medium Articles"
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 border border-slate-800 transition-colors"
            >
              <Medium className="w-5 h-5" />
            </a>
          )}
          <Link
            to="/#contact"
            onClick={(e) => {
              if (!isInnerPage) {
                e.preventDefault();
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 shadow-md shadow-cyan-500/20 hover:shadow-cyan-500/30 transition-all active:scale-95"
          >
            <span>Let's Talk</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 border border-slate-800 transition-colors"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0c121e]/95 backdrop-blur-2xl border-b border-slate-800 px-6 py-6 space-y-4 animate-in fade-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => {
              const isActive = link.isRoute
                ? link.match
                : !isInnerPage && activeSection === link.hash;

              return (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={(e) => handleNavClick(link, e)}
                  className={`px-4 py-2.5 rounded-xl text-base font-medium transition-colors ${
                    isActive
                      ? 'bg-cyan-500/15 text-cyan-400 font-semibold'
                      : 'text-slate-200 hover:text-cyan-400 hover:bg-slate-800/50'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>
          <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <a
                href={personal.github}
                target="_blank"
                rel="me noopener noreferrer"
                aria-label="Dipronil Das GitHub Profile"
                className="p-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href={personal.linkedin}
                target="_blank"
                rel="me noopener noreferrer"
                aria-label="Dipronil Das LinkedIn Profile"
                className="p-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              {personal.medium && (
                <a
                  href={personal.medium}
                  target="_blank"
                  rel="me noopener noreferrer"
                  aria-label="Dipronil Das Medium Articles"
                  className="p-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800"
                >
                  <Medium className="w-5 h-5" />
                </a>
              )}
              <a
                href={`mailto:${personal.email}`}
                aria-label="Email Dipronil Das"
                className="p-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
            <Link
              to="/#contact"
              onClick={(e) => {
                setMobileMenuOpen(false);
                if (!isInnerPage) {
                  e.preventDefault();
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-cyan-500 to-indigo-600 shadow-md shadow-cyan-500/20"
            >
              <span>Get in touch</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
