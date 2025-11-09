'use client';
import { Bell, LogOut } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

const Header = () => {
  // We'll mock the connected state for the MVP
  const [isConnected, setIsConnected] = useState(false);

  return (
    <header className="flex flex-wrap gap-4 justify-between items-center max-w-7xl mx-auto">
      <Link href="/" legacyBehavior>
        <a className="text-3xl font-bold">Scorla</a>
      </Link>
      <div className="flex items-center space-x-4">
        <button className="p-2 rounded-full bg-gray-800 hover:bg-gray-700">
          <Bell className="w-5 h-5" />
        </button>
        
        {/* FUNCTIONALITY FIX: Shows "Connect" or "Disconnect" based on state */}
        {isConnected ? (
          <div className="flex items-center space-x-3">
            <div className="text-sm bg-gray-800 px-4 py-2 rounded-lg border border-gray-700">
              0x12...aBcd
            </div>
            <button 
              onClick={() => setIsConnected(false)}
              className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white"
              title="Disconnect Wallet"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        ) : (
          <button 
            onClick={() => setIsConnected(true)}
            className="text-sm font-semibold bg-white text-black py-2 px-6 rounded-lg hover:bg-gray-200 transition-colors duration-300"
          >
            Connect Wallet
          </button>
        )}
      </div>
    </header>
  );
};
export default Header;
