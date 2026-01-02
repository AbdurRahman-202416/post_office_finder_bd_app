import { useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import LoadingComponent from "../components/Loading";
import httpRequest from "../services/api";

const HomeScreen = () => {
  const [postOfficeData, setPostOfficeData] = useState(null);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [isInitial, setIsInitial] = useState(true);
  const [loading, setLoading] = useState(false);

  const DataFetching = async () => {
    setIsInitial(false);

    if (!search) {
      setError("Please enter your postal code to search.");
      setPostOfficeData(null);

      setTimeout(() => {
        setLoading(false);
      }, 1000);
      return;
    }

    setLoading(true);

    try {
      const response = await httpRequest.get(`${Number(search)}`);

      if (response?.status === 200 && response?.data) {
        setPostOfficeData(response.data);
        setError("");
      } else {
        setPostOfficeData(null);
        setError("No results found for the entered postal code.");
      }
    } catch (err) {
      setPostOfficeData(null);
      setError("No results found for the entered postal code.");
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  const handleInputChange = (value) => {
    if (/^\d*$/.test(value)) {
      setSearch(value);
      setError("");
    }
  };

  if (loading) {
    return <LoadingComponent />;
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      className="flex-1 bg-slate-50"
    >
      {/* Header - Postal Theme */}
      <View className="bg-blue-900 pt-12 pb-8 px-6 rounded-b-3xl shadow-lg">
        <View className="flex-row items-center justify-center mb-2">
          <View className="bg-red-600 w-12 h-12 rounded-full items-center justify-center mr-3">
            <Text className="text-white text-2xl font-bold">✉</Text>
          </View>
          <Text className="text-white text-3xl font-bold">
            Post Office Finder
          </Text>
        </View>
        <Text className="text-blue-200 text-center text-sm">
          Search by postal code
        </Text>
      </View>

      <View className="px-6">
        {/* Search Card */}
        <View className="bg-white rounded-2xl p-6 shadow-lg -mt-6 border-l-4 border-red-600">
          <Text className="text-gray-700 font-semibold mb-3">
            Enter Postal Code
          </Text>

          <TextInput
            value={search}
            onChangeText={handleInputChange}
            onSubmitEditing={DataFetching}
            placeholder="e.g., 10000"
            keyboardType="numeric"
            className="bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-4 text-gray-800 text-lg mb-4"
          />

          <Pressable
            onPress={DataFetching}
            className="bg-[#6d0107] py-4 rounded-xl items-center active:bg-red-700 shadow-md"
          >
            <Text className="text-white font-bold text-base"> Search</Text>
          </Pressable>
        </View>

        {/* Initial State */}
        {isInitial && (
          <View className="mt-8 bg-blue-50 rounded-2xl p-8 border-2 border-blue-200">
            <View className="items-center mb-4">
              <View className="bg-blue-600 w-16 h-16 rounded-full items-center justify-center">
                <Text className="text-white text-3xl">📮</Text>
              </View>
            </View>
            <Text className="text-xl font-bold text-blue-900 mb-2 text-center">
              Welcome to Post Office Finder
            </Text>
            <Text className="text-blue-700 text-center leading-6">
              Enter a postal code above to find detailed information about post
              offices and locations in your area.
            </Text>
          </View>
        )}

        {/* Error State */}
        {error && !isInitial && (
          <View className="mt-6 bg-red-50 border-2 border-red-300 rounded-xl p-5">
            <View className="flex-row items-center">
              <Text className="text-red-600 text-2xl mr-3">⚠️</Text>
              <Text className="text-red-700 font-medium flex-1">{error}</Text>
            </View>
          </View>
        )}

        {/* Results */}
        {postOfficeData && (
          <View className="mt-6 mb-8">
            {/* Header Card */}
            <View className="bg-gradient-to-r from-blue-900 to-blue-700 text-black rounded-t-2xl p-6">
              <Text className="text-black text-2xl font-bold mb-2">
                📬 {postOfficeData["post code"]}
              </Text>
              <View className="flex-row items-center">
                <View className="bg-white/20 rounded-lg px-3 py-1">
                  <Text className=" font-semibold">
                    {postOfficeData.country}
                  </Text>
                </View>
                <Text className=" ml-2">
                  ({postOfficeData["country abbreviation"]})
                </Text>
              </View>
            </View>

            {/* Places List */}
            <View className="bg-white rounded-b-2xl shadow-lg p-4">
              <Text className="text-lg font-bold text-gray-800 mb-4 px-2">
                📍 Locations{" "}
                <Text className="text-green-700">
                  ({postOfficeData?.places?.length || 0})
                </Text>
              </Text>

              {postOfficeData?.places?.map((place, index) => (
                <View
                  key={index}
                  className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-5 mb-3 border-l-4 border-red-600"
                >
                  <Text className="font-bold text-gray-900 text-lg mb-3">
                    {place["place name"]}
                  </Text>

                  <View className="space-y-2">
                    <View className="flex-row items-center mb-2">
                      <View className="bg-blue-100 rounded-lg px-3 py-1">
                        <Text className="text-blue-800 font-semibold text-sm">
                          {place.state}
                        </Text>
                      </View>
                    </View>

                    <View className="bg-white rounded-lg p-3">
                      <Text className="text-gray-600 text-sm mb-1">
                        📍 Coordinates
                      </Text>
                      <Text className="text-gray-800 font-mono text-xs">
                        Lat: {place.latitude}
                      </Text>
                      <Text className="text-gray-800 font-mono text-xs">
                        Lng: {place.longitude}
                      </Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
