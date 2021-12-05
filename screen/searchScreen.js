import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Modal,
  ScrollView,
  Image,
  LogBox 
} from "react-native";
import { SearchBar, ListItem, Avatar } from "react-native-elements";
import { Button } from "react-native-elements/dist/buttons/Button";
import { CheckBox } from "react-native-elements/dist/checkbox/CheckBox";
import Icon from "react-native-vector-icons/FontAwesome";
import firebase from "../database/firebaseDB";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {FontAwesome5} from "@expo/vector-icons";
LogBox.ignoreAllLogs();

function searchScreen({ navigation, route }) {
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

  const plantCollection = firebase.firestore().collection("plants");
  const [valueInStored, setValueInStored] = useState("");

  let userID = "";

  const getData = async () => {
    try {
      userID = await AsyncStorage.getItem("id");
    } catch (e) {
      // error reading value
      console.log(e);
    }
  };

  const getPlantCollection = (querySnapshot) => {
    const all_data = [];
    querySnapshot.forEach((res) => {
      all_data.push({
        key: res.id,
        name: res.data().name,
        image: res.data().image,
        type: res.data().type,
        category: res.data().category,
        season: res.data().season,
      });
    });
    setPlantCollection(all_data);
    setPlantCollectionForFilter(all_data);
  };

  useEffect(async () => {
    await getData();
    plantCollection.onSnapshot(getPlantCollection);
  }, []);

  const filterList = [
    { id: 1, name: "ประเภทกินใบ", checked: isLeaf, set: setLeaf },
    { id: 2, name: "ประเภทกินผล", checked: isFruit, set: setFruit },
    { id: 3, name: "ประเภทกินราก", checked: isRoot, set: setRoot },
    { id: 4, name: "ประเภทกินลำต้น", checked: isTrunk, set: setTrunk },
    { id: 5, name: "ประเภทกินเมล็ด", checked: isSeed, set: setSeed },

    { id: 6, name: "ผักพื้นบ้านหรือผักป่า", checked: isFloor, set: setFloor },
    {
      id: 7,
      name: "ผักสมุนไพร และเครื่องเทศ",
      checked: isIndia,
      set: setIndia,
    },
    { id: 8, name: "ผักสวนครัว", checked: isKitchen, set: setKitchen },

    { id: 9, name: "ฤดูหนาว", checked: isCool, set: setCool },
    { id: 10, name: "ฤดูร้อน", checked: isHot, set: setHot },
    { id: 11, name: "ฤดูฝน", checked: isRain, set: setRain },
  ];

  function checkType(type) {
    if (isTypeFlag=="") {
      return true
    }else {
      return type == isTypeFlag
    }
  }
  function checkCatagory(category) {
    if (isCategoryFlag=="") {
      return true
    }else
      return category.includes(isCategoryFlag)
  }
  function checkSeson(season) {
    if (isSeasonFlag=="") {
      return true
    }else{
      return season.includes(isSeasonFlag)
    }
  }
  function checkName(name, search) {
      return name.includes(search)
  }

  const filterSearch = () => {
    setModalVisible(false);

    /* ....ค้นหา filter.... */
    const typeArray = isPlantCollectionForFilter.filter((plant) => {
      return checkType(plant.type) && checkCatagory(plant.category) && checkSeson(plant.season)
    });
    setPlantCollection(typeArray);
  };

  const dataSearch = (search) => {
    const search_data = isPlantCollectionForFilter.filter((plant) => {
      return checkName(plant.name, search)
    });
    if(search == ""){
      setPlantCollection(isPlantCollectionForFilter);
    }else {
      setPlantCollection(search_data);
    }
  };

  const closeModal = () => {
    setModalVisible(!modalVisible);
    setTypeFlag("");
    setCategoryFlag("");
    setSeasonFlag("");
    setPlantCollection(isPlantCollectionForFilter);

  };

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
        <View style={{ width: "75%" }}>
          <SearchBar
            placeholder="ค้นหา..."
            onChangeText={(search) => {
              setSearch(search)
              dataSearch(search);
            }}
            value={search}
            round
            lightTheme
            autoCapitalize="none"
            containerStyle={[{ backgroundColor: "#8BBA8C" }]}
            platform="android"
            inputStyle={styles.inputStyle}
          />
        </View>
        <Pressable style={styles.filterButton}>
          <Button
            icon={<Icon name="filter" size={25} color="white" />}
            // เอาonPresออกมาอยู่ข้างนอกTag ICON เพราะว่าบางครั้งมันคลิ๊กโดนTag button แต่ไม่โดนTag Icon ก็เลยไม่ interantion
            onPress={() => setModalVisible(!modalVisible)}
          />
        </Pressable>

        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.modalView}>
            <View style={[{ alignSelf: "flex-end", paddingBottom: 0 }]}>
              <Button
                iconRight
                icon={
                  <Icon
                    name="times"
                    size={25}
                    color="black"
                    onPress={() => closeModal()}
                  />
                }
              />
            </View>
            <ScrollView style={{ width: "100%", height: "80%" }}>
              <View style={{alignSelf: "center" }}>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    alignSelf: "flex-start",
                  }}
                >
                  ชนิด
                </Text>
                {filterList.map((e) => {
                  if (e.name.includes("ผัก")) {
                    return (
                      <CheckBox
                        key={e.id}
                        checkedIcon="dot-circle-o"
                        uncheckedIcon="circle-o"
                        checked={isTypeFlag === e.name}
                        size={30}
                        title={e.name}
                        onPress={() => {
                          if (isTypeFlag == e.name) {
                            setTypeFlag("");
                          } else {
                            setTypeFlag(e.name);
                          }
                        }}
                        containerStyle={styles.checkBoxCon}
                        textStyle={{ fontSize: 20 , fontWeight: "normal"}}
                        checkedColor="#2C7B11"
                      />
                    );
                  }
                })}
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    alignSelf: "flex-start",
                  }}
                >
                  ประเภท
                </Text>
                {filterList.map((e) => {
                  if (e.name.includes("ประเภท")) {
                    return (
                      <CheckBox
                        key={e.id}
                        checkedIcon="dot-circle-o"
                        uncheckedIcon="circle-o"
                        checked={isCategoryFlag === e.name}
                        size={30}
                        title={e.name}
                        onPress={() => {
                          if (isCategoryFlag == e.name) {
                            setCategoryFlag("");
                          } else {
                            setCategoryFlag(e.name);
                          }
                        }}
                        containerStyle={styles.checkBoxCon}
                        textStyle={{ fontSize: 20, fontWeight: "normal" }}
                        checkedColor="#2C7B11"
                      />
                    );
                  }
                })}
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    alignSelf: "flex-start",
                  }}
                >
                  ฤดู
                </Text>
                {filterList.map((e) => {
                  if (e.name.includes("ฤดู")) {
                    return (
                      <CheckBox
                        key={e.id}
                        checkedIcon="dot-circle-o"
                        uncheckedIcon="circle-o"
                        checked={isSeasonFlag === e.name}
                        size={30}
                        title={e.name}
                        onPress={() => {
                          if (isSeasonFlag == e.name) {
                            setSeasonFlag("");
                          } else {
                            setSeasonFlag(e.name);
                          }
                        }}
                        containerStyle={styles.checkBoxCon}
                        textStyle={{ fontSize: 20, fontWeight: "normal" }}
                        checkedColor="#2C7B11"
                      />
                    );
                  }
                })}
              </View>
            </ScrollView>
            <Button
              title="ค้นหา"
              buttonStyle={styles.searchFilterBtn}
              onPress={filterSearch}
              titleStyle={{fontSize: 20}}
            />
          </View>
        </Modal>
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
                  navigation.navigate("info", {
                    userID: userID,
                    plantID: l.key,
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
    marginVertical: 5,
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

export default searchScreen;
