import React from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  Dimensions
} from "react-native";
import StarRating from "react-native-star-rating";
import { ExpoLinksView } from "@expo/samples";

export default function Home(props) {
  return (
    <View
      style={{
        width: props.width / 2 - 30,
        height: props.width / 2
      }}
    >
      <View style={{ flex: 1 }}>
        <Image
          style={{
            flex: 1,
            height: null,
            width: null,
            resizeMode: "cover",
            borderRadius: 5
          }}
          source={{ uri: "https://picsum.photos/202/300" }}
        ></Image>
      </View>
      <View
        style={{
          flex: 1,
          alignItems: "flex-start",
          justifyContent: "space-evenly",
          marginBottom: 5
        }}
      >
        <Text style={{ fontSize: 10 }}>Chicken Katsu</Text>
        <Text style={{ fontSize: 12, fontWeight: "100" }}>{props.title}</Text>
        {/* <Text style={{ fontSize: 10, fontWeight: "100" }}>{props.author}</Text> */}
        <StarRating
          disable={true}
          maxStars={5}
          rating={props.rating}
          starSize={10}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff"
  }
});
