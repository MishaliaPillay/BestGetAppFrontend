// src/components/ListItem.js
import React, { useState, useCallback } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Image } from "expo-image"; // Importing Image from expo-image
import { useFocusEffect } from "@react-navigation/native"; // Importing useFocusEffect
import AsyncStorage from "@react-native-async-storage/async-storage"; // Importing AsyncStorage for data management

const ListItem = ({ listId }) => {
  const [list, setList] = useState(null);

  // Fetch the updated list data when the screen comes into focus
  useFocusEffect(
    useCallback(() => {
      const fetchListData = async () => {
        try {
          const storedLists = await AsyncStorage.getItem("lists");
          if (storedLists) {
            const parsedLists = JSON.parse(storedLists);
            const selectedList = parsedLists.find((l) => l.id === listId);
            setList(selectedList);
          }
        } catch (error) {
          console.error("Error fetching the list:", error);
        }
      };

      fetchListData();
    }, [listId]) // Dependency on listId
  );

  // If no list data is available, show a loading message or empty state
  if (!list) {
    return <Text>Loading list...</Text>;
  }

  return (
    <View style={styles.ListItem}>
      {list.items.map((item, index) => (
        <View key={index} style={styles.listDetails}>
          <Image
            source={{ uri: item.image }}
            style={styles.listImage}
            contentFit="cover"
          />
          <View style={styles.listInfo}>
            <View style={styles.listHeader}>
              <Text style={styles.listName}>{item.name}</Text>
            </View>
            <Text style={styles.listPrice}>Quantity = {item.quantity}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  ListItem: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    paddingBottom: 10,
    paddingVertical: 10,
  },
  listDetails: {
    flexDirection: "row",
    alignItems: "center",
  },
  listImage: {
    width: 80,
    height: 80,
    marginRight: 10,
  },
  listInfo: {
    flex: 1,
  },
  listHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  listName: {
    fontWeight: "bold",
    fontSize: 16,
    flex: 1,
  },
  storeLogo: {
    width: 30,
    height: 30,
  },
  listPrice: {
    color: "gray",
    marginTop: 5,
  },
});

export default ListItem;
