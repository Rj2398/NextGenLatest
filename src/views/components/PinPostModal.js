import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Image,
} from 'react-native';
import React from 'react';

// --- Icon Imports ---
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

// --- Color Palette and Constants ---
const PRIMARY_ORANGE = '#F97316';
const DARK_GRAY_TEXT = '#1F2937';
const MEDIUM_GRAY_TEXT = '#4B5563';
const LIGHT_GRAY_TEXT = '#6B7280';
const BORDER_COLOR = '#D1D5DB';
const WHITE = '#FFFFFF';
const LIGHT_BG = '#F9FAFB';
const ORANGE_LIGHT_BG = '#FFF7ED'; // Light orange for alert box
const ORANGE_ICON_BG = '#FDE68A'; // Placeholder for pin duration icon

const {height, width} = Dimensions.get('window');

// --- Static Data for Demonstration ---
const staticPostData = {
  title: 'Science Fair 2024 - Registration Now Open!',
  author: 'Science Department',
  time: '5h',
  avatarUri: 'https://randomuser.me/api/portraits/women/1.jpg',
};
const staticInstituteData = {
  name: 'NextGen Academy',
  campus: 'Main Campus',
};

// --------------------------------------------------------------------------------
// 1. Main Modal Component
// --------------------------------------------------------------------------------

const PinPostModal = ({isVisible, onClose}) => {
  const handlePinPost = () => {
    // Logic to pin the post would go here
    console.log('Post Pinned!');
    onClose(); // Close modal after action
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}>
      <View style={modalStyles.overlay}>
        {/* This View is the modal content sheet */}
        <View style={modalStyles.container}>
          {/* Header */}
          <View style={modalStyles.header}>
            <Text style={modalStyles.title}>Pin to Institute Bulletins</Text>
            <TouchableOpacity onPress={onClose} style={modalStyles.closeButton}>
              <MaterialCommunityIcons
                name="close"
                size={24}
                color={MEDIUM_GRAY_TEXT}
              />
            </TouchableOpacity>
          </View>

          <ScrollView contentContainerStyle={modalStyles.scrollViewContent}>
            {/* Post Info Section */}
            <View style={modalStyles.postInfo}>
              <Image
                source={{uri: staticPostData.avatarUri}}
                style={modalStyles.avatar}
              />
              <View style={modalStyles.postDetails}>
                <Text style={modalStyles.postTitle} numberOfLines={1}>
                  {staticPostData.title}
                </Text>
                <Text style={modalStyles.postMeta}>
                  {staticPostData.author} • {staticPostData.time}
                </Text>
              </View>
            </View>

            {/* Institute Selector */}
            <Text style={modalStyles.sectionTitle}>Institute</Text>
            <TouchableOpacity style={modalStyles.selectorBox}>
              <View style={modalStyles.selectorIconBg}>
                <MaterialCommunityIcons
                  name="school"
                  size={24}
                  color={PRIMARY_ORANGE}
                />
              </View>
              <View style={modalStyles.selectorDetails}>
                <Text style={modalStyles.selectorTitle}>
                  {staticInstituteData.name}
                </Text>
                <Text style={modalStyles.selectorSubtitle}>
                  {staticInstituteData.campus}
                </Text>
              </View>
              <MaterialCommunityIcons
                name="chevron-down"
                size={24}
                color={MEDIUM_GRAY_TEXT}
              />
            </TouchableOpacity>
            <Text style={modalStyles.helperText}>
              This post will appear in the institute's main bulletin board
            </Text>

            {/* Pin Duration */}
            <Text style={modalStyles.sectionTitle}>Pin Duration</Text>
            <View style={[modalStyles.selectorBox, modalStyles.durationBox]}>
              <View style={modalStyles.durationIconBg}>
                {/* Using 'pin' as a placeholder for the icon in the image */}
                <MaterialCommunityIcons
                  name="pin"
                  size={20}
                  color={PRIMARY_ORANGE}
                />
              </View>
              <View style={modalStyles.selectorDetails}>
                <Text style={modalStyles.selectorTitle}>Until I unpin</Text>
                <Text style={modalStyles.selectorSubtitle}>
                  Post will remain pinned until manually removed
                </Text>
              </View>
            </View>

            {/* About Pinned Posts */}
            <View style={modalStyles.alertBox}>
              <MaterialCommunityIcons
                name="information"
                size={24}
                color={PRIMARY_ORANGE}
                style={{marginRight: 10}}
              />
              <View style={modalStyles.alertDetails}>
                <Text style={modalStyles.alertTitle}>About Pinned Posts</Text>
                <Text style={modalStyles.alertBody}>
                  Pinned posts appear at the top of institute bulletins and are
                  highlighted with a pin icon. They receive priority visibility
                  for all users.
                </Text>
              </View>
            </View>
          </ScrollView>

          {/* Footer */}
          <View style={modalStyles.footer}>
            <TouchableOpacity
              style={modalStyles.cancelButton}
              onPress={onClose}>
              <Text style={modalStyles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={modalStyles.pinButton}
              onPress={handlePinPost}>
              <MaterialCommunityIcons
                name="pin"
                size={18}
                color={WHITE}
                style={{marginRight: 8}}
              />
              <Text style={modalStyles.pinButtonText}>Pin Post</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default PinPostModal;

// --------------------------------------------------------------------------------
// 2. Stylesheets
// --------------------------------------------------------------------------------

const modalStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // Faded background
  },
  container: {
    width: '100%',
    maxHeight: height * 0.9,
    backgroundColor: WHITE,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: BORDER_COLOR,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: DARK_GRAY_TEXT,
  },
  closeButton: {
    padding: 5,
  },
  scrollViewContent: {
    padding: 20,
  },
  postInfo: {
    flexDirection: 'row',
    paddingBottom: 20,
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 15,
  },
  postDetails: {
    flex: 1,
  },
  postTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: DARK_GRAY_TEXT,
  },
  postMeta: {
    fontSize: 12,
    color: MEDIUM_GRAY_TEXT,
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: DARK_GRAY_TEXT,
    marginBottom: 10,
  },
  selectorBox: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: WHITE,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: BORDER_COLOR,
  },
  selectorIconBg: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: ORANGE_LIGHT_BG,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  selectorDetails: {
    flex: 1,
  },
  selectorTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: DARK_GRAY_TEXT,
  },
  selectorSubtitle: {
    fontSize: 13,
    color: MEDIUM_GRAY_TEXT,
    marginTop: 2,
  },
  helperText: {
    fontSize: 12,
    color: LIGHT_GRAY_TEXT,
    marginTop: 8,
    marginBottom: 20,
  },
  durationBox: {
    backgroundColor: LIGHT_BG,
    borderColor: LIGHT_BG,
    marginBottom: 20,
  },
  durationIconBg: {
    width: 40,
    height: 40,
    borderRadius: 20, // Circular
    backgroundColor: ORANGE_LIGHT_BG,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  alertBox: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: ORANGE_LIGHT_BG,
    borderRadius: 8,
  },
  alertDetails: {
    flex: 1,
  },
  alertTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: DARK_GRAY_TEXT,
    marginBottom: 4,
  },
  alertBody: {
    fontSize: 13,
    color: MEDIUM_GRAY_TEXT,
    lineHeight: 18,
  },
  footer: {
    flexDirection: 'row',
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: BORDER_COLOR,
    backgroundColor: WHITE,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginRight: 10,
    backgroundColor: LIGHT_BG,
    borderWidth: 1,
    borderColor: BORDER_COLOR,
  },
  cancelButtonText: {
    color: MEDIUM_GRAY_TEXT,
    fontSize: 16,
    fontWeight: '600',
  },
  pinButton: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: PRIMARY_ORANGE,
  },
  pinButtonText: {
    color: WHITE,
    fontSize: 16,
    fontWeight: '600',
  },
});
