
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';

type TransactionSummaryProps = {
  to: string;
  amount: string;
  gasEstimate: string;
  message?: string;
};

const TransactionSummary = ({ to, amount, gasEstimate, message }: TransactionSummaryProps) => {
  const { t } = useLanguage();
  
  const formatAddress = (address: string) => {
    if (!address || address.length < 10) return address;
    return `${address.substring(0, 10)}...${address.substring(address.length - 6)}`;
  };

  // Calculate total (amount + gas)
  const total = parseFloat(amount || '0') + parseFloat(gasEstimate || '0');

  return (
    <div className="gradient-card p-4 rounded-xl">
      <h3 className="text-lg font-semibold mb-4 text-white">
        {t('transactionSummary')}
      </h3>
      
      <div className="space-y-3 text-left">
        <div className="flex justify-between">
          <span className="text-gray-300">{t('to')}</span>
          <span className="font-medium">{formatAddress(to) || '-'}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-300">{t('sending')}</span>
          <span className="font-medium">{amount || '0'} ETH</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-300">{t('gas')}</span>
          <span className="font-medium">{gasEstimate || '0'} ETH</span>
        </div>
        
        <div className="border-t border-crypto-accent1/20 pt-2 mt-2">
          <div className="flex justify-between">
            <span className="text-gray-300">{t('total')}</span>
            <span className="font-medium text-crypto-accent1">
              {total.toFixed(6)} ETH
            </span>
          </div>
        </div>
      </div>
      
      {message && (
        <div className="mt-4 pt-4 border-t border-crypto-accent1/20">
          <span className="text-sm text-gray-300">{t('message')}</span>
          <p className="mt-1 italic text-sm">{message}</p>
        </div>
      )}
    </div>
  );
};

export default TransactionSummary;
