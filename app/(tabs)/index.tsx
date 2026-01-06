import { useEffect, useState } from "react";
import {
  ImageBackground,
  Keyboard,
  Linking,
  Modal,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";

import { useQuery } from "@tanstack/react-query";
import * as Location from "expo-location";

import { WebView } from "react-native-webview";

import LoadingComponent from "../components/Loading";
import httpRequest from "../services/api";

const mapImgUrl = require("../../assets/images/bdMap.png");

/* ================= TYPES ================= */

interface Place {
  "place name": string;
  longitude: string;
  state: string;
  "state abbreviation": string;
  latitude: string;
}

interface PostOfficeData {
  "post code": string;
  country: string;
  "country abbreviation": string;
  places: Place[];
}

/* ================= API ================= */

const fetchPostOffice = async (postalCode: string): Promise<PostOfficeData> => {
  if (!postalCode) throw new Error("Postal code is required");
  const response = await httpRequest.get(postalCode);
  return response.data;
};

/* ================= SCREEN ================= */

const HomeScreen = () => {
  const [search, setSearch] = useState("");
  const [queryKey, setQueryKey] = useState<string | null>(null);

  // Map modal state
  const [mapVisible, setMapVisible] = useState(false);
  const [mapUrl, setMapUrl] = useState<string | null>(null);

  // Current location
  const [userLocation, setUserLocation] = useState<string | null>(null);

  /* ===== React Query ===== */

  const { data, isLoading, isError, error, refetch } = useQuery<PostOfficeData>(
    {
      queryKey: ["postOffice", queryKey],
      queryFn: () => fetchPostOffice(queryKey!),
      enabled: !!queryKey,
      retry: false,
    }
  );

  /* ===== Handlers ===== */

  const handleInputChange = (value: string) => {
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

  const openGoogleMaps = (latitude: string, longitude: string) => {
    const url = `https://maps.google.com/?q=${latitude},${longitude}`;

    setMapUrl(url);
    setMapVisible(true);
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  const getUserLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        console.warn("Location permission denied");
        return;
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      const { latitude, longitude } = location.coords;

      // Reverse geocode to get place name
      const reverseGeocode = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      if (reverseGeocode.length > 0) {
        const address = reverseGeocode[0];
        const placeName =
          address.city || address.district || address.region || "Your Location";
        const displayLocation = `${placeName}, ${address.country}`;
        setUserLocation(displayLocation);
        console.log("User Location:", displayLocation);
      }
    } catch (error) {
      console.log("Location error:", error);
    }
  };

  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="flex-1 bg-slate-50"
      >
        {/* ===== Header ===== */}
        <View className="bg-[#6d0107] pt-8 pb-8 px-6 rounded-b-3xl shadow-black/20">
          <Text className="text-white text-3xl font-bold text-center">
            Post Office Finder
          </Text>
          <Text className="text-gray-100 text-center text-sm">
            Search by postal code
          </Text>

          {/* User Location */}
          {userLocation && (
            <View className="mt-4 bg-white/20 rounded-lg p-2">
              <Text className="text-white text-xs text-center">
                ➤ Your Location: {userLocation}
              </Text>
            </View>
          )}
        </View>

        <View className="px-5 mt-3 pb-10">
          {/* ===== Search Card ===== */}
          <View className="bg-white rounded-2xl p-6 shadow-lg border-l-8 border-red-800">
            <Text className="text-gray-700 font-semibold mb-3">
              Enter Postal Code
            </Text>

            <TextInput
              value={search}
              onChangeText={handleInputChange}
              onSubmitEditing={handleSearch}
              placeholder="e.g., 8000"
              keyboardType="numeric"
              className="bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-4 text-gray-800 text-lg mb-4"
            />

            <Pressable
              onPress={handleSearch}
              className="bg-[#6d0107] py-4 rounded-xl items-center"
            >
              <Text className="text-white font-bold text-base">
                {isLoading ? <LoadingComponent /> : "Search"}
              </Text>
            </Pressable>
          </View>

          {/* ===== Initial State ===== */}
          {!queryKey && (
            <View className="mt-8">
              <ImageBackground
                source={mapImgUrl}
                className="w-full h-64 rounded-3xl overflow-hidden"
                resizeMode="cover"
              >
                <View className="absolute inset-0 bg-black/40" />
                <View className="flex-1 justify-center items-center p-4">
                  <View className="bg-white/90 w-20 h-20 rounded-full items-center justify-center mb-4">
                    <Text className="text-4xl">📮</Text>
                  </View>
                  <Text className="text-white text-2xl font-bold mb-2 text-center">
                    Welcome to Post Office Finder
                  </Text>
                  <Text className="text-blue-100 text-center text-base">
                    Enter a postal code to find nearby post offices.
                  </Text>
                </View>
              </ImageBackground>
            </View>
          )}

          {/* ===== Error State ===== */}
          {isError && (
            <View className="mt-6 bg-red-50 border-2 border-red-300 rounded-xl p-5">
              <Text className="text-red-700 font-medium">
                {(error as Error)?.message || "No results found"}
              </Text>
            </View>
          )}

          {/* ===== Results ===== */}
          {data && (
            <View className="mt-6 mb-8">
              {/* Header */}
              <View className="bg-green-700 border-l-8 border-red-800 rounded-t-2xl p-6">
                <Text className="text-white text-2xl font-bold mb-1">
                  Post Code: {data["post code"]}
                </Text>
                <Text className="text-green-100">
                  {data.country} ({data["country abbreviation"]})
                </Text>
              </View>

              {/* List */}
              <View className="bg-white border-l-8 border-red-800 rounded-b-2xl shadow-lg p-4">
                <View className="flex-row justify-between items-center mb-4">
                  <Text className="text-lg font-bold text-gray-800">
                    Locations ({data.places.length})
                  </Text>
                </View>

                {data.places.map((place, index) => (
                  <View
                    key={index}
                    className="bg-gray-50 rounded-xl p-5 mb-3 border-l-4 border-red-600"
                  >
                    <Text className="font-bold text-gray-900 text-lg mb-2">
                      {place["place name"]}
                    </Text>

                    <Text className="text-sm text-gray-600 mb-2">
                      {place.state}
                    </Text>

                    <Text className="text-xs text-gray-500">
                      Lat: {place.latitude} | Lng: {place.longitude}
                    </Text>

                    <Pressable
                      onPress={() =>
                        openGoogleMaps(place.latitude, place.longitude)
                      }
                      className="bg-gray-500 rounded-lg py-2 mt-3 items-center"
                    >
                      <Text className="text-white font-semibold">
                        ⛳ View Map in Web
                      </Text>
                    </Pressable>

                    <Pressable
                      onPress={() => {
                        const googleMapsAppUrl = `https://www.google.com/maps/search/${encodeURIComponent(place["place name"])}/@${place.latitude},${place.longitude},15z`;
                        Linking.openURL(googleMapsAppUrl).catch(() => {
                          console.log("Google Maps app not available");
                        });
                      }}
                      className="bg-green-800 rounded-lg py-2 mt-2 items-center"
                    >
                      <Text className="text-white font-semibold">
                        ➤ Open in Google Maps App
                      </Text>
                    </Pressable>
                  </View>
                ))}
              </View>
            </View>
          )}
        </View>
      </ScrollView>

      {/* ================= MAP MODAL ================= */}

      <Modal
        visible={mapVisible}
        animationType="fade"
        onRequestClose={() => setMapVisible(false)}
      >
        <View className="flex-1 bg-white">
          {/* Modal Header */}
          <View className="flex-row justify-between items-center px-4 py-3 bg-[#6d0107]">
            <Text className="text-white font-bold text-lg">
              Post Office Location
            </Text>
            <Pressable onPress={() => setMapVisible(false)}>
              <Text className="text-white font-semibold">Close</Text>
            </Pressable>
          </View>

          {/* Map */}
          {mapUrl && (
            <WebView
              source={{ uri: mapUrl }}
              startInLoadingState
              javaScriptEnabled
              domStorageEnabled
            />
          )}
        </View>
      </Modal>
    </>
  );
};

export default HomeScreen;
