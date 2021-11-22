import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import {
  Button,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import { signInWithGoogleAsync } from "../googleLogin/singin";
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';


class Login extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{marginBottom: '5%'}}>
          <FontAwesome name="circle" size={230} color="#97ED7E" />
          <View style={{position: 'absolute', left: 15, top: 25}}>
            <FontAwesome5 name="seedling" size={170} color="#234612" />
          </View>
        </View>

        <Image source={require("../assets/Buddy.png")} />
        <Image source={require("../assets/Plant.png")} />

        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => signInWithGoogleAsync()}
        >
          <Image
            style={
              (styles.loginButton,
              { width: "100%", height: "100%", borderRadius: 10 })
            }
            source={require("../assets/googleLogin-white.png")}
          />
        </TouchableOpacity>

        <StatusBar style="auto" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#8BBA8C",
    alignItems: "center",
    justifyContent: "center",
  },
  loginButton: {
    width: "90%",
    height: "9%",
    borderRadius: 10,
    position: "absolute",
    bottom: "5%",
    alignItems: "center",
  },
  logo: {
    width: "50%",
    height: "30%",
    marginBottom: "5%",
  },
});

export default Login;
