
import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { toast } from '@/components/ui/sonner';

const DemoTransactionForm = () => {
  const { t } = useLanguage();
  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate transaction
    setTimeout(() => {
      toast.success(t('demoTransactionSuccess'));
      setIsSubmitting(false);
      setAddress('');
      setAmount('');
      setMessage('');
    }, 2000);
  };

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="address">{t('recipientAddress')}</Label>
            <Input
              id="address"
              placeholder={t('enterAddress')}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="bg-crypto-bg border-crypto-accent1/30"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">{t('amount')}</Label>
            <Input
              id="amount"
              type="text"
              placeholder={t('enterAmount')}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="bg-crypto-bg border-crypto-accent1/30"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">{t('message')}</Label>
            <Textarea
              id="message"
              placeholder={t('enterMessage')}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="bg-crypto-bg border-crypto-accent1/30"
            />
          </div>

          <div className="pt-4">
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-crypto-accent1 hover:bg-crypto-accent1/80"
            >
              {isSubmitting ? t('sending') + '...' : t('send')}
            </Button>
          </div>
        </form>
      </div>

      <div>
        <Card className="bg-crypto-card border-crypto-accent1/30 p-6">
          <h3 className="text-lg font-semibold mb-4">{t('transactionSummary')}</h3>
          
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-400">{t('to')}</span>
              <span className="font-mono">
                {address ? address.substring(0, 6) + '...' + address.substring(address.length - 4) : '0x000...0000'}
              </span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-400">{t('sending')}</span>
              <span>{amount || '0'} ETH</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-400">{t('estimatedGas')}</span>
              <span>0.0021 ETH</span>
            </div>
            
            <div className="border-t border-gray-700 my-2 pt-2">
              <div className="flex justify-between font-semibold">
                <span>{t('total')}</span>
                <span>{amount ? (parseFloat(amount) + 0.0021).toFixed(4) : '0.0021'} ETH</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DemoTransactionForm;
