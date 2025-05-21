
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWeb3 } from '@/context/Web3Context';
import { useLanguage } from '@/context/LanguageContext';
import ConnectWallet from '@/components/ConnectWallet';
import { Button } from '@/components/ui/button';
import { Compass, Eye } from 'lucide-react';

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
      
      <div className="mt-8 flex flex-col items-center justify-center gap-4">
        <p className="text-center text-crypto-accent2 max-w-md mb-4">
          {t('exploreWithoutWallet')}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <Button 
            onClick={handleExplore}
            variant="outline"
            className="text-lg py-6 px-10 bg-crypto-card border-crypto-accent2 hover:bg-crypto-accent2/20 group flex items-center"
          >
            <Compass className="mr-2 h-6 w-6 group-hover:animate-pulse" />
            {t('explore')}
          </Button>
          
          <Button 
            onClick={() => navigate('/dashboard')}
            variant="outline"
            className="text-lg py-6 px-10 bg-crypto-card border-crypto-accent1 hover:bg-crypto-accent1/20 group flex items-center"
          >
            <Eye className="mr-2 h-6 w-6 group-hover:animate-pulse" />
            {t('prototype')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
