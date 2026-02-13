import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Zap } from 'lucide-react';
import { ThemeSwitcher } from '../ui/ThemeSwitcher';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Categories', href: '/categories' },
  { name: 'Jobs', href: '/jobs' },
  { name: 'About', href: '/about' },
  { name: 'Newsletter', href: '/newsletter' },
];

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-[var(--card-bg)]/95 backdrop-blur-sm border-b border-[var(--border)] sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="p-1.5 bg-[var(--accent)] rounded-lg group-hover:bg-[var(--accent-hover)] transition-colors">
              <Zap size={18} className="text-white" />
            </div>
            <span className="text-lg font-bold text-[var(--text)]">
              AiUnlocked
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? 'text-[var(--accent)] bg-[var(--accent)]/10'
                    : 'text-[var(--muted)] hover:text-[var(--text)] hover:bg-[var(--surface)]'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="hidden md:block">
            <ThemeSwitcher />
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-[var(--surface)] text-[var(--muted)]"
          >
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-[var(--border)]">
            <div className="space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block px-3 py-2 text-base font-medium rounded-lg transition-colors ${
                    isActive(item.href)
                      ? 'text-[var(--accent)] bg-[var(--accent)]/10'
                      : 'text-[var(--muted)] hover:text-[var(--text)] hover:bg-[var(--surface)]'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
