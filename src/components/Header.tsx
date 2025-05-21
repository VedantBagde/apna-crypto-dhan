
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useWeb3 } from '@/context/Web3Context';
import LanguageToggle from './LanguageToggle';
import { Button } from '@/components/ui/button';
import { useNavigate, useLocation } from 'react-router-dom';

const Header = () => {
  const { t } = useLanguage();
  const { account, isConnected, disconnectWallet } = useWeb3();
  const navigate = useNavigate();
  const location = useLocation();
  
  const isPrototypeMode = !isConnected && location.pathname !== '/' && location.pathname !== '/explore';

  const formatAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  return (
    <header className="w-full px-4 py-3 flex justify-between items-center glass-card mb-6">
      <div className="flex items-center">
        <h1 
          className="text-2xl font-bold neon-text cursor-pointer" 
          onClick={() => navigate('/')}
        >
          Apna Crypto
        </h1>
      </div>
      
      <div className="flex items-center space-x-3">
        <LanguageToggle />
        
        {isConnected && account ? (
          <div className="flex items-center space-x-3">
            <div className="px-3 py-1.5 rounded-full border border-crypto-accent1/30 bg-crypto-card text-sm">
              {formatAddress(account)}
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={disconnectWallet}
              className="border-crypto-accent1 text-white hover:bg-crypto-accent1/20"
            >
              Disconnect
            </Button>
          </div>
        ) : isPrototypeMode ? (
          <div className="px-3 py-1.5 rounded-full border border-crypto-accent2/30 bg-crypto-card text-sm flex items-center">
            <span className="text-crypto-accent2">{t('prototypeMode')}</span>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => navigate('/')}
              className="ml-2 border-crypto-accent2 text-white hover:bg-crypto-accent2/20"
            >
              {t('connectWallet')}
            </Button>
          </div>
        ) : null}
      </div>
    </header>
  );
};

export default Header;
