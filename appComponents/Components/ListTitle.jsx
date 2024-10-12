// src/components/listItem.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Image } from "expo-image"; // Importing Image from expo-image
import logos from "./Logo"; // Create logos.js to export logos object

const ListTitle = (/*{ item }*/) => (
  <View style={styles.listItem}>
    <View style={styles.listDetails}>
      <View style={styles.listInfo}>
        <Text style={styles.listQuantity}>Cheese</Text>
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  listItem: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    paddingBottom: 10,
    paddingVertical: 10,
  },
  listDetails: {
    flexDirection: "row",
    alignItems: "center",
  },
  productImage: {
    width: 80,
    height: 80,
    marginRight: 10,
  },
  listInfo: {
    flex: 1,
  },
  productHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  productName: {
    fontWeight: "bold",
    fontSize: 16,
    flex: 1,
  },
  storeLogo: {
    width: 30,
    height: 30,
  },
  listQuantity: {
    color: "gray",
    marginTop: 5,
  },
});

export default ListTitle;
