import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../Screens/Home"; // Adjust paths as necessary
import Favorites from "../Screens/Favorites";
import Lists from "../Screens/Lists";
import Settings from "../Screens/Settings";
import Categories from "../Screens/Categories"; // Import your Categories component
import { Ionicons } from "@expo/vector-icons"; // Icon library

const Tab = createBottomTabNavigator(); // Bottom Tab Navigator
const HomeStack = createStackNavigator(); // Stack Navigator for Home

// Home stack screen component with its own navigation stack
function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      {/* Hide the header by setting 'headerShown' to false */}
      <HomeStack.Screen
        name="HomeScreen"
        component={Home}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen name="Categories" component={Categories} />
    </HomeStack.Navigator>
  );
}

// Bottom Tab Navigator
export default function Nav() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          height: 60, // Increase height for better alignment
          paddingBottom: 10, // Adjust padding to bring icons higher
        },
        tabBarLabelStyle: {
          fontSize: 12, // Customize font size of the tab labels
        },
        tabBarIconStyle: {
          marginTop: 5, // Adjust vertical icon alignment
        },
        headerShown: false, // Hide the header
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStackScreen}
        options={{
          tabBarLabel: "Home", // Name that appears below the icon
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="FavoritesTab"
        component={Favorites}
        options={{
          tabBarLabel: "Favorites",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="heart" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="ListsTab"
        component={Lists}
        options={{
          tabBarLabel: "Lists",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="SettingsTab"
        component={Settings}
        options={{
          tabBarLabel: "Settings",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
