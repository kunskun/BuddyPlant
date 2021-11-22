import * as Google from "expo-google-app-auth";
import React, { useState } from "react";
import firebase from "../database/firebaseDB";
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function getData() {

    const [isLogin, setIsLogin] = useState(false);
    const [valueInStored, setValueInStored] = useState('');

  useEffect(async () => {
    await getData()

    if(valueInStored !== null) setIsLogin(true)
    else setIsLogin(false)
    console.log("useEffect " + valueInStored);
  })

  const getData = async() => {
    try {
      const value = await AsyncStorage.getItem('mail')

      if(value !== null) setIsLogin(true)
      else setIsLogin(false) 

      setValueInStored(value);
      console.log("not null "+isLogin);
      console.log("val "+valueInStored);      
    } catch(e) {
      console.log(e);
    }
  }


}


// Create a reference to the cities collection import { collection, query, where } from "firebase/firestore"; const citiesRef = collection(db, "cities"); 
// Create a query against the collection. const q = query(citiesRef, where("state", "==", "CA"));