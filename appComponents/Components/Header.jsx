import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Header = ({ name }) => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>Welcome, {name || "Guest"}!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    paddingTop: 40,
    paddingBottom: 20,
    backgroundColor: "#f8f8f8",
    alignItems: "center",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default Header;
