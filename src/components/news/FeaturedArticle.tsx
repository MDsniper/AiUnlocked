import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock } from 'lucide-react';
import type { Article } from '../../types';
import { CATEGORY_MAP } from '../../types';

export const FeaturedArticle: React.FC<{ article: Article }> = ({ article }) => {
  const cat = CATEGORY_MAP[article.category];

  return (
    <Link
      to={`/article/${article.id}`}
      className="group block relative overflow-hidden rounded-2xl border border-[var(--border)] hover:shadow-lg transition-all duration-300"
    >
      <div className="grid md:grid-cols-2">
        {article.imageUrl && (
          <div className="aspect-[16/9] md:aspect-auto overflow-hidden">
            <img
              src={article.imageUrl}
              alt={article.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        )}
        <div className={`p-8 md:p-10 flex flex-col justify-center bg-[var(--card-bg)] ${!article.imageUrl ? 'md:col-span-2' : ''}`}>
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 text-xs font-semibold rounded-full bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/20">
              Featured
            </span>
            <span className="px-3 py-1 text-xs font-medium rounded-full bg-[var(--surface)] text-[var(--muted)]">
              {cat?.name ?? article.category}
            </span>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-[var(--text)] mb-4 group-hover:text-[var(--accent)] transition-colors leading-tight">
            {article.title}
          </h2>

          <p className="text-[var(--muted)] mb-6 line-clamp-3 leading-relaxed">
            {article.summary}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-sm text-[var(--muted)]">
              <span className="font-medium text-[var(--accent)]">{article.source}</span>
              <span className="flex items-center gap-1">
                <Clock size={14} />
                {new Date(article.date).toLocaleDateString()}
              </span>
            </div>
            <span className="text-[var(--accent)] flex items-center gap-1 text-sm font-medium group-hover:gap-2 transition-all">
              Read more <ArrowRight size={16} />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};
