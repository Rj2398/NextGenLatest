import React, {useState} from 'react';
import {View, Text, TouchableOpacity, FlatList, StyleSheet} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

const colors = {
  primary: '#F89941',
  white: '#FFFFFF',
  black: '#000000',
  background: '#FFFFFF',
  border: '#E0E0E0',
  textPrimary: '#858D9D',
  lightGray: '#F9FAFB',
};

const DropdownGroup = ({
  label,
  value,
  options,
  onSelect,
  placeholder = 'Select an option',
}) => {
  const [isOpen, setIsOpen] = useState(false);

  // *** MODIFICATION 1: Use item.value as the selected key ***
  const handleSelect = item => {
    // Both option formats have 'value' and 'label'
    onSelect(item.value); // Select the 'value'
    setIsOpen(false);
  };

  // *** Helper function to find the displayed label based on the current 'value' ***
  const getDisplayLabel = () => {
    if (!value) return null;
    const selectedOption = options.find(option => option.value === value);
    return selectedOption ? selectedOption.label : value;
  };

  const currentDisplayLabel = getDisplayLabel();

  return (
    <View style={styles.inputGroup}>
      <Text style={styles.label}>{label}</Text>

      {/* DROPDOWN TRIGGER */}
      <TouchableOpacity
        style={styles.dropdown}
        onPress={() => setIsOpen(!isOpen)}>
        <Text
          style={
            currentDisplayLabel ? styles.dropdownText : styles.placeholderText
          }>
          {/* *** MODIFICATION 2: Display the found label, or fallback to the raw value or placeholder *** */}
          {currentDisplayLabel || value || placeholder}
        </Text>
        <Feather
          name={isOpen ? 'chevron-up' : 'chevron-down'}
          size={20}
          color={colors.black}
        />
      </TouchableOpacity>

      {/* SELECTION LIST (Conditionally rendered) */}
      {isOpen && (
        <View style={styles.optionsContainer}>
          <FlatList
            data={options}
            nestedScrollEnabled={true}
            // *** MODIFICATION 3: Robust keyExtractor to handle 'id', 'value', or random fallback ***
            keyExtractor={item =>
              (item.id || item.value || Math.random()).toString()
            }
            renderItem={({item}) => (
              <TouchableOpacity
                style={styles.optionItem}
                onPress={() => handleSelect(item)}>
                <Text
                  style={[
                    styles.optionText,
                    // *** MODIFICATION 4: Check item.value against the selected 'value' ***
                    item.value === value && styles.selectedOptionText,
                  ]}>
                  {/* *** MODIFICATION 5: Always use item.label for display *** */}
                  {item.label}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
};
export default DropdownGroup;

// Styles remain the same for brevity and are omitted here...
const styles = StyleSheet.create({
  inputGroup: {
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    color: colors.textPrimary,
    marginBottom: 6,
  },

  dropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    padding: 12,
    borderRadius: 8,
    backgroundColor: colors.lightGray,
  },

  placeholderText: {
    fontSize: 14,
    color: colors.textPrimary,
    fontWeight: 'normal',
  },

  dropdownText: {
    fontSize: 14,
    color: colors.black,
    fontWeight: '600',
  },

  optionsContainer: {
    marginLeft: 10,
    marginTop: 5,
    maxHeight: 100,
  },
  selectedOptionText: {
    fontWeight: '700',
    color: colors.primary,
  },
  optionText: {
    fontSize: 16,
    color: colors.black,
  },
  optionItem: {
    paddingVertical: 10,
    backgroundColor: colors.white,
  },
});
