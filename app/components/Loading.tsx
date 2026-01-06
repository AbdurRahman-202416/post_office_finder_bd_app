import { useEffect, useRef } from "react";
import { Animated, Easing, View } from "react-native";

const LoadingComponent = () => {
  const dot1 = useRef(new Animated.Value(0)).current;
  const dot2 = useRef(new Animated.Value(0)).current;
  const dot3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const createAnimation = (animatedValue: Animated.Value, delay: number) => {
      return Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(animatedValue, {
            toValue: 1,
            duration: 400,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(animatedValue, {
            toValue: 0,
            duration: 400,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      );
    };

    const animation1 = createAnimation(dot1, 0);
    const animation2 = createAnimation(dot2, 150);
    const animation3 = createAnimation(dot3, 300);

    animation1.start();
    animation2.start();
    animation3.start();

    return () => {
      animation1.stop();
      animation2.stop();
      animation3.stop();
    };
  }, [dot1, dot2, dot3]);

  const animatedStyle = (animatedValue: Animated.Value, color: string) => ({
    transform: [
      {
        scale: animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [0.8, 1.3],
        }),
      },
      {
        translateY: animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -10],
        }),
      },
    ],
    opacity: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0.4, 1],
    }),
    backgroundColor: color,
  });

  return (
    <View className="flex-row gap-2 h-full items-center justify-center ">
      <Animated.View
        style={[
          animatedStyle(dot1, "#1e40af"),
          { width: 12, height: 12, borderRadius: 6 },
        ]}
      />
      <Animated.View
        style={[
          animatedStyle(dot2, "#10b981"),
          { width: 12, height: 12, borderRadius: 6 },
        ]}
      />
      <Animated.View
        style={[
          animatedStyle(dot3, "#ef4444"),
          { width: 12, height: 12, borderRadius: 6 },
        ]}
      />
    </View>
  );
};

export default LoadingComponent;
