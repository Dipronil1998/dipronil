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
import Footer from './components/Footer';
import BlogsPage from './pages/BlogsPage';
import CertificatesPage from './pages/CertificatesPage';

import { PortfolioProvider } from './context/PortfolioContext';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
}

function PortfolioHome() {
  return (
    <main className="flex-1">
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
          <Route path="/blogs" element={<BlogsPage />} />
          <Route path="/articles" element={<BlogsPage />} />
          <Route path="/certificates" element={<CertificatesPage />} />
          <Route path="/certifications" element={<CertificatesPage />} />
          <Route path="*" element={<PortfolioHome />} />
        </Routes>
        <Footer />
      </div>
    </PortfolioProvider>
  );
}
