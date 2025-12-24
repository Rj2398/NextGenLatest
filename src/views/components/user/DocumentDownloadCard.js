import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';

const DocumentDownloadCard = ({title, onDownload}) => {
  return (
    <View style={styles.card1}>
      {/* Left side: PDF icon + title */}
      <View
        style={{
          marginHorizontal: 10,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Image
          source={require('../../../assets/images/ic_pdf_icon.png')}
          style={{width: 24, height: 24, marginRight: 20}}
        />
        <Text style={{color: '#000', fontWeight: 'bold', fontSize: 16}}>
          {title}
        </Text>
      </View>

      {/* Right side: Download icon */}
      <TouchableOpacity onPress={onDownload}>
        <Image
          source={require('../../../assets/images/ic_download_icon_black_clr.png')}
          style={{height: 18, width: 18, marginRight: 12}}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
};

export default DocumentDownloadCard;

const styles = StyleSheet.create({
  card1: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 6,
    padding: 12,
    marginVertical: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});
