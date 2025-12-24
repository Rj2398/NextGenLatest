import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Image,
  Modal,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import ExportReviewsModal from '../../components/ExportReviewsModal';
// --- Avatar Component ---
const AvatarImage = ({ source, style }) => (
  <View style={[styles.avatarPlaceholder, style]}>
    <Image
      source={{ uri: source || 'https://via.placeholder.com/50' }}
      style={styles.avatarImage}
      resizeMode="cover"
    />
  </View>
);



// --- Action Item Component ---


// --- ✅ Reply Modal Component (Moved Outside) ---
const ReplyModal = ({
  showReplyModal,
  replyText,
  setReplyText,
  handleCancelReply,
  handlePostReply,
  review,
}) => (
  <Modal
    animationType="slide"
    transparent={true}
    visible={showReplyModal}
    onRequestClose={handleCancelReply}
  >
    <View style={modalStyles.centeredView}>
      <View style={modalStyles.modalView}>
        <View style={modalStyles.modalHeader}>
          <View style={modalStyles.modalSeparator} />
        </View>

        <View style={modalStyles.modalContent}>
          <Text style={modalStyles.modalTitle}>Reply to Review</Text>
          <Text style={modalStyles.modalSubtitle}>
            Respond to {review.author}'s review
          </Text>

          {/* Review quote */}
          <View style={modalStyles.reviewQuoteContainer}>
            <View style={styles.ratingRow}>
              {Array.from({ length: 5 }).map((_, index) => (
                <Image
                  key={index}
                  source={
                    index < review.rating
                      ? require('../../../assets/images/ic_filled_icon.png')
                      : require('../../../assets/images/ic_empty_icon.png')
                  }
                  style={{ width: 20, height: 20 }}
                  resizeMode="contain"
                />
              ))}
              <Text style={modalStyles.reviewAuthor}>• {review.author}</Text>
            </View>
            <Text style={modalStyles.reviewHeadline}>
              "{review.headline}"
            </Text>
          </View>

          {/* Input */}
          <TextInput
            style={modalStyles.replyInput}
            placeholder="Write your reply..."
            multiline={true}
            numberOfLines={4}
            value={replyText}
            onChangeText={setReplyText}
            maxLength={1000}
          />

          <View style={modalStyles.inputFooter}>
            <TouchableOpacity style={modalStyles.addImageButton}>
              <Image
                source={require('../../../assets/images/ic_dummy_upload.png')}
                style={modalStyles.imageIcon}
              />
              <Text style={modalStyles.addImageText}>Add image (optional)</Text>
            </TouchableOpacity>
            <Text style={modalStyles.charCount}>{replyText.length}/1000</Text>
          </View>

          <View style={modalStyles.guidelinesContainer}>
            <Text style={modalStyles.guidelinesTitle}>Reply Guidelines</Text>
            <Text style={modalStyles.guidelineText}>
              • Thank the reviewer for their feedback
            </Text>
            <Text style={modalStyles.guidelineText}>
              • Address specific points mentioned
            </Text>
            <Text style={modalStyles.guidelineText}>
              • Keep responses professional and helpful
            </Text>
          </View>
        </View>

        {/* Buttons */}
        <View style={modalStyles.modalActions}>
          <TouchableOpacity
            style={modalStyles.cancelButton}
            onPress={handleCancelReply}
          >
            <Text style={modalStyles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={modalStyles.postButton}
            onPress={handlePostReply}
          >
            <Text style={modalStyles.postButtonText}>Post Reply</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </Modal>
);

// --- Main Screen ---
export default function ReviewDetailScreen() {
  const [isSuccessVisible, setIsSuccessVisible] = useState(false);
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [replyText, setReplyText] = useState('');
 
const [modalVisible, setModalVisible] = useState(false);
  const ActionListItem = ({ iconName, text, status }) => {
  let Symbol;
  let iconSize = 20;

  if (iconName === 'share-2')
    Symbol = (
      <Image
        source={require('../../../assets/images/ic_share_review.png')}
        style={{ width: iconSize, height: iconSize, tintColor: '#555' }}
        resizeMode="contain"
      />
    );
  else if (iconName === 'download')
    Symbol = (
      <Image
        source={require('../../../assets/images/ic_download_icon_new.png')}
        style={{ width: iconSize, height: iconSize, tintColor: '#555' }}
        resizeMode="contain"
      />
    );
  else if (iconName === 'flag')
    Symbol = (
      <Image
        source={require('../../../assets/images/ic_flag_icon_green.png')}
        style={{ width: iconSize, height: iconSize }}
        resizeMode="contain"
      />
    );
  else Symbol = <Text style={{ fontSize: iconSize, color: '#555' }}>•</Text>;

  return (
    <TouchableOpacity style={styles.actionItem} onPress={() => setModalVisible(true)}>
      <View style={styles.actionLeft}>
        {Symbol}
        <Text style={styles.actionText}>{text}</Text>
      </View>
      <View style={styles.actionRight}>
        {status && <Text style={styles.statusText}>{status}</Text>}
        <Text style={styles.chevronIcon}>&gt;</Text>
      </View>
     
   
    </TouchableOpacity>
  );
};


  const navigation = useNavigation();

  const review = {
    id: '#REV-2024-001247',
    author: 'Sarah M.',
    authorAvatar: 'https://i.imgur.com/uT0m6Y2.png',
    rating: 5.0,
    date: 'Dec 15, 2024',
    purchaseDate: 'Dec 10, 2024',
    isVerified: true,
    headline: 'Excellent course content and delivery',
    description: [
      'The instructor explained complex concepts clearly...',
      'The hands-on projects were particularly valuable...',
    ],
    course: 'Advanced React Development',
    helpfulCount: 24,
    status: 'Active',
    images: ['https://via.placeholder.com/180x120'],
  };

  const handleBack = () => {
    if (navigation.canGoBack()) navigation.goBack();
  };

  const handleReply = () => setShowReplyModal(true);
  const handleCancelReply = () => {
    setShowReplyModal(false);
    setReplyText('');
  };
  const handlePostReply = () => {
    setShowReplyModal(false);
    setReplyText('');
    setIsSuccessVisible(true);
    setTimeout(() => setIsSuccessVisible(false), 3000);
  };

  const renderStars = (rating) =>
    Array.from({ length: 5 }).map((_, i) => (
      <Image
        key={i}
        source={
          i < rating
            ? require('../../../assets/images/ic_filled_icon.png')
            : require('../../../assets/images/ic_empty_icon.png')
        }
        style={{ width: 20, height: 20 }}
        resizeMode="contain"
      />
    ));

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Image
            source={require('../../../assets/images/img_back_icon.png')}
            style={{ width: 25, height: 20 }}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Review Details</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          {isSuccessVisible && (
            <View style={styles.successBanner}>
              <Text style={styles.successIcon}>✓</Text>
              <Text style={styles.successText}>Reply posted successfully!</Text>
            </View>
          )}

          <View style={styles.reviewerSection}>
            <View style={styles.reviewerHeader}>
              <View style={styles.reviewerInfo}>
                <AvatarImage source={review.authorAvatar} style={styles.avatar} />
                <View style={styles.reviewerDetails}>
                  <Text style={styles.reviewerName}>{review.author}</Text>
                  <View style={styles.ratingRow}>
                    <View style={styles.starsContainer}>
                      {renderStars(review.rating)}
                    </View>
                    <Text style={styles.ratingValue}>{review.rating}</Text>
                  </View>
                </View>
              </View>
              <View style={styles.badgeDateContainer}>
                {review.isVerified && (
                  <View style={styles.verifiedBadge}>
                    <Text style={styles.verifiedText}>Verified Purchase</Text>
                  </View>
                )}
                <Text style={styles.dateText}>{review.date}</Text>
              </View>
            </View>
          </View>

          <View style={styles.reviewContent}>
            <Text style={styles.headline}>{review.headline}</Text>
            {review.description.map((p, i) => (
              <Text key={i} style={styles.paragraph}>
                {p}
              </Text>
            ))}
          </View>

          <ScrollView horizontal contentContainerStyle={styles.imagesScroll}>
            {review.images.map((_, i) => (
              <Image
                key={i}
                source={require('../../../assets/images/ic_maggi.png')}
                style={styles.reviewImage}
              />
            ))}
          </ScrollView>

          <View style={styles.courseDetails}>
            <View>
              <Text style={styles.courseLabel}>Course</Text>
              <Text style={styles.courseName}>{review.course}</Text>
            </View>
            <View style={styles.purchaseInfo}>
              <Text style={styles.purchaseLabel}>Purchased on</Text>
              <Text style={styles.purchaseDate}>{review.purchaseDate}</Text>
            </View>
          </View>

          <View style={styles.helpfulRow}>
            <View style={styles.helpfulCount}>
              {/* <Image
                source={require('../../../assets/images/ic_thumbs_up_blue.png')}
                style={{ width: 10, height: 10, marginRight: 5 }}
              /> */}
              <Text style={styles.helpfulText}>
                {review.helpfulCount} people found this helpful
              </Text>
            </View>
            <Text style={styles.reviewId}>ID: {review.id}</Text>
          </View>

          <TouchableOpacity style={styles.replyButton} onPress={handleReply}>
            {/* <Image
              source={require('../../../assets/ic_reply_back.png')}
              style={{ width: 15, height: 15, marginRight: 10 }}
            /> */}
            <Text style={styles.replyButtonText}>Reply to Review</Text>
          </TouchableOpacity>

          <View style={styles.actionsContainer}>
            <Text style={styles.actionsTitle}>Actions</Text>
            <ActionListItem iconName="share-2" text="Share Review" />
           
            <ActionListItem iconName="download" text="Export as PDF"  />
         
            <ActionListItem
              iconName="flag"
              text="Review Status"
              status={review.status}
            />
          </View>
        </View>
        <View style={{ height: 40 }} />
      </ScrollView>

      {/* ✅ Fixed Modal */}
      <ReplyModal
        showReplyModal={showReplyModal}
        replyText={replyText}
        setReplyText={setReplyText}
        handleCancelReply={handleCancelReply}
        handlePostReply={handlePostReply}
        review={review}
      />

 <ExportReviewsModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />

    </SafeAreaView>
  );
}
// --- Stylesheet ---
const styles = StyleSheet.create({
    // (Your existing styles for the main screen)
    container: {
        flex: 1,
        backgroundColor: '#f7f7f7',
    },
    scrollView: {
        flex: 1,
    },
    content: {
        paddingHorizontal: 20,
    },

    // --- Header ---
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 10,
        paddingHorizontal: 10,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    backButton: {
        padding: 5,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    headerSpacer: {
        width: 34, 
    },

    // --- Success Banner ---
    successBanner: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#43A3A3', 
        borderRadius: 8,
        padding: 12,
        marginBottom: 10,
        marginHorizontal: -20, 
    },
    successIcon: { 
        color: 'white',
        fontSize: 18,
        marginRight: 8,
        fontWeight: 'bold',
    },
    successText: {
        color: 'white',
        fontWeight: '600',
    },

    // --- Reviewer Section ---
    reviewerSection: {
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    reviewerHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    reviewerInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatarPlaceholder: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#f0f0f0', 
        overflow: 'hidden',
    },
    avatarImage: {
        width: '100%',
        height: '100%',
    },
    reviewerDetails: {
        marginLeft: 10,
    },
    reviewerName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    ratingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 2,
    },
    starsContainer: {
        flexDirection: 'row',
    },
    ratingValue: {
        fontSize: 14,
        fontWeight: '600',
        marginLeft: 4,
        color: '#333',
    },
    badgeDateContainer: {
        alignItems: 'flex-end',
    },
    verifiedBadge: {
        backgroundColor: '#43A3A3', 
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 15,
        marginBottom: 4,
    },
    verifiedText: {
        color: 'white',
        fontSize: 11,
        fontWeight: 'bold',
    },
    dateText: {
        fontSize: 12,
        color: '#777',
    },

    // --- Review Content ---
    reviewContent: {
        paddingVertical: 15,
    },
    headline: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
        color: '#333',
    },
    paragraph: {
        fontSize: 15,
        lineHeight: 24,
        marginBottom: 15,
        color: '#555',
        textAlign: 'justify',
    },

    // --- Review Images ---
    imagesScroll: {
        paddingVertical: 5,
        marginBottom: 20,
    },
    reviewImage: {
        width: 180,
        height: 120,
        borderRadius: 8,
        marginRight: 10,
        backgroundColor: '#eee',
    },
    
    // --- Course Details ---
    courseDetails: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        borderTopWidth: 1,
        borderTopColor: '#eee',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        paddingVertical: 15,
        marginBottom: 20,
    },
    courseLabel: {
        fontSize: 12,
        color: '#888',
        textTransform: 'uppercase',
    },
    courseName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#E36414', 
        marginTop: 2,
    },
    purchaseInfo: {
        alignItems: 'flex-end',
    },
    purchaseLabel: {
        fontSize: 12,
        color: '#888',
        textAlign: 'right',
    },
    purchaseDate: {
        fontSize: 14,
        color: '#555',
        marginTop: 2,
    },
    
    // --- Helpful Count & ID ---
    helpfulRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    helpfulCount: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    helpfulText: {
        fontSize: 14,
        color: '#777',
    },
    reviewId: {
        fontSize: 12,
        color: '#aaa',
    },

    // --- Reply Button ---
    replyButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FF7F27', 
        padding: 15,
        borderRadius: 8,
        marginBottom: 30,
        shadowColor: '#FF7F27',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
    },
    replyButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },

    // --- Actions List ---
    actionsContainer: {
        marginBottom: 20,
    },
    actionsTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    actionItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    actionLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    actionText: {
        fontSize: 16,
        marginLeft: 15,
        color: '#333',
    },
    actionRight: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    statusText: {
        fontSize: 16,
        color: '#38b000', 
        marginRight: 10,
    },
    chevronIcon: { 
        marginLeft: 5,
        fontSize: 18,
        color: '#ccc',
    },
});

// --- MODAL STYLES (New Section) ---
const modalStyles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'flex-end', // Stick to the bottom like a bottom sheet
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark overlay background
    },
    modalView: {
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingHorizontal: 0,
        paddingBottom: 20,
        width: '100%',
        maxHeight: '90%', // Ensures it doesn't cover the whole screen
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: -2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalHeader: {
        width: '100%',
        paddingTop: 15,
        paddingHorizontal: 20,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    modalSeparator: {
        width: 40,
        height: 5,
        backgroundColor: '#ccc',
        borderRadius: 2.5,
        marginBottom: 15,
    },
    modalContent: {
        width: '100%',
        paddingHorizontal: 20,
    },
    modalSubtitle: {
        fontSize: 14,
        color: '#777',
        marginBottom: 15,
    },
    reviewQuoteContainer: {
        backgroundColor: '#f9f9f9',
        padding: 15,
        borderRadius: 8,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#eee',
    },
    reviewAuthor: {
        fontSize: 14,
        color: '#777',
        marginLeft: 8,
        fontWeight: '600',
    },
    reviewHeadline: {
        fontSize: 16,
        fontWeight: '600',
        marginTop: 5,
        color: '#333',
    },
    replyInput: {
        height: 100,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        padding: 10,
        fontSize: 15,
        textAlignVertical: 'top',
        color: '#333',
    },
    inputFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 15,
    },
    addImageButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    imageIcon: {
        width: 18,
        height: 18,
        marginRight: 5,
        
    },
    addImageText: {
        color: '#5A5A5A',
        fontSize: 14,
        fontWeight: '600',
    },
    charCount: {
        fontSize: 12,
        color: '#aaa',
    },
    guidelinesContainer: {
        padding: 15,
        backgroundColor: '#e6f7ff',
        borderRadius: 8,
        marginBottom: 20,
    },
    guidelinesTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#1E40AF',
        marginBottom: 5,
    },
    guidelineText: {
        fontSize: 13,
        color: '#1D4ED8',
        lineHeight: 20,
        marginLeft: 5,
    },
    modalActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 20,
    },
    cancelButton: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        padding: 15,
        borderRadius: 8,
        marginRight: 10,
        alignItems: 'center',
    },
    cancelButtonText: {
        color: '#555',
        fontSize: 16,
        fontWeight: 'bold',
    },
    postButton: {
        flex: 1,
        backgroundColor: '#FF7F27',
        padding: 15,
        borderRadius: 8,
        marginLeft: 10,
        alignItems: 'center',
    },
    postButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    postButtonDisabled: {
        backgroundColor: '#FF7F2750', // Lighter orange when disabled
    }
});