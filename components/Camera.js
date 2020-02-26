import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { Camera } from "expo-camera";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {
  Container,
  Content,
  Header,
  Item,
  Icon,
  Input,
  Button
} from "native-base";

export default function CameraComponent() {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={{ flex: 1 }}>
      <Camera style={{ flex: 1, justifyContent: "space-between" }} type={type}>
        <View
          style={{
            flexDirection: "row",
            // flex: 4
            marginHorizontal: 10
          }}
        >
          <Icon name="logo-snapchat" style={{ color: "white", flex: 1 }}></Icon>
          <Icon
            name="ios-flash"
            style={{ color: "white", fontWeight: "bold", marginRight: 30 }}
          ></Icon>
          <View>
            <TouchableOpacity
              style={{
                flex: 4,
                alignSelf: "flex-end",
                alignItems: "center",
                marginRight: 15
              }}
              onPress={() => {
                setType(
                  type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                );
              }}
            >
              <Icon
                name="ios-reverse-camera"
                style={{ fontWeight: "bold", color: "white" }}
              ></Icon>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 10,
            marginBottom: 15,
            alignItems: "flex-end"
          }}
        >
          <MaterialCommunityIcons
            style={{ color: "white", fontSize: 36 }}
            name="message-reply"
          ></MaterialCommunityIcons>
          <View style={{ alignItems: "center" }}>
            <MaterialCommunityIcons
              style={{ color: "white", fontSize: 100 }}
              name="circle-outline"
            ></MaterialCommunityIcons>
            <Icon
              name="ios-images"
              style={{ color: "white", fontSize: 36 }}
            ></Icon>
          </View>
          <MaterialCommunityIcons
            style={{ color: "white", fontSize: 36 }}
            name="google-circles-communities"
          ></MaterialCommunityIcons>
        </View>
      </Camera>
    </View>
  );
}
