
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye } from 'lucide-react';

const DemoWalletCard = () => {
  const { t } = useLanguage();
  
  return (
    <Card className="bg-crypto-card border-crypto-accent1/50 overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-r from-crypto-gradient1/10 to-crypto-gradient2/10 pointer-events-none" />
      <CardHeader className="pb-2">
        <CardTitle className="flex justify-between items-center">
          <span>{t('yourWallet')}</span>
          <span className="text-sm text-crypto-accent2 bg-crypto-accent2/10 px-2 py-1 rounded">
            {t('demoMode')}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 rounded-full bg-crypto-accent1/20 flex items-center justify-center mr-4">
            <Eye className="h-6 w-6 text-crypto-accent1" />
          </div>
          <div>
            <p className="text-sm text-gray-400">{t('demoAddress')}</p>
            <p className="text-sm font-mono">0x742d...3479</p>
          </div>
        </div>
        
        <div className="mt-6">
          <p className="text-sm text-gray-400">{t('balance')}</p>
          <div className="flex items-end">
            <h3 className="text-3xl font-bold">5.24 ETH</h3>
            <span className="ml-2 text-sm text-gray-400">≈ $9,850.42</span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="bg-crypto-bg p-4 rounded-lg">
            <p className="text-sm text-gray-400">{t('thisWeek')}</p>
            <p className="text-lg font-semibold text-green-500">+0.25 ETH</p>
          </div>
          <div className="bg-crypto-bg p-4 rounded-lg">
            <p className="text-sm text-gray-400">{t('thisMonth')}</p>
            <p className="text-lg font-semibold text-red-500">-1.12 ETH</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DemoWalletCard;
