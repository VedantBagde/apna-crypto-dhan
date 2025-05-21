
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

const mockTransactions = [
  { 
    id: '1', 
    date: '2025-05-15', 
    type: 'sent', 
    address: '0x8901...5432', 
    amount: '0.5', 
    status: 'confirmed'
  },
  { 
    id: '2', 
    date: '2025-05-12', 
    type: 'received', 
    address: '0x3421...9876', 
    amount: '1.2', 
    status: 'confirmed'
  },
  { 
    id: '3', 
    date: '2025-05-08', 
    type: 'sent', 
    address: '0x6543...1234', 
    amount: '0.05', 
    status: 'confirmed'
  },
  { 
    id: '4', 
    date: '2025-05-01', 
    type: 'received', 
    address: '0x9876...5678', 
    amount: '3.7', 
    status: 'confirmed'
  },
];

const DemoTransactionHistory = () => {
  const { t } = useLanguage();
  
  return (
    <div className="space-y-4">
      <div className="rounded-lg bg-crypto-card border border-crypto-accent1/30 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t('date')}</TableHead>
              <TableHead>{t('transactionType')}</TableHead>
              <TableHead>{t('to')}</TableHead>
              <TableHead className="text-right">{t('amount')}</TableHead>
              <TableHead className="text-right">{t('status')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockTransactions.map((tx) => (
              <TableRow key={tx.id}>
                <TableCell>
                  {new Date(tx.date).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Badge 
                    variant="outline" 
                    className={
                      tx.type === 'sent' 
                        ? 'bg-red-500/10 text-red-500 border-red-500/30' 
                        : 'bg-green-500/10 text-green-500 border-green-500/30'
                    }
                  >
                    {tx.type === 'sent' ? t('sent') : t('received')}
                  </Badge>
                </TableCell>
                <TableCell className="font-mono">
                  {tx.address}
                </TableCell>
                <TableCell className="text-right">
                  {tx.type === 'sent' ? '-' : '+'}{tx.amount} ETH
                </TableCell>
                <TableCell className="text-right">
                  <Badge 
                    variant="outline" 
                    className="bg-crypto-accent1/10 text-crypto-accent1 border-crypto-accent1/30"
                  >
                    {t(tx.status)}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default DemoTransactionHistory;
