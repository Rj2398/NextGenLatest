import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import PrimaryButton from '../PrimaryButton';

// --- COLORS (Assuming these are imported or defined globally, or define them here) ---
const color = {
    white: '#FFFFFF',
    black: '#000000',
    greyBackground: '#F5F5F5',
    orangePrimary: '#FF8719', 
    textDark: '#1E1E1E',
    textGrey: '#757575',
    borderLight: '#E0E0E0',
    successGreen: '#4CAF50', // Example green for success checkmark
    orangeLight: '#FFF6EE', // For button highlight
};

// Assuming PrimaryButton is a separate component, let's create a local mock for it if not provided
const LocalPrimaryButton = ({ title, onPress, style }) => (
    <TouchableOpacity style={[styles.localPrimaryButton, style]} onPress={onPress}>
        <Text style={styles.localPrimaryButtonText}>{title}</Text>
    </TouchableOpacity>
);

const LocalSecondaryButton = ({ title, onPress, style }) => (
    <TouchableOpacity style={[styles.localSecondaryButton, style]} onPress={onPress}>
        <Text style={styles.localSecondaryButtonText}>{title}</Text>
    </TouchableOpacity>
);

const AdPublishedPopup = ({ 
    productName, 
    onBoostListing, 
    onViewMyAds, 
    onCreateAnotherAd 
}) => {
    return (
        <View style={styles.overlay}> {/* This overlay covers the whole screen */}
            <View style={styles.popupCard}>
                {/* Checkmark Icon */}
                <Ionicons name="checkmark-circle" size={60} color={color.successGreen} style={styles.checkmarkIcon} />
                
                {/* Title */}
                <Text style={styles.popupTitle}>Ad successfully published!</Text>
                
                {/* Description */}
                <Text style={styles.popupDescription}>
                    Your ad '{productName}' is now live. You can boost it for better reach.
                </Text>
                
                {/* Boost Listing Button */}
                <PrimaryButton 
                    title="Boost Listing →" 
                    onPress={onBoostListing} 
                    style={styles.popupActionButton}
                />
                
                {/* View My Ads Button */}
                <LocalSecondaryButton 
                    title="View My Ads" 
                    onPress={onViewMyAds} 
                    style={styles.popupActionButton}
                />
                
                {/* Create another ad Link */}
                <TouchableOpacity onPress={onCreateAnotherAd} style={styles.createAnotherAdLink}>
                    <Text style={styles.createAnotherAdText}>Create another ad</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

// --- STYLESHEET for AdPublishedPopup ---
const styles = StyleSheet.create({
    overlay: {
        ...StyleSheet.absoluteFillObject, // Covers the entire screen
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent dark background
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000, // Ensure it's on top of everything
    },
    popupCard: {
        backgroundColor: color.white,
        borderRadius: 12,
        padding: 25,
        marginHorizontal: 20, // To give some space from screen edges
        alignItems: 'center',
        shadowColor: '#000', // For a floating card effect
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 8,
        width: '90%', // Occupy most of the width
        maxWidth: 400, // Max width for larger screens
    },
    checkmarkIcon: {
        marginBottom: 15,
    },
    popupTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: color.textDark,
        marginBottom: 10,
        textAlign: 'center',
    },
    popupDescription: {
        fontSize: 14,
        color: color.textGrey,
        marginBottom: 20,
        textAlign: 'center',
        lineHeight: 20,
    },
    popupActionButton: {
        width: '100%', // Full width inside the card
        marginBottom: 10, // Space between buttons
    },
    createAnotherAdLink: {
        marginTop: 15,
        padding: 10, // Make it easily tappable
    },
    createAnotherAdText: {
        fontSize: 16,
        color: color.orangePrimary, // Orange link color
        fontWeight: '600',
    },

    // Local Button Styles (if PrimaryButton and SecondaryButton are not globally available)
    localPrimaryButton: {
        backgroundColor: color.orangePrimary,
        borderRadius: 8,
        paddingVertical: 14,
        alignItems: 'center',
        justifyContent: 'center',
    },
    localPrimaryButtonText: {
        color: color.white,
        fontSize: 16,
        fontWeight: 'bold',
    },
    localSecondaryButton: {
        backgroundColor: color.white,
        borderRadius: 8,
        paddingVertical: 14,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: color.borderLight,
    },
    localSecondaryButtonText: {
        color: color.textDark,
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default AdPublishedPopup;