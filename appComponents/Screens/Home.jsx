import React, { useEffect, useState, useCallback } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native"; // Import useFocusEffect
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "../Components/Header";
import SearchBar from "../Components/Searchbar";
import Filter from "../Components/Fliter";
import RecentSearches from "../Components/RecentSearches";
import Recommendations from "../Components/Recommendations";
import CategoryBoxes from "../Components/CategoryBoxes";

export default function Home() {
  const navigation = useNavigation();
  const [showFilter, setShowFilter] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [name, setName] = useState(""); // State for the user's name

  const HomeFilterOptions = [
    "Vegetables",
    "Dairy & Eggs",
    "Meat",
    "Seafood",
    "Plant-based",
    "Bread & Bakery",
    "Canned Goods",
    "Snacks & Sweets",
    "Tea & Coffee",
    "Soft Drinks",
    "Juices",
    "Water",
  ];

  // Retrieve the name from AsyncStorage when the screen gains focus
  useFocusEffect(
    useCallback(() => {
      const fetchName = async () => {
        try {
          const storedName = await AsyncStorage.getItem("userName");
          if (storedName) {
            setName(storedName); // Set the name if it exists in storage
          }
        } catch (error) {
          console.error("Error fetching name:", error);
        }
      };

      fetchName();
    }, [])
  );

  const handleToggleFilter = () => {
    setShowFilter((prev) => !prev);
  };

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigation.navigate("FoundProducts", { searchTerm });
      setSearchTerm("");
    }
  };

  const handleFilterSelect = (filter) => {
    navigation.navigate("Categories", { selectedCategory: filter });
    setShowFilter(false);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Pass the name as a prop to Header to display it */}
        <Header name={name} />
        <SearchBar
          targetScreen="FoundProducts"
          showFilter={true}
          toggleFilter={handleToggleFilter}
          options={HomeFilterOptions}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onSearch={handleSearch}
        />
        {showFilter && (
          <Filter
            options={HomeFilterOptions}
            onFilterSelect={handleFilterSelect}
          />
        )}
        <RecentSearches />
        <Recommendations />
        <CategoryBoxes />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    paddingTop: "1%",
    paddingHorizontal: 20,
  },
});
