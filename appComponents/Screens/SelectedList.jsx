import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SelectedList({ route, navigation }) {
  const { list } = route.params || {}; // Safeguard in case route params are undefined
  const [items, setItems] = useState(list?.items || []); // Handle undefined list

  // Safeguard in case list is not passed
  if (!list) {
    return (
      <View style={styles.container}>
        <Text>No list selected.</Text>
      </View>
    );
  }

  const addItemToList = async (newItem) => {
    const updatedItems = [...items, newItem];
    setItems(updatedItems);

    // Update the total price and item count
    const updatedList = {
      ...list,
      items: updatedItems,
      totalPrice: list.totalPrice + newItem.price,
      itemCount: list.itemCount + 1,
    };

    // Update AsyncStorage
    const storedLists = JSON.parse(await AsyncStorage.getItem("lists")) || [];
    const updatedLists = storedLists.map((storedList) =>
      storedList.id === list.id ? updatedList : storedList
    );

    await AsyncStorage.setItem("lists", JSON.stringify(updatedLists));
  };

  // Example of how to add an item (replace with your actual item structure)
  const exampleNewItem = { id: "4", name: "Milk", price: 1.5 };

  return (
    <View style={styles.container}>
      <Text style={styles.listTitle}>{list.name}</Text>
      <Text style={styles.listDetails}>Price: | Items: {list.itemCount}</Text>

      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Text>{item.name}</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  listTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  listDetails: {
    fontSize: 18,
    color: "#555",
  },
});
