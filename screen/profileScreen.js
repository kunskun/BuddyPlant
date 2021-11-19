import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { TouchableOpacityBase } from 'react-native';
import { Button, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { ListItem } from "react-native-elements";
import { color } from 'react-native-elements/dist/helpers';
import firebase from '../database/firebaseDB';

class profileScreen extends Component {
    constructor(props) {
        super();
        this.userCollection = firebase.firestore().collection("users");
        this.state = {
            user_id: "",
            fname: "",
            lname: "",
            email: "",
            picture: "",
        }
    }

    async logout() {
        await userCollection.get().then(async items => {
            console.log(items);
            await items.forEach(res => {
                const { email, fname, lname, picture, isLogin } = res.data();
                console.log("Email: "+ email);
            });
        });
    }

    // componentWillUnmount() {
    //     this.unsubscribe();
    // }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.header}>Profile</Text>
                <View style={{flexDirection: 'row', width: 275}}>
                    {   
                        this.state.picture ? 
                        <Image source={{uri: this.state.picture}} 
                            style={{ 
                                width: 140, 
                                height: 140, 
                                marginRight: '3%',
                                marginBottom: '3%',
                                // borderRadius: "50%"
                            }}/> 
                        : 
                        null
                    }
                </View>
                <View style={{alignItems: 'flex-start', width: 275}}>
                    <Text style={styles.title}>Username</Text>
                    <Text style={styles.text}>{ this.state.fname }</Text>
                    {/* <Text style={styles.title}>Name</Text>
                    <Text style={styles.text}>{ this.state.lname }</Text> */}
                    <Text style={styles.title}>E-mail</Text>
                    <Text style={styles.text}>{ this.state.email }</Text>
                </View>
                <View style={{width: 275, marginTop: '5%'}}>
                    <TouchableOpacity style={styles.btn1}>
                        <Text style={styles.textBtn}>EDIT PROFILE</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.btn2}
                        onPress={() => this.logout()}>
                        
                        <Text style={styles.textBtn}>LOGOUT</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8BBA8C',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  header: {
      fontSize: 48,
    //   fontFamily: 'Quicksand',
      fontWeight: 'bold',
      marginTop: '10%',
      marginBottom: '10%',
    //   alignItems: 'center',
  },
  title: {
      fontFamily: 'Roboto',
      fontWeight: 'bold',
      fontSize: 24,
  },
  text: {
    fontFamily: 'Roboto',
    fontSize: 20,
  },
  btn1: {
    borderRadius: 50, 
    overflow:'hidden',
    height: 45,
    backgroundColor: '#39864B',
    justifyContent: 'center'
  },
  btn2: {
    borderRadius: 50, 
    overflow:'hidden',
    height: 45,
    backgroundColor: 'black',
    marginTop: '7%',
    justifyContent: 'center'
  },
  textBtn: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    
  }

});

export default profileScreen;