import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

// --- COLORS ---
const color = {
    white: '#FFFFFF',
    textDark: '#1E1E1E',
    textGrey: '#757575',
    borderLight: '#E0E0E0',
    orangeDot: '#FF8719', 
    tealDot: '#26A69A', 
    redDot: '#EF5350', 
};

// Dot Component for Best Selling Category
const ColorDot = ({ color }) => (
    <View style={[styles.dot, { backgroundColor: color }]} />
);

// --- Component 1: For Best Selling Category (with colored dot) ---
export const CategoryItem = ({ name, value, dotColor }) => (
    <View style={styles.itemRow}>
        <View style={styles.categoryLeft}>
            <ColorDot color={dotColor} />
            <Text style={styles.itemName}>{name}</Text>
        </View>
        <Text style={styles.itemValue}>{`$${value}`}</Text>
    </View>
);

// --- Component 2: For Best Selling Products (with image) ---
export const ProductItem = ({ name, sku, imageUri, value, unitsSold }) => (
    <View style={styles.itemRow}>
        <Image source={{ uri: imageUri }} style={styles.productImage} />
        <View style={styles.productDetails}>
            <Text style={styles.itemName} numberOfLines={1}>{name}</Text>
            <Text style={styles.itemSku}>SKU: {sku}</Text>
        </View>
        <View style={styles.productValueContainer}>
            <Text style={styles.itemValue}>{`$${value}`}</Text>
            <Text style={styles.unitsSold}>{unitsSold} sold</Text>
        </View>
    </View>
);


const styles = StyleSheet.create({
    itemRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: color.borderLight,
    },
    categoryLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginRight: 10,
    },
    itemName: {
        fontSize: 14,
        fontWeight: '600',
        color: color.textDark,
        flexShrink: 1,
    },
    itemValue: {
        fontSize: 14,
        fontWeight: '700',
        color: color.textDark,
    },

    // Product specific styles
    productImage: {
        width: 40,
        height: 40,
        borderRadius: 5,
        marginRight: 10,
        backgroundColor: color.greyBackground,
    },
    productDetails: {
        flex: 1,
        justifyContent: 'center',
    },
    itemSku: {
        fontSize: 12,
        color: color.textGrey,
    },
    productValueContainer: {
        alignItems: 'flex-end',
    },
    unitsSold: {
        fontSize: 12,
        color: color.textGrey,
        marginTop: 2,
    }
});