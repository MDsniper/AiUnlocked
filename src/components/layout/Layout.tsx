import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';

interface LayoutProps {
  children: React.ReactNode;
  onSubmitClick: () => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, onSubmitClick }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header onSubmitClick={onSubmitClick} />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
};