import { useState, useMemo } from 'react';
import {
  Search,
  Calendar,
  Clock,
  User,
  ArrowRight,
  MessageSquare,
  Eye,
  Tag,
  Sparkles
} from 'lucide-react';
import { BlogPost, Language } from '../../types';
import { translations } from '../../translations';
import { getBlogPosts } from '../../services/storage';

interface BlogPageProps {
  currentLang: Language;
  onSelectPost: (slug: string) => void;
}

export function BlogPage({ currentLang, onSelectPost }: BlogPageProps) {
  const t = translations[currentLang];
  const posts = getBlogPosts().filter((p) => p.published !== false);

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Articles' },
    { id: 'Civil Registry & RITA', label: 'RITA Guides' },
    { id: 'Tax & Revenue', label: 'TRA & TIN' },
    { id: 'Business & BRELA', label: 'BRELA & Companies' },
    { id: 'Technology & Web Design', label: 'Web & Tech' },
  ];

  const filtered = useMemo(() => {
    return posts.filter((p) => {
      const matchesCat =
        selectedCategory === 'all' || p.category.toLowerCase().includes(selectedCategory.toLowerCase());
      const q = search.toLowerCase().trim();
      const pTitle = (p.title[currentLang] || p.title.en).toLowerCase();
      const pExcerpt = (p.excerpt[currentLang] || p.excerpt.en).toLowerCase();
      const matchesSearch = !q || pTitle.includes(q) || pExcerpt.includes(q);
      return matchesCat && matchesSearch;
    });
  }, [posts, selectedCategory, search, currentLang]);

  return (
    <div id="blog-page-container" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-cyan-400">
          Knowledge Base & News
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          {t.blog?.title || 'E27 Knowledge Hub & Practical Guides'}
        </h1>
        <p className="text-base text-slate-600 dark:text-slate-300">
          {t.blog?.subtitle || 'Learn how to navigate Tanzanian portals, document applications, tax compliance, and business websites.'}
        </p>

        {/* Search */}
        <div className="max-w-xl mx-auto pt-2">
          <div className="relative flex items-center shadow-md rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-2">
            <Search className="w-5 h-5 text-slate-400 ml-2.5 shrink-0" />
            <input
              type="text"
              placeholder="Search articles, RITA tips, TIN tutorials, web guides..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-transparent text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="text-xs text-slate-400 hover:text-slate-600 px-2"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
              selectedCategory === cat.id
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Blog Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map((post) => (
          <article
            key={post.id}
            id={`blog-card-${post.slug}`}
            onClick={() => onSelectPost(post.slug)}
            className="group cursor-pointer rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-sm hover:shadow-xl transition-all duration-200 flex flex-col justify-between hover:border-blue-400 dark:hover:border-cyan-500"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span className="font-bold text-blue-600 dark:text-cyan-400 uppercase tracking-wider text-[10px] px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950/60 border border-blue-100 dark:border-blue-900">
                  {post.category}
                </span>
                <span className="flex items-center gap-1 text-[11px]">
                  <Clock className="w-3 h-3 text-slate-400" />
                  {post.readTime}
                </span>
              </div>

              <h2 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors leading-snug">
                {post.title[currentLang] || post.title.en}
              </h2>

              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-3">
                {post.excerpt[currentLang] || post.excerpt.en}
              </p>

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {(post.tags || []).map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="pt-4 mt-6 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-700 dark:text-cyan-300 font-bold text-[10px]">
                  {post.author.charAt(0)}
                </div>
                <span>{post.author}</span>
              </div>

              <span className="text-blue-600 dark:text-cyan-400 font-semibold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                Read More <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </article>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-200 dark:border-slate-700 p-8">
          <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
            No articles found matching your query.
          </p>
        </div>
      )}
    </div>
  );
}
