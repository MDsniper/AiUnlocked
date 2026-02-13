import React from 'react';
import { Loader2, CheckCircle, Mail } from 'lucide-react';
import { useNewsletter } from '../../hooks/useNewsletter';

const CATEGORY_OPTIONS = [
  'AI News',
  'Tool Reviews',
  'Tutorials',
  'Research',
  'Industry Trends',
  'Startups',
];

interface NewsletterFormProps {
  compact?: boolean;
}

export const NewsletterForm: React.FC<NewsletterFormProps> = ({ compact = false }) => {
  const {
    email, frequency, categories, loading, success, error,
    setEmail, setFrequency, toggleCategory, submit, reset,
  } = useNewsletter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submit();
  };

  if (success) {
    return (
      <div className="text-center py-8">
        <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-[var(--text)] mb-2">You're subscribed!</h3>
        <p className="text-[var(--muted)] mb-4">Check your inbox for a confirmation email.</p>
        <button onClick={reset} className="text-[var(--accent)] hover:text-[var(--accent-hover)] text-sm underline">
          Subscribe another email
        </button>
      </div>
    );
  }

  if (compact) {
    return (
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full max-w-lg">
        <div className="flex-1 relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted)]" />
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-[var(--border)] bg-[var(--card-bg)] text-[var(--text)] placeholder-[var(--muted)]/60 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/30 focus:border-[var(--accent)]"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3 bg-[var(--accent)] text-white font-medium rounded-lg hover:bg-[var(--accent-hover)] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Subscribe'}
        </button>
        {error && <p className="text-red-500 text-sm sm:col-span-2">{error}</p>}
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Email */}
      <div>
        <label htmlFor="newsletter-email" className="block text-sm font-medium text-[var(--text)] mb-2">
          Email Address
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted)]" />
          <input
            id="newsletter-email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-[var(--border)] bg-[var(--card-bg)] text-[var(--text)] placeholder-[var(--muted)]/60 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/30 focus:border-[var(--accent)]"
          />
        </div>
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>

      {/* Frequency */}
      <div>
        <label className="block text-sm font-medium text-[var(--text)] mb-2">Frequency</label>
        <div className="flex gap-3">
          {(['weekly', 'daily'] as const).map(opt => (
            <button
              key={opt}
              type="button"
              onClick={() => setFrequency(opt)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                frequency === opt
                  ? 'bg-[var(--accent)] text-white'
                  : 'bg-[var(--surface)] text-[var(--muted)] hover:bg-[var(--border)]'
              }`}
            >
              {opt.charAt(0).toUpperCase() + opt.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div>
        <label className="block text-sm font-medium text-[var(--text)] mb-2">
          Topics of Interest <span className="text-[var(--muted)] font-normal">(optional)</span>
        </label>
        <div className="flex flex-wrap gap-2">
          {CATEGORY_OPTIONS.map(cat => (
            <button
              key={cat}
              type="button"
              onClick={() => toggleCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                categories.includes(cat)
                  ? 'bg-[var(--accent)] text-white'
                  : 'bg-[var(--surface)] text-[var(--muted)] hover:bg-[var(--border)]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 bg-[var(--accent)] text-white font-medium rounded-lg hover:bg-[var(--accent-hover)] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Subscribing...
          </>
        ) : (
          'Subscribe to Newsletter'
        )}
      </button>
    </form>
  );
};
