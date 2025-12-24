import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const ExportNotification = ({ onClose }) => {
  return (
    <View style={styles.container}>
      {/* Left: Check icon */}
      <Image
        source={require('../../assets/images/ic_csv_export.png')} // use your own check icon
        style={styles.icon}
      />

      {/* Middle: Text content */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>CSV Export Started</Text>
        <Text style={styles.subtitle}>Your file will be ready for download shortly</Text>
      </View>

      {/* Right: Close button */}
      <TouchableOpacity onPress={onClose}>
        <Text style={styles.close}>×</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ExportNotification;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2BB3A3', // teal background
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  icon: {
    width: 20,
    height: 20,
    tintColor: '#fff',
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
  },
  subtitle: {
    color: '#f2f2f2',
    fontSize: 13,
    marginTop: 2,
  },
  close: {
    color: '#fff',
    fontSize: 20,
    paddingHorizontal: 4,
  },
});