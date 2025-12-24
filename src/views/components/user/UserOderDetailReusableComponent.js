// UserOrderDetailReusableComponent.js

import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const primaryOrange = '#FF6B00';
const lightGray = '#F5F5F5';
const mediumGray = '#B0B0B0';
const darkText = '#333';


export const InfoBlock = ({ title, children, icon }) => (
  <View style={styles.sectionContainer}>
    <View style={styles.sectionHeader}>
      {icon && <View style={{ marginRight: 5 }}>{icon}</View>}
      <Text style={styles.sectionTitle}>{title}</Text>
    </View>
    <View style={styles.sectionContent}>{children}</View>
  </View>
);

/* ---------------------------------------------------------
   2. ProductCard
--------------------------------------------------------- */
export const ProductCard = ({ name, details, price, imageUrl }) => (
  <View style={styles.productCard}>
    <Image source={{ uri: imageUrl }} style={styles.productImage} />

    <View style={styles.productDetails}>
      <Text style={styles.productName}>{name}</Text>
      <Text style={styles.productDetailsText}>{details}</Text>
    </View>

    <Text style={styles.productPrice}>{price}</Text>
  </View>
);

/* ---------------------------------------------------------
   3. SummaryRow
--------------------------------------------------------- */
export const SummaryRow = ({ label, value, isTotal = false }) => (
  <View style={styles.summaryRow}>
    <Text style={[styles.summaryLabel, isTotal && styles.totalText]}>{label}</Text>
    <Text style={[styles.summaryValue, isTotal && styles.totalText]}>{value}</Text>
  </View>
);

/* ---------------------------------------------------------
   4. TrackingStep
--------------------------------------------------------- */
export const TrackingStep = ({ status, timestamp, description, isComplete, isLast }) => (
  <View style={styles.trackingStepContainer}>
    <View style={styles.trackingLineContainer}>
      <View style={[styles.trackingIcon, isComplete && styles.trackingIconComplete]}>
        {isComplete && <Text style={styles.checkmark}>✓</Text>}
      </View>

      {!isLast && <View style={styles.verticalLine} />}
    </View>

    <View style={styles.trackingDetails}>
      <Text style={styles.trackingStatus}>{status}</Text>
      {timestamp && <Text style={styles.trackingTimestamp}>{timestamp}</Text>}
      <Text style={styles.trackingDescription}>{description}</Text>
    </View>
  </View>
);

/* ---------------------------------------------------------
   5. ActionButtons
--------------------------------------------------------- */
export const ActionButtons = () => (
  <View style={styles.actionButtonContainer}>
    <TouchableOpacity style={[styles.actionButton, styles.returnButton]}>
      <Text style={styles.returnButtonText}>Return Item</Text>
    </TouchableOpacity>

    <TouchableOpacity style={[styles.actionButton, styles.buyAgainButton]}>
      <Text style={styles.buyAgainButtonText}>Buy Again</Text>
    </TouchableOpacity>
  </View>
);

/* ---------------------------------------------------------
   STYLES
--------------------------------------------------------- */
const styles = StyleSheet.create({
  // Section
  sectionContainer: {
    marginBottom: 10,
    paddingVertical: 5,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: darkText,
  },
  sectionContent: {
    paddingLeft: 5,
  },

  // Product Card
  productCard: {
    flexDirection: 'row',
    paddingVertical: 10,
    alignItems: 'center',
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 15,
    backgroundColor: lightGray,
  },
  productDetails: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    color: darkText,
  },
  productDetailsText: {
    fontSize: 14,
    color: mediumGray,
    marginTop: 2,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: darkText,
  },

  // Summary Row
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  summaryLabel: {
    fontSize: 15,
    color: darkText,
  },
  summaryValue: {
    fontSize: 15,
    fontWeight: '600',
    color: darkText,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: darkText,
  },

  // Tracking Step
  trackingStepContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  trackingLineContainer: {
    alignItems: 'center',
    marginRight: 15,
  },
  trackingIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: mediumGray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  trackingIconComplete: {
    backgroundColor: '#00AA00',
    borderColor: '#00AA00',
  },
  checkmark: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  verticalLine: {
    width: 2,
    flex: 1,
    backgroundColor: lightGray,
    marginTop: 2,
    marginBottom: -15,
  },
  trackingDetails: { flex: 1 },
  trackingStatus: {
    fontSize: 15,
    fontWeight: '600',
    color: darkText,
  },
  trackingTimestamp: {
    fontSize: 13,
    color: mediumGray,
    marginTop: 2,
  },
  trackingDescription: {
    fontSize: 14,
    color: darkText,
    marginTop: 4,
  },

  // Action Buttons
  actionButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  returnButton: {
    backgroundColor: primaryOrange,
    marginRight: 10,
  },
  buyAgainButton: {
    backgroundColor: lightGray,
    marginLeft: 10,
  },
  returnButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buyAgainButtonText: {
    color: darkText,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
