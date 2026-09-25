import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {
  Award,
  Search,
  ExternalLink,
  Calendar,
  ShieldCheck,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Eye,
  X,
  Copy,
  Check,
  RefreshCw,
  CheckCircle2,
  Tag,
  SlidersHorizontal,
  Bookmark,
  GraduationCap
} from 'lucide-react';
import { fetchCertificates } from '../services/api';
import { usePortfolio } from '../context/PortfolioContext';

export default function CertificatesPage() {
  const { personal } = usePortfolio();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIssuer, setSelectedIssuer] = useState('All');
  const [selectedSkill, setSelectedSkill] = useState('All');
  const [previewCert, setPreviewCert] = useState(null);
  const [copiedId, setCopiedId] = useState(null);

  // Fetch all certificates via React Query
  const {
    data: certsData,
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['allCertificates'],
    queryFn: fetchCertificates,
    staleTime: 1000 * 60 * 3, // 3 minutes cache
    refetchOnMount: true,
  });

  const allCerts = certsData?.certificates || [];

  // Extract unique issuers
  const allIssuers = useMemo(() => {
    const issuerSet = new Set(['All']);
    allCerts.forEach((c) => {
      if (c.issuer) {
        if (c.issuer.includes('Coursera')) issuerSet.add('Coursera');
        else if (c.issuer.includes('Udemy')) issuerSet.add('Udemy');
        else issuerSet.add(c.issuer);
      }
    });
    return Array.from(issuerSet);
  }, [allCerts]);

  // Extract unique skills
  const allSkills = useMemo(() => {
    const skillSet = new Set(['All']);
    allCerts.forEach((c) => {
      if (Array.isArray(c.skills)) {
        c.skills.forEach((s) => skillSet.add(s));
      }
    });
    return Array.from(skillSet);
  }, [allCerts]);

  // Filter logic
  const filteredCerts = useMemo(() => {
    return allCerts.filter((cert) => {
      // Issuer filter
      const matchesIssuer =
        selectedIssuer === 'All' ||
        cert.issuer?.toLowerCase().includes(selectedIssuer.toLowerCase());

      // Skill filter
      const matchesSkill =
        selectedSkill === 'All' ||
        (Array.isArray(cert.skills) && cert.skills.some((s) => s.toLowerCase() === selectedSkill.toLowerCase()));

      // Search query
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        cert.title?.toLowerCase().includes(q) ||
        cert.issuer?.toLowerCase().includes(q) ||
        cert.credentialId?.toLowerCase().includes(q) ||
        (Array.isArray(cert.skills) && cert.skills.some((s) => s.toLowerCase().includes(q)));

      return matchesIssuer && matchesSkill && matchesSearch;
    });
  }, [allCerts, selectedIssuer, selectedSkill, searchQuery]);

  const handleCopyId = (id) => {
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };


  return (
    <div className="min-h-screen pt-28 pb-24 relative overflow-hidden bg-[#080c14] text-slate-100">
      {/* Background Lighting Effects */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[160px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 left-10 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[150px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-purple-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Back Navigation Bar */}
        <div className="flex items-center justify-between gap-4 mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-slate-300 hover:text-white bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 transition-all hover:-translate-x-0.5"
          >
            <ArrowLeft className="w-4 h-4 text-cyan-400" />
            <span>Back to Portfolio</span>
          </Link>

          <button
            onClick={() => refetch()}
            disabled={isFetching}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium bg-slate-900/80 text-slate-300 hover:text-cyan-400 border border-slate-800 hover:border-cyan-500/40 transition-all cursor-pointer disabled:opacity-50"
            title="Refresh Certificates from Backend"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isFetching ? 'animate-spin text-cyan-400' : ''}`} />
            <span className="hidden sm:inline">{isFetching ? 'Refreshing...' : 'Refresh'}</span>
          </button>
        </div>

        {/* Hero Banner Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
            <Award className="w-3.5 h-3.5" />
            <span>Verified Professional Accreditations</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
            Certifications & <span className="text-gradient">Verified Badges</span>
          </h1>

          <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
            Continuous engineering education, hands-on mastery in Node.js, MERN stack, MEAN stack, Python data structures, and cloud-native architecture.
          </p>

          {/* Counts & Stats */}
          <div className="flex items-center justify-center gap-4 pt-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{allCerts.length} Verified Certificates</span>
            </span>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>100% Credential Authenticity</span>
            </span>
          </div>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="glass-panel p-4 sm:p-5 rounded-3xl border border-slate-800/90 mb-12 shadow-2xl shadow-black/40 space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">

            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search certificates by title, skill, or ID (e.g. Node, MERN, Python, UC-...)..."
                className="w-full pl-11 pr-10 py-3 bg-slate-900/90 border border-slate-800 rounded-2xl text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/30 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-white"
                  title="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Issuer Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
              <span className="text-xs text-slate-400 font-medium shrink-0 flex items-center gap-1">
                <Bookmark className="w-3.5 h-3.5 text-cyan-400" />
                <span>Issuer:</span>
              </span>
              {allIssuers.map((issuer) => {
                const isActive = selectedIssuer === issuer;
                return (
                  <button
                    key={issuer}
                    onClick={() => setSelectedIssuer(issuer)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${isActive
                      ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-md shadow-cyan-500/20'
                      : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800 hover:border-slate-700'
                      }`}
                  >
                    {issuer === 'All' ? 'All Issuers' : issuer}
                  </button>
                );
              })}
            </div>

          </div>


        </div>

        {/* Loading Skeletons */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div
                key={n}
                className="glass-panel rounded-3xl overflow-hidden border border-slate-800/80 p-6 space-y-4 animate-pulse"
              >
                <div className="h-44 bg-slate-800/60 rounded-2xl w-full" />
                <div className="h-4 bg-slate-800/60 rounded w-1/3" />
                <div className="h-6 bg-slate-800/60 rounded w-4/5" />
                <div className="h-12 bg-slate-800/40 rounded w-full" />
                <div className="h-8 bg-slate-800/60 rounded w-1/2 pt-4" />
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && filteredCerts.length === 0 && (
          <div className="glass-panel text-center py-20 px-6 rounded-3xl border border-slate-800 max-w-lg mx-auto space-y-4">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
              <Award className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-white">No certificates found</h3>
            <p className="text-slate-400 text-sm">
              We couldn't find any certifications matching "{searchQuery}" with the selected filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedIssuer('All');
                setSelectedSkill('All');
              }}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 hover:bg-cyan-500/30 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Certificates Grid */}
        {!isLoading && filteredCerts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCerts.map((cert, idx) => (
              <div
                key={cert.id || idx}
                className="glass-panel rounded-3xl overflow-hidden border border-slate-800/80 hover:border-cyan-500/40 flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 group shadow-xl shadow-black/25"
              >
                <div>
                  {/* Thumbnail / Certificate Banner */}
                  <div className="relative h-48 w-full overflow-hidden bg-slate-900">
                    <img
                      src={cert.image}
                      alt={cert.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0b101b] via-transparent to-black/40" />

                    {/* Issuer Badge */}
                    <div className="absolute top-3.5 left-3.5 flex items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-black/80 text-white border border-white/15 backdrop-blur-md">
                        <Award className="w-3.5 h-3.5 text-cyan-400" />
                        <span>{cert.issuer}</span>
                      </span>
                    </div>

                    {/* Verified Status */}
                    <div className="absolute top-3.5 right-3.5">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 backdrop-blur-md">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>Verified</span>
                      </span>
                    </div>

                    {/* Quick Preview Button */}
                    <button
                      onClick={() => setPreviewCert(cert)}
                      className="absolute bottom-3 right-3 inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium bg-slate-900/85 text-cyan-300 hover:text-white hover:bg-cyan-600 border border-slate-700 backdrop-blur-md transition-all cursor-pointer shadow-lg"
                      title="Quick Preview Badge"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Preview</span>
                    </button>
                  </div>

                  {/* Body Details */}
                  <div className="p-6 space-y-4">
                    {/* Date / Issue info */}
                    <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
                      <span className="flex items-center gap-1.5 text-slate-400">
                        <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Issued {cert.issueDate}</span>
                      </span>

                      {cert.featured && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                          Featured
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug">
                      {cert.title}
                    </h3>

                    {/* Credential ID row with copy */}
                    {cert.credentialId && (
                      <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/90 border border-slate-800">
                        <div className="text-xs font-mono text-slate-400 truncate pr-2">
                          ID: <span className="text-slate-300 font-medium">{cert.credentialId}</span>
                        </div>
                        <button
                          onClick={() => handleCopyId(cert.credentialId)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors shrink-0"
                          title="Copy Credential ID"
                        >
                          {copiedId === cert.credentialId ? (
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    )}

                    {/* Skills pills */}
                    {Array.isArray(cert.skills) && cert.skills.length > 0 && (
                      <div className="space-y-1.5 pt-1">
                        <div className="text-xs text-slate-400 font-medium">Competencies:</div>
                        <div className="flex flex-wrap gap-1.5">
                          {cert.skills.map((skill) => (
                            <button
                              key={skill}
                              onClick={() => setSelectedSkill(skill)}
                              className="px-2.5 py-0.5 rounded-md text-xs font-mono font-medium bg-slate-900 text-slate-300 border border-slate-800 hover:border-cyan-500/30 hover:text-cyan-300 transition-colors cursor-pointer"
                            >
                              #{skill}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="p-6 pt-0">
                  <div className="pt-3.5 border-t border-slate-800/80 flex items-center justify-between gap-3">
                    <button
                      onClick={() => setPreviewCert(cert)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Preview Badge</span>
                    </button>

                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold text-cyan-400 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 transition-all hover:scale-[1.02]"
                    >
                      <span>Verify Credential</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Certificate Preview Modal */}
      {previewCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-[#0c121e] border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 p-6 sm:p-8 space-y-6">

            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-cyan-400" />
                <span className="font-bold text-white text-base sm:text-lg">{previewCert.issuer}</span>
              </div>
              <button
                onClick={() => setPreviewCert(null)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Banner Image */}
            <div className="relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 h-64 w-full">
              <img
                src={previewCert.image}
                alt={previewCert.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Modal Info */}
            <div className="space-y-3">
              <h3 className="text-xl sm:text-2xl font-bold text-white">{previewCert.title}</h3>
              <p className="text-xs font-mono text-slate-400">
                Credential ID: <span className="text-cyan-400 font-semibold">{previewCert.credentialId}</span> • Issued {previewCert.issueDate}
              </p>

              {Array.isArray(previewCert.skills) && previewCert.skills.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {previewCert.skills.map((s) => (
                    <span
                      key={s}
                      className="px-2.5 py-0.5 rounded-md text-xs font-mono bg-slate-900 text-slate-300 border border-slate-800"
                    >
                      #{s}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
              <button
                onClick={() => setPreviewCert(null)}
                className="px-4 py-2 rounded-xl text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                Close
              </button>
              <a
                href={previewCert.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 shadow-md shadow-cyan-500/20 transition-all"
              >
                <span>Verify on Issuer Platform</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
