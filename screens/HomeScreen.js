import * as WebBrowser from "expo-web-browser";
import React, { useEffect, useState, useRef } from "react";
import Animated, { interpolate, Extrapolate } from "react-native-reanimated";
import { createSwitchNavigator, createAppContainer } from "react-navigation";
import {
  Image,
  Platform,
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  Dimensions,
  AsyncStorage,
  TouchableOpacity
} from "react-native";

import RecipeDetails from "./RecipeDetail.js";
import Home from "../components/Explore/Home.js";
import RecipeItem from "../components/RecipeItem";
import Icon from "react-native-vector-icons/Ionicons";
import { TextInput, FlatList } from "react-native-gesture-handler";
export default function HomeScreen(props) {
  const [recipes, setRecipes] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const [hide, setHide] = useState(false);

  const { height, width } = Dimensions.get("window");

  const scrollY = useRef(new Animated.Value(0)).current;

  const endHeaderHeight = 50;
  const startHeaderHeight = 80;

  const animatedHeaderHeight = interpolate(scrollY, {
    inputRange: [0, 50],
    outputRange: [startHeaderHeight, endHeaderHeight],
    extrapolate: Extrapolate.CLAMP
  });

  const animatedOpacity = interpolate(animatedHeaderHeight, {
    inputRange: [endHeaderHeight, startHeaderHeight],
    outputRange: [0, 1],
    extrapolate: Extrapolate.CLAMP
  });

  const animatedOpacityHeader = interpolate(animatedHeaderHeight, {
    inputRange: [endHeaderHeight, startHeaderHeight],
    outputRange: [0.3, 0],
    extrapolate: Extrapolate.CLAMP
  });

  const animatedTagTop = interpolate(animatedHeaderHeight, {
    inputRange: [endHeaderHeight, startHeaderHeight],
    outputRange: [-30, 10],
    extrapolate: Extrapolate.CLAMP
  });

  const getRecipes = async () => {
    const response = await fetch("https://yeeeum.herokuapp.com/posts");
    const data = await response.json();
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
  }, []);

  // const showmethemoney = async () => {
  //   console.log(typeof (await AsyncStorage.getItem("user")));
  // };i

  const RecipeDetail = props => {
    return (
      <View style={styles.recipeDetail}>
        <Text>recipe details</Text>
        <TouchableOpacity
          onPress={() => props.navigation.navigate("DetailScreen")}
        >
          <Text>go to detail page</Text>
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
          <SafeAreaView style={styles.container}>
            <Animated.View style={styles.container}>
              <Animated.View
                style={{
                  height: animatedHeaderHeight,
                  marginBottom: 15,
                  marginTop: 8
                }}
              >
                <View style={styles.searchBar}>
                  <Icon
                    name="ios-search"
                    size={20}
                    style={styles.searchIcon}
                  ></Icon>
                  <TextInput
                    placeholder="Search your favorite recipes"
                    style={styles.searchInput}
                  ></TextInput>
                </View>

                <Animated.View
                  style={{
                    flexDirection: "row",
                    marginHorizontal: 25,
                    position: "relative",
                    top: animatedTagTop,
                    opacity: animatedOpacity
                  }}
                >
                  <View style={styles.category}>
                    <Text style={styles.catgeoryText}>Chicken</Text>
                  </View>
                  <View style={styles.category}>
                    <Text style={styles.catgeoryText}>Vegan</Text>
                  </View>
                </Animated.View>
              </Animated.View>

              <Animated.ScrollView
                scrollEventThrottle={16}
                onScroll={Animated.event([
                  {
                    nativeEvent: {
                      contentOffset: {
                        y: scrollY
                      }
                    }
                  }
                ])}
              >
                <View
                  style={{ flex: 1, paddingTop: 10, backgroundColor: "white" }}
                >
                  <Text style={styles.welcomeTitle}>
                    What can we help you find, {userInfo.username}?
                  </Text>

                  <View style={styles.flatlistContainer}>
                    <FlatList
                      horizontal={true}
                      showsHorizontalScrollIndicator={false}
                      renderItem={({ item: r }) => {
                        return (
                          <RecipeItem recipe={r} setHide={setHide}></RecipeItem>
                        );
                      }}
                      style={styles.flatlist}
                      data={recipes}
                      keyExtractor={(item, index) => index.toString()}
                    ></FlatList>
                  </View>

                  <View style={styles.discoverContainer}>
                    <Text style={styles.discoverHeader}>Hot off the grill</Text>
                    <Text style={styles.discoverSubHeader}>
                      A new way of discovering and loving your favorite recipes
                    </Text>

                    <View
                      style={{ width: width - 50, height: 200, marginTop: 20 }}
                    >
                      {recipes[0] && (
                        <Image
                          style={styles.discoverImage}
                          source={{
                            uri: `https://yeeeum.s3-us-west-1.amazonaws.com/${recipes[3].images[0].img_url}`
                          }}
                        ></Image>
                      )}
                    </View>
                  </View>
                </View>

                <View style={styles.worldContainer}>
                  <Text style={styles.worldHeader}>Food around the world</Text>

                  <View style={styles.worldCard}>
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
              </Animated.ScrollView>
            </Animated.View>
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
  flatlist: { flex: 1, paddingHorizontal: 15 },
  flatlistContainer: {
    height: 160,
    marginTop: 20,
    borderRadius: 5
  },
  welcomeTitle: { fontSize: 24, fontWeight: "700", paddingHorizontal: 25 },
  category: {
    minHeight: 20,
    minWidth: 40,
    padding: 5,
    borderRadius: 2,
    marginRight: 5
    // borderWidth: 0.2,
  },
  catgeoryText: { fontWeight: "700", fontSize: 10 },
  discoverContainer: { marginTop: 40, paddingHorizontal: 25 },
  discoverImage: {
    flex: 1,
    height: null,
    width: null,
    resizeMode: "cover",
    borderRadius: 5,
    paddingHorizontal: 29
  },
  discoverHeader: { fontSize: 24, fontWeight: "700" },
  discoverSubHeader: { fontWeight: "100", marginTop: 10 },
  worldHeader: { fontSize: 24, fontWeight: "700", paddingHorizontal: 25 },
  worldCard: {
    paddingHorizontal: 25,
    marginTop: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between"
  },
  worldContainer: { marginTop: 40 },
  searchBar: {
    flexDirection: "row",
    padding: 10,
    zIndex: 10,
    top: 5,
    backgroundColor: "white",
    marginHorizontal: 25,
    // shadowOffset: { width: 0, height: 0 },
    // shadowColor: "black",
    // shadowOpacity: 0.17,
    borderWidth: 1,
    borderColor: "#dddddd",
    borderRadius: 7,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3
  },
  searchIcon: { marginRight: 10, color: "grey" },
  searchInput: {
    flex: 1,
    fontWeight: "700",
    backgroundColor: "white",
    overflow: "hidden"
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
  recipeDetail: { fontWeight: "700", fontSize: 10 },
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
