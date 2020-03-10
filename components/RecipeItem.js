import React from "react";
import {
  Image,
  Text,
  View,
  TouchableOpacity,
  Button,
  StyleSheet
} from "react-native";

export default function RecipeItem(props) {
  const pressHandler = () => {
    props.setHide(true);
  };

  return (
    <>
      <TouchableOpacity onPress={pressHandler}>
        <View style={styles.recipeContainer}>
          <View style={{ flex: 2 }}>
            <Image
              source={{
                uri: `https://yeeeum.s3-us-west-1.amazonaws.com/${props.recipe.images[0].img_url}`
              }}
              style={styles.recipeImage}
            />
          </View>
          <View style={styles.recipeTitle}>
            <Text>{props.recipe.title}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  recipeContainer: {
    height: 130,
    width: 130,
    marginLeft: 10,
    borderRadius: 15,
    shadowOffset: { width: 2, height: 2 },
    shadowColor: "black",
    backgroundColor: "white",
    shadowOpacity: 0.1
  },
  recipeImage: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: "cover",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15
  },
  recipeTitle: {}
});
