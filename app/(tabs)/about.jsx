import {
    Image,
    Linking,
    Pressable,
    ScrollView,
    Text,
    View,
} from "react-native";

const PROFILE_IMAGE = require("../../assets/images/shanto.jpeg");

const AboutDeveloperScreen = () => {
  const handleLinkPress = (url) => {
    Linking.openURL(url).catch((err) =>
      console.error("Failed to open URL:", err)
    );
  };

  const socialLinks = [
    {
      platform: "GitHub",
      icon: "💻",
      url: "https://github.com/AbdurRahman-202416",
    },
    {
      platform: "LinkedIn",
      icon: "💼",
      url: "https://linkedin.com/in/abdurrahman",
    },
    {
      platform: "Email",
      icon: "📧",
      url: "mailto:abdurrahman@example.com",
    },
  ];

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      className="flex-1 bg-slate-50"
    >
      {/* Header */}
      <View className="bg-[#6d0107] pt-16 pb-10 px-6">
        <View className="items-center">
          {/* Profile Image */}
          <View className="w-24 h-24 rounded-full bg-white items-center justify-center mb-4 overflow-hidden">
            {PROFILE_IMAGE ? (
              <Image
                source={PROFILE_IMAGE}
                className="w-full h-full"
                resizeMode="cover"
              />
            ) : (
              <Text className="text-4xl">👤</Text>
            )}
          </View>

          <Text className="text-white text-2xl font-bold mb-1">
            Abdur Rahman
          </Text>
          <Text className="text-blue-200 text-sm">Software Developer</Text>
          <Text className="text-blue-300 text-sm mt-1">
            📍 Dhaka, Bangladesh
          </Text>
        </View>
      </View>

      <View className="px-6 py-6">
      

        {/* Skills */}
        <View className="bg-white rounded-xl p-6 shadow-sm mb-4">
          <Text className="font-bold text-gray-900 mb-3">💻 Skills</Text>
          <Text className="text-gray-700 leading-6">
            React • Next.js • TypeScript • React Native • TanStack Query •
            Zustand • Tailwind CSS • Node.js • WebAuthn
          </Text>
        </View>

      

        {/* Connect */}
        <View className="bg-white rounded-xl p-6 shadow-sm mb-6">
          <Text className="font-bold text-gray-900 mb-4">🔗 Connect</Text>
          {socialLinks.map((link, index) => (
            <Pressable
              key={index}
              onPress={() => handleLinkPress(link.url)}
              className="flex-row items-center py-3 border-b border-gray-100 active:bg-gray-50"
            >
              <Text className="text-xl mr-3">{link.icon}</Text>
              <Text className="text-gray-800 font-medium">{link.platform}</Text>
            </Pressable>
          ))}
        </View>

        {/* Footer */}
        <Text className="text-gray-500 text-center text-sm mb-6">
          Made with ❤️ by Abdur Rahman
        </Text>
      </View>
    </ScrollView>
  );
};

export default AboutDeveloperScreen;
