// src/components/common/PngRenderer.js
import React from 'react';
import {Image, View} from 'react-native';
import {
  OnBoarding1,
  OnBoarding2,
  OnBoarding3,
  OnBoarding4,
  OnBoarding5,
} from '../../assets/startUpImg';

const pngMap = {
  onboard1: OnBoarding1,
  onboard2: OnBoarding2,
  onboard3: OnBoarding3,
  onboard4: OnBoarding4,
  onboard5: OnBoarding5,
};

const PngImage = ({name, width = 24, height = 24, style}) => {
  return (
    <View
      style={{
        width,
        height,
      }}>
      <Image
        source={pngMap[name]}
        style={[{width, height, resizeMode: 'contain'}, style]}
      />
    </View>
  );
};

export default PngImage;
