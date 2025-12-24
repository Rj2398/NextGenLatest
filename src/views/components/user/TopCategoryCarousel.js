// TopCategoryCarousel.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';

const categoryData = [
    { id: 'c1', name: 'Kids', icon: 'https://via.placeholder.com/60/FFD700?text=Kid' },
    { id: 'c2', name: 'Bags', icon: 'https://via.placeholder.com/60/00CED1?text=Bag' },
    { id: 'c3', name: 'Description', icon: 'https://via.placeholder.com/60/7CFC00?text=Desc' },
    { id: 'c4', name: 'Photography', icon: 'https://via.placeholder.com/60/FFA07A?text=Photo' },
    { id: 'c5', name: 'Electronics', icon: 'https://via.placeholder.com/60/8A2BE2?text=Elec' },
    { id: 'c6', name: 'More', icon: 'https://via.placeholder.com/60/20B2AA?text=More' },
];

const Colors = { Orange: '#FF6600', White: '#fff', LightGreyBackground: '#f5f5f5', DarkText: '#333' };

const CategoryItem = ({ item }) => (
    <TouchableOpacity style={styles.categoryItem} activeOpacity={0.7}>
        <View style={styles.iconWrapper}>
            <Image source={{ uri: item.icon }} style={styles.iconImage} />
        </View>
        <Text style={styles.categoryText} numberOfLines={1}>{item.name}</Text>
    </TouchableOpacity>
);

const TopCategoryCarousel = () => (
    <View style={styles.container}>
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollView}
        >
            {categoryData.map((item) => (
                <CategoryItem key={item.id} item={item} />
            ))}
        </ScrollView>
    </View>
);

const styles = StyleSheet.create({
    container: {
        height: 100, // Fixed height for the category section
        backgroundColor: Colors.White,
        paddingVertical: 10,
    },
    scrollView: {
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    categoryItem: {
        alignItems: 'center',
        marginHorizontal: 8,
        width: 60, // Fixed width for each item
    },
    iconWrapper: {
        width: 55,
        height: 55,
        borderRadius: 27.5,
        overflow: 'hidden',
        backgroundColor: Colors.LightGreyBackground,
        borderWidth: 1,
        borderColor: Colors.Orange,
        marginBottom: 5,
    },
    iconImage: {
        width: '100%',
        height: '100%',
    },
    categoryText: {
        fontSize: 10,
        color: Colors.DarkText,
        textAlign: 'center',
    },
});

export default TopCategoryCarousel;