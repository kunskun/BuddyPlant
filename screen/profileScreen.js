import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Input } from "react-native-elements";
import firebase from "../database/firebaseDB";
import { signInWithGoogleAsync } from "../googleLogin/singin";
import { FontAwesome5 } from "@expo/vector-icons";

class profileScreen extends Component {
  constructor(props) {
    super();
    this.state = {
      user_id: "",
      name: "",
      email: "",
      image: "",
      isLogin: false,
      localStorage: "",
      editProfile: false,
    };
  }

  async login() {
    await signInWithGoogleAsync();
    const userCollection = firebase.firestore().collection("users");
    await userCollection.onSnapshot(async (items) => {
      await this.getData();
      items.forEach((res) => {
        const { email, name, image, isLogin } = res.data();
        if (email === this.state.localStorage) {
          this.setState({
            user_id: res.id,
            name: name,
            email: email,
            image: image,
            isLogin: isLogin,
          });
        }
      });
    });
  }

  async logout() {
    const userCollection = firebase.firestore().collection("users");
    await userCollection.doc(this.state.user_id).update({
      isLogin: false,
    });
    this.removeValue();
    this.setState({
      user_id: "",
      name: "",
      email: "",
      image: "",
      isLogin: false,
      localStorage: "",
    });
  }

  async removeValue() {
    try {
      await AsyncStorage.removeItem("mail");
      await AsyncStorage.removeItem("id");
    } catch (e) {
      // remove error
    }
  }

  async getData() {
    try {
      const value = await AsyncStorage.getItem("mail");
      this.setState({
        localStorage: value,
      });
    } catch (e) {
      // error reading value
      console.log(e);
    }
  }

  async componentDidMount() {
    const userCollection = firebase.firestore().collection("users");
    this.unsubscribe = await userCollection.onSnapshot(async (items) => {
      await this.getData();
      items.forEach((res) => {
        const { email, name, image, isLogin } = res.data();
        if (email === this.state.localStorage) {
          this.setState({
            user_id: res.id,
            name: name,
            email: email,
            image: image,
            isLogin: isLogin,
          });
        }
      });
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  inputValue = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  };

  async updateName() {
    const userCollection = firebase.firestore().collection("users");
    await userCollection.doc(this.state.user_id).update({
      name: this.state.name,
    });
    this.setState({
      editProfile: !this.state.editProfile,
    });
  }

  render() {
    return (
      <ScrollView style={{ backgroundColor: "#8BBA8C" }}>
        <View style={styles.container}>
          {/* logo app */}

          <View style={{ marginTop: 35, width: "100%", alignItems: "center" }}>
            <View opacity={0.3}>
              <FontAwesome5 name="seedling" size={40} color="#ffffff" />
            </View>
            <View style={{ position: "absolute", top: 10 }}>
              <Image source={require("../assets/logoText.png")} />
            </View>
          </View>

          {/* content */}
          <Text style={styles.header}>Profile</Text>
          <View>
            {this.state.image ? (
              <Image
                source={{ uri: this.state.image }}
                style={styles.userImg}
              />
            ) : null}
          </View>
          <View style={{ alignItems: "flex-start", width: 275 }}>
            <Text style={styles.title}>Username</Text>
            {!this.state.editProfile ? (
              <Text style={styles.text}>{this.state.name}</Text>
            ) : (
              <>
                <Input
                  placeholder={this.state.name}
                  value={this.state.name}
                  onChangeText={(val) => this.inputValue(val, "name")}
                />
              </>
            )}

            <Text style={styles.title}>E-mail</Text>
            <Text style={styles.text}>{this.state.email}</Text>
          </View>
          <View style={{ width: 275, marginTop: "5%" }}>
            {!this.state.editProfile ? (
              <>
                <TouchableOpacity
                  style={styles.btn1}
                  onPress={() =>
                    this.setState({ editProfile: !this.state.editProfile })
                  }
                >
                  <Text style={styles.textBtn}>EDIT PROFILE</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.btn2}
                  onPress={() => {
                    this.logout();
                    this.props.navigation.navigate("Login");
                  }}
                >
                  <Text style={styles.textBtn}>LOGOUT</Text>
                </TouchableOpacity>
              </>
            ) : (
              <TouchableOpacity
                style={styles.btn2}
                onPress={() => this.updateName()}
              >
                <Text style={styles.textBtn}>SAVE</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#8BBA8C",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  header: {
    fontSize: 48,
    fontWeight: "bold",
    marginBottom: "10%",
  },
  title: {
    fontFamily: "Roboto",
    fontWeight: "bold",
    fontSize: 24,
  },
  text: {
    fontFamily: "Roboto",
    fontSize: 20,
  },
  btn1: {
    borderRadius: 50,
    overflow: "hidden",
    height: 45,
    backgroundColor: "#39864B",
    justifyContent: "center",
  },
  btn2: {
    borderRadius: 50,
    overflow: "hidden",
    height: 45,
    backgroundColor: "black",
    marginTop: "7%",
    justifyContent: "center",
  },
  btn3: {
    width: 275,
    borderRadius: 50,
    overflow: "hidden",
    height: 45,
    backgroundColor: "black",
    marginTop: "7%",
    justifyContent: "center",
  },
  textBtn: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  userImg: {
    width: 140,
    height: 140,
    marginRight: "3%",
    marginBottom: "3%",
    borderRadius: 20,
  },
});

export default profileScreen;
