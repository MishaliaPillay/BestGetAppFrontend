// src/components/Pagination.js
import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const getPaginationRange = () => {
    const range = [];
    const start = Math.max(1, currentPage - 2);
    const end = Math.min(totalPages, start + 4); // Show 5 pages

    for (let i = start; i <= end; i++) {
      range.push(i);
    }

    return range;
  };

  return (
    <View style={styles.pagination}>
      <TouchableOpacity
        onPress={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        style={styles.pageButton}
      >
        <Text style={styles.pageButtonText}>{"<"}</Text>
      </TouchableOpacity>

      {getPaginationRange().map((page) => (
        <TouchableOpacity
          key={page}
          onPress={() => onPageChange(page)}
          style={[
            styles.pageButton,
            currentPage === page && styles.activePageButton,
          ]}
        >
          <Text style={styles.pageButtonText}>{page}</Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity
        onPress={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        style={styles.pageButton}
      >
        <Text style={styles.pageButtonText}>{">"}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default Pagination;
