import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, ArrowRight } from 'lucide-react';
import { fetchJobs } from '../services/jobsApi';
import type { Job, ArticleCategory, JobType, JobLocationType } from '../types';
import { JobFeed } from '../components/jobs/JobFeed';
import { JobFilters } from '../components/jobs/JobFilters';
import { SearchBar } from '../components/news/SearchBar';
import { Pagination } from '../components/ui/Pagination';

export const JobBoard: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [category, setCategory] = useState<ArticleCategory | null>(null);
  const [jobType, setJobType] = useState<JobType | null>(null);
  const [location, setLocation] = useState<JobLocationType | null>(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    setPage(1);
  }, [category, jobType, location, search]);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    fetchJobs(page, 20, {
      category: category ?? undefined,
      jobType: jobType ?? undefined,
      location: location ?? undefined,
      search: search || undefined,
    })
      .then((data) => {
        if (cancelled) return;
        setJobs(data.jobs);
        setTotalPages(data.totalPages);
      })
      .catch((err) => {
        if (!cancelled) setError(err.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => { cancelled = true; };
  }, [page, category, jobType, location, search]);

  return (
    <div>
      {/* Hero */}
      <section className="border-b border-[var(--border)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center gap-3 mb-4">
            <Briefcase className="text-[var(--accent)]" size={28} />
            <h1 className="text-4xl md:text-5xl font-bold text-[var(--text)] tracking-tight">
              AI Job Board
            </h1>
          </div>
          <p className="text-lg text-[var(--muted)] max-w-2xl mb-6">
            Find your next role in artificial intelligence — from ML engineering to AI policy.
          </p>
          <Link
            to="/jobs/post"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white rounded-xl font-medium transition-colors"
          >
            Post a Job — $99 <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Search */}
        <div className="mb-6">
          <SearchBar value={search} onChange={setSearch} placeholder="Search AI jobs..." />
        </div>

        {/* Filters */}
        <div className="mb-8">
          <JobFilters
            category={category}
            jobType={jobType}
            location={location}
            onCategoryChange={setCategory}
            onJobTypeChange={setJobType}
            onLocationChange={setLocation}
          />
        </div>

        {/* Feed */}
        <JobFeed jobs={jobs} loading={loading} error={error} />

        {/* Pagination */}
        <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />

        {/* CTA */}
        <section className="mt-16 rounded-2xl bg-[var(--surface)] border border-[var(--border)] p-10 text-center">
          <h2 className="text-2xl font-bold text-[var(--text)] mb-3">Hiring for AI roles?</h2>
          <p className="text-[var(--muted)] mb-6">Reach thousands of AI professionals. $99 for 30 days.</p>
          <Link
            to="/jobs/post"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white rounded-xl font-medium transition-colors"
          >
            Post a Job <ArrowRight size={16} />
          </Link>
        </section>
      </div>
    </div>
  );
};
