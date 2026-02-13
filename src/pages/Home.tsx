import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Newspaper, ArrowRight } from 'lucide-react';
import { fetchNews } from '../services/newsApi';
import type { Article, ArticleCategory, NewsResponse } from '../types';
import { FeaturedArticle } from '../components/news/FeaturedArticle';
import { ArticleFeed } from '../components/news/ArticleFeed';
import { CategoryFilter } from '../components/news/CategoryFilter';
import { SearchBar } from '../components/news/SearchBar';
import { Pagination } from '../components/ui/Pagination';

export const Home: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [featured, setFeatured] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [category, setCategory] = useState<ArticleCategory | null>(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    setPage(1);
  }, [category, search]);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    fetchNews(page, 20, category ?? undefined, search || undefined)
      .then((data: NewsResponse) => {
        if (cancelled) return;
        if (page === 1 && !category && !search && data.articles.length > 0) {
          setFeatured(data.articles[0]);
          setArticles(data.articles.slice(1));
        } else {
          setFeatured(null);
          setArticles(data.articles);
        }
        setTotalPages(data.totalPages);
      })
      .catch((err) => {
        if (!cancelled) setError(err.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => { cancelled = true; };
  }, [page, category, search]);

  return (
    <div>
      {/* Hero */}
      <section className="border-b border-[var(--border)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center gap-3 mb-4">
            <Newspaper className="text-[var(--accent)]" size={28} />
            <h1 className="text-4xl md:text-5xl font-bold text-[var(--text)] tracking-tight">
              AI News
            </h1>
          </div>
          <p className="text-lg text-[var(--muted)] max-w-2xl">
            Stay up to date with the latest in artificial intelligence — research, tools, policy, and industry news.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Featured */}
        {featured && !loading && (
          <div className="mb-10">
            <FeaturedArticle article={featured} />
          </div>
        )}

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1">
            <CategoryFilter selected={category} onChange={setCategory} />
          </div>
          <div className="w-full md:w-72">
            <SearchBar value={search} onChange={setSearch} />
          </div>
        </div>

        {/* Feed */}
        <ArticleFeed articles={articles} loading={loading} error={error} />

        {/* Pagination */}
        <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />

        {/* Newsletter CTA */}
        <section className="mt-16 rounded-2xl bg-[var(--surface)] border border-[var(--border)] p-10 text-center">
          <h2 className="text-2xl font-bold text-[var(--text)] mb-3">Never miss an AI breakthrough</h2>
          <p className="text-[var(--muted)] mb-6">Get the top stories delivered to your inbox weekly.</p>
          <Link
            to="/newsletter"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white rounded-xl font-medium transition-colors"
          >
            Subscribe <ArrowRight size={16} />
          </Link>
        </section>
      </div>
    </div>
  );
};
