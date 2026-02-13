import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import type { ArticleCategory } from '../types';
import { CATEGORY_MAP } from '../types';

const categories = Object.entries(CATEGORY_MAP) as [ArticleCategory, { name: string; description: string; icon: string }][];

export const Categories: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-bold text-[var(--text)] mb-3">Categories</h1>
      <p className="text-[var(--muted)] mb-10 text-lg">Browse AI news by topic</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map(([slug, { name, description, icon }]) => (
          <Link
            key={slug}
            to={`/categories/${slug}`}
            className="group block p-8 bg-[var(--card-bg)] border border-[var(--border)] rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all duration-200"
          >
            <div className="text-4xl mb-4">{icon}</div>
            <h2 className="text-xl font-semibold text-[var(--text)] mb-2 group-hover:text-[var(--accent)] transition-colors">
              {name}
            </h2>
            <p className="text-[var(--muted)] text-sm mb-4 leading-relaxed">{description}</p>
            <span className="text-[var(--accent)] text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
              View articles <ArrowRight size={14} />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};
