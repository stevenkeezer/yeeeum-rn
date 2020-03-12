import React, { useState, useEffect, useRef } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { SwipeListView } from "react-native-swipe-list-view";
import SpinnerComponent from "../components/SpinnerComponent";
import ConfirmDelete from "../components/ConfirmDelete";
import Animated, { interpolate, Extrapolate } from "react-native-reanimated";
import {
  Alert,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  View,
  Dimensions,
  AsyncStorage,
  SafeAreaView,
  StatusBar
} from "react-native";

import {
  Text,
  Icon,
  Left,
  Thumbnail,
  Item,
  Input,
  Button,
  ListItem,
  Right
} from "native-base";

const { width, height } = Dimensions.get("window");

export default function RecipeScreen(props) {
  const [recipes, setRecipes] = useState([]);

  const scrollY = useRef(new Animated.Value(0)).current;

  const endHeaderHeight = 0;
  const startHeaderHeight = 105;

  const animatedHeaderHeight = interpolate(scrollY, {
    inputRange: [0, 50],
    outputRange: [startHeaderHeight, endHeaderHeight],
    extrapolate: Extrapolate.CLAMP
  });

  const animatedHeaderHeightShort = interpolate(scrollY, {
    inputRange: [0, 10],
    outputRange: [startHeaderHeight, endHeaderHeight],
    extrapolate: Extrapolate.CLAMP
  });

  const animatedOpacity = interpolate(animatedHeaderHeight, {
    inputRange: [endHeaderHeight, startHeaderHeight],
    outputRange: [0, 1],
    extrapolate: Extrapolate.CLAMP
  });

  const animatedOpacitySearch = interpolate(animatedHeaderHeightShort, {
    inputRange: [endHeaderHeight, startHeaderHeight],
    outputRange: [0, 1],
    extrapolate: Extrapolate.CLAMP
  });

  const animatedTagTop = interpolate(animatedHeaderHeight, {
    inputRange: [endHeaderHeight, startHeaderHeight],
    outputRange: [-30, 10],
    extrapolate: Extrapolate.CLAMP
  });

  const getRecipes = async () => {
    try {
      const response = await fetch("https://yeeeum.herokuapp.com/posts");
      const data = await response.json();

      if (data) {
        data.map((el, i) => {
          el["key"] = `${i}`;
        });
        setRecipes(data);
      }
    } catch (error) {
      getRecipes();
    }
  };

  const deleteRecipe = async id => {
    const recipeId = {
      recipe_id: id
    };

    const user = await AsyncStorage.getItem("user");
    const token = JSON.parse(user).token;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      },
      body: JSON.stringify(recipeId)
    };
    const response = await fetch(
      "https://yeeeum.herokuapp.com/delete_recipe",
      options
    );
    if (response.ok) {
      const data = await response.json();
      console.log("data", data);
    }
  };

  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const deleteRow = (rowMap, rowKey, id) => {
    Alert.alert("Delete Recipe", "Do you want to remove this recipe?", [
      {
        text: "No",
        onPress: () => closeRow(rowMap, rowKey),
        style: "cancel"
      },
      {
        text: "Yes",
        onPress: () => {
          closeRow(rowMap, rowKey);
          const newData = [...recipes];
          const prevIndex = recipes.findIndex(item => item.key === rowKey);
          newData.splice(prevIndex, 1);
          setRecipes(newData);
          deleteRecipe(id);
        }
      }
    ]);
    // propmt with confirmation
  };

  const onRowDidOpen = rowKey => {
    // console.log("This row opened", rowKey);
  };

  const renderItem = data => (
    <TouchableHighlight
      onPress={() => {
        props.navigation.navigate("Detail", {
          data: data.item,
          otherParam: "anything you want here"
        });
      }}
      style={styles.rowFront}
      underlayColor={"#AAA"}
    >
      <View>
        <View style={{ flexDirection: "row" }}>
          <Left style={{ flex: 1 / 5, marginRight: 45 }}>
            <Thumbnail
              square
              large
              style={{ borderRadius: 5 }}
              source={{
                uri: data.item.images[0]
                  ? `https://yeeeum.s3-us-west-1.amazonaws.com/${data.item.images[0].img_url}`
                  : "https://www.yeeeum.com/assets/img/food.png"
              }}
            />
          </Left>
          <Left style={{ flex: 1 }}>
            <Text style={{ fontWeight: "bold" }}>{data.item.title}</Text>
            <Text numberOfLines={1} style={{ fontSize: 10, width: 190 }}>
              {data.item.description}
            </Text>
          </Left>
        </View>
      </View>
    </TouchableHighlight>
  );

  const renderHiddenItem = (data, rowMap) => (
    <View style={styles.rowBack}>
      <Text>Copy</Text>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnLeft]}
        onPress={() => closeRow(rowMap, data.item.key)}
      >
        <Text style={styles.backTextWhite}>Close</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnRight]}
        onPress={() => deleteRow(rowMap, data.item.key, data.item.id)}
      >
        <Text style={styles.backTextWhite}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  useEffect(() => {
    getRecipes();
  }, []);

  return (
    <SafeAreaView style={{ marginTop: 70 }}>
      <Animated.View
        style={{
          top: animatedTagTop,
          marginHorizontal: 14,
          backgroundColor: "white",
          height: animatedHeaderHeight
        }}
      >
        <Text style={styles.headerTitle}>Recipes</Text>
        <Item regular style={styles.searchContainer}>
          <Animated.View
            style={{
              flex: 1,
              marginTop: 10,
              flexDirection: "row",
              opacity: animatedOpacitySearch
            }}
          >
            <Icon name="ios-search" style={styles.searchIcon} />
            <Input
              placeholder="Search"
              style={styles.input}
              placeholderTextColor="#9e9e9e"
            />
          </Animated.View>
        </Item>
      </Animated.View>
      <Animated.View
        style={{
          flexDirection: "row",
          marginHorizontal: 7,
          backgroundColor: "white",
          marginTop: animatedTagTop
        }}
      >
        <Right>
          <View style={styles.subButtonContainer}>
            <Left>
              <Button style={styles.buttonListView} iconLeft light>
                {/* <Icon
                style={{ fontSize: 20, color: "#007AFF" }}
                name="ios-heart-empty"
              /> */}
                <Text
                  style={{ color: "#007AFF", paddingLeft: 12, fontSize: 17 }}
                >
                  List View
                </Text>
              </Button>
            </Left>
            {/* <Button style={styles.button} iconLeft light>
              <Icon
                style={{ fontSize: 20, color: "#007AFF" }}
                name="ios-list"
              />
              <Text style={{ color: "#007AFF", paddingLeft: 12 }}></Text>
            </Button> */}
            <Right>
              <Button style={styles.button} iconLeft light>
                {/* <Icon
                style={{ fontSize: 20, color: "#007AFF" }}
                name="ios-heart-empty"
              /> */}
                <Text
                  style={{ color: "#007AFF", paddingLeft: 12, fontSize: 17 }}
                >
                  Composed (2)
                </Text>
              </Button>
            </Right>

            {/* <Button
              style={styles.button}
              icon={
                <Ionicons name="ios-heart-empty" style={styles.icon}>
                  17
                </Ionicons>
              }
            ></Button> */}
          </View>
        </Right>
      </Animated.View>

      {recipes.length === 0 ? (
        <SpinnerComponent />
      ) : (
        <Animated.ScrollView
          style={{ marginHorizontal: 4 }}
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
          <SwipeListView
            data={recipes}
            renderItem={renderItem}
            renderHiddenItem={renderHiddenItem}
            leftOpenValue={75}
            rightOpenValue={-150}
            previewRowKey={"0"}
            previewOpenValue={-40}
            previewOpenDelay={1000}
            onRowDidOpen={onRowDidOpen}
          />
        </Animated.ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    // flex: 1
    position: "absolute"
    // marginTop: 14s
  },
  header: {},
  backTextWhite: {
    color: "#FFF"
  },
  searchIcon: { fontSize: 20, color: "grey" },
  searchContainer: {
    borderRadius: 10,
    backgroundColor: "#eaeaea",
    borderColor: "white",
    height: 40,
    justifyContent: "center",
    alignSelf: "center"
  },
  button: { backgroundColor: "white", height: 30 },
  buttonListView: {
    justifyContent: "center",
    height: 30,
    backgroundColor: "white"
  },
  headerTitle: {
    fontSize: 33,
    marginTop: 15,
    fontWeight: "bold",
    marginBottom: 10,
    marginHorizontal: 1
  },
  subButtonContainer: {
    flexDirection: "row",
    marginTop: 12
  },
  input: { fontSize: 18, marginLeft: -3, marginTop: -16 },
  icon: {
    color: "#007AFF",
    marginHorizontal: 6,
    fontSize: 18
  },
  listView: {
    color: "#007AFF",
    fontSize: 18,
    marginHorizontal: 3,
    paddingTop: 10,
    paddingBottom: 10
  },
  rowFront: {
    paddingLeft: 13,
    backgroundColor: "#fff",
    borderBottomColor: "#dddddd",
    borderTopColor: "white",
    borderTopWidth: 0.3,
    borderBottomWidth: 0.3,
    justifyContent: "center",
    height: 113
  },
  rowBack: {
    alignItems: "center",
    backgroundColor: "#DDD",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 15
  },
  backRightBtn: {
    alignItems: "center",
    bottom: 0,
    justifyContent: "center",
    position: "absolute",
    top: 0,
    width: 75
  },
  backRightBtnLeft: {
    backgroundColor: "rgba(142,142,147, 1)",
    right: 75
  },
  backRightBtnRight: {
    backgroundColor: "#FC3D39",
    right: 0
  }
});

const startCompose = () => {
  console.log("compose");
};

RecipeScreen.navigationOptions = ({ navigation }) => {
  return {
    headerStyle: { borderBottomWidth: 0, backgroundColor: "white" },
    headerTransparent: true,
    headerRight: (
      <Button
        style={{ backgroundColor: "white" }}
        onPress={() => navigation.navigate("Compose")}
      >
        <Ionicons
          name="ios-create"
          color="#007AFF"
          size={26}
          style={{ marginHorizontal: 15, backgroundColor: "white" }}
        />
      </Button>
    ),
    headerLeft: (
      <Text
        onPress={startCompose}
        name="ios-search"
        color="#007AFF"
        style={{ fontSize: 18, marginHorizontal: 16, color: "#007AFF" }}
      >
        Edit
      </Text>
    )
  };
};
