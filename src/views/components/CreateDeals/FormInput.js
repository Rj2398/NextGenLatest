// ../../components/CreateDeals/FormInput.js

import React, { useState } from 'react';
import { 
    View, 
    Text, 
    TextInput, 
    TouchableOpacity, 
    StyleSheet, 
    Platform 
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Colors = {
    darkText: '#161B25',
    mediumText: '#555',
    white: '#fff',
    borderColor: '#ddd',
    errorRed: '#D32F2F',
    activeOrange: '#FF5722',
};

const FormInput = ({ 
    label, 
    placeholder, 
    isRequired, 
    fieldType, 
    value, 
    onChangeText, 
    onSelectPress, 
    keyboardType,
    options = [],
    // NEW PROP: zIndex - To manage overlap by the caller component (CreateDeal.js)
    inputZIndex = 1
}) => {
    
    // Internal state to manage dropdown visibility (only for fieldType === 'Select')
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // Determines if the input should be clickable (like a button)
    const isClickable = fieldType === 'Select' || fieldType === 'DateTime';

    // Handler for selecting an item from the options list
    const handleOptionSelect = (selectedValue) => {
        onChangeText(selectedValue); 
        setIsDropdownOpen(false); // Close the dropdown after selection
    };

    // Handler for opening/closing the Select dropdown
    const handleDropdownToggle = () => {
        if (fieldType === 'Select') {
            setIsDropdownOpen(!isDropdownOpen);
        } else if (fieldType === 'DateTime') {
            onSelectPress(); // Execute external handler for Date/Time fields
        }
    };

    // --- RENDER LOGIC for Input/Button ---
    const renderInput = () => {
        
        // --- 1. Clickable Input (Select / DateTime) ---
        if (isClickable) {
            const iconName = fieldType === 'Select' 
                ? (isDropdownOpen ? "chevron-up" : "chevron-down") 
                : "calendar";

            // If the value is the placeholder, use the mediumText color
            const textColor = (fieldType === 'Select' && value === placeholder) || value === 'DD/MM/YYYY' 
                ? Colors.mediumText 
                : Colors.darkText;

            return (
                <TouchableOpacity onPress={handleDropdownToggle} style={styles.clickableInput}>
                    <Text 
                        style={[
                            styles.inputText, 
                            { color: textColor }
                        ]}
                    >
                        {/* Translate the stored value back to label for display, if available */}
                        {fieldType === 'Select' 
                            ? (options.find(opt => opt.value === value)?.label || placeholder)
                            : value || placeholder}
                    </Text>
                    <Ionicons 
                        name={iconName} 
                        size={20} 
                        color={Colors.activeOrange} 
                    />
                </TouchableOpacity>
            );
        }

        // --- 2. Standard TextInput (Text / Decimal / TextArea) ---
        return (
            <TextInput
                style={[styles.textInput, fieldType === 'TextArea' && styles.textArea]}
                onChangeText={onChangeText}
                // When Select field is closed, the value is the selected 'value' (e.g., 'AED'). 
                // We need to ensure text inputs show their raw text value.
                value={value} 
                placeholder={placeholder}
                keyboardType={keyboardType}
                multiline={fieldType === 'TextArea'}
                placeholderTextColor={Colors.mediumText}
            />
        );
    };

    return (
        // The zIndex is now determined by the parent component (CreateDeal.js) to manage stacking order
        <View style={[styles.inputContainer, { zIndex: isDropdownOpen ? 9999 : inputZIndex }]}>
            <Text style={styles.label}>
                {label}
                {isRequired && <Text style={styles.requiredStar}> *</Text>}
            </Text>
            
            {renderInput()}
            
            {/* --- Dropdown List --- */}
            {fieldType === 'Select' && isDropdownOpen && (
                <View style={styles.dropdown}>
                    {options.map((option) => (
                        <TouchableOpacity
                            key={option.value}
                            style={styles.dropdownOption}
                            onPress={() => handleOptionSelect(option.value)}
                        >
                            <Text style={styles.dropdownOptionText}>{option.label}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            )}
        </View>
    );
};

// --- STYLESHEETS for FormInput and Dropdown ---
const styles = StyleSheet.create({
    // Only includes basic styles; zIndex is passed dynamically.
    inputContainer: { marginBottom: 15, zIndex: 1 }, 
    label: { fontSize: 14, fontWeight: '500', color: Colors.mediumText, marginBottom: 5 },
    requiredStar: { color: Colors.errorRed, fontSize: 14 },

    textInput: {
        borderWidth: 1, borderColor: Colors.borderColor, borderRadius: 8,
        paddingHorizontal: 15, paddingVertical: Platform.OS === 'android' ? 8 : 12,
        fontSize: 16, color: Colors.darkText, backgroundColor: Colors.white,
    },
    textArea: { height: 100, textAlignVertical: 'top', paddingVertical: 10 },
    
    clickableInput: {
        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
        borderWidth: 1, borderColor: Colors.borderColor, borderRadius: 8,
        paddingHorizontal: 15, paddingVertical: Platform.OS === 'android' ? 8 : 12,
        backgroundColor: Colors.white,
    },
    inputText: { flex: 1, fontSize: 16, color: Colors.darkText, marginRight: 10 },

    // The dropdown itself is absolutely positioned
    dropdown: {
        position: 'absolute',
        top: '100%', 
        left: 0,
        right: 0,
        backgroundColor: Colors.white,
        borderWidth: 1,
        borderColor: Colors.borderColor,
        borderRadius: 8,
        marginTop: 4, 
        // This zIndex is now lower because the parent's zIndex will control the stacking context
        zIndex: 99, 
        maxHeight: 200, 
        overflow: 'hidden',
        ...Platform.select({ ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 3 }, android: { elevation: 3 } }),
    },
    dropdownOption: {
        padding: 12,
        // Remove borderBottom for the last item in a real app, but keep it simple here.
        borderBottomWidth: 1, 
        borderBottomColor: Colors.borderColor,
    },
    dropdownOptionText: {
        fontSize: 16,
        color: Colors.darkText,
    }
});

export default FormInput;