/**
 * Check if a string is a valid email address
 * @param email - The email address to validate
 * @returns True if the email is valid, false otherwise
 */
export function isValidEmail(email: string): boolean {
  if (!email) return false;
  
  // RFC 5322 compliant email regex
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegex.test(email);
}

/**
 * Check if a string is empty or only contains whitespace
 * @param str - The string to check
 * @returns True if the string is empty or only contains whitespace, false otherwise
 */
export function isEmpty(str: string | null | undefined): boolean {
  return !str || str.trim() === '';
}

/**
 * Check if a number is within a specified range
 * @param value - The number to check
 * @param min - The minimum allowed value
 * @param max - The maximum allowed value
 * @returns True if the number is within the range, false otherwise
 */
export function isInRange(value: number, min: number, max: number): boolean {
  return value >= min && value <= max;
}

/**
 * Check if a string is a valid URL
 * @param url - The URL to validate
 * @returns True if the URL is valid, false otherwise
 */
export function isValidUrl(url: string): boolean {
  if (!url) return false;
  
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * Check if a string contains only alphanumeric characters
 * @param str - The string to check
 * @returns True if the string contains only alphanumeric characters, false otherwise
 */
export function isAlphanumeric(str: string): boolean {
  if (!str) return false;
  
  return /^[a-zA-Z0-9]+$/.test(str);
}

/**
 * Check if a date is in the future
 * @param date - The date to check
 * @returns True if the date is in the future, false otherwise
 */
export function isFutureDate(date: Date): boolean {
  return date > new Date();
}

/**
 * Check if a date is in the past
 * @param date - The date to check
 * @returns True if the date is in the past, false otherwise
 */
export function isPastDate(date: Date): boolean {
  return date < new Date();
}

/**
 * Check if a string matches a specific pattern
 * @param str - The string to check
 * @param pattern - The regex pattern to match against
 * @returns True if the string matches the pattern, false otherwise
 */
export function matchesPattern(str: string, pattern: RegExp): boolean {
  if (!str) return false;
  
  return pattern.test(str);
}

/**
 * Validate a form field and return an error message if invalid
 * @param value - The value to validate
 * @param validators - Array of validator functions to apply
 * @returns Error message if validation fails, empty string if valid
 */
export function validateField(
  value: any, 
  validators: Array<{
    validate: (value: any) => boolean;
    errorMessage: string;
  }>
): string {
  for (const validator of validators) {
    if (!validator.validate(value)) {
      return validator.errorMessage;
    }
  }
  
  return '';
}
