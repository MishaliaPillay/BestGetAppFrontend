import React from "react";
import { View, StyleSheet, Text, Switch, TouchableOpacity } from "react-native";

import { Ionicons } from "@expo/vector-icons"; // Import Ionicons for icons
import { useTheme, ThemedView, ThemedText } from "../Components/Theme"; // Ensure the import is correct

const Settings = ({ navigation }) => {
  const { toggleTheme, theme } = useTheme(); // Access theme and toggle function
  const isDarkMode = theme === "dark"; // Check if the current theme is dark mode

  return (
    <ThemedView style={styles.container}>
      {/* Settings Option: Edit Name */}
      <TouchableOpacity
        style={styles.settingOption}
        onPress={() => navigation.navigate("EditName")}
      >
        <View style={styles.optionLeft}>
          <Ionicons name="person-outline" size={24} color="#06974d" />
          <ThemedText style={styles.optionText}>Edit Name</ThemedText>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#c4c4c4" />
      </TouchableOpacity>

      {/* Settings Option: Toggle Theme with a Switch */}
      <View style={styles.settingOption}>
        <View style={styles.optionLeft}>
          <Ionicons
            name={isDarkMode ? "moon-outline" : "sunny-outline"}
            size={24}
            color="#06974d"
          />
          <ThemedText style={styles.optionText}>Toggle Theme</ThemedText>
        </View>
        <Switch
          trackColor={{ false: "#767577", true: "#06974d" }}
          thumbColor={isDarkMode ? "#06974d" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleTheme} // Toggles the theme
          value={isDarkMode} // Switch is "on" if dark mode is active
        />
      </View>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff", // Default background color (white)
    padding: 20,
  },
  settingOption: {
    flexDirection: "row", // Align icon and text in a row
    justifyContent: "space-between", // Space between left (icon + text) and right (switch)
    alignItems: "center", // Align items vertically centered
    paddingVertical: 15,
    borderBottomWidth: 1, // Add a divider line between options
    borderBottomColor: "#e0e0e0",
  },
  optionLeft: {
    flexDirection: "row", // Align icon and text
    alignItems: "center", // Vertically center icon and text
  },
  optionText: {
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 15, // Space between icon and text
  },
});

export default Settings;
