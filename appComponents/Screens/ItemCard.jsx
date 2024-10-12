import React, { useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Button,
  FlatList,
} from "react-native";
import { Image } from "expo-image";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ItemCard({ route, navigation }) {
  const { item } = route.params; // Passed product details from FoundProducts screen
  const [lists, setLists] = useState([]); // Shopping lists
  const [selectedList, setSelectedList] = useState(null); // Selected list
  const [quantity, setQuantity] = useState(1); // Quantity of the product

  useFocusEffect(
    React.useCallback(() => {
      const loadLists = async () => {
        const storedLists = await AsyncStorage.getItem("lists");
        if (storedLists) {
          setLists(JSON.parse(storedLists));
        }
      };
      loadLists();
    }, []) // This is the dependency array for useCallback
  );

  const incrementQuantity = () => setQuantity(quantity + 1);
  const decrementQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleAddToList = async () => {
    if (!selectedList) {
      alert("Please select a list to add this item to.");
      return;
    }

    const newItem = { ...item, quantity };

    // Update the selected list with the new item
    const updatedLists = lists.map((list) => {
      if (list.id === selectedList.id) {
        const updatedList = {
          ...list,
          items: [...list.items, newItem],
          itemCount: list.itemCount + 1,
          totalPrice: list.totalPrice + item.price * quantity,
        };
        return updatedList;
      }
      return list;
    });

    // Update state and AsyncStorage
    setLists(updatedLists);
    await AsyncStorage.setItem("lists", JSON.stringify(updatedLists));
    alert(`${item.name} has been added to ${selectedList.name}`);
  };

  const renderItem = ({ item: list }) => (
    <TouchableOpacity
      style={
        selectedList?.id === list.id ? styles.selectedList : styles.listButton
      }
      onPress={() => setSelectedList(list)}
    >
      <Text>{list.name}</Text>
    </TouchableOpacity>
  );

  const listHeaderComponent = () => (
    <>
      {item.image && (
        <Image source={{ uri: item.image }} style={styles.image} />
      )}
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.price}>{item.price}</Text>
      <Text style={styles.storeLabel}>This item is from {item.source}</Text>

      <View style={styles.quantityContainer}>
        <TouchableOpacity
          onPress={decrementQuantity}
          style={styles.quantityButton}
        >
          <Text style={styles.quantityText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantityValue}>{quantity}</Text>
        <TouchableOpacity
          onPress={incrementQuantity}
          style={styles.quantityButton}
        >
          <Text style={styles.quantityText}>+</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.selectListLabel}>Select a List:</Text>
    </>
  );

  return (
    <FlatList
      data={lists}
      keyExtractor={(list) => list.id.toString()} // Ensure unique keys
      renderItem={renderItem}
      ListHeaderComponent={listHeaderComponent}
      ListEmptyComponent={
        <Text>No lists available. Please create one first.</Text>
      }
      ListFooterComponent={
        <Button title="Add to Selected List" onPress={handleAddToList} />
      }
      style={styles.flatList} // Added style here
      contentContainerStyle={styles.container} // Added for consistent padding
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
    borderRadius: 10,
  },
  itemName: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  price: {
    fontSize: 18,
    color: "#888",
    marginBottom: 10,
  },
  storeLabel: {
    fontSize: 14,
    color: "#555",
    marginBottom: 20,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  quantityButton: {
    borderWidth: 1,
    borderColor: "#000",
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  quantityText: {
    fontSize: 18,
  },
  quantityValue: {
    fontSize: 18,
    fontWeight: "bold",
  },
  selectListLabel: {
    fontSize: 16,
    marginBottom: 10,
  },
  listButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginVertical: 5,
    backgroundColor: "#f9f9f9",
  },
  selectedList: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 5,
    marginVertical: 5,
    backgroundColor: "#cce5ff",
  },
});
