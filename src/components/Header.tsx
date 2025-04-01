
import React from 'react';
import { Shield } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-pitch text-white py-4 px-6 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Shield size={32} className="text-highlight" />
          <div>
            <h1 className="font-bold text-xl sm:text-2xl">Injury Guardian</h1>
            <p className="text-xs sm:text-sm opacity-80">Football Injury Prediction & Prevention</p>
          </div>
        </div>
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#" className="hover:text-highlight transition-colors">Dashboard</a>
          <a href="#" className="hover:text-highlight transition-colors">Players</a>
          <a href="#" className="hover:text-highlight transition-colors">Analytics</a>
          <a href="#" className="hover:text-highlight transition-colors">Reports</a>
        </nav>
        <button className="md:hidden text-white">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header;
