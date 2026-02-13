import React from 'react';
import { Link } from 'react-router-dom';
import { Zap } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[var(--surface)] border-t border-[var(--border)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-3">
              <div className="p-1.5 bg-[var(--accent)] rounded-lg">
                <Zap size={18} className="text-white" />
              </div>
              <span className="text-lg font-bold text-[var(--text)]">AiUnlocked</span>
            </div>
            <p className="text-[var(--muted)] text-sm leading-relaxed max-w-md">
              Your curated source for AI news, research, and tools from the world's top publications.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-3 text-[var(--text)]">Navigation</h3>
            <ul className="space-y-2">
              {[
                { name: 'Home', href: '/' },
                { name: 'Categories', href: '/categories' },
                { name: 'About', href: '/about' },
                { name: 'Newsletter', href: '/newsletter' },
              ].map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-[var(--muted)] hover:text-[var(--accent)] transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-3 text-[var(--text)]">Legal</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-[var(--muted)] hover:text-[var(--accent)] transition-colors text-sm">Privacy Policy</a></li>
              <li><a href="#" className="text-[var(--muted)] hover:text-[var(--accent)] transition-colors text-sm">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[var(--border)] pt-8">
          <p className="text-[var(--muted)] text-sm text-center">
            &copy; {new Date().getFullYear()} AiUnlocked. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
