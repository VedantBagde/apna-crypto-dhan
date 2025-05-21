
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Link, useLocation } from 'react-router-dom';
import { Home, Send, History, Settings } from 'lucide-react';

const Navigation = () => {
  const { t } = useLanguage();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: '/dashboard', label: t('dashboard'), icon: Home },
    { path: '/send', label: t('sendFunds'), icon: Send },
    { path: '/history', label: t('history'), icon: History },
    { path: '/settings', label: t('settings'), icon: Settings },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-10 bg-crypto-card backdrop-blur-lg border-t border-crypto-accent1/20 px-2 py-2 md:relative md:flex md:flex-col md:h-full md:border-t-0 md:w-20 md:border-r md:mr-4">
      <div className="flex justify-around md:flex-col md:space-y-8 md:items-center md:mt-12">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center justify-center p-2 rounded-lg transition-all duration-300 ${
              isActive(item.path)
                ? 'text-crypto-accent1 bg-crypto-accent1/10 border border-crypto-accent1/30'
                : 'text-gray-400 hover:text-crypto-accent1 hover:bg-crypto-accent1/5'
            }`}
          >
            <item.icon className="w-5 h-5 mb-1" />
            <span className="text-xs md:text-sm">{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;
