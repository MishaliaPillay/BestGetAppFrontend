import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ListItem from "../Components/ListItem"; // Import the ListItem component

export default function SelectedList({ route, navigation }) {
  const { list } = route.params || {};
  const [items, setItems] = useState(list?.items || []);
  const [checkedItems, setCheckedItems] = useState([]); // State for checked items
  const [hideChecked, setHideChecked] = useState(false); // State for hiding checked items

  if (!list) {
    return (
      <View style={styles.container}>
        <Text>No list selected.</Text>
      </View>
    );
  }

  // Correct total price calculation
  const totalPrice = items
    .reduce((acc, item) => {
      const itemPrice = parseFloat(item.price.replace("R", "")) || 0; // Extract numeric value from price string
      return acc + itemPrice * item.quantity; // Multiply by quantity
    }, 0)
    .toFixed(2);

  const addItemToList = async (newItem) => {
    const existingItemIndex = items.findIndex((item) => item.id === newItem.id);
    let updatedItems;

    if (existingItemIndex !== -1) {
      // Update the quantity if item already exists
      updatedItems = [...items];
      updatedItems[existingItemIndex].quantity += newItem.quantity;
    } else {
      // Add new item
      updatedItems = [...items, newItem];
    }

    setItems(updatedItems);

    const updatedList = {
      ...list,
      items: updatedItems,
      totalPrice: updatedItems
        .reduce((acc, item) => acc + item.price * item.quantity, 0)
        .toFixed(2), // Update totalPrice here
      itemCount: updatedItems.reduce((count, item) => count + item.quantity, 0),
    };

    const storedLists = JSON.parse(await AsyncStorage.getItem("lists")) || [];
    const updatedLists = storedLists.map((storedList) =>
      storedList.id === list.id ? updatedList : storedList
    );

    await AsyncStorage.setItem("lists", JSON.stringify(updatedLists));
  };

  // Function to handle checking off an item
  const toggleCheckItem = (itemId) => {
    setCheckedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  // Function to clear the list
  const clearList = async () => {
    const updatedList = {
      ...list,
      items: [],
      totalPrice: 0,
      itemCount: 0,
    };

    const storedLists = JSON.parse(await AsyncStorage.getItem("lists")) || [];
    const updatedLists = storedLists.map((storedList) =>
      storedList.id === list.id ? updatedList : storedList
    );

    setItems([]);
    await AsyncStorage.setItem("lists", JSON.stringify(updatedLists));
  };

  // Function to reset all checked items
  const resetCheckedItems = () => {
    setCheckedItems([]);
  };

  // Confirm clearing the list
  const confirmClearList = () => {
    Alert.alert(
      "Clear List",
      "Are you sure you want to clear the entire list?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "OK", onPress: clearList },
      ]
    );
  };

  // Function to handle item press
  const handleItemPress = (item) => {
    navigation.navigate("ItemCard", { item }); // Navigate to ItemCard with the item
  };

  const renderItem = ({ item }) => (
    <ListItem
      item={item}
      onPress={() => handleItemPress(item)}
      isChecked={checkedItems.includes(item.id)}
      onCheckToggle={() => toggleCheckItem(item.id)} // Pass the toggle function
    />
  );

  // Filter items based on whether to show checked or all items
  const filteredItems = hideChecked
    ? items.filter((item) => !checkedItems.includes(item.id))
    : items;

  return (
    <View style={styles.container}>
      <Text style={styles.listTitle}>{list.name}</Text>
      <Text style={styles.listDetails}>
        Total Price: R{totalPrice} | Items:{" "}
        {items.reduce((count, item) => count + item.quantity, 0)}
      </Text>

      <FlatList
        data={filteredItems} // Use filtered items for display
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text>No items in this list. Add some items to get started.</Text>
        }
      />

      {/* Conditionally render action buttons only if there are items */}
      {items.length > 0 && (
        <View style={styles.actions}>
          <TouchableOpacity
            onPress={() => setHideChecked((prev) => !prev)}
            style={styles.hideButton}
          >
            <Text style={styles.hideText}>
              {hideChecked ? "Show Got Items" : "Hide Gotten Items"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={confirmClearList}
            style={styles.clearButton}
          >
            <Text style={styles.clearText}>Clear List</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={resetCheckedItems}
            style={styles.resetButton}
          >
            <Text style={styles.resetText}>Reset Checked</Text>
          </TouchableOpacity>
        </View>
      )}
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
    marginBottom: 20,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  hideButton: {
    backgroundColor: "#2196F3", // Blue color for the hide button
    padding: 10,
    borderRadius: 5,
  },
  hideText: {
    color: "#fff",
    fontSize: 16,
  },
  clearButton: {
    backgroundColor: "#f44336",
    padding: 10,
    borderRadius: 5,
  },
  clearText: {
    color: "#fff",
    fontSize: 16,
  },
  resetButton: {
    backgroundColor: "#4caf50",
    padding: 10,
    borderRadius: 5,
  },
  resetText: {
    color: "#fff",
    fontSize: 16,
  },
});
