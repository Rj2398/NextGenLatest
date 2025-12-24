import React, {useState, useMemo, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import UserHeader from '../../components/user/UserHeader';
import {SafeAreaView} from 'react-native-safe-area-context';

// --- Reusable Selection Modal Component ---
const SelectionModal = ({
  isVisible,
  onClose,
  onSelect,
  title,
  options,
  selectedValue,
}) => (
  <Modal
    animationType="slide"
    transparent={true}
    visible={isVisible}
    onRequestClose={onClose}>
    <View style={modalStyles.modalOverlay}>
      <View style={modalStyles.modalContainer}>
        <Text style={modalStyles.modalTitle}>{title}</Text>
        <ScrollView style={modalStyles.optionsList}>
          {options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                modalStyles.optionItem,
                selectedValue === option && modalStyles.selectedOption,
              ]}
              onPress={() => onSelect(option)}>
              <Text style={modalStyles.optionText}>{option}</Text>
              {selectedValue === option && (
                <Icon name="check-circle" size={20} color="#ff8c42" />
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>
        <TouchableOpacity style={modalStyles.closeButton} onPress={onClose}>
          <Text style={modalStyles.closeButtonText}>Close</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
);

// --- Main StudentDetails Component ---
const StudentDetails = ({navigation, route}) => {
  // 1. Get Parameters from Navigation
  const studentToEdit = route.params?.studentData;
  const isEditing = route.params?.isEditing || false;
  const screenTitle = route.params?.title || 'Student Details';

  // --- State Initialization ---
  const [studentName, setStudentName] = useState('');
  const [studentAge, setStudentAge] = useState('');
  const [studentGender, setStudentGender] = useState('Select gender');
  const [studentId, setStudentId] = useState('');
  const [studentGrade, setStudentGrade] = useState('Select grade');
  const [studentPassword, setStudentPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // State for Modal Visibility
  const [isGenderModalVisible, setIsGenderModalVisible] = useState(false);
  const [isGradeModalVisible, setIsGradeModalVisible] = useState(false);

  // 2. useEffect to Load Existing Data for Editing
  useEffect(() => {
    if (studentToEdit) {
      // Pre-fill fields from the passed data
      setStudentName(studentToEdit.name || '');
      setStudentAge(
        studentToEdit.data?.age ? String(studentToEdit.data.age) : '',
      );
      setStudentGender(studentToEdit.data?.gender || 'Select gender');
      setStudentId(studentToEdit.data?.studentId || '');
      setStudentGrade(studentToEdit.data?.grade || 'Select grade');

      // NOTE: Password is intentionally NOT pre-filled for security.
      setStudentPassword('');
    }
  }, [studentToEdit]);

  // Data for Dropdowns
  const genderOptions = ['Male', 'Female', 'Other', 'Prefer not to say'];
  const gradeOptions = [
    '1st Grade',
    '5th Grade',
    '10th Grade',
    '12th Grade',
    'College Freshman',
    'Graduate Student',
  ];

  // Handle Selection
  const handleSelectGender = gender => {
    setStudentGender(gender);
    setIsGenderModalVisible(false);
  };

  const handleSelectGrade = grade => {
    setStudentGrade(grade);
    setIsGradeModalVisible(false);
  };

  // Conditional Save Button Logic
  const isFormValid = useMemo(() => {
    // Required fields are Name, ID, and Password (if adding or if editing and field is filled)
    const isPasswordValid = isEditing
      ? studentPassword.length === 0 || studentPassword.length >= 8
      : studentPassword.length >= 8;

    return (
      studentName.trim() !== '' && studentId.trim() !== '' && isPasswordValid
    );
  }, [studentName, studentId, studentPassword, isEditing]);

  // Form Actions (Discard and Save)
  const handleSave = () => {
    if (!isFormValid) {
      Alert.alert(
        'Missing Fields',
        'Please fill out all required fields (*) and check password length (min 8 chars).',
      );
      return;
    }

    const action = isEditing ? 'Update' : 'Save';

    // Logic to save/update data (e.g., API call)
    const formData = {
      id: isEditing ? studentToEdit.id : undefined,
      studentName,
      studentAge,
      studentGender,
      studentId,
      studentGrade,
      studentPassword:
        studentPassword.length > 0 ? studentPassword : 'UNCHANGED', // Handle password update
    };

    Alert.alert(
      'Success',
      `Student information ${action.toLowerCase()}d successfully!`,
    );
    // Example: navigation.goBack();
  };

  const handleDiscard = () => {
    Alert.alert(
      'Discard Changes',
      'Are you sure you want to discard all changes?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Discard',
          onPress: () => {
            // Reset to initial state or navigate back
            if (isEditing) {
              // If editing, navigate back instead of resetting the form fields
              navigation.goBack();
            } else {
              setStudentName('');
              setStudentAge('');
              setStudentGender('Select gender');
              setStudentId('');
              setStudentGrade('Select grade');
              setStudentPassword('');
            }
          },
          style: 'destructive',
        },
      ],
    );
  };

  // --- Render ---
  return (
    <SafeAreaView style={styles.container}>
      {/* Dynamic Header Title */}
      <UserHeader title={screenTitle} onBackPress={() => navigation.goBack()} />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* === 1. Personal Information Section === */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Icon name="account" size={20} color="#ff8c42" />
            <Text style={styles.sectionTitle}>Personal Information</Text>
          </View>
          <Text style={styles.label}>Student Name *</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your full name"
            value={studentName}
            onChangeText={setStudentName}
          />

          <Text style={styles.label}>Student Age</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your age"
            keyboardType="numeric"
            value={studentAge}
            onChangeText={setStudentAge}
          />

          {/* Gender Dropdown */}
          <Text style={styles.label}>Gender</Text>
          <TouchableOpacity
            style={styles.dropdown}
            onPress={() => setIsGenderModalVisible(true)}>
            <Text
              style={[
                styles.dropdownText,
                studentGender !== 'Select gender' &&
                  styles.selectedDropdownText,
              ]}>
              {studentGender}
            </Text>
            <Icon name="chevron-down" size={20} color="#757575" />
          </TouchableOpacity>
        </View>

        {/* === 2. Academic Information Section === */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Icon name="school" size={20} color="#ff8c42" />
            <Text style={styles.sectionTitle}>Academic Information</Text>
          </View>

          <Text style={styles.label}>Student ID *</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your student ID"
            value={studentId}
            onChangeText={setStudentId}
            // Student ID is usually immutable/read-only when editing
            editable={!isEditing}
          />
          {isEditing && (
            <Text style={styles.passwordHint}>
              Student ID cannot be changed once created.
            </Text>
          )}

          {/* Grade Dropdown */}
          <Text style={styles.label}>Grade</Text>
          <TouchableOpacity
            style={styles.dropdown}
            onPress={() => setIsGradeModalVisible(true)}>
            <Text
              style={[
                styles.dropdownText,
                studentGrade !== 'Select grade' && styles.selectedDropdownText,
              ]}>
              {studentGrade}
            </Text>
            <Icon name="chevron-down" size={20} color="#757575" />
          </TouchableOpacity>
        </View>

        {/* === 3. Security Information Section === */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Icon name="lock" size={20} color="#ff8c42" />
            <Text style={styles.sectionTitle}>Security Information</Text>
          </View>

          <Text style={styles.label}>Student Password *</Text>
          <View style={styles.passwordInputContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder={
                isEditing
                  ? 'Enter new password or leave blank'
                  : 'Enter your password'
              }
              secureTextEntry={!isPasswordVisible}
              value={studentPassword}
              onChangeText={setStudentPassword}
            />
            <TouchableOpacity
              onPress={() => setIsPasswordVisible(!isPasswordVisible)}
              style={styles.eyeIcon}>
              <Icon
                name={isPasswordVisible ? 'eye-off' : 'eye'}
                size={24}
                color="#666"
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.passwordHint}>
            Password should be at least 8 characters long (required for new
            student)
          </Text>
        </View>

        <View style={{height: 100}} />
      </ScrollView>

      {/* === Fixed Bottom Buttons === */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.discardButton} onPress={handleDiscard}>
          <Text style={styles.discardButtonText}>Discard</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.saveButton, !isFormValid && styles.saveButtonDisabled]}
          onPress={handleSave}
          disabled={!isFormValid}>
          <Text style={styles.saveButtonText}>
            {isEditing ? 'Update' : 'Save'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* === Modals === */}
      <SelectionModal
        isVisible={isGenderModalVisible}
        onClose={() => setIsGenderModalVisible(false)}
        onSelect={handleSelectGender}
        title="Select Gender"
        options={genderOptions}
        selectedValue={studentGender}
      />

      <SelectionModal
        isVisible={isGradeModalVisible}
        onClose={() => setIsGradeModalVisible(false)}
        onSelect={handleSelectGrade}
        title="Select Grade"
        options={gradeOptions}
        selectedValue={studentGrade}
      />
    </SafeAreaView>
  );
};

export default StudentDetails;

// --- Stylesheet ---

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  scrollContent: {
    padding: 15,
    paddingBottom: 20,
  },
  sectionContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 10,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginTop: 15,
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333',
    borderWidth: 1,
    borderColor: '#eee',
  },
  dropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#eee',
  },
  dropdownText: {
    fontSize: 16,
    color: '#757575',
  },
  selectedDropdownText: {
    color: '#333',
  },
  passwordInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#eee',
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333',
  },
  eyeIcon: {
    paddingLeft: 10,
  },
  passwordHint: {
    fontSize: 12,
    color: '#999',
    marginTop: 5,
    marginLeft: 5,
  },
  footer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 15,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    justifyContent: 'space-between',
  },
  discardButton: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  discardButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold',
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#ff8c42', // Changed to active color
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
    marginLeft: 10,
  },
  saveButtonDisabled: {
    backgroundColor: '#ccc',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

// --- Modal Styles ---
const modalStyles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: '100%',
    padding: 20,
    maxHeight: '60%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  optionsList: {
    flexGrow: 1,
  },
  optionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  selectedOption: {
    backgroundColor: '#fff7f2',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#ff8c42',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
