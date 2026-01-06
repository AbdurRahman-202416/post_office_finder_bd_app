import AsyncStorage from "@react-native-async-storage/async-storage";
import type { CachedSearchResult, ProfileData } from "../types/api";

/**
 * Storage service for managing AsyncStorage operations
 * Provides type-safe storage operations with error handling
 */

const STORAGE_KEYS = {
  PROFILE_DATA: "profileData",
  SEARCH_CACHE: "searchCache",
  USER_PREFERENCES: "userPreferences",
} as const;

// Cache expiration time (24 hours)
const CACHE_EXPIRATION_MS = 24 * 60 * 60 * 1000;

/**
 * Profile Data Operations
 */
export const ProfileStorage = {
  async get(): Promise<ProfileData | null> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.PROFILE_DATA);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error("Error loading profile data:", error);
      return null;
    }
  },

  async save(profileData: ProfileData): Promise<boolean> {
    try {
      await AsyncStorage.setItem(
        STORAGE_KEYS.PROFILE_DATA,
        JSON.stringify(profileData)
      );
      return true;
    } catch (error) {
      console.error("Error saving profile data:", error);
      return false;
    }
  },

  async clear(): Promise<void> {
    try {
      await AsyncStorage.removeItem(STORAGE_KEYS.PROFILE_DATA);
    } catch (error) {
      console.error("Error clearing profile data:", error);
    }
  },
};

/**
 * Search Cache Operations
 */
export const SearchCache = {
  async get(postalCode: string): Promise<CachedSearchResult | null> {
    try {
      const cacheKey = `${STORAGE_KEYS.SEARCH_CACHE}_${postalCode}`;
      const data = await AsyncStorage.getItem(cacheKey);
      
      if (!data) return null;

      const cached: CachedSearchResult = JSON.parse(data);
      
      // Check if cache is expired
      const isExpired = Date.now() - cached.timestamp > CACHE_EXPIRATION_MS;
      if (isExpired) {
        await this.remove(postalCode);
        return null;
      }

      return cached;
    } catch (error) {
      console.error("Error loading cached search:", error);
      return null;
    }
  },

  async save(result: CachedSearchResult): Promise<boolean> {
    try {
      const cacheKey = `${STORAGE_KEYS.SEARCH_CACHE}_${result.postalCode}`;
      await AsyncStorage.setItem(cacheKey, JSON.stringify(result));
      return true;
    } catch (error) {
      console.error("Error saving search cache:", error);
      return false;
    }
  },

  async remove(postalCode: string): Promise<void> {
    try {
      const cacheKey = `${STORAGE_KEYS.SEARCH_CACHE}_${postalCode}`;
      await AsyncStorage.removeItem(cacheKey);
    } catch (error) {
      console.error("Error removing search cache:", error);
    }
  },

  async clearAll(): Promise<void> {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const cacheKeys = keys.filter((key) =>
        key.startsWith(STORAGE_KEYS.SEARCH_CACHE)
      );
      await AsyncStorage.multiRemove(cacheKeys);
    } catch (error) {
      console.error("Error clearing all search cache:", error);
    }
  },
};

/**
 * General Storage Operations
 */
export const Storage = {
  async setItem(key: string, value: any): Promise<boolean> {
    try {
      const stringValue = typeof value === "string" ? value : JSON.stringify(value);
      await AsyncStorage.setItem(key, stringValue);
      return true;
    } catch (error) {
      console.error(`Error setting item ${key}:`, error);
      return false;
    }
  },

  async getItem<T>(key: string): Promise<T | null> {
    try {
      const value = await AsyncStorage.getItem(key);
      if (!value) return null;
      
      try {
        return JSON.parse(value) as T;
      } catch {
        return value as T;
      }
    } catch (error) {
      console.error(`Error getting item ${key}:`, error);
      return null;
    }
  },

  async removeItem(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing item ${key}:`, error);
    }
  },

  async clear(): Promise<void> {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error("Error clearing storage:", error);
    }
  },
};
