// ProductFilterScreen.js (Fixed to be a bottom sheet style with radius)
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions,
    Image } from 'react-native';

// Get screen height to calculate modal height (approx 85% of screen height)
const { height: screenHeight } = Dimensions.get('window');
const MODAL_HEIGHT = screenHeight * 0.85; // Set filter height to 85% of screen

// --- Color Palette ---
const Colors = {
    White: '#fff',
    Black: '#000',
    Orange: '#F59A2E',
    LightGreyBackground: '#f5f5f5',
    DarkText: '#333',
    SectionBorder: '#eee',
    ActiveBackground: '#F59A2E',
    ActiveText: '#fff',
    InactiveBorder: '#ccc',
    BrandGrey: '#9B9B9B',
};

// --- Reusable Sub-Components (omitted for brevity, assume they are defined) ---
const FilterButton = ({ label, isActive, onPress }) => (
    <TouchableOpacity 
        style={[
            styles.filterButton,
            { 
                backgroundColor: isActive ? Colors.ActiveBackground : Colors.White,
                borderColor: isActive ? Colors.ActiveBackground : Colors.InactiveBorder,
            }
        ]}
        onPress={onPress}
    >
        <Text style={{ color: isActive ? Colors.ActiveText : Colors.DarkText }}>
            {label}
        </Text>
    </TouchableOpacity>
);

const ColorOption = ({ colorCode, isActive, onPress }) => (
    <TouchableOpacity 
        style={[
            styles.colorCircle,
            { backgroundColor: colorCode },
            isActive && styles.colorCircleActiveBorder
        ]}
        onPress={onPress}
    />
);

const FilterSection = ({ title, children, showBorder = true, titleComponent }) => (
    <View style={[styles.sectionContainer, showBorder && styles.sectionBorder]}>
        {titleComponent || <Text style={styles.sectionTitle}>{title}</Text>}
        <View style={styles.sectionContent}>
            {children}
        </View>
    </View>
);
// --- End Sub-Components ---

const ProductFilterScreen = ({ onClose }) => {
    // Data for rendering (omitted for brevity)
    const colorsData = ['#000', '#fff', Colors.Orange, '#B8A1A9', '#E0C9B3', '#191970'];
    const sizesData = ['XS', 'S', 'M', 'L', 'XL'];
    const categoryData = ['All', 'Women', 'Men', 'Boys', 'Girls'];

    return (
        // 💡 FIX: This wrapper view ensures the filter takes up most of the screen height
        <View style={styles.modalContentWrapper}> 
            
            {/* Header: Filters & Reset all */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Filters</Text>
                <TouchableOpacity onPress={() => console.log('Reset Filters')}>
                    <Text style={styles.resetText}>Reset all</Text>
                </TouchableOpacity>
            </View>

            {/* Scrollable Filter Options */}
            <ScrollView style={styles.filtersScroll}>
                
                {/* 1. Colors Section */}
                <FilterSection title="Colors">
                    <View style={styles.colorRow}>
                        {colorsData.map((color, index) => (
                            <ColorOption key={index} colorCode={color} isActive={index === 4} onPress={() => {}} />
                        ))}
                    </View>
                </FilterSection>

                {/* 2. Sizes Section */}
                <FilterSection title="Sizes">
                    <View style={styles.optionsRow}>
                        {sizesData.map((size, index) => (
                            <FilterButton key={index} label={size} isActive={index === 1 || index === 2} onPress={() => {}} />
                        ))}
                    </View>
                </FilterSection>

                {/* 3. Category Section */}
                <FilterSection title="Category">
                    <View style={styles.categoryGrid}>
                        {categoryData.map((cat, index) => (
                            <FilterButton key={index} label={cat} isActive={index === 0} onPress={() => {}} />
                        ))}
                    </View>
                </FilterSection>

              {/* 💡 FIX: 4. Brand Section - Separating Title/Arrow from Details */}
        
             <FilterSection showBorder={false}>
             <TouchableOpacity style={styles.brandRowContainer}>
                    <Text style={styles.sectionTitle}>Brand</Text> {/* Title remains separate on top */}
                    {/* <Text style={styles.brandArrow}>›</Text> */}
                    <Image 
            source={require('../../../assets/user/left_arrow.png') }
            style={styles.bannerImage}
            resizeMode="contain"  />
                    </TouchableOpacity>
                    
                    {/* <TouchableOpacity style={styles.brandRowContainer}> */}
                    
                        <View style={styles.brandDetailsWrapper}> 
                            <Text style={styles.brandDetails}>adidas Originals, Jack & Jones, s.Oliver</Text>
                            {/* <Text style={styles.brandArrow}>›</Text> */}
                        </View>
                        {/* Arrow Icon on the Right, opposite the details */}
                
                </FilterSection>
                
                {/* Spacer for bottom padding */}
                <View style={{ height: 100 }} />

            </ScrollView>

            {/* Fixed Bottom Buttons: Discard and Apply */}
            <View style={styles.bottomButtons}>
                <TouchableOpacity style={[styles.actionButton, styles.discardButton]} onPress={() => onClose()}>
                    <Text style={styles.discardText}>Discard</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.actionButton, styles.applyButton]} onPress={() => onClose()}>
                    <Text style={styles.applyText}>Apply</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    // 💡 FIX: Main wrapper style for the bottom sheet effect
    modalContentWrapper: {
        width: '100%',
        height: MODAL_HEIGHT, // Height set to 85% of screen
        backgroundColor: Colors.White,
        // 💡 FIX: Added border radius for rounded top corners
        borderTopLeftRadius: 20, 
        borderTopRightRadius: 20,
        overflow: 'hidden', // Ensures content doesn't bleed outside the radius
        
        // This style is required if the Modal in AllBazar.js is set to transparent
        // position: 'absolute',
        // bottom: 0,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: Colors.SectionBorder,
    },
    headerTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.DarkText,
    },
    resetText: {
        fontSize: 14,
        color: Colors.BrandGrey,
    },
    // --- Brand Styles FIX ---
    brandRowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between', // Pushes details to left, arrow to right
        alignItems: 'center',
        width: '100%', 
    },
    brandDetailsWrapper: {
        // Allows the details text to take up most of the space
        flexDirection: 'row',
        justifyContent: 'space-between', // Pushes details to left, arrow to right
        flex: 1, 
        marginRight: 10,
        marginBottom:30,
    },
    filtersScroll: {
        flex: 1,
    },
    sectionContainer: {
        paddingHorizontal: 15,
        paddingVertical: 15,
    },
    sectionBorder: {
        borderBottomWidth: 1,
        borderBottomColor: Colors.SectionBorder,
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: Colors.DarkText,
    },
    sectionContent: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    // --- Brand Styles Fix ---
    brandTitleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    brandDetailsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    brandDetails: {
        fontSize: 12,
        color: Colors.BrandGrey,
    },
    brandArrow: {
        fontSize: 18,
        marginRight: 10,
        color: Colors.DarkText,
        marginLeft: 5,
    },
    // --- Bottom Button Styles ---
    bottomButtons: {
        flexDirection: 'row',
        borderTopWidth: 1,
        borderTopColor: Colors.SectionBorder,
        paddingTop: 10,
        paddingHorizontal: 15,
        paddingBottom: 20,
    },
    actionButton: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginHorizontal: 5,
    },
    discardButton: {
        backgroundColor: Colors.White,
        borderColor: Colors.BrandGrey,
        borderWidth: 1,
    },
    discardText: {
        color: Colors.DarkText,
        fontWeight: 'bold',
    },
    applyButton: {
        backgroundColor: Colors.Orange,
    },
    applyText: {
        color: Colors.White,
        fontWeight: 'bold',
    },
    bannerImage: {
        width: '10',
        height: '10',
        marginRight:10,
        marginTop:10,
      },
    // --- Other styles for FilterButton/ColorOption are omitted for brevity ---
    colorRow: { flexDirection: 'row', },
    colorCircle: { width: 35, height: 35, borderRadius: 17.5, marginRight: 15, borderWidth: 1, borderColor: Colors.InactiveBorder, },
    colorCircleActiveBorder: { borderWidth: 3, borderColor: Colors.Orange, },
    optionsRow: { flexDirection: 'row', flexWrap: 'wrap', },
    filterButton: { paddingHorizontal: 15, paddingVertical: 8, borderRadius: 5, marginRight: 10, marginBottom: 10, borderWidth: 1, },
    categoryGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', },
});

export default ProductFilterScreen;