import {DarkTheme} from '@react-navigation/native';
import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  StatusBar,
  LayoutAnimation,
  Platform,
  UIManager,
  Animated,
  Image,
} from 'react-native';

import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import UserHeader from '../../components/user/UserHeader';

// Enable LayoutAnimation on Android
if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

// Load all images
const icons = {
  back: require('../../../assets/images/ic_back_btn.png'),
  search: require('../../../assets/images/ic_search_icon.png'),
  payment: require('../../../assets/images/ic_payment.png'),
  warning: require('../../../assets/images/ic_warning.png'),
  shield: require('../../../assets/images/ic_security_new.png'),
  arrowDown: require('../../../assets/images/ic_drop_down_grey.png'),
  email: require('../../../assets/images/ic_email_boc.png'),
  //   chat: require('../../../assets/images/ic_back_btn.png'),
  //   bag: require('../../../assets/images/ic_back_btn.png'),
  //   user: require('../../../assets/images/ic_back_btn.png'),
};

/**
 * Accordion Item Component (Custom Collapsible Implementation)
 */
const AccordionItem = ({title, iconName, iconColor, children}) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const arrowRotation = useRef(new Animated.Value(0)).current;

  const toggleCollapse = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsCollapsed(!isCollapsed);
  };

  useEffect(() => {
    Animated.timing(arrowRotation, {
      toValue: isCollapsed ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isCollapsed]);

  const rotate = arrowRotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  // Map iconName → image file
  const iconMap = {
    payment: icons.payment,
    'warning-outline': icons.warning,
    'shield-outline': icons.shield,
  };

  return (
    <View style={styles.accordionContainer}>
      <TouchableOpacity style={styles.accordionHeader} onPress={toggleCollapse}>
        <View style={styles.accordionTitleGroup}>
          <View style={[styles.accordionIconCircle]}>
            <Image
              source={iconMap[iconName]}
              style={{width: 40, height: 40}}
              resizeMode="contain"
            />
          </View>

          <Text style={styles.accordionTitle}>{title}</Text>
        </View>

        {/* Animated Arrow */}
        <Animated.View style={{transform: [{rotate}]}}>
          <Image source={icons.arrowDown} style={{width: 15, height: 14}} />
        </Animated.View>
      </TouchableOpacity>

      {/* Content */}
      {!isCollapsed && <View style={styles.accordionContent}>{children}</View>}
    </View>
  );
};

// --- Main Screen ---
const PaymentHelpScreen = () => {
  const [searchText, setSearchText] = useState('');
  const handleEmailSupport = () =>
    navigation.navigate('UserEmailSupportScreen');
  const handleContactSupport = () => console.log('Contact Support tapped');
  const navigation = useNavigation();

  return (
    <ScrollView>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.fullScreen}>
          {/* Header */}
          {/* <View style={styles.header}>
            <Image
              source={icons.back}
              style={{width: 20, height: 20}}
              resizeMode="contain"
            />
            <Text style={styles.headerTitle}>Payment Help</Text>
            <View style={{width: 24}} />
          </View> */}

          <UserHeader
            title="Payment Help"
            onBackPress={() => navigation.goBack()}
          />

          {/* Body */}
          <ScrollView style={styles.container}>
            {/* Search Bar */}
            <View style={styles.searchBar}>
              <Image
                source={icons.search}
                style={{width: 20, height: 20, tintColor: '#757575'}}
              />
              <TextInput
                style={styles.searchInput}
                placeholder="Search payment issues..."
                value={searchText}
                onChangeText={setSearchText}
                placeholderTextColor="#757575"
              />
            </View>
            <View style={styles.accordionGroup}>
              <AccordionItem
                title="Payment Methods"
                iconName="payment"
                iconColor="#F97316">
                <Text style={styles.contentText}>
                  Details about adding, editing, and deleting payment cards,
                  bank accounts, and digital wallets.
                </Text>
              </AccordionItem>

              <AccordionItem
                title="Common Issues"
                iconName="warning-outline"
                iconColor="#EAB308">
                <Text style={styles.contentText}>
                  Troubleshooting steps for failed payments, unauthorized
                  charges, and pending transactions.
                </Text>
              </AccordionItem>

              <AccordionItem
                title="Security"
                iconName="shield-outline"
                iconColor="#F899411A">
                <Text style={styles.contentText}>
                  Information on how your data is protected, 3D Secure
                  authentication, and fraud prevention.
                </Text>
              </AccordionItem>
            </View>

            {/* Quick Help */}
            <Text style={styles.quickHelpTitle}>Quick Help</Text>

            <TouchableOpacity
              style={styles.emailCard}
              onPress={handleEmailSupport}>
              <Image
                source={icons.email}
                style={{width: 35, height: 35, tintColor: '#F97316'}}
              />
              <Text style={styles.emailText}>Email Support</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.contactButton}
              onPress={handleContactSupport}>
              <Text style={styles.contactButtonText}>Contact Support</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

// --- Styles ---
const styles = StyleSheet.create({
  safeArea: {flex: 1, backgroundColor: 'white'},
  fullScreen: {flex: 1, backgroundColor: '#F7F7F7'},
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: 'white',
  },
  headerTitle: {fontSize: 18, fontWeight: '600'},
  container: {padding: 15, flex: 1},
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 20,
  },
  searchInput: {flex: 1, marginLeft: 10, fontSize: 16},
  accordionGroup: {marginBottom: 20},
  accordionContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 8,
  },
  accordionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
  },
  accordionTitleGroup: {flexDirection: 'row', alignItems: 'center'},
  accordionIconCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  accordionTitle: {fontSize: 14, fontWeight: '400'},
  accordionContent: {paddingHorizontal: 15, paddingBottom: 15},
  contentText: {fontSize: 14, color: '#666'},
  quickHelpTitle: {fontSize: 18, fontWeight: '600', marginBottom: 15},
  emailCard: {
    backgroundColor: 'white',
    borderRadius: 8,
    paddingVertical: 30,
    alignItems: 'center',
    marginBottom: 15,
  },
  emailText: {marginTop: 10, fontWeight: '500'},
  contactButton: {
    backgroundColor: '#FF7A00',
    borderRadius: 8,
    padding: 18,
    alignItems: 'center',
  },
  contactButtonText: {color: 'white', fontSize: 15, fontWeight: 'bold'},
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: 'white',
  },
  navIcon: {width: 26, height: 26, tintColor: '#757575'},
});

export default PaymentHelpScreen;
