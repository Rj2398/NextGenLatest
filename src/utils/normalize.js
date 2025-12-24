import {Dimensions, PixelRatio, Platform} from 'react-native';

export const {width, height} = Dimensions.get('window');
export var {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} =
  Dimensions.get('window');

// based on iPhone X's scale
// 375 is the width of iPhone X (or a common base screen width)
const wscale = width / 375;
// 767 is the height of iPhone X (or a common base screen height)
const hscale = height / 767;

export default function normalize(
  sizeValue, // Removed type annotation ': number'
  based = 'width', // Removed type annotation ': 'width' | 'height' = 'width''
) {
  const newSize = based === 'height' ? sizeValue * hscale : sizeValue * wscale;

  // Note: The logic for both 'ios' and 'else' (Android/Web) is identical here.
  // We can simplify this, but keeping the original structure for direct translation:
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  }
}
