import React from 'react';
import { Loader2 } from 'lucide-react';
import type { Job } from '../../types';
import { JobCard } from './JobCard';

interface Props {
  jobs: Job[];
  loading: boolean;
  error?: string | null;
}

export const JobFeed: React.FC<Props> = ({ jobs, loading, error }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-[var(--accent)]" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (jobs.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-[var(--muted)]">No jobs found. Check back soon!</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
};
