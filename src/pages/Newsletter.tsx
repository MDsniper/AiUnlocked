import React from 'react';
import { Mail, Zap, TrendingUp, BookOpen } from 'lucide-react';
import { NewsletterForm } from '../components/newsletter/NewsletterForm';

const BENEFITS = [
  {
    icon: Zap,
    title: 'Early Access',
    description: 'Be the first to discover new AI tools before they go mainstream.',
  },
  {
    icon: TrendingUp,
    title: 'Curated Insights',
    description: 'Expert analysis on AI trends and what they mean for your workflow.',
  },
  {
    icon: BookOpen,
    title: 'In-Depth Reviews',
    description: 'Honest, detailed reviews of the tools that matter most.',
  },
  {
    icon: Mail,
    title: 'No Spam',
    description: 'Only high-quality content. Unsubscribe anytime with one click.',
  },
];

export const Newsletter: React.FC = () => {
  return (
    <div>
      {/* Header */}
      <section className="py-20 border-b border-[var(--border)]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Mail className="text-[var(--accent)] mx-auto mb-4" size={36} />
          <h1 className="text-5xl font-bold text-[var(--text)] mb-4">
            The AiUnlocked Newsletter
          </h1>
          <p className="text-xl text-[var(--muted)] leading-relaxed">
            Your weekly dose of AI news, trends, and insights — curated for professionals who want to stay ahead.
          </p>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 border-b border-[var(--border)]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[var(--text)] text-center mb-12">What You'll Get</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {BENEFITS.map(({ icon: Icon, title, description }) => (
              <div key={title} className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[var(--accent)]/10 border border-[var(--accent)]/20 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-[var(--accent)]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[var(--text)] mb-1">{title}</h3>
                  <p className="text-[var(--muted)] text-sm leading-relaxed">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Signup Form */}
      <section className="py-16">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[var(--card-bg)] rounded-xl border border-[var(--border)] p-8 shadow-sm">
            <h2 className="text-xl font-bold text-[var(--text)] mb-6 text-center">Sign Up Now</h2>
            <NewsletterForm />
          </div>
        </div>
      </section>
    </div>
  );
};
