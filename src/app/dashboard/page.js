'use client';

import { useState } from 'react';
import { useAccount } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { ArrowLeft, TrendingUp, Users, BookOpen, Percent, Settings, Plus } from 'lucide-react';
import Link from 'next/link';
import StatCard from './components/StatCard';
import ImpactChart from './components/ImpactChart';
import DepositModal from './components/DepositModal';
import WithdrawModal from './components/WithdrawModal';
import ScholarshipSelection from './components/ScholarshipSelection';
import DonationRateAdjuster from './components/DonationRateAdjuster';
import CreateScholarshipFund from './components/CreateScholarshipFund';
import { useScorlaStrategy } from '@/hooks/useScorlaStrategy';
import { SCHOLARSHIP_FUNDS } from './components/ScholarshipSelection';

export default function Dashboard() {
  const { isConnected, address } = useAccount();
  const { usdcBalance, strategyShares, totalAssets, educationSplit } = useScorlaStrategy();
  
  // Modal states
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [showScholarshipModal, setShowScholarshipModal] = useState(false);
  const [showRateModal, setShowRateModal] = useState(false);
  const [showCreateFundModal, setShowCreateFundModal] = useState(false);
  
  // User preferences
  const [selectedFund, setSelectedFund] = useState('general-education');
  const [donationRate, setDonationRate] = useState(20);

  const currentFund = SCHOLARSHIP_FUNDS.find(f => f.id === selectedFund);

  const handleCreateFund = (fundData) => {
    console.log('Creating fund:', fundData);
    // In production, this would call your smart contract or backend API
    alert('Fund submitted for review! Our team will verify it within 24-48 hours.');
  };

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
              Choose your cause. Set your rate. Make an impact. 🚀
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
            {/* Selected Fund Banner */}
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="bg-white text-black p-3 rounded-lg">
                    {currentFund?.icon}
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Supporting</p>
                    <h3 className="text-xl font-bold">{currentFund?.name}</h3>
                    <p className="text-sm text-gray-400">{currentFund?.beneficiaries} beneficiaries funded</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowScholarshipModal(true)}
                  className="px-4 py-2 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Change Fund
                </button>
              </div>
            </div>

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
                title="Your Total Impact"
                value="$127.50"
                icon={<BookOpen className="w-6 h-6" />}
                subtitle="Donated to Education"
                highlight={true}
              />
              <div 
                onClick={() => setShowRateModal(true)}
                className="cursor-pointer"
              >
                <StatCard
                  title="Your Donation Rate"
                  value={`${donationRate}%`}
                  icon={<Settings className="w-6 h-6" />}
                  subtitle="Click to adjust"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <button
                onClick={() => setShowDepositModal(true)}
                className="px-6 py-4 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-colors duration-300 flex items-center justify-center space-x-2"
              >
                <span>💎</span>
                <span>Deposit Funds</span>
              </button>
              <button
                onClick={() => setShowWithdrawModal(true)}
                className="px-6 py-4 bg-gray-900 border border-gray-700 text-white font-bold rounded-lg hover:bg-gray-800 transition-colors duration-300 flex items-center justify-center space-x-2"
              >
                <span>💸</span>
                <span>Withdraw Funds</span>
              </button>
              <button
                onClick={() => setShowCreateFundModal(true)}
                className="px-6 py-4 bg-gray-900 border border-gray-700 text-white font-bold rounded-lg hover:bg-gray-800 transition-colors duration-300 flex items-center justify-center space-x-2"
              >
                <Plus className="w-5 h-5" />
                <span>Create Fund</span>
              </button>
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Wallet Info */}
              <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Your Wallet Balance</p>
                    <p className="text-3xl font-bold">${parseFloat(usdcBalance).toFixed(2)} USDC</p>
                  </div>
                  <div className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg">
                    <p className="text-green-400 text-sm font-semibold">✓ Base Sepolia</p>
                  </div>
                </div>
                <p className="text-sm text-gray-400">
                  {address?.slice(0, 6)}...{address?.slice(-4)}
                </p>
              </div>

              {/* Yield Breakdown */}
              <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
                <h3 className="font-semibold mb-4">Your Yield Split</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Your Earnings</span>
                    <span className="text-xl font-bold text-green-400">{100 - donationRate}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Education Impact</span>
                    <span className="text-xl font-bold text-purple-400">{donationRate}%</span>
                  </div>
                </div>
                <button
                  onClick={() => setShowRateModal(true)}
                  className="w-full mt-4 px-4 py-2 bg-gray-800 border border-gray-700 text-white font-semibold rounded-lg hover:bg-gray-700 transition-colors text-sm"
                >
                  Adjust Split
                </button>
              </div>
            </div>

            {/* Impact Chart */}
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2">My Impact Over Time</h2>
                <p className="text-gray-400">Track your education contributions and yield earnings</p>
              </div>
              <ImpactChart />
            </div>
          </>
        )}
      </div>

      {/* Modals */}
      {showDepositModal && <DepositModal onClose={() => setShowDepositModal(false)} />}
      {showWithdrawModal && <WithdrawModal onClose={() => setShowWithdrawModal(false)} />}
      {showScholarshipModal && (
        <ScholarshipSelection
          selectedFund={selectedFund}
          onSelectFund={setSelectedFund}
          onClose={() => setShowScholarshipModal(false)}
        />
      )}
      {showRateModal && (
        <DonationRateAdjuster
          currentRate={donationRate}
          onUpdateRate={setDonationRate}
          onClose={() => setShowRateModal(false)}
        />
      )}
      {showCreateFundModal && (
        <CreateScholarshipFund
          onClose={() => setShowCreateFundModal(false)}
          onCreate={handleCreateFund}
        />
      )}
    </div>
  );
}