import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";
import {
    Alert,
    Image,
    Modal,
    Pressable,
    ScrollView,
    Text,
    TextInput,
    View,
} from "react-native";
import { ProfileStorage } from "../services/storage";
import type { ProfileData } from "../types/api";

export default function ProfileScreen() {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [avatar, setAvatar] = useState<string | null>(null);
  const [name, setName] = useState<string>("Abdur Rahman");
  const [email, setEmail] = useState<string>("abdurrahman@example.com");
  const [phone, setPhone] = useState<string>("+880 1234-567890");
  const [location, setLocation] = useState<string>("Dhaka, Bangladesh");

  useEffect(() => {
    const loadProfileData = async () => {
      const profileData = await ProfileStorage.get();
      if (profileData) {
        setName(profileData.name || "Abdur Rahman");
        setEmail(profileData.email || "abdurrahman@example.com");
        setPhone(profileData.phone || "+880 1234-567890");
        setLocation(profileData.location || "Dhaka, Bangladesh");
        setAvatar(profileData.avatar || null);
      }
    };
    loadProfileData();
  }, []);

  const pickImage = async () => {
    try {
      // Request permission
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission Required",
          "Please grant photo library access to change your profile picture."
        );
        return;
      }

      // Launch image picker
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.7, // Compress image for better performance
      });

      // Check if user didn't cancel (fixed deprecated 'cancelled' to 'canceled')
      if (!result.canceled && result.assets && result.assets.length > 0) {
        setAvatar(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Error picking image:", error);
      Alert.alert("Error", "Failed to pick image. Please try again.");
    }
  };

  const saveProfile = async () => {
    // Validate required fields
    if (!name.trim()) {
      Alert.alert("Validation Error", "Please enter your name.");
      return;
    }
    
    if (!email.trim()) {
      Alert.alert("Validation Error", "Please enter your email.");
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Validation Error", "Please enter a valid email address.");
      return;
    }

    try {
      const profileData: ProfileData = {
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        location: location.trim(),
        avatar,
      };
      
      const success = await ProfileStorage.save(profileData);
      
      if (success) {
        setModalVisible(false);
        Alert.alert("Success", "Profile updated successfully!");
      } else {
        Alert.alert("Error", "Failed to save profile data. Please try again.");
      }
    } catch (error) {
      console.error("Error saving profile data:", error);
      Alert.alert("Error", "An unexpected error occurred. Please try again.");
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
     
      {/* Profile Card */}
      <View className="px-6 bg-gray-300 h-screen pt-[55px]">
        <View className="bg-white rounded-3xl shadow-lg p-6">
          {/* Avatar Section */}
          <View className="items-center -mt-16 mb-4">
            <View className="relative">
              <Image
                source={
                  avatar
                    ? { uri: avatar }
                    : require("../../assets/images/profile.png")
                }
                className="w-32 h-32 rounded-full border-4 border-white shadow-xl"
              />
              <Pressable
                onPress={pickImage}
                className="absolute bottom-0 right-0 bg-green-600 w-10 h-10 rounded-full items-center justify-center shadow-lg"
              >
                <Text className="text-white text-lg">+</Text>
              </Pressable>
            </View>

            <Text className="text-2xl font-bold text-gray-900 mt-4">
              {name}
            </Text>
            <Text className="text-blue-600 font-semibold mt-1">
              Software Developer
            </Text>
            <Text className="text-gray-500 text-sm mt-1">{location}</Text>
          </View>

          {/* Edit Button */}
          <Pressable
            onPress={() => setModalVisible(true)}
            className="bg-green-800  py-4 rounded-2xl items-center shadow-md active:opacity-80"
          >
            <Text className="text-white font-bold text-base">Edit Profile</Text>
          </Pressable>
        </View>

        {/* Contact Information */}
        <View className="bg-white rounded-3xl shadow-lg p-6 mt-6">
          <Text className="text-lg font-bold text-gray-900 mb-4">
            Contact Information
          </Text>

          <View className="space-y-4">
            <View className="flex-row items-center bg-gray-50 rounded-xl p-4">
              <View className="flex-1">
                <Text className="text-gray-500 text-xs">Email</Text>
                <Text className="text-gray-900 font-semibold">{email}</Text>
              </View>
            </View>

            <View className="flex-row items-center bg-gray-50 rounded-xl p-4">
              <View className="flex-1">
                <Text className="text-gray-500 text-xs">Phone</Text>
                <Text className="text-gray-900 font-semibold">{phone}</Text>
              </View>
            </View>

            <View className="flex-row items-center bg-gray-50 rounded-xl p-4">
              <View className="flex-1">
                <Text className="text-gray-500 text-xs">Location</Text>
                <Text className="text-gray-900 font-semibold">{location}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-end bg-black/50">
          <View className="bg-white rounded-t-3xl p-6 pb-10">
            <View className="items-center mb-6">
              <View className="bg-gray-300 w-12 h-1 rounded-full mb-4" />
              <Text className="text-2xl font-bold text-gray-900">
                Edit Profile
              </Text>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              {/* Name */}
              <View className="mb-4">
                <Text className="text-gray-700 font-semibold mb-2">
                  Full Name
                </Text>
                <TextInput
                  className="bg-gray-50 text-gray-900 rounded-xl px-4 py-4 border border-gray-200"
                  placeholder="Enter your name"
                  placeholderTextColor="#9ca3af"
                  value={name}
                  onChangeText={setName}
                />
              </View>

              {/* Email */}
              <View className="mb-4">
                <Text className="text-gray-700 font-semibold mb-2">
                  Email Address
                </Text>
                <TextInput
                  className="bg-gray-50 text-gray-900 rounded-xl px-4 py-4 border border-gray-200"
                  placeholder="Enter your email"
                  placeholderTextColor="#9ca3af"
                  keyboardType="email-address"
                  value={email}
                  onChangeText={setEmail}
                />
              </View>

              {/* Phone */}
              <View className="mb-4">
                <Text className="text-gray-700 font-semibold mb-2">
                  Phone Number
                </Text>
                <TextInput
                  className="bg-gray-50 text-gray-900 rounded-xl px-4 py-4 border border-gray-200"
                  placeholder="Enter your phone"
                  placeholderTextColor="#9ca3af"
                  keyboardType="phone-pad"
                  value={phone}
                  onChangeText={setPhone}
                />
              </View>

              {/* Location */}
              <View className="mb-6">
                <Text className="text-gray-700 font-semibold mb-2">
                  Location
                </Text>
                <TextInput
                  className="bg-gray-50 text-gray-900 rounded-xl px-4 py-4 border border-gray-200"
                  placeholder="Enter your location"
                  placeholderTextColor="#9ca3af"
                  value={location}
                  onChangeText={setLocation}
                />
              </View>

              {/* Buttons */}
              <Pressable
                onPress={saveProfile}
                className="bg-blue-600 py-4 rounded-xl items-center mb-3 active:bg-blue-700"
              >
                <Text className="text-white font-bold text-base">
                  Save Changes
                </Text>
              </Pressable>

              <Pressable
                onPress={() => setModalVisible(false)}
                className="bg-red-900 py-4 rounded-xl items-center active:bg-red-800"
              >
                <Text className="text-gray-100 font-bold text-base">
                  Cancel
                </Text>
              </Pressable>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}
