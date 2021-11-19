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
import firebase from "../database/firebaseDB";

class Login extends Component {
  constructor() {
    super();
    // this.userCollection = firebase.firestore().collection("users");
    this.state = {
      key: "",
      fname: "",
      lname: "",
      email: "",
      picture: "",
    };
  }

  getCollection = (querySnapshot) => {
    querySnapshot.forEach( res => {
        if(res.id === this.state.key) return res.id
        const { firstname, lastname, picture, email } = res.data();
        this.setState({fname: firstname, lname: lastname, picture: picture, email: email})
        console.log("res: ", res.data());
        
    });
    // console.log("user: ", this.state.fname);
  };

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={{ width: 200, height: 200, marginBottom: "5%" }}
          source={require("../assets/favicon.png")}
        />

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
