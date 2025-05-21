
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Compass, ArrowLeft } from 'lucide-react';
import DemoWalletCard from '@/components/demo/DemoWalletCard';
import DemoTransactionForm from '@/components/demo/DemoTransactionForm';
import DemoTransactionHistory from '@/components/demo/DemoTransactionHistory';

const Explore = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/')}
          className="text-crypto-accent2 hover:text-crypto-accent2 hover:bg-crypto-accent2/10"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          {t('backToWelcome')}
        </Button>
        
        <div className="flex items-center gap-2">
          <Compass className="h-6 w-6 text-crypto-accent1" />
          <h2 className="text-xl font-bold">{t('exploreMode')}</h2>
        </div>
        
        <Button 
          onClick={() => navigate('/')}
          variant="default"
          className="bg-crypto-accent1 hover:bg-crypto-accent1/80"
        >
          {t('connectWallet')}
        </Button>
      </div>

      <div className="bg-crypto-card p-4 rounded-lg mb-8 text-center">
        <p className="text-crypto-accent2 font-medium">{t('exploreModeDescription')}</p>
      </div>
      
      <Tabs defaultValue="dashboard" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="dashboard">{t('dashboard')}</TabsTrigger>
          <TabsTrigger value="send">{t('sendFunds')}</TabsTrigger>
          <TabsTrigger value="history">{t('history')}</TabsTrigger>
        </TabsList>
        
        <TabsContent value="dashboard" className="space-y-6">
          <h3 className="text-xl font-semibold mb-4">{t('dashboard')}</h3>
          <DemoWalletCard />
        </TabsContent>
        
        <TabsContent value="send" className="space-y-6">
          <h3 className="text-xl font-semibold mb-4">{t('sendFunds')}</h3>
          <DemoTransactionForm />
        </TabsContent>
        
        <TabsContent value="history" className="space-y-6">
          <h3 className="text-xl font-semibold mb-4">{t('history')}</h3>
          <DemoTransactionHistory />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Explore;
