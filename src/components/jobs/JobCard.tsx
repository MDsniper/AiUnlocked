import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Clock, DollarSign, Building2 } from 'lucide-react';
import type { Job } from '../../types';
import { CATEGORY_MAP, JOB_TYPE_MAP, JOB_LOCATION_MAP } from '../../types';

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const hours = Math.floor(diff / 3600000);
  if (hours < 1) return 'Just now';
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(dateStr).toLocaleDateString();
}

function formatSalary(min?: number | null, max?: number | null): string | null {
  if (!min && !max) return null;
  const fmt = (n: number) => n >= 1000 ? `$${Math.round(n / 1000)}k` : `$${n}`;
  if (min && max) return `${fmt(min)} - ${fmt(max)}`;
  if (min) return `From ${fmt(min)}`;
  return `Up to ${fmt(max!)}`;
}

export const JobCard: React.FC<{ job: Job }> = ({ job }) => {
  const cat = CATEGORY_MAP[job.category];
  const salary = formatSalary(job.salaryMin, job.salaryMax);

  return (
    <Link
      to={`/jobs/${job.id}`}
      className="group block bg-[var(--card-bg)] border border-[var(--border)] rounded-xl p-5 hover:shadow-lg hover:scale-[1.01] transition-all duration-200"
    >
      <div className="flex items-start gap-4">
        {job.companyLogoUrl ? (
          <img
            src={job.companyLogoUrl}
            alt={job.companyName}
            className="w-12 h-12 rounded-lg object-cover border border-[var(--border)] flex-shrink-0"
          />
        ) : (
          <div className="w-12 h-12 rounded-lg bg-[var(--accent)]/10 border border-[var(--accent)]/20 flex items-center justify-center flex-shrink-0">
            <Building2 size={20} className="text-[var(--accent)]" />
          </div>
        )}

        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-[var(--text)] group-hover:text-[var(--accent)] transition-colors line-clamp-1">
            {job.jobTitle}
          </h3>
          <p className="text-sm text-[var(--muted)] mt-0.5">{job.companyName}</p>

          <div className="flex flex-wrap items-center gap-2 mt-3">
            <span className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/20">
              {cat?.name ?? job.category}
            </span>
            <span className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-[var(--surface)] text-[var(--muted)] border border-[var(--border)]">
              {JOB_TYPE_MAP[job.jobType]}
            </span>
            <span className="text-xs text-[var(--muted)] flex items-center gap-1">
              <MapPin size={12} />
              {JOB_LOCATION_MAP[job.location]}{job.city ? ` - ${job.city}` : ''}
            </span>
            {salary && (
              <span className="text-xs text-[var(--muted)] flex items-center gap-1">
                <DollarSign size={12} />
                {salary}
              </span>
            )}
          </div>
        </div>

        <span className="text-xs text-[var(--muted)] flex items-center gap-1 flex-shrink-0">
          <Clock size={12} />
          {timeAgo(job.approvedAt || job.submittedAt)}
        </span>
      </div>
    </Link>
  );
};
