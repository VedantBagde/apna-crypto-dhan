
import React from 'react';
import { Outlet } from 'react-router-dom';
import { useWeb3 } from '@/context/Web3Context';
import Header from './Header';
import Navigation from './Navigation';

const Layout = () => {
  const { isConnected } = useWeb3();

  return (
    <div className="min-h-screen flex flex-col">
      {isConnected && <Header />}
      
      <div className="flex flex-1">
        {isConnected && (
          <div className="hidden md:block">
            <Navigation />
          </div>
        )}
        
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
      
      {isConnected && (
        <div className="md:hidden">
          <Navigation />
        </div>
      )}
    </div>
  );
};

export default Layout;
