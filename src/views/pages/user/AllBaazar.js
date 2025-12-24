// AllBazar.js (Based on the Two-Column Grid View: image_3a91ba.png)

import React,{useState} from 'react';
import { View, StyleSheet, Modal, FlatList,Text ,TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

// --- Color Palette ---
const Colors = {
    PrimaryBlue: '#007bff', 
    White: '#fff',
    Black: '#000',
    Orange: '#FF6600',
    LightGreyBackground: '#f5f5f5', 
    DarkText: '#5C5D5E',
    ShadowColor: '#000',
    IconInactive: '#888',
    IconActive: '#FF6600',
    BadgeRed: '#dc3545',
};

// --- Component Imports (Reusing existing components) ---
// Note: AppHeader, SearchBar, ProductCard, BottomNavBar are assumed to exist/be created.
import AppHeader from '../../components/user/UserHomeHeader';
import SearchBar from '../../components/user/SearchBar';
import AllProductCard from '../../components/user/AllProductCard';
import ProductFilterScreen from '../../components/user/ProductFilterScreen'; // The one with 3 icons (Chat, Shop, Profile)
import FontAwesome from 'react-native-vector-icons/FontAwesome';

// --- Sample Product Data ---
const productData = [
    // This data is structured to match the details in the grid view
    { id: 'p1', name: 'Pen Stand', description: 'Neque porro quisquam est qui dolorem ipsum quia', imageUrl: 'https://via.placeholder.com/150/f0f0f0?text=Pencil', currentPrice: '9$', originalPrice: '12$', discount: '-20%', rating: '4.5', reviews: '3' },
    { id: 'p2', name: 'Regular Bag', description: 'Neque porro quisquam est qui dolorem ipsum quia', imageUrl: 'https://via.placeholder.com/150/f0f0f0?text=Bag', currentPrice: '14$', originalPrice: '21$', discount: '-20%', rating: '4.7', reviews: '10' },
    { id: 'p3', name: 'School Bag', description: 'Neque porro quisquam est qui dolorem ipsum quia', imageUrl: 'https://via.placeholder.com/150/f0f0f0?text=PinkBag', currentPrice: '17$', originalPrice: '25$', discount: '-30%', rating: '4.5', reviews: '8' },
    { id: 'p4', name: 'book', description: 'THE RULES & REGULATIONS', imageUrl: 'https://via.placeholder.com/150/f0f0f0?text=Book', currentPrice: '14$', originalPrice: '21$', discount: '-20%', rating: '4.0', reviews: '10' },
    // Adding more data to test scrolling
    { id: 'p5', name: 'New Pen Set', description: 'Small short description text here', imageUrl: 'https://via.placeholder.com/150/f0f0f0?text=Pen', currentPrice: '₹99', originalPrice: '₹120', discount: '10% OFF', rating: '4.3', reviews: '60' },
    { id: 'p6', name: 'Geometry Box', description: 'Small short description text here', imageUrl: 'https://via.placeholder.com/150/f0f0f0?text=Geo', currentPrice: '₹150', originalPrice: '₹200', discount: '25% OFF', rating: '4.2', reviews: '40' },
];

const AllBazar = ({ navigation }) => {
    // 💡 1. State to control the visibility of the Filter Modal
    const [isFilterVisible, setIsFilterVisible] = useState(false);
    // Function to close the modal
    const closeFilter = () => setIsFilterVisible(false);

// FlatList render item function for the product grid
const renderProduct = ({ item }) => <AllProductCard product={item}
onPress={handelPress}/>;

 const  handelPress=()=>{
   // const navigation = useNavigation();  // 👈 navigation yahin se aayega
    console.log("123456","UserProductDetail")
    navigation.navigate('UserProductDetail')
 }

    return (
        <View style={styles.container}>
            
            {/* The screen structure is now different: AppHeader and SearchBar are separate elements */}
            <AppHeader /> 
            
            {/* Static Search Bar and Filter Section */}
            <View style={styles.topControlArea}>
                <SearchBar style={styles.searchBar} />
                <View style={styles.statsRow}>
                    <Text style={styles.itemCount}>365 Items +</Text>
                    {/* Filter and Sort Icons */}
                    <View style={styles.filterIcons}>
                        <View style={styles.iconButton}>
                            <Text style={styles.iconText}>⇅</Text> 
                        </View>
                        <TouchableOpacity style={[styles.iconButton, styles.filterButton]}
                        onPress={() => setIsFilterVisible(true)}>
                            {/* <Text style={styles.iconText}>▼</Text> */}
                            <FontAwesome name="filter" size={16} color={Colors.DarkText} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            
            {/* Scrollable Product Grid (The main body of the screen) */}
            {/* We use a single FlatList with numColumns={2} for better performance */}
            <FlatList
                data={productData}
                renderItem={renderProduct}
                keyExtractor={(item) => item.id}
                numColumns={2} // 💡 FIX: This creates the two-column vertical grid
                columnWrapperStyle={styles.row} // Style to apply between the two columns
                contentContainerStyle={styles.gridContent}
                showsVerticalScrollIndicator={false}
            />

            {/* Bottom Navigation Bar */}
            {/* <BottomNavBar />  */}
            {/* 💡 3. The Modal Component: Displays ProductFilterScreen */}
            <Modal
                animationType="slide"
                transparent={false} // Make it a full screen modal
                visible={isFilterVisible}
                onRequestClose={closeFilter} // Android back button handler
            >
                {/* Modal content wrapper that positions the filter screen at the bottom */}
                <View style={styles.modalOuterContainer}>
                    {/* Pass the close function down to the filter screen */}
                    <ProductFilterScreen onClose={closeFilter} />
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.LightGreyBackground, 
    },
    topControlArea: {
        backgroundColor: Colors.White,
        paddingBottom: 10,
    },
    searchBar: {
        // Ensuring SearchBar sits nicely in the top area
        marginHorizontal: 15,
        marginBottom: 10,
    },
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
    },
    itemCount: {
        fontSize: 14,
        color: Colors.DarkText,
        fontWeight: 'bold',
    },
    filterIcons: {
        flexDirection: 'row',
    },
    iconButton: {
        width: 30,
        height: 30,
        marginLeft: 10,
        borderRadius: 5,
        backgroundColor: Colors.White,
        borderWidth: 1,
        borderColor: '#ddd',
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconText: {
        fontSize: 16,
        color: Colors.DarkText,
    },
    filterButton: {
        // You can add distinct styling for the filter button if needed
    },
    
    // --- FLATLIST GRID STYLES ---
    gridContent: {
        paddingHorizontal: 8, // Adds padding to the whole grid area
        paddingTop: 10,
        paddingBottom: 20,
    },
    row: {
        // This ensures the space between the two columns
        justifyContent: 'space-around', 
    },
    modalOuterContainer: {
        flex: 1,
        justifyContent: 'flex-end', // Pushes the content (ProductFilterScreen) to the bottom
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black background overlay
    },
});

export default AllBazar;