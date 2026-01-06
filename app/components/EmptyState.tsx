import React from "react";
import { Pressable, Text, View } from "react-native";

interface EmptyStateProps {
  icon?: string;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

/**
 * Empty State Component
 * Reusable component for displaying empty states
 */
const EmptyState: React.FC<EmptyStateProps> = ({
  icon = "📭",
  title,
  description,
  actionLabel,
  onAction,
}) => {
  return (
    <View className="items-center justify-center py-12 px-6">
      <View className="bg-gray-100 w-24 h-24 rounded-full items-center justify-center mb-4">
        <Text className="text-5xl">{icon}</Text>
      </View>
      
      <Text className="text-xl font-bold text-gray-900 text-center mb-2">
        {title}
      </Text>
      
      {description && (
        <Text className="text-gray-600 text-center mb-6 max-w-sm">
          {description}
        </Text>
      )}
      
      {actionLabel && onAction && (
        <Pressable
          onPress={onAction}
          className="bg-[#6d0107] py-3 px-6 rounded-xl active:opacity-80"
        >
          <Text className="text-white font-semibold">{actionLabel}</Text>
        </Pressable>
      )}
    </View>
  );
};

export default EmptyState;
