import * as Google from "expo-google-app-auth";
import React, { useState } from "react";
import firebase from "../database/firebaseDB";



export async function signInWithGoogleAsync() {
    
    try {
        const userCollection = firebase.firestore().collection('users');
        const token = firebase.firestore().collection('token').doc("ilDoD6eYPTy63VhbyCL1")
        const result = await Google.logInAsync({
            androidClientId:
                "1011125952941-sn36odhinio6knb15n3q8v78k9e2gk43.apps.googleusercontent.com",
            scopes: ["profile", "email"],
        });

        // console.log(result);
        const fname = result.user.givenName;
        const lname = result.user.familyName;
        const email = result.user.email;
        const image = result.user.photoUrl;

        if (result.type === "success") {
            let accessToken = '';
            
            await token.get().then(res => {
                const { user } = res.data();
                accessToken = user
            });
            
            console.log(accessToken);
            if (!accessToken) {
                console.log("Not Have Token");
                userCollection.onSnapshot(async(query) => {
                    await query.forEach(res => {
                        // This is the problem that make me crazy and dunno shit to do this project in this semister and i will let it go to da moon
                        if (res.data().email == email){
                            token.set({
                                user: res.id
                            })
                            console.log("Already have account");
                        } else {
                            console.log("New Account please add one");
                        }

                    });

                })
                console.log("add account "+haveAccount);
                if (!accessToken){
                    userCollection.add({
                        firstname: fname,
                        lastname: lname,
                        email: email,
                        picture: image,
                        role: "user"
                    });
                    console.log("add success");
                } 
            
            }
            
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