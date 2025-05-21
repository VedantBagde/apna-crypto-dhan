
import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useWeb3 } from '@/context/Web3Context';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import LoadingIndicator from '@/components/LoadingIndicator';
import TransactionSummary from '@/components/TransactionSummary';
import { toast } from '@/components/ui/sonner';
import { ethers } from 'ethers';

const SendFunds = () => {
  const { t } = useLanguage();
  const { account, balance, sendTransaction, estimateGas } = useWeb3();
  
  const [to, setTo] = useState('');
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [gasEstimate, setGasEstimate] = useState('0');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [addressError, setAddressError] = useState('');
  const [amountError, setAmountError] = useState('');
  
  // Validate address on change
  useEffect(() => {
    const validateAddress = () => {
      if (!to) {
        setAddressError('');
        return;
      }
      
      try {
        ethers.utils.getAddress(to);
        setAddressError('');
      } catch (error) {
        setAddressError(t('invalidAddress'));
      }
    };
    
    validateAddress();
  }, [to, t]);
  
  // Validate amount on change
  useEffect(() => {
    const validateAmount = () => {
      if (!amount) {
        setAmountError('');
        return;
      }
      
      const parsedAmount = parseFloat(amount);
      const parsedBalance = parseFloat(balance);
      
      if (isNaN(parsedAmount) || parsedAmount <= 0) {
        setAmountError('Please enter a valid amount');
        return;
      }
      
      if (parsedAmount > parsedBalance) {
        setAmountError(t('insufficientFunds'));
        return;
      }
      
      setAmountError('');
    };
    
    validateAmount();
  }, [amount, balance, t]);
  
  // Update gas estimate when address or amount changes
  useEffect(() => {
    const updateGasEstimate = async () => {
      if (to && amount && !addressError && !amountError) {
        const gas = await estimateGas(to, amount);
        setGasEstimate(gas);
      } else {
        setGasEstimate('0');
      }
    };
    
    updateGasEstimate();
  }, [to, amount, addressError, amountError, estimateGas]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!to || !amount || addressError || amountError) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const txHash = await sendTransaction(to, amount, message);
      
      if (txHash) {
        toast.success(t('transactionSubmitted'));
        // Reset form
        setTo('');
        setAmount('');
        setMessage('');
      }
    } catch (error) {
      console.error('Transaction error:', error);
      toast.error(t('errorOccurred'));
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleReset = () => {
    setTo('');
    setAmount('');
    setMessage('');
    setAddressError('');
    setAmountError('');
  };
  
  return (
    <div className="container mx-auto px-4 pb-20 md:pb-0">
      <h1 className="text-2xl font-bold mb-6">{t('sendEthereum')}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="to">{t('recipientAddress')}</Label>
                <Input
                  id="to"
                  placeholder={t('enterAddress')}
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  className={`bg-crypto-card border-crypto-accent1/30 ${
                    addressError ? 'border-red-500' : ''
                  }`}
                />
                {addressError && (
                  <p className="text-red-500 text-sm">{addressError}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="amount">{t('amount')}</Label>
                <div className="relative">
                  <Input
                    id="amount"
                    type="number"
                    step="0.0001"
                    min="0"
                    placeholder={t('enterAmount')}
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className={`bg-crypto-card border-crypto-accent1/30 pr-14 ${
                      amountError ? 'border-red-500' : ''
                    }`}
                  />
                  <div className="absolute right-3 top-2.5 text-gray-400">ETH</div>
                </div>
                {amountError && (
                  <p className="text-red-500 text-sm">{amountError}</p>
                )}
                <p className="text-sm text-gray-400">
                  Balance: {parseFloat(balance).toFixed(4)} ETH
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="message">{t('message')}</Label>
                <Textarea
                  id="message"
                  placeholder={t('enterMessage')}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="bg-crypto-card border-crypto-accent1/30 min-h-[80px]"
                />
              </div>
              
              <div className="pt-2">
                <Label>{t('estimatedGas')}</Label>
                <p className="text-crypto-accent1 font-medium">{parseFloat(gasEstimate).toFixed(6)} ETH</p>
              </div>
              
              <div className="pt-4 flex space-x-4">
                <Button 
                  type="submit" 
                  className="btn-primary flex-1"
                  disabled={isSubmitting || !to || !amount || !!addressError || !!amountError}
                >
                  {isSubmitting ? (
                    <LoadingIndicator message={t('sending')} />
                  ) : (
                    t('send')
                  )}
                </Button>
                <Button 
                  type="button" 
                  className="btn-secondary flex-1"
                  onClick={handleReset}
                >
                  {t('reset')}
                </Button>
              </div>
            </div>
          </form>
        </div>
        
        <div>
          <TransactionSummary
            to={to}
            amount={amount}
            gasEstimate={gasEstimate}
            message={message}
          />
        </div>
      </div>
    </div>
  );
};

export default SendFunds;
