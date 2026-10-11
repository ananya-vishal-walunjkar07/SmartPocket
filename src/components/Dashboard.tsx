import React, { useState } from 'react';
import { Plus, Edit2, TrendingUp, AlertTriangle, ShieldCheck, Wallet, X, Check } from 'lucide-react';
import { Category, SpendingDay, WalletDesign } from '../types';

interface DashboardProps {
  income: number;
  balance: number;
  categories: Category[];
  weeklySpending: SpendingDay[];
  equippedWallet: WalletDesign;
  onUpdateCategory: (updated: Category) => void;
  onAddCategory: (newCategory: Category) => void;
  onNavigateToAnalyze: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  income,
  balance,
  categories,
  weeklySpending,
  equippedWallet,
  onUpdateCategory,
  onAddCategory,
  onNavigateToAnalyze
}) => {
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newCatName, setNewCatName] = useState('');
  const [newCatAllocated, setNewCatAllocated] = useState('');

  // Circular gauge calculation (as sketched on wireframe 2: "your income was ₹10,000 / your current balance is ₹8,000/10,000")
  const spentTotal = income - balance;
  const percentageRemaining = Math.max(0, Math.min(100, Math.round((balance / income) * 100)));
  const circumference = 2 * Math.PI * 45; // r=45
  const strokeDashoffset = circumference - (circumference * percentageRemaining) / 100;

  // Max weekly spend for dynamic chart scaling
  const maxSpend = Math.max(...weeklySpending.map((d) => d.amount), 1000);

  const handleSaveEdit = () => {
    if (editingCategory) {
      onUpdateCategory(editingCategory);
      setEditingCategory(null);
    }
  };

  const handleCreateCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName || !newCatAllocated) return;
    const allocatedNum = parseFloat(newCatAllocated);
    if (isNaN(allocatedNum) || allocatedNum <= 0) return;

    const newCategory: Category = {
      id: `cat-${Date.now()}`,
      name: newCatName,
      allocated: allocatedNum,
      spent: 0,
      color: '#38bdf8'
    };
    onAddCategory(newCategory);
    setNewCatName('');
    setNewCatAllocated('');
    setIsAddingNew(false);
  };

  return (
    <div className="space-y-10">
      {/* Top Banner with Active Persona info */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white rounded-3xl border-3 border-slate-900 p-6 shadow-[5px_5px_0px_#0f172a]">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-slate-900 bg-amber-100 flex-shrink-0 shadow-[2px_2px_0px_#0f172a]">
            <img
              src={equippedWallet.image}
              alt={equippedWallet.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-extrabold tracking-wider bg-orange-100 text-orange-800 px-2.5 py-0.5 rounded-full border border-orange-300">
                Current Skin: {equippedWallet.name}
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-slate-900 mt-1">
              Personal Financial Command Center
            </h1>
          </div>
        </div>

        <button
          onClick={onNavigateToAnalyze}
          className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-2xl border-2 border-slate-900 shadow-[3px_3px_0px_#0f172a] hover:translate-x-0.5 hover:translate-y-0.5 transition-all flex items-center gap-2 cursor-pointer self-stretch sm:self-auto justify-center"
        >
          <TrendingUp className="w-5 h-5" />
          <span>Think Twice Before You Spend</span>
        </button>
      </div>

      {/* Main Stats Grid: Circular Balance Dial (Left) + Weekly Spending Bar Chart (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Dial & Balance (Wireframe 2) */}
        <div className="lg:col-span-4 bg-white rounded-3xl border-3 border-slate-900 p-8 shadow-[6px_6px_0px_#0f172a] flex flex-col items-center justify-between space-y-6">
          <div className="w-full text-center">
            <span className="text-sm font-bold uppercase tracking-wider text-slate-500">
              Total Monthly Inflow
            </span>
            <p className="font-hand text-3xl font-bold text-slate-900 mt-1">
              your income was <span className="text-blue-600">₹{income.toLocaleString()}</span>
            </p>
          </div>

          {/* Handcrafted Dial Ring */}
          <div className="relative w-56 h-56 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              {/* Background circle track */}
              <circle
                cx="50"
                cy="50"
                r="42"
                stroke="#E2E8F0"
                strokeWidth="10"
                fill="none"
              />
              {/* Progress stroke */}
              <circle
                cx="50"
                cy="50"
                r="42"
                stroke="#1E293B"
                strokeWidth="10"
                strokeDasharray={2 * Math.PI * 42}
                strokeDashoffset={2 * Math.PI * 42 * (1 - balance / income)}
                strokeLinecap="round"
                fill="none"
                className="transition-all duration-700 ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
              <span className="text-3xl font-black text-slate-900">{percentageRemaining}%</span>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Funds Available
              </span>
            </div>
          </div>

          <div className="w-full bg-slate-50 border-2 border-slate-900 rounded-2xl p-4 text-center shadow-[3px_3px_0px_#0f172a]">
            <p className="text-sm font-semibold text-slate-600">your current balance is</p>
            <p className="font-hand text-4xl font-extrabold text-slate-900 mt-1">
              ₹ {balance.toLocaleString()} / {income.toLocaleString()}
            </p>
            <div className="mt-3 flex items-center justify-center gap-2 text-xs font-bold text-emerald-700 bg-emerald-100 rounded-lg py-1 px-2 border border-emerald-300">
              <ShieldCheck className="w-4 h-4" />
              <span>Safe Reserve Protection Active</span>
            </div>
          </div>
        </div>

        {/* Right Column: "LAST WEEK AT A GLANCE" Bar Chart */}
        <div className="lg:col-span-8 bg-white rounded-3xl border-3 border-slate-900 p-8 shadow-[6px_6px_0px_#0f172a] flex flex-col justify-between">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b-2 border-slate-200 gap-2">
            <div>
              <h2 className="font-hand text-3xl font-extrabold text-slate-900 tracking-wide">
                LAST WEEK AT A GLANCE
              </h2>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Daily expenditure tracking (October Week 1)
              </p>
            </div>
            <div className="flex items-center gap-3 text-xs font-bold">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-orange-500 border border-slate-900 inline-block"></span>
                <span>Peak Expense</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-slate-800 border border-slate-900 inline-block"></span>
                <span>Normal Daily</span>
              </span>
            </div>
          </div>

          {/* Bar Chart Canvas with Handcrafted Grid */}
          <div className="relative pt-8 pb-4 h-64 flex items-end justify-between gap-3 px-2">
            {/* Horizontal guidelines */}
            <div className="absolute inset-x-0 top-8 border-b border-dashed border-slate-300 pointer-events-none">
              <span className="text-[10px] text-slate-400 font-mono -top-3 absolute">₹1k</span>
            </div>
            <div className="absolute inset-x-0 top-1/2 border-b border-dashed border-slate-300 pointer-events-none">
              <span className="text-[10px] text-slate-400 font-mono -top-3 absolute">₹500</span>
            </div>

            {weeklySpending.map((day, idx) => {
              const heightPercent = Math.min(100, (day.amount / maxSpend) * 100);
              const isPeak = day.amount >= 600;

              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
                  <span className="text-xs font-mono font-bold text-slate-700 opacity-0 group-hover:opacity-100 transition-opacity">
                    ₹{day.amount}
                  </span>
                  <div className="w-full max-w-[42px] bg-slate-100 rounded-t-xl border-2 border-slate-900 relative overflow-hidden flex items-end justify-center shadow-[2px_2px_0px_#0f172a] h-full">
                    <div
                      style={{ height: `${heightPercent}%` }}
                      className={`w-full transition-all duration-500 rounded-t-lg ${
                        isPeak ? 'bg-orange-500' : 'bg-slate-800'
                      }`}
                    />
                  </div>
                  <span className="font-hand text-sm font-bold text-slate-800 tracking-tight">
                    {day.day}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="mt-4 pt-4 border-t-2 border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>Aggregated expenditure: ₹{weeklySpending.reduce((acc, d) => acc + d.amount, 0).toLocaleString()}</span>
            <span>Average daily spend: ₹{Math.round(weeklySpending.reduce((acc, d) => acc + d.amount, 0) / weeklySpending.length).toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Categories Grid (Matching 1:1 the sketched cards in Wireframe 2) */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="font-hand text-3xl font-extrabold text-slate-900 tracking-wide flex items-center gap-2">
              <span>Categories</span>
              <span className="text-base font-sans font-normal text-slate-500">
                ({categories.length} active allocation envelopes)
              </span>
            </h2>
            <p className="text-sm text-slate-600 font-medium">
              Click edit on any card to update limits, or click the + tile to add your own custom envelope.
            </p>
          </div>

          <button
            onClick={() => setIsAddingNew(true)}
            className="px-5 py-2.5 bg-white hover:bg-slate-50 text-slate-900 font-bold rounded-2xl border-2 border-slate-900 shadow-[3px_3px_0px_#0f172a] flex items-center gap-2 cursor-pointer self-start sm:self-auto"
          >
            <Plus className="w-4 h-4 text-orange-600" />
            <span>Add New Category</span>
          </button>
        </div>

        {/* The Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {categories.map((cat) => {
            const isNearLimit = cat.spent > cat.allocated * 0.8 && cat.spent <= cat.allocated;
            const isExceeded = cat.spent > cat.allocated;

            return (
              <div
                key={cat.id}
                className="group relative bg-white rounded-2xl border-3 border-slate-900 p-5 shadow-[4px_4px_0px_#0f172a] hover:shadow-[6px_6px_0px_#0f172a] hover:-translate-y-0.5 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-hand text-2xl font-black text-slate-900 tracking-tight">
                      {cat.spent} / {cat.allocated}
                    </span>
                    <button
                      onClick={() => setEditingCategory(cat)}
                      className="p-1 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
                      title="Edit Category"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Progress bar inside card */}
                  <div className="w-full h-3 bg-slate-100 rounded-full border border-slate-900 overflow-hidden mb-4">
                    <div
                      style={{
                        width: `${Math.min(100, (cat.spent / (cat.allocated || 1)) * 100)}%`
                      }}
                      className={`h-full transition-all duration-500 ${
                        isExceeded
                          ? 'bg-red-500'
                          : isNearLimit
                          ? 'bg-amber-400'
                          : 'bg-orange-400'
                      }`}
                    />
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
                  <span className="font-hand text-lg font-bold uppercase tracking-wider text-slate-800">
                    {cat.name}
                  </span>
                  {cat.isLocked && (
                    <span className="text-[10px] font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded border border-slate-300">
                      Essential
                    </span>
                  )}
                </div>
              </div>
            );
          })}

          {/* Plus Add Card Tile (from wireframe 2: giant "+" with text "add") */}
          <button
            onClick={() => setIsAddingNew(true)}
            className="group min-h-[140px] rounded-2xl border-3 border-dashed border-slate-900 bg-amber-50/50 hover:bg-amber-100/60 p-5 flex flex-col items-center justify-center gap-2 cursor-pointer transition-all shadow-[2px_2px_0px_#0f172a] hover:shadow-[4px_4px_0px_#0f172a]"
          >
            <div className="w-12 h-12 rounded-2xl bg-white border-2 border-slate-900 flex items-center justify-center text-slate-900 group-hover:scale-110 transition-transform shadow-[2px_2px_0px_#0f172a]">
              <Plus className="w-7 h-7 text-orange-600" />
            </div>
            <span className="font-hand text-2xl font-black text-slate-900 tracking-wide">
              + add
            </span>
          </button>
        </div>
      </section>

      {/* Edit Category Modal */}
      {editingCategory && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border-4 border-slate-900 max-w-md w-full p-6 shadow-[8px_8px_0px_#0f172a] space-y-5 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between">
              <h3 className="font-hand text-2xl font-black text-slate-900">
                Edit Envelope: {editingCategory.name}
              </h3>
              <button
                onClick={() => setEditingCategory(null)}
                className="p-1 rounded-xl hover:bg-slate-100 text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Envelope Name
                </label>
                <input
                  type="text"
                  value={editingCategory.name}
                  onChange={(e) =>
                    setEditingCategory({ ...editingCategory, name: e.target.value })
                  }
                  className="w-full px-4 py-2.5 rounded-xl border-2 border-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500 font-semibold text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Monthly Allocated Limit (₹)
                </label>
                <input
                  type="number"
                  value={editingCategory.allocated}
                  onChange={(e) =>
                    setEditingCategory({
                      ...editingCategory,
                      allocated: parseFloat(e.target.value) || 0
                    })
                  }
                  className="w-full px-4 py-2.5 rounded-xl border-2 border-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500 font-semibold text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Current Spent (₹)
                </label>
                <input
                  type="number"
                  value={editingCategory.spent}
                  onChange={(e) =>
                    setEditingCategory({
                      ...editingCategory,
                      spent: parseFloat(e.target.value) || 0
                    })
                  }
                  className="w-full px-4 py-2.5 rounded-xl border-2 border-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500 font-semibold text-slate-900"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3">
              <button
                onClick={() => setEditingCategory(null)}
                className="px-4 py-2 rounded-xl border-2 border-slate-400 font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                className="px-5 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold border-2 border-slate-900 shadow-[2px_2px_0px_#0f172a] cursor-pointer"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Category Modal */}
      {isAddingNew && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <form
            onSubmit={handleCreateCategory}
            className="bg-white rounded-3xl border-4 border-slate-900 max-w-md w-full p-6 shadow-[8px_8px_0px_#0f172a] space-y-5 animate-in fade-in zoom-in-95 duration-150"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-hand text-2xl font-black text-slate-900">
                Create New Envelope
              </h3>
              <button
                type="button"
                onClick={() => setIsAddingNew(false)}
                className="p-1 rounded-xl hover:bg-slate-100 text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Envelope Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Subscriptions, Gaming, Coffee"
                  value={newCatName}
                  onChange={(e) => setNewCatName(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 rounded-xl border-2 border-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500 font-semibold text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Budget Allocation (₹)
                </label>
                <input
                  type="number"
                  placeholder="500"
                  value={newCatAllocated}
                  onChange={(e) => setNewCatAllocated(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 rounded-xl border-2 border-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500 font-semibold text-slate-900"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3">
              <button
                type="button"
                onClick={() => setIsAddingNew(false)}
                className="px-4 py-2 rounded-xl border-2 border-slate-400 font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold border-2 border-slate-900 shadow-[2px_2px_0px_#0f172a] cursor-pointer"
              >
                Add Envelope
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
