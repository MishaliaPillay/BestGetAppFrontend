import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Button,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

export default function Lists() {
  const navigation = useNavigation();
  const [lists, setLists] = useState([]);

  useEffect(() => {
    const fetchLists = async () => {
      const storedLists = await loadListsFromStorage();
      setLists(storedLists);
    };
    fetchLists();
  }, []);

  const loadListsFromStorage = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@lists");
      return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (e) {
      console.error("Error loading data", e);
      return [];
    }
  };

  const saveListsToStorage = async (updatedLists) => {
    try {
      const jsonValue = JSON.stringify(updatedLists);
      await AsyncStorage.setItem("@lists", jsonValue);
    } catch (e) {
      console.error("Error saving data", e);
    }
  };

  const handleListClick = (list) => {
    navigation.navigate("SelectList", { list });
  };

  const handleAddItemToList = async (item, quantity) => {
    const listIndex = lists.findIndex((list) => list.id === item.listId); // Get the index of the selected list
    if (listIndex !== -1) {
      const updatedLists = [...lists];
      const selectedList = updatedLists[listIndex];

      // Add item details to the selected list
      selectedList.items.push({ ...item, quantity });

      // Update total price and item count
      selectedList.totalPrice += item.price * quantity;
      selectedList.itemCount += quantity;

      updatedLists[listIndex] = selectedList; // Update the list
      setLists(updatedLists); // Update state
      await saveListsToStorage(updatedLists); // Save to AsyncStorage
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={lists}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handleListClick(item)}
            style={styles.listItem}
          >
            <Text style={styles.listName}>{item.name}</Text>
            <Text style={styles.listDetails}>
              Price: ${item.totalPrice.toFixed(2)} | Items: {item.itemCount}
            </Text>
            <Button
              title="Add Item"
              onPress={() =>
                handleAddItemToList(
                  { name: "Item Name", price: 10, listId: item.id },
                  2
                )
              }
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  listItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  listName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  listDetails: {
    fontSize: 14,
    color: "#555",
  },
});
