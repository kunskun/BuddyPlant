import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, View, Image, TouchableOpacity, LogBox } from 'react-native';
import { signInWithGoogleAsync } from './googleLogin/singin'
import Login from './screen/loginScreen';
import Profile from './screen/profileScreen';
import SearchScreen from './screen/searchScreen';
import Navigation from './navigation/Navigatoion';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
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

  LogBox.ignoreLogs(['Setting a timer']);
  
  return (
    <View style={styles.container}>
      {
        !isLogin ?
        <>
          <Login/> 
        </>
        :
        <Navigation/>
      }
    </View>
      
  );
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8BBA8C',
  },

});
