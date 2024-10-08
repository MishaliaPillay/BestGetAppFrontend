// src/components/NoProductsMessage.js
import React from "react";
import { Text, StyleSheet } from "react-native";

const NoProductsMessage = () => (
  <Text style={styles.noProductsText}>
    No products matching your search were found.
  </Text>
);

const styles = StyleSheet.create({
  noProductsText: {
    fontSize: 18,
    color: "gray",
    textAlign: "center",
    marginTop: 20,
  },
});

export default NoProductsMessage;
