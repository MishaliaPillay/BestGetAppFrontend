// Header.jsx
import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default function Header() {
  return (
    <View style={styles.header}>
      <Text style={styles.greetingText}>Hi, Wyatt</Text>
      <Text style={styles.subHeaderText}>What do you need?</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    marginBottom: 10,
  },
  greetingText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subHeaderText: {
    color: 'gray',
  },
});
