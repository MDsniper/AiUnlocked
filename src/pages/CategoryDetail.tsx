import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { fetchNews } from '../services/newsApi';
import type { Article, ArticleCategory } from '../types';
import { CATEGORY_MAP } from '../types';
import { ArticleFeed } from '../components/news/ArticleFeed';
import { Pagination } from '../components/ui/Pagination';

export const CategoryDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const category = slug as ArticleCategory;
  const cat = CATEGORY_MAP[category];

  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    setLoading(true);
    fetchNews(page, 20, category)
      .then((data) => {
        setArticles(data.articles);
        setTotalPages(data.totalPages);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [page, category]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Link to="/categories" className="inline-flex items-center gap-2 text-[var(--muted)] hover:text-[var(--accent)] mb-8 transition-colors">
        <ArrowLeft size={16} /> All categories
      </Link>

      <div className="mb-10">
        <div className="text-4xl mb-3">{cat?.icon}</div>
        <h1 className="text-4xl font-bold text-[var(--text)] mb-2">{cat?.name ?? slug}</h1>
        <p className="text-[var(--muted)] text-lg">{cat?.description}</p>
      </div>

      <ArticleFeed articles={articles} loading={loading} error={error} />
      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
};
