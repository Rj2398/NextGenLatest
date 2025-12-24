import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const InstituteCard = ({name, status, icon, onPress}) => {
  // Determine if it's the "Add Institute" special card
  const isAddCard = status === 'Add';

  return (
    <TouchableOpacity
      style={[
        cardStyles.card,
        isAddCard ? cardStyles.addCard : cardStyles.defaultCard,
      ]}
      onPress={onPress}
      disabled={isAddCard && name !== 'Add Institute'} // Only allow interaction on the visible items
    >
      <View style={cardStyles.iconPlaceholder}>
        <Text style={cardStyles.iconText}>{icon}</Text>
      </View>

      <Text style={cardStyles.nameText}>{name}</Text>

      {/* Status/Active Badge */}
      {status === 'Active' && (
        <View style={cardStyles.activeBadge}>
          <Text style={cardStyles.activeIcon}>✓</Text>
          <Text style={cardStyles.activeText}>Active</Text>
        </View>
      )}

      {/* Add Institute Button */}
      {isAddCard && (
        <View style={cardStyles.addButton}>
          <Text style={cardStyles.addButtonText}>+ Add Institute</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const cardStyles = StyleSheet.create({
  card: {
    width: '48%', // Approx. half the width, accounting for margin
    aspectRatio: 1 / 1.1, // Slightly taller than wide
    borderRadius: 12,
    marginBottom: 15,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
  },
  defaultCard: {
    backgroundColor: 'white',
    borderColor: '#E0E0E0',
  },
  addCard: {
    backgroundColor: 'white',
    borderColor: '#E0E0E0',
    borderStyle: 'dashed', // Dashed border for the "Add" card
  },
  iconPlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 8,
    backgroundColor: '#F7F7F7', // Light gray background for icon
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  iconText: {
    fontSize: 28,
  },
  nameText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginBottom: 8,
  },

  // Active Badge Styles
  activeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E6F8ED', // Light green background
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  activeIcon: {
    fontSize: 12,
    color: '#1B9C45', // Dark green color
    marginRight: 4,
    fontWeight: 'bold',
  },
  activeText: {
    fontSize: 12,
    color: '#1B9C45',
    fontWeight: '500',
  },

  // Add Button Styles
  addButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  addButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FF8C00', // Orange color
  },
});

export default InstituteCard;
