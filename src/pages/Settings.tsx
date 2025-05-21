
import React from 'react';
import { useLanguage, Language } from '@/context/LanguageContext';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const Settings = () => {
  const { t, language, setLanguage } = useLanguage();

  const handleLanguageChange = (value: string) => {
    setLanguage(value as Language);
  };

  return (
    <div className="container mx-auto px-4 pb-20 md:pb-0">
      <h1 className="text-2xl font-bold mb-6">{t('settings')}</h1>
      
      <div className="max-w-md">
        <div className="glass-card p-6 rounded-xl mb-6">
          <h2 className="text-lg font-medium mb-4">{t('language')}</h2>
          
          <RadioGroup 
            value={language} 
            onValueChange={handleLanguageChange}
            className="space-y-3"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem 
                value="english" 
                id="english"
                className="border-crypto-accent1 text-crypto-accent1" 
              />
              <Label htmlFor="english" className="cursor-pointer">English</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <RadioGroupItem 
                value="hindi" 
                id="hindi"
                className="border-crypto-accent1 text-crypto-accent1" 
              />
              <Label htmlFor="hindi" className="cursor-pointer">हिंदी (Hindi)</Label>
            </div>
          </RadioGroup>
        </div>
        
        {/* Network settings section (placeholder) */}
        <div className="glass-card p-6 rounded-xl mb-6">
          <h2 className="text-lg font-medium mb-4">{t('network')}</h2>
          <div className="text-sm text-gray-400">
            Currently connected to Ethereum Mainnet
          </div>
        </div>
        
        {/* App information */}
        <div className="glass-card p-6 rounded-xl">
          <h2 className="text-lg font-medium mb-2">About</h2>
          <div className="text-sm text-gray-400">
            <p>Apna Crypto v1.0.0</p>
            <p className="mt-1">A Web3 DApp for Indian crypto users</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
