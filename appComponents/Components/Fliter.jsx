import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

const filterOptions = [
  "Vegetables",
  "Dairy & Eggs",
  "Meat",
  "Seafood",
  "Plant-based",
  "Bread & Bakery",
  "Canned Goods",
  "Snacks & Sweets",
  "Tea & Coffee",
  "Soft Drinks",
  "Juices",
  "Water",
];

export default function Filter() {
  return (
    <View style={styles.Filter}>
      {filterOptions.map((item, index) => (
        <TouchableOpacity key={index} style={styles.categoryButton}>
          <Text style={styles.categoryText}>{item}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  Filter: {
    flexDirection: "row", // Arrange buttons in a row
    flexWrap: "wrap", // Allow wrapping to the next line
    justifyContent: "center", // Center align all buttons in the container
    marginBottom: 10,
  },
  categoryButton: {
    height: 40,
    paddingVertical: 10, // Padding top and bottom
    paddingHorizontal: 15, // Padding left and right
    margin: 5, // Margin for spacing around each button
    backgroundColor: "#f0f0f0",
    borderRadius: 20,
    flexShrink: 1, // Allow button to shrink based on text length
    justifyContent: "center", // Center align text vertically
    alignItems: "center", // Center align text horizontally
  },
  categoryText: {
    textAlign: "center", // Center align text horizontally
  },
});
