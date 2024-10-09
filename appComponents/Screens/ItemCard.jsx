import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Image } from "expo-image"; // Importing Image from expo-image

export default function ItemCard({ route, navigation }) {
  const { item } = route.params; // Passed product details from FoundProducts screen
  const [quantity, setQuantity] = useState(1); // Quantity of the product
  const [selectedList, setSelectedList] = useState(""); // Selected list for "Add to list"

  const incrementQuantity = () => setQuantity(quantity + 1);
  const decrementQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleAddToList = () => {
    navigation.navigate("Lists", { selectedList, item: { ...item, quantity } });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          /* Handle back button */
        }}
        style={styles.backButton}
      >
        <Text>{"<"}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          /* Handle adding to favorites */
        }}
        style={styles.favButton}
      >
        <Text>♥</Text>
      </TouchableOpacity>

      {item.image && (
        <Image source={{ uri: item.image }} style={styles.image} />
      )}

      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.price}>{item.price}</Text>
      <Text style={styles.storeLabel}>This item is from {item.source}</Text>

      <View style={styles.quantityContainer}>
        <TouchableOpacity onPress={decrementQuantity} style={styles.quantityButton}>
          <Text style={styles.quantityText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantityValue}>{quantity}</Text>
        <TouchableOpacity onPress={incrementQuantity} style={styles.quantityButton}>
          <Text style={styles.quantityText}>+</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.listContainer}>
        <Text style={styles.addToList}>Add to list</Text>
        <Picker
          selectedValue={selectedList}
          onValueChange={(itemValue) => setSelectedList(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Select a list" value="" />
          <Picker.Item label="Groceries" value="groceries" />
          <Picker.Item label="Weekly Shop" value="weekly-shop" />
          <Picker.Item label="Special Items" value="special-items" />
        </Picker>
        <TouchableOpacity style={styles.addButton} onPress={handleAddToList}>
          <Text style={styles.addButtonText}>Add to {selectedList}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  backButton: {
    position: "absolute",
    top: 10,
    left: 10,
  },
  favButton: {
    position: "absolute",
    top: 10,
    right: 10,
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
  listContainer: {
    marginTop: 20,
    width: "100%",
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 10,
    padding: 10,
  },
  addToList: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  picker: {
    width: "100%",
  },
  addButton: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 18,
  },
});
