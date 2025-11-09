'use client';

import { useState } from 'react';
import { useScorlaStrategy } from '@/hooks/useScorlaStrategy';

export default function WithdrawModal({ onClose }) {
  const [amount, setAmount] = useState('');
  const [step, setStep] = useState('input');
  const { strategyShares, withdraw, isPending, isSuccess } = useScorlaStrategy();

  const handleWithdraw = async () => {
    if (!amount || parseFloat(amount) <= 0) return;
    setStep('withdrawing');
    await withdraw(amount);
  };

  if (isSuccess && step === 'withdrawing') {
    setStep('success');
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-700 rounded-2xl p-8 max-w-md w-full shadow-2xl">
        {step === 'input' && (
          <>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-white">💸 Withdraw USDC</h2>
              <button onClick={onClose} className="text-gray-400 hover:text-white text-2xl">×</button>
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-400 text-sm mb-2">Amount</label>
              <div className="relative">
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full bg-gray-800 border border-gray-600 rounded-xl px-4 py-4 text-white text-2xl font-bold focus:outline-none focus:border-purple-500"
                />
                <button
                  onClick={() => setAmount(strategyShares)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 px-3 py-1 bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold rounded-lg"
                >
                  MAX
                </button>
              </div>
              <p className="text-gray-500 text-sm mt-2">
                Available: {parseFloat(strategyShares).toFixed(2)} USDC
              </p>
            </div>

            <div className="bg-orange-900/30 border border-orange-500/30 rounded-xl p-4 mb-6">
              <p className="text-orange-300 text-sm">
                ⚠️ Withdrawing will remove your funds from the education impact pool.
              </p>
            </div>

            <button
              onClick={handleWithdraw}
              disabled={!amount || parseFloat(amount) <= 0 || parseFloat(amount) > parseFloat(strategyShares) || isPending}
              className="w-full px-6 py-4 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-bold rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              {isPending ? 'Processing...' : 'Withdraw USDC'}
            </button>
          </>
        )}

        {step === 'withdrawing' && (
          <div className="text-center py-8">
            <div className="animate-spin text-6xl mb-4">⏳</div>
            <h3 className="text-2xl font-bold text-white mb-2">Withdrawing...</h3>
            <p className="text-gray-400">Confirm the transaction in your wallet</p>
          </div>
        )}

        {step === 'success' && (
          <div className="text-center py-8">
            <div className="text-6xl mb-4">✅</div>
            <h3 className="text-2xl font-bold text-white mb-2">Withdrawn!</h3>
            <p className="text-gray-400 mb-6">Your USDC has been returned</p>
            <button
              onClick={onClose}
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white font-bold rounded-xl"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
