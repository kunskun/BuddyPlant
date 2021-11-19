import * as Google from "expo-google-app-auth";
import React, { useState } from "react";
import firebase from "../database/firebaseDB";

export async function signInWithGoogleAsync() {
    
    try {
        const userCollection = firebase.firestore().collection('users');
        const result = await Google.logInAsync({
            androidClientId:
                "1011125952941-sn36odhinio6knb15n3q8v78k9e2gk43.apps.googleusercontent.com",
            scopes: ["profile", "email"],
        });

        // console.log(result);
        const rest_fname = result.user.givenName;
        const rest_lname = result.user.familyName;
        const rest_email = result.user.email;
        const rest_image = result.user.photoUrl;

        if (result.type === "success") {
            let list_users = [];
            let found_account = false;

            await userCollection.get().then(async items => {
                await items.forEach(res => {
                    const { email, fname, lname, picture, isLogin } = res.data();
                    console.log("Email: "+email);
                    
                    if(email === rest_email){
                        userCollection.doc(res.id).update({
                            isLogin: true
                        })
                        found_account = true;
                        console.log("Update Success");
                    } 
                    
                    list_users.push({
                        user_id: res.id,
                        email: email,
                        fname: fname,
                        lname: lname,
                        image: picture,
                        isLogin: isLogin
                    });
                }); 
                
                if (!found_account) {
                    userCollection.add({
                        email: rest_email,
                        firstname: rest_fname,
                        lastname: rest_lname,
                        picture: rest_image,
                        role: "user",
                        isLogin: true
                    })
                    console.log("Add Success");
                }

                list_users.forEach(items => {
                    if (items.email.includes(rest_email)) {
                        // sent item out with props
                        console.log(rest_email + " have in list");
                    }
                })
            })

            return result;
        } else {
            return { cancelled: true };
        }
    } catch (e) {
        return { error: true };
    }
}


// Create a reference to the cities collection import { collection, query, where } from "firebase/firestore"; const citiesRef = collection(db, "cities"); 
// Create a query against the collection. const q = query(citiesRef, where("state", "==", "CA"));