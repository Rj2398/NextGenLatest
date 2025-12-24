import {
    Dimensions,
    View,
    Text,
    ActivityIndicator,
    Modal,
    StyleSheet,
  } from 'react-native';
  import React from 'react';
   
  const Loader = ({visible}) => {
    return (
      <Modal visible={visible} transparent>
        <View style={styles.modalView}>
          {/* ❌ FIX APPLIED HERE: Changed "x-large" to "large" */}
          <ActivityIndicator size="large" color="#fff" />
          <Text style={{color: '#fff', fontSize: 18}}>Loading....</Text>
        </View>
      </Modal>
    );
  };
   
  export default Loader;
   
  const styles = StyleSheet.create({
    modalView: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
      backgroundColor: 'rgba(0,0,0,0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });