import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import "../global.css";

export default function TabLayout() {
  return (
    <SafeAreaView className="flex-1 bg-gray-900" edges={["top"]}>
      <StatusBar style="light" backgroundColor="#6d0107" />

      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: "#6d0107",
            borderTopColor: "#1f2937",
            height: 60,
          },
          tabBarActiveTintColor: "#3b82f6",
          tabBarInactiveTintColor: "#9ca3af",
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ focused, size }) => (
              <Ionicons
                name="home-outline"
                size={focused ? size + 6 : size}
                color={focused ? "#3b82f6" : "#ffffff"}
              />
            ),
            tabBarLabel: ({ focused }) => (
              <Text
                className={`text-sm ${
                  focused ? "font-bold text-blue-500" : "text-gray-300"
                }`}
              >
                Home
              </Text>
            ),
          }}
        />

        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ focused, size }) => (
              <Ionicons
                name="person-outline"
                size={focused ? size + 6 : size}
                color={focused ? "#3b82f6" : "#ffffff"}
              />
            ),
            tabBarLabel: ({ focused }) => (
              <Text
                className={`text-sm ${
                  focused ? "font-bold text-blue-500" : "text-gray-300"
                }`}
              >
                Profile
              </Text>
            ),
          }}
        />

        <Tabs.Screen
          name="about"
          options={{
            title: "About",
            tabBarIcon: ({ focused, size }) => (
              <Ionicons
                name="information-circle-outline"
                size={focused ? size + 6 : size}
                color={focused ? "#3b82f6" : "#ffffff"}
              />
            ),
            tabBarLabel: ({ focused }) => (
              <Text
                className={`text-sm ${
                  focused ? "font-bold text-blue-500" : "text-gray-300"
                }`}
              >
                About
              </Text>
            ),
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
}
