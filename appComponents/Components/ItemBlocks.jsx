import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Image } from "expo-image"; // Importing Image from expo-image
import logos from "./Logo"; // Create logos.js to export logos object
import { ThemedViewShadow } from "../Components/Theme"; // Import ThemedViewShadow

const ItemBlock = ({ item }) => (
  <ThemedViewShadow style={styles.productItem}>
    <Image
      source={{ uri: item.image }}
      style={styles.productImage}
      contentFit="cover"
    />
    <View style={styles.productInfo}>
      <View style={styles.productHeader}>
        <Text style={styles.productName} numberOfLines={1}>
          {item.name}
        </Text>
      </View>
      <View style={styles.priceSourceContainer}>
        <Text style={styles.productPrice} numberOfLines={1}>
          {item.price}
        </Text>
        {item.source && logos[item.source] && (
          <Image source={logos[item.source]} style={styles.storeLogo} />
        )}
      </View>
    </View>
  </ThemedViewShadow>
);

const styles = StyleSheet.create({
  productItem: {
    width: 120, // Set a fixed width for consistency in Recommendations
    marginRight: 10, // Space between items in horizontal layout
    borderRadius: 10,
    backgroundColor: "#bbedd3",
    padding: 10,
    height: 200, // Fixed height for the item
    paddingTop: 30,
  },
  productImage: {
    width: "100%", // Full width of the container
    height: 80,
    borderRadius: 10,
    marginBottom: 5,
  },
  productInfo: {
    flex: 1,
  },
  productHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  productName: {
    fontWeight: "bold",
    fontSize: 14, // Adjusted for better readability
    flex: 1,
    overflow: "hidden", // Hide overflow
    textOverflow: "ellipsis", // Text overflow style
    whiteSpace: "nowrap", // Prevent wrapping
  },
  priceSourceContainer: {
    flexDirection: "row",
    justifyContent: "space-between", // Space between price and logo
    alignItems: "center", // Align items vertically center
    marginTop: 5, // Add some margin at the top
  },
  storeLogo: {
    width: 30,
    height: 30,
    borderRadius: 10,
  },
  productPrice: {
    color: "gray",
    fontSize: 12, // Adjusted font size for consistency
    overflow: "hidden", // Hide overflow for the price
    textOverflow: "ellipsis", // Text overflow style
    whiteSpace: "nowrap", // Prevent wrapping
  },
});

export default ItemBlock;
