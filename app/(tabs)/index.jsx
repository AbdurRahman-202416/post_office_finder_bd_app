import { useState } from "react";
import {
  ImageBackground,
  Keyboard,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";

import { useQuery } from "@tanstack/react-query";
import LoadingComponent from "../components/Loading";
import httpRequest from "../services/api";

const mapImgUrl = require("../../assets/images/bdMap.png");

const fetchPostOffice = async (postalCode) => {
  if (!postalCode) throw new Error("Postal code is required");
  const response = await httpRequest.get(encodeURIComponent(postalCode));
  return response.data;
};

const HomeScreen = () => {
  const [search, setSearch] = useState("");
  const [queryKey, setQueryKey] = useState(null); // dynamic query key

  // TanStack Query
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["postOffice", queryKey],
    queryFn: () => fetchPostOffice(queryKey),
    enabled: !!queryKey,
    retry: false,
  });

  const handleInputChange = (value) => {
    if (/^\d*$/.test(value)) {
      setSearch(value);
    }
  };

  const handleSearch = () => {
    if (!search.trim()) return;
    Keyboard.dismiss();
    setQueryKey(search.trim());
    refetch();
  };

  // Loading state
  if (isLoading) return <LoadingComponent />;

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      className="flex-1 bg-slate-50"
    >
      {/* Header */}
      <View className="bg-green-800 pt-12 pb-8 px-6 rounded-b-3xl shadow-4xl shadow-black/20">
        <Text className="text-white text-3xl font-bold text-center">
          Post Office Finder
        </Text>
        <Text className="text-gray-100 text-center text-sm">
          Search by postal code
        </Text>
      </View>

      <View className="px-5 mt-6">
        {/* Search Card */}
        <View className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-red-600">
          <Text className="text-gray-700 font-semibold mb-3">
            Enter Postal Code
          </Text>

          <TextInput
            value={search}
            onChangeText={handleInputChange}
            onSubmitEditing={handleSearch}
            placeholder="e.g., 1000"
            keyboardType="numeric"
            className="bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-4 text-gray-800 text-lg mb-4"
          />

          <Pressable
            onPress={handleSearch}
            className="bg-[#6d0107] py-4 rounded-xl items-center active:bg-red-700 shadow-md"
          >
            <Text className="text-white font-bold text-base">Search</Text>
          </Pressable>
        </View>

        {/* Initial / Empty State */}
        {!queryKey && (
          <View className="mt-8">
            <ImageBackground
              source={mapImgUrl}
              className="w-full h-64 rounded-3xl bg-black/40 overflow-hidden"
              resizeMode="cover"
            >
              <View className="absolute inset-0 bg-black/40" />
              <View className="flex-1 justify-center items-center p-4">
                <View className="bg-white/90 w-20 h-20 rounded-full items-center justify-center mb-4 shadow-lg">
                  <Text className="text-4xl">📮</Text>
                </View>
                <Text className="text-white text-2xl font-bold mb-2 text-center">
                  Welcome to Post Office Finder
                </Text>
                <Text className="text-blue-100 text-center text-base leading-6">
                  Enter a postal code above to find detailed information about
                  post offices and locations in your area.
                </Text>
              </View>
            </ImageBackground>
          </View>
        )}

        {/* Error State */}
        {isError && (
          <View className="mt-6 bg-red-50 border-2 border-red-300 rounded-xl p-5">
            <Text className="text-red-700 font-medium">
              {error.message || "No results found."}
            </Text>
          </View>
        )}

        {/* Results */}
        {data && (
          <View className="mt-6 mb-8">
            {/* Header Card */}
            <View className="bg-gradient-to-r from-green-900 to-green-700 text-black rounded-t-2xl p-6">
              <Text className="text-black text-2xl font-bold mb-2">
                {data["post code"]}
              </Text>
              <View className="flex-row items-center">
                <View className="bg-white/20 rounded-lg px-3 py-1">
                  <Text className="font-semibold">{data.country}</Text>
                </View>
                <Text className="ml-2">({data["country abbreviation"]})</Text>
              </View>
            </View>

            {/* Places List */}
            <View className="bg-white rounded-b-2xl shadow-lg p-4">
              <Text className="text-lg font-bold text-gray-800 mb-4 px-2">
                Locations <Text className="text-green-700">({data?.places?.length || 0})</Text>
              </Text>

              {data?.places?.map((place, index) => (
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
                      <Text className="text-gray-600 text-sm mb-1">Coordinates</Text>
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
