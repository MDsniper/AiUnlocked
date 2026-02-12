import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  className = '',
  ...props
}) => {
  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-cocoa">
          {label}
        </label>
      )}
      <input
        className={`block w-full px-3 py-2.5 border border-dark-cream rounded-md focus:outline-none focus:ring-1 focus:ring-coffee focus:border-coffee transition-colors bg-goose-down ${error ? 'border-gander-red' : ''} ${className}`}
        {...props}
      />
      {error && (
        <p className="text-sm text-gander-red">{error}</p>
      )}
    </div>
  );
};