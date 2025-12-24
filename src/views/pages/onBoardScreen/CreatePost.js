import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Switch,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

// --- Color Palette and Constants
const PRIMARY_ORANGE = '#F97316';
const DARK_GRAY_TEXT = '#1F2937';
const MEDIUM_GRAY_TEXT = '#4B5563';
const LIGHT_GRAY_TEXT = '#6B7280';
const INPUT_BORDER = '#D1D5DB';
const WHITE = '#FFFFFF';
const LIGHT_BG = '#F9FAFB';
const CHIP_BG = '#FEE2E2'; // Light red/orange for audience chips
const CHIP_TEXT = '#991B1B'; // Dark red/orange for audience chip text
const MEDIA_UPLOAD_BG = '#F3F4F6';

const CreatePost = ({navigation}) => {
  // Assume navigation prop for back arrow
  const [postTitle, setPostTitle] = useState('');
  const [audience, setAudience] = useState('');
  const [description, setDescription] = useState(
    "Students from grades 6-12 can participate in this year's annual science fair. Registration deadline is March 15th. Don't miss this opportunity to showcase your innovative projects and scientific discoveries! Key Details: - Registration: Until March 15th. *Required Fee",
  );
  const [allowComments, setAllowComments] = useState(true);
  const [sendNotification, setSendNotification] = useState(true);

  const toggleComments = () =>
    setAllowComments(previousState => !previousState);
  const toggleNotification = () =>
    setSendNotification(previousState => !previousState);

  const handlePublish = () => {
    console.log('Post Published!');
    // Logic to send data to API
  };

  const handleCancel = () => {
    console.log('Post Creation Canceled');
    // Logic to navigate back or close
    // navigation.goBack();
  };

  // Dummy data for uploaded files (to simulate the look)
  const [uploadedFiles, setUploadedFiles] = useState([
    {name: 'IMG_3312.jpeg', type: 'image'},
    {name: 'DOC.pdf', type: 'pdf'},
  ]);

  const removeFile = fileName => {
    setUploadedFiles(uploadedFiles.filter(file => file.name !== fileName));
  };

  return (
    <View style={styles.container}>
      {/* --- Top Header --- */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation?.goBack() || console.log('Go Back')}>
          <Ionicons name="arrow-back" size={24} color={DARK_GRAY_TEXT} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Create Post</Text>
        <View style={{width: 24}} /> {/* Spacer */}
      </View>

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* --- 1. Post Title --- */}
        <Text style={styles.inputLabel}>Post Title</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Enter post title..."
          placeholderTextColor={LIGHT_GRAY_TEXT}
          value={postTitle}
          onChangeText={setPostTitle}
        />

        {/* --- 2. Post Audience --- */}
        <Text style={styles.inputLabel}>Post Audience *</Text>
        <View style={styles.dropdownInput}>
          <TextInput
            style={styles.audienceText}
            placeholder="Select audience..."
            placeholderTextColor={LIGHT_GRAY_TEXT}
            editable={false}
          />
          <MaterialCommunityIcons
            name="chevron-down"
            size={24}
            color={LIGHT_GRAY_TEXT}
          />
        </View>

        {/* Audience Chips */}
        <View style={styles.chipContainer}>
          {/* School-wide Chip */}
          <View
            style={[
              styles.audienceChip,
              {backgroundColor: CHIP_BG, borderColor: CHIP_TEXT},
            ]}>
            <Text style={[styles.chipText, {color: CHIP_TEXT}]}>
              School-wide
            </Text>
            <TouchableOpacity style={{marginLeft: 5}}>
              <MaterialCommunityIcons
                name="close-circle"
                size={16}
                color={CHIP_TEXT}
              />
            </TouchableOpacity>
          </View>

          {/* Science Department Chip */}
          <View
            style={[
              styles.audienceChip,
              {backgroundColor: CHIP_BG, borderColor: CHIP_TEXT},
            ]}>
            <Text style={[styles.chipText, {color: CHIP_TEXT}]}>
              Science Department
            </Text>
            <TouchableOpacity style={{marginLeft: 5}}>
              <MaterialCommunityIcons
                name="close-circle"
                size={16}
                color={CHIP_TEXT}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* --- 3. Upload Media --- */}
        <Text style={styles.inputLabel}>Upload Media</Text>
        <TouchableOpacity style={styles.mediaUploadBox}>
          <MaterialCommunityIcons
            name="cloud-upload-outline"
            size={32}
            color={LIGHT_GRAY_TEXT}
          />
          <Text style={styles.uploadText}>
            Tap to add photos/videos or browse.
          </Text>
          <Text style={styles.uploadInfo}>
            Max 10MB file • JPG, PNG, MP4, PDF
          </Text>
        </TouchableOpacity>

        {/* Uploaded Files Preview */}
        <View style={styles.filesContainer}>
          {uploadedFiles.map((file, index) => (
            <View key={index} style={styles.filePill}>
              <Text style={styles.fileIcon}>
                {file.type === 'image' ? 'IMG' : 'PDF'}
              </Text>
              {file.type === 'image' && (
                <MaterialCommunityIcons
                  name="image"
                  size={20}
                  color={DARK_GRAY_TEXT}
                  style={{marginRight: 4}}
                />
              )}
              {file.type === 'pdf' && (
                <MaterialCommunityIcons
                  name="file-pdf-box"
                  size={20}
                  color={'#E53935'}
                  style={{marginRight: 4}}
                />
              )}
              <Text style={styles.fileName}>{file.name}</Text>
              <TouchableOpacity onPress={() => removeFile(file.name)}>
                <MaterialCommunityIcons
                  name="close-circle"
                  size={16}
                  color={MEDIUM_GRAY_TEXT}
                />
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* --- 4. Post Description (Rich Text Editor Mock) --- */}
        <Text style={styles.inputLabel}>Post Description *</Text>

        {/* Rich Text Toolbar Mock */}
        <View style={styles.toolbar}>
          <SimpleLineIcons
            name="pencil"
            size={18}
            color={MEDIUM_GRAY_TEXT}
            style={styles.toolbarIcon}
          />
          <SimpleLineIcons
            name="bold"
            size={18}
            color={MEDIUM_GRAY_TEXT}
            style={styles.toolbarIcon}
          />
          <SimpleLineIcons
            name="italic"
            size={18}
            color={MEDIUM_GRAY_TEXT}
            style={styles.toolbarIcon}
          />
          <MaterialCommunityIcons
            name="format-underline"
            size={22}
            color={MEDIUM_GRAY_TEXT}
            style={styles.toolbarIcon}
          />
          <MaterialCommunityIcons
            name="format-list-bulleted"
            size={22}
            color={MEDIUM_GRAY_TEXT}
            style={styles.toolbarIcon}
          />
          <MaterialCommunityIcons
            name="format-list-numbered"
            size={22}
            color={MEDIUM_GRAY_TEXT}
            style={styles.toolbarIcon}
          />
          <MaterialCommunityIcons
            name="format-quote-open"
            size={22}
            color={MEDIUM_GRAY_TEXT}
            style={styles.toolbarIcon}
          />
          <MaterialCommunityIcons
            name="link-variant"
            size={22}
            color={MEDIUM_GRAY_TEXT}
            style={styles.toolbarIcon}
          />
          <SimpleLineIcons
            name="draw"
            size={18}
            color={MEDIUM_GRAY_TEXT}
            style={styles.toolbarIcon}
          />
        </View>

        <TextInput
          style={[styles.textInput, styles.descriptionInput]}
          multiline
          value={description}
          onChangeText={setDescription}
        />
        <View style={styles.descriptionFooter}>
          <Text style={styles.requiredText}>* Required field</Text>
          <Text style={styles.charCount}>{description.length}/2000</Text>
        </View>

        {/* --- 5. Switches --- */}
        <View style={styles.switchRow}>
          <View>
            <Text style={styles.switchTitle}>Allow Comments</Text>
            <Text style={styles.switchSubtitle}>
              Let audience members comment on this post
            </Text>
          </View>
          <Switch
            onValueChange={toggleComments}
            value={allowComments}
            trackColor={{false: INPUT_BORDER, true: PRIMARY_ORANGE}}
            thumbColor={WHITE}
          />
        </View>

        <View style={styles.switchRow}>
          <View>
            <Text style={styles.switchTitle}>Send Push Notification</Text>
            <Text style={styles.switchSubtitle}>
              Notify selected audiences immediately
            </Text>
          </View>
          <Switch
            onValueChange={toggleNotification}
            value={sendNotification}
            trackColor={{false: INPUT_BORDER, true: PRIMARY_ORANGE}}
            thumbColor={WHITE}
          />
        </View>
      </ScrollView>

      {/* --- Footer Buttons --- */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.cancelButton]}
          onPress={handleCancel}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.publishButton]}
          onPress={handlePublish}>
          <Text style={styles.publishButtonText}>Publish Post</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// --- Stylesheet for CreatePost ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
  // --- Header ---
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: INPUT_BORDER,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: DARK_GRAY_TEXT,
  },
  // --- ScrollView Content ---
  scrollViewContent: {
    padding: 20,
    paddingBottom: 100, // Ensure space for footer buttons
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: DARK_GRAY_TEXT,
    marginBottom: 8,
    marginTop: 15,
  },
  textInput: {
    borderWidth: 1,
    borderColor: INPUT_BORDER,
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 14,
    color: DARK_GRAY_TEXT,
    backgroundColor: WHITE,
  },
  // --- Audience Dropdown ---
  dropdownInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: INPUT_BORDER,
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    backgroundColor: WHITE,
  },
  audienceText: {
    flex: 1,
    fontSize: 14,
    color: DARK_GRAY_TEXT,
    padding: 0, // Reset default padding from TextInput
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  audienceChip: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 15,
    paddingVertical: 4,
    paddingHorizontal: 10,
    marginRight: 8,
    marginBottom: 8,
  },
  chipText: {
    fontSize: 12,
    fontWeight: '500',
  },
  // --- Media Upload ---
  mediaUploadBox: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
    borderWidth: 2,
    borderColor: INPUT_BORDER,
    borderStyle: 'dashed',
    borderRadius: 8,
    backgroundColor: MEDIA_UPLOAD_BG,
  },
  uploadText: {
    fontSize: 14,
    fontWeight: '600',
    color: DARK_GRAY_TEXT,
    marginTop: 10,
  },
  uploadInfo: {
    fontSize: 12,
    color: LIGHT_GRAY_TEXT,
    marginTop: 5,
  },
  filesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  filePill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: LIGHT_BG,
    borderWidth: 1,
    borderColor: INPUT_BORDER,
    borderRadius: 8,
    padding: 8,
    marginRight: 8,
    marginBottom: 8,
  },
  fileIcon: {
    fontSize: 12,
    fontWeight: '700',
    color: DARK_GRAY_TEXT,
    marginRight: 4,
  },
  fileName: {
    fontSize: 12,
    color: DARK_GRAY_TEXT,
    marginRight: 8,
  },
  // --- Rich Text Editor Mock ---
  toolbar: {
    flexDirection: 'row',
    borderWidth: 1,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderColor: INPUT_BORDER,
    borderBottomWidth: 0,
    backgroundColor: LIGHT_BG,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  toolbarIcon: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  descriptionInput: {
    minHeight: 150,
    textAlignVertical: 'top',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    paddingVertical: 15,
  },
  descriptionFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  requiredText: {
    fontSize: 12,
    color: PRIMARY_ORANGE,
    fontWeight: '500',
  },
  charCount: {
    fontSize: 12,
    color: LIGHT_GRAY_TEXT,
  },
  // --- Switches ---
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: INPUT_BORDER,
  },
  switchTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: DARK_GRAY_TEXT,
  },
  switchSubtitle: {
    fontSize: 12,
    color: MEDIUM_GRAY_TEXT,
    marginTop: 2,
  },
  // --- Footer Buttons ---
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: INPUT_BORDER,
    backgroundColor: WHITE,
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: WHITE,
    borderWidth: 1,
    borderColor: INPUT_BORDER,
  },
  cancelButtonText: {
    color: DARK_GRAY_TEXT,
    fontSize: 16,
    fontWeight: '600',
  },
  publishButton: {
    backgroundColor: PRIMARY_ORANGE,
  },
  publishButtonText: {
    color: WHITE,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CreatePost;
