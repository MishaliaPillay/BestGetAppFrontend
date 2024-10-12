import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme, ThemedView, ThemedText } from "../Components/Theme"; // Import useTheme and Themed components

const Header = ({ name }) => {
  return (
    <ThemedView style={styles.headerContainer}>
      <ThemedText style={styles.headerText}>
        Welcome, {name || "Guest"}!
      </ThemedText>
    </ThemedView>
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
