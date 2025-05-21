
import React, { useEffect, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useWeb3 } from '@/context/Web3Context';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

type Transaction = {
  hash: string;
  to: string;
  from: string;
  value: string;
  timestamp: number;
  status: 'pending' | 'confirmed' | 'failed';
};

// Mock transactions for demo
const mockTransactions: Transaction[] = [
  {
    hash: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
    to: '0xabcdef1234567890abcdef1234567890abcdef12',
    from: '0x1234567890abcdef1234567890abcdef12345678',
    value: '0.1',
    timestamp: Date.now() - 1000 * 60 * 60 * 2, // 2 hours ago
    status: 'confirmed'
  },
  {
    hash: '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890',
    to: '0x1234567890abcdef1234567890abcdef12345678',
    from: '0xfedcba0987654321fedcba0987654321fedcba09',
    value: '0.05',
    timestamp: Date.now() - 1000 * 60 * 60 * 24, // 1 day ago
    status: 'confirmed'
  },
  {
    hash: '0x9876543210fedcba9876543210fedcba9876543210fedcba9876543210fedcba',
    to: '0xfedcba0987654321fedcba0987654321fedcba09',
    from: '0x1234567890abcdef1234567890abcdef12345678',
    value: '0.2',
    timestamp: Date.now() - 1000 * 60 * 30, // 30 minutes ago
    status: 'pending'
  }
];

const Dashboard = () => {
  const { t } = useLanguage();
  const { account, balance, isConnected } = useWeb3();
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    // In a real app, we would fetch the transactions from a blockchain explorer API
    // For now, we'll use mock data
    setTransactions(mockTransactions);
  }, [account]);

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };

  const truncateAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  const formatValue = (value: string) => {
    return parseFloat(value).toFixed(4);
  };

  return (
    <div className="container mx-auto px-4 pb-20 md:pb-0">
      <h1 className="text-2xl font-bold mb-6">{t('dashboard')}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card className="gradient-card">
          <CardContent className="p-6">
            <h2 className="text-lg text-gray-300 mb-3">{t('yourWallet')}</h2>
            <div className="flex flex-col space-y-2">
              <div className="text-3xl font-bold text-white mb-2">
                {parseFloat(balance).toFixed(4)} ETH
              </div>
              {account && (
                <div className="text-sm text-gray-400">
                  {truncateAddress(account)}
                </div>
              )}
            </div>
            <div className="mt-6">
              <Link to="/send">
                <Button className="btn-primary w-full">{t('sendFunds')}</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
        
        <Card className="gradient-card">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg text-gray-300">{t('recentTransactions')}</h2>
              <Link to="/history" className="text-crypto-accent1 text-sm flex items-center">
                {t('viewAll')} <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            
            <div className="space-y-3">
              {transactions.length > 0 ? (
                transactions.slice(0, 3).map((tx) => (
                  <div key={tx.hash} className="flex justify-between items-center p-3 rounded-lg bg-crypto-bg/50 border border-crypto-accent1/10">
                    <div>
                      <div className="text-sm font-medium">
                        {tx.from === account ? 'Sent' : 'Received'}
                      </div>
                      <div className="text-xs text-gray-400">
                        {formatDate(tx.timestamp)}
                      </div>
                    </div>
                    <div>
                      <div className={`text-right ${tx.from === account ? 'text-red-400' : 'text-green-400'}`}>
                        {tx.from === account ? '-' : '+'}{formatValue(tx.value)} ETH
                      </div>
                      <div className="text-xs text-right">
                        <span className={`px-2 py-0.5 rounded-full text-xs 
                          ${tx.status === 'confirmed' ? 'bg-green-900/30 text-green-300' : 
                            tx.status === 'pending' ? 'bg-yellow-900/30 text-yellow-300' : 
                            'bg-red-900/30 text-red-300'}`}>
                          {t(tx.status)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-3 text-gray-400">
                  {t('noTransactions')}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
