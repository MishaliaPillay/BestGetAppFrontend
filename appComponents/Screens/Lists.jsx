import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

// Sample list data for initialization
const sampleLists = [
  { id: "1", name: "Groceries", totalPrice: 50, itemCount: 0, items: [] },
  { id: "2", name: "Weekly Shop", totalPrice: 75, itemCount: 0, items: [] },
  { id: "3", name: "Special Items", totalPrice: 100, itemCount: 0, items: [] },
];

export default function Lists() {
  const navigation = useNavigation();
  const [lists, setLists] = useState([]);

  useEffect(() => {
    // Load the lists from AsyncStorage
    const loadLists = async () => {
      const storedLists = await AsyncStorage.getItem("lists");
      if (storedLists) {
        setLists(JSON.parse(storedLists));
      } else {
        setLists(sampleLists);
      }
    };

    loadLists();
  }, []);

  const handleListClick = (list) => {
    navigation.navigate("SelectList", { list });
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
