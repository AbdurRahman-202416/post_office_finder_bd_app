import React, { Component, ReactNode } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * Error Boundary Component
 * Catches JavaScript errors anywhere in the child component tree
 * and displays a fallback UI instead of crashing the app
 */
class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error to console (in production, send to error tracking service)
    console.error("Error Boundary caught an error:", error, errorInfo);
    
    // TODO: Send to error tracking service like Sentry
    // Sentry.captureException(error, { extra: errorInfo });
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
    });
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default fallback UI
      return (
        <View className="flex-1 bg-slate-50 justify-center items-center px-6">
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
          >
            <View className="bg-white rounded-3xl p-8 shadow-lg">
              {/* Error Icon */}
              <View className="items-center mb-6">
                <View className="bg-red-100 w-20 h-20 rounded-full items-center justify-center">
                  <Text className="text-4xl">⚠️</Text>
                </View>
              </View>

              {/* Error Title */}
              <Text className="text-2xl font-bold text-gray-900 text-center mb-3">
                Oops! Something went wrong
              </Text>

              {/* Error Message */}
              <Text className="text-gray-600 text-center mb-6">
                We encountered an unexpected error. Don&apos;t worry, your data is safe.
              </Text>

              {/* Error Details (Development only) */}
              {__DEV__ && this.state.error && (
                <View className="bg-gray-100 rounded-xl p-4 mb-6">
                  <Text className="text-xs text-gray-700 font-mono">
                    {this.state.error.toString()}
                  </Text>
                </View>
              )}

              {/* Action Buttons */}
              <Pressable
                onPress={this.handleReset}
                className="bg-[#6d0107] py-4 rounded-xl items-center mb-3 active:opacity-80"
              >
                <Text className="text-white font-bold text-base">
                  Try Again
                </Text>
              </Pressable>

              <Text className="text-gray-500 text-center text-sm mt-4">
                If the problem persists, please restart the app
              </Text>
            </View>
          </ScrollView>
        </View>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
