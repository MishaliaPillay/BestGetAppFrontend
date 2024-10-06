import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";

export default function Categories() {
  const route = useRoute();
  const { categoryName } = route.params; // Get the category name from route params

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{categoryName}</Text>
      <Text style={styles.content}>
        Here are some items in the {categoryName} category.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  content: {
    fontSize: 16,
    marginTop: 10,
  },
});
