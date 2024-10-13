// src/components/LoadingSpinner.js
import React from "react";
import { ActivityIndicator, View, StyleSheet } from "react-native";

const LoadingSpinner = () => (
  <View style={styles.container}>
    <ActivityIndicator size={60} color="#06974d" />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center", // Center vertically
    alignItems: "center", // Center horizontally
  },
});

export default LoadingSpinner;
