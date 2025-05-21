
import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useWeb3 } from '@/context/Web3Context';
import Header from './Header';
import Navigation from './Navigation';

const Layout = () => {
  const { isConnected } = useWeb3();
  const location = useLocation();
  
  // Allow access to dashboard without wallet connection if coming from prototype button
  const isPrototypeMode = !isConnected && location.pathname !== '/' && location.pathname !== '/explore';

  return (
    <div className="min-h-screen flex flex-col">
      {(isConnected || isPrototypeMode) && <Header />}
      
      <div className="flex flex-1">
        {(isConnected || isPrototypeMode) && (
          <div className="hidden md:block">
            <Navigation />
          </div>
        )}
        
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
      
      {(isConnected || isPrototypeMode) && (
        <div className="md:hidden">
          <Navigation />
        </div>
      )}
    </div>
  );
};

export default Layout;
