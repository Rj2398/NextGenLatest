// BannerCarousel.js (FIXED: Indicator position is below the image on the white border)
import React, { useState } from 'react';
import { View, StyleSheet, Image, Dimensions, ScrollView } from 'react-native';

const { width } = Dimensions.get('window');
// Calculate the width of a single slide (Screen width - margin)
const bannerWidth = width - 30; 
// Define the data array for the carousel slides 
const bannerData = [
    { id: 'b1', imagePath: require('../../../assets/user/static_banner.png') },
    { id: 'b2', imagePath: require('../../../assets/user/static_banner.png') },
    { id: 'b3', imagePath: require('../../../assets/user/static_banner.png') },
];

// --- Color Palette ---
const Colors = {
    White: '#fff',
    Orange: '#FF6600',
    DotOpacity: 0.5,
    ActiveDotOpacity: 1,
};
// ---------------------

const BannerCarousel = () => {
    // State to track the index of the currently visible slide
    const [activeIndex, setActiveIndex] = useState(0);

    // Function to handle the scroll event and calculate the active index
    const handleScroll = (event) => {
        const xOffset = event.nativeEvent.contentOffset.x;
        const index = Math.round(xOffset / bannerWidth);
        
        if (index !== activeIndex) {
            setActiveIndex(index);
        }
    };

    return (
        // The main wrapper now defines the total area including the white bottom margin
        <View style={styles.mainWrapper}> 
            
            <ScrollView
                horizontal
                pagingEnabled // Enables snapping to the page width
                showsHorizontalScrollIndicator={false}
                style={styles.carouselScrollView}
                onScroll={handleScroll}
                scrollEventThrottle={16}
            >
                {/* Map through the data to create multiple slides */}
                {bannerData.map((item) => (
                    <View key={item.id} style={styles.bannerContainer}>
                        <Image 
                            source={item.imagePath}
                            style={styles.bannerImage}
                            resizeMode="cover"
                        />
                    </View>
                ))}
            </ScrollView>
            
            {/* Dots are now part of the normal flow, centered below the ScrollView */}
            <View style={styles.dotsContainer}>
                {bannerData.map((item, index) => (
                    <View 
                        key={item.id}
                        // Check if the current index matches the activeIndex state
                        style={[
                            styles.dot, 
                            index === activeIndex && styles.activeDot 
                        ]} 
                    />
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    mainWrapper: {
        // Defines the outer space (including margins and the white dot area)
        marginHorizontal: 15,
        marginVertical: 10,
        backgroundColor: Colors.White, // Ensures the background is white below the image
        borderRadius: 10,
        overflow: 'hidden',
        // Total height = Banner height (180) + Dot area height (20)
        height: 200, 
    },
    carouselScrollView: {
        // Scroll view takes the height of the main image portion
        height: 180, 
    },
    bannerContainer: {
        // Container for a single slide, must match the calculated outer width
        width: bannerWidth, 
        height: '100%', // Takes 180px height of the ScrollView
    },
    bannerImage: {
        width: '100%',
        height: '100%',
        // Border radius applied to the image to match the container's rounded corners
        borderRadius: 10, 
    },
    
    dotsContainer: {
        // Dots are NOT absolute, they sit in the extra space (20px) created by mainWrapper
        height: 20, 
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    dot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: Colors.Orange, // Dots are orange, not white, against the white background
        marginHorizontal: 3,
        opacity: Colors.DotOpacity,
    },
    activeDot: {
        opacity: Colors.ActiveDotOpacity,
        backgroundColor: Colors.Orange,
        width: 15, 
    },
});

export default BannerCarousel;