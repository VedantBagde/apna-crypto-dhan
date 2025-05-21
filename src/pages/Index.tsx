
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWeb3 } from '@/context/Web3Context';
import { useLanguage } from '@/context/LanguageContext';
import ConnectWallet from '@/components/ConnectWallet';
import { Button } from '@/components/ui/button';
import { Compass } from 'lucide-react';

const Index = () => {
  const { isConnected } = useWeb3();
  const { t } = useLanguage();
  const navigate = useNavigate();

  // Redirect to dashboard if already connected
  useEffect(() => {
    if (isConnected) {
      navigate('/dashboard');
    }
  }, [isConnected, navigate]);

  const handleExplore = () => {
    navigate('/explore');
  };

  return (
    <div className="min-h-screen">
      <ConnectWallet />
      
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
        <Button 
          onClick={handleExplore}
          variant="outline"
          className="text-lg py-6 px-10 bg-crypto-card border-crypto-accent2 hover:bg-crypto-accent2/20 group"
        >
          <Compass className="mr-2 h-6 w-6 group-hover:animate-pulse" />
          {t('explore')}
        </Button>
      </div>
    </div>
  );
};

export default Index;
