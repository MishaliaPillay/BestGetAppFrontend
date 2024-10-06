// Recommendations.jsx
import React from 'react';
import { FlatList, Text, View, StyleSheet } from 'react-native';

export default function Recommendations() {
  return (
    <>
      <Text style={styles.sectionTitle}>You might also like</Text>
      <FlatList
        horizontal
        data={[1, 2, 3, 4]} // Placeholder data for recommendations
        renderItem={({ item }) => <View style={styles.placeholderBox}></View>}
        keyExtractor={(item) => item.toString()}
        showsHorizontalScrollIndicator={false}
      />
    </>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  placeholderBox: {
    width: 100,
    height: 100,
    backgroundColor: '#e0e0e0',
    marginRight: 10,
    borderRadius: 10,
  },
});
