import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
} from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import Image from "react-native-scalable-image";
import { FontAwesome5 } from '@expo/vector-icons';
import firebase from "../database/firebaseDB";
import AsyncStorage from "@react-native-async-storage/async-storage";

function searchScreen() {
  const [isNotiCollection, setNotiColletion] = useState([])
  const notificationDB = firebase.firestore().collection("notifications");

  let userID = ""

  const getData = async () => {
    try {
      userID = await AsyncStorage.getItem("id");
    } catch (e) {
      // error reading value
      console.log(e);
    }
  };

  function sortDate(all_data) {
    const sortData = all_data.sort((a, b) => {
      return b.date.toDate() - a.date.toDate()
    })
    return sortData
  }

  const getNotiCollection = (querySnapshot) => {
    var all_data = [];
    querySnapshot.forEach((res) => {
      if(res.data().user_id == userID)
      all_data.push({
        key: res.id,
        name: res.data().name,
        image: res.data().image,
        date: res.data().date,
        do: res.data().do,
      });
    });
    setNotiColletion( sortDate(all_data));
  };

  useEffect(async () => {
    await getData();
    notificationDB.onSnapshot(getNotiCollection);
  }, []);

  return (
    <View style={styles.container}>
      <View style={{ marginTop: 35, width: "100%", alignItems: "center" }}>
        <View opacity={0.3}>
          <FontAwesome5 name="seedling" size={40} color="#ffffff" />
        </View>
        <View style={{ position: "absolute", top: 10 }}>
          <Image source={require("../assets/logoText.png")} />
        </View>
      </View>
      <View style={styles.topPart}>
        <Text style={styles.headFont}>Notification</Text>
      </View>

      <View style={styles.box}>
        <ScrollView style={{ width: "100%" }}>
          <View style={{ alignItems: "center", marginBottom: 20 }}>
            {isNotiCollection.map((l, i) => (
              <View style={styles.card}>
                <ListItem
                  key={l.name + i}
                  containerStyle={{
                    padding: 5,
                    borderRadius: 20,
                    padding: 20,
                  }} 
                  onPress={() => {console.log(l.do+" "+l.name);}}
                >
                  <Avatar rounded size="medium" source={{ uri: l.image }} />
                  <ListItem.Content>
                    <ListItem.Subtitle style={{ fontSize: 25, color: "black" }}>
                      {l.do}
                    </ListItem.Subtitle>
                    <ListItem.Subtitle style={{ fontSize: 18, color: "black" }}>
                      {l.name} {"\n"}
                      เมื่อ {l.date.toDate().toDateString().slice(4)}
                    </ListItem.Subtitle>
                  </ListItem.Content>
                </ListItem>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#8BBA8C",
    alignItems: "center",
  },
  topPart: {
    marginTop: 10,
  },
  headFont: {
    fontSize: 50,
    fontWeight: "bold",
  },
  box: {
    marginTop: 20,
    backgroundColor: "#004400",
    width: "85%",
    height: "70%",
    flexDirection: "column",
    alignItems: "center",
  },
  card: {
    marginTop: 20,
    width: "85%",
  },
});

export default searchScreen;
