// SearchBar.jsx
import React from "react";
import { TextInput, TouchableOpacity, View, StyleSheet } from "react-native";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons"; // For icons

export default function SearchBar({ onToggleFilter }) {
  return (
    <View style={styles.container}>
      <View style={styles.searchSection}>
        <TextInput placeholder="Search here" style={styles.searchInput} />
        <TouchableOpacity style={styles.searchIcon}>
          <FontAwesome5 name="search" size={20} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={onToggleFilter} style={styles.categoryIcon}>
        <FontAwesome5 name="filter" size={24} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  searchSection: {
    flex: 1,
    position: "relative",
  },
  searchInput: {
    padding: 10,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 25,
  },
  searchIcon: {
    position: "absolute",
    right: 10,
    top: 10,
  },
  categoryIcon: {
    marginLeft: 10, // Add space between search bar and category icon
  },
});
