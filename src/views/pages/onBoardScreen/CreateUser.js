import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Switch,
} from 'react-native';
import React, {useState} from 'react';
// CORRECTED IMPORTS for react-native-vector-icons
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import colors from '../../../config/colors';

// --- Color Palette and Constants
const PRIMARY_ORANGE = '#FF7A00';
const LIGHT_GREEN_BG = '#ECFDF5';
const DARK_GREEN_TEXT = '#393939';
const GRAY_TEXT = '#034444';
const LIGHT_GRAY_BORDER = '#D1D5DB';
const WHITE = '#FFFFFF';
const BLACK = '#1F2937';

const CreateUser = () => {
  const [dontShowAgain, setDontShowAgain] = useState(false);

  // You would define these functions to handle the button presses
  const handleCancel = () => {
    console.log('Cancel pressed');
  };

  const handleConfirm = () => {
    console.log('Confirm & Create pressed');
  };

  const handleChangePayment = () => {
    console.log('Change Payment pressed');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.contentBox}>
        {/* --- Header Section --- */}
        <View style={styles.header}>
          <View style={styles.avatarCircle}>
            {/* ICON 1: MaterialCommunityIcons for 'account-plus-outline' */}
            <MaterialCommunityIcons
              name="account-plus-outline"
              size={30}
              color={PRIMARY_ORANGE}
            />
          </View>
          <Text style={styles.title}>Create User</Text>
          <Text style={styles.subtitle}>
            Are you sure you want to create
            <Text style={{fontWeight: '700'}}> Sarah Mitchell</Text>?
          </Text>
        </View>

        {/* --- Billing Information Alert Box --- */}
        <View style={styles.infoBox}>
          <View style={styles.infoBoxHeader}>
            {/* ICON 2: MaterialCommunityIcons for 'information' */}
            <MaterialCommunityIcons
              name="information"
              size={20}
              color={DARK_GREEN_TEXT}
              style={{marginRight: 8}}
            />
            <Text style={styles.infoBoxTitle}>Billing Information</Text>
          </View>
          <Text style={styles.infoBoxText}>
            By adding this operator, you will be charged
            <Text style={styles.boldText}> $20 per month</Text> starting today.
          </Text>
          <View style={styles.proratedNote}>
            {/* ICON 3: MaterialCommunityIcons for small 'information' dot */}
            <MaterialCommunityIcons
              name="information"
              size={12}
              color={GRAY_TEXT}
              style={{marginRight: 4}}
            />
            <Text style={styles.proratedText}>
              Prorated for current cycle: minimum 30 days applies. Taxes may
              apply based on your location.
            </Text>
          </View>
        </View>

        {/* --- Cost Breakdown Section --- */}
        <View style={styles.costBreakdown}>
          <View style={styles.costRow}>
            <Text style={styles.costLabel}>Monthly seat cost</Text>
            <Text style={styles.costValue}>$20.00</Text>
          </View>
          <View style={styles.costRow}>
            <Text style={styles.costLabel}>Prorated (15 days remaining)</Text>
            <Text style={styles.costValue}>$10.00</Text>
          </View>
          <View style={[styles.costRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Today's charge</Text>
            <Text style={styles.totalValue}>$10.00</Text>
          </View>
        </View>

        {/* --- Payment Method Section --- */}
        <View style={styles.paymentMethod}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            {/* ICON 4: FontAwesome5 for 'cc-visa' (You might need to use 'brands' for this, but FontAwesome5 usually includes it) */}
            <FontAwesome5
              name="cc-visa"
              size={24}
              color="#1A1F71"
              style={{marginRight: 10}}
            />
            <Text style={styles.paymentText}>VISA</Text>
            <Text style={styles.paymentDetails}> •••• •••• •••• **4242</Text>
          </View>
          <TouchableOpacity onPress={handleChangePayment}>
            <Text style={styles.changeLink}>Change</Text>
          </TouchableOpacity>
        </View>

        {/* --- "Don't show again" Checkbox (Using Switch for simplicity) --- */}
        <View style={styles.checkboxContainer}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Switch
              value={dontShowAgain}
              onValueChange={setDontShowAgain}
              trackColor={{false: LIGHT_GRAY_BORDER, true: PRIMARY_ORANGE}}
              thumbColor={WHITE}
              style={{transform: [{scaleX: 0.8}, {scaleY: 0.8}]}}
            />
            <Text style={styles.checkboxLabel}>
              Don't show this confirmation again
            </Text>
          </View>
        </View>

        {/* --- Action Buttons --- */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.cancelButton]}
            onPress={handleCancel}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.confirmButton]}
            onPress={handleConfirm}>
            <Text style={styles.confirmButtonText}>Confirm & Create</Text>
          </TouchableOpacity>
        </View>

        {/* --- Security Footer --- */}
        <View style={styles.securityFooter}>
          {/* ICON 5: MaterialCommunityIcons for 'shield-check-outline' */}
          <MaterialCommunityIcons
            name="shield-check-outline"
            size={16}
            color={GRAY_TEXT}
            style={{marginRight: 4}}
          />
          <Text style={styles.securityText}>Secure payment processing</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default CreateUser;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 40,
  },

  contentBox: {
    width: '100%', //
    maxWidth: '100%',
    backgroundColor: WHITE,
    borderRadius: 0,
    padding: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(249, 115, 22, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'rgba(249, 115, 22, 0.4)',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: BLACK,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: GRAY_TEXT,
    textAlign: 'center',
    marginBottom: 16,
  },
  infoBox: {
    backgroundColor: LIGHT_GREEN_BG,
    padding: 16,
    borderRadius: 8,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: DARK_GREEN_TEXT,
  },
  infoBoxHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoBoxTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: DARK_GREEN_TEXT,
  },
  infoBoxText: {
    fontSize: 14,
    color: DARK_GREEN_TEXT,
    lineHeight: 20,
    marginBottom: 8,
  },
  boldText: {
    fontWeight: '700',
  },
  proratedNote: {
    flexDirection: 'row',
    paddingTop: 10,
    alignItems: 'flex-start',
    marginTop: 4,
    backgroundColor: 'white', // The requested background color
    padding: 8, // Added padding for better visual effect
    borderRadius: 4, // Added slight rounding to match the alert box style
  },
  proratedText: {
    fontSize: 10,
    color: GRAY_TEXT,
    flexShrink: 1,
  },
  costBreakdown: {
    marginBottom: 20,
    paddingVertical: 8,
  },
  costRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  costLabel: {
    fontSize: 14,
    color: BLACK,
  },
  costValue: {
    fontSize: 14,
    fontWeight: '600',
    color: BLACK,
  },
  totalRow: {
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: LIGHT_GRAY_BORDER,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: BLACK,
  },
  totalValue: {
    fontSize: 16,
    fontWeight: '700',
    color: PRIMARY_ORANGE,
  },
  paymentMethod: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: LIGHT_GRAY_BORDER,
    marginBottom: 20,
  },
  paymentText: {
    fontSize: 16,
    fontWeight: '600',
    color: BLACK,
  },
  paymentDetails: {
    fontSize: 16,
    color: GRAY_TEXT,
    marginLeft: 4,
  },
  changeLink: {
    color: PRIMARY_ORANGE,
    fontWeight: '600',
    fontSize: 14,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },
  checkboxIcon: {
    marginRight: 4,
  },
  checkboxLabel: {
    fontSize: 14,
    color: BLACK,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 20,
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: WHITE,
    borderWidth: 1,
    borderColor: LIGHT_GRAY_BORDER,
  },
  cancelButtonText: {
    color: BLACK,
    fontSize: 16,
    fontWeight: '600',
  },
  confirmButton: {
    backgroundColor: PRIMARY_ORANGE,
  },
  confirmButtonText: {
    color: WHITE,
    fontSize: 16,
    fontWeight: '600',
  },
  securityFooter: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  securityText: {
    fontSize: 12,
    color: GRAY_TEXT,
  },
});
