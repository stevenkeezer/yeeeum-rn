import { AppLoading } from "expo";
import { Asset } from "expo-asset";
import * as Font from "expo-font";
import React, { useState } from "react";
import Curtain from "../components/Curtain";
import LoginForm from "../components/LoginForm.js";
import {
  Platform,
  StatusBar,
  StyleSheet,
  View,
  Dimensions,
  TextInput,
  Text,
  Image,
  Keyboard,
  TouchableOpacity,
  Icon,
  AsyncStorage,
  KeyboardAvoidingView
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  useCode,
  Easing,
  interpolate,
  Extrapolate
} from "react-native-reanimated";
import {
  TapGestureHandler,
  State,
  TouchableWithoutFeedback,
  LongPressGestureHandler
} from "react-native-gesture-handler";
import Svg, { Circle, ClipPath } from "react-native-svg";

const { width, height } = Dimensions.get("window");

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = useState(false);
  const [press, setPress] = useState(false);
  const [user, setUser] = useState({});

  const {
    cond,
    eq,
    add,
    call,
    set,
    Value,
    event,
    Clock,
    useCode,
    startClock,
    stopClock,
    block,
    debug,
    timing,
    clockRunning,
    interpolate,
    Extrapolate,
    concat
  } = Animated;

  const [showHomeScreen, setShowHomeScreen] = useState(false);
  const [buttonOpacity, setButtonOpacity] = useState(1);

  function runTiming(clock, value, dest) {
    const state = {
      finished: new Value(0),
      position: new Value(0),
      time: new Value(0),
      frameTime: new Value(0)
    };

    const config = {
      duration: 500,
      toValue: new Value(0),
      easing: Easing.inOut(Easing.ease)
    };

    return block([
      cond(clockRunning(clock), 0, [
        set(state.finished, 0),
        set(state.time, 0),
        set(state.position, value),
        set(state.frameTime, 0),
        set(config.toValue, dest),
        startClock(clock)
      ]),
      timing(clock, state, config),
      cond(state.finished, debug("stop clock", stopClock(clock))),
      state.position
    ]);
  }

  const buttonY = interpolate(buttonOpacity, {
    inputRange: [0, 1],
    outputRange: [100, 0],
    extrapolate: Extrapolate.CLAMP
  });

  const bgY = interpolate(buttonOpacity, {
    inputRange: [0, 1],
    outputRange: [-height / 2 + 50, 0],
    extrapolate: Extrapolate.CLAMP
  });

  const textInputZindex = interpolate(buttonOpacity, {
    inputRange: [0, 1],
    outputRange: [1, -1],
    extrapolate: Extrapolate.CLAMP
  });

  const textInputY = interpolate(buttonOpacity, {
    inputRange: [0, 1],
    outputRange: [1, 100],
    extrapolate: Extrapolate.CLAMP
  });
  const textInputOpacity = interpolate(buttonOpacity, {
    inputRange: [0, 1],
    outputRange: [1, 0],
    extrapolate: Extrapolate.CLAMP
  });

  const rotateCross = interpolate(buttonOpacity, {
    inputRange: [0, 1],
    outputRange: [180, 360],
    extrapolate: Extrapolate.CLAMP
  });

  const onSignIn = async user => {
    try {
      const response = await fetch("https://yeeeum.herokuapp.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token c8e31a09dace4bf1b5f8ee382e7ff48d`
        },
        body: JSON.stringify(user)
      });
      const data = await response.json();
      console.log({ data });
      await AsyncStorage.setItem("user", JSON.stringify(data));

      const result = await AsyncStorage.setItem(
        "user",
        JSON.stringify(data),
        () => props.setShowHomeScreen(true)
      );
      console.log("here is my result", { result });
      if (data) {
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const onFbSignIn = () => {
    setShowHomeScreen(true);
  };

  const onOpenLogin = () => {
    setButtonOpacity(runTiming(new Clock(), 1, 0));
  };

  const onCloseLogin = () => {
    setButtonOpacity(runTiming(new Clock(), 0, 1));
  };

  function cacheImages(images) {
    return images.map(image => {
      if (typeof image === "string") {
        return Image.prefetch(image);
      } else {
        return Asset.fromModule(image).downloadAsync();
      }
    });
  }

  const _loadAssetsAsync = async () => {
    const imageAssets = cacheImages([
      "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png",
      require("../assets/images/robot-dev.png")
    ]);

    // const fontAssets = cacheFonts([FontAwesome.font]);

    await Promise.all([...imageAssets]);
  };

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onError={handleLoadingError}
        onFinish={() => handleFinishLoading(setLoadingComplete)}
      />
    );
  } else {
    return (
      <>
        {showHomeScreen && (
          <View style={styles.container}>
            {Platform.OS === "ios" && <StatusBar barStyle="dark-content" />}
            <AppNavigator />
          </View>
        )}
        {!showHomeScreen && (
          <KeyboardAvoidingView
            style={{
              flex: 1,
              flexDirection: "column",
              justifyContent: "center"
            }}
            behavior="padding"
            enabled
          >
            <View
              style={{
                flex: 1,
                backgroundColor: "white",
                justifyContent: "flex-end"
              }}
            >
              <Curtain bgY={bgY} />

              <View
                style={{
                  height: height / 3,
                  justifyContent: "center"
                }}
              >
                <TouchableOpacity onPress={onOpenLogin}>
                  <Animated.View
                    style={{
                      ...styles.button,
                      opacity: buttonOpacity,
                      transform: [{ translateY: buttonY }]
                    }}
                  >
                    <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                      SIGN IN
                    </Text>
                  </Animated.View>
                </TouchableOpacity>

                <TouchableOpacity onPress={onFbSignIn}>
                  <Animated.View
                    style={{
                      ...styles.button,
                      backgroundColor: "#2E71DC",
                      opacity: buttonOpacity,
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
                <Animated.View
                  style={{
                    zIndex: textInputZindex,
                    opacity: textInputOpacity,
                    transform: [{ translateY: textInputY }],
                    height: height / 2 - 50,
                    ...StyleSheet.absoluteFill,
                    top: null,
                    justifyContent: "center"
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      onCloseLogin();
                      Keyboard.dismiss();
                    }}
                  >
                    <Animated.View style={styles.closeButton}>
                      <Animated.Text
                        style={{
                          fontSize: 15,
                          transform: [{ rotate: concat(rotateCross, "deg") }]
                        }}
                      >
                        <Ionicons name="ios-arrow-up" size={26} />
                      </Animated.Text>
                    </Animated.View>
                  </TouchableOpacity>
                  <LoginForm
                    buttonOpacity={buttonOpacity}
                    onSignIn={onSignIn}
                  />
                </Animated.View>
              </View>
            </View>
          </KeyboardAvoidingView>
        )}
      </>
    );
  }
}

async function loadResourcesAsync() {
  await Promise.all([
    Asset.loadAsync([
      require("../assets/images/robot-dev.png"),
      require("../assets/images/robot-prod.png")
    ]),
    Font.loadAsync({
      // This is the font that we are using for our tab bar
      ...Ionicons.font,
      // We include SpaceMono because we use it in HomeScreen.js. Feel free to
      // remove this if you are not using it in your app
      "space-mono": require("../assets/fonts/SpaceMono-Regular.ttf")
    })
  ]);
}

function handleLoadingError(error) {
  // In this case, you might want to report the error to your error reporting
  // service, for example Sentry
  console.warn(error);
}

function handleFinishLoading(setLoadingComplete) {
  setLoadingComplete(true);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
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

  closeButton: {
    height: 40,
    width: 40,
    backgroundColor: "white",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 0,
    top: -height / 7.5,
    left: width / 2 - 20,
    shadowOffset: { width: 2, height: 2 },
    shadowColor: "black",
    shadowOpacity: 0.2
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
  }
});
