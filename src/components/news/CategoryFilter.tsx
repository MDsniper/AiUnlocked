import React from 'react';
import type { ArticleCategory } from '../../types';
import { CATEGORY_MAP } from '../../types';

interface Props {
  selected: ArticleCategory | null;
  onChange: (category: ArticleCategory | null) => void;
}

const categories = Object.entries(CATEGORY_MAP) as [ArticleCategory, { name: string }][];

export const CategoryFilter: React.FC<Props> = ({ selected, onChange }) => {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onChange(null)}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
          selected === null
            ? 'bg-[var(--accent)] text-white'
            : 'bg-[var(--card-bg)] text-[var(--muted)] hover:bg-[var(--surface)] border border-[var(--border)]'
        }`}
      >
        All
      </button>
      {categories.map(([slug, { name }]) => (
        <button
          key={slug}
          onClick={() => onChange(slug)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            selected === slug
              ? 'bg-[var(--accent)] text-white'
              : 'bg-[var(--card-bg)] text-[var(--muted)] hover:bg-[var(--surface)] border border-[var(--border)]'
          }`}
        >
          {name}
        </button>
      ))}
    </div>
  );
};
