import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { Button } from "react-native-elements"; // Import Button from react-native-elements

export default function ListItem({ item, onPress, isChecked, onCheckToggle }) {
  // Extract numeric value from price string (assuming it starts with 'R')
  const priceValue = parseFloat(item.price.replace("R", "")) || 0;

  return (
    <View style={[styles.itemContainer, isChecked && styles.checkedContainer]}>
      {item.image && (
        <Image source={{ uri: item.image }} style={styles.itemImage} />
      )}
      <View style={styles.itemDetails}>
        <Text style={[styles.itemName, isChecked && styles.checkedText]}>
          {item.name}
        </Text>
        <Text style={[styles.itemStore, isChecked && styles.checkedText]}>
          Store: {item.source}
        </Text>
        <Text style={[styles.itemPrice, isChecked && styles.checkedText]}>
          Price: R{priceValue.toFixed(2)}
        </Text>
        <Text style={[styles.itemQuantity, isChecked && styles.checkedText]}>
          Quantity: {item.quantity}
        </Text>
      </View>
      <Button
        title={isChecked ? "Got It!" : "Get It!"} // Change button text based on checked state
        onPress={onCheckToggle} // Call the toggle function when the button is pressed
        buttonStyle={styles.buttonStyle} // Optional styling for the button
      />
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    padding: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-between", // Align items with space in between
  },
  checkedContainer: {
    backgroundColor: "#e0e0e0", // Dim background for checked items
  },
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 10,
  },
  itemDetails: {
    flex: 1,
    justifyContent: "center",
  },
  itemName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  itemStore: {
    fontSize: 14,
    color: "#555",
  },
  itemPrice: {
    fontSize: 14,
    color: "#888",
    marginTop: 5,
  },
  itemQuantity: {
    fontSize: 14,
    color: "#888",
    marginTop: 5,
  },
  checkedText: {
    textDecorationLine: "line-through", // Strike-through text when checked
    color: "#888", // Dim text color when checked
  },
  buttonStyle: {
    backgroundColor: "#4caf50", // Green color for the button
    borderRadius: 5,
  },
});
