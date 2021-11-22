import React from "react";
import { NavigationContainer } from "@react-navigation/native";
// expo install react-native-screens
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, MaterialCommunityIcons, FontAwesome, FontAwesome5 } from "@expo/vector-icons";

// Screen
import ProfileScreen from "../screen/profileScreen";
import Login from "../screen/loginScreen";
import SearchScreen from "../screen/searchScreen";
import PlantInfo from "../screen/plantInfo";
import SelectedList from "../screen/selectedList";
import SelectedInfo from "../screen/selectedInfo";
import NotiScreen from '../screen/notiScreen'
import { render } from "react-dom";

const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();

const searchStackNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="search"
      screenOptions={{
        headerStyle: { backgroundColor: "#73D9E2" },
        headerShown: false,
      }}
    >
      <Stack.Screen name="search" component={SearchScreen} />
      <Stack.Screen name="info" component={PlantInfo} />
    </Stack.Navigator>
  );
};

const selectedStackNavigation = () => {
    return (
      <Stack.Navigator
        initialRouteName="selected"
        screenOptions={{
          headerStyle: { backgroundColor: "#73D9E2" },
          headerShown: false,
        }}
      >
        <Stack.Screen name="selected" component={SelectedList} />
        <Stack.Screen name="selectInfo" component={SelectedInfo} />
      </Stack.Navigator>
    );
  };

  const tabNavigation = () => {
    return (
        <BottomTab.Navigator
        initialRouteName="home"
        screenOptions={{
          tabBarActiveTintColor: "#ffffff",
          tabBarStyle: { backgroundColor: "#39864B" },
          headerShown: false,
        }}
      >
        <BottomTab.Screen
          name="home"
          component={searchStackNavigation}
          options={{
            tabBarIcon: ({ size, color }) => {
              return <Ionicons name="ios-home" size={size} color={color} />;
            },
          }}
        />
        <BottomTab.Screen
          name="selected"
          component={selectedStackNavigation}
          options={{
            tabBarIcon: ({ size, color }) => {
              return <FontAwesome5 name="leaf" size={size} color={color} />;
            },
          }}
        />
        <BottomTab.Screen
          name="notification"
          component={NotiScreen}
          options={{
            tabBarIcon: ({ size, color }) => {
              return <FontAwesome name="bell" size={size} color={color} />;
            },
          }}
        />
        <BottomTab.Screen
          name="profile"
          component={ProfileScreen}
          options={{
            tabBarIcon: ({ size, color }) => {
              return (
                <MaterialCommunityIcons
                  name="account"
                  size={size}
                  color={color}
                />
              );
            },
          }}
        />
      </BottomTab.Navigator>
    );
  };
  

export default function BuddyNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerStyle: { backgroundColor: "#73D9E2" },
          headerShown: false,
        }}
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="center" component={tabNavigation} />
      </Stack.Navigator>

{/* <BottomTab.Navigator
        initialRouteName="home"
        screenOptions={{
          tabBarActiveTintColor: "#ffffff",
          tabBarStyle: { backgroundColor: "#39864B" },
          headerShown: false,
        }}
      >
        <BottomTab.Screen
          name="home"
          component={searchStackNavigation}
          options={{
            tabBarIcon: ({ size, color }) => {
              return <Ionicons name="ios-home" size={size} color={color} />;
            },
          }}
        />
        <BottomTab.Screen
          name="selected"
          component={selectedStackNavigation}
          options={{
            tabBarIcon: ({ size, color }) => {
              return <FontAwesome5 name="leaf" size={size} color={color} />;
            },
          }}
        />
        <BottomTab.Screen
          name="notification"
          component={NotiScreen}
          options={{
            tabBarIcon: ({ size, color }) => {
              return <FontAwesome name="bell" size={size} color={color} />;
            },
          }}
        />
        <BottomTab.Screen
          name="profile"
          component={ProfileScreen}
          options={{
            tabBarIcon: ({ size, color }) => {
              return (
                <MaterialCommunityIcons
                  name="account"
                  size={size}
                  color={color}
                />
              );
            },
          }}
        />
      </BottomTab.Navigator> */}


    </NavigationContainer>
  );
}
