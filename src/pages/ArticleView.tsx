import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Clock, Tag } from 'lucide-react';
import { fetchArticle, fetchNews } from '../services/newsApi';
import type { Article } from '../types';
import { CATEGORY_MAP } from '../types';
import { ArticleCard } from '../components/news/ArticleCard';

export const ArticleView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [related, setRelated] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError(null);

    fetchArticle(id)
      .then((data) => {
        setArticle(data);
        return fetchNews(1, 3, data.category);
      })
      .then((res) => {
        setRelated(res.articles.filter((a) => a.id !== id).slice(0, 3));
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-32">
        <div className="w-8 h-8 border-2 border-[var(--accent)] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <p className="text-red-500 mb-4">{error ?? 'Article not found'}</p>
        <Link to="/" className="text-[var(--accent)] hover:underline">Back to home</Link>
      </div>
    );
  }

  const cat = CATEGORY_MAP[article.category];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Link to="/" className="inline-flex items-center gap-2 text-[var(--muted)] hover:text-[var(--accent)] mb-8 transition-colors">
        <ArrowLeft size={16} /> Back to feed
      </Link>

      {article.imageUrl && (
        <img
          src={article.imageUrl}
          alt={article.title}
          className="w-full aspect-[2/1] object-cover rounded-2xl mb-8"
        />
      )}

      <div className="flex items-center gap-3 mb-4">
        <span className="px-3 py-1 text-xs font-medium rounded-full bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/20">
          {cat?.name ?? article.category}
        </span>
        <span className="text-sm text-[var(--muted)] flex items-center gap-1">
          <Clock size={14} />
          {new Date(article.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </span>
      </div>

      <h1 className="text-3xl md:text-4xl font-bold text-[var(--text)] mb-6 leading-tight">{article.title}</h1>

      <div className="flex items-center gap-4 mb-8 pb-8 border-b border-[var(--border)]">
        <span className="text-sm font-medium text-[var(--accent)] bg-[var(--accent)]/10 px-3 py-1 rounded-full">
          {article.source}
        </span>
        {article.author && (
          <span className="text-sm text-[var(--muted)]">by {article.author}</span>
        )}
      </div>

      <div className="mb-8">
        <p className="text-[var(--text)] text-lg leading-relaxed whitespace-pre-wrap">{article.summary}</p>
      </div>

      <a
        href={article.sourceUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white rounded-xl font-medium transition-colors mb-8"
      >
        Read full article <ExternalLink size={16} />
      </a>

      {article.tags && article.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-12 pt-6 border-t border-[var(--border)]">
          <Tag size={16} className="text-[var(--muted)] mt-0.5" />
          {article.tags.map((tag) => (
            <span key={tag} className="px-3 py-1 text-xs bg-[var(--surface)] text-[var(--muted)] rounded-full border border-[var(--border)]">
              {tag}
            </span>
          ))}
        </div>
      )}

      {related.length > 0 && (
        <section className="mt-12 pt-8 border-t border-[var(--border)]">
          <h2 className="text-2xl font-bold text-[var(--text)] mb-6">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {related.map((a) => (
              <ArticleCard key={a.id} article={a} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
