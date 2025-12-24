import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

// --- Colors and Constants (Based on UI context) ---
const colors = {
  white: '#FFFFFF',
  black: '#000000',
  textPrimary: '#161B25',
  textSecondary: '#6B7280',
  border: '#E0E0E0',
  lightGray: '#F9FBF9',
  // Tag Colors
  tagLightGreen: '#CAECC5',
  tagLightRed: '#FFD0E0',
  tagLightBlue: '#E2EAF6',
};

// --- Available Sizes Data (For the dropdown list) ---
const AVAILABLE_SIZES = [
  {id: 'S', label: 'Small', color: colors.tagLightBlue},
  {id: 'M', label: 'Medium', color: colors.tagLightGreen},
  {id: 'L', label: 'Large', color: colors.tagLightRed},
  {id: 'XL', label: 'Extra Large', color: colors.tagLightGreen},
];

// --- Initial Data Structure ---
// NOTE: Each tag now needs a unique ID for reliable deletion.
const INITIAL_VARIANTS = [
  {
    id: 1,
    size: 'M',
    label: 'Size - M Q - 10',
    color: colors.tagLightGreen,
    value: 10,
  },
  {
    id: 2,
    size: 'L',
    label: 'Size - L Q - 25',
    color: colors.tagLightRed,
    value: 25,
  },
];

// --- Sub-Component: Interactive Variant Chip (Tag) ---
const VariantChip = ({
  variant,
  onRemove, // Added prop for deletion
}) => (
  <View style={[tagStyles.chipContainer, {backgroundColor: variant.color}]}>
    <Text style={tagStyles.chipText}>{variant.label}</Text>

    {/* 🚀 FIX 2: Added Delete Icon to the chip */}
    <TouchableOpacity
      onPress={() => onRemove(variant.id)}
      style={tagStyles.deleteIcon}>
      <Feather name="x" size={12} color={colors.textPrimary} />
    </TouchableOpacity>
  </View>
);

// ------------------------------------------------------------------
// Main Component: PriceVariantGroup
// ------------------------------------------------------------------
const PriceVariantGroup = () => {
  const [variants, setVariants] = useState(INITIAL_VARIANTS);
  const [isOpen, setIsOpen] = useState(false);

  // Combine all current 'value' fields for the dropdown summary text
  const dropdownValue = variants.map(v => v.value).join(', ');

  // Function to remove a single variant tag by its ID
  const handleRemoveVariant = idToRemove => {
    setVariants(prevVariants => prevVariants.filter(v => v.id !== idToRemove));
  };

  // Function to add a new variant (simulated selection)
  const handleAddVariant = sizeItem => {
    // 💡 In a real app, this would open a modal to set Q (quantity) and Price.
    // For this example, we'll create a new mock variant.
    const newVariant = {
      id: Date.now(), // Use a unique ID
      size: sizeItem.id,
      label: `Size - ${sizeItem.id} Q - 100`, // Mock label
      color: sizeItem.color,
      value: Math.floor(Math.random() * 100), // Mock price
    };

    setVariants(prevVariants => [...prevVariants, newVariant]);
    setIsOpen(false); // Close the selection list
  };

  // Function to simulate deleting the entire group
  const handleDeleteGroup = () => {
    setVariants([]);
  };

  return (
    <View style={styles.container}>
      {/* Header Row: "Price" and Delete Icon */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Price</Text>
        <TouchableOpacity onPress={handleDeleteGroup}>
          <Feather name="trash-2" size={18} color={colors.textSecondary} />
        </TouchableOpacity>
      </View>

      {/* 1. Dropdown/Input Area */}
      <TouchableOpacity
        style={styles.dropdown}
        onPress={() => setIsOpen(!isOpen)} // Toggle visibility
      >
        <Text style={styles.dropdownText}>
          {dropdownValue || 'Add Prices...'}
        </Text>
        <Feather
          name={isOpen ? 'chevron-up' : 'chevron-down'}
          size={20}
          color={colors.textSecondary}
        />
      </TouchableOpacity>

      {/* 🚀 FIX 1: Size Selection List (Conditional Rendering) */}
      {isOpen && (
        <View style={styles.optionsContainer}>
          {AVAILABLE_SIZES.map(size => (
            <TouchableOpacity
              key={size.id}
              style={styles.optionItem}
              onPress={() => handleAddVariant(size)}>
              <Text style={styles.optionText}>
                {size.label} ({size.id})
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* 2. Variant Chips/Tags Display */}
      <View style={styles.chipsContainer}>
        {variants.map(variant => (
          <VariantChip
            key={variant.id}
            variant={variant}
            onRemove={handleRemoveVariant} // Pass the handler
          />
        ))}
      </View>
    </View>
  );
};

export default PriceVariantGroup;

// --- Stylesheets ---
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
    margin: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.black,
  },

  // Dropdown Styles
  dropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 6,
    backgroundColor: colors.white,
    marginBottom: 15,
  },
  dropdownText: {
    fontSize: 16,
    color: colors.black,
    fontWeight: '600',
  },

  // Dropdown Options List
  optionsContainer: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 6,
    marginBottom: 10,
    maxHeight: 150, // Limit height for scrolling
    overflow: 'hidden',
  },
  optionItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    backgroundColor: colors.lightGray,
  },
  optionText: {
    fontSize: 14,
    color: colors.textPrimary,
  },

  // Variant Chips Container
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

const tagStyles = StyleSheet.create({
  chipContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 15,
    marginRight: 8,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  chipText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.black,
    marginRight: 5, // Space before the delete icon
  },
  deleteIcon: {
    padding: 2,
    borderRadius: 10,
  },
});
