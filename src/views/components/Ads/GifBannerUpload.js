import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

// --- COLORS: Aapki file se define kiye gaye maane hue (Assumed colors from your project) ---
const color = {
    white: '#FFFFFF',
    black: '#000000',
    greyBackground: '#F5F5F5',
    textDark: '#1E1E1E',
    textGrey: '#757575',
    textLightGrey: '#A0A0A0',
    borderLight: '#E0E0E0',
    orangePrimary: '#FF8719', 
};

// ***************************************************************
// *** YEH NAYA COMPONENT HAI JO ALAG FILE MEIN HOTA CHAHIYE ***
// ***************************************************************

// Simulate ImageCropPicker for demonstration
// NOTE: For real use, you would import ImagePicker from 'react-native-image-crop-picker'
const MOCK_ImagePicker = {
    openPicker: ({ mediaType, cropping, width, height }) => {
        return new Promise((resolve) => {
            console.log(`Picker opened for: ${mediaType}, Cropping: ${cropping}`);
            // Returning a mock result object
            // Use a specific image for GIF banner look if needed
            resolve([{ path: 'https://picsum.photos/400/150' }]); 
        });
    }
};

const GifBannerUpload = () => {
    const [gifUri, setGifUri] = useState(null);

    const handleSelectGif = async () => {
        try {
            // Using a specific aspect ratio for the banner and allowing GIF/image
            const images = await MOCK_ImagePicker.openPicker({
                mediaType: 'any', // Allows both image and video/gif
                cropping: true,
                width: 400, // Example banner width
                height: 150, // Example banner height
            });
            if (images && images.length > 0) {
                setGifUri(images[0].path);
                console.log('GIF/Banner selected and mocked crop applied.');
            }
        } catch (error) {
            console.log('User cancelled or error:', error);
        }
    };

    const handleRemoveGif = () => {
        setGifUri(null);
    };

    return (
        <View style={styles.inputGroup}>
            <Text style={styles.sectionHeaderNoMargin}>Add GIF</Text>
            <View style={styles.imageUploadContainer}>
                {gifUri ? (
                    <View style={styles.imagePreviewWrapper}>
                        <Image source={{ uri: gifUri }} style={styles.uploadedImage} resizeMode="cover" />
                        <TouchableOpacity style={styles.removeImageButton} onPress={handleRemoveGif}>
                            <Ionicons name="close-circle-sharp" size={24} color={color.black} />
                        </TouchableOpacity>
                    </View>
                ) : (
                    <TouchableOpacity style={styles.uploadPlaceholder} onPress={handleSelectGif}>
                        <Ionicons name="image-outline" size={30} color={color.textLightGrey} />
                        <View style={styles.uploadTextWrapper}>
                            <Text style={styles.uploadText}>upload JPG / GIF Banner</Text>
                            <Text style={styles.uploadHint}>Max Size: 5MB</Text>
                        </View>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

// --- STYLESHEET for GifBannerUpload ---
const styles = StyleSheet.create({
    inputGroup: {
        marginBottom: 0, // No extra margin needed inside the card
    },
    // Style for the header inside the card
    sectionHeaderNoMargin: {
        fontSize: 16,
        fontWeight: '700',
        color: color.textDark,
        marginBottom: 10,
    },
    
    // Main container for the upload area (based on your image)
    imageUploadContainer: {
        height: 100, // Fixed height for the banner box
        backgroundColor: color.greyBackground,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: color.borderLight,
        borderStyle: 'dashed', 
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden', 
    },
    // The placeholder when no image is selected
    uploadPlaceholder: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
    },
    uploadTextWrapper: {
        marginLeft: 10,
    },
    uploadText: {
        fontSize: 15,
        fontWeight: '600',
        color: color.textDark,
        // Aligned text as per the image
    },
    uploadHint: {
        fontSize: 12,
        color: color.textGrey,
        marginTop: 2,
    },
    // Image preview styles
    imagePreviewWrapper: {
        width: '100%',
        height: '100%',
        position: 'relative',
    },
    uploadedImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover', // Use cover to fill the banner area
    },
    removeImageButton: {
        position: 'absolute',
        top: 5,
        right: 5,
        backgroundColor: color.white, 
        borderRadius: 15,
        padding: 2,
        zIndex: 10,
    },
});

export default GifBannerUpload;