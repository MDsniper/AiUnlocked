import type { Article, ArticleCategory, NewsResponse, NewsSource } from '../types';

export async function fetchNews(
  page = 1,
  limit = 20,
  category?: ArticleCategory,
  search?: string
): Promise<NewsResponse> {
  const params = new URLSearchParams({ page: String(page), limit: String(limit) });
  if (category) {
    const CATEGORY_DISPLAY: Record<string, string> = {
      'llms': 'LLMs',
      'computer-vision': 'Computer Vision',
      'robotics': 'Robotics',
      'ai-research': 'AI Research',
      'ai-tools': 'AI Tools',
      'ai-policy': 'AI Policy',
      'industry-news': 'Industry News',
    };
    params.set('category', CATEGORY_DISPLAY[category] || category);
  }
  if (search) params.set('search', search);

  const res = await fetch(`/api/news?${params}`);
  if (!res.ok) throw new Error('Failed to fetch news');
  return res.json();
}

export async function fetchArticle(id: string): Promise<Article> {
  const res = await fetch(`/api/news/${id}`);
  if (!res.ok) throw new Error('Failed to fetch article');
  return res.json();
}

export async function fetchSources(): Promise<NewsSource[]> {
  const res = await fetch('/api/sources');
  if (!res.ok) throw new Error('Failed to fetch sources');
  const data = await res.json();
  return data.sources;
}
