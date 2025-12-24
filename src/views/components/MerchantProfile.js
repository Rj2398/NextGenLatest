import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';

const MerchantProfile = ({item, savedSection}) => {
  const navigation = useNavigation();
  console.log('savedSection ', savedSection);
  if (!item) return null;
  const handlePress = () => {
    if (item.title === 'Institute Info') {
      console.log('called ');
      navigation.navigate('Accounts'); // ← Screen name yahan daalo
    } else if (item.title === 'Security') {
      navigation.navigate('Securit'); // ← Dusri screen ka naam
    } else if (item.title === 'Help & Support') {
      navigation.navigate('HelpSupport'); // ← Dusri screen ka naam
    } else if (item.title === 'Terms and Policies') {
      navigation.navigate('Team'); // ← Dusri screen ka naam
    } else if (item.title === 'My Order') {
      navigation.navigate('UserMyOrdersScreen');
    } else if (item.title === 'Payments') {
      navigation.navigate('PaymentHelpScreen');
    } else if (item.title === 'Account Settings') {
      navigation.navigate('AccountSettingsScreen');
    } else if (item.title === 'Help and supports') {
      navigation.navigate('HelpCenter');
    } else if (item.title === 'Asso Institute') {
      navigation.navigate('AssociatedInstitutes');
    } else {
      // default click (agar future me aur items ho)
      if (item.onPress) item.onPress();
    }
  };
  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.8}
      onPress={handlePress}>
      {/* Icon Container */}
      <View
        style={[
          styles.cardIconContainer,
          {backgroundColor: item.iconBackground || '#f0f0f0'},
        ]}>
        <Image source={item.iconPath} style={{height: 19, width: 40}} />
      </View>

      {/* Text Content */}
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        {item.description ? (
          <Text style={styles.cardDescription}>{item.description}</Text>
        ) : null}
      </View>

      {/* Right Arrow */}
      <Icon name="keyboard-arrow-right" size={24} color="#999" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  cardIconContainer: {
    width: 45,
    height: 45,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  cardIcon: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  cardDescription: {
    fontSize: 13,
    color: '#777',
    marginTop: 2,
  },
});

export default MerchantProfile;
