import React, { useState } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import Header from "../Components/Header";
import SearchBar from "../Components/Searchbar";
import Filter from "../Components/Fliter"; // Corrected import
import RecentSearches from "../Components/RecentSearches";
import Recommendations from "../Components/Recommendations";
import CategoryBoxes from "../Components/CategoryBoxes";

export default function Home() {
  const [showFilter, setShowFilter] = useState(false); // State to manage filter visibility
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

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Header />
        <SearchBar
          targetScreen="FoundProducts"
          showFilter={true}
          toggleFilter={handleToggleFilter} // Pass the toggle function
          options={HomeFilterOptions} // Pass the filter options
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
