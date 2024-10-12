import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Image } from "expo-image";
import { useFocusEffect } from "@react-navigation/native";
import SearchBar from "../Components/Searchbar"; // Import your SearchBar component
import Pagination from "../Components/Pagination"; // Import your Pagination component

const Favorites = ({ navigation }) => {
  const [favorites, setFavorites] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const itemsPerPage = 10; // Items to display per page

  // Load favorites from AsyncStorage
  const loadFavorites = async () => {
    const storedFavorites = await AsyncStorage.getItem("favorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  };

  // Use useFocusEffect to load favorites when the screen is focused
  useFocusEffect(
    React.useCallback(() => {
      loadFavorites();
    }, []) // Dependency array for useCallback
  );

  // Filter favorites based on the search term
  const filteredFavorites = favorites.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate pagination
  const totalPages = Math.ceil(filteredFavorites.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentFavorites = filteredFavorites.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.favoriteItem}
      onPress={() => navigation.navigate("ItemCard", { itemId: item.id })} // Navigate to ItemCard
    >
      {item.image && (
        <Image source={{ uri: item.image }} style={styles.image} />
      )}
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.price}>{item.price}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onSearch={() => {}} // No action needed on search since we're filtering the list directly
      />
      <FlatList
        data={currentFavorites}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ListEmptyComponent={<Text>No favorites found.</Text>}
        contentContainerStyle={styles.listContainer}
      />
      {/* Conditionally render Pagination Component */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  listContainer: {
    paddingBottom: 20,
  },
  favoriteItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 10,
  },
  itemName: {
    fontSize: 16,
    flex: 1,
  },
  price: {
    fontSize: 16,
    color: "#888",
  },
});

export default Favorites;
