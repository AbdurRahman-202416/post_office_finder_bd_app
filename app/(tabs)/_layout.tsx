import { Ionicons } from "@expo/vector-icons";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Tabs } from "expo-router";
import { StatusBar, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import "../global.css";

const queryClient = new QueryClient();

export default function TabLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaView className="flex-1 bg-[#6d0107]" edges={["bottom", "top"]}>
        <StatusBar
          backgroundColor="#6d0107"
          barStyle="default"
          translucent={false}
        />

        <Tabs
          screenOptions={{
            headerShown: false,
            tabBarStyle: {
              backgroundColor: "#6d0107",
              borderTopColor: "#1f2937",
              height: 70,
            },
            tabBarActiveTintColor: "#3b82f6",
            tabBarInactiveTintColor: "#9ca3af",
          }}
        >
          {/* Home */}
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

          {/* Profile */}
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

          {/* About */}
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
    </QueryClientProvider>
  );
}
