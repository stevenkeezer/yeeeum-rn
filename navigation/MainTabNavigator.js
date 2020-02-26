import React from "react";
import { Platform, StyleSheet } from "react-native";
import { createStackNavigator } from "react-navigation-stack";
import {} from "react-navigation-tabs";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import Icons from "react-native-vector-icons/Ionicons";
import TabBarIcon from "../components/TabBarIcon";

import HomeScreen from "../screens/HomeScreen";
import LinksScreen from "../screens/LinksScreen";
import SettingsScreen from "../screens/SettingsScreen";
import ComposeScreen from "../screens/ComposeScreen";

import Colors from "../constants/Colors";

const config = Platform.select({
  web: { headerMode: "screen" },
  default: { headerMode: "none" }
});

const composeConfig = Platform.select({
  web: { headerMode: "screen" },
  default: {}
});

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen
  },
  config
);

HomeStack.navigationOptions = {
  tabBarLabel: "Search",
  animationEnabled: false,
  tabBarOptions: {
    activeTintColor: "Colors.tintColor",
    showIcon: true,
    labelStyle: {
      fontSize: 10,
      margin: 0,
      padding: 0
    },
    style: {
      backgroundColor: "#ffffff",
      borderTopWidth: 0.4,
      borderTopColor: "grey"
    },
    indicatorStyle: {
      height: 0
    }
  },
  barStyle: { backgroundColor: "#ffffff" },

  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-search" : "md-search"}
    />
  )
};

HomeStack.path = "";

const LinksStack = createStackNavigator(
  {
    Links: LinksScreen
  },
  config
);

LinksStack.navigationOptions = {
  tabBarLabel: "Links",
  animationEnabled: false,
  headerMode: "none",
  tabBarOptions: {
    activeTintColor: Colors.tintColor,
    showIcon: true,
    labelStyle: {
      fontSize: 10,
      margin: 0,
      padding: 0
    },
    style: {
      backgroundColor: "#ffffff",
      borderTopWidth: 0.4,
      borderTopColor: "grey"
    },
    indicatorStyle: {
      height: 0
    }
  },
  barStyle: { backgroundColor: "#ffffff" },
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-heart" : "md-heart"}
    />
  )
};

LinksStack.path = "";

const SettingsStack = createStackNavigator(
  {
    Settings: SettingsScreen
  },
  config
);

SettingsStack.navigationOptions = {
  tabBarLabel: "Profile",
  tabBarOptions: {
    labelStyle: {
      fontSize: 10,
      margin: 0,
      padding: 0
    },
    showIcon: true,
    activeTintColor: Colors.tintColor,
    style: {
      backgroundColor: "#ffffff",
      borderTopWidth: 0.4,
      borderTopColor: "grey"
    },
    indicatorStyle: {
      height: 0
    }
  },
  barStyle: { backgroundColor: "#ffffff" },

  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-person" : "md-person"}
    />
  )
};

SettingsStack.path = "";

const ComposeStack = createStackNavigator(
  {
    Compose: ComposeScreen
  },
  composeConfig
);

ComposeStack.navigationOptions = {
  tabBarLabel: "Compose",
  animationEnabled: false,
  tabBarOptions: {
    activeTintColor: "Colors.tintColor",
    showIcon: true,
    labelStyle: {
      fontSize: 10,
      margin: 0,
      padding: 0
    },
    style: {
      backgroundColor: "#ffffff",
      borderTopWidth: 0.4,
      borderTopColor: "grey"
    },
    indicatorStyle: {
      height: 0
    },
    label: { fontSize: 2 }
  },
  barStyle: { backgroundColor: "#ffffff" },

  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-create" : "md-create"}
    />
  )
};

ComposeStack.path = "";

const tabNavigator = createMaterialBottomTabNavigator(
  {
    HomeStack,
    LinksStack,
    SettingsStack,
    ComposeStack
  },
  {
    animationEnabled: false,
    activeColor: "#f25925",
    inactiveColor: "#3e2465",
    shifting: true,
    tabBarPosition: "bottom",
    tabBarOptions: {
      showIcon: true,
      style: {
        backgroundColor: "#fffff",
        borderTopWidth: 0.5,
        borderTopColor: "#ccc"
      }
    }
  }
);

tabNavigator.path = "";

export default tabNavigator;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  icon: {
    paddingLeft: 10
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: 120
  }
});
