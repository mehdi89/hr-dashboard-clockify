import { 
  startOfWeek, 
  endOfWeek, 
  startOfMonth, 
  endOfMonth, 
  startOfYear, 
  endOfYear, 
  addDays, 
  addMonths, 
  subDays, 
  subMonths, 
  subWeeks,
  isWeekend,
  differenceInDays,
  differenceInBusinessDays,
  eachDayOfInterval,
  isSameDay
} from 'date-fns';

export interface DateRange {
  from: Date;
  to: Date;
}

/**
 * Get the date range for the current week
 * @param date - The reference date (defaults to today)
 * @param weekStartsOn - The day the week starts on (0 = Sunday, 1 = Monday, etc.)
 * @returns Date range for the current week
 */
export function getCurrentWeekRange(date: Date = new Date(), weekStartsOn: 0 | 1 | 2 | 3 | 4 | 5 | 6 = 1): DateRange {
  return {
    from: startOfWeek(date, { weekStartsOn }),
    to: endOfWeek(date, { weekStartsOn })
  };
}

/**
 * Get the date range for the previous week
 * @param date - The reference date (defaults to today)
 * @param weekStartsOn - The day the week starts on (0 = Sunday, 1 = Monday, etc.)
 * @returns Date range for the previous week
 */
export function getPreviousWeekRange(date: Date = new Date(), weekStartsOn: 0 | 1 | 2 | 3 | 4 | 5 | 6 = 1): DateRange {
  const lastWeekDate = subWeeks(date, 1);
  return getCurrentWeekRange(lastWeekDate, weekStartsOn);
}

/**
 * Get the date range for the current month
 * @param date - The reference date (defaults to today)
 * @returns Date range for the current month
 */
export function getCurrentMonthRange(date: Date = new Date()): DateRange {
  return {
    from: startOfMonth(date),
    to: endOfMonth(date)
  };
}

/**
 * Get the date range for the previous month
 * @param date - The reference date (defaults to today)
 * @returns Date range for the previous month
 */
export function getPreviousMonthRange(date: Date = new Date()): DateRange {
  const lastMonth = subMonths(date, 1);
  return getCurrentMonthRange(lastMonth);
}

/**
 * Get the date range for the current year
 * @param date - The reference date (defaults to today)
 * @returns Date range for the current year
 */
export function getCurrentYearRange(date: Date = new Date()): DateRange {
  return {
    from: startOfYear(date),
    to: endOfYear(date)
  };
}

/**
 * Get the date range for a custom number of days
 * @param days - Number of days to include in the range
 * @param endDate - The end date of the range (defaults to today)
 * @returns Date range for the specified number of days
 */
export function getLastNDaysRange(days: number, endDate: Date = new Date()): DateRange {
  return {
    from: subDays(endDate, days - 1), // -1 because we include the end date
    to: endDate
  };
}

/**
 * Count the number of business days in a date range
 * @param dateRange - The date range to count business days in
 * @returns Number of business days in the range
 */
export function countBusinessDays(dateRange: DateRange): number {
  return differenceInBusinessDays(dateRange.to, dateRange.from) + 1; // +1 to include the end date
}

/**
 * Count the number of weekend days in a date range
 * @param dateRange - The date range to count weekend days in
 * @returns Number of weekend days in the range
 */
export function countWeekendDays(dateRange: DateRange): number {
  const totalDays = differenceInDays(dateRange.to, dateRange.from) + 1; // +1 to include the end date
  const businessDays = countBusinessDays(dateRange);
  return totalDays - businessDays;
}

/**
 * Get an array of all dates in a date range
 * @param dateRange - The date range to get dates for
 * @returns Array of dates in the range
 */
export function getDatesInRange(dateRange: DateRange): Date[] {
  return eachDayOfInterval({
    start: dateRange.from,
    end: dateRange.to
  });
}

/**
 * Check if a date is within a date range
 * @param date - The date to check
 * @param dateRange - The date range to check against
 * @returns True if the date is within the range, false otherwise
 */
export function isDateInRange(date: Date, dateRange: DateRange): boolean {
  return date >= dateRange.from && date <= dateRange.to;
}

/**
 * Check if a date is today
 * @param date - The date to check
 * @returns True if the date is today, false otherwise
 */
export function isToday(date: Date): boolean {
  return isSameDay(date, new Date());
}
