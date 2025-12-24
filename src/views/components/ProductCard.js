import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

const ProductCard = () => {

  const product = {
   
    imageUri: 'https://via.placeholder.com/80x80/ffe033/000000?text=PRODUCT', 
    color: 'Red',
    size: 'S',
    quantity: 12,
    price: 12,
    discount: '20% OFF',
  };

  const handleEdit = () => {
    console.log('Edit Item pressed');
  };

  const handleDelete = () => {
    console.log('Delete Item pressed');
  };

  return (
  
    <View style={styles.screenBackground}>
        <View style={styles.cardContainer}>
            <View style={styles.contentWrapper}>
                {/* Product Image */}
                <Image
                    source={{ uri: product.imageUri }}
                    style={styles.productImage}
                    resizeMode="contain"
                />

             
                <View style={styles.detailsGrid}>
                    {/* Row 1 */}
                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Color: </Text>
                        <Text style={[styles.detailValue, styles.highlightedValue]}>
                            {product.color}
                        </Text>
                    </View>
                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Size: </Text>
                        <Text style={styles.detailValue}>{product.size}</Text>
                    </View>

                    {/* Row 2 */}
                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Quantity: </Text>
                        <Text style={styles.detailValue}>{product.quantity}</Text>
                    </View>
                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Price: </Text>
                        <Text style={styles.detailValue}>{product.price}</Text>
                    </View>

                    {/* Row 3 - Deals/Discount */}
                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Deals: </Text>
                        {/* Discount Badge */}
                        <View style={styles.discountBadge}>
                            <Text style={styles.discountText}>{product.discount}</Text>
                        </View>
                    </View>
                </View>
            </View>

            {/* Action Buttons */}
            <View style={styles.buttonContainer}>
             
                <TouchableOpacity
                    style={[styles.actionButton, styles.editButton]}
                    onPress={handleEdit}>
               
                    <Image source={require('../../assets/images/ic_edit_button.png')}></Image>
                    <Text style={styles.buttonText}>Edit Item</Text>
                </TouchableOpacity>

                
                <TouchableOpacity
                    style={[styles.actionButton, styles.deleteButton]}
                    onPress={handleDelete}>
                
                <Image source={require('../../assets/images/ic_delete_icon.png')}></Image>
                    <Text style={styles.deleteButtonText}>Delete Item</Text>
                </TouchableOpacity>
            </View>
        </View>
    </View>
  );
};

// --- Styles ---

const styles = StyleSheet.create({
  // Style for the dummy screen background
  screenBackground: {
    flex: 1,
    backgroundColor: '#f0f0f0', // Light gray background to show the card elevation
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  cardContainer: {
   
    width: width * 0.9, 
    maxWidth: 400, 
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3, 
  },
  contentWrapper: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 15,
  },
  detailsGrid: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 5,
  },
  detailRow: {
    width: '50%', 
    flexDirection: 'row',
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 14,
    color: '#333',
    fontWeight: '400',
  },
  detailValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: 'bold',
  },
  highlightedValue: {
    color: 'red', 
  },
  discountBadge: {
    backgroundColor: '#ffedd5', 
    borderRadius: 8,
    paddingVertical: 3,
    paddingHorizontal: 8,
    alignSelf: 'flex-start', 
  },
  discountText: {
    color: '#d97706', 
    fontSize: 12,
    fontWeight: '600',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10, 
    paddingVertical: 12,
    marginHorizontal: 5,
  },
  editButton: {
    backgroundColor: '#f97316',
    marginRight: 5,
  },
  deleteButton: {
    backgroundColor: '#fff',
    marginLeft: 5,
    borderWidth: 1.5,
    borderColor: '#e5e5e5',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 5,
  },
  deleteButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 5,
  },
  buttonIcon: {
    fontSize: 18,
    color: 'white',
    marginRight: 5,
  },
  deleteButtonIcon: {
    fontSize: 18,
    color: '#333', 
    marginRight: 5,
  },
});

export default ProductCard;