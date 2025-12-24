import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';

const colors = {
    greenActive: '#FF8209',       // Active state color
    textLightGrey: '#CCCCCC',   // Inactive state color
    white: '#FFFFFF',
    black: '#000000',
    darkText: '#161B25',
    mediumText: '#555',
    inactiveGray: '#eee',
};

/**
 * CustomSwitchButton: An advanced switch component built using TouchableOpacity
 * and View for complete style control, as per the provided implementation.
 */
const CustomSwitchButton = ({ 
    label, // Label prop added from the previous version for completeness
    value, 
    onValueChange, 
    activeColor = colors.greenActive, 
    inactiveColor = colors.textLightGrey 
}) => {
    // --- Constant Dimensions (Defined by User) ---
    const switchWidth = 48;
    const switchHeight = 28;
    const thumbSize = 24;
    const padding = 2; // For inner spacing

    const trackStyle = {
        width: switchWidth,
        height: switchHeight,
        borderRadius: switchHeight / 2,
        // Track Background Color
        backgroundColor: value ? activeColor : inactiveColor,
        justifyContent: 'center',
        paddingHorizontal: padding,
        // Subtle outline border
        borderWidth: 1.5, 
        borderColor: value ? activeColor : inactiveColor,
    };

    const thumbStyle = {
        width: thumbSize,
        height: thumbSize,
        borderRadius: thumbSize / 2,
        backgroundColor: colors.white,
        // Calculate the translation distance for the thumb
        // When Active (value=true): switchWidth - thumbSize - (2 * padding)
        transform: [{ 
            translateX: value ? switchWidth - thumbSize - (padding * 2) : 0 
        }],
        // Shadow for the thumb (Android elevation and iOS shadow)
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
    };

    return (
        <View style={styles.switchRow}>
            {/* Added label back to the component for full feature parity */}
            {label && <Text style={styles.switchLabel}>{label}</Text>} 
            
            <View style={styles.switchControlContainer}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => onValueChange(!value)} // onValueChange is called with the new value
                    style={trackStyle}
                >
                    <View style={thumbStyle} />
                </TouchableOpacity>
                
                {/* Status text (optional but helpful) */}
                <Text style={styles.switchStatusText}>{value ? 'Active' : 'Disabled'}</Text>
            </View>
        </View>
    );
};

// --- Stylesheet for layout and label (copied from previous structure) ---
const styles = StyleSheet.create({
    switchRow: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        marginBottom: 20, 
        marginTop: 10, 
        paddingHorizontal: 10, 
        paddingVertical: 10, 
        borderWidth: 1, 
        borderColor: colors.inactiveGray, // Using a generic gray for the container border
        borderRadius: 8 
    },
    switchLabel: { 
        fontSize: 16, 
        fontWeight: '600', 
        color: colors.darkText 
    },
    switchControlContainer: { 
        flexDirection: 'row', 
        alignItems: 'center', 
    },
    switchStatusText: { 
        fontSize: 14, 
        fontWeight: '500', 
        color: colors.mediumText, 
        marginLeft: 10 
    },
});

export default CustomSwitchButton;