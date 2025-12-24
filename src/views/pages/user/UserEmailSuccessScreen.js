import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
} from 'react-native';

const UserEmailSuccessScreen = ({ onFAQPress, onCallSupportPress }) => {
  const handleGoBack = () => {
    console.log('Navigating back or to home screen.');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.fullScreen}>

        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBack}>
            <Image
              source={{ uri: "https://via.placeholder.com/24x24?text=<" }}
              style={{ width: 24, height: 24 }}
            />
          </TouchableOpacity>
          <View style={{ width: 24 }} />
        </View>

        {/* MAIN CONTENT */}
        <View style={styles.container}>

          { /* SUCCESS CIRCLE */}
           
            <Image
              source={require('../../../assets/images/ic_email_support.png')}
              style={{ width: 70, height: 70,  }}
              resizeMode='contain'
            />
           
         

         
          <Text style={styles.mainHeader}>Your message has been sent!</Text>
          <Text style={styles.subText}>
            We've received your email and will respond shortly.
          </Text>

          {/* Expected Response Time */}
          <View style={styles.infoCard}>
            <Image
              source={require('../../../assets/images/ic_expected_time.png')}
              style={{ width: 24, height: 24, tintColor: "#F97316" }}
            />
            <View style={styles.infoDetails}>
              <Text style={styles.infoTitle}>Expected Response Time</Text>
              <Text style={styles.infoSubtitle}>
                Our support team typically responds within 1 business day.
              </Text>
            </View>
          </View>

          {/* Confirmation Email */}
          <View style={styles.infoCard}>
            <Image
              source={require('../../../assets/images/ic_email_boc.png')}
              style={{ width: 24, height: 24, tintColor: "#F97316" }}
            />
            <View style={styles.infoDetails}>
              <Text style={styles.infoTitle}>Confirmation Email</Text>
              <Text style={styles.infoSubtitle}>
                A confirmation has been sent to your registered email address.
              </Text>
            </View>
          </View>

          {/* Help Options */}
          <Text style={styles.helpHeader}>Need immediate assistance?</Text>

          <View style={styles.helpOptions}>
            <TouchableOpacity
              style={styles.helpButton}
              onPress={onFAQPress || (() => console.log("FAQ Pressed"))}
            >
              <Image
                source={require('../../../assets/images/ic_faq.png')}
                style={{ width: 18, height: 18, tintColor: "#F97316" ,marginRight:10}}
              />
              <Text style={styles.helpButtonText}>FAQ</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.helpButton}
              onPress={onCallSupportPress || (() => console.log("Call Support Pressed"))}
            >
              <Image
                source={require('../../../assets/images/ic_call_support_new.png')}
                style={{ width: 18, height: 18, tintColor: "#F97316" ,marginRight:10}}
              />
              <Text style={styles.helpButtonText}>Call Support</Text>
            </TouchableOpacity>
          </View>

  <View style={styles.securityFooter}>
          <Image
            source={require('../../../assets/images/ic_call_support_new.png')}
            style={{ width: 16, height: 16, tintColor: "#45B3A5" }}
          />
          <Text style={styles.securityText}>
            Your message is secure and will only be viewed by our support team.
          </Text>
        </View>

        </View>

       

      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: 'white' },
  fullScreen: { flex: 1, backgroundColor: 'white' },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: 'white',
  },

  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingTop: 50,
  },

  checkmarkCircle: {
    // width: 90,
    // height: 90,
    // borderRadius: 45,
    // backgroundColor: '#45B3A5',
    // alignItems: 'center',
    // justifyContent: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },

  mainHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },

  subText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },

  infoCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 20,
    width: '100%',
    marginBottom: 15,
  },

  infoDetails: {
    marginLeft: 15,
    flex: 1,
  },

  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },

  infoSubtitle: {
    fontSize: 14,
    color: '#666',
  },

  helpHeader: {
    fontSize: 16,
    color: '#666',
    marginTop: 40,
    marginBottom: 15,
  },

  helpOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: 250,
    marginBottom: 40,
  },

  helpButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },

  helpButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#F97316',
    marginLeft: 5,
  },

  securityFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#F7F7F7',
    // position: 'absolute',
    // bottom: 0,
    // left: 0,
    // right: 0,
    marginTop:8
  },

  securityText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 8,
    textAlign: 'center',
    flexShrink: 1,
  },
});

export default UserEmailSuccessScreen;
