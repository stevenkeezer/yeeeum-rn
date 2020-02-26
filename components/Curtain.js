import React from "react";
import { Image, Text, StyleSheet, Dimensions } from "react-native";
import Animated, {
  useCode,
  Easing,
  interpolate
} from "react-native-reanimated";

const { width, height } = Dimensions.get("window");

export default function Curtain({ bgY }) {
  return (
    <Animated.View
      style={{
        ...StyleSheet.absoluteFill,
        transform: [{ translateY: bgY }]
      }}
    >
      <Image
        source={require("../assets/images/food.jpeg")}
        style={{
          flex: 1,
          width: null,
          height: null
        }}
      ></Image>
      <Text
        color="#4F8EF7"
        style={{
          position: "absolute",
          fontSize: 55,
          flex: 1,
          top: height / 2 - 40,
          fontWeight: "bold",
          color: "#f25925",
          left: width / 2 - 15
        }}
      >
        Y
      </Text>
    </Animated.View>
  );
}
