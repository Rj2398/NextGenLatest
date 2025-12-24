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
import React, {useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
const AUDIENCE_OPTIONS = [
  'School-wide',
  'Grade 6',
  'Grade 7',
  'Science Department',
  'Math Club',
];
// --- Color Palette and Constants ---
const PRIMARY_ORANGE = '#F97316';
const DARK_GRAY_TEXT = '#1F2937';
const BORDER_COLOR = '#D1D5DB';
const WHITE = '#FFFFFF';

const AudienceModal = ({isVisible, onClose, onSelect, selectedAudiences}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}>
      <TouchableOpacity
        style={styles.modalOverlay}
        onPress={onClose}
        activeOpacity={1}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Select Post Audience</Text>
          <ScrollView style={{maxHeight: 250}}>
            {AUDIENCE_OPTIONS.map((audience, index) => {
              const isSelected = selectedAudiences.includes(audience);
              return (
                <TouchableOpacity
                  key={index}
                  style={styles.modalOption}
                  onPress={() => onSelect(audience)}>
                  <Text style={styles.modalOptionText}>{audience}</Text>
                  {isSelected && (
                    <Ionicons
                      name="checkmark-circle"
                      size={20}
                      color={PRIMARY_ORANGE}
                    />
                  )}
                </TouchableOpacity>
              );
            })}
          </ScrollView>
          <TouchableOpacity style={styles.modalCloseButton} onPress={onClose}>
            <Text style={styles.modalCloseButtonText}>Done</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};
export default AudienceModal;
const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },

  modalContent: {
    backgroundColor: WHITE,
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: '100%',
    maxHeight: '60%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: DARK_GRAY_TEXT,
    marginBottom: 15,
  },
  modalOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: BORDER_COLOR,
  },
  modalOptionText: {fontSize: 16, color: DARK_GRAY_TEXT},
  modalCloseButton: {
    backgroundColor: PRIMARY_ORANGE,
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
  },
  modalCloseButtonText: {color: WHITE, fontSize: 16, fontWeight: '600'},
});
