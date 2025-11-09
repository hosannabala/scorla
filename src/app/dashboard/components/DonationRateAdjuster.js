'use client';

import { useState } from 'react';
import { X, Info } from 'lucide-react';

export default function DonationRateAdjuster({ currentRate, onUpdateRate, onClose }) {
  const [rate, setRate] = useState(currentRate);
  
  // Calculate projections
  const depositAmount = 1000; // Example $1000 deposit
  const annualYield = 0.05; // 5% APY
  const yearlyYield = depositAmount * annualYield;
  const personalYield = yearlyYield * ((100 - rate) / 100);
  const educationYield = yearlyYield * (rate / 100);

  const handleConfirm = () => {
    onUpdateRate(rate);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-black border border-gray-700 rounded-lg p-8 max-w-2xl w-full">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl font-bold mb-2">Adjust Your Impact</h2>
            <p className="text-gray-400">
              Choose how much of your yield goes to education
            </p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Info Box */}
        <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4 mb-6">
          <div className="flex items-start space-x-3">
            <Info className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-blue-300">
              <strong>How it works:</strong> Your principal investment is NEVER touched. 
              Only the yield (interest earned) is split. You can adjust this anytime.
            </p>
          </div>
        </div>

        {/* Slider */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <label className="text-sm text-gray-400">Education Donation Rate</label>
            <div className="text-4xl font-bold">{rate}%</div>
          </div>
          
          <input
            type="range"
            min="0"
            max="100"
            value={rate}
            onChange={(e) => setRate(parseInt(e.target.value))}
            className="w-full h-3 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-white"
            style={{
              background: `linear-gradient(to right, white ${rate}%, #1f2937 ${rate}%)`
            }}
          />
          
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>0% (All to you)</span>
            <span>50%</span>
            <span>100% (All to education)</span>
          </div>
        </div>

        {/* Impact Preview */}
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 mb-6">
          <h3 className="font-semibold mb-4">Example: $1,000 deposit at 5% APY</h3>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Total Yearly Yield</span>
              <span className="text-xl font-bold">${yearlyYield.toFixed(2)}</span>
            </div>
            
            <div className="border-t border-gray-800 pt-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-400">Your Earnings ({100 - rate}%)</span>
                <span className="text-xl font-bold text-green-400">
                  ${personalYield.toFixed(2)}
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Education Impact ({rate}%)</span>
                <span className="text-xl font-bold text-purple-400">
                  ${educationYield.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Presets */}
        <div className="mb-6">
          <p className="text-sm text-gray-400 mb-3">Quick Presets:</p>
          <div className="grid grid-cols-4 gap-2">
            {[10, 20, 30, 50].map((preset) => (
              <button
                key={preset}
                onClick={() => setRate(preset)}
                className={`
                  px-4 py-2 rounded-lg font-semibold transition-colors
                  ${rate === preset
                    ? 'bg-white text-black'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }
                `}
              >
                {preset}%
              </button>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            onClick={onClose}
            className="flex-1 px-6 py-3 bg-gray-900 border border-gray-700 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="flex-1 px-6 py-3 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-colors"
          >
            Update Rate
          </button>
        </div>
      </div>
    </div>
  );
}