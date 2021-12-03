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
import Image from "react-native-scalable-image";
import { AntDesign, FontAwesome, Ionicons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';

function searchScreen() {
  const [search, setSearch] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [isLeaf, setLeaf] = useState(false);
  const [isFruit, setFruit] = useState(false);
  const [isRoot, setRoot] = useState(false);

  const notiList = [
    { name: "รดน้ำต้นไม้", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Circle-icons-water.svg/1024px-Circle-icons-water.svg.png" },
    { name: "รดน้ำต้นไม้", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Circle-icons-water.svg/1024px-Circle-icons-water.svg.png" },
    { name: "เก็บเกี่ยวผล", image: "https://cdn-icons-png.flaticon.com/512/1617/1617560.png" },
    { name: "รดน้ำต้นไม้", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Circle-icons-water.svg/1024px-Circle-icons-water.svg.png" },
    { name: "รดน้ำต้นไม้", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Circle-icons-water.svg/1024px-Circle-icons-water.svg.png" },
    { name: "รดน้ำต้นไม้", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Circle-icons-water.svg/1024px-Circle-icons-water.svg.png" },
    { name: "รดน้ำต้นไม้", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Circle-icons-water.svg/1024px-Circle-icons-water.svg.png" },

  ];

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
            {notiList.map((l, i) => (
              <View style={styles.card}>
                <ListItem
                  key={l.name + i}
                  containerStyle={{
                    padding: 5,
                    borderRadius: 20,
                    padding: 20,
                  }} 
                  onPress={() => {console.log(l.name);}}
                >
                  <Avatar rounded size="medium" source={{ uri: l.image }} />
                  <ListItem.Content>
                    <ListItem.Subtitle style={{ fontSize: 25, color: "black" }}>
                      {l.name}
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
