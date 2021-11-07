import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { signInWithGoogleAsync } from './googleLogin/singin'
import Login from './screen/loginScreen';

// First- obtain access token from Expo's Google API

export default function App() {
  
  return (
    <View style={styles.container}>
      <Login/>
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

});
