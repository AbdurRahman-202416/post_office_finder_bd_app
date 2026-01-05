import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";
import {
  Image,
  Modal,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";

export default function ProfileScreen() {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [avatar, setAvatar] = useState<string | null>(null);
  const [name, setName] = useState<string>("Abdur Rahman");
  const [email, setEmail] = useState<string>("abdurrahman@example.com");
  const [phone, setPhone] = useState<string>("+880 1234-567890");
  const [location, setLocation] = useState<string>("Dhaka, Bangladesh");

  useEffect(() => {
    const loadProfileData = async () => {
      try {
        const storedData = await AsyncStorage.getItem("profileData");
        if (storedData) {
          const profileData = JSON.parse(storedData);
          setName(profileData.name || "Abdur Rahman");
          setEmail(profileData.email || "abdurrahman@example.com");
          setPhone(profileData.phone || "+880 1234-567890");
          setLocation(profileData.location || "Dhaka, Bangladesh");
          setAvatar(profileData.avatar || null);
        }
      } catch (error) {
        console.error("Error loading profile data:", error);
      }
    };
    loadProfileData();
  }, []);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      alert("Camera permission is required!");
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.cancelled) {
      setAvatar(result.assets[0].uri);
    }
  };

  const saveProfile = async () => {
    if (!name || !email) {
      alert("Please fill all required fields!");
      return;
    }
    try {
      const profileData = {
        name,
        email,
        phone,
        location,
        avatar,
      };
      await AsyncStorage.setItem("profileData", JSON.stringify(profileData));
      setModalVisible(false);
    } catch (error) {
      console.error("Error saving profile data:", error);
      alert("Failed to save profile data");
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
