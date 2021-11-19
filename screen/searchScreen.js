import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Modal,
  ScrollView,
  Alert,
} from "react-native";
import { SearchBar, ListItem, Avatar } from "react-native-elements";
import { Button } from "react-native-elements/dist/buttons/Button";
import { CheckBox } from "react-native-elements/dist/checkbox/CheckBox";
import Icon from "react-native-vector-icons/FontAwesome";
import firebase from "../database/firebaseDB";

function searchScreen() {
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
  const [isTypeFilter, setTypeFilter] = useState([]);
  const [isCategoryFilter, setCategoryFilter] = useState([]);
  const [isSeasonFilter, setSeasonFilter] = useState([]);
  const [isFlag, setFlag] = useState("");

  const plantCollection = firebase.firestore().collection("plants");
  const typeCollection = firebase.firestore().collection("filterType");
  const categoryCollection = firebase.firestore().collection("filterCategory");
  const seasonCollection = firebase.firestore().collection("filterSeason");

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

  const getTypeCollection = (querySnapshot) => {
    console.log("getTypeCollection");
    const filter_data = [];
    querySnapshot.forEach((res) => {
      filter_data.push({
        key: res.id,
        name: res.data().name,
        checked: res.data().checked,
      });
    });
    setTypeFilter(filter_data);
  };

  const getCategoryCollection = (querySnapshot) => {
    // console.log("getCategoryCollection");
    const filter_data = [];
    querySnapshot.forEach((res) => {
      filter_data.push({
        key: res.id,
        name: res.data().name,
        checked: res.data().checked,
      });
    });
    setCategoryFilter(filter_data);
  };

  const getSeasonCollection = (querySnapshot) => {
    // console.log("getSeasonCollection");
    const filter_data = [];
    querySnapshot.forEach((res) => {
      filter_data.push({
        key: res.id,
        name: res.data().name,
        checked: res.data().checked,
      });
    });
    setSeasonFilter(filter_data);
  };

  useEffect(() => {
    plantCollection.onSnapshot(getPlantCollection);
    // typeCollection.onSnapshot(getTypeCollection);
    // categoryCollection.onSnapshot(getCategoryCollection);
    // seasonCollection.onSnapshot(getSeasonCollection);
    // console.log(isTypeFilter)
    console.log("IN userEffect method");
    // console.log(isPlantCollection)
  }, []);

  /*... update ข้อมูลใน firebase(ในแต่ละ filterCillection) เพื่อเปลี่ยนสถานะในหน้า filter ...*/
  const toggleFilter = (key, name, checked, type) => {
    // console.log("toggle Filter")
    const updateSubjDoc = firebase.firestore().collection(type).doc(key);
    updateSubjDoc
      .set({
        name: name,
        checked: !checked,
      })
      .then(() => {});
  };

  const list = [
    {
      image:
        "https://i2.wp.com/www.plookphak.com/wp-content/uploads/2015/01/coriander-2.jpg?ssl=1",
      name: "ผักชี",
      type: "กินใบ, กินราก",
    },
    {
      image:
        "https://i2.wp.com/www.plookphak.com/wp-content/uploads/2015/01/coriander-2.jpg?ssl=1",
      name: "ผักชี",
      type: "กินใบ, กินราก",
    },
    {
      image:
        "https://i2.wp.com/www.plookphak.com/wp-content/uploads/2015/01/coriander-2.jpg?ssl=1",
      name: "ผักชี",
      type: "กินใบ, กินราก",
    },
    {
      image:
        "https://i2.wp.com/www.plookphak.com/wp-content/uploads/2015/01/coriander-2.jpg?ssl=1",
      name: "ผักชี",
      type: "กินใบ, กินราก",
    },
    {
      image:
        "https://i2.wp.com/www.plookphak.com/wp-content/uploads/2015/01/coriander-2.jpg?ssl=1",
      name: "ผักชี",
      type: "กินใบ, กินราก",
    },
    {
      image:
        "https://i2.wp.com/www.plookphak.com/wp-content/uploads/2015/01/coriander-2.jpg?ssl=1",
      name: "ผักชี",
      type: "กินใบ, กินราก",
    },
    {
      image:
        "https://i2.wp.com/www.plookphak.com/wp-content/uploads/2015/01/coriander-2.jpg?ssl=1",
      name: "ผักชี",
      type: "กินใบ, กินราก",
    },
    {
      image:
        "https://i2.wp.com/www.plookphak.com/wp-content/uploads/2015/01/coriander-2.jpg?ssl=1",
      name: "ผักชี",
      type: "กินใบ, กินราก",
    },
    {
      image:
        "https://i2.wp.com/www.plookphak.com/wp-content/uploads/2015/01/coriander-2.jpg?ssl=1",
      name: "ผักชี",
      type: "กินใบ, กินราก",
    },
    {
      image:
        "https://i2.wp.com/www.plookphak.com/wp-content/uploads/2015/01/coriander-2.jpg?ssl=1",
      name: "ผักชี",
      type: "กินใบ, กินราก",
    },
    {
      image:
        "https://i2.wp.com/www.plookphak.com/wp-content/uploads/2015/01/coriander-2.jpg?ssl=1",
      name: "ผักชี",
      type: "กินใบ, กินราก",
    },
    {
      image:
        "https://i2.wp.com/www.plookphak.com/wp-content/uploads/2015/01/coriander-2.jpg?ssl=1",
      name: "ผักชี",
      type: "กินใบ, กินราก",
    },
    {
      image:
        "https://i2.wp.com/www.plookphak.com/wp-content/uploads/2015/01/coriander-2.jpg?ssl=1",
      name: "ผักชี",
      type: "กินใบ, กินราก",
    },
  ];

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

  const filterSearch = () => {
    setModalVisible(false);
    /* ....ค้นหา filter.... */
    const plant = [...isPlantCollectionForFilter];
    const afterTypeKitchen = plant.filter((value, index) => {
      if (isKitchen) {
        return value.type == "ผักสวนครัว";
      }
    });
    const afterTypeFloor = plant.filter((value, index) => {
      if (isFloor) {
        return value.type == "ผักพื้นบ้านหรือผักป่า";
      }
    });
    const afterTypeIndia = plant.filter((value, index) => {
      if (isIndia) {
        return value.type == "ผักสมุนไพร และเครื่องเทศ";
      }
    });
    const arrayFilterType = [
      ...afterTypeKitchen,
      ...afterTypeFloor,
      ...afterTypeIndia,
    ];
    setPlantCollection(arrayFilterType);

    if (isFloor == false && isKitchen == false && isIndia == false) {
      setPlantCollection(isPlantCollectionForFilter);
    } else {
      const arrayFilterType = [
        ...afterTypeKitchen,
        ...afterTypeFloor,
        ...afterTypeIndia,
      ];
      setPlantCollection(arrayFilterType);
    }

    // filterList.map((item) => {
    //   return item.set(false);
    // })
  };

  const closeModal = () => {
    console.log("closeModal");
    setModalVisible(!modalVisible);
    filterList.map((item) => {
      return item.set(false);
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.topPart}>
        <View style={{ width: "75%" }}>
          <SearchBar
            placeholder="ค้นหา..."
            onChangeText={(search) => setSearch(search)}
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
            icon={
              <Icon
                name="filter"
                size={25}
                color="white"
                // onPress={() => setModalVisible(!modalVisible)}
              />
            }
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
                    onPress={() =>
                      // setModalVisible(!modalVisible)
                      closeModal()
                    }
                  />
                }
              />
            </View>
            <ScrollView style={{ width: "100%", height: "80%" }}>
              <View style={{ marginTop: 0, alignSelf: "flex-start" }}>
                {/*... render ข้อมูลมาจาก array ที่ดึงมาจาก firebase  ---- มีการmapข้อมูลมาจาก 3 array(แต่ละ filter type)...*/}
                <Text>ชนิด</Text>
                {filterList.map((e) => {
                  if (e.name.includes("ผัก")) {
                    return (
                      <CheckBox
                        key={e.id}
                        size={30}
                        title={e.name}
                        checked={e.checked}
                        onPress={() => {
                          // toggleFilter(e.key, e.name, e.checked, "filterType");
                          // e.checked = !e.checked
                          e.set(!e.checked);
                        }}
                        containerStyle={styles.checkBoxCon}
                        textStyle={{ fontSize: 20 }}
                        checkedColor="#2C7B11"
                      />
                    );
                  }
                })}
                <Text>ประเภท</Text>
                {filterList.map((e) => {
                  if (e.name.includes("ประเภท")) {
                    return (
                      <CheckBox
                        key={e.id}
                        size={30}
                        title={e.name}
                        checked={e.checked}
                        onPress={() => {
                          // toggleFilter(
                          //   e.key,
                          //   e.name,
                          //   e.checked,
                          //   "filterCategory"
                          // );
                          // toggleFilter(e.key, e.name, e.checked, "filterType");
                          // e.checked = !e.checked
                          e.set(!e.checked);
                        }}
                        containerStyle={styles.checkBoxCon}
                        textStyle={{ fontSize: 20 }}
                        checkedColor="#2C7B11"
                      />
                    );
                  }
                })}
                <Text>ฤดู</Text>
                {filterList.map((e) => {
                  if (e.name.includes("ฤดู")) {
                    return (
                      <CheckBox
                        key={e.key}
                        size={30}
                        title={e.name}
                        checked={e.checked}
                        onPress={() => {
                          // toggleFilter(e.key, e.name, e.checked, "filterSeason");
                          e.set(!e.checked);
                        }}
                        containerStyle={styles.checkBoxCon}
                        textStyle={{ fontSize: 20 }}
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
                }} /* onPress={() => {console.log(l.name);}} */
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
    marginTop: 70,
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

export default searchScreen;
