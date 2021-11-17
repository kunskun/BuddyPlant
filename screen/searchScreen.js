import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Modal,
  ScrollView,
} from "react-native";
import { SearchBar, ListItem, Avatar } from "react-native-elements";
import { Button } from "react-native-elements/dist/buttons/Button";
import { CheckBox } from "react-native-elements/dist/checkbox/CheckBox";
import Icon from "react-native-vector-icons/FontAwesome";

function searchScreen() {
  const [search, setSearch] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [isLeaf, setLeaf] = useState(false);
  const [isFruit, setFruit] = useState(false);
  const [isRoot, setRoot] = useState(false);

  const filterSearch = () => {
    setModalVisible(false);
    /* ....ค้นหา filter.... */
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
    { name: "พืชกินใบ", checked: isLeaf, set: setLeaf },
    { name: "พืชกินผล", checked: isFruit, set: setFruit },
    { name: "พืชกินราก", checked: isRoot, set: setRoot },
  ];

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
                onPress={() => setModalVisible(!modalVisible)}
              />
            }
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
                    onPress={() => setModalVisible(!modalVisible)}
                  />
                }
              />
            </View>
            <View style={{ marginTop: 0, alignSelf: "flex-start" }}>
              {filterList.map((e) => {
                return (
                  <CheckBox
                    size={30}
                    title={e.name}
                    checked={e.checked}
                    onPress={() => {
                      e.set(!e.checked);
                    }}
                    containerStyle={styles.checkBoxCon}
                    textStyle={{ fontSize: 20 }}
                    checkedColor="#2C7B11"
                  />
                );
              })}
            </View>
            <Button
              title="ค้นหา"
              buttonStyle={styles.searchFilterBtn}
              onPress={filterSearch}
            />
          </View>
        </Modal>
      </View>

      <View style={styles.midPart}>
        <ScrollView style={{width: "100%", height: "75%"}}>
          {list.map((l, i) => (
            <View style={styles.plantBox}>
              <ListItem key={l.name+i} containerStyle={{ padding: 5 }}     /* onPress={() => {console.log(l.name);}} */>
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
