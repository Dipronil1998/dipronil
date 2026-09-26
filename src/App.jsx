import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Articles from './components/Articles';
import Experience from './components/Experience';
import Certificates from './components/Certificates';
import Contact from './components/Contact';
import BlogsPage from './pages/BlogsPage';
import CertificatesPage from './pages/CertificatesPage';
import ProjectsPage from './pages/ProjectsPage';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import SEO from './components/SEO';

import { PortfolioProvider } from './context/PortfolioContext';

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const timer = setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      return () => clearTimeout(timer);
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [pathname, hash]);

  return null;
}

function PortfolioHome() {
  return (
    <main className="flex-1">
      <SEO 
        title="Dipronil Das | Senior Full Stack Developer & Software Engineer"
        description="Official portfolio of Dipronil Das — Senior Full Stack Developer & Software Engineer specializing in React, Node.js, Next.js, and modern cloud architecture."
        keywords="Dipronil Das, Full Stack Developer, Software Engineer, React Developer, Node.js, Web Development, Kolkata, Portfolio"
      />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Articles />
      <Experience />
      <Certificates />
      <Contact />
    </main>
  );
}

export default function App() {
  return (
    <PortfolioProvider>
      <ScrollToTop />
      <div className="min-h-screen bg-[#080c14] text-slate-100 flex flex-col selection:bg-cyan-500/20 selection:text-cyan-300">
        <Navbar />
        <Routes>
          <Route path="/" element={<PortfolioHome />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/blogs" element={<BlogsPage />} />
          <Route path="/articles" element={<BlogsPage />} />
          <Route path="/certificates" element={<CertificatesPage />} />
          <Route path="/certifications" element={<CertificatesPage />} />
          <Route path="*" element={<PortfolioHome />} />
        </Routes>
        <Footer />
        <Chatbot />
      </div>
    </PortfolioProvider>
  );
}
