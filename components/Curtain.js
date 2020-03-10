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
      <Text color="#4F8EF7" style={styles.logo}>
        Y
      </Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  logo: {
    position: "absolute",
    fontSize: 55,
    flex: 1,
    top: height / 2 - 40,
    fontWeight: "bold",
    color: "#007AFF",
    left: width / 2 - 15
  },
  recipeImage: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: "cover",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15
  },
  recipeTitle: {}
});
