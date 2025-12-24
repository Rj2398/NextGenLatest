//
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  FlatList,
} from 'react-native';
import React, {useState} from 'react';

// Icon imports (as requested)
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// 🎯 Using react-native-image-crop-picker as requested
import ImagePicker from 'react-native-image-crop-picker';
import colors from '../../../config/colors';

// --- Constants ---
const PRIMARY_COLOR = colors.PRIMARY_COLOR;
const BORDER_COLOR = colors.BORDER_COLOR;
const TEXT_GRAY = colors.TEXT_GRAY;
const PLACEHOLDER_GRAY = colors.PLACEHOLDER_GRAY;

const CreateTicket = ({navigation}) => {
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [department, setDepartment] = useState('Support');
  const [referenceId, setReferenceId] = useState('');
  // Files stored will have properties like: path (uri), size, mime, filename (on iOS)
  const [attachments, setAttachments] = useState([]);

  // --- Attachment Logic (Using react-native-image-crop-picker) ---
  const handleUploadFiles = async () => {
    if (attachments.length >= 5) return;

    try {
      // ⚠️ Using openPicker with 'any' to allow selecting images, videos, and files
      const newFiles = await ImagePicker.openPicker({
        multiple: true,
        mediaType: 'any', // Allows selecting any type of media/file
        maxFiles: 5 - attachments.length,
        // The object returned by this library has a 'path' property for the URI.
      });

      // Map the returned objects to ensure consistent structure, and add a name property if missing
      const processedFiles = newFiles.map(file => ({
        uri: file.path,
        name: file.filename || file.path.split('/').pop(), // Use filename or derive from path
        size: file.size,
        type: file.mime,
      }));

      // Update state with new files
      setAttachments(prevAttachments => [
        ...prevAttachments,
        ...processedFiles,
      ]);
    } catch (err) {
      // Library cancels if user dismisses the picker
      if (err.message.includes('User cancelled image selection')) {
        console.log('User cancelled image/file picker');
      } else {
        console.error('File Picker Error:', err);
      }
    }
  };

  const handleRemoveAttachment = uri => {
    setAttachments(prevAttachments =>
      prevAttachments.filter(file => file.uri !== uri),
    );
  };

  const AttachmentItem = ({item}) => (
    <View style={styles.attachmentItem}>
      <MaterialCommunityIcons
        // Use logic to determine icon based on file type (mime or name)
        name={
          item.name.toLowerCase().endsWith('.pdf')
            ? 'file-pdf-box'
            : 'file-image'
        }
        size={20}
        color={PRIMARY_COLOR}
      />
      <Text style={styles.attachmentText} numberOfLines={1}>
        {item.name}
      </Text>
      <TouchableOpacity
        onPress={() => handleRemoveAttachment(item.uri)}
        style={styles.removeButton}>
        <AntDesign name="closecircle" size={16} color={TEXT_GRAY} />
      </TouchableOpacity>
    </View>
  );

  // --- Main Render Function ---
  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <AntDesign name="left" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Create Ticket</Text>
        <View style={{width: 24}} />
      </View>

      <ScrollView style={styles.container}>
        {/* Subject Field */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>
            Subject<Text style={styles.required}>*</Text>
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Brief description of your issue"
            placeholderTextColor={PLACEHOLDER_GRAY}
            value={subject}
            onChangeText={setSubject}
          />
        </View>

        {/* Description Field */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>
            Description<Text style={styles.required}>*</Text>
          </Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Please provide detailed information..."
            placeholderTextColor={PLACEHOLDER_GRAY}
            multiline
            numberOfLines={5}
            value={description}
            onChangeText={setDescription}
            textAlignVertical="top"
          />
        </View>

        {/* Priority Selection */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Priority</Text>
          <View style={styles.priorityContainer}>
            {['Low', 'Medium', 'High', 'Urgent'].map((item, index) => (
              <TouchableOpacity
                key={item}
                style={[
                  styles.priorityButton,
                  index < 3 && {
                    borderRightWidth: 1,
                    borderRightColor: BORDER_COLOR,
                  },
                  priority === item && styles.priorityButtonSelected,
                ]}
                onPress={() => setPriority(item)}>
                <Text
                  style={[
                    styles.priorityText,
                    priority === item && styles.priorityTextSelected,
                  ]}>
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Department Dropdown (Placeholder) */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Department</Text>
          <TouchableOpacity
            style={styles.departmentDropdown}
            onPress={() => alert('Open Department Picker')}>
            <Text style={styles.departmentText}>{department}</Text>
            <Feather name="chevron-down" size={20} color={TEXT_GRAY} />
          </TouchableOpacity>
        </View>

        {/* Reference ID */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Reference ID</Text>
          <TextInput
            style={styles.input}
            placeholder="Order/Settlement ID (Optional)"
            placeholderTextColor={PLACEHOLDER_GRAY}
            value={referenceId}
            onChangeText={setReferenceId}
          />
          <Text style={styles.helperText}>
            Enter order number, transaction ID, or any relevant reference.
          </Text>
        </View>

        {/* Attachments Section */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Attachments ({attachments.length}/5)</Text>
          <TouchableOpacity
            style={styles.attachmentArea}
            onPress={attachments.length < 5 ? handleUploadFiles : null}
            activeOpacity={attachments.length < 5 ? 0.7 : 1}>
            <Feather
              name="upload-cloud"
              size={30}
              color={attachments.length < 5 ? PLACEHOLDER_GRAY : BORDER_COLOR}
            />
            <Text
              style={[
                styles.uploadText,
                attachments.length === 5 && {color: BORDER_COLOR},
              ]}>
              {attachments.length < 5
                ? 'Tap to upload files'
                : 'Maximum 5 files reached'}
            </Text>
            <Text style={styles.uploadHint}>
              JPG, PNG, PDF up to 10MB each (max 5 files)
            </Text>
          </TouchableOpacity>
        </View>

        {/* Display List of Attached Files */}
        <FlatList
          data={attachments}
          keyExtractor={item => item.uri}
          renderItem={({item}) => <AttachmentItem item={item} />}
          scrollEnabled={false}
          style={attachments.length > 0 && {marginBottom: 20}}
        />

        <View style={{height: 20}} />
      </ScrollView>

      {/* Fixed Bottom Buttons */}
      <View style={styles.bottomButtonsContainer}>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => console.log('Cancel')}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.createButton}
          onPress={() => alert('Ticket Submitted!')}>
          <Text style={styles.createButtonText}>Create Ticket</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default CreateTicket;

// --- Stylesheet (omitted for brevity, assume it's the same as before) ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 15,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: BORDER_COLOR,
    paddingTop: Platform.OS === 'ios' ? 50 : 15,
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  required: {
    color: 'red',
  },
  input: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: BORDER_COLOR,
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 15,
    color: '#333',
  },
  textArea: {
    height: 120,
    paddingTop: 12,
    lineHeight: 20,
  },
  priorityContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: BORDER_COLOR,
    overflow: 'hidden',
  },
  priorityButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  priorityButtonSelected: {
    backgroundColor: PRIMARY_COLOR,
    borderColor: PRIMARY_COLOR,
  },
  priorityText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
  },
  priorityTextSelected: {
    color: 'white',
  },
  departmentDropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: BORDER_COLOR,
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  departmentText: {
    fontSize: 15,
    color: '#333',
  },
  helperText: {
    fontSize: 13,
    color: TEXT_GRAY,
    marginTop: 5,
    marginLeft: 5,
  },
  attachmentArea: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: BORDER_COLOR,
    borderStyle: 'dashed',
    borderRadius: 8,
    paddingVertical: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadText: {
    fontSize: 15,
    fontWeight: '600',
    color: TEXT_GRAY,
    marginTop: 10,
  },
  uploadHint: {
    fontSize: 13,
    color: PLACEHOLDER_GRAY,
    marginTop: 5,
    textAlign: 'center',
  },
  attachmentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: BORDER_COLOR,
  },
  attachmentText: {
    flex: 1,
    fontSize: 14,
    color: '#333',
    marginLeft: 10,
    marginRight: 10,
  },
  removeButton: {
    padding: 5,
  },
  bottomButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 15,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: BORDER_COLOR,
    paddingBottom: Platform.OS === 'ios' ? 30 : 15,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: BORDER_COLOR,
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
    marginRight: 10,
  },
  cancelButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: '600',
  },
  createButton: {
    flex: 1,
    backgroundColor: PRIMARY_COLOR,
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
    marginLeft: 10,
  },
  createButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
