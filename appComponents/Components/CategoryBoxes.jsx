import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

// Sample data for CategoryNames
const CategoryNames = [
  { id: 1, name: "Vegetables", image: require("../../assets/images/icon.png") },
  { id: 2, name: "Meat", image: require("../../assets/images/icon.png") },
  {
    id: 3,
    name: "Dairy & Eggs",
    image: require("../../assets/images/icon.png"),
  },
  { id: 4, name: "Seafood", image: require("../../assets/images/icon.png") },
  { id: 5, name: "Fruits", image: require("../../assets/images/icon.png") },
  { id: 6, name: "Grains", image: require("../../assets/images/icon.png") },
  { id: 7, name: "Snacks", image: require("../../assets/images/icon.png") },
  { id: 8, name: "Beverages", image: require("../../assets/images/icon.png") },
  {
    id: 9,
    name: "Frozen Foods",
    image: require("../../assets/images/icon.png"),
  },
  // Add more CategoryNames here
];

export default function CategoryBoxes() {
  const navigation = useNavigation(); // To navigate to the CategoryNames screen
  const screenWidth = Dimensions.get("window").width; // Get screen width
  const boxWidth = screenWidth / 2 - 40; // Calculate box width (adjusting for margin)

  const handleCategoryPress = (categoryName) => {
    navigation.navigate("Categories", { categoryName });
  };

  return (
    <>
      <Text style={styles.sectionTitle}>CategoryNamesCategoryNames</Text>
      <View style={styles.gridContainer}>
        {CategoryNames.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[styles.categoryBox, { width: boxWidth }]} // Use calculated width
            onPress={() => handleCategoryPress(category.name)}
          >
            <Image source={category.image} style={styles.categoryImage} />
            <Text style={styles.categoryText}>{category.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center", // Center the boxes when they stack
    marginHorizontal: 10, // Add some horizontal margin to the container
  },
  categoryBox: {
    height: 150, // Keep the height fixed for uniformity
    backgroundColor: "#f0f0f0",
    marginBottom: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5, // Add horizontal margin for consistent spacing
  },
  categoryImage: {
    width: 70,
    height: 70,
    marginBottom: 10,
  },
  categoryText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
