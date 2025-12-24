import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

// --- COLORS (Assuming these are imported or defined globally) ---
const color = {
    white: '#FFFFFF',
    black: '#000000',
    textDark: '#1E1E1E',
    textGrey: '#757575',
    borderLight: '#E0E0E0',
    orangeLight: '#FFF6EE',
};

// --- Helper Component: Promotion Checkbox (Optional, but good for modularity) ---
const PromotionCheckbox = ({ isChecked, onToggle }) => (
    <TouchableOpacity 
        style={[styles.checkboxReview, isChecked && styles.checkboxChecked]} 
        onPress={onToggle}
    >
        {isChecked && <Ionicons name="checkmark" size={16} color={color.white} />}
    </TouchableOpacity>
);


const AdReviewCard = ({ 
    adTitle, 
    productName, 
    description, 
    adPrice, 
    adLocation, 
    mockImageUrl1, 
    mockImageUrl2 
}) => {
    // NOTE: Promotion options state (isChecked) would ideally be managed in the parent (CreateAd)
    // For this standalone component, we'll keep them static/mocked for display.
    const isBoosted = false; // Example static state
    const isFeatured = false; // Example static state

    return (
        <View style={styles.singleInputCard}>
            
            {/* 1. Product Image Preview */}
            <View style={styles.imagePreviewWrapperReview}>
                <Text style={styles.adTitleReview}>{adTitle}</Text>
                <View style={styles.imageContainerReview}>
                    <Image 
                        source={{ uri: mockImageUrl1 }} 
                        style={styles.productImageReview}
                        resizeMode="contain"
                    />
                    <Image 
                        source={{ uri: mockImageUrl2 }} 
                        style={styles.productImageReview}
                        resizeMode="contain"
                    />
                </View>
            </View>
            
            {/* 2. Title, Description, Price, Location */}
            <View style={styles.infoSectionReview}>
                <Text style={styles.productNameReview}>{productName}</Text>
                <Text style={styles.descriptionTextReview}>{description}</Text>
                
                <View style={styles.locationPriceRowReview}>
                    <Ionicons name="location-outline" size={16} color={color.textGrey} />
                    <Text style={styles.locationTextReview}>{adLocation}</Text>
                </View>
                
                <Text style={styles.priceTextReview}>
                    {adPrice}$
                </Text>
            </View>
            
            {/* 3. Promotion Options Section */}
            <View style={styles.promotionSectionReview}>
                <Text style={styles.promotionHeaderReview}>Promotion Options</Text>
                
                {/* Option 1: Boost Listing */}
                <View style={styles.promotionOptionRowReview}>
                    <Text style={styles.promotionOptionText}>Boost Listing</Text>
                    {/* Using a static checkbox for display */}
                    <PromotionCheckbox isChecked={isBoosted} onToggle={() => console.log('Toggle Boost')} /> 
                </View>
                
                {/* Option 2: Featured Listing */}
                <View style={styles.promotionOptionRowReview}>
                    <Text style={styles.promotionOptionText}>Featured Listing</Text>
                    {/* Using a static checkbox for display */}
                    <PromotionCheckbox isChecked={isFeatured} onToggle={() => console.log('Toggle Featured')} />
                </View>
            </View>

        </View>
    );
};


// --- STYLESHEET for AdReviewCard ---
const styles = StyleSheet.create({
    singleInputCard: {
        backgroundColor: color.white,
        borderRadius: 12,
        paddingHorizontal: 15,
        paddingVertical: 15,
        marginHorizontal: 15,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: color.borderLight,
    },
    imagePreviewWrapperReview: {
        paddingBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: color.borderLight,
        marginBottom: 10,
    },
    adTitleReview: {
        fontSize: 18,
        fontWeight: '700',
        color: color.textDark,
        marginBottom: 10,
    },
    imageContainerReview: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: color.orangeLight, 
        padding: 10,
        borderRadius: 8,
    },
    productImageReview: {
        width: '45%', 
        height: 120,
    },
    infoSectionReview: {
        paddingHorizontal: 0, 
        paddingBottom: 15,
    },
    productNameReview: {
        fontSize: 18,
        fontWeight: 'bold',
        color: color.textDark,
        marginBottom: 5,
    },
    descriptionTextReview: {
        fontSize: 14,
        color: color.textGrey,
        marginBottom: 8,
    },
    locationPriceRowReview: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    locationTextReview: {
        fontSize: 14,
        color: color.textGrey,
        marginLeft: 5,
    },
    priceTextReview: {
        fontSize: 22,
        fontWeight: 'bold',
        color: color.textDark,
        marginTop: 5,
        marginBottom: 15,
    },
    promotionSectionReview: {
        paddingTop: 15,
        paddingHorizontal: 0, 
        borderTopWidth: 1,
        borderTopColor: color.borderLight,
    },
    promotionHeaderReview: {
        fontSize: 16,
        fontWeight: '600',
        color: color.textDark,
        marginBottom: 10,
    },
    promotionOptionRowReview: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
    },
    promotionOptionText: {
        fontSize: 16,
        color: color.textDark,
    },
    checkboxReview: {
        width: 20, 
        height: 20,
        borderRadius: 4, 
        borderWidth: 1,
        borderColor: color.textGrey,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkboxChecked: {
        backgroundColor: color.black, // Example checked color
        borderColor: color.black,
    },
    checkboxInnerReview: {
        // Unchecked state (empty)
    },
});

export default AdReviewCard;