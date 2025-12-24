// src/screens/Auth/OnboardingScreen.js
import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native'; // Import useNavigation
import normalize from '../../../utils/normalize';
// import PngRenderer from '../../components/common/PngRenderer';

import {colors, typography} from '../../../theme';
import PngRenderer from '../../components/PngRenderer';

const {width, height} = Dimensions.get('window');

const ONBOARDING_DATA = [
  {
    image: 'onboard1',
    title: 'Manage Your School Store',
    description:
      'Easily update store info, hours, and contact details to keep everything up-to-date.',
  },
  {
    image: 'onboard2',
    title: 'Track Inventory in Real-Time',
    description:
      'Stay informed with stock levels and never miss a sale due to out-of-stock items.',
  },
  {
    image: 'onboard3',
    title: 'Promote with Custom Ads',
    description:
      'Design and publish ads to highlight offers and new arrivals in minutes.',
  },
  {
    image: 'onboard4',
    title: 'Attract Buyers with Discounts',
    description:
      'Offer limited-time deals to boost traffic and increase conversions.',
  },
  {
    image: 'onboard5',
    title: 'Build Your Brand',
    description:
      "Showcase your school's identity with a rich profile and contact information.",
  },
];

export const OnboardingScreen = () => {
  const navigation = useNavigation(); // Hook for navigation
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);

  // Your Navigation Function
  const handlNavigation = () => {
    navigation.navigate('StartUpScreen'); // Ensure this matches the name in your Stack.Navigator
  };

  const nextSlide = () => {
    if (currentIndex < ONBOARDING_DATA.length - 1) {
      flatListRef.current.scrollToIndex({index: currentIndex + 1});
    } else {
      // Triggered when "Get Started" is visible
      handlNavigation();
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      flatListRef.current.scrollToIndex({index: currentIndex - 1});
    }
  };

  const handleScroll = e => {
    const xPos = e.nativeEvent.contentOffset.x;
    const index = Math.round(xPos / width);
    setCurrentIndex(index);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.popupContainer}>
        <FlatList
          ref={flatListRef}
          data={ONBOARDING_DATA}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={handleScroll}
          keyExtractor={(_, i) => i.toString()}
          renderItem={({item}) => (
            <View style={styles.slide}>
              <PngRenderer name={item.image} width={260} height={225} />
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.description}>{item.description}</Text>
            </View>
          )}
        />

        <View style={styles.pagination}>
          {ONBOARDING_DATA.map((_, i) => (
            <View
              key={i}
              style={i === currentIndex ? styles.dot : styles.unSelectedDot}
            />
          ))}
        </View>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            onPress={prevSlide}
            disabled={currentIndex === 0}
            style={[
              styles.button,
              styles.outlined,
              {opacity: currentIndex === 0 ? 0 : 1},
            ]}>
            <Text style={[styles.buttonText, {color: colors.primary}]}>
              Back
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={nextSlide}
            style={[styles.button, styles.filled]}>
            <Text style={[styles.buttonText, {color: colors.white}]}>
              {currentIndex === ONBOARDING_DATA.length - 1
                ? 'Get Started'
                : 'Next'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popupContainer: {
    height: height * 0.7,
    width: width,
    paddingVertical: normalize(12),
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },
  slide: {
    width: width,
    alignItems: 'center',
    paddingTop: normalize(16),
  },
  title: {
    fontSize: normalize(22),
    fontFamily: typography.fontFamily.bold,
    textAlign: 'center',
    marginTop: normalize(32),
    color: colors.black,
    marginHorizontal: normalize(20),
    fontWeight: '700',
  },
  description: {
    fontSize: normalize(16),
    textAlign: 'center',
    marginTop: normalize(20),
    color: colors.gray,
    paddingHorizontal: normalize(40),
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: normalize(20),
  },
  dot: {
    height: 8,
    width: 30,
    borderRadius: 4,
    marginHorizontal: 4,
    backgroundColor: '#ff9000',
  },
  unSelectedDot: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: '#E0E0E0',
    marginHorizontal: 4,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: normalize(32),
    marginBottom: normalize(20),
  },
  button: {
    flex: 0.45,
    paddingVertical: normalize(14),
    borderRadius: 8,
    alignItems: 'center',
  },
  outlined: {
    borderWidth: 1,
    borderColor: '#ff9000',
  },
  filled: {
    backgroundColor: '#ff9000',
  },
  buttonText: {
    fontSize: normalize(14),
    fontWeight: '700',
  },
});
