import axios, { AxiosError, AxiosResponse } from "axios";
import type { ApiError } from "../types/api";

// Use environment variable or fallback to default
const API_BASE_URL = process.env.API_BASE_URL || "https://api.zippopotam.us/bd/";

/**
 * Custom error class for API errors
 */
export class ApiRequestError extends Error implements ApiError {
  status?: number;
  code?: string;

  constructor(message: string, status?: number, code?: string) {
    super(message);
    this.name = "ApiRequestError";
    this.status = status;
    this.code = code;
  }
}

/**
 * HTTP client configuration with interceptors
 */
const httpRequest = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000, // Increased timeout for slower connections
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Request Interceptor
 * Logs requests in development mode
 */
httpRequest.interceptors.request.use(
  (config) => {
    if (__DEV__) {
      console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url}`);
    }
    return config;
  },
  (error: AxiosError) => {
    if (__DEV__) {
      console.error("[API Request Error]", error);
    }
    return Promise.reject(error);
  }
);

/**
 * Response Interceptor
 * Handles errors and logs responses in development mode
 */
httpRequest.interceptors.response.use(
  (response: AxiosResponse) => {
    if (__DEV__) {
      console.log(`[API Response] ${response.config.url}`, response.status);
    }
    return response;
  },
  (error: AxiosError) => {
    // Handle different error scenarios
    let errorMessage = "An unexpected error occurred";
    let statusCode: number | undefined;
    let errorCode: string | undefined;

    if (error.response) {
      // Server responded with error status
      statusCode = error.response.status;
      
      switch (statusCode) {
        case 404:
          errorMessage = "Postal code not found. Please check and try again.";
          errorCode = "NOT_FOUND";
          break;
        case 500:
          errorMessage = "Server error. Please try again later.";
          errorCode = "SERVER_ERROR";
          break;
        case 503:
          errorMessage = "Service unavailable. Please try again later.";
          errorCode = "SERVICE_UNAVAILABLE";
          break;
        default:
          errorMessage = `Error: ${error.response.statusText || "Unknown error"}`;
          errorCode = "UNKNOWN_ERROR";
      }
    } else if (error.request) {
      // Request was made but no response received
      errorMessage = "No internet connection. Please check your network.";
      errorCode = "NETWORK_ERROR";
    } else {
      // Error in request configuration
      errorMessage = error.message || "Failed to make request";
      errorCode = "REQUEST_ERROR";
    }

    if (__DEV__) {
      console.error("[API Error]", {
        message: errorMessage,
        status: statusCode,
        code: errorCode,
        originalError: error,
      });
    }

    // Return custom error
    return Promise.reject(
      new ApiRequestError(errorMessage, statusCode, errorCode)
    );
  }
);

export default httpRequest;

