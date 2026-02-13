const API_BASE = import.meta.env.VITE_API_BASE || '';

export interface NewsletterSubscribeData {
  email: string;
  frequency?: 'daily' | 'weekly';
  categories?: string[];
}

export interface NewsletterResponse {
  success: boolean;
  message: string;
}

export async function subscribeNewsletter(
  email: string,
  frequency: 'daily' | 'weekly' = 'weekly',
  categories: string[] = []
): Promise<NewsletterResponse> {
  const response = await fetch(`${API_BASE}/api/newsletter`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, frequency, categories }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Subscription failed' }));
    throw new Error(error.message || error.error || 'Subscription failed');
  }

  const data = await response.json();
  return { success: true, message: data.message };
}
