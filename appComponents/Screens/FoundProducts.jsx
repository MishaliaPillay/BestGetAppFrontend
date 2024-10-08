import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator, // Import ActivityIndicator for loading spinner
} from "react-native";
import { Image } from "expo-image"; // Importing Image from expo-image
import axios from "axios";

// Define the logos for different sources
const logos = {
  Woolworths: require("../../assets/images/woolworths_sa.jpg"),
  "Pick n pay": require("../../assets/images/Pnp.png"),
  Checkers: require("../../assets/images/Checkers_sa.jpg"),
};

export default function FoundProducts({ route }) {
  const { searchTerm } = route.params;
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true); // New loading state
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true); // Start loading when fetching begins
      try {
        const response = await axios.get(
          `https://bestgetappscripts.onrender.com/products`
        );

        const allProducts = response.data;
        const filteredProducts = allProducts
          .filter((product) => {
            // Split the product name into words
            const productNameWords = product.name.toLowerCase().split(" ");

            // Check if any word in the product name starts with the search term
            return productNameWords.some((word) =>
              word.startsWith(searchTerm.toLowerCase())
            );
          })
          .sort((a, b) => {
            // Remove 'R' and parse price strings as floats for comparison
            const priceA = parseFloat(a.price.replace("R", ""));
            const priceB = parseFloat(b.price.replace("R", ""));
            return priceA - priceB; // Sorting by price (ascending)
          });

        setProducts(filteredProducts);
      } catch (error) {
        console.error("Error fetching products:", error.message);
        console.error("Error code:", error.code);
      } finally {
        setLoading(false); // Stop loading when fetch completes
      }
    };

    fetchProducts();
  }, [searchTerm]);

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const displayedProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Calculate page range to display
  const getPaginationRange = () => {
    const range = [];
    const start = Math.max(1, currentPage - 2);
    const end = Math.min(totalPages, start + 4); // Show 5 pages

    for (let i = start; i <= end; i++) {
      range.push(i);
    }

    return range;
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#007BFF" /> // Display loading spinner
      ) : displayedProducts.length === 0 ? (
        <Text style={styles.noProductsText}>
          No products matching your search were found.
        </Text>
      ) : (
        <FlatList
          data={displayedProducts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.productItem}>
              <View style={styles.productDetails}>
                <Image
                  source={{ uri: item.image }}
                  style={styles.productImage}
                  contentFit="cover"
                />
                <View style={styles.productInfo}>
                  <View style={styles.productHeader}>
                    <Text style={styles.productName}>{item.name}</Text>
                    {item.source && logos[item.source] && (
                      <Image
                        source={logos[item.source]}
                        style={styles.storeLogo}
                      />
                    )}
                  </View>
                  <Text style={styles.productPrice}>{item.price}</Text>
                </View>
              </View>
            </View>
          )}
        />
      )}

      {!loading && displayedProducts.length > 0 && (
        <View style={styles.pagination}>
          <TouchableOpacity
            onPress={handlePreviousPage}
            disabled={currentPage === 1}
            style={styles.pageButton}
          >
            <Text style={styles.pageButtonText}>{"<"}</Text>
          </TouchableOpacity>

          {getPaginationRange().map((page) => (
            <TouchableOpacity
              key={page}
              onPress={() => setCurrentPage(page)}
              style={[
                styles.pageButton,
                currentPage === page && styles.activePageButton,
              ]}
            >
              <Text style={styles.pageButtonText}>{page}</Text>
            </TouchableOpacity>
          ))}

          <TouchableOpacity
            onPress={handleNextPage}
            disabled={currentPage === totalPages}
            style={styles.pageButton}
          >
            <Text style={styles.pageButtonText}>{">"}</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  productItem: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    paddingBottom: 10,
    paddingVertical: 10,
  },
  productDetails: {
    flexDirection: "row",
    alignItems: "center",
  },
  productImage: {
    width: 80,
    height: 80,
    marginRight: 10,
  },
  productInfo: {
    flex: 1,
  },
  productHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  productName: {
    fontWeight: "bold",
    fontSize: 16,
    flex: 1,
  },
  storeLogo: {
    width: 30,
    height: 30,
  },
  productPrice: {
    color: "gray",
    marginTop: 5,
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  pageButton: {
    marginHorizontal: 5,
    padding: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
  },
  activePageButton: {
    backgroundColor: "#007BFF",
  },
  pageButtonText: {
    color: "black",
  },
  noProductsText: {
    fontSize: 18,
    color: "gray",
    textAlign: "center",
    marginTop: 20,
  },
});
