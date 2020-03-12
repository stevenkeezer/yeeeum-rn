import React, { useEffect, useState } from "react";

import {
  View,
  AsyncStorage,
  StyleSheet,
  Dimensions,
  StatusBar
} from "react-native";

import {
  Container,
  Header,
  Content,
  Button,
  ListItem,
  Text,
  Icon,
  Left,
  Body,
  Right,
  Switch,
  Thumbnail,
  Separator
} from "native-base";

export default function SettingsScreen({ navigation }) {
  const [userInfo, setUserInfo] = useState({});

  const getUserInfo = async () => {
    const result = await AsyncStorage.getItem("user");
    const items = JSON.parse(result);
    // console.log(items.img_url);
    setUserInfo(items);
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  const uri = "https://facebook.github.io/react-native/docs/assets/favicon.png";
  const { width, height } = Dimensions.get("window");

  return (
    <Container style={{ backgroundColor: "#f0eff4" }}>
      <Content style={styles.container}>
        <View>
          <Text style={styles.header}>Settings</Text>
        </View>
        <ListItem last noIndent icon style={styles.listItemBig}>
          <Left>
            <Thumbnail large source={{ uri: uri }} />
          </Left>
          <Body>
            <Text>Hi {userInfo.username},</Text>
            <Text>Thanks for using Yeeeum</Text>
          </Body>
        </ListItem>
        <Separator bordered></Separator>
        <ListItem noIndent icon style={styles.listItem}>
          <Left>
            <Button style={{ backgroundColor: "green" }}>
              <Icon active name="airplane" />
            </Button>
          </Left>
          <Body>
            <Text>Dark Mode</Text>
          </Body>
          <Right>
            <Switch value={false} />
          </Right>
        </ListItem>
        <ListItem last noIndent icon style={styles.listItem}>
          <Left>
            <Button style={{ backgroundColor: "#007AFF" }}>
              <Icon active name="wifi" />
            </Button>
          </Left>
          <Body>
            <Text>Wi-Fi</Text>
          </Body>
          <Right>
            <Text>GeekyAnts</Text>
            <Icon active name="arrow-forward" />
          </Right>
        </ListItem>
        <Separator bordered>
          <Text></Text>
        </Separator>
        <ListItem noIndent icon style={styles.listItem}>
          <Left>
            <Button style={{ backgroundColor: "red" }}>
              <Icon active name="notifications" />
            </Button>
          </Left>
          <Body>
            <Text>Notifications</Text>
          </Body>
          <Right>
            <Icon active name="arrow-forward" />
          </Right>
        </ListItem>
        <ListItem icon style={{ backgroundColor: "white" }}>
          <Left>
            <Button style={{ backgroundColor: "green" }}>
              <Icon active name="notifications" />
            </Button>
          </Left>
          <Body>
            <Text>Data and Storage Usage</Text>
          </Body>
          <Right>
            <Icon active name="arrow-forward" />
          </Right>
        </ListItem>
        <ListItem noIndent icon style={styles.listItem}>
          <Left>
            <Button style={{ backgroundColor: "orange" }}>
              <Icon active name="heart" />
            </Button>
          </Left>
          <Body>
            <Text>Tell a Friend</Text>
          </Body>
          <Right>
            <Icon active name="arrow-forward" />
          </Right>
        </ListItem>

        <ListItem noIndent icon style={styles.listItem}>
          <Left style={{}}>
            <Button style={{ backgroundColor: "skyblue" }}>
              <Icon active name="question" />
            </Button>
          </Left>
          <Body>
            <Text>Help</Text>
          </Body>
          <Right>
            <Icon active name="arrow-forward" />
          </Right>
        </ListItem>
        <ListItem last noIndent icon style={styles.listItem}>
          <Left>
            <Button
              style={{
                backgroundColor: "#007AFF",
                borderBottomColor: "white"
              }}
            >
              <Icon active name="key" />
            </Button>
          </Left>
          <Body>
            <Text>Account</Text>
          </Body>
          <Right>
            <Icon active name="arrow-forward" />
          </Right>
        </ListItem>
        <Separator style={{ flex: 1 }}></Separator>
      </Content>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f0eff4"
  },
  listItemBig: {
    backgroundColor: "white",
    height: 100
  },
  listItem: {
    backgroundColor: "white"
  },
  header: {
    fontSize: 33,
    fontWeight: "bold",
    marginBottom: 5,
    marginHorizontal: 14,
    marginTop: 7
  }
});

SettingsScreen.navigationOptions = {
  // title: "Settings",
  // header: null,
  shadowColor: "transparent",

  headerStyle: {
    backgroundColor: "#f0eff4",
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 0
  }
};
