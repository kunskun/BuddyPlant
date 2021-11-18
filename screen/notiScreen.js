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

function searchScreen() {
  const [search, setSearch] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [isLeaf, setLeaf] = useState(false);
  const [isFruit, setFruit] = useState(false);
  const [isRoot, setRoot] = useState(false);

  const notiList = [
    { name: "ลดน้ำต้นไม้", image: "https://reactnative.dev/img/tiny_logo.png" },
    { name: "ลดน้ำต้นไม้", image: "https://reactnative.dev/img/tiny_logo.png" },
    { name: "ไบเบิล เยอบีราวิลเลจแฟรนไชส์ แคชเชียร์กีวีนายแบบโปรหม่านโถว ",
      image: "https://reactnative.dev/img/tiny_logo.png",
    },
    { name: "ลดน้ำต้นไม้", image: "https://reactnative.dev/img/tiny_logo.png" },
    { name: "ลดน้ำต้นไม้", image: "https://reactnative.dev/img/tiny_logo.png" },
    { name: "ลดน้ำต้นไม้", image: "https://reactnative.dev/img/tiny_logo.png" },
    { name: "ลดน้ำต้นไม้", image: "https://reactnative.dev/img/tiny_logo.png" },

  ];

  return (
    <View style={styles.container}>
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
    marginTop: 50,
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
