import * as Google from "expo-google-app-auth";
import React, { useState } from "react";
import firebase from "../database/firebaseDB";
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function signInWithGoogleAsync() {
    let valueInStored = "";
    const storeData = async (value) => {
        try {
          await AsyncStorage.setItem('mail', value)
          console.log("add success value = "+ value);
        } catch (e) {
          // saving error
          console.log(e);
        }
    }

    const storeID = async (value) => {
        try {
          await AsyncStorage.setItem('id', value)
          console.log("add success id = "+ value);
        } catch (e) {
          // saving error
          console.log(e);
        }
    }

    const getData = async () => {
        try {
          const value = await AsyncStorage.getItem('mail')
        //   console.log("found = " + value);
        //   if(value !== null) {
        //     // value previously stored
        //     console.log("value = " + value);  
        //   }
          valueInStored = value;
        //   console.log(valueInStored);
        } catch(e) {
          // error reading value
          console.log(e);
        }
    }

    getData()
    
    try {
        const userCollection = firebase.firestore().collection('users');
        const result = await Google.logInAsync({
            androidClientId:
                "1011125952941-sn36odhinio6knb15n3q8v78k9e2gk43.apps.googleusercontent.com",
            scopes: ["profile", "email"],
        });

        // console.log(result);
        const rest_name = result.user.name;
        const rest_email = result.user.email;
        const rest_image = result.user.photoUrl;

        if (result.type === "success") {
            let list_users = [];
            let found_account = false;
            
            if(!valueInStored){
                await userCollection.get().then(async items => {
                    await items.forEach(res => {
                        const { email, name, image, isLogin } = res.data();
                        console.log("Email: "+email);
                        
                        if(email === rest_email){
                            userCollection.doc(res.id).update({
                                isLogin: true
                            })
                            found_account = true;
                            console.log("Update Success");
                            storeID(res.id)
                        } 
                        
                        list_users.push({
                            user_id: res.id,
                            email: email,
                            name: name,
                            image: image,
                            isLogin: isLogin
                        });
                    }); 
                    
                    if (!found_account) {
                        userCollection.add({
                            email: rest_email,
                            name: rest_name,
                            image: rest_image,
                            role: "user",
                            isLogin: true
                        }).then(async res => {
                            storeID(res.id)
                        })
                        console.log("Add Success");
                    }
                    storeData(rest_email)
                })

            } 
            // await userCollection.get().then(async items => {
            //     await items.forEach((res) => {

            //     })        
            // }
            return result;
        } else {
            return { cancelled: true };
        }
    } catch (e) {
        return { error: true };
    }
}
