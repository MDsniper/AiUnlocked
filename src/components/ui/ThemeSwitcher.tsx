import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { ThemeName, themes } from '../../themes';

const themeOptions: { name: ThemeName; label: string }[] = [
  { name: 'anthropic', label: 'Anthropic' },
  { name: 'deepseek', label: 'DeepSeek' },
  { name: 'perplexity', label: 'Perplexity' },
  { name: 'openai', label: 'OpenAI' },
  { name: 'mistral', label: 'Mistral' },
];

export const ThemeSwitcher: React.FC = () => {
  const { theme, setTheme, mode, toggleMode } = useTheme();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const current = themeOptions.find((t) => t.name === theme)!;

  return (
    <div className="flex items-center gap-1">
      <button
        onClick={toggleMode}
        className="p-1.5 rounded-lg transition-colors"
        style={{ color: 'var(--muted)' }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--surface)')}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
        aria-label={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`}
      >
        {mode === 'light' ? (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="5" />
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          </svg>
        )}
      </button>

      <div className="relative" ref={ref}>
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
          style={{ color: 'var(--muted)' }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--surface)')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
        >
          <span
            className="w-3 h-3 rounded-full shrink-0"
            style={{ backgroundColor: themes[theme][mode].accent }}
          />
          {current.label}
        </button>

        {open && (
          <div
            className="absolute right-0 mt-1 w-44 rounded-lg shadow-lg border py-1 z-50"
            style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border)' }}
          >
            {themeOptions.map((opt) => (
              <button
                key={opt.name}
                onClick={() => { setTheme(opt.name); setOpen(false); }}
                className="flex items-center gap-2.5 w-full px-3 py-2 text-sm transition-colors"
                style={{
                  color: theme === opt.name ? 'var(--accent)' : 'var(--text)',
                  backgroundColor: theme === opt.name ? 'var(--surface)' : 'transparent',
                }}
                onMouseEnter={(e) => { if (theme !== opt.name) e.currentTarget.style.backgroundColor = 'var(--surface)'; }}
                onMouseLeave={(e) => { if (theme !== opt.name) e.currentTarget.style.backgroundColor = 'transparent'; }}
              >
                <span
                  className="w-3 h-3 rounded-full shrink-0"
                  style={{ backgroundColor: themes[opt.name][mode].accent }}
                />
                {opt.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
