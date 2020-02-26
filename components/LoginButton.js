import React from "react";
import { Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import Animated, {
  useCode,
  Easing,
  interpolate,
  Extrapolate
} from "react-native-reanimated";
const { width, height } = Dimensions.get("window");

export default function LoginButton(props) {
  const buttonY = interpolate(props.buttonOpacity, {
    inputRange: [0, 1],
    outputRange: [100, 0],
    extrapolate: Extrapolate.CLAMP
  });
  return (
    <>
      <TouchableOpacity onPress={props.onSignIn}>
        <Animated.View
          style={{
            ...styles.button,
            opacity: props.buttonOpacity,
            transform: [{ translateY: buttonY }]
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>SIGN IN</Text>
        </Animated.View>
      </TouchableOpacity>

      <TouchableOpacity onPress={props.onFbSignIn}>
        <Animated.View
          style={{
            ...styles.button,
            backgroundColor: "#2E71DC",
            opacity: props.buttonOpacity,
            transform: [{ translateY: buttonY }]
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              color: "#fff"
            }}
          >
            SIGN IN WITH FACEBOOK
          </Text>
        </Animated.View>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  //   emailSection: {
  //     flex: 1,
  //     flexDirection: "row",
  //     position: "relative",
  //     justifyContent: "center",
  //     alignItems: "center",
  //     backgroundColor: "#fff"
  //   },
  textInput: {
    height: 50,
    borderRadius: 7,
    borderWidth: 0.5,
    marginHorizontal: 20,
    paddingLeft: 10,
    backgroundColor: "white",
    marginHorizontal: 25,
    shadowOffset: { width: 0, height: 0 },
    shadowColor: "black",
    shadowOpacity: 0.17,
    borderWidth: 1,
    borderColor: "#dddddd",
    marginTop: 15,
    marginHorizontal: 20,
    backgroundColor: "#E8E8E8"
  },
  textInputEmail: {
    height: 50,
    borderRadius: 7,
    borderWidth: 0.5,
    marginHorizontal: 20,
    paddingLeft: 40,
    backgroundColor: "white",
    marginHorizontal: 25,
    shadowOffset: { width: 0, height: 0 },
    shadowColor: "black",
    shadowOpacity: 0.17,
    borderWidth: 1,
    borderColor: "#dddddd",
    marginTop: 15,
    marginHorizontal: 20
    // backgroundColor: "#F5F5F5"
  },
  inputIcon: {
    position: "absolute",
    top: 188,
    left: 33
  },

  button: {
    backgroundColor: "white",
    height: 60,
    marginHorizontal: 20,
    borderRadius: 35,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 5,
    shadowOffset: { width: 2, height: 2 },
    shadowColor: "black",
    shadowOpacity: 0.2
  },
  btnEye: {
    position: "absolute",
    left: 178,
    top: 95
  },
  person: {
    position: "absolute",
    left: 33,
    bottom: 75,
    zIndex: 15
  }
});
