import React, { useState } from 'react';
import { AlertCircle, CheckCircle, ShieldAlert, ArrowRight, CornerDownRight, Check, Plus, Bell } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Category, Reminder, PurchaseAnalysisResult } from '../types';
import { analyzePurchase } from '../utils/financialEngine';

interface AnalyzeProps {
  balance: number;
  income: number;
  categories: Category[];
  reminders: Reminder[];
  onCommitPurchase: (amount: number, categoryId: string, itemName: string) => void;
  onAddReminder: (reminder: Reminder) => void;
}

export const Analyze: React.FC<AnalyzeProps> = ({
  balance,
  income,
  categories,
  reminders,
  onCommitPurchase,
  onAddReminder
}) => {
  const [plannedExpense, setPlannedExpense] = useState('');
  const [expenseTitle, setExpenseTitle] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(categories[0]?.id || 'shopping');
  const [analysisResult, setAnalysisResult] = useState<PurchaseAnalysisResult | null>(null);

  // Reminders state
  const [newReminderTitle, setNewReminderTitle] = useState('');
  const [newReminderAmount, setNewReminderAmount] = useState('');
  const [showAddReminderModal, setShowAddReminderModal] = useState(false);

  // Notification toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleAnalyze = (e: React.FormEvent) => {
    e.preventDefault();
    const amountNum = parseFloat(plannedExpense);
    if (isNaN(amountNum) || amountNum <= 0) return;

    const res = analyzePurchase(
      amountNum,
      expenseTitle || 'Unspecified Expense',
      selectedCategory,
      categories,
      balance,
      reminders
    );

    setAnalysisResult(res);

    if (res.verdict === 'HURRA') {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 }
      });
    }
  };

  const handleConfirmPurchase = () => {
    if (!analysisResult) return;
    onCommitPurchase(analysisResult.amount, analysisResult.categoryId, analysisResult.itemName);
    setToastMessage(`Purchase of ₹${analysisResult.amount} successfully recorded!`);
    setAnalysisResult(null);
    setPlannedExpense('');
    setExpenseTitle('');
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleDismiss = () => {
    setAnalysisResult(null);
  };

  const handleCreateReminder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReminderTitle || !newReminderAmount) return;
    const amountNum = parseFloat(newReminderAmount);
    if (isNaN(amountNum) || amountNum <= 0) return;

    const newRem: Reminder = {
      id: `rem-${Date.now()}`,
      title: newReminderTitle,
      targetAmount: amountNum,
      priority: 'medium'
    };
    onAddReminder(newRem);
    setNewReminderTitle('');
    setNewReminderAmount('');
    setShowAddReminderModal(false);
  };

  return (
    <div className="space-y-10">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="p-4 bg-emerald-500 text-white font-bold rounded-2xl border-2 border-slate-900 shadow-[4px_4px_0px_#0f172a] flex items-center justify-between animate-in slide-in-from-top duration-200">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5" />
            <span>{toastMessage}</span>
          </div>
          <button
            onClick={() => setToastMessage(null)}
            className="text-xs font-bold uppercase underline cursor-pointer"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Header Banner - Matching hand-drawn Wireframe 4 */}
      <div className="bg-amber-100/90 rounded-3xl border-3 border-slate-900 p-8 shadow-[6px_6px_0px_#0f172a] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <span className="font-hand text-2xl font-bold tracking-widest text-orange-700 uppercase">
            THINK TWICE BEFORE YOU SPEND
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mt-1">
            Let's Analyze
          </h1>
          <p className="text-slate-700 text-base max-w-xl font-medium mt-2">
            Simulate the aftermath of your transaction in seconds before touching your bank balance.
          </p>
        </div>

        {/* Current status chip directly from Wireframe 4 */}
        <div className="bg-white rounded-2xl border-2 border-slate-900 p-5 shadow-[4px_4px_0px_#0f172a] text-center self-stretch md:self-auto min-w-[210px]">
          <p className="font-hand text-lg font-bold text-slate-600">You currently hv</p>
          <p className="font-hand text-4xl font-black text-slate-900 tracking-tight my-1">
            {balance.toLocaleString()} / {income.toLocaleString()}
          </p>
          <div className="w-full h-1 bg-slate-900 rounded-full my-1"></div>
          <p className="font-hand text-2xl font-bold text-slate-800">balance</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left / Center: Planned Expenditure Input & 3 Verdict Cards */}
        <div className="lg:col-span-8 space-y-8">
          {/* Main Expenditure Form (Handcrafted Box matching Wireframe 4) */}
          <div className="bg-white rounded-3xl border-3 border-slate-900 p-6 md:p-8 shadow-[6px_6px_0px_#0f172a] space-y-6">
            <h2 className="font-hand text-2xl font-bold text-slate-900 flex items-center gap-2">
              <CornerDownRight className="w-5 h-5 text-orange-600" />
              <span>Enter your planned expenditure</span>
            </h2>

            <form onSubmit={handleAnalyze} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                <div className="sm:col-span-7">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                    What are you looking to buy?
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Vintage Leather Jacket, Sneakers, Concert ticket"
                    value={expenseTitle}
                    onChange={(e) => setExpenseTitle(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl border-2 border-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500 font-semibold text-slate-900 placeholder:text-slate-400"
                  />
                </div>

                <div className="sm:col-span-5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Select Target Envelope
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl border-2 border-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500 font-bold text-slate-900 bg-white"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name} (Cap: ₹{c.allocated})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <div className="relative flex-1">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 font-black text-2xl text-slate-400 font-mono">
                    ₹
                  </span>
                  <input
                    type="number"
                    step="any"
                    required
                    placeholder="Enter amount (e.g. 500, 1200, 7500)"
                    value={plannedExpense}
                    onChange={(e) => setPlannedExpense(e.target.value)}
                    className="w-full pl-10 pr-4 py-3.5 rounded-2xl border-3 border-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500 font-mono text-xl font-bold text-slate-900 placeholder:text-slate-400 shadow-[2px_2px_0px_#0f172a]"
                  />
                </div>

                <button
                  type="submit"
                  className="px-8 py-3.5 bg-orange-500 hover:bg-orange-600 text-white font-black text-lg rounded-2xl border-3 border-slate-900 shadow-[4px_4px_0px_#0f172a] hover:translate-x-0.5 hover:translate-y-0.5 active:shadow-[1px_1px_0px_#0f172a] transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>[ ENTER ]</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </form>
          </div>

          {/* Wireframe Verdicts Display (Showing HURRA!, YIKES!, and BEWARE! scenarios) */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-hand text-3xl font-extrabold text-slate-900 tracking-wide">
                Purchase Prognosis Simulation
              </h2>
              {analysisResult && (
                <span className="text-xs font-bold bg-slate-900 text-white px-3 py-1 rounded-full uppercase">
                  Active Simulation for ₹{analysisResult.amount}
                </span>
              )}
            </div>

            {/* If user analyzed, render the active card with prominent spotlight; or show the 3 comparative mock states from wireframe */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* HURRA! Card */}
              <div
                className={`rounded-3xl border-3 border-slate-900 p-6 flex flex-col justify-between transition-all ${
                  analysisResult?.verdict === 'HURRA'
                    ? 'bg-emerald-50 ring-4 ring-emerald-500 shadow-[8px_8px_0px_#10b981] -translate-y-2'
                    : 'bg-white opacity-85 shadow-[4px_4px_0px_#0f172a]'
                }`}
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-emerald-100 border-2 border-slate-900 flex items-center justify-center mb-4">
                    <CheckCircle className="w-6 h-6 text-emerald-700" />
                  </div>
                  <h3 className="font-hand text-4xl font-black text-emerald-800 tracking-tight">
                    HURRA!
                  </h3>
                  <p className="font-hand text-xl font-bold text-slate-700 mt-3 leading-snug">
                    {analysisResult?.verdict === 'HURRA'
                      ? analysisResult.message
                      : 'you hv just the amount to make this purthese. Proceed to payment?'}
                  </p>
                </div>

                <div className="pt-6 border-t-2 border-slate-200 mt-6 space-y-3">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Proceed to payment?
                  </p>
                  <div className="flex items-center gap-3">
                    <button
                      disabled={analysisResult?.verdict !== 'HURRA'}
                      onClick={handleConfirmPurchase}
                      className="flex-1 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white font-black text-sm border-2 border-slate-900 shadow-[2px_2px_0px_#0f172a] cursor-pointer"
                    >
                      [ YES ]
                    </button>
                    <button
                      onClick={handleDismiss}
                      className="flex-1 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-800 font-black text-sm border-2 border-slate-900 shadow-[2px_2px_0px_#0f172a] cursor-pointer"
                    >
                      [ NO ]
                    </button>
                  </div>
                </div>
              </div>

              {/* YIKES! Card */}
              <div
                className={`rounded-3xl border-3 border-slate-900 p-6 flex flex-col justify-between transition-all ${
                  analysisResult?.verdict === 'YIKES'
                    ? 'bg-amber-50 ring-4 ring-amber-500 shadow-[8px_8px_0px_#f59e0b] -translate-y-2'
                    : 'bg-white opacity-85 shadow-[4px_4px_0px_#0f172a]'
                }`}
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-amber-100 border-2 border-slate-900 flex items-center justify-center mb-4">
                    <AlertCircle className="w-6 h-6 text-amber-700" />
                  </div>
                  <h3 className="font-hand text-4xl font-black text-amber-800 tracking-tight">
                    YIKES!
                  </h3>
                  <p className="font-hand text-xl font-bold text-slate-700 mt-3 leading-snug">
                    {analysisResult?.verdict === 'YIKES'
                      ? analysisResult.message
                      : 'Running a lil tight on budget. Saving for shoes will be compromised. Proceed to payment?'}
                  </p>
                </div>

                <div className="pt-6 border-t-2 border-slate-200 mt-6 space-y-3">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Proceed to payment?
                  </p>
                  <div className="flex items-center gap-3">
                    <button
                      disabled={analysisResult?.verdict !== 'YIKES'}
                      onClick={handleConfirmPurchase}
                      className="flex-1 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 disabled:opacity-40 text-white font-black text-sm border-2 border-slate-900 shadow-[2px_2px_0px_#0f172a] cursor-pointer"
                    >
                      [ YES ]
                    </button>
                    <button
                      onClick={handleDismiss}
                      className="flex-1 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-800 font-black text-sm border-2 border-slate-900 shadow-[2px_2px_0px_#0f172a] cursor-pointer"
                    >
                      [ NO ]
                    </button>
                  </div>
                </div>
              </div>

              {/* BEWARE! Card */}
              <div
                className={`rounded-3xl border-3 border-slate-900 p-6 flex flex-col justify-between transition-all ${
                  analysisResult?.verdict === 'BEWARE'
                    ? 'bg-red-50 ring-4 ring-red-500 shadow-[8px_8px_0px_#ef4444] -translate-y-2'
                    : 'bg-white opacity-85 shadow-[4px_4px_0px_#0f172a]'
                }`}
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-red-100 border-2 border-slate-900 flex items-center justify-center mb-4">
                    <ShieldAlert className="w-6 h-6 text-red-700" />
                  </div>
                  <h3 className="font-hand text-4xl font-black text-red-800 tracking-tight">
                    BEWARE!
                  </h3>
                  <p className="font-hand text-xl font-bold text-slate-700 mt-3 leading-snug">
                    {analysisResult?.verdict === 'BEWARE'
                      ? analysisResult.message
                      : 'You will not be able to pay advance mess. Come back to this a little later.'}
                  </p>
                </div>

                <div className="pt-6 border-t-2 border-slate-200 mt-6 space-y-3">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Safety protection locked
                  </p>
                  <button
                    onClick={handleDismiss}
                    className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-black text-sm border-2 border-slate-900 shadow-[2px_2px_0px_#0f172a] cursor-pointer"
                  >
                    [ OK ]
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Stats After This Purchase (Matching bottom container in Wireframe 4) */}
          <div className="bg-white rounded-3xl border-3 border-slate-900 p-6 shadow-[6px_6px_0px_#0f172a] space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-hand text-3xl font-extrabold text-slate-900">
                Your stats after this purchase
              </h2>
              {analysisResult ? (
                <span className="text-xs font-bold text-slate-500">
                  Simulated Balance: ₹{analysisResult.newBalance.toLocaleString()}
                </span>
              ) : (
                <span className="text-xs font-bold text-slate-400">
                  Enter an expense above to simulate changes
                </span>
              )}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {categories.slice(0, 8).map((cat) => {
                const isTarget = analysisResult?.categoryId === cat.id;
                const simulatedSpent = isTarget
                  ? cat.spent + (analysisResult?.amount || 0)
                  : cat.spent;
                const isOver = simulatedSpent > cat.allocated;

                return (
                  <div
                    key={cat.id}
                    className={`rounded-2xl border-2 p-3.5 flex flex-col justify-between transition-all ${
                      isTarget
                        ? isOver
                          ? 'border-red-500 bg-red-50 shadow-[3px_3px_0px_#ef4444]'
                          : 'border-emerald-500 bg-emerald-50 shadow-[3px_3px_0px_#10b981]'
                        : 'border-slate-900 bg-slate-50/70'
                    }`}
                  >
                    <span className="text-xs font-bold uppercase tracking-wide text-slate-600 truncate">
                      {cat.name}
                    </span>
                    <p className="font-hand text-xl font-bold text-slate-900 my-1">
                      {simulatedSpent} / {cat.allocated}
                    </p>
                    <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        style={{
                          width: `${Math.min(100, (simulatedSpent / (cat.allocated || 1)) * 100)}%`
                        }}
                        className={`h-full ${isOver ? 'bg-red-500' : 'bg-orange-400'}`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Sidebar: Reminders Board (Directly from Wireframe 4 "Reminders") */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-amber-50 rounded-3xl border-3 border-slate-900 p-6 shadow-[6px_6px_0px_#0f172a] space-y-5">
            <div className="flex items-center justify-between pb-3 border-b-2 border-slate-200">
              <div className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-orange-600" />
                <h2 className="font-hand text-3xl font-extrabold text-slate-900">
                  Reminders
                </h2>
              </div>
              <button
                onClick={() => setShowAddReminderModal(true)}
                className="p-1 rounded-xl bg-white border border-slate-900 shadow-[2px_2px_0px_#0f172a] hover:bg-slate-50 cursor-pointer"
                title="Add Reminder"
              >
                <Plus className="w-4 h-4 text-slate-900" />
              </button>
            </div>

            <p className="text-xs font-semibold text-slate-600">
              High-priority commitments act as financial safety walls. Discretionary spending will be blocked if these goals are jeopardized.
            </p>

            <ul className="space-y-3">
              {reminders.map((rem) => (
                <li
                  key={rem.id}
                  className="bg-white rounded-2xl border-2 border-slate-900 p-4 shadow-[3px_3px_0px_#0f172a] flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-3.5 h-3.5 rounded-full border border-slate-900 ${
                        rem.priority === 'high'
                          ? 'bg-rose-500'
                          : rem.priority === 'medium'
                          ? 'bg-amber-400'
                          : 'bg-emerald-400'
                      }`}
                    />
                    <div>
                      <h4 className="font-hand text-xl font-black text-slate-900 leading-none">
                        {rem.title}
                      </h4>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        {rem.priority} priority
                      </span>
                    </div>
                  </div>

                  <span className="font-mono text-sm font-bold text-slate-800">
                    ₹{rem.targetAmount.toLocaleString()}
                  </span>
                </li>
              ))}
            </ul>

            <div className="pt-4 border-t-2 border-slate-200 flex items-center justify-between text-xs font-bold text-slate-700">
              <span>Total committed funds:</span>
              <span>₹{reminders.reduce((acc, r) => acc + r.targetAmount, 0).toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Add Reminder Modal */}
      {showAddReminderModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <form
            onSubmit={handleCreateReminder}
            className="bg-white rounded-3xl border-4 border-slate-900 max-w-md w-full p-6 shadow-[8px_8px_0px_#0f172a] space-y-5 animate-in fade-in zoom-in-95 duration-150"
          >
            <h3 className="font-hand text-2xl font-black text-slate-900">
              Add Financial Goal / Commitment
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Commitment Title
                </label>
                <input
                  type="text"
                  placeholder="e.g. Rent, Course Fee, Save for shoes"
                  value={newReminderTitle}
                  onChange={(e) => setNewReminderTitle(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 rounded-xl border-2 border-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500 font-semibold text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Required Amount (₹)
                </label>
                <input
                  type="number"
                  placeholder="1000"
                  value={newReminderAmount}
                  onChange={(e) => setNewReminderAmount(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 rounded-xl border-2 border-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500 font-semibold text-slate-900"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3">
              <button
                type="button"
                onClick={() => setShowAddReminderModal(false)}
                className="px-4 py-2 rounded-xl border-2 border-slate-400 font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold border-2 border-slate-900 shadow-[2px_2px_0px_#0f172a] cursor-pointer"
              >
                Save Reminder
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
