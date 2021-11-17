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
// expo install react-native-elements
// expo install react-native-safe-area-context
// expo install @react-native-community/datetimepicker
import { Header, Icon } from "react-native-elements";
import { Button } from "react-native-elements/dist/buttons/Button";
import Image from "react-native-scalable-image";
import DateTimePickerModal from "react-native-modal-datetime-picker";

function plntInfo() {
  const list = 
    {
      image:
        "https://i2.wp.com/www.plookphak.com/wp-content/uploads/2015/01/coriander-2.jpg?ssl=1",
      name: "ผักชี",
      type: "กินใบ, กินราก",
      text: "ผักราคาสูงมากๆๆasdadloasdasdfasdfafsfsdfasdfasdfafsdfasdfaasdfasdfasdfasdfasdfasdfadsfasdfadsfasdfasdfasdfadfasdfasdfasdfafasdsdalsdsk'ja;jfaskdfl;afasdfak;jfna;lsdnfkas;dfklasd;fmklsndfalksdnfalsdkfma;sdlkfmaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaๆๆๆๆๆๆๆๆๆๆๆๆๆๆๆๆasdasdasdasdaDadadsๆๆๆๆๆๆๆๆๆๆๆๆๆๆๆๆๆๆๆๆๆๆๆๆๆๆๆๆๆๆๆๆๆๆๆๆๆๆๆๆ",
    };
  
  const nowDate = new Date(
    Date.now() - new Date().getTimezoneOffset() 
    )
  const [isShowDate, setShowDate] = useState(false);
  const [feedBack, setFeedBack] = useState("")
  const [isShowFeedBack, setShowFeedBack] = useState(false);
  const [selectDate, setSelectDate] = useState(nowDate);
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  
  
  const newDate = selectDate
    .toISOString()
    .split("T")[0]
    .toString()
    .replace(/(\d{4})-(\d{2})-(\d{2})/, "$3/$2/$1");

  const handleConfirm = (date) => {
    setDatePickerVisible(false);
    setSelectDate(date);
    console.log("nowDate: "+nowDate);
    console.log("Date: "+date);
  };

  const sendFeedBack = () => {
      setShowFeedBack(false);
      setFeedBack("");
  }

  const sendDate = () => {
      setShowDate(false)
      setSelectDate(selectDate)
      console.log("sendDate: "+ selectDate);
  }

  const notification = () => {
    console.log("notification");
  }

  const user = () => {
    console.log("user");
  }

  return (
    <View style={styles.container}>
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
            <View style={[{ alignSelf: "flex-end", paddingBottom: 0 }]}>
              <Icon
                name="times"
                type="font-awesome-5"
                iconStyle={{ fontSize: 25 }}
                color="black"
                onPress={() => setShowDate(false)}
              />
            </View>

            <View style={{ alignSelf: "center" }}>
              <Text
                style={{
                  color: "#fff",
                  fontSize: 35,
                  fontWeight: "bold",
                  marginBottom: 5,
                  marginTop: 0,
                  paddingTop: 0,
                }}
              >
                วันที่เพาะปลูก
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  paddingVertical: 8,
                  backgroundColor: "#eeee",
                }}
              >
                <Text
                  style={{
                    color: "#000",
                    fontSize: 25,
                    fontWeight: "bold",
                  }}
                >
                  {newDate}
                </Text>
                <Icon
                  name="calendar-alt"
                  type="font-awesome-5"
                  onPress={() => setDatePickerVisible(true)}
                  color="#000"
                  iconStyle={{ fontSize: 30, marginLeft: 20 }}
                />
              </View>
              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={() => setDatePickerVisible(false)}
                minimumDate={nowDate}
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
            <View style={[{ alignSelf: "flex-end", paddingBottom: 0 }]}>
              <Icon
                name="times"
                type="font-awesome-5"
                iconStyle={{ fontSize: 25 }}
                color="black"
                onPress={() => setShowFeedBack(false)}
              />
            </View>

            <View style={{ alignSelf: "center" }}>
              <Text
                style={{
                  color: "#fff",
                  fontSize: 35,
                  fontWeight: "bold",
                  marginBottom: 5,
                  alignSelf: "center"
                }}
              >
                ข้อเสนอแนะ
              </Text>
              <TextInput 
                allowFontScaling
                placeholder="เขียนข้อเสนอแนะ...(100 ตัวอักษร)"
                placeholderTextColor="#aaa"
                style={{backgroundColor: "#fff", paddingHorizontal: 5, width: 250, fontSize: 20}}
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
            text: list.name,
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
            source={{ uri: list.image }}
            width={Dimensions.get("window").width}
          />
        </View>

        {/* Plant Information */}
        <View style={styles.bottomPart}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ color: "#fff", fontSize: 25, fontWeight: "bold" }}>
              ชื่อ: {list.name}
            </Text>
            <TouchableOpacity onPress={() => setShowFeedBack(true)} style={{}}>
              <Icon
                name="comment-dots"
                type="font-awesome-5"
                iconStyle={{ fontSize: 30 }}
              />
            </TouchableOpacity>
          </View>
          <Text style={{ color: "#fff", fontSize: 25, fontWeight: "bold" }}>
            ข้อมูลเฉพะ: {"\n"}
            {list.text}
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
    marginTop: 70,
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
    marginVertical: 20,
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
});

export default plntInfo;
