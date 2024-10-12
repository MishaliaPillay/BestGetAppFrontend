import React from "react";
import { TextInput, TouchableOpacity, View, StyleSheet } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons"; // For icons

export default function SearchBar({
  showFilter,
  searchTerm,
  setSearchTerm,
  onSearch, // Function to trigger the search
  toggleFilter,
}) {
  return (
    <View style={styles.container}>
      <View style={styles.searchSection}>
        <TextInput
          placeholder="Search here"
          style={styles.searchInput}
          value={searchTerm}
          onChangeText={setSearchTerm} // Updates user input
          onSubmitEditing={onSearch} // Trigger search on Enter
        />
        <TouchableOpacity style={styles.searchIcon} onPress={onSearch}>
          <FontAwesome5 name="search" size={20} color="#06974d" />
        </TouchableOpacity>
      </View>
      {showFilter && (
        <TouchableOpacity onPress={toggleFilter} style={styles.categoryIcon}>
          <FontAwesome5 name="filter" size={24} color="#06974d" />
        </TouchableOpacity>
      )}
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
    fontSize: 18,
    padding: 10,
    borderColor: "#06974d",
    borderWidth: 1.5,
    borderRadius: 25,
    backgroundColor: "#fcfcfc",
    paddingLeft: 30,
  },
  searchIcon: {
    position: "absolute",
    right: 10,
    top: 15,
    Color: "#06974d",
  },
  categoryIcon: {
    marginLeft: 10,
  },
});
