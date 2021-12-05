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
import DateTimePickerModal from "react-native-modal-datetime-picker";
import * as Notifications from "expo-notifications";
import firebase from "../database/firebaseDB";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome5 } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

function plantInfo({ navigation, route }) {
  
  const planDB = firebase.firestore().collection("plans");
  const userPlanDB = firebase.firestore().collection("user-plant");
  const notificationDB = firebase.firestore().collection("notifications");
  const nowDate = new Date(Date.now() - new Date().getTimezoneOffset());
  const [isShowDate, setShowDate] = useState(false);
  const [feedBack, setFeedBack] = useState("");
  const [isShowFeedBack, setShowFeedBack] = useState(false);
  const [selectDate, setSelectDate] = useState(nowDate);
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);

  ///plant Info
  const [isID, setID] = useState("");
  const [isImage, setImage] = useState("https://clicxy.com/wp-content/uploads/2016/04/dummy-post-horisontal.jpg");
  const [isName, setName] = useState("");
  const [isType, setType] = useState("");
  const [isCate, setCate] = useState("");
  const [isCategory, setCategory] = useState([]);
  const [isSeason, setSeason] = useState("");
  const [isHint, setHint] = useState("");
  const [isPrepare_ground, setPrepare_ground] = useState("");
  const [isPrepare_plant, setPrepare_plant] = useState("");
  const [isHow_to, setHow_to] = useState("");
  const [isAttend_date, setAttend_date] = useState(0);
  const [isAttend_time, setAttend_time] = useState(0);
  const [isRecive_range, setRecive_range] = useState(0);
  const [userID, setUserID] = useState("");
  let userPlantKey = "";

  const getData = async() => {
      try {
          const value = await AsyncStorage.getItem('id')
          setUserID(value);
        } catch(e) {
          // error reading value
          console.log(e);
        }
  }

  useEffect(() => {
    const plantID = route.params.plantID;
    const plantDoc = firebase.firestore().collection("plants").doc(plantID);
    getData()
    plantDoc.get().then((res) => {
      const category = res.data().category;
      const splitCategory = category.split(", ");
      if (res.exists) {
        setID(res.id);
        setImage(res.data().image);
        setName(res.data().name);
        setType(res.data().type);
        setCate(category)
        setCategory(splitCategory);
        setSeason(res.data().season);
        setPrepare_ground(res.data().prepare_ground);
        setPrepare_plant(res.data().prepare_plant);
        setHow_to(res.data().how_to);
        setAttend_date(res.data().attend_date);
        setAttend_time(res.data().attend_time);
        setRecive_range(res.data().recive_range);
        setHint(res.data().hint);
      } else {
        console.log("Document does not exist!!");
      }
    });
  }, [route.params.plantID]);


  const getNewDate = () => {
    return (
      selectDate.getDate() +
      "/" +
      parseInt(selectDate.getMonth() + 1) +
      "/" +
      selectDate.getFullYear()
    );
  };

  const handleConfirm = (date) => {
    setDatePickerVisible(false);
    setSelectDate(date);
  };

  const addFeedback = () => {
    notificationDB.add({
      do: "ส่งข้อเสนอแนะ",
      name: "",
      value: feedBack,
      user_id: userID,
      date: new Date(selectDate),
      image: "https://e7.pngegg.com/pngimages/596/870/png-clipart-computer-icons-scalable-graphics-free-able-medical-alert-symbol-desktop-wallpaper-area.png"
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


  const addNotification = () => {
    notificationDB.add({
      do: "เริ่มปลูก",
      name: isName,
      user_id: userID,
      date: new Date(selectDate),
      image: "https://e7.pngegg.com/pngimages/596/870/png-clipart-computer-icons-scalable-graphics-free-able-medical-alert-symbol-desktop-wallpaper-area.png"
    })
    .then((res) => {
      console.log("Insert Notification Transaction Successfully")
    });
  }


  const sendDate = async () => {
    setShowDate(false);
    setSelectDate(selectDate);
    const date = new Date();
    date.setDate(date.getDate() + isRecive_range);
    await userPlanDB.add({
      category_plant: isCate,
      image: isImage,
      name_plant: isName,
      plant_id: isID,
      recive_date: date,
      start_date: selectDate,
      type_plant: isType,
      user_id: userID,
    })
    .then(res => {
      console.log("Insert User+Plant Successfully")
      userPlantKey = res.id
    });
    
    let temp = [];

    for(let i = 1; i <= isRecive_range; i++){
      
      const between = i * isAttend_date
      const date = new Date(selectDate);
      date.setDate(date.getDate() + between);
      if(between < isRecive_range){
        temp.push({
          do: "รดน้ำต้นไม้",
          plant_id: isID,
          plan_date: date,
          plan_time: "17:00:00",
          user_plant_id: userPlantKey,
        })
      }
      else if(between >= isRecive_range){
        temp.push({
          do: "เก็บเกี่ยวผล",
          plant_id: isID,
          plan_date: date,
          plan_time: "17:00:00",
          user_plant_id: userPlantKey,
        })
        break;
      }
    }
    planDB.add({
      do: temp,
      plant_id: isID,
      user_plant_id: userPlantKey,
    })
    .then((res) => {
      console.log("Insert Receive Date Successfully")
    });

    addNotification();

    await schedulePushNotification();
  };

  const back = () => {
    navigation.popToTop()
  };

  const user = () => {
    navigation.navigate("profile")
  };


  async function schedulePushNotification() {
    await Notifications.setNotificationChannelAsync("new-noti", {
      name: "notifications",
      importance: Notifications.AndroidImportance.HIGH,
      sound: "mixkit-long-pop-2358.wav",
    });

    await Notifications.scheduleNotificationAsync({
      content: {
        title: "อย่าลืมรดน้ำต้นไม้นะ",
        body: isName,
        data: { data: "goes here" },
      },
      trigger: {
        seconds: 2,
        channelId: "new-noti",
      },
    });
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
      {/* set time modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={isShowDate}
        onRequestClose={() => {
          setShowDate(false);
        }}
      >
        <View opacity={0.6} style={{width: '100%', height: '100%', position: 'absolute', backgroundColor: '#111111', left: 0, top: 0}}></View>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.contX}>
              <Icon
                name="times"
                type="font-awesome-5"
                iconStyle={styles.iconX}
                onPress={() => setShowDate(false)}
              />
            </View>

            <View style={styles.headerTextPopup}>
              <Text
                style={{
                  color: "#fff",
                  fontSize: 35,
                  fontWeight: "bold",
                  marginBottom: 5,
                }}
              >
                วันที่เพาะปลูก
              </Text>
              <View style={styles.dateBox}>
                <Text
                  style={{
                    color: "#000",
                    fontSize: 25,
                    fontWeight: "bold",
                  }}
                >
                  {getNewDate()}
                </Text>
                <Icon
                  containerStyle={{ marginLeft: 20 }}
                  name="calendar-alt"
                  type="font-awesome-5"
                  onPress={() => setDatePickerVisible(true)}
                  color="#000"
                  iconStyle={{ fontSize: 30 }}
                />
              </View>
              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={(date) => handleConfirm(date)}
                onCancel={() => setDatePickerVisible(false)}
                minimumDate={nowDate}
                date={nowDate}
              />
            </View>

            <Button
              title="ยืนยัน"
              buttonStyle={{
                backgroundColor: "#82ab8d",
                width: "50%",
                alignSelf: "center",
                marginVertical: 9,
              }}
              titleStyle={{ fontSize: 20 }}
              onPress={sendDate}
            />
          </View>
        </View>
      </Modal>

      {/* send feedback */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={isShowFeedBack}
        onRequestClose={() => {
          setShowFeedBack(false);
        }}
      >
        <View opacity={0.6} style={{width: '100%', height: '100%', position: 'absolute', backgroundColor: '#111111', left: 0, top: 0}}></View>
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
        </View>
      </ScrollView>
        <Button
          title="เลือกเวลาเริ่มปลูก"
          buttonStyle={styles.selectTimeBtn}
          titleStyle={{ fontSize: 20, fontWeight: "bold" }}
          onPress={() => {
            setShowDate(!isShowDate);
            setSelectDate(nowDate);
          }}
        />
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
    // marginTop: 10,
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

export default plantInfo;
