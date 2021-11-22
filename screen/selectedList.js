import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Modal,
  ScrollView,
  Alert,
  Image
} from "react-native";
import { SearchBar, ListItem, Avatar } from "react-native-elements";
import { Button } from "react-native-elements/dist/buttons/Button";
import { CheckBox } from "react-native-elements/dist/checkbox/CheckBox";
import Icon from "react-native-vector-icons/FontAwesome";
import firebase from "../database/firebaseDB";
import { AntDesign, FontAwesome, Ionicons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';


function selectedList({ navigation, route }) {
  const [search, setSearch] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [isLeaf, setLeaf] = useState(false);
  const [isFruit, setFruit] = useState(false);
  const [isRoot, setRoot] = useState(false);
  const [isTrunk, setTrunk] = useState(false);
  const [isSeed, setSeed] = useState(false);

  const [isFloor, setFloor] = useState(false);
  const [isIndia, setIndia] = useState(false);
  const [isKitchen, setKitchen] = useState(false);
  const [isCool, setCool] = useState(false);
  const [isRain, setRain] = useState(false);
  const [isHot, setHot] = useState(false);

  //////////////////////////////////////////////////////
  const [isPlantCollection, setPlantCollection] = useState([]);
  const [isPlantCollectionForFilter, setPlantCollectionForFilter] = useState(
    []
  );
  const [isTypeFlag, setTypeFlag] = useState("");
  const [isCategoryFlag, setCategoryFlag] = useState("");
  const [isSeasonFlag, setSeasonFlag] = useState("");

  const userPlanCollection = firebase.firestore().collection("user-plant");
  const userID = "f141AGHQqLVCRtYTXBPq";

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

  useEffect(() => {
    userPlanCollection.onSnapshot(getPlantCollection);
    console.log("IN userEffect method");
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
        <Text style={styles.headFont}>Selected List</Text>
      </View>
      <View style={styles.midPart}>
        <ScrollView style={{ width: "100%", height: "75%" }}>
          {isPlantCollection.map((l, i) => (
            <View style={styles.plantBox}>
              <ListItem
                key={l.name + i}
                containerStyle={{
                  padding: 5,
                }}
                onPress={() =>
                  navigation.navigate("selectInfo", {
                    userID: "f141AGHQqLVCRtYTXBPq",
                    plantID: l.id,
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
    borderWidth: 0.7,
    marginBottom: 15,
  },
});

export default selectedList;
