import React, { useEffect, useState } from "react";

import {
  Image,
  View,
  AsyncStorage,
  Text,
  TouchableOpacity
} from "react-native";

export default function SettingsScreen() {
  const [userInfo, setUserInfo] = useState({});

  const getUserInfo = async () => {
    const result = await AsyncStorage.getItem("user");
    const items = JSON.parse(result);
    console.log(items.img_url);
    setUserInfo(items);
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <View>
      <Image
        style={{
          height: 50,
          width: 50
        }}
        source={{
          uri: `https://yeeeum.s3-us-west-1.amazonaws.com/${userInfo.img_url}`
        }}
      ></Image>
      <Text>{userInfo.username}</Text>
      <TouchableOpacity>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

SettingsScreen.navigationOptions = {
  title: ""
};
