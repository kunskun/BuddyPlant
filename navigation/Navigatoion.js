import React from "react";
import { NavigationContainer } from '@react-navigation/native';
// expo install react-native-screens
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, MaterialCommunityIcons, FontAwesome, FontAwesome5 } from '@expo/vector-icons'; 

// Screen
import ProfileScreen from "../screen/profileScreen";
import Login from '../screen/loginScreen';

const Stack = createNativeStackNavigator();
const BottomTab =  createBottomTabNavigator();

export default function BuddyNavigator() {
    return(
        <NavigationContainer>
            <BottomTab.Navigator initialRouteName="home" 
                screenOptions={{
                    tabBarActiveTintColor: "#ffffff",
                    tabBarStyle: { backgroundColor: "#39864B"},
                    headerShown: false
                }}>
                <BottomTab.Screen name="home" component={Login}
                    options={{
                        tabBarIcon: ({size, color}) => {
                            return ( 
                                <Ionicons name="ios-home" size={size} color={color} />
                            )
                        }
                    }}
                />
                <BottomTab.Screen name="selected" component={Login}
                    options={{
                        tabBarIcon: ({size, color}) => {
                            return ( 
                                <FontAwesome5 name="leaf" size={size} color={color} />
                            )
                        }
                    }}
                />
                <BottomTab.Screen name="notification" component={ProfileScreen}
                    options={{
                        tabBarIcon: ({size, color}) => {
                            return ( 
                                <FontAwesome name="bell" size={size} color={color} />
                            )
                        }
                    }}
                />
                <BottomTab.Screen name="profile" component={ProfileScreen}
                    options={{
                        tabBarIcon: ({size, color}) => {
                            return ( 
                                <MaterialCommunityIcons name="account" size={size} color={color} />
                            )
                        }
                    }}
                />
            </BottomTab.Navigator>
        </NavigationContainer>
    );
}