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
import { Swipeable } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons"; // Import icons if using Expo

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
      const loadLists = async () => {
        const storedLists = await AsyncStorage.getItem("lists");
        if (storedLists) {
          setLists(JSON.parse(storedLists));
        } else {
          setLists(sampleLists); // If no lists in AsyncStorage, use sample lists
        }
      };
      loadLists();
    }, [])
  );

  const handleListClick = (list) => {
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

    await AsyncStorage.setItem("lists", JSON.stringify(updatedLists));
  };

  const deleteList = async (id) => {
    const updatedLists = lists.filter((list) => list.id !== id);
    setLists(updatedLists);

    await AsyncStorage.setItem("lists", JSON.stringify(updatedLists));
  };

  // Render the right swipe action (delete button)
  const renderRightActions = (id) => {
    return (
      <TouchableOpacity
        style={styles.deleteButtonContainer}
        onPress={() => deleteList(id)}
      >
        <MaterialCommunityIcons name="trash-can" size={24} color="white" />
      </TouchableOpacity>
    );
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
          <Swipeable renderRightActions={() => renderRightActions(item.id)}>
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
            </View>
          </Swipeable>
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
  deleteButtonContainer: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    width: 70,
    height: "100%",
  },
});
