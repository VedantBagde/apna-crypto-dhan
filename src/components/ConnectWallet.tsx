
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useWeb3 } from '@/context/Web3Context';
import { Button } from '@/components/ui/button';
import LoadingIndicator from './LoadingIndicator';

const ConnectWallet = () => {
  const { t } = useLanguage();
  const { connectWallet, isConnecting } = useWeb3();

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] p-6">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 neon-text">
        {t('welcome')}
      </h1>
      <p className="text-lg text-center text-gray-300 mb-10 max-w-md">
        {t('subtitle')}
      </p>
      
      {isConnecting ? (
        <LoadingIndicator message="Connecting wallet..." />
      ) : (
        <Button 
          onClick={connectWallet} 
          className="btn-primary text-lg py-6 px-10"
        >
          {t('connectWallet')}
        </Button>
      )}
    </div>
  );
};

export default ConnectWallet;
