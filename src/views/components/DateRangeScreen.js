import React, { useState } from 'react';
import { View, Text, TextInput, Image, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const DateRangeScreen = () => {
  const [startDate, setStartDate] = useState(new Date('2024-01-01'));
  const [endDate, setEndDate] = useState(new Date('2024-01-31'));

  const [showPicker, setShowPicker] = useState(false);
  const [pickerTarget, setPickerTarget] = useState(null); // 'start' or 'end'

  const formatDate = (date) => date.toISOString().split('T')[0];

  const handleDateChange = (event, selectedDate) => {
    setShowPicker(false);
    if (selectedDate) {
      if (pickerTarget === 'start') setStartDate(selectedDate);
      else setEndDate(selectedDate);
    }
  };

  const openPicker = (target) => {
    setPickerTarget(target);
    setShowPicker(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Date Range</Text>

      <View style={styles.dateRow}>
        {/* Start Date Input */}
        <TouchableOpacity style={{ flex: 1 }} onPress={() => openPicker('start')}>
          <TextInput
            style={styles.dateInput}
            value={formatDate(startDate)}
            editable={false}
          />
        </TouchableOpacity>

        {/* End Date Input with embedded image */}
        <TouchableOpacity style={[styles.dateWithIcon, { flex: 1 }]} onPress={() => openPicker('end')}>
          <View>
            <TextInput
              style={styles.dateInputWithIcon}
              value={formatDate(endDate)}
              editable={false}
            />
            <Image
              source={require('../../assets/images/ic_date_icon.png')} // dummy image
              style={styles.imageIcon}
            />
          </View>
        </TouchableOpacity>
      </View>

      {/* Calendar picker */}
      {showPicker && (
        <DateTimePicker
          value={pickerTarget === 'start' ? startDate : endDate}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'calendar'}
          onChange={handleDateChange}
        />
      )}
    </View>
  );
};

export default DateRangeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    padding: 20,
    justifyContent: 'flex-start',
  },
  label: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
    marginBottom: 8,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateInput: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#E2E2E2',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 14,
    fontSize: 15,
    color: '#333',
  },
  dateWithIcon: {
    marginLeft: 10,
    position: 'relative',
  },
  dateInputWithIcon: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#E2E2E2',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 14,
    fontSize: 15,
    color: '#333',
    paddingRight: 40, // space for image
  },
  imageIcon: {
    position: 'absolute',
    right: 12,
    top: '50%',
    transform: [{ translateY: -10 }],
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
});
