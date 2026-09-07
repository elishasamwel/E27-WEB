import React, { useState, useId, type FormEvent } from 'react';
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Share2,
  MessageSquare,
  Send,
  CheckCircle2,
  ShieldCheck,
  Tag,
  AlertCircle
} from 'lucide-react';
import { BlogPost, Language } from '../../types';
import { translations } from '../../translations';
import { getCommentsByPostId, addComment } from '../../services/storage';

interface BlogPostDetailProps {
  post: BlogPost;
  currentLang: Language;
  onBack: () => void;
}

export function BlogPostDetail({ post, currentLang, onBack }: BlogPostDetailProps) {
  const t = translations[currentLang];
  const comments = getCommentsByPostId(post.id);

  // New comment state
  const [authorName, setAuthorName] = useState('');
  const [authorEmail, setAuthorEmail] = useState('');
  const [commentContent, setCommentContent] = useState('');
  const [submittedSuccess, setSubmittedSuccess] = useState(false);
  const [commentError, setCommentError] = useState('');

  const nameInputId = useId();
  const emailInputId = useId();
  const commentInputId = useId();

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !authorEmail.trim() || !commentContent.trim()) {
      setCommentError('Please fill in your name, email, and comment message.');
      return;
    }

    try {
      addComment(post.id, authorName, authorEmail, commentContent);
      setSubmittedSuccess(true);
      setCommentError('');
      setAuthorName('');
      setAuthorEmail('');
      setCommentContent('');
      setTimeout(() => setSubmittedSuccess(false), 5000);
    } catch (err: any) {
      setCommentError('Failed to post comment. Please try again.');
    }
  };

  return (
    <div id="blog-post-detail-container" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Back button */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 dark:text-cyan-400 hover:underline"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to All Articles</span>
      </button>

      {/* Article Header */}
      <div className="space-y-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
          <span className="font-bold text-blue-600 dark:text-cyan-400 uppercase tracking-wider text-[11px] px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-100 dark:border-blue-900">
            {post.category}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            {new Date(post.publishedAt).toLocaleDateString()}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {post.readTime}
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
          {post.title[currentLang] || post.title.en}
        </h1>

        <div className="flex items-center justify-between text-xs text-slate-500 pt-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
              {post.author.charAt(0)}
            </div>
            <div>
              <span className="font-bold text-slate-900 dark:text-white block">{post.author}</span>
              <span className="text-[11px] text-slate-400">E27 Editorial Team</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                alert('Article link copied to clipboard!');
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-semibold"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share</span>
            </button>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <article className="prose prose-slate dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base space-y-4">
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 italic text-slate-600 dark:text-slate-300 font-medium text-sm">
          {post.excerpt[currentLang] || post.excerpt.en}
        </div>

        <div className="whitespace-pre-line leading-loose">
          {post.content[currentLang] || post.content.en}
        </div>
      </article>

      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-slate-200 dark:border-slate-800">
          <span className="text-xs font-bold text-slate-400 flex items-center gap-1">
            <Tag className="w-3.5 h-3.5" />
            Tags:
          </span>
          {(post.tags || []).map((tag) => (
            <span
              key={tag}
              className="text-xs px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* DISCUSSION & COMMENTS SECTION */}
      <section className="pt-8 border-t border-slate-200 dark:border-slate-800 space-y-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-blue-600 dark:text-cyan-400" />
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Reader Discussion ({(comments || []).length})
            </h3>
          </div>
        </div>

        {/* Existing Comments List */}
        <div className="space-y-4">
          {(comments || []).map((comment) => (
            <div
              key={comment.id}
              className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-slate-900 dark:text-white">
                  {comment.authorName}
                </span>
                <span className="text-[10px] text-slate-400">
                  {new Date(comment.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {comment.content}
              </p>
            </div>
          ))}

          {comments.length === 0 && (
            <div className="p-6 text-center rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 text-xs text-slate-500">
              No comments yet on this article. Be the first to start the conversation!
            </div>
          )}
        </div>

        {/* Submit Comment Form */}
        <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                Leave a Thought or Question
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Our advisors actively answer questions on RITA, TRA, and Web solutions.
              </p>
            </div>
            <div className="px-2 py-1 rounded bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 text-[10px] font-semibold flex items-center gap-1 shrink-0">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Moderated</span>
            </div>
          </div>

          {submittedSuccess && (
            <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-900 text-emerald-800 dark:text-emerald-300 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>
                Thank you! Your comment has been submitted and queued for moderation. It will be published shortly.
              </span>
            </div>
          )}

          {commentError && (
            <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{commentError}</span>
            </div>
          )}

          <form onSubmit={handleCommentSubmit} className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label
                  htmlFor={nameInputId}
                  className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1"
                >
                  Your Name *
                </label>
                <input
                  id={nameInputId}
                  type="text"
                  required
                  placeholder="e.g., Hassan Ali"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label
                  htmlFor={emailInputId}
                  className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1"
                >
                  Your Email *
                </label>
                <input
                  id={emailInputId}
                  type="email"
                  required
                  placeholder="e.g., hassan@example.com"
                  value={authorEmail}
                  onChange={(e) => setAuthorEmail(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor={commentInputId}
                className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1"
              >
                Comment Message *
              </label>
              <textarea
                id={commentInputId}
                rows={3}
                required
                placeholder="Share your perspective or ask an application question..."
                value={commentContent}
                onChange={(e) => setCommentContent(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="text-[11px] text-slate-400 italic">
                All submissions comply with E27 community guidelines.
              </span>
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs tracking-wide shadow-md transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Post Comment</span>
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
