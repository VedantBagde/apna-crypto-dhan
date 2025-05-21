
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ethers } from 'ethers';
import { toast } from '@/components/ui/sonner';

type Web3ContextType = {
  account: string | null;
  balance: string;
  isConnecting: boolean;
  isConnected: boolean;
  provider: ethers.providers.Web3Provider | null;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  sendTransaction: (to: string, amount: string, message: string) => Promise<string | null>;
  estimateGas: (to: string, amount: string) => Promise<string>;
};

const Web3Context = createContext<Web3ContextType | undefined>(undefined);

export const Web3Provider = ({ children }: { children: ReactNode }) => {
  const [account, setAccount] = useState<string | null>(null);
  const [balance, setBalance] = useState<string>('0');
  const [isConnecting, setIsConnecting] = useState<boolean>(false);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>(null);

  // Initialize provider
  useEffect(() => {
    const initProvider = async () => {
      if (window.ethereum) {
        try {
          const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
          setProvider(web3Provider);

          // Check if already connected
          const accounts = await web3Provider.listAccounts();
          if (accounts.length > 0) {
            setAccount(accounts[0]);
            setIsConnected(true);
            
            // Get balance
            const balance = await web3Provider.getBalance(accounts[0]);
            setBalance(ethers.utils.formatEther(balance));
          }
        } catch (error) {
          console.error("Failed to initialize provider:", error);
        }
      }
    };

    initProvider();
  }, []);

  // Handle account changes
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          updateBalance(accounts[0]);
        } else {
          setAccount(null);
          setBalance('0');
          setIsConnected(false);
        }
      });

      window.ethereum.on('chainChanged', () => {
        window.location.reload();
      });
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeAllListeners('accountsChanged');
        window.ethereum.removeAllListeners('chainChanged');
      }
    };
  }, [provider]);

  const updateBalance = async (address: string) => {
    if (provider) {
      try {
        const balance = await provider.getBalance(address);
        setBalance(ethers.utils.formatEther(balance));
      } catch (error) {
        console.error("Failed to get balance:", error);
      }
    }
  };

  const connectWallet = async () => {
    if (!window.ethereum) {
      toast.error("MetaMask not installed");
      return;
    }

    setIsConnecting(true);
    
    try {
      const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
      const accounts = await web3Provider.send("eth_requestAccounts", []);
      
      if (accounts.length > 0) {
        setAccount(accounts[0]);
        setIsConnected(true);
        setProvider(web3Provider);
        
        // Get balance
        const balance = await web3Provider.getBalance(accounts[0]);
        setBalance(ethers.utils.formatEther(balance));
        
        toast.success("Wallet connected successfully");
      }
    } catch (error) {
      console.error("Failed to connect wallet:", error);
      toast.error("Failed to connect wallet");
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    setAccount(null);
    setBalance('0');
    setIsConnected(false);
    toast.success("Wallet disconnected");
  };

  const estimateGas = async (to: string, amount: string): Promise<string> => {
    if (!provider || !account) return '0';
    
    try {
      const value = ethers.utils.parseEther(amount || '0');
      const gasPrice = await provider.getGasPrice();
      const gasLimit = await provider.estimateGas({
        from: account,
        to,
        value
      });
      
      const gasCost = gasPrice.mul(gasLimit);
      return ethers.utils.formatEther(gasCost);
    } catch (error) {
      console.error("Gas estimation error:", error);
      return '0';
    }
  };

  const sendTransaction = async (to: string, amount: string, message: string): Promise<string | null> => {
    if (!provider || !account) return null;
    
    try {
      const signer = provider.getSigner();
      const value = ethers.utils.parseEther(amount);
      
      const tx = await signer.sendTransaction({
        to,
        value,
        data: ethers.utils.hexlify(ethers.utils.toUtf8Bytes(message || '')),
      });
      
      toast.success("Transaction submitted");
      
      // Wait for transaction to be mined
      await tx.wait();
      
      // Update balance
      updateBalance(account);
      
      return tx.hash;
    } catch (error) {
      console.error("Transaction error:", error);
      toast.error("Transaction failed");
      return null;
    }
  };

  return (
    <Web3Context.Provider
      value={{
        account,
        balance,
        isConnecting,
        isConnected,
        provider,
        connectWallet,
        disconnectWallet,
        sendTransaction,
        estimateGas
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};

export const useWeb3 = () => {
  const context = useContext(Web3Context);
  if (context === undefined) {
    throw new Error('useWeb3 must be used within a Web3Provider');
  }
  return context;
};

// Type augmentation for window to include ethereum
declare global {
  interface Window {
    ethereum: any;
  }
}
