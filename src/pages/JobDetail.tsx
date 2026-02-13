import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, MapPin, DollarSign, Clock, Building2, Briefcase } from 'lucide-react';
import { fetchJob } from '../services/jobsApi';
import type { Job } from '../types';
import { CATEGORY_MAP, JOB_TYPE_MAP, JOB_LOCATION_MAP } from '../types';

function formatSalary(min?: number | null, max?: number | null): string | null {
  if (!min && !max) return null;
  const fmt = (n: number) => n >= 1000 ? `$${Math.round(n / 1000)}k` : `$${n}`;
  if (min && max) return `${fmt(min)} - ${fmt(max)}`;
  if (min) return `From ${fmt(min)}`;
  return `Up to ${fmt(max!)}`;
}

export const JobDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError(null);

    fetchJob(id)
      .then(setJob)
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

  if (error || !job) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <p className="text-red-500 mb-4">{error ?? 'Job not found'}</p>
        <Link to="/jobs" className="text-[var(--accent)] hover:underline">Back to job board</Link>
      </div>
    );
  }

  const cat = CATEGORY_MAP[job.category];
  const salary = formatSalary(job.salaryMin, job.salaryMax);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Link to="/jobs" className="inline-flex items-center gap-2 text-[var(--muted)] hover:text-[var(--accent)] mb-8 transition-colors">
        <ArrowLeft size={16} /> Back to job board
      </Link>

      {/* Company header */}
      <div className="flex items-center gap-4 mb-6">
        {job.companyLogoUrl ? (
          <img
            src={job.companyLogoUrl}
            alt={job.companyName}
            className="w-16 h-16 rounded-xl object-cover border border-[var(--border)]"
          />
        ) : (
          <div className="w-16 h-16 rounded-xl bg-[var(--accent)]/10 border border-[var(--accent)]/20 flex items-center justify-center">
            <Building2 size={28} className="text-[var(--accent)]" />
          </div>
        )}
        <div>
          <p className="text-lg font-semibold text-[var(--text)]">{job.companyName}</p>
          <p className="text-sm text-[var(--muted)] flex items-center gap-1">
            <MapPin size={14} />
            {JOB_LOCATION_MAP[job.location]}{job.city ? ` - ${job.city}` : ''}
          </p>
        </div>
      </div>

      <h1 className="text-3xl md:text-4xl font-bold text-[var(--text)] mb-6 leading-tight">{job.jobTitle}</h1>

      {/* Badges */}
      <div className="flex flex-wrap items-center gap-3 mb-8 pb-8 border-b border-[var(--border)]">
        <span className="px-3 py-1 text-xs font-medium rounded-full bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/20">
          {cat?.name ?? job.category}
        </span>
        <span className="px-3 py-1 text-xs font-medium rounded-full bg-[var(--surface)] text-[var(--muted)] border border-[var(--border)] flex items-center gap-1">
          <Briefcase size={12} />
          {JOB_TYPE_MAP[job.jobType]}
        </span>
        {salary && (
          <span className="px-3 py-1 text-xs font-medium rounded-full bg-[var(--surface)] text-[var(--muted)] border border-[var(--border)] flex items-center gap-1">
            <DollarSign size={12} />
            {salary}
          </span>
        )}
        {job.approvedAt && (
          <span className="text-xs text-[var(--muted)] flex items-center gap-1">
            <Clock size={12} />
            Posted {new Date(job.approvedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </span>
        )}
      </div>

      {/* Description */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-[var(--text)] mb-4">About the role</h2>
        <p className="text-[var(--text)] text-base leading-relaxed whitespace-pre-wrap">{job.description}</p>
      </div>

      {/* Apply CTA */}
      <a
        href={job.applyUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white rounded-xl font-medium transition-colors"
      >
        Apply Now <ExternalLink size={16} />
      </a>

      {/* Post CTA */}
      <section className="mt-16 rounded-2xl bg-[var(--surface)] border border-[var(--border)] p-10 text-center">
        <h2 className="text-2xl font-bold text-[var(--text)] mb-3">Hiring for AI roles?</h2>
        <p className="text-[var(--muted)] mb-6">Post your job and reach thousands of AI professionals. $99 for 30 days.</p>
        <Link
          to="/jobs/post"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white rounded-xl font-medium transition-colors"
        >
          Post a Job <ExternalLink size={16} />
        </Link>
      </section>
    </div>
  );
};
