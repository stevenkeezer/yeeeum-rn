import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  ImageBackground,
  StyleSheet
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
  List
} from "native-base";

export default function DetailsScreen({ navigation }) {
  const recipe = navigation.state.params.data;
  const newrecipe = recipe.ingredients.map(i => {
    return {
      title: i.amount + " " + i.ingredient,
      content: i.ingredient
    };
  });

  return (
    <Container>
      <View style={{ flex: 1 }}>
        <ImageBackground
          source={{
            uri: `https://yeeeum.s3-us-west-1.amazonaws.com/${recipe.images[0].img_url}`
          }}
          style={styles.background}
        >
          <LinearGradient
            colors={[
              "rgba(0, 0, 0, .8)",
              "rgba(0,0,0,.01)",
              "rgba(0,0,0,.45)",
              "rgba(0, 0, 0, .7)"
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
      </View>

      <Tabs renderTabBar={() => <ScrollableTab />}>
        <Tab heading="Inents">
          <Content padder>
            <Accordion
              dataArray={newrecipe}
              style={{ backgroundColor: "white" }}
              icon="add"
              expandedIcon="remove"
              iconStyle={{ color: "green" }}
              expandedIconStyle={{ color: "red" }}
            />
          </Content>
        </Tab>
        <Tab heading="Direcns">
          <Content padder>
            <Text>{recipe.directions}</Text>
          </Content>
        </Tab>
      </Tabs>
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
  // headerTitle: <Text style={{ color: "white", fontSize: 18 }}>Test</Text>,
  // headerTransparent: true,
  // headerStyle: { borderBottomWidth: 0 },
  headerRight: (
    <Ionicons
      onPress={() => navigation.navigate("Compose")}
      name="ios-create"
      color="#007AFF"
      size={26}
      style={{ marginHorizontal: 15, backgroundColor: "white" }}
    />
  )
});
