import React, { useState } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import Header from "../Components/Header";
import SearchBar from "../Components/Searchbar";
import FilterList from "../Components/Fliter";
import RecentSearches from "../Components/RecentSearches";
import Recommendations from "../Components/Recommendations";
import CategoryBoxes from "../Components/CategoryBoxes";

export default function Home() {
  const [showFilter, setShowFilter] = useState(false); // State to manage filter visibility

  const handleToggleFilter = () => {
    setShowFilter((prev) => !prev); // Toggle the filter visibility
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Header />
        <SearchBar onToggleFilter={handleToggleFilter} />
        {showFilter && <FilterList />}
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
