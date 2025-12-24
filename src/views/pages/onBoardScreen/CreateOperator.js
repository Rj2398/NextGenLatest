import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Platform,
  Switch,
  Alert,
  FlatList,
} from 'react-native';
import React, {use, useEffect, useState} from 'react';

// Icon imports
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../../../config/colors';
import {SafeAreaView} from 'react-native-safe-area-context';
import {showErrorToast, showSuccessToast} from '../../../config/Toast';
import {useToast} from 'react-native-toast-notifications';
import useCreate from '../../../hooks/useCreate';
import useGet from '../../../hooks/useGet';
import {useSelector} from 'react-redux';
import Loader from '../../components/Loader';

// --- Constants ---
const PRIMARY_COLOR = colors.PRIMARY_COLOR;
const BORDER_COLOR = colors.BORDER_COLOR;
const TEXT_GRAY = colors.TEXT_GRAY;
const LIGHT_GRAY_BG = colors.LIGHT_GRAY_BG;
const ERROR_RED = colors.ERROR_RED;
const INFO_BLUE_BG = colors.INFO_BLUE_BG;

const ROLES = [
  {
    id: 'fdfce039-3ea6-44e8-ba5b-ecf6a8c6ad2e',
    name: 'Admin',
    normalizedName: 'ADMIN',
  },
  {
    id: 'c1ea3be1-7782-4198-85c8-6708a24f4dc3',
    name: 'Academia_Admin',
    normalizedName: 'ACADEMIA_ADMIN',
  },
  {
    id: '825f2de0-1a1c-4070-862c-da9577663a7a',
    name: 'Academia_Manager',
    normalizedName: 'ACADEMIA_MANAGER',
  },
  {
    id: 'eea4bd86-712e-40e8-bf61-2f8cbff1e2ec',
    name: 'Academia_Operator',
    normalizedName: 'ACADEMIA_OPERATOR',
  },
  {
    id: 'ca39d715-e7b9-4e8d-a871-eb1e2ca19f1f',
    name: 'Merchant_Admin',
    normalizedName: 'MERCHANT_ADMIN',
  },
  {
    id: '37eea343-f84c-4e48-afa0-2a7c6c951d7a',
    name: 'Merchant_Manager',
    normalizedName: 'MERCHANT_MANAGER',
  },
  {
    id: 'db6f1ad0-f8c7-4c4b-84b1-77cfa1a7bb7b',
    name: 'Merchant_Operator',
    normalizedName: 'MERCHANT_OPERATOR',
  },
  {
    id: '6b8452a8-d113-4e94-b615-6edd4c43aad0',
    name: 'Student',
    normalizedName: 'STUDENT',
  },
  {
    id: 'a79570e5-682e-4b1f-aa8f-5078cd9c87b7',
    name: 'Merchant',
    normalizedName: 'MERCHANT',
  },
  {
    id: 'f5f541b3-6b2c-445f-a8ea-1dd62e5b44b0',
    name: 'User',
    normalizedName: 'USER',
  },
  {
    id: '3187dff2-1b80-4862-a6d7-eea62b2b81f3',
    name: 'Internal_Global_Admin',
    normalizedName: 'INTERNAL_GLOBAL_ADMIN',
  },
  {
    id: '4d67c1b2-700a-4cf2-b922-3ff10ad531ac',
    name: 'Internal_Regional_Admin',
    normalizedName: 'INTERNAL_REGIONAL_ADMIN',
  },
  {
    id: '1310456b-18d1-4581-8999-3a973e242ffd',
    name: 'OnboardingDepartment',
    normalizedName: 'ONBOARDINGDEPARTMENT',
  },
  {
    id: '114e7b90-eb08-42e8-9319-79d8ebe531fb',
    name: 'FinanceAndAccountingDepartment',
    normalizedName: 'FINANCEANDACCOUNTINGDEPARTMENT',
  },
  {
    id: '80c999cd-0a64-42d5-b459-547a7be0e753',
    name: 'MarketingDepartment',
    normalizedName: 'MARKETINGDEPARTMENT',
  },
  {
    id: '81a6905c-7c2f-4309-bf1c-875de437cf22',
    name: 'SupportStaff',
    normalizedName: 'SUPPORTSTAFF',
  },
  {
    id: '8f5e74d2-897c-4580-b762-f4e98acfa162',
    name: 'ManagementStaff',
    normalizedName: 'MANAGEMENTSTAFF',
  },
];

// --- Sub-Components ---

// Component for a single form field group
const FormField = ({
  label,
  placeholder,
  value,
  onChangeText,
  required = true,
  keyboardType = 'default',
}) => (
  <View style={styles.inputGroup}>
    <Text style={styles.label}>
      {label}
      {required && <Text style={styles.required}>*</Text>}
    </Text>
    <TextInput
      style={styles.inputField}
      placeholder={placeholder}
      placeholderTextColor={TEXT_GRAY}
      value={value}
      onChangeText={onChangeText}
      keyboardType={keyboardType}
    />
  </View>
);

const RoleOption = ({role, isSelected, onPress}) => {
  return (
    <TouchableOpacity
      style={[
        styles.roleCard,
        isSelected ? styles.roleCardSelected : styles.roleCardDefault,
      ]}
      onPress={() => onPress(role)}
      activeOpacity={0.8}>
      <View style={styles.roleHeader}>
        <Text style={styles.roleLabel}>{role.normalizedName}</Text>

        {isSelected && (
          <Feather name="check-circle" size={20} color={PRIMARY_COLOR} />
        )}
      </View>

      <Text style={styles.roleDescription}>{role.name}</Text>
    </TouchableOpacity>
  );
};

// --- Main Screen Component ---
const CreateOperator = ({navigation, route}) => {
  const {member, isUpdate} = route.params || {};

  const [SelctedfirstName, SelctedlastName] =
    member?.Teams_Search?.TeamList?.team_title?.split(' ') || [];

  const {userInfo} = useSelector(({user}) => user);
  const academia_id = userInfo?.academia?.id;

  const {CreateTeam, isLoading, updateTeam, loadingUpdateTeam} = useCreate();
  const {getDepartmantList, loadigDepartmentList} = useGet(academia_id);
  const toast = useToast();
  // State for Personal Information
  const [firstName, setFirstName] = useState(
    !member ? '' : SelctedfirstName || '',
  );
  const [lastName, setLastName] = useState(
    !member ? '' : SelctedlastName || '',
  );
  const [email, setEmail] = useState(
    !member ? '' : member?.Teams_Search?.TeamList?.team_email,
  );
  const [phoneNumber, setPhoneNumber] = useState(
    !member ? '' : member?.Teams_Search?.TeamList?.team_phone_number,
  );

  // State for Professional Information
  const [jobTitle, setJobTitle] = useState(
    !member ? '' : member?.Teams_Search?.TeamList?.job_title,
  );
  const departmentList = getDepartmantList?.items;

  const [selectedRoleId, setSelectedRoleId] = useState(
    !member
      ? ''
      : ROLES.find(
          item => item.id === member?.Teams_Search?.TeamList?.team_role,
        ),
  );
  const [dropdownVisible, setDropdownVisible] = useState(false);

  // Full objects (UI)

  const [selectedDepartmentIds, setSelectedDepartmentIds] = useState(
    member?.Teams_Search?.TeamList?.team_department
      ? member.Teams_Search.TeamList.team_department.map(String)
      : [],
  );

  const matchedDepartment = departmentList.filter(dept =>
    selectedDepartmentIds.includes(dept.id),
  );
  const [selectedDepartments, setSelectedDepartments] = useState(
    !member ? [] : matchedDepartment,
  );
  // Only IDs (API)

  const [preferredLanguage, setPreferredLanguage] = useState(
    !member
      ? ''
      : member?.Teams_Search?.TeamList?.language == 'EN'
      ? 'English'
      : 'Arabic',
  );
  const [selectedRole, setSelectedRole] = useState('Operator');

  // State for Additional Settings
  const [sendInvitation, setSendInvitation] = useState(true);

  const handleSelectDepartment = dept => {
    const isSelected = selectedDepartmentIds.includes(dept.id);

    if (isSelected) {
      setSelectedDepartments(prev => prev.filter(item => item.id !== dept.id));
      setSelectedDepartmentIds(prev => prev.filter(id => id !== dept.id));
    } else {
      setSelectedDepartments(prev => [...prev, dept]);
      setSelectedDepartmentIds(prev => [...prev, dept.id]);
    }
  };

  // Remove from tag
  const handleRemoveDepartment = id => {
    setSelectedDepartments(prev => prev.filter(item => item.id !== id));
    setSelectedDepartmentIds(prev => prev.filter(depId => depId !== id));
  };

  //

  // useEffect(() => {

  // },[])

  const handleSubmit = async () => {
    if (!isUpdate) {
      if (!firstName.trim()) {
        showErrorToast(toast, 'Please enter your first Name');
        return;
      } else if (!lastName.trim()) {
        showErrorToast(toast, 'Please enter your last Name');
        return;
      } else if (!email.trim()) {
        showErrorToast(toast, 'Please enter your email');
        return;
      } else if (!phoneNumber.trim()) {
        showErrorToast(toast, 'Please enter your phone number');
        return;
      } else if (!jobTitle.trim()) {
        showErrorToast(toast, 'Please enter your job title');
        return;
      } else if (!selectedRoleId) {
        showErrorToast(toast, 'Please select a role');
        return;
      } else if (selectedDepartmentIds.length === 0) {
        showErrorToast(toast, 'Please select at least one department');
        return;
      }
    }

    const formData = new FormData();

    // Personal Information
    formData.append('CreateUser.PersonalInformation.firstname', firstName);
    formData.append('CreateUser.PersonalInformation.lastname', lastName);
    formData.append('CreateUser.PersonalInformation.emailaddress', email);
    formData.append(
      'CreateUser.PersonalInformation.phonenumber',
      phoneNumber ?? 0,
    );
    formData.append(
      'CreateUser.PersonalInformation.academia_id',
      userInfo?.academia?.id, // number or string
    );

    // Professional Information
    formData.append('CreateUser.ProfessionalInformation.job_title', jobTitle);
    formData.append(
      'CreateUser.ProfessionalInformation.preferred_language',
      preferredLanguage === 'English' ? 'EN' : 'AE',
    );

    // Departments (ARRAY)
    selectedDepartmentIds.forEach((id, index) => {
      formData.append(
        `CreateUser.ProfessionalInformation.departments[${index}]`,
        id,
      );
    });

    // Role (SINGLE)
    formData.append(
      'CreateUser.RoleAssignment.role_radio',
      selectedRoleId?.id, // e.g. "ACADEMIA_ADMIN"
    );

    try {
      const response = isUpdate
        ? await updateTeam({team_Id: member?.userId, payload: formData})
        : await CreateTeam(formData);
      if (response.data) {
        if (isUpdate) {
          navigation.goBack();
          showSuccessToast(toast, 'Operator updated successful');
        } else {
          navigation.goBack();
          showSuccessToast(toast, 'Operator created successful');
        }
      }
    } catch (error) {
      showErrorToast(toast, 'something went wrong');
    }
  };

  const renderItem = ({item}) => (
    <RoleOption
      role={item}
      isSelected={selectedRoleId?.id === item?.id}
      onPress={setSelectedRoleId}
    />
  );

  return (
    <SafeAreaView style={styles.fullContainer}>
      {/* --- Fixed Header --- */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={styles.backButton}>
          <AntDesign name="left" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Create Operator</Text>
        <View style={{width: 24}} />
      </View>
      <Loader visible={isLoading} />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* --- Personal Information Section --- */}
        <Text style={styles.sectionHeader}>Personal Information</Text>
        <View style={styles.sectionCard}>
          <FormField
            label="First Name"
            placeholder="Enter first name"
            value={firstName}
            onChangeText={setFirstName}
          />
          <FormField
            label="Last Name"
            placeholder="Enter last name"
            value={lastName}
            onChangeText={setLastName}
          />
          <FormField
            label="Email Address"
            placeholder="Enter email address"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Phone Number</Text>
            <View style={styles.phoneInputContainer}>
              {/* Simplified Country Code Input */}
              {/* <View style={styles.countryCode}>
                <Text style={styles.countryCodeText}>+1</Text>
                <AntDesign
                  name="down"
                  size={14}
                  color="#333"
                  style={{marginLeft: 5}}
                />
              </View> */}
              <TextInput
                style={styles.phoneInputField}
                placeholder="Phone number"
                placeholderTextColor={TEXT_GRAY}
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                keyboardType="phone-pad"
              />
            </View>
          </View>
        </View>

        {/* --- Professional Information Section --- */}
        <Text style={styles.sectionHeader}>Professional Information</Text>
        <View style={styles.sectionCard}>
          <FormField
            label="Job Title"
            placeholder="Enter job title"
            value={jobTitle}
            onChangeText={setJobTitle}
          />

          {/* Department Selector */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>
              Department(s)<Text style={styles.required}>*</Text>
            </Text>

            <View style={styles.tagContainer}>
              {selectedDepartments?.map(dept => (
                <View key={dept.id} style={styles.deptTag}>
                  <Text style={styles.deptTagText}>{dept.label}</Text>
                  <TouchableOpacity
                    onPress={() => handleRemoveDepartment(dept.id)}
                    style={{marginLeft: 5}}>
                    <Feather name="x" size={14} color={PRIMARY_COLOR} />
                  </TouchableOpacity>
                </View>
              ))}
            </View>

            {/* Dropdown Toggle */}
            <TouchableOpacity
              style={styles.departmentDropdown}
              onPress={() => setDropdownVisible(prev => !prev)}>
              <Text style={styles.departmentText}>
                Select or deselect departments
              </Text>
              <AntDesign
                name={dropdownVisible ? 'up' : 'down'}
                size={16}
                color={TEXT_GRAY}
              />
            </TouchableOpacity>

            {/* Dropdown List */}
            {dropdownVisible && (
              <View
                style={{
                  borderWidth: 1,
                  borderColor: '#ddd',
                  borderRadius: 6,
                  marginTop: 8,
                  maxHeight: 200,
                }}>
                <ScrollView>
                  {departmentList.map(item => {
                    const isSelected = selectedDepartmentIds.includes(item.id);
                    return (
                      <TouchableOpacity
                        key={item.id}
                        style={[
                          styles.dropdownItem,
                          isSelected && styles.dropdownItemSelected,
                        ]}
                        onPress={() => handleSelectDepartment(item)}>
                        <Text
                          style={[
                            styles.dropdownItemText,
                            isSelected && {color: PRIMARY_COLOR},
                          ]}>
                          {item.label}
                        </Text>
                        {isSelected && (
                          <AntDesign
                            name="check"
                            size={16}
                            color={PRIMARY_COLOR}
                          />
                        )}
                      </TouchableOpacity>
                    );
                  })}
                </ScrollView>
              </View>
            )}
          </View>

          {/* Preferred Language Radio Buttons */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Preferred Language</Text>
            <View style={styles.radioContainer}>
              <TouchableOpacity
                style={styles.radioOption}
                onPress={() => setPreferredLanguage('English')}>
                <MaterialCommunityIcons
                  name={
                    preferredLanguage === 'English'
                      ? 'radiobox-marked'
                      : 'radiobox-blank'
                  }
                  size={20}
                  color={
                    preferredLanguage === 'English' ? PRIMARY_COLOR : TEXT_GRAY
                  }
                />
                <Text style={styles.radioText}>English</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.radioOption}
                onPress={() => setPreferredLanguage('Arabic')}>
                <MaterialCommunityIcons
                  name={
                    preferredLanguage === 'Arabic'
                      ? 'radiobox-marked'
                      : 'radiobox-blank'
                  }
                  size={20}
                  color={
                    preferredLanguage === 'Arabic' ? PRIMARY_COLOR : TEXT_GRAY
                  }
                />
                <Text style={styles.radioText}>Arabic</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* --- Role Assignment Section --- */}
        <Text style={styles.sectionHeader}>Role Assignment</Text>
        <View style={styles.sectionCard}>
          {/* {ROLES.map(role => (
            <RoleOption
              key={role.id}
              role={role}
              isSelected={selectedRole === role.id}
              onPress={setSelectedRole}
            />
          ))} */}

          <FlatList
            data={ROLES}
            keyExtractor={item => item.id}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            extraData={selectedRoleId}
          />
        </View>

        {/* --- Additional Settings Section --- */}
        <Text style={styles.sectionHeader}>Additional Settings</Text>
        <View style={[styles.sectionCard, {paddingVertical: 15}]}>
          {/* Send Invitation Email Toggle */}
          <View style={styles.toggleRow}>
            <View style={{flex: 1}}>
              <Text style={styles.toggleLabel}>Send Invitation Email</Text>
              <Text style={styles.toggleHelpText}>
                User will receive setup instructions via email.
              </Text>
            </View>
            <Switch
              trackColor={{false: BORDER_COLOR, true: PRIMARY_COLOR}}
              thumbColor={sendInvitation ? 'white' : '#f4f3f4'}
              ios_backgroundColor={BORDER_COLOR}
              onValueChange={setSendInvitation}
              value={sendInvitation}
            />
          </View>

          {/* Access Notice Box */}
          <View style={styles.noticeBox}>
            <Ionicons
              name="information-circle"
              size={20}
              color={PRIMARY_COLOR}
            />
            <Text style={styles.noticeText}>
              This operator will have access to student data and personal
              accounts. Ensure compliance with **privacy policies**.
            </Text>
          </View>
        </View>

        {/* Spacer for fixed footer */}
        <View style={{height: 100}} />
      </ScrollView>

      {/* --- Fixed Footer Buttons --- */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => {
            /* navigation.goBack() */
          }}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitText}>
            {isUpdate ? 'Update Operator' : 'Create Operator'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CreateOperator;

// --- Stylesheet ---
const styles = StyleSheet.create({
  fullContainer: {
    flex: 1,
    backgroundColor: LIGHT_GRAY_BG,
  },
  // --- Header Styles ---
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 15,
    backgroundColor: 'white',
    paddingTop: Platform.OS === 'ios' ? 50 : 15,
    borderBottomWidth: 1,
    borderBottomColor: BORDER_COLOR,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
  },
  backButton: {
    padding: 5,
  },
  scrollContent: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    marginTop: 15,
    marginBottom: 8,
  },
  sectionCard: {
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: BORDER_COLOR,
  },
  // --- Form Field Styles ---
  inputGroup: {
    paddingVertical: 10,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginBottom: 5,
  },
  required: {
    color: ERROR_RED,
  },
  inputField: {
    fontSize: 15,
    color: '#333',
    padding: 10,
    borderWidth: 1,
    borderColor: BORDER_COLOR,
    borderRadius: 8,
    backgroundColor: LIGHT_GRAY_BG,
    height: 45,
  },
  // --- Phone Input Specific Styles ---
  phoneInputContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: BORDER_COLOR,
    borderRadius: 8,
    backgroundColor: LIGHT_GRAY_BG,
    height: 45,
    overflow: 'hidden',
  },
  countryCode: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: 'white',
    borderRightWidth: 1,
    borderRightColor: BORDER_COLOR,
  },
  countryCodeText: {
    fontSize: 15,
    color: '#333',
    fontWeight: '500',
  },
  phoneInputField: {
    flex: 1,
    fontSize: 15,
    color: '#333',
    paddingHorizontal: 10,
  },
  // --- Department Tags ---
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  deptTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: PRIMARY_COLOR + '10', // Light orange background
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: PRIMARY_COLOR,
  },
  deptTagText: {
    fontSize: 13,
    color: PRIMARY_COLOR,
    fontWeight: '600',
  },
  departmentDropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: BORDER_COLOR,
    borderRadius: 8,
    backgroundColor: LIGHT_GRAY_BG,
    height: 45,
    marginTop: 5,
    width: '100%',
  },
  departmentText: {
    fontSize: 15,
    color: TEXT_GRAY,
  },
  // --- Language Radio Buttons ---
  radioContainer: {
    flexDirection: 'row',
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  radioText: {
    fontSize: 15,
    color: '#333',
    marginLeft: 5,
  },
  // --- Role Assignment Cards ---
  roleCard: {
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    position: 'relative',
  },
  roleCardDefault: {
    backgroundColor: LIGHT_GRAY_BG,
    borderWidth: 1,
    borderColor: BORDER_COLOR,
  },
  roleCardSelected: {
    backgroundColor: PRIMARY_COLOR + '10', // Light orange
    borderWidth: 1,
    borderColor: PRIMARY_COLOR,
  },
  roleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  roleLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    marginRight: 10,
  },
  roleAccessTag: {
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  roleAccessText: {
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  roleDescription: {
    fontSize: 13,
    color: TEXT_GRAY,
    paddingRight: 30, // Make room for the checkmark
  },
  checkIcon: {
    position: 'absolute',
    right: 15,
    top: 15,
  },
  // --- Additional Settings ---
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: BORDER_COLOR,
    marginBottom: 10,
  },
  toggleLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
  },
  toggleHelpText: {
    fontSize: 12,
    color: TEXT_GRAY,
    marginTop: 2,
  },
  noticeBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: INFO_BLUE_BG,
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  noticeText: {
    fontSize: 13,
    color: '#333',
    marginLeft: 10,
    flexShrink: 1,
  },
  // --- Fixed Footer Buttons ---
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    padding: 15,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: BORDER_COLOR,
    paddingBottom: Platform.OS === 'ios' ? 30 : 15,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: BORDER_COLOR,
    paddingVertical: 12,
    marginRight: 10,
    alignItems: 'center',
  },
  cancelText: {
    fontSize: 16,
    fontWeight: '600',
    color: TEXT_GRAY,
  },
  submitButton: {
    flex: 1,
    backgroundColor: PRIMARY_COLOR,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  submitText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },

  dropdownItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
  },
  dropdownItemSelected: {
    backgroundColor: '#F0F6FF',
  },
  dropdownItemText: {
    fontSize: 14,
  },
});
