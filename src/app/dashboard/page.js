'use client';

import { useState } from 'react';
import { useAccount } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { ArrowLeft, TrendingUp, Users, BookOpen, Percent } from 'lucide-react';
import Link from 'next/link';
import StatCard from './components/StatCard';
import ImpactChart from './components/ImpactChart';
import DepositModal from './components/DepositModal';
import WithdrawModal from './components/WithdrawModal';
import { useScorlaStrategy } from '@/hooks/useScorlaStrategy';

export default function Dashboard() {
  const { isConnected, address } = useAccount();
  const { usdcBalance, strategyShares, totalAssets, educationSplit } = useScorlaStrategy();
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
              <ArrowLeft className="w-5 h-5" />
              <h1 className="text-3xl font-bold">Scorla</h1>
            </Link>
            <ConnectButton />
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!isConnected ? (
          <div className="text-center py-20">
            <div className="inline-block mb-6">
              <div className="w-20 h-20 mx-auto bg-white rounded-full flex items-center justify-center">
                <BookOpen className="w-10 h-10 text-black" />
              </div>
            </div>
            <h1 className="text-5xl font-bold mb-4">
              Turn Idle Crypto Into Education
            </h1>
            <p className="text-xl text-gray-400 mb-4 max-w-2xl mx-auto">
              Every deposit helps fund scholarships. Watch your impact grow as you earn yield.
            </p>
            <p className="text-purple-400 font-semibold mb-8">
              Currently funding at {educationSplit}% - and it grows with every verified impact! 🚀
            </p>
            <ConnectButton.Custom>
              {({ openConnectModal }) => (
                <button
                  onClick={openConnectModal}
                  className="px-8 py-4 bg-white text-black text-lg font-bold rounded-lg hover:bg-gray-200 transition-colors duration-300 inline-flex items-center space-x-2"
                >
                  <span>Connect Wallet & Start Your Impact</span>
                </button>
              )}
            </ConnectButton.Custom>
          </div>
        ) : (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatCard
                title="Your Deposited Balance"
                value={`$${parseFloat(strategyShares).toFixed(2)}`}
                icon={<TrendingUp className="w-6 h-6" />}
                subtitle="USDC in Strategy"
              />
              <StatCard
                title="Total Vault Assets"
                value={`$${parseFloat(totalAssets).toFixed(2)}`}
                icon={<Users className="w-6 h-6" />}
                subtitle="Community Impact"
              />
              <StatCard
                title="Scholarships Funded"
                value="52"
                icon={<BookOpen className="w-6 h-6" />}
                subtitle="Lives Impacted"
                highlight={true}
              />
              <StatCard
                title="Education Donation Rate"
                value={`${educationSplit}%`}
                icon={<Percent className="w-6 h-6" />}
                subtitle="Growing with Impact"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mb-8">
              <button
                onClick={() => setShowDepositModal(true)}
                className="flex-1 px-6 py-4 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-colors duration-300"
              >
                💎 Deposit Funds
              </button>
              <button
                onClick={() => setShowWithdrawModal(true)}
                className="flex-1 px-6 py-4 bg-gray-900 border border-gray-700 text-white font-bold rounded-lg hover:bg-gray-800 transition-colors duration-300"
              >
                💸 Withdraw Funds
              </button>
            </div>

            {/* Wallet Info Card */}
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Your Wallet Balance</p>
                  <p className="text-3xl font-bold">${parseFloat(usdcBalance).toFixed(2)} USDC</p>
                  <p className="text-sm text-gray-400 mt-2">
                    {address?.slice(0, 6)}...{address?.slice(-4)}
                  </p>
                </div>
                <div className="text-right">
                  <div className="inline-block px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg">
                    <p className="text-green-400 text-sm font-semibold">✓ Base Sepolia</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Impact Chart */}
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2">My Impact</h2>
                <p className="text-gray-400">Yield Contributed to Education Over Time</p>
              </div>
              <ImpactChart />
            </div>
          </>
        )}
      </div>

      {showDepositModal && <DepositModal onClose={() => setShowDepositModal(false)} />}
      {showWithdrawModal && <WithdrawModal onClose={() => setShowWithdrawModal(false)} />}
    </div>
  );
}