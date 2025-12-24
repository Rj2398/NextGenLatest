import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  StatusBar,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import MCIcon from "react-native-vector-icons/MaterialCommunityIcons";
import UserHeader from "../../components/user/UserHeader";
import AddNewCardModal from "../../components/user/AddNewCardModal";

// --- Color Palette ---
const colors = {
  white: "#FFFFFF",
  black: "#000000",
  primaryBrand: "#F97300", // Main action color (Add Button, Checkbox checkmark)
  textBody: "#222222",
  textLight: "#8A8A8E",
  backgroundGray: "#F5F5F5",
  cardBlack: "#1A1A1A",
  cardGrey: "#D8D8D8",
  overlayTransparent: "rgba(155, 155, 155, 0.6)", // Transparent background: #9B9B9B with 60% opacity
};

// --- Custom Checkbox Component (Matches the image style) ---
const CustomCheckbox = ({ isChecked, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.checkboxContainer}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {/* Box */}
      <View
        style={[
          styles.checkbox,
          isChecked
            ? styles.checkboxChecked
            : styles.checkboxUnchecked,
        ]}
      >
        {/* Checkmark (using Material Community Icon for a solid fill check) */}
        {isChecked && (
          <MCIcon name="check-bold" color={colors.white} size={14} />
        )}
      </View>
      <Text style={styles.checkboxLabel}>Use as default payment method</Text>
    </TouchableOpacity>
  );
};

// --- Main Screen Component ---
export default function PaymentMethod({ navigation }) {
  const [defaultCardId, setDefaultCardId] = useState("3947");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const cards = [
    {
      id: "3947",
      brand: "Mastercard",
      bg: colors.cardBlack,
      textColor: colors.white,
      expiry: "05/23",
      name: "Jennyfer Doe",
      iconSource: "mastercard", // Placeholder for icon loading logic
    },
    {
      id: "4546",
      brand: "Visa",
      bg: colors.cardBlack,
      textColor: colors.white,
      expiry: "11/22",
      name: "Jennyfer Doe",
      iconSource: "visa", // Placeholder for icon loading logic
    },
  ];

  // Helper function to render the card logo (using Text/Emoji as placeholder)
  const renderCardLogo = (brand, textColor) => {
    // In a real app, you would use Image components with local assets
    const logoStyle = {
      fontSize: brand === 'Visa' ? 24 : 18,
      fontWeight: '900',
      color: textColor,
    };

    if (brand === 'Mastercard') {
      return (
        <View style={{ width: 50, height: 30, justifyContent: 'center', alignItems: 'flex-end' }}>
          {/* <Text style={[logoStyle, {fontSize: 18, letterSpacing: -1}]}>mastercard</Text> */}
          <Image
        source={require('../../../assets/user/mastercard.png')}
        style={{ width: 40, height: 40 }}
        resizeMode="contain"
        />
        </View>
      );
    } else {
      return (
        <View style={{ width: 60, height: 30, justifyContent: 'center', alignItems: 'flex-end' }}>
          <Text style={logoStyle}>VISA</Text>
        </View>
      );
    }
  };


  // Helper function to render the chip icon (using Emoji as placeholder)
  const renderChip = () => (
    <View style={styles.chipPlaceholder}>
      {/* <MCIcon name="chip" size={24} color={colors.primaryBrand} /> */}
      <Image
        source={require('../../../assets/user/chip.png')}
        style={{ width: 24, height: 20,borderRadius:8 }}
      />
    </View>
  );


  // Card component structure matching the image
  const CardItem = ({ card, isDefault, onSelect }) => (
    <View style={styles.cardContainer}>
      <View key={card.id} style={[styles.card, { backgroundColor: card.bg }]}>

        {/* Card Number and Chip Row */}
        <View style={styles.cardNumberRow}>
          {renderChip()}
          <Text style={[styles.cardNumber, { color: card.textColor ,marginTop:30}]}>
            ************ {card.id}
          </Text>
        </View>


        {/* Card Holder Name, Expiry Date, and Logo Row */}
        <View style={styles.cardInfoRow}>
          {/* Holder Name */}
          <View>
            <Text style={[styles.label, { color: card.textColor }]}>
              Card Holder Name
            </Text>
            <Text style={[styles.value, { color: card.textColor }]}>
              {card.name}
            </Text>
          </View>

          {/* Expiry Date */}
          <View style={styles.expiryColumn}>
            <Text style={[styles.label, { color: card.textColor }]}>
              Expiry Date
            </Text>
            <Text style={[styles.value, { color: card.textColor }]}>
              {card.expiry}
            </Text>
          </View>

          {/* Card Brand Logo */}
          {renderCardLogo(card.brand, card.textColor)}
        </View>
        
        {/* --- Card Overlay Logic Added Here --- */}
        {
            !isDefault && (
                <View style={styles.cardOverlay} />
            )
        }
        {/* ------------------------------------- */}
      </View>

      {/* Default Checkbox (Outside the card, as in the image) */}
      <CustomCheckbox
        isChecked={isDefault}
        onPress={() => onSelect(card.id)}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      {/* Header */}
      <UserHeader
        title="Payment method"
        onBackPress={() => navigation.goBack()}
      />

      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        <Text style={styles.sectionTitle}>Your payment cards</Text>

        {cards.map((card) => (
          <CardItem
            key={card.id}
            card={card}
            isDefault={defaultCardId === card.id}
            onSelect={setDefaultCardId}
          />
        ))}

        {/* Spacer for Floating Button */}
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Floating Add Button */}
      <TouchableOpacity style={styles.addButton} 
    onPress={() => setIsModalVisible(true)}>
        <Icon name="plus" size={24} color={colors.white} />
      </TouchableOpacity>

      {/* --- RENDER THE NEW MODAL COMPONENT HERE --- */}
      <AddNewCardModal 
        isVisible={isModalVisible} 
        onClose={() => {
          navigation.navigate('ShippingAddress'); 
          setIsModalVisible(false)
        }} // Close the Modal
      />
      {/* ------------------------------------------ */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scrollView: {
    paddingHorizontal: 20,
  },

  /* Header (Existing Styles Omitted for brevity) */
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.backgroundGray,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.black,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.black,
    marginTop: 20,
    marginBottom: 15,
  },

  /* Card Item */
  cardContainer: {
    marginBottom: 20,
  },
  card: {
    borderRadius: 15,
    padding: 20,
    // Add a slight shadow for depth
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    overflow: 'hidden', // Added to ensure overlay respects border radius
  },
  // --- New Overlay Style ---
  cardOverlay: {
    ...StyleSheet.absoluteFillObject, // Covers the entire Card View
    backgroundColor: colors.overlayTransparent, // #9B9B9B with 60% opacity
    borderRadius: 15, // Matches card's border radius
  },
  // -------------------------
  cardNumberRow: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginBottom: 25,
    marginLeft: -5, // Slight adjustment for the chip icon
  },
  chipPlaceholder: {
    // Styling for the chip icon
    marginRight: 10,
  },
  cardNumber: {
    flex: 1,
    fontSize: 18,
    fontWeight: "600",
    letterSpacing: 2,
    // Using a flex to push the number part to the right of the chip
    textAlign: 'right',
  },
  cardInfoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end", // Align info and logo to the bottom
    marginTop: 25,
  },
  expiryColumn: {
    // Ensures the expiry is spaced correctly from name and logo
    marginLeft: 30,
  },
  label: {
    fontSize: 12,
    opacity: 0.7,
  },
  value: {
    fontSize: 14,
    fontWeight: "600",
    marginTop: 3,
  },

  /* Custom Checkbox (Existing Styles Omitted for brevity) */
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.textLight, // Default border color
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  checkboxUnchecked: {
    backgroundColor: colors.white,
    borderColor: colors.textLight,
  },
  checkboxChecked: {
    backgroundColor: colors.primaryBrand,
    borderColor: colors.primaryBrand,
  },
  checkboxLabel: {
    fontSize: 14,
    color: colors.textBody,
  },

  /* Floating Add Button (Existing Styles Omitted for brevity) */
  addButton: {
    position: "absolute",
    bottom: 30,
    right: 25,
    width: 60,
    height: 60,
    backgroundColor: colors.primaryBrand,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
});