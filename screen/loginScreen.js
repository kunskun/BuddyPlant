import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { signInWithGoogleAsync } from '../googleLogin/singin'

export default function Login() {
  
  return (
    <View style={styles.container}>
      
      <Image style={{width: 200, height: 200 ,marginBottom: '5%'}} source={require('../assets/favicon.png')}/>
      
      <Image source={require('../assets/Buddy.png')}/>
      <Image source={require('../assets/Plant.png')}/>

      <TouchableOpacity 
        style={styles.loginButton}
        onPress={() => signInWithGoogleAsync()}>
        <Image 
          style={styles.loginButton, {width: '100%', height: '100%', borderRadius: 10,}} 
          source={require('../assets/googleLogin-white.png')}/>
      </TouchableOpacity>
      
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8BBA8C',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginButton: {
    width: '75%',
    height: '10%',
    borderColor: '#D1CCCC',
    borderWidth: 1,
    borderRadius: 10,
    position: 'absolute',
    bottom: '5%',
    alignItems: 'center',
  },
  logo: {
    width: '50%',
    height: '30%',
    marginBottom: '5%'
  }
});
