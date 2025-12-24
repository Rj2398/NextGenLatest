import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import UserHeader from '../../components/user/UserHeader';
import {useNavigation} from '@react-navigation/native';

const StarRating = ({rating, onRate}) => (
  <View style={starStyles.container}>
    {[1, 2, 3, 4, 5].map(star => (
      <TouchableOpacity key={star} onPress={() => onRate(star)}>
        <Image
          source={
            star <= rating
              ? require('../../../assets/images/ic_filled_icon.png')
              : require('../../../assets/images/ic_empty_star.png')
          }
          style={starStyles.star}
        />
      </TouchableOpacity>
    ))}
  </View>
);

const ImageUploadBox = () => (
  <TouchableOpacity style={uploadStyles.container}>
    <Image
      source={require('../../../assets/images/camera.png')}
      style={uploadStyles.cameraIcon}
    />
    <Text style={uploadStyles.text}>Tap to upload photos</Text>
    <Text style={uploadStyles.details}>JPG/PNG · Max 5MB · Up to 3 photos</Text>
  </TouchableOpacity>
);

const UsersWriteReviewScreen = () => {
  const navigation = useNavigation();
  const [rating, setRating] = useState(0);
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewText, setReviewText] = useState('');

  const handleSubmit = () => {
    console.log({rating, reviewTitle, reviewText});
  };

  const handleCancel = () => {
    console.log('Review cancelled');
  };

  return (
    <SafeAreaView style={styles.fullScreen}>
      {/* Header */}
      {/* <View style={styles.header}>
        <TouchableOpacity>
          <Image
            source={require('../../../assets/images/ic_back_btn.png')}
            style={styles.backIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Write a Review</Text>
        <View style={{width: 24}} /> 
      </View> */}

      <UserHeader
        title={'Write a Review'}
        onBackPress={() => navigation.goBack()}
      />

      <ScrollView contentContainerStyle={styles.container}>
        {/* Product Card */}
        <View style={styles.productCard}>
          <Image
            source={require('../../../assets/images/ic_maggi.png')}
            style={styles.productImage}
          />
          <View style={styles.productDetails}>
            <Text style={styles.productTitle}>
              Wireless Bluetooth Headphones
            </Text>
            <Text style={styles.productSubtitle}>White • Quantity: 1</Text>
            <Text style={styles.productSubtitle}>Order #SND7862</Text>
            <Text style={styles.productSubtitle}>
              Delivered on May 12, 2025
            </Text>
          </View>
        </View>

        {/* Rate Experience */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Rate your experience</Text>
          <StarRating rating={rating} onRate={setRating} />
        </View>

        {/* Review Title */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Review Title (optional)</Text>
          <TextInput
            style={styles.titleInput}
            placeholder="Give your review a title"
            value={reviewTitle}
            onChangeText={setReviewTitle}
          />
        </View>

        {/* Review Text */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Review *</Text>
          <TextInput
            style={styles.reviewInput}
            placeholder="Tell us what you liked or disliked..."
            value={reviewText}
            onChangeText={setReviewText}
            multiline
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Upload Photos (optional)</Text>
          <ImageUploadBox />
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.submitButton,
            rating === 0 || reviewText.length === 0
              ? styles.disabledButton
              : {},
          ]}
          onPress={handleSubmit}
          disabled={rating === 0 || reviewText.length === 0}>
          <Text style={styles.submitButtonText}>Submit Review</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

// --- Styles ---
const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
  container: {
    padding: 15,
    paddingBottom: 100,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  backIcon: {
    width: 20,
    height: 18,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  productCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 15,
    backgroundColor: '#EEE',
  },
  productDetails: {
    flex: 1,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  productSubtitle: {
    fontSize: 12,
    color: '#757575',
  },
  section: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    gap: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },
  titleInput: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  reviewInput: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    height: 120,
    textAlignVertical: 'top',
  },
  footer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    padding: 15,
    justifyContent: 'space-between',
  },
  cancelButton: {
    flex: 1,
    marginRight: 10,
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#333',
    fontWeight: 'bold',
    fontSize: 16,
  },
  submitButton: {
    flex: 1,
    marginLeft: 10,
    padding: 15,
    backgroundColor: '#F97316',
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  disabledButton: {
    backgroundColor: '#FF7A00',
  },
});

const starStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 12,
    paddingVertical: 5,
  },
  star: {
    width: 23,
    height: 23,
  },
});

const uploadStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#E0E0E0',
    borderStyle: 'dashed',
    borderRadius: 8,
    paddingVertical: 20,
  },
  cameraIcon: {
    width: 30,
    height: 30,
  },
  text: {
    fontSize: 14,
    fontWeight: '600',
    color: '#757575',
    marginTop: 5,
  },
  details: {
    fontSize: 12,
    color: '#A0A0A0',
    marginTop: 2,
  },
});

export default UsersWriteReviewScreen;
