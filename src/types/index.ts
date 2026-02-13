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

export const CATEGORY_MAP: Record<ArticleCategory, { name: string; description: string; icon: string }> = {
  'llms': { name: 'LLMs', description: 'Large language models, GPT, Claude, Llama, and more', icon: '🧠' },
  'computer-vision': { name: 'Computer Vision', description: 'Image recognition, generation, video AI', icon: '👁️' },
  'robotics': { name: 'Robotics', description: 'AI-powered robotics, autonomous systems', icon: '🤖' },
  'ai-research': { name: 'AI Research', description: 'Papers, breakthroughs, academic research', icon: '🔬' },
  'ai-tools': { name: 'AI Tools', description: 'New AI products, developer tools, platforms', icon: '🛠️' },
  'ai-policy': { name: 'AI Policy', description: 'Regulation, ethics, governance, safety', icon: '⚖️' },
  'industry-news': { name: 'Industry News', description: 'Funding, acquisitions, partnerships, hiring', icon: '📰' },
};
