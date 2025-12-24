import React, { useState } from 'react';

import {
  View,Text,TouchableOpacity,ScrollView,StyleSheet,Alert,Image,
  StatusBar,} from 'react-native';

import NormalInputField from '../../components/NormalInputField';
import DropdownSelect from '../../components/DropdownSelect';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

// Attachment box component
const AttachmentBox = ({ onAddAttachment }) => (
  <TouchableOpacity style={styles.attachmentBox} onPress={onAddAttachment}>
    <Image
      source={require('../../../assets/images/ic_upload.png')}
      style={{ width: 30, height: 30 }}
      resizeMode='contain'
    />
    <Text style={styles.attachmentText}>Attach screenshots or PDFs</Text>
    <Text style={styles.attachmentDetails}>(max 10MB, up to 3 files)</Text>
  </TouchableOpacity>
);

// Main component
const UserEmailSupportScreen = () => {
  const [school, setSchool] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [attachments, setAttachments] = useState([]);
  const navigation =useNavigation(); 

  const handleSendEmail = () => {
    // if (!school || !fullName || !email || !subject || !description) {
    //   Alert.alert('Error', 'Please fill in all required fields.');
    //   return;
    // }
     navigation.navigate('UserEmailSuccessScreen')
  };

  const handleCancel = () => {
    setSchool('');
    setFullName('');
    setEmail('');
    setSubject('');
    setDescription('');
    setAttachments([]);
  };

  const handleAddAttachment = () => {
    Alert.alert('Attachment Feature', 'Integrate react-native-document-picker here.');
  };

  return (
    <ScrollView>
           
    <StatusBar barStyle="dark-content" />
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.fullScreen}>

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={()=> navigation.goBack()}>
            <Image
              source={require('../../../assets/images/ic_back_press.png')}
              style={styles.headerIcon}
            />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Email Support</Text>

          <View style={{ width: 24 }} />
        </View>

        {/* Banner */}
        <View style={styles.banner}>
          <Image
           source={require('../../../assets/images/ic_email_boc.png')}
            style={styles.bannerIcon}
          />
          <Text style={styles.bannerHeader}>We're here to help</Text>
          <Text style={styles.bannerText}>
            Send us a message and our support team will get back to you within 24 hours.
          </Text>
        </View>

        {/* Form */}
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>

          <DropdownSelect
            label="Which school is this regarding?"
            placeholder="Select your school"
            selectedValue={school}
            onSelect={setSchool}
          />

          <NormalInputField
            label="Full Name *"
            placeholder="Enter your full name"
            value={fullName}
            onChangeText={setFullName}
          />

          <NormalInputField
            label="Email Address *"
            placeholder="Enter your registered email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />

          <NormalInputField
            label="Subject *"
            placeholder="Enter the issue subject"
            value={subject}
            onChangeText={setSubject}
          />

          <NormalInputField
            label="Description *"
            placeholder="Describe your issue or question"
            value={description}
            onChangeText={setDescription}
            isTextArea={true}
          />

          {/* Attachment */}
          <Text style={styles.label}>Attachment (optional)</Text>
          <AttachmentBox onAddAttachment={handleAddAttachment} />

          {/* Disclaimer */}
          <View style={styles.disclaimer}>
            <Image
               source={require('../../../assets/images/ic_cross_red_icon.png')}
              style={styles.infoIcon}
            />
            <Text style={styles.disclaimerText}>
              Our support team usually replies within 1 business day. Please include as much detail as possible.
            </Text>
          </View>
        </ScrollView>

        {/* Footer */}
        <View style={styles.footer}>
          <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.submitButton} onPress={handleSendEmail}>
            <Text style={styles.submitButtonText}>Send Email</Text>
          </TouchableOpacity>
        </View>

      </View>
    </SafeAreaView>
   
    </ScrollView>
  );
};

export default UserEmailSupportScreen;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: 'white' },
  fullScreen: { flex: 1, backgroundColor: '#F7F7F7' },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  headerIcon: { width: 24, height: 24, resizeMode: 'contain' },
  headerTitle: { fontSize: 18, fontWeight: '600' },

  banner: {
    backgroundColor: '#FFF8F2',
    padding: 20,
    alignItems: 'center',
    marginHorizontal:20,
    marginTop:10,
    borderRadius:15
  },
  bannerIcon: { width: 40, height: 40, resizeMode: 'contain' },
  bannerHeader: { fontSize: 18, fontWeight: 'bold', marginTop: 10, color: '#333' },
  bannerText: { fontSize: 14, color: '#666', textAlign: 'center', marginTop: 5 },

  container: { flex: 1 },
  contentContainer: { padding: 20, paddingBottom: 120 },

  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },

  attachmentBox: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#F9731680',
    borderStyle: 'dashed',
    borderRadius: 8,
    paddingVertical: 20,
    backgroundColor: 'white',
    marginBottom: 15,
  },

  attachmentText: { fontSize: 14, fontWeight: '600', color: '#333', marginTop: 5 },
  attachmentDetails: { fontSize: 12, color: '#999', marginTop: 2 },

  disclaimer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#FFF8F2',
    borderRadius: 8,
    marginBottom: 20,
  },
  infoIcon: { width: 16, height: 16, marginRight: 6, marginTop: 2 },
  disclaimerText: { fontSize: 12, color: '#F97316', flexShrink: 1 },

  footer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    justifyContent: 'space-between',
  },

  cancelButton: {
    flex: 1,
    marginRight: 10,
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    alignItems: 'center',
  },
  cancelButtonText: { fontSize: 16, fontWeight: 'bold', color: '#333' },

  submitButton: {
    flex: 1,
    marginLeft: 10,
    padding: 15,
    backgroundColor: '#F97316',
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
});
