import React, { useState, useEffect } from 'react';
import { Home as HomeIcon, LayoutDashboard, Calculator, Wallet, User, Eye, X, RefreshCw } from 'lucide-react';
import { Home } from './components/Home';
import { Dashboard } from './components/Dashboard';
import { Analyze } from './components/Analyze';
import { Wallets } from './components/Wallets';
import { INITIAL_CATEGORIES, INITIAL_INCOME, INITIAL_REMINDERS, INITIAL_WEEKLY_SPENDING, WALLET_DESIGNS } from './mockData';
import { Category, Reminder, SpendingDay, WalletDesign } from './types';

export const App: React.FC = () => {
  // Navigation State
  const [currentTab, setCurrentTab] = useState<'home' | 'dashboard' | 'analyze' | 'wallets'>('home');

  // Persisted or In-Memory State
  const [income, setIncome] = useState<number>(() => {
    const saved = localStorage.getItem('smartpocket_income');
    return saved ? parseFloat(saved) : INITIAL_INCOME;
  });

  const [balance, setBalance] = useState<number>(() => {
    const saved = localStorage.getItem('smartpocket_balance');
    return saved ? parseFloat(saved) : 8000;
  });

  const [categories, setCategories] = useState<Category[]>(() => {
    const saved = localStorage.getItem('smartpocket_categories');
    return saved ? JSON.parse(saved) : INITIAL_CATEGORIES;
  });

  const [reminders, setReminders] = useState<Reminder[]>(() => {
    const saved = localStorage.getItem('smartpocket_reminders');
    return saved ? JSON.parse(saved) : INITIAL_REMINDERS;
  });

  const [weeklySpending, setWeeklySpending] = useState<SpendingDay[]>(() => {
    const saved = localStorage.getItem('smartpocket_spending');
    return saved ? JSON.parse(saved) : INITIAL_WEEKLY_SPENDING;
  });

  const [equippedWallet, setEquippedWallet] = useState<WalletDesign>(() => {
    const saved = localStorage.getItem('smartpocket_wallet');
    return saved ? JSON.parse(saved) : WALLET_DESIGNS[0];
  });

  // Modal to view wireframe sketches for reference
  const [isWireframeModalOpen, setIsWireframeModalOpen] = useState(false);
  const [wireframeTab, setWireframeTab] = useState<number>(0);

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem('smartpocket_income', income.toString());
    localStorage.setItem('smartpocket_balance', balance.toString());
    localStorage.setItem('smartpocket_categories', JSON.stringify(categories));
    localStorage.setItem('smartpocket_reminders', JSON.stringify(reminders));
    localStorage.setItem('smartpocket_spending', JSON.stringify(weeklySpending));
    localStorage.setItem('smartpocket_wallet', JSON.stringify(equippedWallet));
  }, [income, balance, categories, reminders, weeklySpending, equippedWallet]);

  // Handler to record committed purchase
  const handleCommitPurchase = (amount: number, categoryId: string, itemName: string) => {
    setBalance((prev) => Math.max(0, prev - amount));

    setCategories((prev) =>
      prev.map((c) => (c.id === categoryId ? { ...c, spent: c.spent + amount } : c))
    );

    // Update today's spending in weekly chart
    setWeeklySpending((prev) => {
      const copy = [...prev];
      copy[copy.length - 1].amount += amount;
      return copy;
    });
  };

  const handleUpdateCategory = (updated: Category) => {
    setCategories((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
  };

  const handleAddCategory = (newCat: Category) => {
    setCategories((prev) => [...prev, newCat]);
  };

  const handleAddReminder = (newRem: Reminder) => {
    setReminders((prev) => [...prev, newRem]);
  };

  const handleResetData = () => {
    if (window.confirm('Reset all demo data back to original wireframe state (₹10,000 income, ₹8,000 balance)?')) {
      setIncome(INITIAL_INCOME);
      setBalance(8000);
      setCategories(INITIAL_CATEGORIES);
      setReminders(INITIAL_REMINDERS);
      setWeeklySpending(INITIAL_WEEKLY_SPENDING);
      setEquippedWallet(WALLET_DESIGNS[0]);
      localStorage.clear();
    }
  };

  const wireframeImages = [
    { title: 'Screen 1: Welcome & Homepage Wireframe', path: '/assets/wireframes/wireframe-home.jpg' },
    { title: 'Screen 2: Dashboard & Budget Envelopes Wireframe', path: '/assets/wireframes/wireframe-dashboard.jpg' },
    { title: 'Screen 3: Customized Wallet Designs Collage', path: '/assets/wireframes/wireframe-wallets.jpg' },
    { title: 'Screen 4: Purchase Analysis & Reminders Wireframe', path: '/assets/wireframes/wireframe-analyze.jpg' }
  ];

  return (
    <div className="min-h-screen bg-[#FFFDF9] text-slate-900 flex flex-col font-sans">
      {/* Top Navigation Bar: Replicates user's hand-drawn top bar with SmartPocket logo */}
      <header className="sticky top-0 z-40 bg-[#FFFDF9]/95 backdrop-blur-md border-b-3 border-slate-900 px-4 sm:px-8 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Logo & Tagline */}
          <div
            onClick={() => setCurrentTab('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="h-10 sm:h-12 overflow-hidden flex items-center">
              <img
                src="/assets/smartpocket-logo.png"
                alt="SmartPocket Original Hand-Drawn Logo"
                className="h-full object-contain group-hover:scale-105 transition-transform"
              />
            </div>
            <div className="hidden md:flex flex-col">
              <span className="font-hand text-xl font-bold tracking-widest text-slate-800 leading-none">
                MAKE · SMARTER · DECISIONS
              </span>
              <span className="text-[11px] font-bold text-orange-600 tracking-wide uppercase">
                Personal Budget Companion
              </span>
            </div>
          </div>

          {/* Navigation Links (Matching wireframe buttons: {Home} {Dashboard} {login/Profile}) */}
          <nav className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setCurrentTab('home')}
              className={`font-hand text-lg sm:text-xl font-bold px-4 py-1.5 rounded-xl border-2 transition-all cursor-pointer flex items-center gap-1.5 ${
                currentTab === 'home'
                  ? 'bg-orange-500 text-white border-slate-900 shadow-[2px_2px_0px_#0f172a]'
                  : 'bg-white text-slate-800 border-slate-900 hover:bg-slate-100 shadow-[2px_2px_0px_#0f172a]'
              }`}
            >
              <HomeIcon className="w-4 h-4" />
              <span>Home</span>
            </button>

            <button
              onClick={() => setCurrentTab('dashboard')}
              className={`font-hand text-lg sm:text-xl font-bold px-4 py-1.5 rounded-xl border-2 transition-all cursor-pointer flex items-center gap-1.5 ${
                currentTab === 'dashboard'
                  ? 'bg-orange-500 text-white border-slate-900 shadow-[2px_2px_0px_#0f172a]'
                  : 'bg-white text-slate-800 border-slate-900 hover:bg-slate-100 shadow-[2px_2px_0px_#0f172a]'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard</span>
            </button>

            <button
              onClick={() => setCurrentTab('analyze')}
              className={`font-hand text-lg sm:text-xl font-bold px-4 py-1.5 rounded-xl border-2 transition-all cursor-pointer flex items-center gap-1.5 ${
                currentTab === 'analyze'
                  ? 'bg-orange-500 text-white border-slate-900 shadow-[2px_2px_0px_#0f172a]'
                  : 'bg-white text-slate-800 border-slate-900 hover:bg-slate-100 shadow-[2px_2px_0px_#0f172a]'
              }`}
            >
              <Calculator className="w-4 h-4" />
              <span>Analyze</span>
            </button>

            <button
              onClick={() => setCurrentTab('wallets')}
              className={`font-hand text-lg sm:text-xl font-bold px-4 py-1.5 rounded-xl border-2 transition-all cursor-pointer flex items-center gap-1.5 ${
                currentTab === 'wallets'
                  ? 'bg-orange-500 text-white border-slate-900 shadow-[2px_2px_0px_#0f172a]'
                  : 'bg-white text-slate-800 border-slate-900 hover:bg-slate-100 shadow-[2px_2px_0px_#0f172a]'
              }`}
            >
              <Wallet className="w-4 h-4" />
              <span className="hidden sm:inline">Wallets</span>
            </button>

            {/* Wireframe Inspector Pill */}
            <button
              onClick={() => setIsWireframeModalOpen(true)}
              className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-amber-200 hover:bg-amber-300 text-amber-950 border-2 border-slate-900 shadow-[2px_2px_0px_#0f172a] text-xs font-bold flex items-center gap-1.5 cursor-pointer"
              title="Inspect Original Wireframe Sketches"
            >
              <Eye className="w-4 h-4" />
              <span className="hidden lg:inline">Original Sketches</span>
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-8">
        {currentTab === 'home' && (
          <Home
            onNavigate={(tab) => setCurrentTab(tab)}
            selectedWallet={equippedWallet}
            onSelectWallet={(w) => setEquippedWallet(w)}
            onOpenWireframeModal={() => setIsWireframeModalOpen(true)}
          />
        )}

        {currentTab === 'dashboard' && (
          <Dashboard
            income={income}
            balance={balance}
            categories={categories}
            weeklySpending={weeklySpending}
            equippedWallet={equippedWallet}
            onUpdateCategory={handleUpdateCategory}
            onAddCategory={handleAddCategory}
            onNavigateToAnalyze={() => setCurrentTab('analyze')}
          />
        )}

        {currentTab === 'analyze' && (
          <Analyze
            balance={balance}
            income={income}
            categories={categories}
            reminders={reminders}
            onCommitPurchase={handleCommitPurchase}
            onAddReminder={handleAddReminder}
          />
        )}

        {currentTab === 'wallets' && (
          <Wallets
            equippedWallet={equippedWallet}
            onEquipWallet={(w) => setEquippedWallet(w)}
          />
        )}
      </main>

      {/* Bottom Footer */}
      <footer className="border-t-3 border-slate-900 bg-white mt-12 py-8 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-semibold text-slate-600">
          <div className="flex items-center gap-3">
            <span className="font-hand text-xl font-bold text-slate-900">SmartPocket</span>
            <span>&middot;</span>
            <span>Make Smarter Decisions. Never Face a Financial Crisis Again.</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={handleResetData}
              className="text-slate-500 hover:text-slate-900 flex items-center gap-1 font-bold underline cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset Wireframe State</span>
            </button>
            <span>&middot;</span>
            <button
              onClick={() => setIsWireframeModalOpen(true)}
              className="text-orange-600 hover:text-orange-700 font-bold underline cursor-pointer"
            >
              View 4 Original Reference Sketches
            </button>
          </div>
        </div>
      </footer>

      {/* Wireframe Reference Modal (Direct comparison with uploaded sketches) */}
      {isWireframeModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border-4 border-slate-900 max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-[10px_10px_0px_#0f172a] animate-in fade-in zoom-in-95 duration-150">
            <div className="p-4 sm:p-6 border-b-3 border-slate-900 flex items-center justify-between bg-amber-50">
              <div>
                <h3 className="font-hand text-3xl font-black text-slate-900">
                  Original Hand-Drawn Design Wireframes
                </h3>
                <p className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                  The foundational vision for SmartPocket
                </p>
              </div>
              <button
                onClick={() => setIsWireframeModalOpen(false)}
                className="p-2 rounded-xl border-2 border-slate-900 bg-white hover:bg-slate-100 text-slate-900 shadow-[2px_2px_0px_#0f172a] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Wireframe tabs */}
            <div className="flex border-b-2 border-slate-200 overflow-x-auto bg-slate-50 px-4 pt-2">
              {wireframeImages.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => setWireframeTab(idx)}
                  className={`px-4 py-2 font-bold text-xs uppercase tracking-wider rounded-t-xl transition-all cursor-pointer whitespace-nowrap ${
                    wireframeTab === idx
                      ? 'bg-white border-t-2 border-x-2 border-slate-900 text-slate-900 font-black'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  Wireframe {idx + 1}
                </button>
              ))}
            </div>

            {/* Wireframe Image Viewer */}
            <div className="p-6 overflow-y-auto flex-1 flex flex-col items-center justify-center bg-slate-100">
              <div className="max-w-2xl w-full rounded-2xl overflow-hidden border-3 border-slate-900 shadow-[6px_6px_0px_#0f172a] bg-white">
                <img
                  src={wireframeImages[wireframeTab].path}
                  alt={wireframeImages[wireframeTab].title}
                  className="w-full h-auto object-contain max-h-[60vh]"
                />
              </div>
              <p className="mt-4 font-hand text-2xl font-bold text-slate-800 text-center">
                {wireframeImages[wireframeTab].title}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
