import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import LoadingSpinner from "../Components/LoadingSpinner";
import NoProductsMessage from "../Components/NoProductsMessage";
import ProductItem from "../Components/ProductItem";
import Pagination from "../Components/Pagination";
import axios from "axios";

// Define category mapping
const categoryMapping = {
  "Dairy & Eggs": [
    "milk",
    "cheese",
    "eggs",
    "yogurt",
    "butter",
    "cream",
    "dairy",
  ],
  Seafood: ["fish", "shrimp", "crab", "salmon", "tuna"],
  Vegetables: ["broccoli", "spinach", "carrot", "lettuce", "tomato"],
  Snacks: ["chips", "cookies", "candy", "popcorn"],
  Beverages: ["juice", "soda", "water", "coffee", "tea"],
};

export default function Categories({ route }) {
  const { selectedCategory = "" } = route.params || {};
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [selectedStores, setSelectedStores] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const navigation = useNavigation();
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);

      try {
        // Fetch products from the API
        const response = await axios.get(
          "https://bestgetappscripts.onrender.com/products"
        );
        const allProducts = response.data; // Assume your API returns a list of products

        // Get the mapped terms for the selected category
        const categoryTerms = categoryMapping[selectedCategory] || [];

        if (categoryTerms.length === 0) {
          console.warn(
            "No terms found for selected category:",
            selectedCategory
          );
        }

        const filteredProducts = allProducts.filter((product) => {
          const cleanedProductName = product.name
            .toLowerCase()
            .replace(/[^a-z\s]/g, "")
            .trim();

          const matchesCategory = categoryTerms.some((term) => {
            const cleanedTerm = term.toLowerCase();
            return cleanedProductName.includes(cleanedTerm);
          });

          const matchesStoreFilter =
            selectedStores.length === 0 ||
            selectedStores.includes(product.source);

          return matchesCategory && matchesStoreFilter;
        });

        // Sort products by price
        const sortedProducts = filteredProducts.sort((a, b) => {
          // Assuming price is a string with a currency symbol
          const priceA = parseFloat(a.price.replace(/[^0-9.-]+/g, ""));
          const priceB = parseFloat(b.price.replace(/[^0-9.-]+/g, ""));
          return priceA - priceB; // Sort in ascending order
        });

        setProducts(sortedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchProducts();
  }, [selectedCategory, selectedStores]);

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const displayedProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const toggleStoreFilter = (store) => {
    setSelectedStores((prevSelectedStores) => {
      if (prevSelectedStores.includes(store)) {
        return prevSelectedStores.filter((s) => s !== store);
      } else {
        return [...prevSelectedStores, store];
      }
    });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <View style={styles.container}>
      {showFilter && (
        <View style={styles.filterContainer}>
          {["Checkers", "Pick n pay", "Woolworths"].map((source) => (
            <TouchableOpacity
              key={source}
              style={[
                styles.filterButton,
                selectedStores.includes(source) && styles.filterButtonActive,
              ]}
              onPress={() => toggleStoreFilter(source)}
            >
              <Text
                style={[
                  styles.filterButtonText,
                  selectedStores.includes(source) &&
                    styles.filterButtonTextActive,
                ]}
              >
                {source}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {loading ? (
        <LoadingSpinner />
      ) : displayedProducts.length === 0 ? (
        <NoProductsMessage />
      ) : (
        <FlatList
          data={displayedProducts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => navigation.navigate("ItemCard", { item })}
            >
              <ProductItem item={item} />
            </TouchableOpacity>
          )}
        />
      )}

      {!loading && displayedProducts.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  filterButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 25,
    backgroundColor: "white",
  },
  filterButtonActive: {
    backgroundColor: "#007bff", // Active button color
  },
  filterButtonText: {
    color: "black",
  },
  filterButtonTextActive: {
    color: "white",
  },
});
