import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image
} from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import firebase from "../database/firebaseDB";
import {FontAwesome5} from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

function selectedList({ navigation, route }) {

  //////////////////////////////////////////////////////
  const [isPlantCollection, setPlantCollection] = useState([]);
  const [isPlantCollectionForFilter, setPlantCollectionForFilter] = useState([]);

  const userPlanCollection = firebase.firestore().collection("user-plant");
  let userID = "";

  const getData = async () => {
    try {
      userID = await AsyncStorage.getItem("id");
    } catch (e) {
      console.log(e);
    }
  };

  const getPlantCollection = (querySnapshot) => {
    const all_data = [];
    querySnapshot.forEach((res) => {
      if (res.data().user_id == userID)
        all_data.push({
          key: res.id,
          id: res.data().plant_id,
          name: res.data().name_plant,
          image: res.data().image,
          type: res.data().type_plant,
          category: res.data().category_plant,
          startDate: res.data().start_date,
          reciveDate: res.data().recive_date,
          
        });
    });
    setPlantCollection(all_data);
    setPlantCollectionForFilter(all_data);
  };

  useEffect(async () => {
    await getData()
    userPlanCollection.onSnapshot(getPlantCollection);
  }, []);

  return (
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
      <View style={styles.topPart}>
        <Text style={styles.headFont}>Your Plant</Text>
      </View>
      <View style={styles.midPart}>
        <ScrollView style={{ width: "100%", height: "75%" }}>
          {isPlantCollection.map((l, i) => (
            <View style={styles.plantBox}>
              <ListItem
                key={l + i}
                containerStyle={{
                  padding: 5,
                }}
                onPress={() =>
                  navigation.navigate("selectInfo", {
                    plantID: l.id,
                    user_plantID: l.key
                  })
                }
              >
                <Avatar size="large" source={{ uri: l.image }} />
                <ListItem.Content>
                  <ListItem.Title>{l.name}</ListItem.Title>
                  <ListItem.Subtitle>{l.type}</ListItem.Subtitle>
                </ListItem.Content>
              </ListItem>
            </View>
          ))}
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
  headFont: {
    fontSize: 50,
    fontWeight: "bold",
  },
  topPart: {
    marginTop: 10,
    flexWrap: "nowrap",
    flexDirection: "row",
    padding: 0,
    alignItems: "center",
  },
  midPart: {
    width: "80%",
    marginTop: 20,
    flexDirection: "column",
    alignItems: "center",
  },
  filterButton: {
    backgroundColor: "#2C7B11",
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    width: 40,
    borderRadius: 10,
  },
  inputStyle: {
    backgroundColor: "#EEEEEE",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginLeft: 5,
  },
  modalView: {
    margin: 20,
    backgroundColor: "#EEEEEE",
    borderRadius: 20,
    padding: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  checkBoxCon: {
    backgroundColor: "#EEEEEE",
    marginVertical: 10,
    padding: 0,
  },
  searchFilterBtn: {
    backgroundColor: "#2C7B11",
    borderRadius: 20,
    width: "50%",
    height: 50,
    alignSelf: "center",
    marginVertical: 5,
  },
  plantBox: {
    width: "100%",
    marginBottom: 15,
  },
});

export default selectedList;