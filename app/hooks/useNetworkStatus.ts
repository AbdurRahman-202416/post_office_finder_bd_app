import NetInfo, { NetInfoState } from "@react-native-community/netinfo";
import { useEffect, useState } from "react";

/**
 * Custom hook for monitoring network connectivity
 * Returns current network status
 */
export function useNetworkStatus() {
  const [isConnected, setIsConnected] = useState<boolean>(true);

  useEffect(() => {
    // Subscribe to network state updates
    const unsubscribe = NetInfo.addEventListener((state: NetInfoState) => {
      setIsConnected(state.isConnected ?? false);
    });

    // Cleanup subscription
    return () => {
      unsubscribe();
    };
  }, []);

  return {
    isConnected,
    isOffline: !isConnected,
  };
}
