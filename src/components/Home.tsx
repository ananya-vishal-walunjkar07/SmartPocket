import React, { useState } from 'react';
import { Sparkles, CheckCircle2, ChevronRight, Layers, Eye } from 'lucide-react';
import { WALLET_DESIGNS } from '../mockData';
import { WalletDesign } from '../types';

interface HomeProps {
  onNavigate: (tab: 'dashboard' | 'analyze' | 'wallets') => void;
  selectedWallet: WalletDesign;
  onSelectWallet: (wallet: WalletDesign) => void;
  onOpenWireframeModal: () => void;
}

export const Home: React.FC<HomeProps> = ({
  onNavigate,
  selectedWallet,
  onSelectWallet,
  onOpenWireframeModal
}) => {
  const [activePreview, setActivePreview] = useState<WalletDesign>(selectedWallet);

  return (
    <div className="space-y-12">
      {/* Hero Section styled with hand-drawn aesthetic matching wireframe 1 */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-100 via-orange-100 to-amber-200 border-4 border-slate-900 p-8 md:p-14 shadow-[8px_8px_0px_#0f172a]">
        <div className="max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-500/10 border-2 border-orange-500 text-orange-950 font-bold text-sm tracking-wide">
            <Sparkles className="w-4 h-4 text-orange-600" />
            <span>MAKE · SMARTER · DECISIONS</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900 leading-tight">
            WELCOME &amp; HELLO THERE! <br />
            <span className="font-hand text-5xl md:text-7xl text-orange-600 underline decoration-wavy decoration-orange-400">
              You have come to the right place.
            </span>
          </h1>

          <p className="font-hand text-2xl md:text-3xl font-bold tracking-wider text-amber-900">
            NEVER FACE A FINANCIAL CRISIS AGAIN
          </p>

          <p className="text-slate-700 text-lg md:text-xl font-medium max-w-2xl leading-relaxed">
            SmartPocket isn't another boring budget spreadsheet. It's your intuitive financial companion with interactive personalized wallet skins, real-time purchase impact analysis, and proactive safety net protection so you never run out before payday.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-4">
            <button
              onClick={() => onNavigate('dashboard')}
              className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-black text-lg rounded-2xl border-2 border-slate-900 shadow-[4px_4px_0px_#0f172a] hover:translate-x-0.5 hover:translate-y-0.5 active:shadow-[1px_1px_0px_#0f172a] transition-all flex items-center gap-3 cursor-pointer"
            >
              <span>Explore Dashboard</span>
              <ChevronRight className="w-5 h-5" />
            </button>

            <button
              onClick={() => onNavigate('analyze')}
              className="px-8 py-4 bg-white hover:bg-slate-50 text-slate-900 font-bold text-lg rounded-2xl border-2 border-slate-900 shadow-[4px_4px_0px_#0f172a] hover:translate-x-0.5 hover:translate-y-0.5 transition-all flex items-center gap-3 cursor-pointer"
            >
              <span>Analyze a Purchase</span>
            </button>

            <button
              onClick={onOpenWireframeModal}
              className="px-5 py-4 bg-amber-50 hover:bg-amber-100 text-amber-950 font-semibold text-base rounded-2xl border-2 border-amber-800 flex items-center gap-2 cursor-pointer"
              title="Compare with original design sketches"
            >
              <Eye className="w-4 h-4 text-amber-800" />
              <span>View Original Sketches</span>
            </button>
          </div>
        </div>

        {/* Floating current wallet badge */}
        <div className="mt-8 md:mt-0 md:absolute md:right-12 md:bottom-12 flex flex-col items-center">
          <div className="relative group cursor-pointer" onClick={() => onNavigate('wallets')}>
            <div className="w-48 h-48 md:w-56 md:h-56 rounded-2xl overflow-hidden border-4 border-slate-900 shadow-[6px_6px_0px_#0f172a] bg-white transform -rotate-3 hover:rotate-0 transition-transform">
              <img
                src={selectedWallet.image}
                alt={selectedWallet.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-3 -right-3 bg-amber-400 border-2 border-slate-900 font-black text-xs px-3 py-1 rounded-full shadow-[2px_2px_0px_#0f172a]">
              ACTIVE WALLET
            </div>
          </div>
          <p className="mt-4 font-hand text-xl font-bold text-slate-800">{selectedWallet.name}</p>
        </div>
      </section>

      {/* Interactive Wallet Stacking Deck (Direct homage to "Features - wallet" cards in wireframe 1) */}
      <section className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Layers className="w-6 h-6 text-orange-600" />
              <span className="font-hand text-2xl font-bold tracking-wide text-orange-600">
                Features &middot; Wallet Customization
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mt-1">
              Pick Your Custom Pocket Persona
            </h2>
            <p className="text-slate-600 text-base max-w-xl">
              As envisioned in the design sketch, your wallet transforms visually. Choose from hand-crafted themes, anime tributes, starry skies, or cute animal art.
            </p>
          </div>
          <button
            onClick={() => onNavigate('wallets')}
            className="self-start md:self-auto font-bold text-orange-600 hover:text-orange-700 underline text-lg flex items-center gap-1 cursor-pointer"
          >
            <span>View all 16+ designs &rarr;</span>
          </button>
        </div>

        {/* Overlapping Stacking Cards as hand-sketched in wireframe */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 pt-2">
          {WALLET_DESIGNS.slice(0, 6).map((wallet, idx) => {
            const isEquipped = selectedWallet.id === wallet.id;
            return (
              <div
                key={wallet.id}
                onClick={() => {
                  setActivePreview(wallet);
                  onSelectWallet(wallet);
                }}
                className={`group relative bg-white rounded-2xl border-3 p-3 transition-all cursor-pointer ${
                  isEquipped
                    ? 'border-orange-500 shadow-[6px_6px_0px_#f97316] -translate-y-2'
                    : 'border-slate-900 shadow-[4px_4px_0px_#0f172a] hover:-translate-y-1 hover:shadow-[5px_5px_0px_#0f172a]'
                }`}
              >
                <div className="aspect-square w-full rounded-xl overflow-hidden border-2 border-slate-900 bg-slate-50 mb-3">
                  <img
                    src={wallet.image}
                    alt={wallet.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-300">
                      {wallet.tag}
                    </span>
                    {isEquipped && (
                      <CheckCircle2 className="w-4 h-4 text-orange-600" />
                    )}
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm truncate">{wallet.name}</h3>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Feature Pillar highlights */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
        <div className="bg-white rounded-3xl border-3 border-slate-900 p-6 shadow-[5px_5px_0px_#0f172a] space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-sky-100 border-2 border-slate-900 flex items-center justify-center font-black text-xl text-sky-800">
            01
          </div>
          <h3 className="text-xl font-black text-slate-900">Envelopes &amp; Safety Ceilings</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            Separate essentials (Mess, Commute, Health) from discretionary desires. Strict allocations keep you aware before any threshold is crossed.
          </p>
        </div>

        <div className="bg-white rounded-3xl border-3 border-slate-900 p-6 shadow-[5px_5px_0px_#0f172a] space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 border-2 border-slate-900 flex items-center justify-center font-black text-xl text-amber-800">
            02
          </div>
          <h3 className="text-xl font-black text-slate-900">Pre-Purchase Impact Analysis</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            Test any expense before swiping. Our algorithm projects consequences instantly: <strong>HURRA!</strong>, <strong>YIKES!</strong>, or <strong>BEWARE!</strong>
          </p>
        </div>

        <div className="bg-white rounded-3xl border-3 border-slate-900 p-6 shadow-[5px_5px_0px_#0f172a] space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-rose-100 border-2 border-slate-900 flex items-center justify-center font-black text-xl text-rose-800">
            03
          </div>
          <h3 className="text-xl font-black text-slate-900">Guaranteed Crisis Prevention</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            Essential commitments like monthly mess advances and emergency shields are locked so you never get stranded without essential funds.
          </p>
        </div>
      </section>
    </div>
  );
};
