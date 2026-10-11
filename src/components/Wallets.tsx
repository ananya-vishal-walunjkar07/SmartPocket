import React, { useState } from 'react';
import { Check, Sparkles, SlidersHorizontal, Image as ImageIcon } from 'lucide-react';
import { WALLET_DESIGNS } from '../mockData';
import { WalletDesign } from '../types';

interface WalletsProps {
  equippedWallet: WalletDesign;
  onEquipWallet: (wallet: WalletDesign) => void;
}

export const Wallets: React.FC<WalletsProps> = ({ equippedWallet, onEquipWallet }) => {
  const [filterTag, setFilterTag] = useState<string>('All');
  const [selectedWalletModal, setSelectedWalletModal] = useState<WalletDesign | null>(null);

  const tags = ['All', 'Popular', 'Artistic', 'Cute', 'Handcrafted', 'Hero', 'Prosperity'];

  const filteredWallets =
    filterTag === 'All'
      ? WALLET_DESIGNS
      : WALLET_DESIGNS.filter((w) => w.tag.toLowerCase() === filterTag.toLowerCase());

  return (
    <div className="space-y-10">
      {/* Header based on "WALLET DESIGNS - CHOSE YOUR CUSTOMIZED WALLET" wireframe 3 */}
      <div className="bg-gradient-to-r from-amber-100 via-orange-50 to-pink-100 rounded-3xl border-3 border-slate-900 p-8 shadow-[6px_6px_0px_#0f172a] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 border border-slate-900 text-slate-800 text-xs font-bold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-orange-600" />
            <span>AUTHENTIC REFERENCE SKETCH 3</span>
          </div>
          <h1 className="font-hand text-5xl md:text-6xl font-black text-slate-900 tracking-wide">
            WALLET DESIGNS
          </h1>
          <p className="font-hand text-2xl md:text-3xl font-bold text-orange-700 mt-1">
            CHOSE YOUR CUSTOMIZED WALLET
          </p>
          <p className="text-slate-600 text-sm max-w-xl font-medium mt-2">
            Every wallet style carries a unique personality and tactile feel. Equip your favorite skin to accompany you through every transaction and budget decision.
          </p>
        </div>

        {/* Equipped Wallet Badge */}
        <div className="bg-white rounded-2xl border-2 border-slate-900 p-4 shadow-[4px_4px_0px_#0f172a] flex items-center gap-4 self-stretch md:self-auto">
          <div className="w-16 h-16 rounded-xl overflow-hidden border-2 border-slate-900 bg-slate-100">
            <img
              src={equippedWallet.image}
              alt={equippedWallet.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-orange-600">
              EQUIPPED PERSONA
            </span>
            <p className="font-hand text-xl font-bold text-slate-900 leading-tight">
              {equippedWallet.name}
            </p>
            <span className="text-xs text-slate-500 font-medium">Applied to your profile</span>
          </div>
        </div>
      </div>

      {/* Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        <SlidersHorizontal className="w-4 h-4 text-slate-500 flex-shrink-0" />
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => setFilterTag(tag)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              filterTag === tag
                ? 'bg-slate-900 text-white border-2 border-slate-900 shadow-[2px_2px_0px_#0f172a]'
                : 'bg-white text-slate-700 border-2 border-slate-300 hover:border-slate-900'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Grid of All Wallets */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {filteredWallets.map((wallet) => {
          const isEquipped = equippedWallet.id === wallet.id;

          return (
            <div
              key={wallet.id}
              onClick={() => onEquipWallet(wallet)}
              className={`group bg-white rounded-2xl border-3 transition-all cursor-pointer p-3 flex flex-col justify-between ${
                isEquipped
                  ? 'border-orange-500 shadow-[6px_6px_0px_#f97316] ring-2 ring-orange-400 -translate-y-1'
                  : 'border-slate-900 shadow-[4px_4px_0px_#0f172a] hover:shadow-[6px_6px_0px_#0f172a] hover:-translate-y-1'
              }`}
            >
              <div>
                <div className="aspect-square w-full rounded-xl overflow-hidden border-2 border-slate-900 bg-slate-50 mb-3 relative">
                  <img
                    src={wallet.image}
                    alt={wallet.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 right-2">
                    <span className="text-[10px] font-extrabold uppercase tracking-wide bg-white/90 backdrop-blur-xs text-slate-800 px-2 py-0.5 rounded-md border border-slate-900">
                      {wallet.tag}
                    </span>
                  </div>
                </div>

                <h3 className="font-hand text-xl font-black text-slate-900 truncate">
                  {wallet.name}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-2 mt-1">
                  {wallet.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-200 mt-3 flex items-center justify-between">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onEquipWallet(wallet);
                  }}
                  className={`w-full py-1.5 px-3 rounded-xl font-bold text-xs border-2 border-slate-900 transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    isEquipped
                      ? 'bg-orange-500 text-white shadow-[1px_1px_0px_#0f172a]'
                      : 'bg-white hover:bg-slate-50 text-slate-800 shadow-[2px_2px_0px_#0f172a]'
                  }`}
                >
                  {isEquipped ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Equipped</span>
                    </>
                  ) : (
                    <span>Equip Skin</span>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Reference Gallery Sheet Preview Banner */}
      <div className="bg-white rounded-3xl border-3 border-slate-900 p-6 md:p-8 shadow-[6px_6px_0px_#0f172a] flex flex-col md:flex-row items-center gap-6">
        <div className="w-full md:w-1/3 rounded-2xl overflow-hidden border-2 border-slate-900 shadow-[3px_3px_0px_#0f172a]">
          <img
            src="/assets/wallets/wallet-designs-sheet.jpg"
            alt="Original Wallet Designs Reference Sheet"
            className="w-full h-auto object-cover"
          />
        </div>
        <div className="flex-1 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 font-bold text-xs border border-amber-300">
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Original Asset Sheet</span>
          </div>
          <h3 className="text-2xl font-black text-slate-900">
            Handcrafted Reference Design Sheet
          </h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            Every wallet card above is cropped from your original collage design sheet included in the repository assets. All individual textures, character motifs, and embroidery are preserved directly in high resolution.
          </p>
        </div>
      </div>
    </div>
  );
};
