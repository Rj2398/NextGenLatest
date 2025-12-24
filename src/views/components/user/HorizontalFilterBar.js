import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import FilterChip from './FilterChip';

// Define the filter data externally or locally
const FILTER_DATA = [
    { label: 'All', value: 'all' },
    { label: 'Important', value: 'important' },
     { label: 'Include Only', value: 'Include Only' },
     { label: 'Group', value: 'Group' },
];

// Now accepts props for state management
const HorizontalFilterBar = ({ selectedValue, onSelect, data = FILTER_DATA }) => {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
      >
        {data.map((filter) => (
          <FilterChip
            key={filter.value}
            label={filter.label}
            value={filter.value}
            selectedValue={selectedValue} // Passes the current selection state
            onSelect={onSelect} // Passes the state setter function
          />
        ))}
      </ScrollView>
    </View>
  );
};
// ... (Styles remain the same)

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10, // Padding above/below the bar
    backgroundColor: '#F7F7F7', // A slightly lighter background
    // You may need to add paddingHorizontal to the container if the chips don't start at the edge
  },
  scrollViewContent: {
    paddingHorizontal: 15, // Padding on the left and right edges of the scrollable content
    alignItems: 'center', // Vertically centers the chips within the scroll view
  },
});


export default HorizontalFilterBar;