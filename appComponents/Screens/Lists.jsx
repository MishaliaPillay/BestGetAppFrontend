import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Button,
  TextInput,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

// Sample list data for initialization
const sampleLists = [
  { id: "1", name: "Groceries", totalPrice: 0, itemCount: 0, items: [] },
  { id: "2", name: "Weekly Shop", totalPrice: 0, itemCount: 0, items: [] },
];

export default function Lists() {
  const navigation = useNavigation();
  const [lists, setLists] = useState(sampleLists); // Initialize with sample lists
  const [newListName, setNewListName] = useState("");

  useFocusEffect(
    React.useCallback(() => {
      // Load the lists from AsyncStorage whenever the screen is focused
      const loadLists = async () => {
        const storedLists = await AsyncStorage.getItem("lists");
        if (storedLists) {
          setLists(JSON.parse(storedLists));
        } else {
          setLists(sampleLists); // If no lists in AsyncStorage, use sample lists
        }
      };
      loadLists();
    }, []) // Dependency array ensures this effect runs when the screen is focused
  );

  const handleListClick = (list) => {
    // Navigate to SelectedList page, passing the selected list
    navigation.navigate("SelectedList", { list });
  };

  const addNewList = async () => {
    const trimmedName = newListName.trim();

    if (trimmedName === "") {
      alert("List name cannot be empty or only spaces.");
      return;
    }

    const newList = {
      id: (lists.length + 1).toString(),
      name: trimmedName,
      totalPrice: 0,
      itemCount: 0,
      items: [],
    };

    const updatedLists = [...lists, newList];
    setLists(updatedLists);
    setNewListName("");

    // Update AsyncStorage
    await AsyncStorage.setItem("lists", JSON.stringify(updatedLists));
  };

  const deleteList = async (id) => {
    const updatedLists = lists.filter((list) => list.id !== id);
    setLists(updatedLists);

    // Update AsyncStorage
    await AsyncStorage.setItem("lists", JSON.stringify(updatedLists));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.listName}>Shopping Lists</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter new list name"
        value={newListName}
        onChangeText={setNewListName}
        maxLength={20}
      />

      {newListName.trim().length > 0 && (
        <Button title="Add New List" onPress={addNewList} />
      )}

      <FlatList
        data={lists}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.listItemContainer}>
            <TouchableOpacity
              onPress={() => handleListClick(item)}
              style={styles.listItem}
            >
              <Text style={styles.listTitle}>{item.name}</Text>
              <Text style={styles.listDetails}>
                Total Price: {item.totalPrice} | Items: {item.itemCount}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => deleteList(item.id)}>
              <Text style={styles.deleteButton}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: "5%" },
  input: {
    borderColor: "#06974d",
    borderWidth: 1.5,
    borderRadius: 25,
    padding: 10,
    marginBottom: 10,
  },
  listItemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  listItem: {
    flex: 1,
  },
  listName: {
    paddingTop: "15%",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  listDetails: {
    fontSize: 14,
    color: "#555",
  },
  deleteButton: {
    color: "red",
    fontWeight: "bold",
    paddingHorizontal: 10,
  },
});
