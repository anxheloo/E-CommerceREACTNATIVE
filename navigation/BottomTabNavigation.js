import React from "react";
import { Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
// import { COLORS } from "../constants/index";
import { COLORS } from "../constants";
import { Home, Profile, Search } from "../screens";

const Tab = createBottomTabNavigator();

const screenOptions = {
  tabBarShowLabel: false,
  tabBarHideOnKeyboard: true,
  headerShown: false,
  tabBarStyle: {
    height: 70,
  },
};

const BottomTabNavigation = () => (
  <Tab.Navigator screenOptions={screenOptions}>
    <Tab.Screen
      name="Home"
      component={Home}
      options={{
        tabBarIcon: ({ focused }) => {
          return (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={24}
              color={focused ? COLORS.primary : COLORS.gray2}
            ></Ionicons>
          );
        },
      }}
    />

    <Tab.Screen
      name="Search"
      component={Search}
      options={{
        tabBarIcon: ({ focused }) => {
          return (
            <Ionicons
              name={"search-sharp"}
              size={24}
              color={focused ? COLORS.primary : COLORS.gray2}
            ></Ionicons>
          );
        },
      }}
    />

    <Tab.Screen
      name="Profile"
      component={Profile}
      options={{
        tabBarIcon: ({ focused }) => {
          return (
            <Ionicons
              name={focused ? "person" : "person-outline"}
              size={24}
              color={focused ? COLORS.primary : COLORS.gray2}
            ></Ionicons>
          );
        },
      }}
    />
  </Tab.Navigator>
);

export default BottomTabNavigation;
