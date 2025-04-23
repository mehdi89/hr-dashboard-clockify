import { format, parseISO } from 'date-fns';

/**
 * Format a date string to a readable format
 * @param dateString - The date string or Date object to format
 * @param formatString - The format string to use (default: 'PPP')
 * @returns Formatted date string
 */
export function formatDate(dateString: string | Date, formatString: string = 'PPP'): string {
  if (!dateString) return '';
  const date = typeof dateString === 'string' ? parseISO(dateString) : dateString;
  return format(date, formatString);
}

/**
 * Format a date to MM/DD/YYYY format
 * @param date - The date to format
 * @returns Formatted date string in MM/DD/YYYY format
 */
export function formatDateMDY(date: Date | string): string {
  return formatDate(date, 'MM/dd/yyyy');
}

/**
 * Format a date to YYYY-MM-DD format (ISO date)
 * @param date - The date to format
 * @returns Formatted date string in YYYY-MM-DD format
 */
export function formatISODate(date: Date): string {
  return format(date, 'yyyy-MM-dd');
}

/**
 * Format a time to HH:MM format
 * @param date - The date to extract time from
 * @returns Formatted time string in HH:MM format
 */
export function formatTime(date: Date | string): string {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return format(dateObj, 'HH:mm');
}

/**
 * Format a date and time to a readable format
 * @param date - The date to format
 * @param includeSeconds - Whether to include seconds in the time
 * @returns Formatted date and time string
 */
export function formatDateTime(date: Date | string, includeSeconds: boolean = false): string {
  const formatStr = includeSeconds ? 'MM/dd/yyyy HH:mm:ss' : 'MM/dd/yyyy HH:mm';
  return formatDate(date, formatStr);
}
