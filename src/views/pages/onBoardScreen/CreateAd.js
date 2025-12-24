import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Image, Platform } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
// NOTE: For a real app, you would need to install a library like 'expo-image-picker' or 'react-native-image-picker'
// import * as ImagePicker from 'expo-image-picker'; // Example import for real image picking

// --- Importaciones de componentes ---
import Tag from '../../components/Ads/Tag';
import SearchBar from '../../components/Ads/SearchBar';
import InputGroup from '../../components/InputGroup'; 
import DropdownGroup from '../../components/DropdownGroup'; 
import Header from '../../components/Header';
import PrimaryButton from '../../components/PrimaryButton';
import ProductImagePicker from '../../components/ProductImagePicker';
import DescriptionInputGroup from '../../components/Ads/DescriptionInputGroup';
import GifBannerUpload from '../../components/Ads/GifBannerUpload';
import AdReviewCard from '../../components/Ads/AdReviewCard'; // <-- Naya Import
import AdPublishedPopup from '../../components/Ads/AdPublishedPopup';



// --- Definición de colores movida dentro del archivo ---
const color = {
    white: '#FFFFFF',
    black: '#000000',
    greyBackground: '#F5F5F5',
    orangePrimary: '#FF8719', // Primary orange color
    textDark: '#1E1E1E',
    textGrey: '#757575',
    textLightGrey: '#A0A0A0',
    borderLight: '#E0E0E0',
    orangeLight: '#FFF6EE',
    filterButtonBg: '#F0F0F0', // Light background for filter button
};

// --- Component Definition ---
const CreateAd = ({ navigation }) => {
    const MAX_DESCRIPTION_LENGTH = 100; // Adjusted max length for typical descriptions
    
    // --- State Variables (Using mock data for visual consistency in Review) ---
    const [adTitle, setAdTitle] = useState('Noodles Ready in 2 minutes'); // Mocked for Review Tab

    const [region, setRegion] = useState('Bhilai');
    const [subCategory, setSubCategory] = useState('Education');
    const [brand, setBrand] = useState('Maggi'); // Mocked for Review Tab (Implicitly used)
    const [sku, setSku] = useState('Prod- 12345');
    const [tags, setTags] = useState(['snacks', 'Noodles']);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTab, setActiveTab] = useState('Details');
    
    // NUEVOS States for 'Media' tab
    const [description, setDescription] = useState('Lorem ipsum dolor sit amet consectetur. Nunc risus arcu velit risus. Faucibus mauris proin dui proin.'); // Mocked for Review Tab
    // NOTE: Using a placeholder URI for demonstration since actual file picking requires external libraries
   

    // Mock data for Review Tab
    const adPrice = '150'; // Price for Review
    const adLocation = 'New York, NY'; // Location for Review
    const productNameReview = 'Maggi masala 2 in one Flavours'; // Product Name for Review
    const mockImageUrl1 = 'https://picsum.photos/200/150?random=maggi1'; // Placeholder for image 1
    const mockImageUrl2 = 'https://picsum.photos/200/150?random=maggi2'; // Placeholder for image 2

    const [showAdPublishedPopup, setShowAdPublishedPopup] = useState(false); // <-- Naya state

    // --- Mock Data ---
    const [regionOptions, setRegionOptions] = useState([
        { id: 1, title: 'Bhilai' },
        { id: 2, title: 'Raipur' },
        { id: 3, title: 'Delhi' },
    ]);
    const [subCategoryOptions, setSubCategoryOptions] = useState([
        { id: 1, title: 'Education' },
        { id: 2, title: 'Finance' },
        { id: 3, title: 'Technology' },
    ]);

    // --- Utility Functions ---
    const handleNextStep = () => {
        console.log('Ad Data Submitted. Navigating to Next Step...');
        // Example logic: move to the next tab if on 'Details'
        if (activeTab === 'Details') {
            setActiveTab('Media');
        } else if (activeTab === 'Media') {
            setActiveTab('Review');
        } else if (activeTab === 'Review') {
             console.log('Final Submission: Submit Ad button pressed.');
             setShowAdPublishedPopup(true); // <-- Popup dikhao
         }
    };

// Functions for popup buttons
    const handleBoostListing = () => {
        console.log('Boost Listing clicked!');
        setShowAdPublishedPopup(false); // Popup band karo
        // navigation.navigate('BoostScreen'); // Example: Navigate to a boost screen
    };

    const handleViewMyAds = () => {
        console.log('View My Ads clicked!');
        setShowAdPublishedPopup(false); // Popup band karo
        // navigation.navigate('MyAdsScreen'); // Example: Navigate to user's ads list
    };

    const handleCreateAnotherAd = () => {
        console.log('Create another ad clicked!');
        setShowAdPublishedPopup(false); // Popup band karo
        setActiveTab('Details'); // Details tab par wapas jao
        // Reset all ad creation states here if needed
    };


    
 
    // --- Render Logic for Tabs ---
    const renderTabContent = () => {
        if (activeTab === 'Details') {
            return (
                <>
                    <Text style={styles.sectionHeader}>Ad info</Text>
                    <View style={styles.singleInputCard}>
                        <InputGroup label="Ad Title" value={adTitle} onChangeText={setAdTitle} placeholder="Ad title here"/>
                        <DropdownGroup label="Category" value={region} onSelect={setRegion} placeholder="Select Category" options={regionOptions}/>
                        <DropdownGroup label="Sub Category" value={subCategory} onSelect={setSubCategory} placeholder="Select Sub Category" options={subCategoryOptions}/>
                        <InputGroup label="Brand" value={brand} onChangeText={setBrand} placeholder="Product name"/>
                        <InputGroup label="SKU" value={sku} onChangeText={setSku} placeholder="Prod- 12345"/>
                        
                        {/* Tags Input (Manual Implementation) */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.manualLabel}>Tags</Text>
                            <View style={styles.tagsInputContainerBox}>
                                {tags.map((tag, index) => (<Tag key={index} text={tag} />))}
                                <TextInput placeholder="Add tag" placeholderTextColor={color.textLightGrey} style={styles.tagTextInput}/>
                            </View>
                        </View>
                        
                        <InputGroup label="Promotional Price" value={'250'} onChangeText={setSku} keyboardType="numeric" placeholder="250"/>
                        <InputGroup label="Negotiations" value={'180'} onChangeText={setSku} keyboardType="numeric" placeholder="180"/>
                    </View>
                
                </>
            );
        } else if (activeTab === 'Media') {
            return (
                <>
                    
                    <View style={styles.singleInputCard}>
                      <ProductImagePicker />
                      </View>
                       {/* 2. Add GIF Card - Just calling the component here */}
                <View style={styles.singleInputCard}>
                    <GifBannerUpload /> 
                </View>
                        {/* Description Input Component */}
                        <View style={styles.singleInputCard}>
                        <DescriptionInputGroup
                            label="Description"
                            value={description}
                            onChangeText={setDescription}
                            maxLength={MAX_DESCRIPTION_LENGTH}
                        />
                          </View>

                   
                </>
            );
        } else if (activeTab === 'Review') {
            return (
                  <AdReviewCard
                  adTitle={adTitle}
                  productName={productNameReview}
                  description={description}
                  adPrice={adPrice}
                  adLocation={adLocation}
                  mockImageUrl1={mockImageUrl1}
                  mockImageUrl2={mockImageUrl2}
                />
            );
        }
    };


    // --- Main Render ---
    return (
        <View style={styles.container}>
            {/* Header (Simplified - Only Back and Title) */}
            <Header
                title="Create Ad"
                onBackPress={() => navigation.goBack()}
            />

            {/* Scrollable Content */}
            <ScrollView contentContainerStyle={styles.scrollContent}>

                {/* Search Input Field & Filter Button */}
                <SearchBar
                    placeholder="Search ads"
                    value={searchTerm}
                    onChangeText={setSearchTerm}
                    onFilterPress={() => console.log('Filter pressed')} 
                />

                {/* Tab Navigation (Details | Media | Review) */}
                <View style={styles.tabContainer}>
                    {['Details', 'Media', 'Review'].map((tabName) => (
                         <TouchableOpacity
                            key={tabName}
                            style={[
                                styles.tabButton,
                                activeTab === tabName && styles.activeTabButton
                            ]}
                            onPress={() => setActiveTab(tabName)}
                        >
                            {activeTab === tabName && activeTab !== 'Review' ? ( // Checkmark for Details and Media (if completed)
                                <Ionicons name="checkmark-circle" size={18} color={color.white} style={{ marginRight: 5 }} />
                            ) : null}
                            <Text style={[styles.tabText, activeTab === tabName && styles.activeTabText]}>{tabName}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* --- Tab Content --- */}
                {renderTabContent()}
                
                {/* --- Bottom Button: Publish Ad or Next Step --- */}
               {!showAdPublishedPopup && ( // Button hide karo jab popup visible ho
                    <View style={styles.inlineButtonContainer}>
                        <PrimaryButton 
                            title={activeTab === 'Review' ? 'Publish Ad' : 'Next Step'} 
                            onPress={handleNextStep} 
                        />
                    </View>
                )}
            </ScrollView>
            {/* --- Ad Published Popup (Conditional Rendering) --- */}
            {showAdPublishedPopup && (
                            <AdPublishedPopup
                                productName={productNameReview}
                                onBoostListing={handleBoostListing}
                                onViewMyAds={handleViewMyAds}
                                onCreateAnotherAd={handleCreateAnotherAd}
                            />
                        )}
        </View>
    );
};

// --- Stylesheet ---
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.greyBackground,
    },
    // ... (Your existing Header, SearchBar, Tab Styles)
    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 15,
        marginBottom: 20,
    },
    tabButton: {
        flex: 1,
        flexDirection: 'row',
        paddingVertical: 10,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: color.white,
        borderWidth: 1,
        borderColor: color.borderLight,
        marginHorizontal: 5,
    },
    activeTabButton: {
        backgroundColor: color.orangePrimary,
        borderColor: color.orangePrimary,
    },
    tabText: {
        fontSize: 15,
        fontWeight: '600',
        color: color.textDark,
    },
    activeTabText: {
        color: color.white,
    },
    scrollContent: {
        paddingBottom: 40,
    },
    sectionHeader: {
        fontSize: 16,
        fontWeight: '700',
        color: color.textDark,
        marginHorizontal: 15,
        marginBottom: 10,
    },
    singleImageInputCard: { 
      backgroundColor: color.white,
      borderRadius: 12,
      paddingHorizontal: 15,
      paddingVertical: 15,
      marginHorizontal: 15,
      marginBottom: 15,
      borderWidth: 1,
      borderColor: color.borderLight,
      // The key is that the image component inside dictates the height, 
      // but adding minimum padding helps:
      minHeight: 100, // Ensure it's not too small
  },
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
    
    // --- Manual Input / Group Styles (Existing) ---
    inputGroup: {
        marginBottom: 15,
    },
    manualLabel: {
        fontSize: 14,
        color: color.textGrey, 
        marginBottom: 6,
        fontWeight: '600',
    },
    tagsInputContainerBox: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        minHeight: 50,
        height: 'auto',
        borderWidth: 1,
        borderColor: color.borderLight,
        borderRadius: 8,
        paddingVertical: 5, 
        paddingHorizontal: 10, 
    },
    tagTextInput: {
        flex: 1,
        fontSize: 16,
        color: color.textDark,
        padding: 0,
        margin: 0,
        height: 30, 
        minWidth: 50, 
    },
    inlineButtonContainer: {
        paddingHorizontal: 15,
        marginTop: 10,
        marginBottom: 10, 
    },

    // --- Media Tab New Styles (Existing) ---
    imageUploadContainer: {
        // Full width container for the upload box or preview
        height: 180, // Fixed height for image area
        backgroundColor: color.greyBackground,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: color.borderLight,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden', // Ensures image stays within bounds
    },
    uploadPlaceholder: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    uploadText: {
        fontSize: 16,
        fontWeight: '600',
        color: color.textDark,
        marginTop: 5,
    },
    uploadHint: {
        fontSize: 12,
        color: color.textGrey,
        marginTop: 2,
    },
    imagePreviewWrapper: {
        width: '100%',
        height: '100%',
        position: 'relative',
    },
    uploadedImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    removeImageButton: {
        position: 'absolute',
        top: 5,
        right: 5,
        backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent white background for visibility
        borderRadius: 15,
        padding: 2,
        zIndex: 10,
    },
    
    // --- Description Text Area Styles (Existing) ---
    textArea: {
        height: 100, // Fixed height for multiline input
        borderWidth: 1,
        borderColor: color.borderLight,
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
        fontSize: 16,
        color: color.textDark,
        textAlignVertical: 'top', // Start text from the top
    },
    charCount: {
        fontSize: 12,
        color: color.textGrey,
        alignSelf: 'flex-end',
        marginTop: 4,
    },

    // --- NEW STYLES FOR REVIEW TAB (image_cf8a5f.png) ---
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
        paddingHorizontal: 0, // already in card padding
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
        width: 20, // Reduced size slightly for a cleaner look
        height: 20,
        borderRadius: 4, // Square checkbox
        borderWidth: 1,
        borderColor: color.textGrey,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkboxInnerReview: {
        // Empty view for unchecked state
    },

});

export default CreateAd;