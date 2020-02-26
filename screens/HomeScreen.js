import * as WebBrowser from "expo-web-browser";
import React, { useEffect, useState } from "react";
import { createSwitchNavigator, createAppContainer } from "react-navigation";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  Dimensions,
  Animated,
  AsyncStorage,
  TouchableOpacity
} from "react-native";

import Icon from "react-native-vector-icons/Ionicons";
import { MonoText } from "../components/StyledText";
import { TextInput, FlatList } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useSafeArea } from "react-native-safe-area-context";
import RecipeItem from "../components/RecipeItem";
import Home from "../components/Explore/Home.js";
import RecipeDetails from "./RecipeDetail.js";

export default function HomeScreen() {
  const [recipes, setRecipes] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const [hide, setHide] = useState(false);

  const { height, width } = Dimensions.get("window");

  const getRecipes = async () => {
    const response = await fetch("https://yeeeum.herokuapp.com/posts");
    const data = await response.json();
    // console.log({ data });
    if (data) {
      setRecipes(data);
    }
  };

  const getUserInfo = async () => {
    const result = await AsyncStorage.getItem("user");
    const items = JSON.parse(result);
    setUserInfo(items);
  };

  useEffect(() => {
    getUserInfo();
    getRecipes();
    // showmethemoney();
  }, []);

  // const showmethemoney = async () => {
  //   console.log(typeof (await AsyncStorage.getItem("user")));
  // };

  const RecipeDetail = props => {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>recipe details</Text>
        <TouchableOpacity
          onPress={() => props.navigation.navigate("HomeScreen")}
        >
          <Text>back</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const AppSwitchNavigator = createSwitchNavigator({
    RecipeDetail: { screen: RecipeDetail },
    HomeScreen: { screen: HomeScreen }
  });

  const AppContainer = createAppContainer(AppSwitchNavigator);

  return (
    <>
      {hide ? (
        <AppContainer />
      ) : (
        <View style={styles.container}>
          <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
              <View
                style={{
                  height: 80
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    padding: 10,
                    backgroundColor: "white",
                    marginHorizontal: 25,
                    shadowOffset: { width: 0, height: 0 },
                    shadowColor: "black",
                    shadowOpacity: 0.17,
                    borderWidth: 1,
                    borderColor: "#dddddd",
                    marginTop: 15,
                    borderRadius: 7
                  }}
                >
                  <Icon
                    name="ios-search"
                    size={20}
                    style={{ marginRight: 10 }}
                  ></Icon>
                  <TextInput
                    placeholder="Search your favorite recipes"
                    style={{
                      flex: 1,
                      fontWeight: "700",
                      backgroundColor: "white",
                      overflow: "hidden"
                    }}
                  ></TextInput>
                </View>
                <Animated.View
                  style={{
                    flexDirection: "row",
                    marginHorizontal: 25,
                    position: "relative",
                    top: 5
                  }}
                >
                  <View
                    style={{
                      minHeight: 20,
                      minWidth: 40,
                      padding: 5,
                      borderRadius: 2,
                      marginRight: 5
                    }}
                  >
                    <Text style={{ fontWeight: "700", fontSize: 10 }}>
                      Chicken
                    </Text>
                  </View>
                  <View
                    style={{
                      minHeight: 20,
                      minWidth: 40,
                      padding: 5,
                      backgroundColor: "white",
                      borderRadius: 2,
                      marginRight: 5
                    }}
                  >
                    <Text style={{ fontWeight: "700", fontSize: 10 }}>
                      Steak
                    </Text>
                  </View>
                  <View
                    style={{
                      minHeight: 20,
                      minWidth: 40,
                      padding: 5,
                      backgroundColor: "white",
                      borderRadius: 2
                    }}
                  >
                    <Text style={{ fontWeight: "700", fontSize: 10 }}>
                      Vegan
                    </Text>
                  </View>
                </Animated.View>
              </View>
              <ScrollView scrollEventThrottle={16}>
                <View
                  style={{ flex: 1, paddingTop: 20, backgroundColor: "white" }}
                >
                  <Text
                    style={{
                      fontSize: 24,
                      fontWeight: "700",
                      paddingHorizontal: 25
                    }}
                  >
                    What can we help you find, {userInfo.username}?
                  </Text>

                  <View
                    style={{
                      height: 160,
                      marginTop: 20,
                      borderRadius: 5
                    }}
                  >
                    <FlatList
                      horizontal={true}
                      showsHorizontalScrollIndicator={false}
                      renderItem={({ item: r }) => {
                        return (
                          <RecipeItem recipe={r} setHide={setHide}></RecipeItem>
                        );
                      }}
                      style={{
                        flex: 1,
                        paddingHorizontal: 15
                      }}
                      data={recipes}
                      keyExtractor={(item, index) => index.toString()}
                    ></FlatList>
                  </View>
                  <View style={{ marginTop: 40, paddingHorizontal: 25 }}>
                    <Text style={{ fontSize: 24, fontWeight: "700" }}>
                      Hot off the grill
                    </Text>
                    <Text
                      style={{
                        fontWeight: "100",
                        marginTop: 10
                      }}
                    >
                      A new way of discovering and loving your favorite recipes
                    </Text>
                    <View
                      style={{ width: width - 50, height: 200, marginTop: 20 }}
                    >
                      {recipes[0] && (
                        <Image
                          style={{
                            flex: 1,
                            height: null,
                            width: null,
                            resizeMode: "cover",
                            borderRadius: 5,
                            paddingHorizontal: 29
                          }}
                          source={{
                            uri: `https://yeeeum.s3-us-west-1.amazonaws.com/${recipes[3].images[0].img_url}`
                          }}
                        ></Image>
                      )}
                    </View>
                  </View>
                </View>
                <View style={{ marginTop: 40 }}>
                  <Text
                    style={{
                      fontSize: 24,
                      fontWeight: "700",

                      paddingHorizontal: 25
                    }}
                  >
                    Food around the world
                  </Text>
                  <View
                    style={{
                      paddingHorizontal: 25,
                      marginTop: 20,
                      flexDirection: "row",
                      flexWrap: "wrap",
                      justifyContent: "space-between"
                    }}
                  >
                    <Home
                      width={width}
                      recipes={recipes}
                      title="Chicken Soup"
                    ></Home>
                    <Home
                      width={width}
                      recipes={recipes}
                      title="balogne Soup"
                    ></Home>
                    <Home
                      width={width}
                      recipes={recipes}
                      title="hardcore pawn"
                    ></Home>
                  </View>
                </View>
              </ScrollView>
            </View>
          </SafeAreaView>
        </View>
      )}
    </>
  );
}

HomeScreen.navigationOptions = {
  header: null
};

function handleLearnMorePress() {
  WebBrowser.openBrowserAsync(
    "https://docs.expo.io/versions/latest/workflow/development-mode/"
  );
}

function handleHelpPress() {
  WebBrowser.openBrowserAsync(
    "https://docs.expo.io/versions/latest/workflow/up-and-running/#cant-see-your-changes"
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  developmentModeText: {
    marginBottom: 20,
    color: "rgba(0,0,0,0.4)",
    fontSize: 14,
    lineHeight: 19,
    textAlign: "center"
  },
  contentContainer: {
    paddingTop: 30
  },
  welcomeContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: "contain",
    marginTop: 3,
    marginLeft: -10
  },
  getStartedContainer: {
    alignItems: "center",
    marginHorizontal: 50
  },
  homeScreenFilename: {
    marginVertical: 7
  },
  codeHighlightText: {
    color: "rgba(96,100,109, 0.8)"
  },
  codeHighlightContainer: {
    backgroundColor: "rgba(0,0,0,0.05)",
    borderRadius: 3,
    paddingHorizontal: 4
  },
  getStartedText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    lineHeight: 24,
    textAlign: "center"
  },
  tabBarInfoContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3
      },
      android: {
        elevation: 20
      }
    }),
    alignItems: "center",
    backgroundColor: "#fbfbfb",
    paddingVertical: 20
  },
  tabBarInfoText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    textAlign: "center"
  },
  navigationFilename: {
    marginTop: 5
  },
  helpContainer: {
    marginTop: 15,
    alignItems: "center"
  },
  helpLink: {
    paddingVertical: 15
  },
  helpLinkText: {
    fontSize: 14,
    color: "#2e78b7"
  }
});
