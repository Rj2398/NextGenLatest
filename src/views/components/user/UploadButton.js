import React from 'react';
import {TouchableOpacity, Text, View, StyleSheet, Image} from 'react-native';

export default function UploadButton({onPress, label}) {
  return (
    <View style={styles.header}>
      <Text style={styles.textColor}>{label}</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={onPress}
        activeOpacity={0.7}>
        <Image
          source={require('../../../assets/images/ic_upload_icon.png')}
          style={{height: 17, width: 17}}
          resizeMode="contain"></Image>
        <Text style={styles.text}>Upload Documents</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    justifyContent: 'column',
  },
  textColor: {
    color: '#858D9D',
    fontSize: 12,
    marginBottom: 5,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#d1d5db', // gray-300
    borderStyle: 'dashed',
    backgroundColor: '#f9f9f9',
    marginTop: 10,
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 24,
    gap: 8,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937', // gray-800
  },
});
