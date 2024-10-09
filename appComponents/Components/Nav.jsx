import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../Screens/Home"; // Adjust paths as necessary
import Favorites from "../Screens/Favorites";
import Lists from "../Screens/Lists";
import ItemCard from "../Screens/ItemCard";
import SelectList from "../Screens/SelectedList";

import Settings from "../Screens/Settings";
import FoundProducts from "../Screens/FoundProducts"; // Import your FoundProducts component
import Categories from "../Screens/Categories"; // Import your Categories component
import { Ionicons } from "@expo/vector-icons"; // Icon library

const Tab = createBottomTabNavigator(); // Bottom Tab Navigator
const HomeStack = createStackNavigator(); // Stack Navigator for Home

// Home stack screen component with its own navigation stack
function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="HomeScreen"
        component={Home}
        options={{ headerShown: false }} // Hides the header for the Home screen
      />
      <HomeStack.Screen name="Categories" component={Categories} />
      <HomeStack.Screen
        name="FoundProducts" // Replace SearchResults with FoundProducts
        component={FoundProducts}
        options={{ title: "Found Products" }} // Set the title for the header
      />
      <HomeStack.Screen
        name="ItemCard" // Replace SearchResults with FoundProducts
        component={ItemCard}
        options={{ title: "Product details" }} // Set the title for the header
      />

      <HomeStack.Screen
        name="SelectList" // Replace SearchResults with FoundProducts
        component={SelectList}
        options={{ title: "Selected List" }} // Set the title for the header
      />
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
          paddingBottom: 0, // Adjust padding to bring icons higher
        },
        tabBarLabelStyle: {
          fontSize: 12, // Customize font size of the tab labels
        },
        tabBarIconStyle: {
          marginTop: 5, // Adjust vertical icon alignment
        },
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStackScreen} // You can control the header inside HomeStackScreen
        options={{
          tabBarLabel: "", // Name that appears below the icon
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
          headerShown: false, // Hides the header for HomeTab
        }}
      />
      <Tab.Screen
        name="FavoritesTab"
        component={Favorites}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="heart" color={color} size={size} />
          ),
          headerShown: false, // Show the header for FavoritesTab
        }}
      />
      <Tab.Screen
        name="Lists"
        component={Lists}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list" color={color} size={size} />
          ),
          headerShown: false, // Show the header for ListsTab
        }}
      />
      <Tab.Screen
        name="SettingsTab"
        component={Settings}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings" color={color} size={size} />
          ),
          headerShown: false, // Show the header for SettingsTab
        }}
      />
    </Tab.Navigator>
  );
}
