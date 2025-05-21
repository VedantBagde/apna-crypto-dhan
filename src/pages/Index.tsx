
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWeb3 } from '@/context/Web3Context';
import ConnectWallet from '@/components/ConnectWallet';

const Index = () => {
  const { isConnected } = useWeb3();
  const navigate = useNavigate();

  // Redirect to dashboard if already connected
  useEffect(() => {
    if (isConnected) {
      navigate('/dashboard');
    }
  }, [isConnected, navigate]);

  return (
    <div className="min-h-screen">
      <ConnectWallet />
    </div>
  );
};

export default Index;
