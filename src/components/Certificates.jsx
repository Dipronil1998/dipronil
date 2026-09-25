import React, { useState } from 'react';
import { Award, ExternalLink, Calendar, ShieldCheck, CheckCircle2, Eye, X, Sparkles } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function Certificates() {
  const [selectedCert, setSelectedCert] = useState(null);
  const certificates = portfolioData.certificates || [];

  if (certificates.length === 0) return null;

  return (
    <section id="certificates" className="py-24 relative overflow-hidden scroll-mt-16">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[150px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-indigo-500/10 rounded-full blur-[130px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
            <Award className="w-3.5 h-3.5" />
            <span>Verified Credentials</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Certifications & <span className="text-gradient">Achievements</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Professional certifications and specialized coursework demonstrating technical mastery and commitment to continuous learning.
          </p>
        </div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {certificates.map((cert) => (
            <div
              key={cert.id}
              className="glass-panel p-6 sm:p-7 rounded-3xl border border-slate-800/80 hover:border-cyan-500/40 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 group shadow-xl shadow-black/20"
            >
              <div className="space-y-5">
                {/* Top bar with Issuer & Verified Badge */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400">
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">
                        {cert.issuer}
                      </div>
                      <div className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                        <Calendar className="w-3 h-3" />
                        <span>Issued {cert.issueDate}</span>
                      </div>
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Verified</span>
                  </span>
                </div>

                {/* Certificate Title */}
                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug">
                    {cert.title}
                  </h3>
                  {cert.credentialId && (
                    <div className="mt-2 inline-block font-mono text-xs text-slate-400 bg-slate-900/80 px-2.5 py-1 rounded-md border border-slate-800">
                      ID: <span className="text-slate-300">{cert.credentialId}</span>
                    </div>
                  )}
                </div>

                {/* Skills tags */}
                {cert.skills && (
                  <div className="space-y-1.5 pt-1">
                    <div className="text-xs text-slate-400 font-medium">Competencies:</div>
                    <div className="flex flex-wrap gap-1.5">
                      {cert.skills.map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="px-2.5 py-0.5 rounded-md text-xs font-mono font-medium bg-slate-900 text-slate-300 border border-slate-800"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Action Links */}
              <div className="pt-5 mt-5 border-t border-slate-800/80 flex items-center justify-between">
                <button
                  onClick={() => setSelectedCert(cert)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Preview Badge</span>
                </button>

                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold text-cyan-400 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 transition-all group-hover:shadow-sm"
                >
                  <span>Verify Credential</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Certificate Preview Modal */}
      {selectedCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
            onClick={() => setSelectedCert(null)}
          />
          <div className="relative w-full max-w-2xl rounded-3xl bg-[#0d131f] border border-slate-800 shadow-2xl overflow-hidden z-10 p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-cyan-400" />
                <span className="font-bold text-white text-base sm:text-lg">{selectedCert.issuer}</span>
              </div>
              <button
                onClick={() => setSelectedCert(null)}
                className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 max-h-72">
              <img
                src={selectedCert.image}
                alt={selectedCert.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-2">
              <h4 className="text-xl font-bold text-white">{selectedCert.title}</h4>
              <p className="text-xs font-mono text-slate-400">
                Credential ID: <span className="text-cyan-400">{selectedCert.credentialId}</span> • Issued {selectedCert.issueDate}
              </p>
            </div>

            <div className="pt-2 flex justify-end gap-3">
              <button
                onClick={() => setSelectedCert(null)}
                className="px-4 py-2 rounded-xl text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                Close
              </button>
              <a
                href={selectedCert.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-cyan-500 to-indigo-600 shadow-md shadow-cyan-500/20"
              >
                <span>Verify on Issuer Site</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
