import React from "react";
import { FlatList, Text, View, StyleSheet } from "react-native";
import { useTheme, ThemedView, ThemedText } from "../Components/Theme"; // Import useTheme and Themed components

export default function RecentSearches({ searches }) {
  // Accept searches as prop
  return (
    <>
      <ThemedText style={styles.sectionTitle}>Recent searches</ThemedText>

      <FlatList
        horizontal
        data={searches} // Use the passed searches
        renderItem={({ item }) => (
          <View style={styles.placeholderBox}>
            <ThemedText>{item}</ThemedText> 
          </View>
        )}
        keyExtractor={(item, index) => index.toString()} // Use index as key for simplicity
        showsHorizontalScrollIndicator={false}
      />
    </>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },
  placeholderBox: {
    width: 100,
    height: 100,
    backgroundColor: "#e0e0e0",
    marginRight: 10,
    borderRadius: 10,
    justifyContent: "center", // Center the text vertically
    alignItems: "center", // Center the text horizontally
  },
});
