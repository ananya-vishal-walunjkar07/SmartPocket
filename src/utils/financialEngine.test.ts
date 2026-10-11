import { describe, it, expect } from 'vitest';
import { analyzePurchase } from './financialEngine';
import { INITIAL_CATEGORIES, INITIAL_REMINDERS } from '../mockData';

describe('Financial Engine Purchase Analysis', () => {
  const currentBalance = 8000;

  it('generates HURRA! for affordable within-budget purchases', () => {
    // Shopping has 200 spent / 1000 allocated. Adding 300 = 500/1000. Balance = 7700. All safe.
    const result = analyzePurchase(
      300,
      'Books',
      'shopping',
      INITIAL_CATEGORIES,
      currentBalance,
      INITIAL_REMINDERS
    );

    expect(result.verdict).toBe('HURRA');
    expect(result.canAfford).toBe(true);
    expect(result.newBalance).toBe(7700);
    expect(result.categoryNewSpent).toBe(500);
  });

  it('generates YIKES! when purchase exceeds category limit or compromises savings', () => {
    // Shopping has 200 spent / 1000 allocated. Adding 900 = 1100/1000 (exceeds 1000)
    const result = analyzePurchase(
      900,
      'Designer Jacket',
      'shopping',
      INITIAL_CATEGORIES,
      currentBalance,
      INITIAL_REMINDERS
    );

    expect(result.verdict).toBe('YIKES');
    expect(result.canAfford).toBe(true);
    expect(result.categoryExceeded).toBe(true);
    expect(result.message).toContain('compromised');
  });

  it('generates BEWARE! when purchase exceeds total balance', () => {
    const result = analyzePurchase(
      10000,
      'Luxury Watch',
      'shopping',
      INITIAL_CATEGORIES,
      currentBalance,
      INITIAL_REMINDERS
    );

    expect(result.verdict).toBe('BEWARE');
    expect(result.canAfford).toBe(false);
  });

  it('generates BEWARE! when remaining balance compromises essential Mess advance (1k safety reserve)', () => {
    // Balance 8000. High priority reminders total = 1000. If we spend 7200, remaining balance = 800 < 1000.
    const result = analyzePurchase(
      7200,
      'Expensive Gadget',
      'shopping',
      INITIAL_CATEGORIES,
      currentBalance,
      INITIAL_REMINDERS
    );

    expect(result.verdict).toBe('BEWARE');
    expect(result.canAfford).toBe(false);
    expect(result.message).toContain('advance mess');
  });
});
