
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';

const NotFound = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex items-center justify-center bg-crypto-bg">
      <div className="text-center">
        <h1 className="text-5xl font-bold mb-4 neon-text">404</h1>
        <p className="text-xl text-gray-300 mb-6">Page not found</p>
        <Link to="/">
          <Button className="btn-primary">
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
