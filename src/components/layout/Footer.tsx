import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, Twitter, Github, Linkedin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-goose-down border-t border-dark-cream">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-3">
              <div className="p-1.5 bg-chocolate rounded-md">
                <Zap size={18} className="text-goose-down" />
              </div>
              <span className="text-lg font-semibold text-chocolate">AI Unlocked</span>
            </div>
            <p className="text-cocoa text-sm leading-relaxed mb-4 max-w-md">
              Discover AI tools and technologies for your workflow.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold mb-3 text-chocolate">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-cocoa hover:text-chocolate transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/categories" className="text-cocoa hover:text-chocolate transition-colors text-sm">
                  Categories
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-cocoa hover:text-chocolate transition-colors text-sm">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-cocoa hover:text-chocolate transition-colors text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold mb-3 text-chocolate">Support</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-cocoa hover:text-chocolate transition-colors text-sm">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-cocoa hover:text-chocolate transition-colors text-sm">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-cocoa hover:text-chocolate transition-colors text-sm">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-dark-cream pt-8">
          <p className="text-cocoa text-sm text-center">
            © 2024 AI Unlocked. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};