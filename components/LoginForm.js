import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Text
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated, { interpolate, Extrapolate } from "react-native-reanimated";
const { width, height } = Dimensions.get("window");

export default function LoginForm(props) {
  const [press, setPress] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  const bgYInput = interpolate(props.buttonOpacity, {
    inputRange: [0, 1],
    outputRange: [-height / 2 + 50, 0],
    extrapolate: Extrapolate.CLAMP
  });

  useEffect(() => {
    setSubmitted(false);
  }, []);

  return (
    <>
      <View style={styles.emailSection}>
        <Ionicons
          style={styles.person}
          name="ios-person"
          size={26}
          color="#007AFF"
        ></Ionicons>
        <TextInput
          style={styles.textInputEmail}
          placeholder="EMAIL"
          onHandlerStateChange={bgYInput}
          placeholderTextColor="#ccc"
          backgroundColor={submitted ? "#e8e8e8" : "white"}
          onChangeText={text => setUser({ ...user, email: text })}
          blurOnSubmit={true}
        />
      </View>
      <View>
        <Ionicons
          name="ios-lock"
          size={28}
          color="#007AFF"
          style={styles.inputIcon}
        ></Ionicons>
        <TextInput
          style={styles.textInputEmail}
          placeholder="PASSWORD"
          secureTextEntry={!press}
          onHandlerStateChange={bgYInput}
          placeholderTextColor="#ccc"
          backgroundColor={submitted ? "#e8e8e8" : "white"}
          onChangeText={text => setUser({ ...user, password: text })}
          blurOnSubmit={true}
        />
        <TouchableOpacity
          style={styles.btnEye}
          onPress={() => setPress(!press)}
        >
          <Ionicons
            size={26}
            style={styles.btnEye}
            color="#007AFF"
            name={press ? "ios-eye" : "ios-eye-off"}
          ></Ionicons>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={() => {
          setSubmitted(true);
          props.onSignIn(user);
        }}
      >
        <Animated.View style={styles.button}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>SIGN IN</Text>
        </Animated.View>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
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
  },
  inputIcon: {
    position: "absolute",
    bottom: 10,
    left: 33,
    zIndex: 15
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
    left: 180,
    bottom: 5,
    zIndex: 12
  },
  person: {
    position: "absolute",
    left: 33,
    bottom: 10,
    zIndex: 15
  }
});
