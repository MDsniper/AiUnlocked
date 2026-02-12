import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Zap, Plus } from 'lucide-react';
import { Button } from '../ui/Button';

interface HeaderProps {
  onSubmitClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onSubmitClick }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Categories', href: '/categories' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' }
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-goose-down border-b border-dark-cream sticky top-0 z-40 backdrop-blur-sm bg-opacity-95">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="p-1.5 bg-chocolate rounded-md group-hover:bg-cinnamon transition-colors">
              <Zap size={18} className="text-goose-down" />
            </div>
            <span className="text-lg font-semibold text-chocolate">
              AI Unlocked
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? 'text-chocolate'
                    : 'text-cocoa hover:text-chocolate'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Submit Button */}
          <div className="hidden md:block">
            <Button onClick={onSubmitClick} size="sm">
              Submit Tool
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md hover:bg-dark-cream text-chocolate"
          >
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-dark-cream">
            <div className="space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block px-3 py-2 text-base font-medium rounded-md transition-colors ${
                    isActive(item.href)
                      ? 'text-chocolate bg-dark-cream'
                      : 'text-cocoa hover:text-chocolate hover:bg-dark-cream'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-3">
                <Button onClick={onSubmitClick} className="w-full">
                  Submit Tool
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};