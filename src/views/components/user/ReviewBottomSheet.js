import React, { useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  TextInput,
  Image,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const SCREEN_HEIGHT = Dimensions.get('window').height;

// ⭐ All COLORS in one place
const COLORS = {
  white: '#fff',
  orange: '#FF8C00',
  textDark: '#222222',
  lightGray: '#f5f5f5',
  blackText: '#222222',
};

const ReviewBottomSheet = ({ visible, onClose }) => {
  const slideAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const [rating, setRating] = React.useState(0);

  if (visible) {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  } else {
    Animated.timing(slideAnim, {
      toValue: SCREEN_HEIGHT,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }

  return (
    <Animated.View
      style={[
        styles.bottomSheet,
        { transform: [{ translateY: slideAnim }] },
      ]}
    >
      {/* CLOSE BUTTON */}
      <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
        <Text style={{ fontSize: 22 }}>×</Text>
      </TouchableOpacity>

      <Text style={styles.heading}>Quick Review</Text>

      {/* STAR ROW */}
            <View style={{ flexDirection: 'row', marginVertical: 10 , alignSelf: 'center'}}>
            {[1, 2, 3, 4, 5].map((item) => (
            <TouchableOpacity key={item} onPress={() => setRating(item)}>
            <Icon
                name={rating >= item ? 'star' : 'star-o'}
                size={32}
                color={rating >= item ? '#FFC107' : '#8A8A8A'}
                style={{ marginHorizontal: 6 }}
            />
            </TouchableOpacity>
        ))}
        </View>

      {/* Subtext */}
      <Text style={styles.subtext}>
        Please share your opinion about the product
      </Text>

      {/* Input */}
      <TextInput
        multiline
        placeholder="Your review"
        style={styles.textArea}
        placeholderTextColor="#777"
      />

      {/* Add Photo */}
      <TouchableOpacity style={styles.addPhotoBox}>
        <Image
          source={require('../../../assets/user/review_camera.png')}
          style={{ width: 55, height: 55 }}
        />
        <Text style={{ marginTop: 6, color: COLORS.blackText }}>
          Add your photos
        </Text>
      </TouchableOpacity>

      {/* Submit Button */}
      <TouchableOpacity style={styles.submitBtn}>
        <Text style={styles.submitText}>SEND REVIEW</Text>
      </TouchableOpacity>

    </Animated.View>
  );
};

export default ReviewBottomSheet;

const styles = StyleSheet.create({
  bottomSheet: {
    position: 'absolute',
    bottom: 0,
    height: '75%',
    width: '100%',
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 20,
    elevation: 15,
  },

  closeBtn: {
    alignSelf: 'flex-end',
    marginBottom: 5,
  },

  heading: {
    textAlign: 'center',
    fontSize: 18,
    color:COLORS.blackText,
    fontWeight: 'bold',
  },

  starRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 12,
  },

  star: {
    fontSize: 30,
    color: COLORS.orange,
    marginHorizontal: 5,
  },

  subtext: {
    textAlign: 'center',
    marginTop: 10,
    color: COLORS.textDark,
  },

  textArea: {
    height: 110,
    backgroundColor: COLORS.lightGray,
    borderRadius: 10,
    marginTop: 15,
    padding: 10,
    textAlignVertical: 'top',
  },

  addPhotoBox: {
    width: 110,
    height: 110,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 18,
  },

  submitBtn: {
    backgroundColor: COLORS.orange,
    paddingVertical: 14,
    borderRadius: 30,
    marginTop: 25,
  },

  submitText: {
    color: COLORS.white,
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
