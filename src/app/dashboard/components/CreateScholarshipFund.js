'use client';

import { useState } from 'react';
import { X, AlertCircle } from 'lucide-react';

export default function CreateScholarshipFund({ onClose, onCreate }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'Technology',
    website: '',
    walletAddress: '',
    targetAmount: '',
    minDonation: '',
  });

  const [errors, setErrors] = useState({});

  const categories = [
    'Technology',
    'Education',
    'Global Impact',
    'Arts & Culture',
    'Healthcare',
    'Environment',
    'General',
  ];

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Fund name is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.walletAddress.trim()) {
      newErrors.walletAddress = 'Wallet address is required';
    } else if (!/^0x[a-fA-F0-9]{40}$/.test(formData.walletAddress)) {
      newErrors.walletAddress = 'Invalid Ethereum address';
    }
    if (formData.website && !/^https?:\/\/.+/.test(formData.website)) {
      newErrors.website = 'Invalid URL format';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onCreate(formData);
      onClose();
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-black border border-gray-700 rounded-lg p-8 max-w-2xl w-full my-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl font-bold mb-2">Create Scholarship Fund</h2>
            <p className="text-gray-400">
              Launch your own education initiative and receive funding
            </p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Fund Name */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Fund Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="e.g., Web3 Developers in Africa"
              className={`w-full bg-gray-900 border ${errors.name ? 'border-red-500' : 'border-gray-700'} rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white`}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="Describe your scholarship fund's mission and impact..."
              rows={4}
              className={`w-full bg-gray-900 border ${errors.description ? 'border-red-500' : 'border-gray-700'} rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white resize-none`}
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description}</p>
            )}
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium mb-2">Category</label>
            <select
              value={formData.category}
              onChange={(e) => handleChange('category', e.target.value)}
              className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Website */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Website (Optional)
            </label>
            <input
              type="url"
              value={formData.website}
              onChange={(e) => handleChange('website', e.target.value)}
              placeholder="https://yourfund.org"
              className={`w-full bg-gray-900 border ${errors.website ? 'border-red-500' : 'border-gray-700'} rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white`}
            />
            {errors.website && (
              <p className="text-red-500 text-sm mt-1">{errors.website}</p>
            )}
          </div>

          {/* Wallet Address */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Receiving Wallet Address <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.walletAddress}
              onChange={(e) => handleChange('walletAddress', e.target.value)}
              placeholder="0x..."
              className={`w-full bg-gray-900 border ${errors.walletAddress ? 'border-red-500' : 'border-gray-700'} rounded-lg px-4 py-3 text-white font-mono text-sm focus:outline-none focus:border-white`}
            />
            {errors.walletAddress && (
              <p className="text-red-500 text-sm mt-1">{errors.walletAddress}</p>
            )}
            <p className="text-gray-500 text-xs mt-1">
              This is where donations will be sent
            </p>
          </div>

          {/* Target Amount */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Target Amount (Optional)
              </label>
              <input
                type="number"
                value={formData.targetAmount}
                onChange={(e) => handleChange('targetAmount', e.target.value)}
                placeholder="10000"
                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Min. Donation (Optional)
              </label>
              <input
                type="number"
                value={formData.minDonation}
                onChange={(e) => handleChange('minDonation', e.target.value)}
                placeholder="10"
                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white"
              />
            </div>
          </div>

          {/* Verification Notice */}
          <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-blue-300">
                <p className="font-semibold mb-1">Verification Required</p>
                <p>
                  Your fund will be reviewed by the Scorla team to ensure legitimacy. 
                  This process typically takes 24-48 hours.
                </p>
              </div>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-gray-900 border border-gray-700 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-colors"
            >
              Submit for Review
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}