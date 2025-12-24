// DescriptionInputGroup.js
import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

// --- Color definition (assuming you export it from a common file, or define it here for simplicity) ---
const color = {
    textDark: '#1E1E1E',
    textGrey: '#757575',
    textLightGrey: '#A0A0A0',
    borderLight: '#E0E0E0',
};

const DescriptionInputGroup = ({ label, value, onChangeText, maxLength }) => (
    <View style={styles.inputGroup}>
        <Text style={styles.manualLabel}>{label}</Text>
        <TextInput
            style={styles.textArea}
            value={value}
            onChangeText={onChangeText}
            placeholder="Write a detailed description for the ad"
            placeholderTextColor={color.textLightGrey}
            multiline={true}
            numberOfLines={4}
            maxLength={maxLength}
        />
        <Text style={styles.charCount}>
            {value.length}/{maxLength} characters
        </Text>
    </View>
);

const styles = StyleSheet.create({
    inputGroup: {
        marginBottom: 15,
    },
    manualLabel: {
        fontSize: 14,
        color: color.textGrey, 
        marginBottom: 6,
        fontWeight: '600',
    },
    textArea: {
        height: 100, // Fixed height for multiline input
        borderWidth: 1,
        borderColor: color.borderLight,
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
        fontSize: 16,
        color: color.textDark,
        textAlignVertical: 'top', // Start text from the top
    },
    charCount: {
        fontSize: 12,
        color: color.textGrey,
        alignSelf: 'flex-start',
        marginTop: 4,
    },
});

export default DescriptionInputGroup;