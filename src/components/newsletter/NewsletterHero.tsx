import React from 'react';
import { Sparkles } from 'lucide-react';
import { NewsletterForm } from './NewsletterForm';

export const NewsletterHero: React.FC = () => {
  return (
    <section className="py-20 border-t border-[var(--border)]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-[var(--accent)]" />
          <span className="text-sm font-medium text-[var(--muted)] uppercase tracking-wider">Newsletter</span>
        </div>
        <h2 className="text-4xl font-bold mb-4 text-[var(--text)]">
          Stay Ahead of the AI Curve
        </h2>
        <p className="text-lg text-[var(--muted)] mb-8 max-w-2xl mx-auto">
          Get the latest AI tools, news, and insights delivered straight to your inbox. Join thousands of professionals staying on top of AI.
        </p>
        <div className="flex justify-center">
          <NewsletterForm compact />
        </div>
      </div>
    </section>
  );
};
