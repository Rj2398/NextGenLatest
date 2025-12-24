// src/components/common/SvgRenderer.js
import React from 'react';
import {
  CloseIcon,
  GpsIcon,
  InstituteIcon,
  MailIcon,
  MerchantIcon,
  OnBoarding1,
  OnBoarding2,
  OnBoarding3,
  OnBoarding4,
  OnBoarding5,
  TickIcon,
  UploadIcon,
  UserIcon,
} from '../../assets/startUpImg';

const svgMap = {
  onboard1: OnBoarding1,
  onboard2: OnBoarding2,
  onboard3: OnBoarding3,
  onboard4: OnBoarding4,
  onboard5: OnBoarding5,
  userIcon: UserIcon,
  instituteIcon: InstituteIcon,
  merchantIcon: MerchantIcon,
  mailIcon: MailIcon,
  tickIcon: TickIcon,
  GpsIcon: GpsIcon,
  UploadIcon: UploadIcon,
  CloseIcon: CloseIcon,
};

const SvgRenderer = ({name, width, height}) => {
  const Component = svgMap[name];

  // Returns the SVG component if it exists in the map, otherwise returns null
  return Component ? <Component width={width} height={height} /> : null;
};

export default SvgRenderer;
