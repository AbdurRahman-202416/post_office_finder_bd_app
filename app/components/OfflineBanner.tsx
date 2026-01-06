import React from "react";
import { Text, View } from "react-native";

interface OfflineBannerProps {
  isVisible: boolean;
}

/**
 * Offline Banner Component
 * Displays a banner when the device is offline
 */
const OfflineBanner: React.FC<OfflineBannerProps> = ({ isVisible }) => {
  if (!isVisible) return null;

  return (
    <View className="bg-orange-500 py-2 px-4">
      <Text className="text-white text-center font-semibold text-sm">
        📡 No internet connection. Showing cached data.
      </Text>
    </View>
  );
};

export default OfflineBanner;
