import React from 'react';
import { Routes, Route } from 'react-router-dom';
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

import { PortfolioProvider } from './context/PortfolioContext';

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
      <div className="min-h-screen bg-[#080c14] text-slate-100 flex flex-col selection:bg-cyan-500/20 selection:text-cyan-300">
        <Navbar />
        <Routes>
          <Route path="/" element={<PortfolioHome />} />
          <Route path="*" element={<PortfolioHome />} />
        </Routes>
        <Footer />
      </div>
    </PortfolioProvider>
  );
}
