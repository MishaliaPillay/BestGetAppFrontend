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
import { useTheme, ThemedView, ThemedText } from "../Components/Theme"; // Import useTheme and Themed components

// Sample data for CategoryNames
const CategoryNames = [
  { id: 1, name: "Vegetables", image: require("../../assets/images/Veg.png") },
  { id: 2, name: "Meat", image: require("../../assets/images/Meat.png") },
  {
    id: 3,
    name: "Dairy & Eggs",
    image: require("../../assets/images/DairyEggs.png"),
  },
  { id: 4, name: "Seafood", image: require("../../assets/images/Seafood.png") },
  { id: 5, name: "Fruits", image: require("../../assets/images/Fruit.png") },
  { id: 6, name: "Grains", image: require("../../assets/images/Grains.png") },
  { id: 7, name: "Snacks", image: require("../../assets/images/Snacks.png") },
  { id: 8, name: "Beverages", image: require("../../assets/images/Bev.png") },
  {
    id: 9,
    name: "Frozen Foods",
    image: require("../../assets/images/Frozen.png"),
  },
  // Add more CategoryNames here
];

export default function CategoryBoxes() {
  const navigation = useNavigation(); // To navigate to the CategoryNames screen
  const screenWidth = Dimensions.get("window").width; // Get screen width
  const boxWidth = screenWidth / 2 - 40; // Calculate box width (adjusting for margin)
  const { themeColors } = useTheme(); // Access themeColors from the context

  const handleCategoryPress = (categoryName) => {
    navigation.navigate("Categories", { selectedCategory: categoryName }); // Pass selectedCategory
  };

  return (
    <>
      <ThemedText style={styles.sectionTitle}>Categories</ThemedText>
      <ThemedView style={styles.gridContainer}>
        {CategoryNames.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryBox,
              { width: boxWidth, borderColor: themeColors.border }, // Use dynamic border color
            ]}
            onPress={() => handleCategoryPress(category.name)}
          >
            <Image source={category.image} style={styles.categoryImage} />
            <ThemedText style={styles.categoryText}>{category.name}</ThemedText>
          </TouchableOpacity>
        ))}
      </ThemedView>
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
    borderWidth: 3, // Dynamic border color will be applied
    height: 150, // Keep the height fixed for uniformity
    
    marginBottom: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5, // Add horizontal margin for consistent spacing
  },
  categoryImage: {
    width: 90,
    height: 90,
    marginBottom: 10,
  },
  categoryText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
