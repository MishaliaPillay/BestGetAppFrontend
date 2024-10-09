import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SelectList({ route }) {
  const { list } = route.params; // Get the selected list details
  const [items, setItems] = useState(list.items);

  const addItemToList = async (newItem) => {
    const updatedItems = [...items, newItem];
    setItems(updatedItems);

    // Update the total price and item count
    list.totalPrice += newItem.price;
    list.itemCount += 1;

    // Update AsyncStorage
    const storedLists = JSON.parse(await AsyncStorage.getItem("lists")) || [];
    const updatedLists = storedLists.map((storedList) =>
      storedList.id === list.id ? { ...storedList, items: updatedItems, totalPrice: list.totalPrice, itemCount: list.itemCount } : storedList
    );

    await AsyncStorage.setItem("lists", JSON.stringify(updatedLists));
  };

  // Example of how to add an item (replace with your actual item structure)
  const exampleNewItem = { id: "4", name: "Milk", price: 1.5 };

  return (
    <View style={styles.container}>
      <Text style={styles.listTitle}>{list.name}</Text>
      <Text style={styles.listDetails}>
        Price: ${list.totalPrice.toFixed(2)} | Items: {list.itemCount}
      </Text>

      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Text>{item.name}</Text>}
      />

      <Button title="Add Milk" onPress={() => addItemToList(exampleNewItem)} />
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
