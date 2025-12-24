import React from 'react';
import {TouchableOpacity, View, Image, Text} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from '../../../theme';
import {DrawerActions, useNavigation} from '@react-navigation/native';

const HeaderTitle = ({
  centerImage,
  centerText = true,
  rightImage,
  rightText,
  onRightPress,
  navigation,
}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        height: 55,
        // marginTop: 30,
        backgroundColor: '#fff',

        // 🔥 SHADOW ONLY AT BOTTOM
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 5},
        shadowOpacity: 0.15,
        shadowRadius: 4,

        // ⚠ ANDROID
        elevation: 0,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0,0,0,0.1)',
      }}>
      {/* LEFT - HAMBURGER */}
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{paddingRight: 10}}
        accessible={true}
        accessibilityLabel="Open Menu"
        accessibilityRole="button">
        <Ionicons name="arrow-back" size={24} color={'#333'} />
      </TouchableOpacity>

      {/* CENTER - IMAGE OR TEXT */}
      <View style={{flex: 1, alignItems: 'center'}}>
        {centerImage ? (
          <Image
            source={require('../../../assets/images/nextgenlogo.png')}
            style={{height: 35, width: 120, resizeMode: 'contain'}}
          />
        ) : (
          <Text
            style={{fontSize: 18, fontWeight: '600', color: colors.textDark}}>
            {centerText}
          </Text>
        )}
      </View>

      {/* RIGHT - IMAGE OR TEXT */}
      <TouchableOpacity onPress={onRightPress} style={{paddingLeft: 10}}>
        {rightImage ? (
          <Image
            source={require('../../../assets/images/nextgenlogo.png')}
            style={{height: 35, width: 120, resizeMode: 'contain'}}
          />
        ) : // <Ionicons name="swap-horizontal-outline" size={24} color={'#333'} />
        rightText ? (
          <Text style={{fontSize: 16, color: colors.textDark}}>
            {rightText}
          </Text>
        ) : (
          <View style={{width: 30}} />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default HeaderTitle;
