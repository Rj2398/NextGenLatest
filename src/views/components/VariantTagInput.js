import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Keyboard,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

// --- Colors and Constants (Simplified from previous context) ---
const colors = {
  primary: '#F89941', // Orange for Add button
  white: '#FFFFFF',
  black: '#000000',
  textPrimary: '#161B25',
  border: '#E0E0E0',
  // Specific Tag Colors from the image:
  tagLightGreen: '#CAECC5',
  tagLightRed: '#F8AEB7',
  tagLightBlue: '#E2EAF6',
};

// --- Helper function to get color based on tag content (e.g., 'Green' gets green color) ---
const getTagColor = tag => {
  const lowerTag = tag.toLowerCase();
  if (lowerTag.includes('green'))
    return {background: colors.tagLightGreen, text: '#006400'};
  if (lowerTag.includes('red'))
    return {background: colors.tagLightRed, text: '#8B0000'};
  if (lowerTag.includes('blue'))
    return {background: colors.tagLightBlue, text: '#000080'};
  // Default color for others
  return {background: colors.border, text: colors.textPrimary};
};

// ------------------------------------------------------------------
// Sub-Component: Tag/Chip
// ------------------------------------------------------------------
const Tag = ({name, onRemove}) => {
  const {background, text} = getTagColor(name);

  return (
    <View style={[tagStyles.tagContainer, {backgroundColor: background}]}>
      <Text style={[tagStyles.tagText, {color: text}]}>{name}</Text>
      <TouchableOpacity onPress={onRemove} style={tagStyles.removeButton}>
        <Feather name="x" size={12} color={text} />
      </TouchableOpacity>
    </View>
  );
};

// ------------------------------------------------------------------
// Main Component: VariantTagInput
// ------------------------------------------------------------------
const VariantTagInput = ({variantLabel = 'Colours'}) => {
  const [tags, setTags] = useState(['Green', 'red', 'blue']); // Initial tags from image
  const [newTagText, setNewTagText] = useState('');

  // 1. Logic to add a tag when 'Add' is pressed or Enter key is hit
  const handleAddTag = () => {
    const text = newTagText.trim();
    if (text && !tags.includes(text)) {
      setTags([...tags, text]);
      setNewTagText(''); // Clear input
      Keyboard.dismiss();
    }
  };

  // 2. Logic to remove a tag
  const handleRemoveTag = tagToRemove => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  return (
    <View style={styles.container}>
      {/* Header Row: "Variants" and "+ Add" Button */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Variants</Text>
        <TouchableOpacity style={styles.addButton} onPress={handleAddTag}>
          <Feather
            name="plus"
            size={18}
            color={colors.white}
            style={styles.addIcon}
          />
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>

      {/* Variant Category Row: "Colours" and Delete Icon */}
      <View style={styles.variantRow}>
        <Text style={styles.variantLabel}>{variantLabel}</Text>
        <TouchableOpacity onPress={() => setTags([])}>
          {' '}
          {/* Simple reset example */}
          <Feather name="trash-2" size={18} color={colors.textPrimary} />
        </TouchableOpacity>
      </View>

      {/* Tag Input and Display Area */}
      <View style={styles.tagInputArea}>
        {/* Display existing tags */}
        {tags.map(tag => (
          <Tag key={tag} name={tag} onRemove={() => handleRemoveTag(tag)} />
        ))}

        {/* Input field for adding new tags (Simulating continuous flow) */}
        <TextInput
          style={styles.textInput}
          value={newTagText}
          onChangeText={setNewTagText}
          onSubmitEditing={handleAddTag} // Adds tag when 'Done'/'Enter' is pressed
          placeholder="Add variant..."
          placeholderTextColor="#999"
        />
      </View>
    </View>
  );
};

export default VariantTagInput;

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
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.black,
  },
  addButton: {
    flexDirection: 'row',
    backgroundColor: colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    alignItems: 'center',
  },
  addIcon: {
    marginRight: 4,
  },
  addButtonText: {
    color: colors.white,
    fontWeight: '600',
    fontSize: 16,
  },

  // Variant Category Row
  variantRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  variantLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.textPrimary,
  },

  // Tag Input and Display Area
  tagInputArea: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 6,
    padding: 8,
  },
  textInput: {
    minWidth: 100, // Ensure visibility for typing
    height: 30,
    paddingHorizontal: 8,
    fontSize: 14,
    color: colors.black,
    flexShrink: 1,
  },
});

const tagStyles = StyleSheet.create({
  tagContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 4,
    paddingVertical: 4,
    borderRadius: 15,
    marginRight: 6,
    marginBottom: 6,
  },
  tagText: {
    fontSize: 14,
    fontWeight: '500',
    marginRight: 4,
  },
  removeButton: {
    padding: 2,
    borderRadius: 8,
  },
});
