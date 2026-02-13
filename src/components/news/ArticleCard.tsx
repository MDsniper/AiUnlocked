import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, Clock } from 'lucide-react';
import type { Article } from '../../types';
import { CATEGORY_MAP } from '../../types';

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const hours = Math.floor(diff / 3600000);
  if (hours < 1) return 'Just now';
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(dateStr).toLocaleDateString();
}

export const ArticleCard: React.FC<{ article: Article }> = ({ article }) => {
  const cat = CATEGORY_MAP[article.category];

  return (
    <Link
      to={`/article/${article.id}`}
      className="group block bg-[var(--card-bg)] border border-[var(--border)] rounded-xl overflow-hidden hover:shadow-lg hover:scale-[1.02] transition-all duration-200"
    >
      {article.imageUrl && (
        <div className="aspect-[16/9] overflow-hidden">
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      <div className="p-5">
        <div className="flex items-center gap-2 mb-3">
          <span className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/20">
            {cat?.name ?? article.category}
          </span>
          <span className="text-xs text-[var(--muted)] flex items-center gap-1">
            <Clock size={12} />
            {timeAgo(article.date)}
          </span>
        </div>

        <h3 className="text-lg font-semibold text-[var(--text)] mb-2 line-clamp-2 group-hover:text-[var(--accent)] transition-colors">
          {article.title}
        </h3>

        <p className="text-sm text-[var(--muted)] line-clamp-2 mb-4 leading-relaxed">
          {article.summary}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-[var(--accent)] bg-[var(--accent)]/10 px-2 py-0.5 rounded-full">
            {article.source}
          </span>
          <ExternalLink size={14} className="text-[var(--muted)]" />
        </div>
      </div>
    </Link>
  );
};
