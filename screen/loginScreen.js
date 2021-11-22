import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  Button,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import { signInWithGoogleAsync } from "../googleLogin/singin";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function Login( {navigation  }) {
  // const [isLogin, setIsLogin] = useState(false);
  // const [valueInStored, setValueInStored] = useState('');

  // useEffect(async () => {
  //   await getData()

  //   if(valueInStored !== null) setIsLogin(true)
  //   else setIsLogin(false)
  //   console.log("useEffect LOgin Page " + valueInStored);
  // })

  const getData = async() => {
    try {
      const value = await AsyncStorage.getItem('mail')

      if(value !== null) setIsLogin(true)
      else setIsLogin(false) 

      setValueInStored(value);
      console.log("not null "+isLogin);
      console.log("val "+valueInStored);      
    } catch(e) {
      console.log(e);
    }
  }

    return (
      <View style={styles.container}>
        <View style={{ marginBottom: "5%" }}>
          <FontAwesome name="circle" size={230} color="#97ED7E" />
          <View style={{ position: "absolute", left: 15, top: 25 }}>
            <FontAwesome5 name="seedling" size={170} color="#234612" />
          </View>
        </View>

        <Image source={require("../assets/Buddy.png")} />
        <Image source={require("../assets/Plant.png")} />

        <TouchableOpacity
          style={styles.loginButton}
          onPress={async () => {
            await signInWithGoogleAsync();
            navigation.navigate("center");
          }}
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

