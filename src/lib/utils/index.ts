import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Re-export utility functions from all modules
export * from './date';
export * from './format';
export * from './storage';
export * from './validation';

/**
 * Utility for combining Tailwind CSS classes
 * @param inputs - Class values to combine
 * @returns Combined class string
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
