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
  // Image
} from "react-native";
// expo install react-native-elements
// expo install react-native-safe-area-context
// expo install react-native-modal-datetime-picker @react-native-community/datetimepicker
// expo install expo-notifications
import { Header, Icon } from "react-native-elements";
import { Button } from "react-native-elements/dist/buttons/Button";
import Image from "react-native-scalable-image";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { color } from "react-native-elements/dist/helpers";
import * as Notifications from "expo-notifications";
import firebase from "../database/firebaseDB";

import { Entypo } from "@expo/vector-icons";
import { AntDesign, FontAwesome, Ionicons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';


Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

function plantInfo({ navigation, route }) {
  const nowDate = new Date(Date.now() - new Date().getTimezoneOffset());
  const [isShowDate, setShowDate] = useState(false);
  const [feedBack, setFeedBack] = useState("");
  const [isShowFeedBack, setShowFeedBack] = useState(false);
  const [selectDate, setSelectDate] = useState(nowDate);
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [isUser, setUser] = useState(true);

  ///plant Info
  const [isID, setID] = useState("");
  const [isImage, setImage] = useState(
    "https://clicxy.com/wp-content/uploads/2016/04/dummy-post-horisontal.jpg"
  );
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

  const [isPlanCollection, setPlanCollection] = useState([]);
  const planDB = firebase.firestore().collection("plan");
  const userPlanDB = firebase.firestore().collection("user-plant");
  const userID = route.params.userID;
  const [isUserPlantKey, setUserPlantKey] = useState("");
  const [isUPPlant_id, setUPPlant_id] = useState("");

  let visibleBtn = true;

  const getKeyUserPlant = (querySnapshot) => {
    const plan_data = [];

    // userPlanDB.onSnapshot((value) => {
      querySnapshot.forEach((res) => {
        if (res.data().user_id == userID) {
          const userPlantKey = res.id;
          const userPlant_PlantID = res.data().plant_id
          if( res.data().plant_id == isID ){
            visibleBtn = false;
          }
          if( res.data().plant_id == isID ){
          }
          setUserPlantKey(res.id);
          setUPPlant_id(res.data().plant_id)
          planDB.onSnapshot((value) => {
            value.forEach((plan) => {
              if(plan.data().user_plant_id == userPlantKey){
                setUserPlantKey(userPlantKey)              }
              if ((plan.data().user_plant_id == userPlantKey) && (userPlant_PlantID == isID)) {                
                plan_data.push({
                  key: plan.id,
                  do: plan.data().do,
                  plan_date: plan.data().plan_date,
                  plan_time: plan.data().plan_time,
                });
              }
            });
            setPlanCollection(plan_data);
            setUserPlantKey("")
          });
        }
      });
    // });
  };

  useEffect(() => {
    const plantID = route.params.plantID;
    const plantDoc = firebase.firestore().collection("plants").doc(plantID);

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
      // userPlanDB.onSnapshot(getKeyUserPlant);
    });
  }, [route.params.plantID]);

  const list = {
    image:
      "https://i2.wp.com/www.plookphak.com/wp-content/uploads/2015/01/coriander-2.jpg",
    name: "ผักชี",
    type: "กินใบ, กินราก",
    text: "เหมยปักขคณนาอริยสงฆ์ อึมครึมเอาท์ มือถือโฟล์ค แอคทีฟแฟนซีคันยิสหัชญาณเลดี้ บู๊ สเตเดียมเอ็กซ์เพรสม้านั่งเชฟเดบิต คอมเพล็กซ์ ฮอต มาร์เก็ตติ้ง แก๊สโซฮอล์ผลักดัน ไฟต์แรลลี่เท็กซ์ เซ็นเซอร์รัมเยลลี่สถาปัตย์ สวีทแมชชีนตุ๊กออกแบบ รีดไถพันธกิจแอ็คชั่นพ่อค้าคาราโอเกะ ผลักดันเซ็กส์ซูมไคลแม็กซ์ซันตาคลอส วอลซ์ไฮไลต์เสือโคร่ง",
    toDo: [
      "2021-10-10 ใส่ปุ๋ย",
      "2021-10-20 ลดน้ำต้นไม้",
      "2021-10-30 ถอนทิ้งได้",
    ],
  };

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

  const sendFeedBack = () => {
    if (feedBack == "") {
      console.log("none feedback");
    } else {
      console.log("send feedback: " + feedBack);
    }
    setShowFeedBack(false);
    setFeedBack("");
  };
  

  const sendDate = async () => {
    console.log("Be State : " + visibleBtn)
    visibleBtn = false
    console.log("Af State : " + visibleBtn)
    userPlanDB.onSnapshot(getKeyUserPlant);
    console.log("Plant key :"+ isUserPlantKey)
    setShowDate(false);
    setSelectDate(selectDate);
    const date = new Date();

  //   await userPlanDB.get().then(async items => {

  // })

    userPlanDB
      .add({
        category_plant: isCate,
        image: isImage,
        name_plant: isName,
        plant_id: isID,
        /////recive_dateยังใช้ไม่ได้
        recive_date: date,
        start_date: selectDate,
        type_plant: isType,
        user_id: userID,
      })
      .then((res) => {
        console.log("Insert User+Plant Successfully")
      });


    for(let i = isAttend_date; i <= isRecive_range; i++){
      const between = i * isAttend_date
      const date = new Date();
      date.setDate(date.getDate() + between);
      if(between != isRecive_range){

      }
      else if(between >= isRecive_range){
        console.log("SSSSSS " + isUserPlantKey)
      //   planDB
      // .add({
      //   do: "เก็บเกี่ยวผล",
      //   plant_id: isID,
      //   plan_date: date,
      //   plan_time: "17:00:00",
      //   user_plant_id: isUserPlantKey,
      // })
      // .then((res) => {
      //   console.log("Insert Receive Date Successfully")
      // });
      }

    }
    await schedulePushNotification();
  };

  const notification = () => {
    console.log("notification");
  };

  const user = () => {
    console.log("user");
  };

  // set select time to 8.00 am
  function calculateSecondsToSpecifiedDate() {
    selectDate.setDate(selectDate.getDate() + 1);
    selectDate.setHours(7, 0, 0);
    var Difference_In_Time = selectDate.getTime() - nowDate.getTime();
    return Difference_In_Time;
  }

  async function schedulePushNotification() {
    await Notifications.setNotificationChannelAsync("new-noti", {
      name: "notifications",
      importance: Notifications.AndroidImportance.HIGH,
      sound: "mixkit-long-pop-2358.wav",
    });

    await Notifications.scheduleNotificationAsync({
      content: {
        title: "อย่าลืมลดน้ำต้นไม้นะ",
        body: "ลดต้นผักชี",
        data: { data: "goes here" },
      },
      trigger: {
        seconds: calculateSecondsToSpecifiedDate(),
        channelId: "new-noti",
      },
    });
  }

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
      {/* set time modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={isShowDate}
        onRequestClose={() => {
          setShowDate(false);
        }}
      >
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
            icon: "notifications",
            type: "ionicon",
            color: "#fff",
            size: 30,
            onPress: notification,
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
          {/* show if have user */}

          {/* ต้องใช้ๆ */}
          {isUserPlantKey !== ""  && (
            <Text style={styles.headerText}>
              สิ่งที่ต้องทำ:
              {"\n"}
              {isPlanCollection.map((l, i) => (
                <Text
                  key={l.key}
                  style={[
                    styles.textDetail,
                    i == 0 && {
                      textDecorationLine: "line-through",
                      textDecorationColor: "black",
                    },
                  ]}
                >
                  {l.plan_date} : {l.do + "\n"}
                </Text>
              ))}
            </Text>
          )}
        </View>
      </ScrollView>

      {/* for test */}
      {/* for test */}
      {/* for test */}
      {/* for test */}
      {/* for test */}
      {/* for test */}
      {/* for test */}
      {/* for test */}
      {/* for test */}
      {/* for test */}

      {/* pick date button */}
      {visibleBtn == true && (
        <Button
          title="เลือกเวลาเริ่มปลูก"
          buttonStyle={styles.selectTimeBtn}
          titleStyle={{ fontSize: 20, fontWeight: "bold" }}
          onPress={() => {
            setShowDate(!isShowDate);
            setSelectDate(nowDate);
          }}
        />
       )} 
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
    marginTop: 10,
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
    textShadowColor: "black",
    textShadowRadius: 0.5,
  },
  iconX: {
    fontSize: 30,
    color: "#000",
    textShadowColor: "#fff",
    textShadowRadius: 5,
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
