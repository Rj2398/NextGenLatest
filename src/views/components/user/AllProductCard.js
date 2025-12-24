// ProductCard.js (Confirmed structure and fixed width for horizontal scrolling)
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

// --- Color Palette defined together for easy maintenance ---
const Colors = {
    White: '#fff',
    Black: '#222222',
    Orange: '#FF6600',
    LightGreyBackground: '#f9f9f9',
    ShadowColor: '#000',
    DescriptionGrey: '#9B9B9B',
    OriginalPriceGrey: '#888',
};
// -------------------------------------------------------------

const AllProductCard = ({ product ,onPress}) => {
    // Component for a single product display card.
    // Comments are added in English as requested in saved instructions.

    return (
        <TouchableOpacity 
            style={styles.cardContainer}
            // Control touch feedback based on whether horizontal scrolling is active
            onPress={onPress} 
            >

            {/* Product Image area container */}
            <View style={styles.imageArea}>
                {/* Image component, source is a URI */}
                <Image 
                    source={{ uri: product.imageUrl }} 
                    style={styles.productImage}
                    resizeMode="contain"
                />
            </View>
            {/* Product Details area */}
            <View style={styles.detailsArea}>

                {/* Rating stars and Count row */}
                <View style={styles.ratingRow}>
                    <Text style={styles.starIcon}>⭐</Text>
                    <Text style={styles.starIcon}>⭐</Text>
                    <Text style={styles.starIcon}>⭐</Text>
                    <Text style={styles.starIcon}>⭐</Text>
                    <Text style={styles.starIcon}>⭐</Text>
                    <Text style={styles.reviewCount}>({product.reviews})</Text>
                </View>



                {/* Product name, limited to 2 lines */}
                <Text style={styles.title} numberOfLines={2}>{product.name}</Text>
                {/* Short product description */}
                <Text style={styles.description} numberOfLines={1}>Small short description text here</Text>

                {/* Price and Discount row */}
                <View style={styles.priceRow}>
                    {/* Current selling price */}
                    <Text style={styles.currentPrice}>{product.currentPrice}</Text>
                    {/* Original price with strikethrough */}
                    <Text style={styles.originalPrice}>{product.originalPrice}</Text> 
                    {/* Discount percentage */}
                    <Text style={styles.discount}>{product.discount}</Text>
                </View>

            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        // Fixed pixel width for horizontal list items (170px wide)
        width: 170, 
        // Horizontal margin of 8px on both sides (total space = 170 + 8 + 8 = 186px)
        marginHorizontal: 8, 
        marginVertical: 8, // Vertical margin
        backgroundColor: Colors.White,
        borderRadius: 10,
        elevation: 2, 
        shadowColor: Colors.ShadowColor, 
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 1,
    },
    imageArea: {
        height: 120, 
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        backgroundColor: Colors.LightGreyBackground, 
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
    },
    productImage: {
        width: '90%',
        height: '90%',
    },
    badge: {
        position: 'absolute',
        top: 5,
        right: 5,
        width: 15,
        height: 15,
        borderRadius: 7.5,
        backgroundColor: Colors.Orange, 
        borderWidth: 2,
        borderColor: Colors.White,
    },
    detailsArea: {
        padding: 10,
    },
    title: {
        fontSize: 14,
        fontWeight: 'bold',
        color: Colors.Black,
    },
    description: {
        fontSize: 10,
        color: Colors.DescriptionGrey,
        marginVertical: 2,
    },
    priceRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 4,
    },
    currentPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.Black,
        marginRight: 5,
    },
    originalPrice: {
        fontSize: 12,
        color: Colors.OriginalPriceGrey,
        textDecorationLine: 'line-through',
        marginRight: 5,
    },
    discount: {
        fontSize: 10,
        color: Colors.Orange, 
        fontWeight: 'bold',
    },
    ratingRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    starIcon: {
        fontSize: 10,
    },
    ratingText: {
        fontSize: 10,
        color: Colors.Black,
        marginLeft: 3,
    },
    reviewCount: {
        fontSize: 10,
        color: Colors.OriginalPriceGrey,
        marginLeft: 3,
    },
});

export default AllProductCard;