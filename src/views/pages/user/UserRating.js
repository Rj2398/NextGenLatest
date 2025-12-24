import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    TouchableOpacity,
    Dimensions // Import Dimensions for dynamic width
} from 'react-native';
// Assuming UserHeader is in '../../components/user/UserHeader' as per your previous code
import UserHeader from '../../components/user/UserHeader';
import ReviewBottomSheet from '../../components/user/ReviewBottomSheet';

const ORANGE = '#FF8C00';
const GRAY_TEXT = '#666';
const LIGHT_GRAY = '#f5f5f5';
const SOFT_WHITE = '#fff';

// Get screen width for responsive review bar
const screenWidth = Dimensions.get('window').width;

// --- MAIN DATA ---
const RATING_DATA = {
    average: 4.3,
    count: 23,
    starDistribution: { // Added for the star bar visualization
        5: 12,
        4: 5,
        3: 4,
        2: 2,
        1: 0,
    },
    reviews: [
        {
            id: 1,
            user: 'Helene Moore',
            date: 'June 5, 2019',
            rating: 5,
            comment: "The dress is great! Very classy and comfortable. It fit perfectly! I'm 5'7\" and 130 pounds. I am a 34B chest. This dress would be too long for those who are shorter but could be hemmed. I wouldn't recommend it for those big chested as I am smaller chested and it fit me perfectly. The underarms were not too wide and the dress was made well.",
            helpful: 24,
            avatar: 'https://via.placeholder.com/40/FF007F/FFFFFF?text=HM', // Example avatar
            photos: []
        },
        {
            id: 2,
            user: 'Kate Doe',
            date: 'June 5, 2019',
            rating: 4,
            comment: "The dress is great! Very classy and comfortable. It fit perfectly! I'm 5'7\" and 130 pounds. I am a 34B chest. This dress would be too long for those who are shorter but could be hemmed. I wouldn't recommend it for those big chested as I am smaller chested and it fit me perfectly. The underarms were not too wide and the dress was made well.",
            helpful: 12,
            avatar: 'https://via.placeholder.com/40/007FFF/FFFFFF?text=KD', // Example avatar
            photos: ['https://via.placeholder.com/40/007FFF/FFFFFF?text=KD']
        },
        // Add more reviews if needed to mimic the scroll
        {
            id: 3,
            user: 'John Smith',
            date: 'June 4, 2019',
            rating: 5,
            comment: "Excellent quality and very stylish. Highly recommend!",
            helpful: 10,
            avatar: 'https://via.placeholder.com/40/00FF7F/FFFFFF?text=JS',
            photos: []
        },
    ]
};

// --- Star Rating Bar Component ---
const StarRatingBar = ({ stars, count, totalReviews }) => {
    const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
    return (
        <View style={styles.starBarContainer}>
            <Text style={styles.starBarStars}>{stars}</Text>
            <View style={styles.progressBarBackground}>
                <View style={[styles.progressBarFill, { width: `${percentage}%` }]} />
            </View>
            <Text style={styles.starBarCount}>{count}</Text>
        </View>
    );
};

// --- Review Card Component ---
const ReviewCard = ({ review }) => (
    <View style={styles.reviewCard}>
        <View style={styles.reviewHeader}>
            <Image source={{ uri: review.avatar }} style={styles.reviewAvatar} />
            <View style={{ flex: 1 }}>
                <Text style={styles.reviewUserName}>{review.user}</Text>
                <Text style={styles.reviewStars}>{'⭐'.repeat(review.rating)}</Text>
                {/* Original UI has date next to stars, adjusting for that */}
            </View>
            <Text style={styles.reviewDate}>{review.date}</Text>
        </View>

        <Text style={styles.reviewComment}>{review.comment}</Text>

        {review.photos.length > 0 && (
            <ScrollView horizontal style={{ marginTop: 10 }}>
                {review.photos.map((img, i) => (
                    // <Image key={i} source={{ uri: img }} style={styles.reviewPhoto} />
                    <Image source={require('../../../assets/user/ok_icon.png')}style={styles.reviewPhoto} />
                ))}
            </ScrollView>
        )}

        <View style={styles.helpfulContainer}>
            <Text style={styles.helpfulText}>Helpful ({review.helpful})</Text>
            <Image source={require('../../../assets/user/ok_icon.png')} style={styles.thumbUpIcon} />
            {/* If you don't have a local icon, you can use a text emoji like this: */}
            {/* <Text style={{ fontSize: 18 }}>👍</Text> */}
        </View>
    </View>
);

// --- MAIN SCREEN ---
const UserRating = ({ navigation }) => {
    const [withPhoto, setWithPhoto] = useState(false);

    const [reviewSheetVisible, setReviewSheetVisible] = useState(false);

    // Calculate total number of reviews for percentage in star bars
    const totalReviewsForBars = Object.values(RATING_DATA.starDistribution).reduce((sum, count) => sum + count, 0);

    return (
        <View style={styles.viewcontainer}>

            {/* Calling the imported Header component */}
            <UserHeader
                title="Rating and reviews"
                onBackPress={() => navigation.goBack()}
            />
            <ScrollView style={styles.container}>
  {/* RATING SUMMARY */}
  <View style={styles.overallRatingSection}>
                <View style={styles.averageRatingContainer}>
                    <Text style={styles.averageRating}>{RATING_DATA.average}</Text>
                    <Text style={styles.ratingCount}>{RATING_DATA.count} ratings</Text>
                </View>
                <View style={styles.starDistributionContainer}>
                    {[5, 4, 3, 2, 1].map((stars) => (
                        <StarRatingBar
                            key={stars}
                            stars={stars}
                            count={RATING_DATA.starDistribution[stars]}
                            totalReviews={totalReviewsForBars}
                        />
                    ))}
                </View>
            </View>

            {/* CHECKBOX SECTION */}
            <View style={styles.reviewSummary}>
                <Text style={styles.reviewCountText}>{RATING_DATA.reviews.length} reviews</Text>
                <TouchableOpacity
                    style={styles.checkboxContainer}
                    onPress={() => setWithPhoto(!withPhoto)}
                >
                    <View style={[styles.checkbox, withPhoto && styles.checkboxChecked]} />
                    <Text style={{ marginLeft: 6, fontSize: 14 }}>With photo</Text>
                </TouchableOpacity>
            </View>

            {/* REVIEWS LIST */}
            {RATING_DATA.reviews.map((review) => (
                // Only show reviews with photos if the filter is active and the review has photos
                // Or show all reviews if the filter is not active
                (!withPhoto || (withPhoto && review.photos.length > 0)) &&
                <ReviewCard key={review.id} review={review} />
            ))}

            {/* WRITE REVIEW BUTTON */}
            <TouchableOpacity style={styles.writeReviewButton}
              onPress={() => setReviewSheetVisible(true)}>
                {/* You might want an icon here for the pencil */}
                <Image source={require('../../../assets/user/pencil.png')} style={styles.pencilIcon} />
                <Text style={styles.writeReviewText}>Write a Review</Text>
            </TouchableOpacity>

            <View style={{ height: 60 }} />
            </ScrollView>
         {/* ⭐ ADDED: bottom sheet component */}
            <ReviewBottomSheet
                visible={reviewSheetVisible}
                onClose={() => setReviewSheetVisible(false)}
            />
          
        </View>
    );
};

export default UserRating;

const styles = StyleSheet.create({
    viewcontainer: {
        flex: 1,
        backgroundColor: '#FBF8F7'
    },
    container: {
        flex: 1,
        paddingHorizontal: 15, // Use horizontal padding for the screen
        backgroundColor: '#FBF8F7'
    },

    // Overall Rating Section
    overallRatingSection: {
        flexDirection: 'row',
        marginVertical: 20,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    averageRatingContainer: {
        alignItems: 'center',
    },
    averageRating: {
        fontSize: 50,
        fontWeight: 'bold',
        color: '#000',
    },
    ratingCount: {
        color: GRAY_TEXT,
        fontSize: 14,
    },

    // Star Distribution Bars
    starDistributionContainer: {
        flex: 1, // Take remaining space
        marginLeft: 20,
    },
    starBarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    starBarStars: {
        width: 20, // Adjust width as needed
        fontSize: 12,
        color: GRAY_TEXT,
        marginRight: 5,
        textAlign: 'right',
    },
    progressBarBackground: {
        height: 6,
        backgroundColor: LIGHT_GRAY,
        borderRadius: 3,
        flex: 1, // Allow progress bar to fill available space
        marginRight: 5,
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: ORANGE,
        borderRadius: 3,
    },
    starBarCount: {
        fontSize: 12,
        color: GRAY_TEXT,
        width: 20, // Adjust width as needed
    },

    // Review Summary & Checkbox
    reviewSummary: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderColor: LIGHT_GRAY,
        alignItems: 'center',
        marginBottom: 10,
    },
    reviewCountText: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#000',
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkbox: {
        width: 18,
        height: 18,
        borderWidth: 1.5,
        borderColor: GRAY_TEXT,
        borderRadius: 3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkboxChecked: {
        backgroundColor: ORANGE,
        borderColor: ORANGE,
    },

    // Review Card
    reviewCard: {
        backgroundColor: SOFT_WHITE,
        padding: 15,
        borderRadius: 10,
        marginTop: 15,
        // Shadow for iOS
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        // Elevation for Android
        elevation: 3,
    },
    reviewHeader: {
        flexDirection: 'row',
        marginBottom: 10,
        alignItems: 'center',
    },
    reviewAvatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
        backgroundColor: LIGHT_GRAY, // Placeholder background
    },
    reviewUserName: {
        fontWeight: 'bold',
        fontSize: 15,
        color: '#000',
    },
    reviewDate: {
        fontSize: 12,
        color: GRAY_TEXT,
        marginLeft: 10, // Space between stars and date
    },
    reviewStars: {
        color: ORANGE,
        fontSize: 12, // Smaller stars next to user name
        marginTop: 2,
    },
    reviewComment: {
        fontSize: 14,
        marginBottom: 10,
        lineHeight: 20,
        color: '#333',
    },
    reviewPhoto: {
        width: 90,
        height: 90,
        marginRight: 10,
        borderRadius: 10,
        resizeMode: 'cover',
        backgroundColor: LIGHT_GRAY,
    },
    helpfulContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginTop: 10,
    },
    helpfulText: {
        color: GRAY_TEXT,
        marginRight: 6,
        fontSize: 13,
    },
    thumbUpIcon: {
        width: 18,
        height: 18,
        tintColor: GRAY_TEXT, // If your icon is a template, you can tint it
    },

    // Write Review Button
    writeReviewButton: {
        backgroundColor: ORANGE,
        flexDirection: 'row', // Align icon and text
        padding: 15,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center', // Center content horizontally
        marginTop: 20,
        marginBottom: 20, // Added some bottom margin
        width: '50%',
        // Shadow for iOS
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        // Elevation for Android
        elevation: 5,
        alignSelf: 'flex-end',
    },
    writeReviewText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
        marginLeft: 8, // Space between icon and text
    },
    pencilIcon: {
        width: 20,
        height: 20,
        tintColor: '#fff',
    },
});