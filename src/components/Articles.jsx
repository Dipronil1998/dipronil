import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, ExternalLink, Calendar, Clock, Sparkles, ArrowRight, Heart, RefreshCw } from 'lucide-react';
import { Medium } from './Icons';
import { usePortfolio } from '../context/PortfolioContext';

export default function Articles() {
  const { mediumPosts: posts = [], personal, isFetching, refetch } = usePortfolio();

  if (!posts || posts.length === 0) return null;

  return (
    <section id="articles" className="py-24 relative overflow-hidden bg-slate-950/30 scroll-mt-16">
      {/* Background radial glow */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-indigo-500/10 rounded-full blur-[130px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Technical Writing</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Latest Articles & <span className="text-gradient">Medium Posts</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Sharing insights, deep dives, best practices, and architecture tutorials on modern web development.
          </p>

          {/* Action buttons */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/blogs"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 text-cyan-300 border border-cyan-500/30 hover:border-cyan-400 transition-all shadow-sm shadow-cyan-500/10"
            >
              <span>View All Blogs Page</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <button
              onClick={() => refetch()}
              disabled={isFetching}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-medium bg-slate-900/80 text-slate-400 hover:text-cyan-400 border border-slate-800 hover:border-cyan-500/30 transition-all cursor-pointer disabled:opacity-60"
              title="Refresh with React Query"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isFetching ? 'animate-spin text-cyan-400' : ''}`} />
              <span>{isFetching ? 'Refreshing...' : 'Refresh'}</span>
            </button>
          </div>
        </div>

        {/* Medium Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article
              key={post.id}
              className="glass-panel rounded-3xl overflow-hidden border border-slate-800/80 hover:border-cyan-500/40 flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 group shadow-xl shadow-black/20"
            >
              <div>
                {/* Article Cover Image */}
                <div className="relative h-48 w-full overflow-hidden bg-slate-900">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-black/30" />

                  {/* Medium Badge */}
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-black/75 text-white border border-white/10 backdrop-blur-md">
                      <Medium className="w-3.5 h-3.5" />
                      <span>Medium</span>
                    </span>
                    {post.isLive && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 backdrop-blur-md">
                        Live
                      </span>
                    )}
                  </div>

                  {/* Claps badge */}
                  {post.claps && (
                    <div className="absolute top-3 right-3">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 backdrop-blur-md">
                        <Heart className="w-3 h-3 fill-emerald-300" />
                        <span>{post.claps}</span>
                      </span>
                    </div>
                  )}
                </div>

                {/* Article Body */}
                <div className="p-6 space-y-3.5">
                  {/* Meta: Date & Read time */}
                  <div className="flex items-center gap-4 text-xs text-slate-400 font-medium">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{post.date}</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-indigo-400" />
                      <span>{post.readTime}</span>
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug line-clamp-2">
                    <a
                      href={post.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      {post.title}
                    </a>
                  </h3>

                  <p className="text-slate-400 text-sm leading-relaxed line-clamp-3">
                    {post.description}
                  </p>
                </div>
              </div>

              {/* Card Footer */}
              <div className="p-6 pt-0 space-y-4">
                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-0.5 rounded-md text-xs font-mono font-medium bg-slate-900/80 text-slate-300 border border-slate-800"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Read Button */}
                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                  <a
                    href={post.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-colors group/link"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-4 h-4 transform group-hover/link:translate-x-1 transition-transform" />
                  </a>

                  <a
                    href={post.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800/80 transition-colors"
                    aria-label="Open Medium Article"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Section Bottom CTA */}
        <div className="mt-14 flex flex-wrap items-center justify-center gap-4 text-center">
          <Link
            to="/blogs"
            className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl font-semibold text-white bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 transition-all hover:scale-[1.02] shadow-lg shadow-cyan-500/20"
          >
            <BookOpen className="w-5 h-5 text-white" />
            <span>Read All Technical Blogs</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          {personal?.medium && (
            <a
              href={personal.medium}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl font-semibold text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-cyan-500/40 transition-all hover:scale-[1.02] shadow-lg shadow-black/30"
            >
              <Medium className="w-5 h-5 text-white" />
              <span>Explore on Medium</span>
              <ExternalLink className="w-4 h-4 text-cyan-400" />
            </a>
          )}
        </div>

      </div>
    </section>
  );
}
