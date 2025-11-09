'use client';

import { useState } from 'react';
import { BookOpen, Globe, Code, GraduationCap, Check } from 'lucide-react';

const SCHOLARSHIP_FUNDS = [
  {
    id: 'web3-dev',
    name: 'Web3 Developer Grants',
    icon: <Code className="w-6 h-6" />,
    description: 'Fund aspiring blockchain developers learning Solidity, Web3.js, and dApp development',
    beneficiaries: 127,
    totalFunded: '$45,230',
    category: 'Technology',
  },
  {
    id: 'stem-women',
    name: 'STEM for Women',
    icon: <GraduationCap className="w-6 h-6" />,
    description: 'Support women pursuing careers in Science, Technology, Engineering, and Mathematics',
    beneficiaries: 89,
    totalFunded: '$32,180',
    category: 'Education',
  },
  {
    id: 'african-scholars',
    name: 'African Scholars Initiative',
    icon: <Globe className="w-6 h-6" />,
    description: 'Provide quality education access to students across Africa',
    beneficiaries: 204,
    totalFunded: '$67,450',
    category: 'Global Impact',
  },
  {
    id: 'general-education',
    name: 'General Education Fund',
    icon: <BookOpen className="w-6 h-6" />,
    description: 'Support diverse educational initiatives and learning opportunities worldwide',
    beneficiaries: 312,
    totalFunded: '$89,320',
    category: 'General',
  },
];

export default function ScholarshipSelection({ selectedFund, onSelectFund, onClose }) {
  const [tempSelected, setTempSelected] = useState(selectedFund);

  const handleConfirm = () => {
    onSelectFund(tempSelected);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-black border border-gray-700 rounded-lg p-8 max-w-4xl w-full my-8">
        <div className="mb-6">
          <h2 className="text-3xl font-bold mb-2">Choose Your Impact</h2>
          <p className="text-gray-400">
            Select which scholarship fund your yield contribution will support. You can change this anytime.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {SCHOLARSHIP_FUNDS.map((fund) => (
            <button
              key={fund.id}
              onClick={() => setTempSelected(fund.id)}
              className={`
                relative p-6 rounded-lg border-2 text-left transition-all duration-200
                ${tempSelected === fund.id
                  ? 'border-white bg-white text-black'
                  : 'border-gray-700 bg-gray-900 text-white hover:border-gray-500'
                }
              `}
            >
              {tempSelected === fund.id && (
                <div className="absolute top-4 right-4">
                  <div className="bg-black text-white rounded-full p-1">
                    <Check className="w-4 h-4" />
                  </div>
                </div>
              )}

              <div className="flex items-start space-x-4 mb-3">
                <div className={`
                  p-3 rounded-lg
                  ${tempSelected === fund.id ? 'bg-black text-white' : 'bg-gray-800 text-white'}
                `}>
                  {fund.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-1">{fund.name}</h3>
                  <span className={`
                    text-xs px-2 py-1 rounded
                    ${tempSelected === fund.id ? 'bg-black text-white' : 'bg-gray-800 text-gray-300'}
                  `}>
                    {fund.category}
                  </span>
                </div>
              </div>

              <p className={`text-sm mb-4 ${tempSelected === fund.id ? 'text-gray-700' : 'text-gray-400'}`}>
                {fund.description}
              </p>

              <div className="flex justify-between text-sm">
                <div>
                  <p className={tempSelected === fund.id ? 'text-gray-600' : 'text-gray-500'}>
                    Beneficiaries
                  </p>
                  <p className="font-bold">{fund.beneficiaries}</p>
                </div>
                <div className="text-right">
                  <p className={tempSelected === fund.id ? 'text-gray-600' : 'text-gray-500'}>
                    Total Funded
                  </p>
                  <p className="font-bold">{fund.totalFunded}</p>
                </div>
              </div>
            </button>
          ))}
        </div>

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
            Confirm Selection
          </button>
        </div>
      </div>
    </div>
  );
}

export { SCHOLARSHIP_FUNDS };