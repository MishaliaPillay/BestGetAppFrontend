import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

export default function Filter({ options, onFilterSelect }) {
  return (
    <View style={styles.container}>
      {options.map((option) => (
        <TouchableOpacity
          key={option}
          style={styles.filterButton}
          onPress={() => onFilterSelect(option)} // Call the filter selection function
        >
          <Text style={styles.filterText}>{option}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap", // Allow wrapping of buttons
    justifyContent: "flex-start", // Align items to the start of the container
    marginVertical: 10,
  },
  filterButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 25,
    backgroundColor: "white",
    margin: 5, // Add margin to create space between buttons
  },
  filterText: {
    color: "black",
  },
});
