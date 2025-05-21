
import React from 'react';
import { useLanguage, Language } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';

const LanguageToggle = () => {
  const { language, setLanguage, t } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'english' ? 'hindi' : 'english');
  };

  return (
    <Button 
      variant="outline" 
      size="sm" 
      onClick={toggleLanguage}
      className="border-crypto-accent1 text-white hover:bg-crypto-accent1/20"
    >
      {language === 'english' ? 'हिंदी' : 'English'}
    </Button>
  );
};

export default LanguageToggle;
