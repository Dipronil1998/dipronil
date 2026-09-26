import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { 
  FolderGit2, 
  Search, 
  ExternalLink, 
  ArrowLeft, 
  ArrowRight, 
  Sparkles, 
  X, 
  RefreshCw, 
  Layers, 
  Eye, 
  Code2, 
  CheckCircle2,
  Terminal,
  Cpu
} from 'lucide-react';
import { Github } from '../components/Icons';
import { fetchProjects } from '../services/api';
import ProjectModal from '../components/ProjectModal';
import { usePortfolio } from '../context/PortfolioContext';
import SEO from '../components/SEO';

export default function ProjectsPage() {
  const { personal } = usePortfolio();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);

  // Fetch all projects via React Query
  const {
    data: projectsData,
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['allProjects'],
    queryFn: fetchProjects,
    staleTime: 1000 * 60 * 3, // 3 minutes cache
    refetchOnMount: true,
  });

  const allProjects = projectsData?.projects || [];

  // Search filter (no category filter as requested)
  const filteredProjects = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return allProjects;

    return allProjects.filter((proj) => {
      return (
        proj.title?.toLowerCase().includes(q) ||
        proj.description?.toLowerCase().includes(q) ||
        proj.language?.toLowerCase().includes(q) ||
        (Array.isArray(proj.tags) && proj.tags.some((t) => t.toLowerCase().includes(q)))
      );
    });
  }, [allProjects, searchQuery]);

  return (
    <div className="min-h-screen pt-28 pb-24 relative overflow-hidden bg-[#080c14] text-slate-100">
      <SEO 
        title="Projects & Works"
        description="Explore full stack applications, web architecture projects, open-source repositories, and digital systems built by Dipronil Das."
        keywords="Dipronil Das Projects, React Projects, Full Stack Portfolio, Node.js Applications, Web Development Showcase, GitHub Dipronil"
        breadcrumbs={[{ name: 'Projects', url: '/projects' }]}
      />
      {/* Ambient Lighting Background */}
      <div className="absolute top-0 left-1/3 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[160px] pointer-events-none -z-10" />
      <div className="absolute top-1/2 right-10 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[150px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-[450px] h-[450px] bg-purple-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />

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
            title="Refresh Projects from Backend"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isFetching ? 'animate-spin text-cyan-400' : ''}`} />
            <span className="hidden sm:inline">{isFetching ? 'Refreshing...' : 'Refresh'}</span>
          </button>
        </div>

        {/* Hero Banner Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>Engineering Showcase</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
            All Projects & <span className="text-gradient">Systems Built</span>
          </h1>

          <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
            A comprehensive catalog of {allProjects.length > 0 ? `${allProjects.length}+` : 'all'} full stack applications, microservices, e-commerce platforms, AI systems, and cloud infrastructure.
          </p>

          {/* Counts & Badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{allProjects.length} Total Projects</span>
            </span>

            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <Cpu className="w-3.5 h-3.5" />
              <span>React, Node.js, Python, SQL & Cloud</span>
            </span>
          </div>
        </div>

        {/* Search Toolbar */}
        <div className="glass-panel p-4 sm:p-5 rounded-3xl border border-slate-800/90 mb-12 shadow-2xl shadow-black/40">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects by title, stack, or keywords (e.g. valet, ecommerce, RAG, MySQL, Docker)..."
              className="w-full pl-11 pr-10 py-3.5 bg-slate-900/90 border border-slate-800 rounded-2xl text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/30 transition-all"
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
        </div>

        {/* Loading Skeletons */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div
                key={n}
                className="glass-panel rounded-3xl overflow-hidden border border-slate-800/80 p-6 space-y-4 animate-pulse"
              >
                <div className="h-48 bg-slate-800/60 rounded-2xl w-full" />
                <div className="h-4 bg-slate-800/60 rounded w-1/3" />
                <div className="h-6 bg-slate-800/60 rounded w-4/5" />
                <div className="h-16 bg-slate-800/40 rounded w-full" />
                <div className="h-8 bg-slate-800/60 rounded w-1/2 pt-4" />
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && filteredProjects.length === 0 && (
          <div className="glass-panel text-center py-20 px-6 rounded-3xl border border-slate-800 max-w-lg mx-auto space-y-4">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
              <Search className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-white">No projects found</h3>
            <p className="text-slate-400 text-sm">
              We couldn't find any projects matching "{searchQuery}".
            </p>
            <button
              onClick={() => setSearchQuery('')}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 hover:bg-cyan-500/30 transition-colors cursor-pointer"
            >
              Clear Search
            </button>
          </div>
        )}

        {/* Projects Grid */}
        {!isLoading && filteredProjects.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, idx) => (
              <div
                key={project.id || idx}
                className="glass-panel rounded-3xl overflow-hidden border border-slate-800/80 hover:border-cyan-500/40 flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 group shadow-xl shadow-black/25"
              >
                <div>
                  {/* Thumbnail / Project Banner */}
                  <div className="relative h-52 w-full overflow-hidden bg-slate-900">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0b101b] via-transparent to-black/40" />

                    {/* Stack / Tag Badge */}
                    <div className="absolute top-3.5 left-3.5 flex items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-black/80 text-cyan-300 border border-cyan-500/30 backdrop-blur-md">
                        <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                        <span>{project.language || project.category}</span>
                      </span>
                    </div>

                    {/* Priority Badge */}
                    {project.priority && (
                      <div className="absolute top-3.5 right-3.5">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold bg-slate-900/80 text-slate-300 border border-slate-700 backdrop-blur-md">
                          #{project.priority}
                        </span>
                      </div>
                    )}

                    {/* Quick Preview Button */}
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="absolute bottom-3 right-3 inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium bg-slate-900/85 text-cyan-300 hover:text-white hover:bg-cyan-600 border border-slate-700 backdrop-blur-md transition-all cursor-pointer shadow-lg"
                      title="View Project Details"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Details</span>
                    </button>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 space-y-3.5">
                    {/* Title */}
                    <h3 
                      onClick={() => setSelectedProject(project)}
                      className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug cursor-pointer line-clamp-2"
                    >
                      {project.title}
                    </h3>

                    {/* Description */}
                    <p className="text-slate-400 text-sm leading-relaxed line-clamp-3">
                      {project.description}
                    </p>
                  </div>
                </div>

                {/* Footer Section: Tags + Actions */}
                <div className="p-6 pt-0 space-y-4">
                  {/* Tags */}
                  {Array.isArray(project.tags) && project.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-0.5 rounded-md text-xs font-mono font-medium bg-slate-900 text-slate-300 border border-slate-800"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="pt-3.5 border-t border-slate-800/80 flex items-center justify-between">
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer"
                    >
                      <span>View Details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <div className="flex items-center gap-2">
                      {project.githubUrl && project.githubUrl !== '#' && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800 transition-colors"
                          aria-label="GitHub Repository"
                          title="View Source Code"
                        >
                          <Github className="w-4 h-4" />
                        </a>
                      )}

                      {project.demoUrl && project.demoUrl !== '#' && (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 shadow-md shadow-cyan-500/20 transition-all hover:scale-[1.02]"
                          title="Open Live Website"
                        >
                          <span>Live Demo</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Project Details Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}

    </div>
  );
}
