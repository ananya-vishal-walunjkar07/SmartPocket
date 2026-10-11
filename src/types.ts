export interface Category {
  id: string;
  name: string;
  allocated: number;
  spent: number;
  iconName?: string;
  color?: string;
  isLocked?: boolean; // Essential categories like Mess / Emergency
}

export interface Reminder {
  id: string;
  title: string;
  targetAmount: number;
  dueDate?: string;
  priority: 'high' | 'medium' | 'low';
}

export interface SpendingDay {
  day: string;
  dateStr: string;
  amount: number;
}

export interface WalletDesign {
  id: string;
  name: string;
  description: string;
  image: string;
  tag: string;
  colorScheme: string;
}

export interface PurchaseAnalysisResult {
  amount: number;
  itemName: string;
  categoryId: string;
  verdict: 'HURRA' | 'YIKES' | 'BEWARE';
  headline: string;
  message: string;
  currentBalance: number;
  newBalance: number;
  categoryName: string;
  categoryCurrentSpent: number;
  categoryNewSpent: number;
  categoryAllocated: number;
  categoryExceeded: boolean;
  canAfford: boolean;
  compromisedReminders: string[];
}
