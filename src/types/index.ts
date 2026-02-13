export type ArticleCategory =
  | 'llms'
  | 'computer-vision'
  | 'robotics'
  | 'ai-research'
  | 'ai-tools'
  | 'ai-policy'
  | 'industry-news';

export interface Article {
  id: string;
  title: string;
  summary: string;
  source: string;
  sourceUrl: string;
  date: string;
  category: ArticleCategory;
  imageUrl?: string;
  author?: string;
  tags?: string[];
}

export interface NewsSource {
  id: string;
  name: string;
  feedUrl: string;
  siteUrl: string;
  logoUrl?: string;
  enabled: boolean;
}

export interface NewsletterSubscription {
  email: string;
  frequency: 'daily' | 'weekly';
  categories?: ArticleCategory[];
}

export interface NewsResponse {
  articles: Article[];
  total: number;
  page: number;
  totalPages: number;
}

// ─── Job Board Types ────────────────────────────────────────────────

export type JobLocationType = 'remote' | 'hybrid' | 'onsite';
export type JobType = 'full-time' | 'part-time' | 'contract';
export type JobStatus = 'submitted' | 'approved' | 'rejected' | 'expired';

export interface Job {
  id: string;
  companyName: string;
  jobTitle: string;
  location: JobLocationType;
  city?: string;
  salaryMin?: number;
  salaryMax?: number;
  jobType: JobType;
  category: ArticleCategory;
  description: string;
  applyUrl: string;
  companyLogoUrl?: string;
  companyEmail: string;
  status: JobStatus;
  submittedAt: string;
  approvedAt?: string;
  expiresAt?: string;
}

export interface JobSubmission {
  companyName: string;
  jobTitle: string;
  location: JobLocationType;
  city?: string;
  salaryMin?: number;
  salaryMax?: number;
  jobType: JobType;
  category: ArticleCategory;
  description: string;
  applyUrl: string;
  companyLogoUrl?: string;
  companyEmail: string;
}

export interface JobsResponse {
  jobs: Job[];
  total: number;
  page: number;
  totalPages: number;
}

export const JOB_TYPE_MAP: Record<JobType, string> = {
  'full-time': 'Full-time',
  'part-time': 'Part-time',
  'contract': 'Contract',
};

export const JOB_LOCATION_MAP: Record<JobLocationType, string> = {
  'remote': 'Remote',
  'hybrid': 'Hybrid',
  'onsite': 'On-site',
};

// ─── Category Map ───────────────────────────────────────────────────

export const CATEGORY_MAP: Record<ArticleCategory, { name: string; description: string; icon: string }> = {
  'llms': { name: 'LLMs', description: 'Large language models, GPT, Claude, Llama, and more', icon: '🧠' },
  'computer-vision': { name: 'Computer Vision', description: 'Image recognition, generation, video AI', icon: '👁️' },
  'robotics': { name: 'Robotics', description: 'AI-powered robotics, autonomous systems', icon: '🤖' },
  'ai-research': { name: 'AI Research', description: 'Papers, breakthroughs, academic research', icon: '🔬' },
  'ai-tools': { name: 'AI Tools', description: 'New AI products, developer tools, platforms', icon: '🛠️' },
  'ai-policy': { name: 'AI Policy', description: 'Regulation, ethics, governance, safety', icon: '⚖️' },
  'industry-news': { name: 'Industry News', description: 'Funding, acquisitions, partnerships, hiring', icon: '📰' },
};
