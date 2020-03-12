import React, { Component, useState, useRef } from "react";
import {
  TextField,
  FilledTextField,
  OutlinedTextField
} from "react-native-material-textfield";
import { Dropdown } from "react-native-material-dropdown-v2";
import FabCompose from "../components/FabCompose";
import { Ionicons } from "@expo/vector-icons";
import { Formik, FieldArray } from "formik";
import Camera from "../components/Camera.js";
import { Container, Content } from "native-base";
import AutoScrollFlatList from "react-native-autoscroll-flatlist";
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel
} from "react-native-simple-radio-button";

import Swiper from "react-native-swiper";

import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
  Image,
  StyleSheet,
  Picker,
  AsyncStorage,
  FlatList
} from "react-native";
const { width, height } = Dimensions.get("window");
import { HeaderBackButton } from "react-navigation-stack";
import { setProvidesAudioData } from "expo/build/AR";

export default function ComposeScreen() {
  const [radio, setRadio] = useState({});
  const fieldRef = React.createRef();
  const fieldRef2 = React.createRef();

  const flatlist = React.createRef();

  const onSubmit = values => {
    let { current: field } = fieldRef;
    createPost(values);
  };

  const createPost = async input => {
    const user = await AsyncStorage.getItem("user");
    const token = JSON.parse(user).token;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      },
      body: JSON.stringify(input)
    };

    const response = await fetch(
      "https://yeeeum.herokuapp.com/post_recipe",
      options
    );
    const data = await response.json();
    if (data) {
      console.log("sucess", data);
    }
  };

  // const createPost = async data => {
  // const options = {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //     Authorization: `Token ${localStorage.getItem("token")}`
  //   },
  //   body: JSON.stringify(data)
  // };
  //   const resp = await fetch(
  //     process.env.REACT_APP_BURL + "post_recipe",
  //     options
  //   );
  //   if (resp.ok) {
  //     const data = await resp.json();
  //     if (data.status) {
  //       if (fileAdded) {
  //       } else {
  //         history.push("/upload_files");
  //       }
  //     }
  //   }
  // };

  const formatText = text => {
    // return text.replace(/[^+\d]/g, "");
    return text;
  };

  let data = [
    {
      value: "Easy"
    },
    {
      value: "Medium"
    },
    {
      value: "Hard"
    }
  ];

  var radio_props = [
    { label: "Easy", value: 0 },
    { label: "Medium", value: 1 },
    { label: "Hard", value: 1 }
  ];

  const createIngredient = () => ({
    amount: "",
    ingredient: ""
  });

  return (
    <>
      <Container>
        <Content showsVerticalScrollIndicator={false} style={{}}>
          <ImageBackground
            source={require("../assets/images/food.png")}
            style={{
              position: "absolute",
              flex: 1,
              width: "100%",
              height: "100%"
            }}
            imageStyle={{ resizeMode: "repeat" }}
          ></ImageBackground>
          <Swiper loop={false} showsPagination={false} index={0}>
            <View style={{ flex: 1 }}>
              <Formik
                initialValues={{
                  ingredients: [
                    { amount: "", ingredient: "" },
                    { amount: "", ingredient: "" }
                  ],
                  title: "",
                  directions: "",
                  description: ""
                }}
                onSubmit={values => onSubmit(values)}
              >
                {({
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  values,
                  arrayHelpers,
                  setFieldValue
                }) => (
                  <View style={{ height: height - height / 4 }}>
                    <View style={{ flexDirection: "row", marginHorizontal: 8 }}>
                      <View style={{ flex: 1, marginTop: 10 }}>
                        <FilledTextField
                          label="Title"
                          lineWidth={0}
                          inputContainerStyle={styles.inputContainer}
                          borderColor="white"
                          formatText={formatText}
                          onSubmitEditing={onSubmit}
                          characterRestriction={140}
                          ref={fieldRef}
                          tintColor="#0aa287"
                          fontSize={16}
                          onChangeText={handleChange("title")}
                          onBlur={handleBlur("title")}
                        />
                        <FilledTextField
                          label="Description"
                          formatText={formatText}
                          lineWidth={0}
                          inputContainerStyle={styles.inputContainer}
                          onSubmitEditing={onSubmit}
                          ref={fieldRef2}
                          tintColor="#0aa287"
                          multiline={true}
                          fontSize={16}
                          borderColor="white"
                          onChangeText={handleChange("description")}
                          onBlur={handleBlur("description")}
                        />
                      </View>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        // justifyContent: "center",
                        // alignItems: "center",
                        padding: 8
                        // paddingBottom: 10
                      }}
                    >
                      <Ionicons size={20} name="ios-list-box"></Ionicons>
                      <Text
                        style={{
                          fontWeight: "700",
                          fontSize: 16,
                          marginLeft: 5
                        }}
                      >
                        Ingredient list
                      </Text>
                    </View>
                    <AutoScrollFlatList
                      threshold={0}
                      isAutoScrolling={true}
                      showsHorizontalScrollIndicator={false}
                      renderItem={({ item: ingredient, index }) => {
                        return (
                          <View style={{ flexDirection: "row" }}>
                            <View style={{ flex: 0.5 }}>
                              <FilledTextField
                                // label="Amount"
                                style={{ borderRadius: 50 }}
                                lineWidth={0}
                                inputContainerStyle={{
                                  backgroundColor: "#ffffff",
                                  shadowOffset: { width: 2, height: 2 },
                                  shadowColor: "black",
                                  shadowOpacity: 0.2,
                                  borderBottomLeftRadius: 5,
                                  borderBottomRightRadius: 5,
                                  borderTopLeftRadius: 5,
                                  borderTopRightRadius: 5,
                                  height: 45
                                }}
                                formatText={formatText}
                                // onSubmitEditing={onSubmit}
                                ref={fieldRef}
                                tintColor="#0aa287"
                                fontSize={16}
                                onChangeText={handleChange(
                                  `ingredients[${index}].amount`
                                )}
                                onBlur={handleBlur(
                                  `ingredients[${index}].amount`
                                )}
                              />
                            </View>

                            <View style={{ flex: 1 }}>
                              <FilledTextField
                                // label={"Ingredient"}
                                formatText={formatText}
                                // onSubmitEditing={onSubmit}
                                lineWidth={0}
                                inputContainerStyle={{
                                  backgroundColor: "white",
                                  shadowOffset: { width: 2, height: 2 },
                                  shadowColor: "black",
                                  shadowOpacity: 0.2,
                                  borderBottomLeftRadius: 5,
                                  borderBottomRightRadius: 5,
                                  borderTopLeftRadius: 5,
                                  borderTopRightRadius: 5,
                                  height: 45,
                                  marginLeft: 8
                                }}
                                ref={fieldRef2}
                                tintColor="#0aa287"
                                fontSize={16}
                                onChangeText={handleChange(
                                  `ingredients[${index}].ingredient`
                                )}
                                onBlur={handleBlur(
                                  `ingredients[${index}].ingredient`
                                )}
                              />
                              <TouchableOpacity
                                style={{
                                  position: "absolute",
                                  top: 3,
                                  right: 1,
                                  width: 49
                                }}
                              >
                                <Ionicons
                                  name="ios-remove-circle-outline"
                                  size={25}
                                  style={{
                                    color: "#999999",
                                    // marginLeft: 10,

                                    marginTop: 9,
                                    left: 13
                                  }}
                                  onPress={() => {
                                    setFieldValue("ingredients", [
                                      ...values.ingredients.splice(
                                        1,
                                        values.ingredients.length - 1
                                      )
                                    ]);
                                  }}
                                ></Ionicons>
                              </TouchableOpacity>
                            </View>
                          </View>
                        );
                      }}
                      data={values.ingredients}
                      keyExtractor={(item, index) => index.toString()}
                    ></AutoScrollFlatList>
                    <View style={{ flexDirection: "row" }}>
                      <TouchableOpacity
                        onPress={() =>
                          setFieldValue("ingredients", [
                            ...values.ingredients,
                            createIngredient()
                          ])
                        }
                        title="Submit"
                      >
                        <View style={styles.submitBtnContainer}>
                          <Ionicons
                            size={28}
                            style={{ color: "#00a287" }}
                            name="ios-add-circle-outline"
                          ></Ionicons>
                          <Text style={{ color: "white" }}>Add Ingredient</Text>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={handleSubmit} title="Submit">
                        <View style={styles.submitBtnContainer}>
                          <Ionicons
                            size={28}
                            style={{ color: "white" }}
                            name="ios-add-circle-outline"
                          ></Ionicons>
                          <Text style={{ color: "white" }}> Submit</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              </Formik>
            </View>

            <Camera></Camera>
          </Swiper>
        </Content>
      </Container>
    </>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    backgroundColor: "white",
    shadowOffset: { width: 2, height: 2 },
    shadowColor: "black",
    shadowOpacity: 0.2,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    height: 50
  },
  submitBtnContainer: {
    borderRadius: 4,
    borderWidth: 0.5,
    backgroundColor: "#00a287",
    borderColor: "#00a287",
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
    marginTop: 10,
    shadowOffset: { width: 0, height: 0 },
    shadowColor: "black",
    shadowOpacity: 0.37,
    marginHorizontal: 8
  }
});

const startCamera = () => {
  console.log("hi");
};

ComposeScreen.navigationOptions = ({ navigation }) => ({
  title: "New Recipe",

  headerRight: (
    <Ionicons
      onPress={() => startCamera()}
      name="ios-camera"
      color="#007AFF"
      size={28}
      style={{ marginHorizontal: 20 }}
    />
  )
});
