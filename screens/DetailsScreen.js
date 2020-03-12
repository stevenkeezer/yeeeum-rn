import React, { useRef, useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { interpolate, Extrapolate } from "react-native-reanimated";

import {
  View,
  TouchableOpacity,
  Text,
  Image,
  ImageBackground,
  StyleSheet,
  StatusBar
} from "react-native";
import {
  Container,
  Content,
  Header,
  Tab,
  Tabs,
  ScrollableTab,
  Accordion,
  Thumbnail,
  ListItem,
  List,
  Segment,
  Button
} from "native-base";

export default function DetailsScreen({ navigation }) {
  const recipe = navigation.state.params.data;

  const newrecipe = recipe.ingredients.map(i => {
    return {
      title: (
        <>
          <Text style={{}}>{i.amount + " "}</Text>
          <Text>{i.ingredient}</Text>
        </>
      )
      // content: i.ingredient
    };
  });

  const scrollY = useRef(new Animated.Value(0)).current;

  const endHeaderHeight = 0;
  const startHeaderHeight = 10;

  const animatedHeaderHeight = interpolate(scrollY, {
    inputRange: [-3, 0],
    outputRange: [startHeaderHeight, endHeaderHeight],
    extrapolate: Extrapolate.CLAMP
  });

  const animatedFlex = interpolate(animatedHeaderHeight, {
    inputRange: [endHeaderHeight, startHeaderHeight],
    outputRange: [1.3, 1],
    extrapolate: Extrapolate.CLAMP
  });

  // console.log(navigation.isFocused());
  // useEffect(() => {
  //   console.log(navigation.state.routeName);
  //   // StatusBar.setBarStyle("light-content", true);
  //   // return () => {
  //   //   // console.log("Do some cleanup");
  //   //   StatusBar.setBarStyle("dark-content", true);
  //   // };
  // }, [navigation.isFocused()]);

  return (
    <Container>
      <StatusBar barStyle="light-content" backgroundColor="#ecf0f1" />
      <Animated.View
        style={{
          flex: 1.3
        }}
      >
        <ImageBackground
          source={{
            uri: recipe.images[0]
              ? `https://yeeeum.s3-us-west-1.amazonaws.com/${recipe.images[0].img_url}`
              : "https://www.yeeeum.com/assets/img/food.png"
          }}
          style={styles.background}
        >
          <LinearGradient
            colors={[
              "rgba(0, 0, 0, .27)",
              "rgba(0,0,0, .40)",
              "rgba(0,0,0,.70)",
              "rgba(0, 0, 0, .83)"
            ]}
            style={styles.gradient}
          >
            <View
              style={{
                position: "absolute",
                borderRadius: 10,
                height: 70,
                bottom: 10,
                left: 20
              }}
            >
              <Text style={styles.title}>{recipe.title}</Text>
              <Text style={styles.username}>{recipe.user_name}</Text>
            </View>
          </LinearGradient>
        </ImageBackground>
      </Animated.View>
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          marginHorizontal: 20,
          paddingTop: 30,
          marginBottom: 20
        }}
      >
        Description
      </Text>
      <View
        style={{ backgroundColor: "#F8F8F8", marginBottom: 10, padding: 20 }}
      >
        <Text style={{}}>{recipe.description}</Text>
      </View>
      {/* <Tabs
        renderTabBar={() => (test
          <ScrollableTab style={{ backgroundColor: "white" }} />
        )}
      > */}
      {/* <Tab heading="Ingredients"> */}
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          marginHorizontal: 20,
          paddingTop: 10,
          marginBottom: 20
        }}
      >
        Ingredients
      </Text>
      <Animated.ScrollView
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
        <Accordion
          dataArray={newrecipe}
          headerStyle={{
            backgroundColor: "white",
            borderBottomWidth: 1.5,
            borderColor: "#dddddd",
            marginHorizontal: 5
          }}
          icon="add-circle"
          expandedIcon="remove-circle-outline"
          iconStyle={{ color: "darkgreen" }}
          expandedIconStyle={{ color: "red" }}
        />
      </Animated.ScrollView>
      {/* </Tab> */}
      {/* <Tab heading="Directions" style={{ backgroundColor: "red" }}> */}
      {/* <Content padder>
            <Text>{recipe.directions}</Text>
          </Content>
        </Tab>
      </Tabs> */}
    </Container>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "stretch",
    backgroundColor: "transparent"
  },
  gradient: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingVertical: 20,
    overflow: "visible",
    alignSelf: "stretch"
  },
  title: { fontSize: 25, fontWeight: "bold", color: "white" },
  username: {
    fontSize: 14,
    fontWeight: "bold",
    color: "white",
    textTransform: "uppercase"
  }
});

DetailsScreen.navigationOptions = ({ navigation }) => ({
  // header: null,
  headerTransparent: true,
  headerTintColor: "white",

  // headerTitle: <Text style={{ color: "white", fontSize: 18 }}>Test</Text>,
  // headerTransparent: true,
  // headerStyle: { borderBottomWidth: 0 },
  headerRight: (
    <Ionicons
      onPress={() => navigation.navigate("Compose")}
      name="ios-create"
      color="white"
      size={26}
      style={{ marginHorizontal: 15, backgroundColor: "transparent" }}
    />
  )
});
