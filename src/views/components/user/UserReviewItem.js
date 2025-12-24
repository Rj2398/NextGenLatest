// ReviewItem.js
import React from 'react';
import {View, Text, Image, StyleSheet, Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // You'll need this library

// Helper function to render star rating
const renderStars = rating => {
  const fullStars = Math.floor(rating);
  const stars = [];
  for (let i = 0; i < 5; i++) {
    stars.push(
      <Icon
        key={i}
        name={i < fullStars ? 'star' : 'star-outline'}
        size={16}
        color="#FFA500" // Orange color for stars
        style={{marginRight: 2}}
      />,
    );
  }
  return <View style={styles.starContainer}>{stars}</View>;
};

const UserReviewItem = ({review}) => {
  return (
    <View style={styles.reviewContainer}>
      {/* Header: Avatar, Name, Date, Rating */}
      <View style={styles.header}>
        <Image source={review.avatar} style={styles.avatar} />
        <View style={styles.headerText}>
          <Text style={styles.name}>{review.name}</Text>
          {renderStars(review.rating)}
        </View>
        <Text style={styles.date}>{review.date}</Text>
      </View>

      {/* Review Content */}
      <Text style={styles.bodyText}>{review.content}</Text>

      {/* Images (Horizontal scroll is optional, but using a row for up to 3) */}
      <View style={styles.imageRow}>
        {review.photos.slice(0, 3).map((photo, index) => (
          <Image key={index} source={photo} style={styles.reviewImage} />
        ))}
      </View>

      {/* Footer: Helpful and Thumb Icon */}
      <View style={styles.footer}>
        <Text style={styles.helpfulText}>Helpful</Text>
        <Pressable>
          <Icon name="thumb-up-outline" size={20} color="#999" />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  reviewContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  headerText: {
    flex: 1,
  },
  name: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
  },
  date: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
  starContainer: {
    flexDirection: 'row',
  },
  bodyText: {
    fontSize: 15,
    color: '#333',
    lineHeight: 22,
    marginBottom: 10,
  },
  imageRow: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  reviewImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 8,
    resizeMode: 'cover',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  helpfulText: {
    fontSize: 14,
    color: '#999',
    marginRight: 5,
  },
});

export default UserReviewItem;
