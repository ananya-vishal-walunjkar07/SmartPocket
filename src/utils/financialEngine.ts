import { Category, Reminder, PurchaseAnalysisResult } from './types';

/**
 * Calculates purchase impact and renders verdicts accurately:
 *
 * 1. BEWARE!
 *    Triggered when:
 *    - Purchase exceeds available balance, OR
 *    - Remaining balance falls below critical safety floor (Mess advance + Extreme Emergency reserve),
 *      compromising essential commitments (e.g. wireframe: "you will not be able to pay advance mess. Come back to this a little later").
 *
 * 2. YIKES!
 *    Triggered when:
 *    - Balance is technically sufficient, BUT:
 *    - The specific category budget is exceeded, OR
 *    - Planned savings goals / reminders (e.g. "Save for shoes", "Party next week") are jeopardized.
 *      (wireframe: "Running a lil tight on budget. Saving for shoes will be compromised. Proceed to payment? [YES] [NO]").
 *
 * 3. HURRA!
 *    Triggered when:
 *    - Affordable within category budget,
 *    - Safe buffer remains,
 *    - Reminders and emergency safety nets remain 100% intact.
 *      (wireframe: "you hv just the amount to make this purchase. Proceed to payment? [YES] [NO]").
 */
export function analyzePurchase(
  amount: number,
  itemName: string,
  categoryId: string,
  categories: Category[],
  currentBalance: number,
  reminders: Reminder[]
): PurchaseAnalysisResult {
  const category = categories.find((c) => c.id === categoryId) || categories[0];
  const newBalance = currentBalance - amount;
  const newCategorySpent = category.spent + amount;
  const isCategoryOver = newCategorySpent > category.allocated;

  // Essential safety floor:
  // e.g. Mess advance reminder / emergency reserve
  const highPriorityReminders = reminders.filter((r) => r.priority === 'high');
  const highPriorityTotal = highPriorityReminders.reduce((sum, r) => sum + r.targetAmount, 0);

  // Reminders that might be compromised:
  // If the new balance is less than total savings goals
  const mediumReminders = reminders.filter((r) => r.priority !== 'high');
  const allRemindersTotal = reminders.reduce((sum, r) => sum + r.targetAmount, 0);

  const compromisedReminders: string[] = [];

  // Critical Failure check
  if (amount > currentBalance) {
    return {
      amount,
      itemName: itemName || 'This item',
      categoryId: category.id,
      categoryName: category.name,
      verdict: 'BEWARE',
      headline: 'BEWARE!',
      message: `You do not have enough balance (₹${currentBalance.toLocaleString()}) for this purchase of ₹${amount.toLocaleString()}. Come back to this later.`,
      currentBalance,
      newBalance,
      categoryCurrentSpent: category.spent,
      categoryNewSpent: newCategorySpent,
      categoryAllocated: category.allocated,
      categoryExceeded: true,
      canAfford: false,
      compromisedReminders: reminders.map((r) => r.title)
    };
  }

  // Check if high-priority vital needs (like Mess advance 1k) would be broken
  if (newBalance < highPriorityTotal) {
    const criticalName = highPriorityReminders[0]?.title.toLowerCase().includes('mess')
      ? 'advance mess'
      : highPriorityReminders[0]?.title || 'advance mess';
    return {
      amount,
      itemName: itemName || 'This item',
      categoryId: category.id,
      categoryName: category.name,
      verdict: 'BEWARE',
      headline: 'BEWARE!',
      message: `You will not be able to pay ${criticalName}. Come back to this a little later.`,
      currentBalance,
      newBalance,
      categoryCurrentSpent: category.spent,
      categoryNewSpent: newCategorySpent,
      categoryAllocated: category.allocated,
      categoryExceeded: isCategoryOver,
      canAfford: false,
      compromisedReminders: highPriorityReminders.map((r) => r.title)
    };
  }

  // Check if category limit is broken OR planned savings goals are compromised
  if (isCategoryOver || newBalance < allRemindersTotal) {
    const impacted = reminders.find((r) => r.priority === 'medium')?.title || 'Saving for shoes';
    compromisedReminders.push(impacted);

    return {
      amount,
      itemName: itemName || 'This item',
      categoryId: category.id,
      categoryName: category.name,
      verdict: 'YIKES',
      headline: 'YIKES!',
      message: isCategoryOver
        ? `Running a lil tight on budget. Exceeds ${category.name} limit by ₹${(newCategorySpent - category.allocated).toLocaleString()}. ${impacted} will be compromised.`
        : `Running a lil tight on budget. ${impacted} will be compromised. Proceed with caution?`,
      currentBalance,
      newBalance,
      categoryCurrentSpent: category.spent,
      categoryNewSpent: newCategorySpent,
      categoryAllocated: category.allocated,
      categoryExceeded: isCategoryOver,
      canAfford: true,
      compromisedReminders
    };
  }

  // Safe to purchase
  return {
    amount,
    itemName: itemName || 'This item',
    categoryId: category.id,
    categoryName: category.name,
    verdict: 'HURRA',
    headline: 'HURRA!',
    message: 'You have just the right amount to make this purchase without jeopardizing your goals! Proceed to payment?',
    currentBalance,
    newBalance,
    categoryCurrentSpent: category.spent,
    categoryNewSpent: newCategorySpent,
    categoryAllocated: category.allocated,
    categoryExceeded: false,
    canAfford: true,
    compromisedReminders: []
  };
}
