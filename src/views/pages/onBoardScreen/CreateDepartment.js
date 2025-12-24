import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {useToast} from 'react-native-toast-notifications';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Header from '../../components/Header';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';
import useCreate from '../../../hooks/useCreate';
import {showErrorToast, showSuccessToast} from '../../../config/Toast';
import Loader from '../../components/Loader';

// --- Centralized Color Definitions (Copied for standalone use) ---
const colors = {
  white: '#FFFFFF',
  black: '#3D3A3A',
  greyBackground: '#F5F5F5',
  orangePrimary: '#FF8719',
  textDark: '#1E1E1E',
  textGrey: '#5A5A5A',
  greenActive: '#28A745',
  textLightGrey: '#A0A0A0',
  borderLight: '#E0E0E0',
};

// --- Custom Switch Button Component (Copied from Manage.js) ---
const CustomSwitchButton = ({
  value,
  onValueChange,
  activeColor = colors.greenActive,
  inactiveColor = colors.textLightGrey,
}) => {
  const switchWidth = 48;
  const switchHeight = 28;
  const thumbSize = 24;
  const padding = 2; // For inner spacing

  const trackStyle = {
    width: switchWidth,
    height: switchHeight,
    borderRadius: switchHeight / 2,
    backgroundColor: value ? activeColor : inactiveColor,
    justifyContent: 'center',
    paddingHorizontal: padding,
    borderWidth: 1.5,
    borderColor: value ? activeColor : inactiveColor,
  };

  const thumbStyle = {
    width: thumbSize,
    height: thumbSize,
    borderRadius: thumbSize / 2,
    backgroundColor: colors.white,
    transform: [
      {translateX: value ? switchWidth - thumbSize - padding * 2 : 0},
    ],
    shadowColor: colors.black,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onValueChange}
      style={trackStyle}>
      <View style={thumbStyle} />
    </TouchableOpacity>
  );
};

// --- Component Definition ---
const CreateDepartment = ({navigation}) => {
  const toast = useToast();
  const {CreateDepartment, isLoading} = useCreate();
  //
  const {userInfo} = useSelector(({user}) => user);
  const [departmentName, setDepartmentName] = useState('');
  const [description, setDescription] = useState('');
  const [isActive, setIsActive] = useState(true);

  // Function to handle department submission
  const handleCreateDepartment = async () => {
    if (!departmentName.trim()) {
      showErrorToast(toast, 'Please enter your Departmant Name');
      return;
    }
    if (!description.trim()) {
      showErrorToast(toast, 'Please enter your Description');
      return;
    }
    const formData = new FormData();

    formData.append(
      'CreateDepartment.DepartmentInformation.name_of_department',
      departmentName,
    );

    formData.append(
      'CreateDepartment.DepartmentInformation.description',
      description,
    );

    formData.append(
      'CreateDepartment.DepartmentInformation.academia_id',
      userInfo?.academia?.id, // always send as string in FormData
    );

    formData.append(
      'CreateDepartment.DepartmentInformation.isactive',
      isActive, // boolean as string
    );
    try {
      const response = await CreateDepartment(formData);
      // console.log(response, 'department created response');
      navigation.goBack();
      showSuccessToast(
        toast,
        response?.data?.message || 'Department created!!',
      );
    } catch (error) {
      showErrorToast(toast, error.message || 'Faild to create department!!');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header (Based on the image_37b25e.png) */}
      <Header onBackPress={true} title={'Create Department'} />
      <Loader visible={isLoading} />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Department Name Card */}
        <View style={styles.inputCard}>
          <Text style={styles.inputLabel}>Name of Department</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={setDepartmentName}
            value={departmentName}
            placeholder="e.g. Grade I - Physics"
            placeholderTextColor={colors.textLightGrey}
          />

          {/* Description Card */}
          <Text style={[styles.inputLabel, {marginTop: 10}]}>Description</Text>
          <TextInput
            style={[styles.textInput, styles.descriptionInput]}
            onChangeText={setDescription}
            value={description}
            placeholder="Briefly describe this department"
            placeholderTextColor={colors.textLightGrey}
            multiline={true}
            numberOfLines={4}
            textAlignVertical="top" // Ensure text starts at the top
          />

          {/* Department Active Toggle */}
          <View style={[styles.toggleCard]}>
            <Text style={styles.toggleLabel}>Department Active</Text>
            <Text style={[styles.toggleSubLabel, {marginTop: 10}]}>
              Enable this department for use
            </Text>
            <CustomSwitchButton
              value={isActive}
              onValueChange={() => setIsActive(prev => !prev)}
              activeColor={colors.orangePrimary} // Used orangePrimary as per the image
              inactiveColor={colors.textLightGrey}
            />
          </View>

          {/* Create Button (Floating at the bottom, or just a large button in scroll view) */}
          <TouchableOpacity
            style={styles.createButton}
            onPress={handleCreateDepartment}>
            <Text style={styles.createButtonText}>Create Department</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// --- Stylesheet ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.greyBackground,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 12,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.black,
  },
  placeholder: {
    width: 24, // Same width as back button to keep title centered
  },
  scrollContent: {
    padding: 15,
    backgroundColor: '#FBF8F7',
    paddingBottom: 40, // Extra space at the bottom
  },
  // --- Card Styles ---
  inputCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  toggleCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    marginTop: 15,
    padding: 15,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  // --- Input Styles ---
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textDark,
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: colors.borderLight,
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    color: colors.textDark,
  },
  descriptionInput: {
    minHeight: 100, // Make description box larger
  },
  // --- Toggle Styles ---
  toggleLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textDark,
    flex: 1, // Take up available space
  },
  toggleSubLabel: {
    fontSize: 12,
    color: colors.textGrey,
    position: 'absolute', // Positioning sub-label below the main label
    top: 35,
    left: 15,
  },
  // --- Button Styles ---
  createButton: {
    backgroundColor: colors.orangePrimary,
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    shadowColor: colors.orangePrimary,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  createButtonText: {
    color: colors.white,
    fontSize: 17,
    fontWeight: '700',
  },
});

export default CreateDepartment;
