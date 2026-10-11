import { Category, Reminder, SpendingDay, WalletDesign } from './types';

// Default initial categories exactly mirroring user's wireframe
// Total income: 10,000, Total current balance: 8,000 (spent: 2,000)
// Categories in wireframe:
// Commute: 233 spent / 1000
// Health: 0 spent / 200
// Shopping: 200 spent / 1000
// Emergency: 1000 allocated (0 spent / 1000)
// Savings: 500 / 500
// Extreme emergency: 500 / 500
// Gym: 0 / 700
// Mess: 450 / 3000
// Skincare & other necessities: 100 / 700
export const INITIAL_CATEGORIES: Category[] = [
  { id: 'commute', name: 'Commute', allocated: 1000, spent: 233, color: '#38bdf8' },
  { id: 'health', name: 'Health', allocated: 200, spent: 0, color: '#4ade80' },
  { id: 'shopping', name: 'Shopping', allocated: 1000, spent: 200, color: '#f472b6' },
  { id: 'emergency', name: 'Emergency', allocated: 1000, spent: 0, color: '#f87171', isLocked: true },
  { id: 'savings', name: 'Savings', allocated: 500, spent: 500, color: '#a78bfa', isLocked: true },
  { id: 'extreme-emergency', name: 'Extreme emergency', allocated: 500, spent: 500, color: '#fb7185', isLocked: true },
  { id: 'gym', name: 'Gym', allocated: 700, spent: 0, color: '#fbbf24' },
  { id: 'mess', name: 'Mess', allocated: 3000, spent: 450, color: '#fb923c', isLocked: true },
  { id: 'skincare', name: 'Skincare & other necessities', allocated: 700, spent: 100, color: '#c084fc' }
];

export const INITIAL_INCOME = 10000;

// Reminders exactly from wireframe:
// - Save for shoes
// - Party next week
// - Pay mess advance 1k
export const INITIAL_REMINDERS: Reminder[] = [
  { id: 'rem-1', title: 'Save for shoes', targetAmount: 1500, priority: 'medium' },
  { id: 'rem-2', title: 'Party next week', targetAmount: 800, priority: 'low' },
  { id: 'rem-3', title: 'Pay mess advance', targetAmount: 1000, priority: 'high' }
];

// Last week at a glance (7 days of October from wireframe)
export const INITIAL_WEEKLY_SPENDING: SpendingDay[] = [
  { day: '1st Oct', dateStr: 'Oct 01', amount: 150 },
  { day: '2nd Oct', dateStr: 'Oct 02', amount: 480 },
  { day: '3rd Oct', dateStr: 'Oct 03', amount: 920 },
  { day: '4th Oct', dateStr: 'Oct 04', amount: 210 },
  { day: '5th Oct', dateStr: 'Oct 05', amount: 640 },
  { day: '6th Oct', dateStr: 'Oct 06', amount: 350 },
  { day: '7th Oct', dateStr: 'Oct 07', amount: 120 }
];

// All cropped customized wallet assets
export const WALLET_DESIGNS: WalletDesign[] = [
  {
    id: 'lucky-duck',
    name: 'Luck Duck Minimalist',
    description: 'Crisp black leather with cute duck emblem - Keep your luck and coins intact',
    image: '/assets/wallets/lucky-duck.jpg',
    tag: 'Popular',
    colorScheme: 'from-amber-100 to-yellow-200'
  },
  {
    id: 'starry-night',
    name: 'Starry Night Expression',
    description: 'Van Gogh inspired artistic swirl wallet for dreamers and creators',
    image: '/assets/wallets/starry-night.jpg',
    tag: 'Artistic',
    colorScheme: 'from-blue-200 to-indigo-300'
  },
  {
    id: 'shark-bite',
    name: 'Kawaii Shark Pouch',
    description: 'Playful pastel shark opening wide to safeguard your allowances',
    image: '/assets/wallets/shark-bite.jpg',
    tag: 'Cute',
    colorScheme: 'from-sky-200 to-cyan-300'
  },
  {
    id: 'origami-fox',
    name: 'Geometric Fox Fold',
    description: 'Fox face geometric contour with wrap-around button tail',
    image: '/assets/wallets/origami-fox.jpg',
    tag: 'Handcrafted',
    colorScheme: 'from-orange-200 to-amber-300'
  },
  {
    id: 'koi-harmony',
    name: 'Twin Koi Fish Yin-Yang',
    description: 'Vibrant painted twin koi symbolizing wealth flow and fortune',
    image: '/assets/wallets/koi-harmony.jpg',
    tag: 'Prosperity',
    colorScheme: 'from-emerald-200 to-teal-300'
  },
  {
    id: 'queen-spades',
    name: 'Ace & Spade Pocket',
    description: 'High roller cream and gold zip pouch with card motif',
    image: '/assets/wallets/queen-spades.jpg',
    tag: 'Premium',
    colorScheme: 'from-slate-200 to-stone-300'
  },
  {
    id: 'dragon-warrior',
    name: 'Dragon Warrior Martial',
    description: 'High kick martial panda wallet with resilient canvas stitch',
    image: '/assets/wallets/dragon-warrior.jpg',
    tag: 'Bold',
    colorScheme: 'from-zinc-200 to-neutral-400'
  },
  {
    id: 'tom-and-jerry',
    name: 'Tom & Jerry Chase',
    description: 'Hilarious luxury cartoon cardholder featuring the timeless duo',
    image: '/assets/wallets/tom-and-jerry.jpg',
    tag: 'Fun',
    colorScheme: 'from-rose-200 to-orange-200'
  },
  {
    id: 'saturn-rings',
    name: 'Cosmic Saturn Orbit',
    description: 'Deep celestial ring print on distressed terracotta leather',
    image: '/assets/wallets/saturn-rings.jpg',
    tag: 'Space',
    colorScheme: 'from-amber-300 to-orange-400'
  },
  {
    id: 'spider-web',
    name: 'Scarlet Web Weaver',
    description: 'Intricate spiderweb burnished edge wallet with dual-tone dye',
    image: '/assets/wallets/spider-web.jpg',
    tag: 'Hero',
    colorScheme: 'from-red-300 to-rose-400'
  },
  {
    id: 'frog-prince',
    name: 'Royal Frog Prince Clasp',
    description: 'Vintage brass frame velvet mouth pouch crowned with royalty',
    image: '/assets/wallets/frog-prince.jpg',
    tag: 'Vintage',
    colorScheme: 'from-lime-200 to-green-300'
  },
  {
    id: 'dark-knight',
    name: 'Dark Knight Cowl Emboss',
    description: 'Stealth black textured mask leather for disciplined budgets',
    image: '/assets/wallets/dark-knight.jpg',
    tag: 'Tactical',
    colorScheme: 'from-gray-300 to-slate-400'
  },
  {
    id: 'stained-glass',
    name: 'Lighthouse Stained Glass',
    description: 'Sunlit ocean waves and beacon in artisan hand-carved leather',
    image: '/assets/wallets/stained-glass.jpg',
    tag: 'Collector',
    colorScheme: 'from-amber-200 to-cyan-300'
  },
  {
    id: 'blue-butterfly',
    name: 'Celestial Blue Butterfly',
    description: 'Deep navy tooled leather featuring radiant winged symmetry',
    image: '/assets/wallets/blue-butterfly.jpg',
    tag: 'Grace',
    colorScheme: 'from-blue-200 to-cyan-400'
  },
  {
    id: 'cat-trio',
    name: 'Whimsical Triple Kittens',
    description: 'Three sitting kittens with pastel zipper pouch pull tab',
    image: '/assets/wallets/cat-trio.jpg',
    tag: 'Adorable',
    colorScheme: 'from-stone-200 to-emerald-200'
  },
  {
    id: 'floral-bloom',
    name: 'Wildflower Embroidered Pink',
    description: 'Hand-threaded botanicals on gentle blush pink tri-fold',
    image: '/assets/wallets/floral-bloom.jpg',
    tag: 'Nature',
    colorScheme: 'from-pink-200 to-rose-300'
  }
];
