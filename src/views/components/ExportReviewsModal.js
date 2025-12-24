import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Image,
} from 'react-native';

// --- Configuration ---
const COLORS = {
  primaryOrange: '#FF7700',
  secondaryOrange: '#FF8C00',
  accentBlue: '#007AFF',
  backgroundGray: '#F7F7F7',
  cardWhite: '#FFFFFF',
  textDark: '#333333',
  textMedium: '#666666',
  textLight: '#999999',
  borderLight: '#E0E0E0',
  lightBlueBox: '#F0F8FF',
  checkedGreen: '#4CAF50',
};

const FONT_SIZE = {
  header: 20,
  title: 16,
  body: 14,
  small: 12,
};

// --- Dummy image URLs ---
const ICONS = {
  close: 'https://img.icons8.com/ios-glyphs/30/000000/macos-close.png',
  down: 'https://img.icons8.com/ios-glyphs/30/000000/expand-arrow.png',
  info: 'https://img.icons8.com/ios-glyphs/30/000000/info--v1.png',
  document: 'https://img.icons8.com/ios-glyphs/30/000000/document.png',
  check: 'https://img.icons8.com/ios-glyphs/30/ffffff/checkmark.png',
  download: 'https://img.icons8.com/ios-glyphs/30/ffffff/download.png',
};

// --- Data Structures ---
const EXPORT_FIELDS = [
  'Review ID',
  'Review Text',
  'Product/Course',
  'Verified Status',
  'Rating',
  'Reviewer Name',
  'Date Posted',
  'Flagged Status',
];

// --- Sub-Components ---
const Checkbox = ({ label, isChecked, onPress }) => (
  <TouchableOpacity style={styles.checkboxContainer} onPress={onPress}>
    <View
      style={[
        styles.checkbox,
        isChecked
          ? { backgroundColor: COLORS.checkedGreen, borderColor: COLORS.checkedGreen }
          : {},
      ]}
    >
      {isChecked && <Image source={{ uri: ICONS.check }} style={{ width: 12, height: 12 }} />}
    </View>
    <Text style={styles.checkboxLabel}>{label}</Text>
  </TouchableOpacity>
);

const RadioButton = ({ label, details, subText, isSelected, onPress }) => (
  <TouchableOpacity
    style={[styles.radioCard, isSelected ? styles.radioCardSelected : {}]}
    onPress={onPress}
  >
    <View style={styles.radioTopRow}>
      <View style={[styles.radioCircle, isSelected ? styles.radioCircleSelected : {}]}>
        {isSelected && <View style={styles.radioInnerCircle} />}
      </View>
      <Text style={styles.radioLabel}>{label}</Text>
    </View>
    <View style={styles.radioDetails}>
      <View style={styles.tag}>
        <Text style={styles.tagText}>{details}</Text>
      </View>
      <Text style={styles.subText}>{subText}</Text>
    </View>
  </TouchableOpacity>
);

// --- Main Component as Modal ---
const ExportReviewsModal = ({ visible, onClose }) => {
  const [exportScope, setExportScope] = useState('currentFilters');
  const [selectedFields, setSelectedFields] = useState(
    EXPORT_FIELDS.reduce((acc, field) => ({ ...acc, [field]: true }), {})
  );

  const toggleField = (field) => {
    setSelectedFields((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleCancel = () => onClose?.();
  const handleExport = () => {
    console.log('Export CSV');
    onClose?.();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true} onRequestClose={handleCancel}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.modalContent}>
          <View style={styles.grabHandle} />

          {/* Header */}
          <View style={styles.header}>
            <View>
              <Text style={styles.headerTitle}>Export Reviews</Text>
              <Text style={styles.headerSubtitle}>Export your review data in CSV format</Text>
            </View>
            <TouchableOpacity onPress={handleCancel} style={styles.closeButton}>
              <Image source={require('../../assets/images/ic_cross_icon.png')} style={{ width: 14, height: 14 }} />
            </TouchableOpacity>
          </View>

          {/* Scrollable Content */}
          <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.scrollContent}>
            <Text style={styles.sectionTitle}>Export Scope</Text>
            <View style={styles.scopeContainer}>
              <RadioButton
                label={`Current Filters\nExport reviews matching your current filter`}
                details="247 reviews"
                subText="Flagged • 5 ratings • Last 30 days"
                isSelected={exportScope === 'currentFilters'}
                onPress={() => setExportScope('currentFilters')}
              />
              <RadioButton
                label={`All Reviews\nExport all reviews in your database`}
                details="1,247 reviews"
                subText="Complete dataset"
                isSelected={exportScope === 'allReviews'}
                onPress={() => setExportScope('allReviews')}
              />
            </View>

            <Text style={styles.sectionTitle}>Export Format</Text>
            <TouchableOpacity style={styles.dropdown}>
              <Text style={styles.dropdownText}>CSV (Comma Separated Values)</Text>
              <Image source={{ uri: ICONS.down }} style={{ width: 16, height: 16 }} />
            </TouchableOpacity>

            <View style={styles.infoBox}>
              <Image source={{ uri: ICONS.info }} style={{ width: 14, height: 14 }} />
              <Text style={styles.infoText}>
                CSV files can be opened in Excel, Google Sheets, and other spreadsheet applications
              </Text>
            </View>

            <Text style={styles.sectionTitle}>Included Data Fields1</Text>
            <View style={styles.fieldsContainer}>
              {EXPORT_FIELDS.map((field) => (
                // <Checkbox
                //   key={field}
                //   label={field}
                //   isChecked={selectedFields[field]}
                //   onPress={() => toggleField(field)}
                //  disabled={true} 
                // />
                <View style={styles.rowContainer}>
                  <Image source={require('../../assets/images/ic_tick_icon.png')} style={{height:10,width:10}}></Image>
                  <Text style={{ color: 'black',
    fontSize: 14,
    flexShrink: 1, 
    flexWrap: 'wrap', }}>{field}</Text>
                </View>
              ))}
            </View>

            <View style={styles.estimateCard}>
              <Image source={{ uri: ICONS.document }} style={{ width: 24, height: 24 }} />
              <View style={{ marginLeft: 10 }}>
                <Text style={styles.estimateTitle}>Estimated File Size</Text>
                <Text style={styles.estimateValue}>~45 KB for 247 reviews</Text>
              </View>
            </View>
          </ScrollView>

          <View style={styles.actionBar}>
            <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.exportButton} onPress={handleExport}>
              <Image source={{ uri: ICONS.download }} style={{ width: 20, height: 20 }} />
              <Text style={styles.exportButtonText}>Export CSV</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default ExportReviewsModal;

// --- Styles ---
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: COLORS.cardWhite,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '90%',
    width: '100%',
    paddingTop: 10,
    flex: 1,
  },
  rowContainer:{
  width: '48%', // ✅ two fixed-width columns
    flexDirection: 'row',
    alignItems: 'flex-start', // allows multi-line text to flow naturally
    marginBottom: 8,
    gap:5

  },
  grabHandle: {
    width: 40,
    height: 5,
    backgroundColor: '#ccc',
    borderRadius: 2.5,
    alignSelf: 'center',
    marginBottom: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderLight,
  },
  headerTitle: { fontSize: FONT_SIZE.header, fontWeight: '700', color: COLORS.textDark },
  headerSubtitle: { fontSize: FONT_SIZE.body, color: COLORS.textMedium },
  closeButton: { padding: 5 },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 20 },
  sectionTitle: { fontSize: FONT_SIZE.title, fontWeight: '600', color: COLORS.textDark, marginTop: 20, marginBottom: 10 },
  scopeContainer: { marginBottom: 10 },
  radioCard: { backgroundColor: COLORS.cardWhite, padding: 15, borderRadius: 8, borderWidth: 1, borderColor: COLORS.borderLight, marginBottom: 10 },
  radioCardSelected: { borderColor: COLORS.primaryOrange, backgroundColor: 'rgba(255,124,0,0.05)' },
  radioTopRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 5 },
  radioCircle: { height: 18, width: 18, borderRadius: 9, borderWidth: 2, borderColor: COLORS.textLight, alignItems: 'center', justifyContent: 'center', marginRight: 10 },
  radioCircleSelected: { borderColor: COLORS.primaryOrange },
  radioInnerCircle: { height: 9, width: 9, borderRadius: 4.5, backgroundColor: COLORS.primaryOrange },
  radioLabel: { fontSize: FONT_SIZE.body, fontWeight: '600', color: COLORS.textDark },
  radioDetails: { flexDirection: 'row', alignItems: 'center', marginLeft: 28 },
  tag: { backgroundColor: COLORS.secondaryOrange, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 5, marginRight: 10 },
  tagText: { color: COLORS.cardWhite, fontSize: FONT_SIZE.small, fontWeight: '600' },
  subText: { fontSize: FONT_SIZE.small, color: COLORS.textMedium },
  dropdown: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 12, borderWidth: 1, borderColor: COLORS.borderLight, borderRadius: 8, backgroundColor: COLORS.cardWhite, marginBottom: 10 },
  dropdownText: { fontSize: FONT_SIZE.body, color: COLORS.textDark },
  infoBox: { flexDirection: 'row', alignItems: 'flex-start', backgroundColor: COLORS.backgroundGray, padding: 10, borderRadius: 8 },
  infoText: { fontSize: FONT_SIZE.small, color: COLORS.textMedium, marginLeft: 5, flexShrink: 1 },
  fieldsContainer: {
 flexDirection: 'row',
    flexWrap: 'wrap',
  },
  checkboxContainer: { flexDirection: 'row', alignItems: 'center', width: '48%', marginBottom: 15 },
  checkbox: { height: 16, width: 16, borderRadius: 4, borderWidth: 1, borderColor: COLORS.borderLight, justifyContent: 'center', alignItems: 'center', marginRight: 8 },
  checkboxLabel: { fontSize: FONT_SIZE.body, color: COLORS.textDark },
  estimateCard: { flexDirection: 'row', alignItems: 'center', padding: 15, backgroundColor: COLORS.lightBlueBox, borderRadius: 8, marginTop: 10, borderWidth: 1, borderColor: 'rgba(0,122,255,0.2)' },
  estimateTitle: { fontSize: FONT_SIZE.body, fontWeight: '600', color: COLORS.textDark },
  estimateValue: { fontSize: FONT_SIZE.body, color: COLORS.textMedium },
  actionBar: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 15, borderTopWidth: 1, borderTopColor: COLORS.borderLight, backgroundColor: COLORS.cardWhite },
  cancelButton: { flex: 1, backgroundColor: COLORS.backgroundGray, paddingVertical: 14, borderRadius: 8, alignItems: 'center', marginRight: 10 },
  cancelButtonText: { fontSize: FONT_SIZE.title, fontWeight: '600', color: COLORS.textDark },
  exportButton: { flex: 1, flexDirection: 'row', backgroundColor: COLORS.primaryOrange, paddingVertical: 14, borderRadius: 8, alignItems: 'center', justifyContent: 'center', marginLeft: 10 },
  exportButtonText: { fontSize: FONT_SIZE.title, fontWeight: '600', color: COLORS.cardWhite, marginLeft: 8 },
});

