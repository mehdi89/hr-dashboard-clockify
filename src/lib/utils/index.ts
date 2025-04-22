import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { format, parseISO } from 'date-fns';

// Utility for combining Tailwind CSS classes
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Format a date string to a readable format
export function formatDate(dateString: string | Date, formatString: string = 'PPP') {
  if (!dateString) return '';
  const date = typeof dateString === 'string' ? parseISO(dateString) : dateString;
  return format(date, formatString);
}

// Convert time string to hours
export function timeToHours(timeString: string): number {
  const [hours, minutes] = timeString.split(':').map(Number);
  return hours + minutes / 60;
}

// Convert hours to time string
export function hoursToTime(hours: number): string {
  const wholeHours = Math.floor(hours);
  const minutes = Math.round((hours - wholeHours) * 60);
  return `${wholeHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
}