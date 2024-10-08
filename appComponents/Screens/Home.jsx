import React, { useState } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation
import Header from "../Components/Header";
import SearchBar from "../Components/Searchbar";
import Filter from "../Components/Fliter"; // Corrected import
import RecentSearches from "../Components/RecentSearches";
import Recommendations from "../Components/Recommendations";
import CategoryBoxes from "../Components/CategoryBoxes";

export default function Home() {
  const navigation = useNavigation(); // Initialize navigation
  const [showFilter, setShowFilter] = useState(false); // State to manage filter visibility
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
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

  const handleToggleFilter = () => {
    setShowFilter((prev) => !prev); // Toggle the filter visibility
  };

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigation.navigate("FoundProducts", { searchTerm }); // Use navigation object here
      setSearchTerm(""); // Clear the input after navigating
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Header />
        <SearchBar
          targetScreen="FoundProducts"
          showFilter={true}
          toggleFilter={handleToggleFilter} // Pass the toggle function
          options={HomeFilterOptions} // Pass the filter options
          searchTerm={searchTerm} // Pass current search term
          setSearchTerm={setSearchTerm} // Function to update search term
          onSearch={handleSearch} // Pass the search handler
        />
        {showFilter && <Filter options={HomeFilterOptions} />}
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
