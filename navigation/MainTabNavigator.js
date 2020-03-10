import React from "react";
import { Platform, StyleSheet } from "react-native";
import { createStackNavigator } from "react-navigation-stack";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import Icons from "react-native-vector-icons/Ionicons";
import { Icon } from "native-base";
import {
  Image,
  SafeAreaView,
  Text,
  View,
  Dimensions,
  AsyncStorage,
  TouchableOpacity
} from "react-native";
import TabBarIcon from "../components/TabBarIcon";

import HomeScreen from "../screens/HomeScreen";
import LinksScreen from "../screens/LinksScreen";
import SettingsScreen from "../screens/SettingsScreen";
import ComposeScreen from "../screens/ComposeScreen";
import RecipeScreen from "../screens/RecipeScreen";
import Detail from "../screens/DetailsScreen.js";

import Colors from "../constants/Colors";

const config = Platform.select({
  web: { headerMode: "screen" },
  default: { headerMode: "screen" }
});

const composeConfig = Platform.select({
  web: { headerMode: "screen" },
  default: {}
});

const recipeConfig = Platform.select({
  web: { headerMode: "" }
});

const settingConfig = Platform.select({
  web: { headerMode: "screen" }
  // default: { headerMode: "none" }
});

const HomeStack = createStackNavigator(
  {
    Home: {
      screen: HomeScreen
    },
    Detail: {
      screen: Detail
    }
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
  settingConfig
);

SettingsStack.navigationOptions = {
  tabBarLabel: "Settings",
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
      name={Platform.OS === "ios" ? "ios-settings" : "md-settings"}
    />
  )
};

SettingsStack.path = "";

const ComposeStack = createStackNavigator(
  {
    Compose: ComposeScreen
  },
  config
);

ComposeStack.navigationOptions = {
  tabBarLabel: "Recipes",
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
      name={Platform.OS === "ios" ? "ios-setting" : "md-setting"}
    />
  )
};

ComposeStack.path = "";

const RecipeStack = createStackNavigator(
  {
    Recipe: {
      screen: RecipeScreen
    },
    Detail: {
      screen: Detail,
      navigationOptions: {
        headerMode: "none",
        // headerTransparent: true,
        headerStyle: { borderBottomWidth: 0 }
      }
    },
    Compose: {
      screen: ComposeScreen
    }
  },
  recipeConfig
);

RecipeStack.navigationOptions = {
  tabBarLabel: "Recipes",
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
      name={Platform.OS === "ios" ? "ios-list" : "md-list"}
    />
  )
};

RecipeStack.path = "";

const tabNavigator = createMaterialBottomTabNavigator(
  {
    HomeStack,
    LinksStack,
    RecipeStack,
    SettingsStack
    // ComposeStack
  },
  {
    animationEnabled: false,
    activeColor: "#007AFF",
    // inactiveColor: "#3e2465",
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
