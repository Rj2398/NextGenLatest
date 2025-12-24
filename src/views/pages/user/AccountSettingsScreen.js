import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image, // For profile image
  Switch, // For notification toggles
} from 'react-native';
import UserHeader from '../../components/user/UserHeader';
// Using react-native-vector-icons for icons like eye, down arrow, right arrow
import Icon from 'react-native-vector-icons/AntDesign';
import FeatherIcon from 'react-native-vector-icons/Feather'; // For eye icon
import {SafeAreaView} from 'react-native-safe-area-context';

// --- CONSOLIDATED COLOR CONSTANTS ---
const COLORS = {
  primaryOrange: '#FF9800',
  backgroundGray: '#F5F5F5',
  cardWhite: '#FFFFFF',
  darkText: '#4B5563',
  mediumText: '#374151',
  lightText: '#999',
  black: '#000',
  redAlert: '#FF4D4D', // For "Add Now" type alerts
  switchcolor: '#E5E7EB',
};

// --- Reusable Input Field (Similar to previous, but with labels always visible) ---
const SettingInputField = ({
  label,
  value,
  onChangeText,
  secureTextEntry,
  showEyeIcon,
  placeholder,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(!secureTextEntry);
  return (
    <View>
      <Text style={styles.inputLabel}>{label}</Text>
      <View style={styles.settingInputContainer}>
        <TextInput
          style={styles.settingInputField}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry && !isPasswordVisible} // Only secure if password and not visible
          placeholder={placeholder}
          placeholderTextColor={COLORS.lightText}
        />
        {showEyeIcon && (
          <TouchableOpacity
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            style={styles.eyeIcon}>
            <FeatherIcon
              name={isPasswordVisible ? 'eye' : 'eye-off'}
              size={20}
              color={COLORS.mediumText}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

// --- Custom Switch Button Component ---
// This component replaces the native Switch for consistent, custom design.
const CustomSwitchButton = ({
  value,
  onValueChange,
  activeColor = COLORS.primaryOrange,
  inactiveColor = COLORS.switchcolor,
}) => {
  const switchWidth = 48;
  const switchHeight = 28;
  const thumbSize = 24;
  const padding = 2; // For inner spacing

  const trackStyle = {
    width: switchWidth,
    height: switchHeight,
    borderRadius: switchHeight / 2,
    backgroundColor: value ? activeColor : inactiveColor,
    justifyContent: 'center',
    paddingHorizontal: padding,
    // Add a light border to match the image's subtle outline effect
    borderWidth: 1.5,
    borderColor: value ? activeColor : inactiveColor,
  };

  const thumbStyle = {
    width: thumbSize,
    height: thumbSize,
    borderRadius: thumbSize / 2,
    backgroundColor: COLORS.cardWhite,
    // Position the thumb (moves from left=0 to right=switchWidth - thumbSize - 2*padding)
    transform: [
      {translateX: value ? switchWidth - thumbSize - padding * 2 : 0},
    ],
    // Shadow for the thumb
    shadowColor: COLORS.cardWhite,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onValueChange}
      style={trackStyle}>
      <View style={thumbStyle} />
    </TouchableOpacity>
  );
};

// --- Main Component: Account Settings Screen ---
const AccountSettingsScreen = ({navigation}) => {
  // --- State for collapsible sections ---
  const [isSavedAddressesExpanded, setIsSavedAddressesExpanded] =
    useState(true);
  const [isChangePasswordExpanded, setIsChangePasswordExpanded] =
    useState(false);
  const [isNotificationSettingsExpanded, setIsNotificationSettingsExpanded] =
    useState(false);
  const [orderUpdates, setOrderUpdates] = useState(true);
  const [promotion, setPromotion] = useState(true);

  // --- State for form data ---
  const [profileData, setProfileData] = useState({
    fullName: 'Sarah Johnson',
    email: 'sarah.j@gmail.com',
    phone: '+1 234 567 8900',
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });
  const [notificationSettings, setNotificationSettings] = useState({
    orderUpdates: true,
    promotions: false,
  });

  // --- Handlers ---
  const handleProfileChange = (name, value) => {
    setProfileData(prev => ({...prev, [name]: value}));
  };
  const handlePasswordChange = (name, value) => {
    setPasswordData(prev => ({...prev, [name]: value}));
  };
  const handleNotificationToggle = settingName => {
    setNotificationSettings(prev => ({
      ...prev,
      [settingName]: !prev[settingName],
    }));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <UserHeader
        title="Account Settings"
        onBackPress={() => navigation.goBack()}
      />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* User Profile Section */}
        <View style={styles.profile}>
          <View style={styles.profileSection}>
            <View style={{position: 'relative', width: 100, height: 100}}>
              <Image
                source={{
                  uri: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200',
                }}
                style={[
                  styles.profileImage,
                  {width: 100, height: 100, borderRadius: 50},
                ]}
              />

              <Image
                source={require('../../../assets/user/review_camera.png')}
                style={{
                  width: 35,
                  height: 35,
                  position: 'absolute',
                  bottom: 5, // profile pic ke bottom-right corner pr
                  right: 5,
                }}
                resizeMode="contain"
              />
            </View>

            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>{profileData.fullName}</Text>
              <Text style={styles.profileEmail}>{profileData.email}</Text>
            </View>
          </View>
          {/* Editable Profile Details */}
          <SettingInputField
            label="Full Name"
            value={profileData.fullName}
            onChangeText={text => handleProfileChange('fullName', text)}
          />
          <SettingInputField
            label="Email"
            value={profileData.email}
            onChangeText={text => handleProfileChange('email', text)}
          />
          <SettingInputField
            label="Phone"
            value={profileData.phone}
            onChangeText={text => handleProfileChange('phone', text)}
          />
        </View>

        {/* --- Saved Addresses Section (Collapsible) --- */}
        <View style={styles.sectionCard}>
          <TouchableOpacity
            style={styles.collapsibleHeader}
            onPress={() =>
              setIsSavedAddressesExpanded(!isSavedAddressesExpanded)
            }>
            <Text style={styles.sectionTitle}>Saved Addresses</Text>
            <Icon
              name={isSavedAddressesExpanded ? 'down' : 'right'}
              size={18}
              color={COLORS.mediumText}
            />
          </TouchableOpacity>

          {isSavedAddressesExpanded && (
            <View style={styles.collapsibleContent}>
              {/* Individual Address Card */}
              <View style={styles.addressCard}>
                <View style={styles.addressCardHeader}>
                  <Text style={styles.addressTag}>Default</Text>
                  <Text style={styles.addressLabel}>Home</Text>
                </View>
                <Text style={styles.addressText}>
                  123 Main Street, Apt 4B{'\n'}New York, NY 10001
                </Text>
              </View>
              <TouchableOpacity style={styles.addNowButton}>
                <Text style={styles.addNowText}>+Add New</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* --- Change Password Section (Collapsible) --- */}
        <View style={styles.sectionCard}>
          <TouchableOpacity
            style={styles.collapsibleHeader}
            onPress={() =>
              setIsChangePasswordExpanded(!isChangePasswordExpanded)
            }>
            <Text style={styles.sectionTitle}>Change Password</Text>
            <Icon
              name={isChangePasswordExpanded ? 'down' : 'right'}
              size={18}
              color={COLORS.mediumText}
            />
          </TouchableOpacity>

          {isChangePasswordExpanded && (
            <View style={styles.collapsibleContent}>
              <SettingInputField
                label="Current Password"
                placeholder="Enter current password"
                value={passwordData.currentPassword}
                onChangeText={text =>
                  handlePasswordChange('currentPassword', text)
                }
                secureTextEntry
                showEyeIcon
              />
              <SettingInputField
                label="New Password"
                placeholder="Enter new password"
                value={passwordData.newPassword}
                onChangeText={text => handlePasswordChange('newPassword', text)}
                secureTextEntry
                showEyeIcon
              />
              <SettingInputField
                label="Confirm New Password"
                placeholder="Re-enter new password"
                value={passwordData.confirmNewPassword}
                onChangeText={text =>
                  handlePasswordChange('confirmNewPassword', text)
                }
                secureTextEntry
                showEyeIcon
              />
              <TouchableOpacity style={styles.forgotPasswordButton}>
                <Text style={styles.forgotPasswordText}>
                  Forgot your current password?
                </Text>
                <Icon
                  name="right"
                  size={14}
                  color={COLORS.primaryOrange}
                  style={{alignSelf: 'flex-end'}}
                />
              </TouchableOpacity>

              <View style={styles.passwordButtonsContainer}>
                <TouchableOpacity style={styles.cancelButton}>
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.updateButton}>
                  <Text style={styles.updateButtonText}>Update Password</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>

        {/* --- Notification Settings Section (Collapsible) --- */}
        <View style={styles.sectionCard}>
          <TouchableOpacity
            style={styles.collapsibleHeader}
            onPress={() =>
              setIsNotificationSettingsExpanded(!isNotificationSettingsExpanded)
            }>
            <Text style={styles.sectionTitle}>Notification Settings</Text>
            <Icon
              name={isNotificationSettingsExpanded ? 'down' : 'right'}
              size={18}
              color={COLORS.mediumText}
            />
          </TouchableOpacity>

          {isNotificationSettingsExpanded && (
            <View style={styles.collapsibleContent}>
              <View style={styles.notificationRow}>
                <View>
                  <Text style={styles.notificationTitle}>Order Updates</Text>
                  <Text style={styles.notificationDescription}>
                    Get notified about your order status
                  </Text>
                </View>
                {/* <Switch
                  trackColor={{ false: "#767577", true: COLORS.primaryOrange + '60' }} // Light orange track
                  thumbColor={notificationSettings.orderUpdates ? COLORS.primaryOrange : "#f4f3f4"}
                  onValueChange={() => handleNotificationToggle('orderUpdates')}
                  value={notificationSettings.orderUpdates}
                /> */}
                <CustomSwitchButton
                  value={orderUpdates}
                  onValueChange={() =>
                    setOrderUpdates(previousState => !previousState)
                  }
                  activeColor={COLORS.primaryOrange}
                  inactiveColor={COLORS.switchcolor}
                />
              </View>
              <View style={styles.notificationRow}>
                <View>
                  <Text style={styles.notificationTitle}>Promotions</Text>
                  <Text style={styles.notificationDescription}>
                    Receive updates about offers
                  </Text>
                </View>
                {/* <Switch
                  trackColor={{ false: "#767577", true: COLORS.primaryOrange + '60' }}
                  thumbColor={notificationSettings.promotions ? COLORS.primaryOrange : "#f4f3f4"}
                  onValueChange={() => handleNotificationToggle('promotions')}
                  value={notificationSettings.promotions}
                /> */}
                <CustomSwitchButton
                  value={promotion}
                  onValueChange={() =>
                    setPromotion(previousState => !previousState)
                  }
                  activeColor={COLORS.primaryOrange}
                  inactiveColor={COLORS.switchcolor}
                />
              </View>
            </View>
          )}
        </View>

        {/* Spacer at the bottom */}
        <View style={{height: 30}} />
      </ScrollView>
    </SafeAreaView>
  );
};

// --- Stylesheets ---
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.backgroundGray,
  },
  scrollContent: {
    padding: 15,
  },
  profile: {
    flexDirection: 'column',
    marginBottom: 20,
    backgroundColor: COLORS.cardWhite, // Background for the profile info
    borderRadius: 12,
    padding: 15,
    shadowColor: COLORS.black,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    padding: 15,
    shadowColor: COLORS.black,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  profileInfo: {
    flex: 1,
    marginStart: 10,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.darkText,
  },
  profileEmail: {
    fontSize: 14,
    color: COLORS.mediumText,
  },

  // --- Reusable Input Field Styles ---
  settingInputContainer: {
    marginBottom: 15,
    marginTop: 10,
    backgroundColor: COLORS.cardWhite,
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingTop: 8,
    shadowColor: COLORS.black,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
    minHeight: 60,
    flexDirection: 'row',
  },
  inputLabel: {
    fontSize: 14,
    color: COLORS.mediumText,
    fontWeight: 500,
    opacity: 0.8,
  },
  inputFieldWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  settingInputField: {
    flex: 1,
    fontSize: 16,
    color: COLORS.darkText,
    paddingVertical: 5,
    paddingLeft: 0,
  },
  eyeIcon: {
    paddingLeft: 10,
    paddingVertical: 5,
    alignSelf: 'center',
  },

  // --- Collapsible Section Styles ---
  sectionCard: {
    backgroundColor: COLORS.cardWhite,
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: COLORS.black,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
    overflow: 'hidden', // Ensures content doesn't bleed when collapsed
  },
  collapsibleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    marginTop: 5,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: COLORS.darkText,
  },
  collapsibleContent: {
    padding: 15,
    paddingTop: 0, // No extra padding at the top if header has it
  },

  // --- Saved Addresses Sub-section Styles ---
  addressCard: {
    backgroundColor: COLORS.cardWhite, // Lighter background for address card within section
    borderRadius: 8,
    borderColor: '#E5E7EB',
    borderWidth: 1,
    padding: 12,
    marginTop: 10, // Space from header if collapsed
  },
  addressCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  addressLabel: {
    fontSize: 15,
    fontWeight: 'bold',
    marginStart: 5,
    color: COLORS.darkText,
  },
  addressTag: {
    backgroundColor: COLORS.primaryOrange + '20', // Light orange background
    color: COLORS.primaryOrange,
    fontSize: 12,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 5,
    fontWeight: '500',
  },
  addressText: {
    fontSize: 14,
    color: COLORS.mediumText,
    lineHeight: 20,
    marginBottom: 10,
  },
  addNowButton: {
    alignSelf: 'flex-end', // Align to left
    marginTop: 10,
  },
  addNowText: {
    color: COLORS.primaryOrange,
    fontSize: 14,
    fontWeight: '500',
  },

  // --- Change Password Sub-section Styles ---
  forgotPasswordButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: COLORS.primaryOrange,
    flex: 1,
    width: 50,
    fontSize: 14,
    alignSelf: 'flex-start',
    marginRight: 5,
  },
  passwordButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: COLORS.backgroundGray,
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginRight: 10,
    height: 50,
    justifyContent: 'center',
  },
  cancelButtonText: {
    color: COLORS.darkText,
    fontSize: 16,
    fontWeight: 'bold',
  },
  updateButton: {
    flex: 1,
    backgroundColor: COLORS.primaryOrange,
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    height: 50,
    justifyContent: 'center',
  },
  updateButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },

  // --- Notification Settings Sub-section Styles ---
  notificationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  notificationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.black,
  },
  notificationDescription: {
    fontSize: 12,
    color: '#6B7280',
  },
});

export default AccountSettingsScreen;
