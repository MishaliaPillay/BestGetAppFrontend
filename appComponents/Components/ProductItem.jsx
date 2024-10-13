// src/components/ProductItem.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Image } from "expo-image"; // Importing Image from expo-image
import logos from "./Logo"; // Create logos.js to export logos object

const ProductItem = ({ item }) => (
  <View style={styles.productItem}>
    <View style={styles.productDetails}>
      <Image
        source={{ uri: item.image }}
        style={styles.productImage}
        contentFit="cover"
      />
      <View style={styles.productInfo}>
        <View style={styles.productHeader}>
          <Text style={styles.productName}>{item.name}</Text>
          {item.source && logos[item.source] && (
            <Image source={logos[item.source]} style={styles.storeLogo} />
          )}
        </View>
        <Text style={styles.productPrice}>{item.price}</Text>
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  productItem: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    paddingBottom: 10,
    paddingVertical: 10,
  },
  productDetails: {
    flexDirection: "row",
    alignItems: "center",
  },
  productImage: {
    width: 80,
    height: 80,
    marginRight: 10,
    borderRadius: 10,
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
    fontSize: 16,
    flex: 1,
  },
  storeLogo: {
    width: 30,
    height: 30,
  },
  productPrice: {
    color: "gray",
    marginTop: 5,
  },
});

export default ProductItem;
