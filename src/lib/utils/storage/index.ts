"use client";

/**
 * Type-safe wrapper for localStorage.getItem
 * @param key - The key to retrieve from localStorage
 * @param defaultValue - Default value to return if key doesn't exist
 * @returns The stored value or defaultValue if not found
 */
export function getStorageItem<T>(key: string, defaultValue: T): T {
  if (typeof window === 'undefined') {
    return defaultValue;
  }
  
  try {
    const item = localStorage.getItem(key);
    if (item === null) {
      return defaultValue;
    }
    return JSON.parse(item) as T;
  } catch (error) {
    console.error(`Error retrieving ${key} from localStorage:`, error);
    return defaultValue;
  }
}

/**
 * Type-safe wrapper for localStorage.setItem
 * @param key - The key to store in localStorage
 * @param value - The value to store
 */
export function setStorageItem<T>(key: string, value: T): void {
  if (typeof window === 'undefined') {
    return;
  }
  
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error storing ${key} in localStorage:`, error);
  }
}

/**
 * Remove an item from localStorage
 * @param key - The key to remove from localStorage
 */
export function removeStorageItem(key: string): void {
  if (typeof window === 'undefined') {
    return;
  }
  
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing ${key} from localStorage:`, error);
  }
}

/**
 * Clear all items from localStorage
 */
export function clearStorage(): void {
  if (typeof window === 'undefined') {
    return;
  }
  
  try {
    localStorage.clear();
  } catch (error) {
    console.error('Error clearing localStorage:', error);
  }
}

/**
 * Check if a key exists in localStorage
 * @param key - The key to check in localStorage
 * @returns True if the key exists, false otherwise
 */
export function hasStorageItem(key: string): boolean {
  if (typeof window === 'undefined') {
    return false;
  }
  
  try {
    return localStorage.getItem(key) !== null;
  } catch (error) {
    console.error(`Error checking ${key} in localStorage:`, error);
    return false;
  }
}

/**
 * Get all keys from localStorage
 * @returns Array of all keys in localStorage
 */
export function getStorageKeys(): string[] {
  if (typeof window === 'undefined') {
    return [];
  }
  
  try {
    return Object.keys(localStorage);
  } catch (error) {
    console.error('Error getting localStorage keys:', error);
    return [];
  }
}
