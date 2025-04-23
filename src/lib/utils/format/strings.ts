/**
 * Truncate a string to a maximum length and add an ellipsis if truncated
 * @param str - The string to truncate
 * @param maxLength - Maximum length of the string
 * @returns Truncated string with ellipsis if needed
 */
export function truncateString(str: string, maxLength: number): string {
  if (!str) return '';
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength) + '...';
}

/**
 * Capitalize the first letter of a string
 * @param str - The string to capitalize
 * @returns String with first letter capitalized
 */
export function capitalizeFirstLetter(str: string): string {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Convert a string to title case (capitalize first letter of each word)
 * @param str - The string to convert to title case
 * @returns String in title case
 */
export function toTitleCase(str: string): string {
  if (!str) return '';
  return str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Convert a camelCase string to a human-readable format
 * @param str - The camelCase string to convert
 * @returns Human-readable string
 */
export function camelCaseToHuman(str: string): string {
  if (!str) return '';
  const result = str
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, match => match.toUpperCase());
  return result;
}

/**
 * Convert a kebab-case string to a human-readable format
 * @param str - The kebab-case string to convert
 * @returns Human-readable string
 */
export function kebabCaseToHuman(str: string): string {
  if (!str) return '';
  return str
    .split('-')
    .map(word => capitalizeFirstLetter(word))
    .join(' ');
}

/**
 * Convert a snake_case string to a human-readable format
 * @param str - The snake_case string to convert
 * @returns Human-readable string
 */
export function snakeCaseToHuman(str: string): string {
  if (!str) return '';
  return str
    .split('_')
    .map(word => capitalizeFirstLetter(word))
    .join(' ');
}

/**
 * Pluralize a word based on a count
 * @param singular - The singular form of the word
 * @param plural - The plural form of the word
 * @param count - The count to determine pluralization
 * @returns Pluralized word based on count
 */
export function pluralize(singular: string, plural: string, count: number): string {
  return count === 1 ? singular : plural;
}

/**
 * Format a list of items as a comma-separated string with "and" before the last item
 * @param items - Array of items to format
 * @returns Formatted string
 */
export function formatList(items: string[]): string {
  if (!items || items.length === 0) return '';
  if (items.length === 1) return items[0];
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  
  const lastItem = items[items.length - 1];
  const otherItems = items.slice(0, -1);
  return `${otherItems.join(', ')}, and ${lastItem}`;
}
