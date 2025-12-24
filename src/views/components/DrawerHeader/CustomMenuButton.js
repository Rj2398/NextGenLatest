import React from 'react';
import {TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from '../../../theme';

const CustomMenuButton = ({navigation}) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.toggleDrawer()}
      style={{paddingHorizontal: 15}}
      accessible={true}
      accessibilityLabel="Open Menu"
      accessibilityRole="button">
      {/* Use your desired icon here. I'm using Ionicons for a standard look. */}
      <Ionicons name="menu-outline" size={30} color={colors.textDark} />
      {/* If you want to use a local image (like localIcons.drawer_click): */}
      {/* <Image
            source={localIcons.drawer_click}
            style={{width: 24, height: 24, tintColor: colors.textDark}}
            resizeMode="contain"
          /> */}
    </TouchableOpacity>
  );
};

export default CustomMenuButton;

///

// import React from 'react';
// import {TouchableOpacity, View, Image, Text} from 'react-native';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import {colors} from '../../../theme';

// const CustomMenuButton = ({
//   navigation,
//   centerImage = true,
//   centerText,
//   rightImage = true,
//   rightText,
//   onRightPress,
// }) => {
//   return (
//     <View
//       style={{
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'space-between',
//         paddingHorizontal: 15,
//         height: 55,
//       }}>
//       {/* LEFT - HAMBURGER */}
//       <TouchableOpacity
//         onPress={() => navigation.toggleDrawer()}
//         style={{paddingRight: 10}}
//         accessible={true}
//         accessibilityLabel="Open Menu"
//         accessibilityRole="button">
//         <Image
//           source={require('../../../assets/images/slider_icon.png')}
//           style={{height: 17, width: 23}}></Image>
//       </TouchableOpacity>

//       {/* CENTER - IMAGE OR TEXT */}
//       <View style={{flex: 1, alignItems: 'center'}}>
//         {centerImage ? (
//           <Image
//             source={require('../../../assets/images/nextgenlogo.png')}
//             style={{height: 35, width: 120, resizeMode: 'contain'}}
//           />
//         ) : (
//           <Text
//             style={{fontSize: 18, fontWeight: '600', color: colors.textDark}}>
//             {centerText}
//           </Text>
//         )}
//       </View>

//       {/* RIGHT - IMAGE OR TEXT */}
//       <TouchableOpacity onPress={onRightPress} style={{paddingLeft: 10}}>
//         {rightImage ? (
//           <Image
//             source={require('../../../assets/images/ic_park_switch.png')}
//             style={{height: 30, width: 30, resizeMode: 'contain'}}
//           />
//         ) : rightText ? (
//           <Text style={{fontSize: 16, color: colors.textDark}}>
//             {rightText}
//           </Text>
//         ) : (
//           <View style={{width: 30}} /> // keeps layout aligned
//         )}
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default CustomMenuButton;
