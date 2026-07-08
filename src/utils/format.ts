export function formatCurrency(amount: number): string {
  return `$${amount.toLocaleString('en-US')}`;
}

export function formatCount(amount: number, unit: 'count' | 'hours'): string {
  const rounded = amount.toLocaleString('en-US');
  return unit === 'hours' ? `${rounded} hrs` : rounded;
}

export function formatGoalValue(amount: number, unit: 'currency' | 'count' | 'hours'): string {
  return unit === 'currency' ? formatCurrency(amount) : formatCount(amount, unit);
}

export function formatRelativeDate(isoDate: string): string {
  const posted = new Date(isoDate).getTime();
  const now = new Date('2026-07-08').getTime();
  const diffMs = now - posted;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays <= 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays}d ago`;
  const diffWeeks = Math.floor(diffDays / 7);
  if (diffWeeks < 5) return `${diffWeeks}w ago`;
  const diffMonths = Math.floor(diffDays / 30);
  return `${diffMonths}mo ago`;
}

export function clampProgress(current: number, target: number): number {
  if (target <= 0) return 0;
  return Math.min(1, Math.max(0, current / target));
}
