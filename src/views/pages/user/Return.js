//
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView,
  Image,
  Modal,
  FlatList,
  Alert,
} from 'react-native';
import React, {useState} from 'react';

// --- Vector Icons and Image Picker ---
import Icon from 'react-native-vector-icons/MaterialIcons';
// Ensure 'react-native-image-crop-picker' and 'react-native-vector-icons' are installed and linked
import ImagePicker from 'react-native-image-crop-picker';
// Assuming UserHeader is a local component
import UserHeader from '../../components/user/UserHeader';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';

// --- CONSTANTS ---
const MAX_IMAGES = 3;

// --- MOCK DATA ---
const RETURN_REASONS = [
  {label: 'Damaged/Defective', value: 'damaged'},
  {label: 'Wrong item shipped', value: 'wrong_item'},
  {label: 'Not as described', value: 'not_described'},
  {label: 'Changed my mind', value: 'changed_mind'},
];

const MOCK_PRODUCTS = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    variant: 'Black • 1 item',
    price: '299',
    returnableUntil: 'Nov 29',
    imagePlaceholder:
      'https://signatize.in/wp-content/uploads/2024/05/1-47.jpg',
    seller: 'TechStore Arabia',
    // Initial state set in component
  },
  {
    id: '2',
    name: 'Clear Phone Case',
    variant: 'Transparent • 1 item',
    price: '49',
    returnableUntil: 'Nov 28',
    imagePlaceholder:
      'https://signatize.in/wp-content/uploads/2024/05/1-47.jpg',
    seller: 'TechStore Arabia',
    // Initial state set in component
  },
];

// --- CUSTOM DROPDOWN COMPONENT ---
const CustomReasonDropdown = ({
  selectedReason,
  onSelect,
  reasons,
  initialLabel,
  styles,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const selectedReasonLabel =
    reasons.find(r => r.value === selectedReason)?.label || initialLabel;
  const isDamaged = selectedReason === 'damaged';

  const handleSelect = item => {
    onSelect(item.value);
    setIsVisible(false);
  };

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.dropdownItem}
      onPress={() => handleSelect(item)}>
      <Text style={styles.dropdownItemText}>{item.label}</Text>
      {item.value === selectedReason && (
        <Icon name="check" size={20} color="#FF7A00" />
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.dropdownContainer}>
      <TouchableOpacity
        style={styles.dropdownButton}
        onPress={() => setIsVisible(true)}>
        <Text
          style={
            isDamaged ? styles.dropdownButtonTextRed : styles.dropdownButtonText
          }
          numberOfLines={1}>
          {selectedReasonLabel}
        </Text>
        <Icon name="keyboard-arrow-down" color={'#666'} size={24} />
      </TouchableOpacity>

      <Modal
        visible={isVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsVisible(false)}>
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={() => setIsVisible(false)}
          activeOpacity={1}>
          <View style={styles.dropdownListContainer}>
            <FlatList
              data={reasons}
              keyExtractor={item => item.value}
              renderItem={renderItem}
              style={styles.dropdownList}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

// --- MAIN RETURN COMPONENT ---
const Return = () => {
  const navigation = useNavigation();
  // Initialize state to hold product details PLUS return data (quantity, reason, notes, images)
  const initialReturnState = MOCK_PRODUCTS.map(p => ({
    ...p,
    quantityToReturn: p.id === '1' ? 1 : 0,
    returnReason: p.id === '1' ? 'damaged' : '',
    notes: '',
    images: [],
  }));

  const [returnItems, setReturnItems] = useState(initialReturnState);

  // --- GENERAL UPDATE FUNCTION ---
  const updateReturnItem = (itemId, key, value) => {
    setReturnItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId ? {...item, [key]: value} : item,
      ),
    );
  };

  // --- IMAGE PICKER FUNCTION (Per Item) ---
  const handlePickImages = async (itemId, currentImages) => {
    if (currentImages.length >= MAX_IMAGES) {
      Alert.alert(
        'Limit Reached',
        `You can only upload up to ${MAX_IMAGES} photos for this item.`,
      );
      return;
    }

    try {
      const selectedImages = await ImagePicker.openPicker({
        multiple: true,
        maxFiles: MAX_IMAGES - currentImages.length,
        mediaType: 'photo',
        cropping: false,
      });

      const newImages = selectedImages.map(image => ({
        uri: image.path,
      }));

      updateReturnItem(itemId, 'images', [...currentImages, ...newImages]);
    } catch (e) {
      if (e.code !== 'E_PICKER_CANCELLED') {
        console.error('Image Picker Error:', e);
        Alert.alert(
          'Error',
          'Failed to pick images. Check device permissions.',
        );
      }
    }
  };

  const removeImage = (itemId, uri) => {
    setReturnItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId
          ? {
              ...item,
              images: item.images.filter(img => img.uri !== uri),
            }
          : item,
      ),
    );
  };

  // --- RENDERING FUNCTION FOR A SINGLE RETURN ITEM BLOCK ---
  const renderReturnItemBlock = (item, isLastItem) => {
    const isPhotoRequired =
      item.quantityToReturn > 0 &&
      (item.returnReason === 'damaged' ||
        item.returnReason === 'wrong_item' ||
        item.returnReason === 'not_described');

    return (
      <View key={item.id} style={styles.itemBlock}>
        {/* Product Details */}
        <View style={styles.productRow}>
          <Image
            source={{uri: item.imagePlaceholder}}
            style={styles.productImagePlaceholder}
          />
          <View style={styles.productDetails}>
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productVariant}>{item.variant}</Text>
            <Text style={styles.productPrice}>AED {item.price}</Text>
            <View style={styles.returnableTag}>
              <Icon name="check-circle" size={14} color="#388E3C" />
              <Text style={styles.returnableText}>
                Returnable until {item.returnableUntil}
              </Text>
            </View>
          </View>
        </View>

        {/* Quantity Selector */}
        <View style={styles.quantityRow}>
          <Text style={styles.quantityLabel}>Quantity to return</Text>
          <View style={styles.quantityControl}>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() =>
                updateReturnItem(
                  item.id,
                  'quantityToReturn',
                  Math.max(0, item.quantityToReturn - 1),
                )
              }>
              <Text style={styles.quantityButtonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantityValue}>{item.quantityToReturn}</Text>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() =>
                updateReturnItem(
                  item.id,
                  'quantityToReturn',
                  item.quantityToReturn + 1,
                )
              }>
              <Text style={styles.quantityButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Reason for Return Dropdown */}
        <Text style={styles.reasonLabel}>Reason for return *</Text>
        <CustomReasonDropdown
          selectedReason={item.returnReason}
          onSelect={value => updateReturnItem(item.id, 'returnReason', value)}
          reasons={RETURN_REASONS}
          initialLabel="Select reason"
          styles={styles}
        />

        {/* --- Notes (Per Item) --- */}
        <Text style={styles.notesLabel}>Additional notes (optional)</Text>
        <TextInput
          style={styles.notesInput}
          multiline
          placeholder="Describe the issue..."
          maxLength={300}
          value={item.notes}
          onChangeText={text => updateReturnItem(item.id, 'notes', text)}
        />
        <Text style={styles.charCountText}>
          {item.notes.length}/300 characters
        </Text>

        {/* --- Add Photos (Per Item) --- */}
        <Text style={styles.addPhotoLabel}>Add photos</Text>
        <View style={styles.photoPickerRow}>
          {/* Image Picker Button */}
          {item.images.length < MAX_IMAGES && (
            <TouchableOpacity
              style={styles.addPhotoButton}
              onPress={() => handlePickImages(item.id, item.images)}>
              <Icon name="add-a-photo" size={24} color="#666" />
              <Text style={styles.addPhotoText}>Add photo</Text>
            </TouchableOpacity>
          )}

          {/* Selected Image Thumbnails */}
          {item.images.map((img, index) => (
            <View key={index} style={styles.selectedPhotoContainer}>
              <Image
                source={{uri: img.uri}}
                style={styles.selectedPhotoImage}
              />
              <TouchableOpacity
                style={styles.removeImageIcon}
                onPress={() => removeImage(item.id, img.uri)}>
                <Icon name="close" size={16} color="#fff" />
              </TouchableOpacity>
            </View>
          ))}

          {/* Placeholder for remaining photos */}
          {Array.from({
            length:
              MAX_IMAGES -
              item.images.length -
              (item.images.length < MAX_IMAGES ? 1 : 0),
          }).map((_, index) => {
            return (
              <View
                key={`placeholder-${item.id}-${index}`}
                style={styles.emptyPhotoPlaceholder}
              />
            );
          })}

          {/* The 'Required' tag */}
          {isPhotoRequired && (
            <View style={styles.requiredTagContainer}>
              <Text style={styles.requiredTagText}>Required</Text>
            </View>
          )}
        </View>
        <Text style={styles.photoHintText}>
          JPG, PNG, PDF • Max 10MB each • Up to {MAX_IMAGES} photos
        </Text>

        {/* Separator only if it's NOT the last item */}
        {!isLastItem && <View style={styles.itemSeparatorThick} />}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.screenContainer}>
      <UserHeader title={'Return'} onBackPress={() => navigation.goBack()} />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        style={styles.scrollView}>
        {/* Order Info Card */}
        <View style={styles.orderView}>
          <View style={styles.headerContent}>
            <View>
              <Text style={styles.orderId}>Order #ORD-2024-0891</Text>
              <Text style={styles.orderDates}>
                Placed: Oct 25 • Delivered: Oct 28
              </Text>
            </View>
            <TouchableOpacity onPress={console.log('View order pressed')}>
              <Text style={styles.viewOrderText}>View order</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Return Items Card */}
        <View style={[styles.orderView]}>
          {/* Seller Header */}
          <View style={styles.sellerHeader}>
            <Text style={styles.sellerText}>
              Sold by **{MOCK_PRODUCTS[0].seller}**
            </Text>
            <TouchableOpacity>
              <Text style={styles.returnPolicyText}>Return policy</Text>
            </TouchableOpacity>
          </View>

          {/* Render both item blocks */}
          {returnItems.map((item, index) =>
            renderReturnItemBlock(item, index === returnItems.length - 1),
          )}
        </View>
      </ScrollView>

      {/* --- FIXED FOOTER --- */}
      <View style={styles.footerContainer}>
        {/* Info Banner */}
        <View style={styles.infoBanner}>
          <Icon
            name="info-outline"
            size={16}
            color="#FF7A00"
            style={{marginRight: 8}}
          />
          <Text style={styles.infoBannerText}>
            We'll create separate return requests for items from different
            sellers.
          </Text>
        </View>

        {/* Buttons */}
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={console.log('Cancel')}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.continueButton}
            onPress={() => {
              navigation.navigate('ConfirmPickup');
            }}>
            <Text style={styles.continueButtonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Return;

// --- STYLESHEET ---
const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  // *** Card/Container Styles ***
  orderView: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginVertical: 10,
    marginHorizontal: 15,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderId: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  orderDates: {
    fontSize: 14,
    color: '#666',
  },
  viewOrderText: {
    color: '#FF7A00',
    fontWeight: '700',
  },
  sellerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    paddingBottom: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#eee',
  },
  sellerText: {
    fontSize: 14,
    color: '#333',
    fontWeight: 'bold',
  },
  returnPolicyText: {
    fontSize: 13,
    color: '#FF7A00',
  },

  // *** Product Block Styles ***
  itemBlock: {
    // Container for the entire product section (details, quantity, reason, notes, photos)
  },
  itemSeparatorThick: {
    height: 20,
    marginTop: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#eee',
    marginBottom: 10,
  },
  productRow: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  productImagePlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 6,
    backgroundColor: '#eee',
    marginRight: 15,
  },
  productDetails: {
    flex: 1,
  },
  productName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
  },
  productVariant: {
    fontSize: 13,
    color: '#888',
  },
  productPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 4,
  },
  returnableTag: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  returnableText: {
    fontSize: 12,
    color: '#388E3C',
    marginLeft: 4,
  },

  // --- Quantity Selector Styles ---
  quantityRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  quantityLabel: {
    fontSize: 14,
    color: '#333',
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    overflow: 'hidden',
  },
  quantityButton: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
  },
  quantityButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  quantityValue: {
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 15,
    minWidth: 15,
    textAlign: 'center',
    color: '#333',
  },

  // --- Dropdown Styles (Reason for Return) ---
  reasonLabel: {
    fontSize: 14,
    color: '#333',
    marginTop: 15,
  },
  dropdownContainer: {
    zIndex: 100,
    width: '100%',
  },
  dropdownButton: {
    width: '100%',
    height: 44,
    backgroundColor: '#fff',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ccc',
    marginTop: 8,
    paddingHorizontal: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dropdownButtonText: {
    flex: 1,
    fontSize: 14,
    textAlign: 'left',
    color: '#333',
    marginRight: 10,
  },
  dropdownButtonTextRed: {
    flex: 1,
    fontSize: 14,
    textAlign: 'left',
    color: '#D9534F',
    marginRight: 10,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 20,
  },
  dropdownListContainer: {
    width: '100%',
    maxHeight: 250,
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  dropdownItem: {
    padding: 15,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#eee',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dropdownItemText: {
    fontSize: 16,
    color: '#333',
  },

  // --- Notes/Photos Styles (Per Item) ---
  notesLabel: {
    fontSize: 14,
    color: '#333',
    marginTop: 20,
    marginBottom: 8,
  },
  notesInput: {
    height: 80,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    textAlignVertical: 'top',
    fontSize: 14,
  },
  charCountText: {
    fontSize: 12,
    color: '#888',
    textAlign: 'left',
    marginTop: 4,
  },
  addPhotoLabel: {
    fontSize: 14,
    color: '#333',
    marginTop: 20,
    marginBottom: 10,
  },
  photoPickerRow: {
    flexDirection: 'row',
    columnGap: 10,
    alignItems: 'flex-start',
    position: 'relative',
  },
  addPhotoButton: {
    width: 90,
    height: 90,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ccc',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addPhotoText: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  selectedPhotoContainer: {
    position: 'relative',
    width: 90,
    height: 90,
    borderRadius: 6,
    overflow: 'hidden',
  },
  selectedPhotoImage: {
    width: '100%',
    height: '100%',
  },
  emptyPhotoPlaceholder: {
    width: 90,
    height: 90,
    borderRadius: 6,
    backgroundColor: '#f0f0f0',
  },
  removeImageIcon: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 8,
    padding: 2,
    zIndex: 10,
  },
  requiredTagContainer: {
    backgroundColor: '#F0AD4E',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    position: 'absolute',
    top: -10,
    right: 0,
    zIndex: 5,
  },
  requiredTagText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  photoHintText: {
    fontSize: 12,
    color: '#888',
    marginTop: 8,
    marginBottom: 10,
  },

  // --- FIXED FOOTER STYLES ---
  footerContainer: {
    // Sticks to the bottom
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    backgroundColor: '#fff',
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -2},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 10,
  },
  infoBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF8E1',
    padding: 10,
    borderRadius: 6,
    marginBottom: 15,
  },
  infoBannerText: {
    fontSize: 13,
    color: '#FF7A00',
    flexShrink: 1,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    marginRight: 10,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  continueButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    backgroundColor: '#FF7A00',
    borderRadius: 6,
  },
  continueButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});
