import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium transition-colors duration-150 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-coffee disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary: 'bg-coffee text-goose-down hover:bg-cinnamon',
    secondary: 'bg-dark-cream text-chocolate hover:bg-fresh-hay',
    outline: 'border border-dark-cream text-chocolate hover:bg-dark-cream',
    ghost: 'text-cocoa hover:text-chocolate hover:bg-dark-cream'
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};