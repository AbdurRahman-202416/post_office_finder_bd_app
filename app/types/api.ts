/**
 * TypeScript type definitions for API responses and data structures
 */

// API Response Types
export interface Place {
  "place name": string;
  longitude: string;
  state: string;
  "state abbreviation": string;
  latitude: string;
}

export interface PostOfficeData {
  "post code": string;
  country: string;
  "country abbreviation": string;
  places: Place[];
}

// Error Types
export interface ApiError {
  message: string;
  status?: number;
  code?: string;
}

// Storage Types
export interface ProfileData {
  name: string;
  email: string;
  phone: string;
  location: string;
  avatar: string | null;
}

export interface CachedSearchResult {
  postalCode: string;
  data: PostOfficeData;
  timestamp: number;
}

// Location Types
export interface UserLocation {
  latitude: number;
  longitude: number;
  placeName: string;
  displayLocation: string;
}

// Network Status
export interface NetworkStatus {
  isConnected: boolean;
  isInternetReachable: boolean;
}
