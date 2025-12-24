import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

// --- Definición de colores solo para este archivo ---
const color = {
  white: '#FFFFFF',
  black: '#000000',
  borderLight: '#E0E0E0',
};


 
const Header = ({ title, onBackPress }) => {

 const navigation = useNavigation();

 const handleBack=()=>{

  if(onBackPress){
    navigation.goBack()
  }
 }



  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={handleBack} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color={color.black} />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>{title}</Text>
      {/* Placeholder para centrar el título cuando no hay botón derecho */}
      <View style={styles.placeholder} />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 12,
    backgroundColor: color.white,
    borderBottomWidth: 1,
    borderBottomColor: color.borderLight,
  },
  backButton: {
    padding: 5,
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: color.black,
    flex: 1,
    textAlign: 'center',
  },
  // Ocupa el espacio del botón de atrás para centrar el título
  placeholder: {
    width: 34, 
  },
});

export default Header;