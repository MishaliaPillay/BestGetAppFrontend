import React from "react";
import {
  FlatList,
  TouchableOpacity,
  View,
  StyleSheet,
  Text,
} from "react-native";
import { ThemedText } from "../Components/Theme"; // Adjust import according to your structure

export default function RecentSearches({ searches, onSearch }) {
  // Filter the searches to only include strings
  const filteredSearches = searches.filter((item) => typeof item === "string");

  return (
    <>
      <ThemedText style={styles.sectionTitle}>Recent searches</ThemedText>

      <FlatList
        horizontal
        data={filteredSearches} // Use filtered searches
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => onSearch(item)}>
            {/* Trigger onSearch when a search term is clicked */}
            <View style={styles.placeholderBox}>
              <Text style={styles.placeholderText}>{item}</Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
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
    fontSize: 18,
    text: "#ffffff",
    width: 100,
    height: 50,
    backgroundColor: "#06974d",
    marginRight: 10,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    color: "#ffffff", // White text color
    fontSize: 15,
    fontWeight: "bold",
  },
});
