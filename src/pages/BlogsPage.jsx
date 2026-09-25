import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { 
  BookOpen, 
  Search, 
  ExternalLink, 
  Calendar, 
  Clock, 
  ArrowLeft, 
  ArrowRight, 
  Heart, 
  RefreshCw, 
  Filter, 
  X, 
  Sparkles, 
  Tag, 
  Eye, 
  Share2, 
  Check, 
  User,
  SlidersHorizontal,
  ChevronRight
} from 'lucide-react';
import { Medium } from '../components/Icons';
import { fetchBlogs } from '../services/api';
import { usePortfolio } from '../context/PortfolioContext';

export default function BlogsPage() {
  const { personal } = usePortfolio();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('All');
  const [sortBy, setSortBy] = useState('newest'); // 'newest' | 'oldest'
  const [previewArticle, setPreviewArticle] = useState(null);
  const [copiedLink, setCopiedLink] = useState(false);

  // Fetch all blogs using React Query
  const {
    data: blogsData,
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['allBlogs'],
    queryFn: fetchBlogs,
    staleTime: 1000 * 60 * 3, // 3 minutes cache
    refetchOnMount: true,
  });

  const allBlogs = blogsData?.blogs || [];

  // Extract unique categories/tags for filter chips
  const allTags = useMemo(() => {
    const tagSet = new Set(['All']);
    allBlogs.forEach((blog) => {
      if (Array.isArray(blog.tags)) {
        blog.tags.forEach((t) => tagSet.add(t));
      }
    });
    return Array.from(tagSet);
  }, [allBlogs]);

  // Filter & Search Logic
  const filteredBlogs = useMemo(() => {
    return allBlogs
      .filter((blog) => {
        // Tag filter
        const matchesTag =
          selectedTag === 'All' ||
          (Array.isArray(blog.tags) && blog.tags.some((t) => t.toLowerCase() === selectedTag.toLowerCase()));

        // Search query filter
        const q = searchQuery.toLowerCase().trim();
        const matchesSearch =
          !q ||
          blog.title?.toLowerCase().includes(q) ||
          blog.description?.toLowerCase().includes(q) ||
          (Array.isArray(blog.tags) && blog.tags.some((t) => t.toLowerCase().includes(q)));

        return matchesTag && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'oldest') {
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        }
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });
  }, [allBlogs, selectedTag, searchQuery, sortBy]);

  const handleShare = (url) => {
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="min-h-screen pt-28 pb-24 relative overflow-hidden bg-[#080c14] text-slate-100">
      {/* Background Lighting Effects */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[160px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[150px] pointer-events-none -z-10" />
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

          <div className="flex items-center gap-3">
            <button
              onClick={() => refetch()}
              disabled={isFetching}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium bg-slate-900/80 text-slate-300 hover:text-cyan-400 border border-slate-800 hover:border-cyan-500/40 transition-all cursor-pointer disabled:opacity-50"
              title="Refresh Articles from Backend"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isFetching ? 'animate-spin text-cyan-400' : ''}`} />
              <span className="hidden sm:inline">{isFetching ? 'Refreshing...' : 'Refresh'}</span>
            </button>

            {personal?.medium && (
              <a
                href={personal.medium}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 shadow-md shadow-cyan-500/20 transition-all"
              >
                <Medium className="w-4 h-4" />
                <span>Follow on Medium</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>

        {/* Hero Banner Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Technical Engineering Blog</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
            System Design & <span className="text-gradient">Technical Articles</span>
          </h1>

          <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
            In-depth explorations of Node.js, distributed microservices, Redis caching, vector databases, rate limiting algorithms, and modern frontend architecture.
          </p>

          {/* Counts & Live Status */}
          <div className="flex items-center justify-center gap-4 pt-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{allBlogs.length > 0 ? `${allBlogs.length} Articles Published` : 'Live RSS Stream'}</span>
            </span>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Direct Medium Integration</span>
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
                placeholder="Search articles by title, topic, or keyword (e.g. Rate Limiting, Nginx, Redis)..."
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

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 shrink-0">
              <SlidersHorizontal className="w-4 h-4 text-slate-400" />
              <span className="text-xs text-slate-400 font-medium hidden sm:inline">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-slate-900 border border-slate-800 rounded-2xl px-3.5 py-3 text-xs font-medium text-slate-200 focus:outline-none focus:border-cyan-500 transition-colors cursor-pointer"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
              </select>
            </div>
          </div>

          {/* Tags Chips Bar */}
          {allTags.length > 1 && (
            <div className="pt-3 border-t border-slate-800/80 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              <span className="text-xs text-slate-400 font-medium shrink-0 flex items-center gap-1 pl-1 pr-2">
                <Tag className="w-3.5 h-3.5 text-cyan-400" />
                <span>Filter:</span>
              </span>

              {allTags.map((tag) => {
                const isActive = selectedTag === tag;
                return (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(tag)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
                      isActive
                        ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-semibold shadow-md shadow-cyan-500/20'
                        : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {tag === 'All' ? 'All Topics' : `#${tag}`}
                  </button>
                );
              })}
            </div>
          )}
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
        {!isLoading && filteredBlogs.length === 0 && (
          <div className="glass-panel text-center py-20 px-6 rounded-3xl border border-slate-800 max-w-lg mx-auto space-y-4">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
              <Search className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-white">No articles found</h3>
            <p className="text-slate-400 text-sm">
              We couldn't find any articles matching "{searchQuery}" with the selected tag filter.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedTag('All');
              }}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 hover:bg-cyan-500/30 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Blog Articles Grid */}
        {!isLoading && filteredBlogs.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.map((post, idx) => (
              <article
                key={post.id || idx}
                className="glass-panel rounded-3xl overflow-hidden border border-slate-800/80 hover:border-cyan-500/40 flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 group shadow-xl shadow-black/25"
              >
                <div>
                  {/* Thumbnail Banner */}
                  <div className="relative h-52 w-full overflow-hidden bg-slate-900">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0b101b] via-transparent to-black/40" />

                    {/* Medium Logo Pill */}
                    <div className="absolute top-3.5 left-3.5 flex items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-black/80 text-white border border-white/15 backdrop-blur-md">
                        <Medium className="w-3.5 h-3.5" />
                        <span>Medium</span>
                      </span>
                    </div>

                    {/* Quick Preview Button on Image */}
                    <button
                      onClick={() => setPreviewArticle(post)}
                      className="absolute bottom-3 right-3 inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium bg-slate-900/85 text-cyan-300 hover:text-white hover:bg-cyan-600 border border-slate-700 backdrop-blur-md transition-all cursor-pointer shadow-lg"
                      title="Quick Preview Article"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Preview</span>
                    </button>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 space-y-3.5">
                    {/* Meta: Author, Date, Read Time */}
                    <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
                      <div className="flex items-center gap-1.5 text-slate-300">
                        <User className="w-3.5 h-3.5 text-cyan-400" />
                        <span className="truncate max-w-[120px]">{post.author}</span>
                      </div>
                      <div className="flex items-center gap-3 text-slate-400">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                          <span>{post.date}</span>
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-cyan-400" />
                          <span>{post.readTime}</span>
                        </span>
                      </div>
                    </div>

                    {/* Title */}
                    <h2 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug line-clamp-2">
                      <a
                        href={post.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        {post.title}
                      </a>
                    </h2>

                    {/* Excerpt */}
                    <p className="text-slate-400 text-sm leading-relaxed line-clamp-3">
                      {post.description}
                    </p>
                  </div>
                </div>

                {/* Footer Section: Tags + Actions */}
                <div className="p-6 pt-0 space-y-4">
                  {/* Tags */}
                  {Array.isArray(post.tags) && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {post.tags.map((tag) => (
                        <button
                          key={tag}
                          onClick={() => setSelectedTag(tag)}
                          className="px-2.5 py-0.5 rounded-md text-xs font-mono font-medium bg-slate-900 text-slate-300 border border-slate-800 hover:border-cyan-500/30 hover:text-cyan-300 transition-colors cursor-pointer"
                        >
                          #{tag}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Actions row */}
                  <div className="pt-3.5 border-t border-slate-800/80 flex items-center justify-between">
                    <a
                      href={post.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-colors group/link"
                    >
                      <span>Read on Medium</span>
                      <ArrowRight className="w-4 h-4 transform group-hover/link:translate-x-1 transition-transform" />
                    </a>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleShare(post.url)}
                        className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800 transition-colors cursor-pointer"
                        title="Copy Article Link"
                      >
                        {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
                      </button>

                      <a
                        href={post.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800 transition-colors"
                        aria-label="Open Medium tab"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

      </div>

      {/* Quick Article Preview Modal */}
      {previewArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-3xl max-h-[85vh] flex flex-col bg-[#0c121e] border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/60">
              <div className="flex items-center gap-2">
                <Medium className="w-5 h-5 text-white" />
                <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
                  Article Preview
                </span>
              </div>
              <button
                onClick={() => setPreviewArticle(null)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content Scrollable Area */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 scrollbar-thin">
              {previewArticle.image && (
                <div className="rounded-2xl overflow-hidden h-64 w-full bg-slate-900">
                  <img
                    src={previewArticle.image}
                    alt={previewArticle.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div className="space-y-3">
                <div className="flex items-center gap-4 text-xs text-slate-400 font-medium">
                  <span className="text-slate-300 font-semibold">{previewArticle.author}</span>
                  <span>•</span>
                  <span>{previewArticle.date}</span>
                  <span>•</span>
                  <span>{previewArticle.readTime}</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
                  {previewArticle.title}
                </h2>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {(previewArticle.tags || []).map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-0.5 rounded-md text-xs font-mono bg-slate-900 text-cyan-300 border border-slate-800"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Render article HTML content or cleaned description */}
              <div 
                className="prose prose-invert prose-cyan max-w-none text-slate-300 text-sm sm:text-base leading-relaxed space-y-4"
                dangerouslySetInnerHTML={{ __html: previewArticle.content || previewArticle.description }}
              />
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between px-6 py-4 border-t border-slate-800 bg-slate-900/60">
              <button
                onClick={() => setPreviewArticle(null)}
                className="px-4 py-2 rounded-xl text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                Close Preview
              </button>

              <a
                href={previewArticle.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 shadow-md shadow-cyan-500/20 transition-all"
              >
                <span>Read Full Story on Medium</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
