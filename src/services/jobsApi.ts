import type { Job, JobSubmission, JobsResponse, ArticleCategory, JobType, JobLocationType } from '../types';

export async function fetchJobs(
  page = 1,
  limit = 20,
  filters?: {
    category?: ArticleCategory;
    jobType?: JobType;
    location?: JobLocationType;
    search?: string;
  }
): Promise<JobsResponse> {
  const params = new URLSearchParams({ page: String(page), limit: String(limit) });
  if (filters?.category) params.set('category', filters.category);
  if (filters?.jobType) params.set('type', filters.jobType);
  if (filters?.location) params.set('location', filters.location);
  if (filters?.search) params.set('search', filters.search);

  const res = await fetch(`/api/jobs?${params}`);
  if (!res.ok) throw new Error('Failed to fetch jobs');
  return res.json();
}

export async function fetchJob(id: string): Promise<Job> {
  const res = await fetch(`/api/jobs/${id}`);
  if (!res.ok) throw new Error('Failed to fetch job');
  return res.json();
}

export async function submitJob(data: JobSubmission): Promise<{ message: string; job: Job }> {
  const res = await fetch('/api/jobs', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({ error: 'Submission failed' }));
    throw new Error(error.error || 'Submission failed');
  }
  return res.json();
}
