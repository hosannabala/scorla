import Link from 'next/link';
import { ArrowRight, Zap, Target, DollarSign } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <nav className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Scorla</h1>
          <Link href="/dashboard" legacyBehavior>
            <a className="bg-white text-black font-semibold py-2 px-6 rounded-lg hover:bg-gray-200 transition-colors duration-300">
              Launch App
            </a>
          </Link>
        </nav>
      </header>

      <main>
        {/* Hero Section */}
        <section className="text-center pt-20 pb-32 px-4">
          <h2 className="text-5xl md:text-7xl font-bold max-w-4xl mx-auto">
            Turn Idle Crypto Into an Engine for Education.
          </h2>
          <p className="text-lg md:text-xl text-gray-400 mt-6 max-w-2xl mx-auto">
            Scorla lets you earn competitive DeFi yield on your assets while automatically funding scholarships and public learning initiatives.
          </p>
          <p className="text-xl md:text-2xl font-semibold mt-6">
            Profit with purpose.
          </p>
          <Link href="/dashboard" legacyBehavior>
            <a className="mt-10 inline-flex items-center justify-center bg-white text-black font-bold py-4 px-8 rounded-lg text-lg hover:bg-gray-200 transition-colors duration-300">
              Start Your Impact
              <ArrowRight className="ml-2 w-6 h-6" />
            </a>
          </Link>
        </section>

        {/* DESIGN FIX: Changed bg-gray-900 to a border style */}
        <section className="py-20 bg-black border-t border-b border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-4xl font-bold text-center mb-16">How Scorla Works</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <div className="text-center">
                <div className="w-16 h-16 bg-white text-black rounded-full flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="w-8 h-8" />
                </div>
                <h4 className="text-2xl font-semibold mb-2">1. Deposit & Earn</h4>
                <p className="text-gray-400">
                  You deposit stablecoins (like USDC) into a secure, high-yield vault powered by Octant's proven ERC-4626 standard.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-white text-black rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8" />
                </div>
                <h4 className="text-2xl font-semibold mb-2">2. Split the Yield</h4>
                <p className="text-gray-400">
                  Scorla's smart contract automatically splits the generated yield. A portion goes back to you, and a portion goes to the education fund.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-white text-black rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8" />
                </div>
                <h4 className="text-2xl font-semibold mb-2">3. Fund Education</h4>
                <p className="text-gray-400">
                  The education portion is transparently sent to vetted learning DAOs and scholarship programs, creating a sustainable, on-chain impact.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="max-w-4xl mx-auto py-20 px-4">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold">Finance That Fuels the Future</h3>
            <p className="text-lg text-gray-400 mt-4">Scorla is built on transparency, security, and a single, powerful idea.</p>
          </div>
          <ul className="space-y-8">
            <li>
              <h4 className="text-2xl font-semibold">Profit with Purpose</h4>
              <p className="text-gray-400 mt-2">Earn competitive returns. Make a difference. You no longer have to choose. Your principal investment is never touched or donated.</p>
            </li>
            <li>
              <h4 className="text-2xl font-semibold">Radical Transparency</h4>
              <p className="text-gray-400 mt-2">Track your total yield, your personal returns, and your exact contribution to education—all on-chain, all in real-time.</p>
            </li>
            <li>
              <h4 className="text-2xl font-semibold">Secure by Design</h4>
              <p className="text-gray-400 mt-2">Built on Octant's audited ERC-4626 vault standard, Scorla leverages battle-tested DeFi infrastructure to keep your funds secure.</p>
            </li>
          </ul>
        </section>
      </main>

      {/* DESIGN FIX: Changed bg-gray-900 to border style */}
      <footer className="bg-black border-t border-gray-800 text-center py-10">
        <p className="text-gray-400">Built for the Octant DeFi Hackathon 2025</p>
        <p className="text-2xl font-bold text-white mt-1">Scorla</p>
      </footer>
    </div>
  );
}
