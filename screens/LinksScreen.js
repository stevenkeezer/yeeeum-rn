import React, { useRef, useState, useEffect } from "react";
import {
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  TouchableHighlight
} from "react-native";
import Animated from "react-native-reanimated";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import { SwipeListView } from "react-native-swipe-list-view";
import {
  Container,
  Header,
  Content,
  View,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Button,
  Icon,
  Left,
  Body,
  Right
} from "native-base";

const cards = [
  {
    text: "Card three",
    name: "One",
    image: require("../assets/images/robot-dev.png")
  },
  {
    text: "Card One",
    name: "One",
    image: require("../assets/images/logo.png")
  },
  {
    text: "Card Two",
    name: "One",
    image: require("../assets/images/robot-prod.png")
  }
];

export default function LinksScreen() {
  const [recipes, setRecipes] = useState();
  const scrollY = useRef(new Animated.Value(0)).current;

  const getRecipes = async () => {
    const response = await fetch("https://yeeeum.herokuapp.com/posts");
    const data = await response.json();

    if (data) {
      data.map((el, i) => {
        el["key"] = `${i}`;
      });
      setRecipes(data);
    }
  };

  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const deleteRow = (rowMap, rowKey) => {
    closeRow(rowMap, rowKey);
    const newData = [...recipes];
    const prevIndex = recipes.findIndex(item => item.key === rowKey);
    newData.splice(prevIndex, 1);
    setRecipes(newData);
  };

  const onRowDidOpen = rowKey => {
    console.log("This row opened", rowKey);
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
          <Left style={{ flex: 1 / 5, marginRight: 55 }}>
            <Image
              square
              large
              style={{ borderRadius: 5, height: 200, width: 200 }}
              source={{
                uri: `https://yeeeum.s3-us-west-1.amazonaws.com/${data.item.images[0].img_url}`
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
        onPress={() => deleteRow(rowMap, data.item.key)}
      >
        <Text style={styles.backTextWhite}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  useEffect(() => {
    getRecipes();
  }, []);
  return (
    <Container>
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
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1
  },
  backTextWhite: {
    color: "#FFF"
  },
  rowFront: {
    // alignItems: "center",
    paddingLeft: 13,
    backgroundColor: "#fff",
    borderBottomColor: "#D9D5DC",
    borderBottomWidth: 0.3,
    justifyContent: "center",
    height: 290
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
    width: 290
  },
  backRightBtnLeft: {
    backgroundColor: "#007AFF",
    right: 290
  },
  backRightBtnRight: {
    backgroundColor: "#d11a2a",
    right: 0
  }
});
