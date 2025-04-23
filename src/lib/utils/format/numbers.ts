/**
 * Format a number as hours and minutes
 * @param hours - The number of hours to format
 * @returns Formatted hours and minutes string (e.g., "2h 30m")
 */
export function formatHoursToHM(hours: number): string {
  if (hours === 0) return "0h";
  
  const wholeHours = Math.floor(hours);
  const minutes = Math.round((hours - wholeHours) * 60);
  
  if (minutes === 0) return `${wholeHours}h`;
  if (wholeHours === 0) return `${minutes}m`;
  
  return `${wholeHours}h ${minutes}m`;
}

/**
 * Convert time string to hours
 * @param timeString - Time string in format "HH:MM"
 * @returns Number of hours
 */
export function timeToHours(timeString: string): number {
  if (!timeString) return 0;
  
  const [hours, minutes] = timeString.split(':').map(Number);
  return hours + minutes / 60;
}

/**
 * Convert hours to time string
 * @param hours - Number of hours
 * @returns Time string in format "HH:MM"
 */
export function hoursToTime(hours: number): string {
  const wholeHours = Math.floor(hours);
  const minutes = Math.round((hours - wholeHours) * 60);
  return `${wholeHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
}

/**
 * Format a number as a percentage
 * @param value - The value to format as a percentage
 * @param decimalPlaces - Number of decimal places to include
 * @returns Formatted percentage string
 */
export function formatPercentage(value: number, decimalPlaces: number = 1): string {
  return `${(value * 100).toFixed(decimalPlaces)}%`;
}

/**
 * Format a number with commas as thousands separators
 * @param value - The number to format
 * @returns Formatted number string with commas
 */
export function formatNumberWithCommas(value: number): string {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/**
 * Format a number to a fixed number of decimal places
 * @param value - The number to format
 * @param decimalPlaces - Number of decimal places to include
 * @returns Formatted number string
 */
export function formatDecimal(value: number, decimalPlaces: number = 2): string {
  return value.toFixed(decimalPlaces);
}

/**
 * Format a number as currency
 * @param value - The value to format as currency
 * @param currency - The currency code (default: 'USD')
 * @param locale - The locale to use for formatting (default: 'en-US')
 * @returns Formatted currency string
 */
export function formatCurrency(value: number, currency: string = 'USD', locale: string = 'en-US'): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency
  }).format(value);
}
