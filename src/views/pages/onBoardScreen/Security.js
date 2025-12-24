import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Switch,
  TextInput,
  Platform,
} from 'react-native';
import React, {useState} from 'react';

// Icon imports
import AntDesign from 'react-native-vector-icons/AntDesign';
import BackButton from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {useNavigation} from '@react-navigation/native';
import colors from '../../../config/colors';
import {SafeAreaView} from 'react-native-safe-area-context';

// --- Constants ---
const PRIMARY_COLOR = colors.PRIMARY_COLOR;
const BORDER_COLOR = colors.BORDER_COLOR;
const TEXT_GRAY = colors.TEXT_GRAY;
const LIGHT_GRAY_BG = colors.LIGHT_GRAY_BG;
const LIGHT_ORANGE_BG = colors.LIGHT_ORANGE_BG;
const ERROR_RED = colors.ERROR_RED;

// --- Dummy Data ---
const ACCOUNT_INFO = {
  email: 'j***a@design drops.ap',
  phone: '+1 (555) 000-9090',
  otpEnabled: false,
  passwordUpdated: 'Updated 5 months ago',
};

const ACTIVE_SESSIONS = [
  {
    id: 1,
    device: 'iPhone 15 Pro',
    status: 'Current device • San Francisco, CA',
    icon: (
      <SimpleLineIcons
        name="screen-smartphone"
        size={24}
        color={PRIMARY_COLOR}
      />
    ),
    isCurrent: true,
    lastActive: '5 mins ago',
  },
  {
    id: 2,
    device: 'Macbook Pro',
    status: 'Chrome • Near 90028, CA',
    icon: <SimpleLineIcons name="screen-desktop" size={24} color={TEXT_GRAY} />,
    isCurrent: false,
    lastActive: '2 days ago',
  },
  {
    id: 3,
    device: 'iPad Air',
    status: 'Safari • Los Angeles, CA',
    icon: <SimpleLineIcons name="screen-tablet" size={24} color={TEXT_GRAY} />,
    isCurrent: false,
    lastActive: '1 week ago',
  },
];

// --- Sub-Components ---

// Component for a single Active Session item
const SessionItem = ({session}) => {
  return (
    <View style={styles.sessionItem}>
      <View
        style={[
          styles.sessionIconContainer,
          session.isCurrent && {backgroundColor: LIGHT_ORANGE_BG},
        ]}>
        {session.icon}
      </View>
      <View style={styles.sessionDetails}>
        <Text style={styles.sessionDeviceName}>{session.device}</Text>
        <Text style={styles.sessionStatusText}>{session.status}</Text>
        <Text style={styles.sessionLastActive}>
          Last active: {session.lastActive}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.revokeButton}
        onPress={() => console.log('Revoke session:', session.id)}>
        <Text
          style={
            session.isCurrent ? styles.revokeTextPrimary : styles.revokeTextRed
          }>
          {session.isCurrent ? 'Current' : 'Revoke'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

// --- Main Screen Component ---
const Security = () => {
  const navigation = useNavigation();

  const [isOTPSwitchEnabled, setIsOTPSwitchEnabled] = useState(
    ACCOUNT_INFO.otpEnabled,
  );
  const toggleSwitch = () =>
    setIsOTPSwitchEnabled(previousState => !previousState);

  // State to manage edit modes for fields
  const [isEditingPhone, setIsEditingPhone] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [tempPhone, setTempPhone] = useState(ACCOUNT_INFO.phone);

  const handleSavePhone = () => {
    // Logic to save the new phone number goes here
    console.log('Saving phone:', tempPhone);
    setIsEditingPhone(false);
  };

  const handleSaveSettings = () => {
    // Collect all data and save it
    console.log('Saving All Changes...');
    // Add navigation logic here
  };

  return (
    <SafeAreaView style={styles.fullContainer}>
      {/* --- Fixed Header --- */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={styles.backButton}>
          <BackButton name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Security</Text>
        <View style={{width: 24}} /> {/* Spacer for symmetry */}
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* --- Account Email --- */}
        <View style={styles.sectionContainer}>
          <Text style={styles.label}>Account Email</Text>
          <View style={styles.inputRow}>
            <TextInput
              style={styles.inputField}
              value={ACCOUNT_INFO.email}
              editable={false}
              placeholderTextColor={TEXT_GRAY}
            />
            <MaterialCommunityIcons
              name="lock"
              size={20}
              color={TEXT_GRAY}
              style={styles.lockIcon}
            />
          </View>
          <Text style={styles.helpText}>
            Your email is protected and cannot be changed.
          </Text>
        </View>

        {/* --- Phone Number --- */}
        <View style={styles.sectionContainer}>
          <Text style={styles.label}>Phone Number</Text>
          <View style={styles.inputRow}>
            <TextInput
              style={styles.inputField}
              value={tempPhone}
              onChangeText={setTempPhone}
              keyboardType="phone-pad"
              editable={isEditingPhone}
              placeholderTextColor={TEXT_GRAY}
            />
            <TouchableOpacity
              onPress={() =>
                isEditingPhone ? handleSavePhone() : setIsEditingPhone(true)
              }
              style={styles.editButton}>
              {isEditingPhone ? (
                <AntDesign
                  name="checkcircleo"
                  size={20}
                  color={PRIMARY_COLOR}
                />
              ) : (
                <AntDesign name="edit" size={20} color={PRIMARY_COLOR} />
              )}
            </TouchableOpacity>
            {!isEditingPhone && (
              <TouchableOpacity onPress={() => setTempPhone('')}>
                <Feather name="x" size={20} color={TEXT_GRAY} />
              </TouchableOpacity>
            )}
          </View>
          <Text style={styles.helpText}>
            Used for account recovery and verification
          </Text>
        </View>

        {/* --- Change Password --- */}
        <View style={styles.sectionContainer}>
          <Text style={styles.label}>Change Password</Text>
          <View style={styles.inputRow}>
            <TextInput
              style={styles.inputField}
              value="•••••••••••••"
              secureTextEntry
              editable={false}
              placeholderTextColor={TEXT_GRAY}
            />
            <TouchableOpacity
              onPress={() => console.log('Change Password clicked')}
              style={styles.editButton}>
              <AntDesign name="edit" size={20} color={PRIMARY_COLOR} />
            </TouchableOpacity>
          </View>
          <Text style={styles.helpText}>
            Last updated {ACCOUNT_INFO.passwordUpdated}
          </Text>
        </View>

        {/* --- Two-Factor Auth --- */}
        <View style={[styles.sectionContainer, styles.authSection]}>
          <View style={styles.authRow}>
            <View style={styles.authTextContainer}>
              <Text style={styles.label}>
                Enable Time Factor Authentication
              </Text>
              <Text style={styles.helpText}>
                Add extra protection for your account with TOTP or Authenticator
                app.
              </Text>
            </View>
            <Switch
              trackColor={{false: BORDER_COLOR, true: PRIMARY_COLOR}}
              thumbColor={'white'}
              onValueChange={toggleSwitch}
              value={isOTPSwitchEnabled}
            />
          </View>
        </View>

        {/* --- Active Sessions --- */}
        <View style={styles.sessionsSection}>
          <View style={styles.sessionsHeader}>
            <Text style={styles.sectionHeader}>Active Sessions</Text>
            <Text style={styles.sessionCount}>
              {ACTIVE_SESSIONS.length} devices
            </Text>
          </View>
          {ACTIVE_SESSIONS.map(session => (
            <SessionItem key={session.id} session={session} />
          ))}
        </View>

        {/* --- Account Actions --- */}
        <View style={styles.accountActionsSection}>
          <Text style={styles.sectionHeader}>Account Actions</Text>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => console.log('Delete Account Clicked')}>
            <Ionicons name="trash-bin-outline" size={20} color={ERROR_RED} />
            <Text style={styles.deleteText}>Delete Account</Text>
            <AntDesign
              name="right"
              size={16}
              color={ERROR_RED}
              style={styles.actionArrow}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* --- Fixed Footer Buttons --- */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => console.log('Cancel clicked')}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSaveSettings}>
          <Text style={styles.saveText}>Save Changes</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Security;

// --- Stylesheet ---
const styles = StyleSheet.create({
  fullContainer: {
    flex: 1,
    backgroundColor: LIGHT_GRAY_BG,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  // --- Header Styles ---
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 15,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: BORDER_COLOR,
    paddingTop: Platform.OS === 'ios' ? 50 : 15,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
  },
  backButton: {
    padding: 5,
  },
  // --- Input/Section Styles ---
  sectionContainer: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: BORDER_COLOR,
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 50,
  },
  inputField: {
    flex: 1,
    fontSize: 15,
    color: '#333',
    paddingVertical: 0,
  },
  lockIcon: {
    marginLeft: 10,
  },
  editButton: {
    paddingHorizontal: 10,
  },
  helpText: {
    fontSize: 12,
    color: TEXT_GRAY,
    marginTop: 5,
  },
  // --- Two-Factor Auth Section ---
  authSection: {
    paddingVertical: 15,
  },
  authRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  authTextContainer: {
    flex: 1,
    marginRight: 15,
  },
  // --- Active Sessions Section ---
  sessionsSection: {
    marginBottom: 15,
  },
  sessionsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
  },
  sessionCount: {
    fontSize: 14,
    fontWeight: '500',
    color: TEXT_GRAY,
  },
  sessionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: BORDER_COLOR,
  },
  sessionIconContainer: {
    padding: 10,
    borderRadius: 6,
    marginRight: 15,
    backgroundColor: LIGHT_GRAY_BG,
  },
  sessionDetails: {
    flex: 1,
  },
  sessionDeviceName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
  },
  sessionStatusText: {
    fontSize: 13,
    color: TEXT_GRAY,
  },
  sessionLastActive: {
    fontSize: 11,
    color: TEXT_GRAY,
    marginTop: 2,
  },
  revokeButton: {
    padding: 5,
  },
  revokeTextRed: {
    fontSize: 13,
    fontWeight: '600',
    color: ERROR_RED,
  },
  revokeTextPrimary: {
    fontSize: 13,
    fontWeight: '600',
    color: PRIMARY_COLOR,
  },
  // --- Account Actions ---
  accountActionsSection: {
    marginBottom: 100, // Space for the fixed footer
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
  },
  deleteText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 15,
    fontWeight: '600',
    color: ERROR_RED,
  },
  actionArrow: {
    marginRight: 5,
  },
  // --- Fixed Footer Buttons ---
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    padding: 15,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: BORDER_COLOR,
    paddingBottom: Platform.OS === 'ios' ? 30 : 15,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: BORDER_COLOR,
    paddingVertical: 12,
    marginRight: 10,
    alignItems: 'center',
  },
  cancelText: {
    fontSize: 16,
    fontWeight: '600',
    color: TEXT_GRAY,
  },
  saveButton: {
    flex: 1,
    backgroundColor: PRIMARY_COLOR,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  saveText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
});
