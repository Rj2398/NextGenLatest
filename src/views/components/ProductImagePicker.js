import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
// ⚠️ REQUESTED IMPORT - Note the name difference from the official package
import ImagePicker from 'react-native-image-crop-picker';
import Feather from 'react-native-vector-icons/Feather';

const ImageThumbnail = ({uri, index, onRemove}) => (
  <View style={styles.imageWrapper}>
    <Image source={{uri: uri}} style={styles.thumbnailImage} />
    <TouchableOpacity
      style={styles.removeButton}
      onPress={() => onRemove(index)}>
      <Feather name="x" size={14} color="#000" />
    </TouchableOpacity>
  </View>
);

const AddImageButton = ({onPress}) => (
  <TouchableOpacity style={styles.addImageWrapper} onPress={onPress}>
    <Text style={styles.plusSign}>+</Text>
  </TouchableOpacity>
);

const ProductImagePicker = () => {
  const [images, setImages] = useState([]);

  // --- FUNCTIONAL LOGIC FOR IMAGE PICKING ---
  const handleAddImage = async () => {
    try {
      // Logic relies on the methods provided by the imported ImagePicker object
      const selectedImages = await ImagePicker.openPicker({
        multiple: true,
        mediaType: 'photo',
      });

      const newImageUris = selectedImages.map(img => img.path);

      setImages(prevImages => [...prevImages, ...newImageUris]);
    } catch (error) {
      if (error.code === 'E_PICKER_CANCELLED') {
        console.log('Image picker cancelled by user.');
      } else {
        Alert.alert(
          'Error selecting image',
          'Failed to access gallery. Check app permissions.',
        );
        console.error('Image Picker Error:', error);
      }
    }
  };
  // --- END FUNCTIONAL LOGIC ---

  const handleRemoveImage = indexToRemove => {
    setImages(prevImages =>
      prevImages.filter((_, index) => index !== indexToRemove),
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Product Images</Text>

      <View style={styles.imageListContainer}>
        <AddImageButton onPress={handleAddImage} />

        {images.map((uri, index) => (
          <ImageThumbnail
            key={index}
            uri={uri}
            index={index}
            onRemove={handleRemoveImage}
          />
        ))}
      </View>
    </View>
  );
};

export default ProductImagePicker;

// --- Stylesheet (Unchanged) ---
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  imageListContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  addImageWrapper: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: '#F0EFEF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    marginBottom: 10,
  },
  plusSign: {
    fontSize: 40,
    color: '#aaa',
    lineHeight: 40,
  },
  imageWrapper: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: '#F9F8F7',
    overflow: 'visible',
    position: 'relative',
    marginRight: 10,
    marginBottom: 10,
  },
  thumbnailImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
    resizeMode: 'contain',
  },
  removeButton: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#fff',
    borderRadius: 10,
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
  },
});
