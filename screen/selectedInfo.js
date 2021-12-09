import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Modal,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  TextInput,
} from "react-native";

import { Header, Icon } from "react-native-elements";
import { Button } from "react-native-elements/dist/buttons/Button";
import Image from "react-native-scalable-image";
import * as Notifications from "expo-notifications";
import firebase from "../database/firebaseDB";
import { FontAwesome5, Entypo} from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

function selectedInfo({ navigation, route }) {
  const nowDate = new Date(Date.now() - new Date().getTimezoneOffset());
  const [feedBack, setFeedBack] = useState("");
  const [isShowFeedBack, setShowFeedBack] = useState(false);
  const [selectDate, setSelectDate] = useState(nowDate);

  ///plant Info
  const notificationDB = firebase.firestore().collection("notifications");
  const [isImage, setImage] = useState(
    "https://clicxy.com/wp-content/uploads/2016/04/dummy-post-horisontal.jpg"
  );
  const [isName, setName] = useState("");
  const [isType, setType] = useState("");
  const [isCategory, setCategory] = useState([]);
  const [isSeason, setSeason] = useState("");
  const [isHint, setHint] = useState("");
  const [isPrepare_ground, setPrepare_ground] = useState("");
  const [isPrepare_plant, setPrepare_plant] = useState("");
  const [isHow_to, setHow_to] = useState("");
  const [planCollection, setPlanCollection] = useState([]);
  const planDB = firebase.firestore().collection("plans");
  const userPlanDB = firebase.firestore().collection("user-plant");
  const plantID = route.params.plantID
  const [userID, setUserID] = useState("");

  const getData = async() => {
    try {
        const value = await AsyncStorage.getItem('id')
        setUserID(value)
      } catch(e) {
        // error reading value
        console.log(e);
      }
  }

  const getPlan = async(plant, id) => {
    await planDB.onSnapshot(plan => {
      plan.forEach( res => {
        if(res.data().user_plant_id === route.params.user_plantID && res.data().plant_id === id){
          setPlanCollection(res.data().do);
        }
      })
    })
  }

  const getKeyUserPlant = async() => {
    await userPlanDB.onSnapshot(selectePlant => {
      selectePlant.forEach( res => {

        const user_id = res.data().user_id;
        const plant_id = res.data().plant_id;

        if(userID === user_id && plantID === plant_id){
          getPlan(res.id, plant_id)
        }      
      })
    })
  };

  useEffect(async() => {
    
    const plantID = route.params.plantID;
    const plantDoc = firebase.firestore().collection("plants").doc(plantID);
    await getData();
    plantDoc.get().then((res) => {
      const category = res.data().category;
      const splitCategory = category.split(", ");
      if (res.exists) {
        setImage(res.data().image);
        setName(res.data().name);
        setType(res.data().type);
        setCategory(splitCategory);
        setSeason(res.data().season);
        setPrepare_ground(res.data().prepare_ground);
        setPrepare_plant(res.data().prepare_plant);
        setHow_to(res.data().how_to);
        setHint(res.data().hint);
      } else {
        console.log("Document does not exist!!");
      }
    });
    getKeyUserPlant();
  }, [route.params.plantID, userID]);


  const addFeedback = () => {
    notificationDB.add({
      do: "ส่งข้อเสนอแนะ",
      name: "",
      value: feedBack,
      user_id: userID,
      date: new Date(selectDate),
      current_date: new Date(),
      image: "https://cdn-icons-png.flaticon.com/512/724/724761.png"
    })
    .then((res) => {
      console.log("Insert Notification Transaction Successfully")
    });
  }

  const sendFeedBack = () => {
    if (feedBack == "") {
      console.log("none feedback");
    } else {
      addFeedback()
    }
    setShowFeedBack(false);
    setFeedBack("");
  };


  const back = () => {
    navigation.popToTop()
  };

  const user = () => {
    navigation.navigate("profile")
  };

  function checkDate(date) {
    const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const input = new Date(date).toDateString().split(" ");
    const now = new Date().toDateString().split(" ");

    if(parseInt(now[3]) >= parseInt(input[3])){
      if (month.indexOf(now[1]) > month.indexOf(input[1])){
        return true
      } else if (month.indexOf(now[1]) == month.indexOf(input[1]) && parseInt(now[2]) > parseInt(input[2])){
        return true
      }
    }   
    return false
  }

  function formatDate(date){
    const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    let temp = date.split(" ")
    return temp[1]+"-"+(month.indexOf(temp[0])+1 > 9 ? month.indexOf(temp[0])+1 : "0"+(month.indexOf(temp[0])+1))+"-"+temp[2]
  }

  return (
    <View style={styles.container}>
      {/* logo app */}
      <View style={{ backgroundColor: "#2C7B11", width: "100%", height: 50, zIndex: 1}}>
        <View style={{ marginTop: 35, width: "100%", alignItems: "center",}}>
          <View opacity={0.3} style={{ position: "absolute" }}>
            <FontAwesome5 name="seedling" size={40} color="#ffffff" />
          </View>
          <View style={{ position: "absolute", top: 10}}>
            <Image source={require("../assets/logoText2.png")} />
          </View>
        </View>
      </View>
      {/* send feedback */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={isShowFeedBack}
        onRequestClose={() => {
          setShowFeedBack(false);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.contX}>
              <Icon
                name="times"
                type="font-awesome-5"
                iconStyle={styles.iconX}
                onPress={() => setShowFeedBack(false)}
              />
            </View>

            <View style={styles.headerTextPopup}>
              <Text
                style={{
                  color: "#fff",
                  fontSize: 35,
                  fontWeight: "bold",
                  marginBottom: 5,
                  alignSelf: "center",
                }}
              >
                ข้อเสนอแนะ
              </Text>
              <TextInput
                allowFontScaling
                placeholder="เขียนข้อเสนอแนะ...(100 ตัวอักษร)"
                placeholderTextColor="#aaa"
                style={{
                  backgroundColor: "#fff",
                  paddingHorizontal: 10,
                  width: 250,
                  fontSize: 20,
                  borderRadius: 10,
                }}
                textAlignVertical="top"
                numberOfLines={5}
                maxLength={100}
                multiline
                value={feedBack}
                onChangeText={(feedBack) => setFeedBack(feedBack)}
              />
            </View>

            <Button
              title="ส่ง"
              buttonStyle={{
                backgroundColor: "#82ab8d",
                width: "50%",
                alignSelf: "center",
                marginVertical: 9,
              }}
              titleStyle={{ fontSize: 20 }}
              onPress={sendFeedBack}
            />
          </View>
        </View>
      </Modal>

      {/* top Nav */}
      <View style={styles.topPart}>
        <Header
          backgroundColor="#2C7B11"
          placement="center"
          leftContainerStyle={{ paddingVertical: 0 }}
          leftComponent={{
            icon: "arrow-back-circle-outline",
            type: "ionicon",
            color: "#fff",
            size: 35,
            onPress: back,
          }}
          centerComponent={{
            text: isName,
            style: { color: "#fff", fontSize: 30, fontWeight: "bold" },
          }}
          rightComponent={{
            icon: "user-circle",
            type: "font-awesome-5",
            color: "#fff",
            solid: true,
            size: 30,
            onPress: user,
          }}
        />
      </View>

      {/*all plant information */}
      <ScrollView>
        {/* Image */}
        <View style={styles.midPart}>
          <Image
            source={{ uri: isImage }}
            width={Dimensions.get("window").width}
          />
        </View>

        {/* Plant Information */}
        <View style={styles.bottomPart}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={styles.headerText}>ชื่อ: {isName}</Text>
            <TouchableOpacity onPress={() => setShowFeedBack(true)}>
              <Icon
                name="comment-dots"
                type="font-awesome-5"
                iconStyle={{ fontSize: 30 }}
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.headerText}>
            ชนิดผัก: {"\n"}
            <Text style={styles.textDetail}>{isType}</Text>
          </Text>
          <Text style={styles.headerText}>
            ประเภท:
            {isCategory.map((l, i) => (
                <Text style={styles.textDetail}>
                {"\n"}{" "}
                <Entypo name="dot-single" size={24}/>
                {l}
              </Text>
              ))}
          </Text>
          <Text style={styles.headerText}>
            ควรปลูกในฤดู: {"\n"}
            <Text style={styles.textDetail}>
              {"  "}
              {isSeason}
            </Text>
          </Text>
          <Text style={styles.headerText}>
            การเตรียมดินก่อนปลูก: {"\n"}
            <Text style={styles.textDetail}>    {isPrepare_ground}</Text>
          </Text>
          <Text style={styles.headerText}>
            การเตรียมพันธุ์ก่อนปลูก: {"\n"}
            <Text style={styles.textDetail}>    {isPrepare_plant}</Text>
          </Text>
          <Text style={styles.headerText}>
            วิธีการปลูก: {"\n"}
            <Text style={styles.textDetail}>    {isHow_to}</Text>
          </Text>
          <Text style={styles.headerText}>
            คำแนะนำ: {"\n"}
            <Text style={styles.textDetail}>    {isHint}</Text>
          </Text>
          {/* show plan user */}
            <Text style={styles.headerText}>
              สิ่งที่ต้องทำ:
              {"\n"}
              {planCollection.map((l, i) => (
                <Text
                  key={l.key}
                  style={[
                    styles.textDetail,
                    checkDate(l.plan_date.toDate().toDateString()) && {
                      textDecorationLine: "line-through",
                      textDecorationColor: "black",
                    },
                  ]}
                > 
                  {formatDate(l.plan_date.toDate().toDateString().slice(4))} : {l.do + "\n"}
                </Text>
              ))}
            </Text>

        </View>
      </ScrollView>
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
  topPart: {
    flexWrap: "nowrap",
    flexDirection: "row",
    padding: 0,
    alignItems: "center",
  },
  midPart: {
    flexDirection: "column",
    alignItems: "center",
  },
  bottomPart: {
    paddingHorizontal: 15,
    marginVertical: 10,
  },
  selectTimeBtn: {
    backgroundColor: "#2C7B11",
    borderRadius: 9,
    height: 50,
    marginVertical: 15,
    textAlign: "center",
    width: 200,
  },
  modalView: {
    width: 300,
    backgroundColor: "#2C7B11",
    borderRadius: 20,
    padding: 10,
    shadowColor: "#000",
    elevation: 5,
    alignSelf: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignSelf: "center",
  },
  headerText: {
    color: "#fff",
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 5,
  },
  iconX: {
    fontSize: 30,
    color: "#000",
  },
  contX: {
    position: "absolute",
    right: 15,
    top: 5,
  },
  headerTextPopup: {
    alignSelf: "center",
    paddingTop: 5,
  },
  dateBox: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
    backgroundColor: "#eeee",
    borderRadius: 5,
  },
  textDetail: {
    fontSize: 18,
    fontWeight: "normal",
  },
});

export default selectedInfo;
