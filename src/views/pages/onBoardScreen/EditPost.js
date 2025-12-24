import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Switch,
  Image,
  Modal, // For the Audience selection
} from 'react-native';
import React, {useState, useCallback} from 'react';

// --- External Library Imports ---
import ImagePicker from 'react-native-image-crop-picker';

// --- Icon Imports ---
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

// --- Color Palette and Constants ---
const PRIMARY_ORANGE = '#F97316';
const DARK_GRAY_TEXT = '#1F2937';
const MEDIUM_GRAY_TEXT = '#4B5563';
const LIGHT_GRAY_TEXT = '#6B7280';
const BORDER_COLOR = '#D1D5DB';
const WHITE = '#FFFFFF';
const LIGHT_BG = '#F9FAFB';
const CHIP_BG_ACTIVE = '#FEF3C7';
const CHIP_TEXT_ACTIVE = '#92400E';
const TAG_BG = '#F0F9FF';
const TAG_TEXT = '#0B6699';
const CHIP_BG = '#FEE2E2';
const CHIP_TEXT = '#991B1B';
const MEDIA_UPLOAD_BG = '#F3F4F6';
const AUDIENCE_OPTIONS = [
  'School-wide',
  'Grade 6',
  'Grade 7',
  'Grade 8',
  'Science Department',
  'Math Club',
];

const {width} = Dimensions.get('window');

// --- Initial Data for the Edit Post Screen ---
const initialPostData = {
  postTitle: 'Science Fair 2024 - Registration Now Open!',
  audience: ['All Grades', 'Science Department', 'Grade 6-12'],
  files: [
    {
      name: 'image_8182.jpg',
      uri: 'https://picsum.photos/id/238/600/400',
      mime: 'image/jpeg',
      type: 'image',
    },
    {
      name: 'docs_annual_report.pdf',
      uri: 'file://path/to/doc.pdf',
      mime: 'application/pdf',
      type: 'document',
    },
  ],
  description:
    "Students from grades 6-12 can participate in this year's annual science fair. Registration deadline is March 15th...",
  tags: ['Sciencefair', 'Competition', 'Registration'], // Removed # for input flexibility
  visibility: 'Public',
  allowComments: true,
  isPinned: true,
};

// --------------------------------------------------------------------------------
// 1. Audience Selection Modal Component
// --------------------------------------------------------------------------------

const AudienceModal = ({isVisible, onClose, onSelect, selectedAudiences}) => {
  // Ensures single selection for 'All Grades' (optional logic based on UX)
  const handleSelect = audience => {
    if (audience === 'All Grades') {
      onSelect(['All Grades']); // Replace all with just 'All Grades'
    } else if (selectedAudiences.includes('All Grades')) {
      onSelect([audience]); // Replace 'All Grades' with the new selection
    } else {
      // Toggle selection for others
      onSelect(
        selectedAudiences.includes(audience)
          ? selectedAudiences.filter(a => a !== audience)
          : [...selectedAudiences, audience],
      );
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}>
      <TouchableOpacity
        style={styles.modalOverlay}
        onPress={onClose}
        activeOpacity={1}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Select Post Audience</Text>
          <ScrollView style={{maxHeight: 250}}>
            {AUDIENCE_OPTIONS.map((audience, index) => {
              const isSelected = selectedAudiences.includes(audience);
              return (
                <TouchableOpacity
                  key={index}
                  style={styles.modalOption}
                  onPress={() => handleSelect(audience)}>
                  <Text style={styles.modalOptionText}>{audience}</Text>
                  {isSelected && (
                    <Ionicons
                      name="checkmark-circle"
                      size={20}
                      color={PRIMARY_ORANGE}
                    />
                  )}
                </TouchableOpacity>
              );
            })}
          </ScrollView>
          <TouchableOpacity style={styles.modalCloseButton} onPress={onClose}>
            <Text style={styles.modalCloseButtonText}>Done</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

// --------------------------------------------------------------------------------
// 2. Main EditPost Component
// --------------------------------------------------------------------------------

const EditPost = () => {
  const [postTitle, setPostTitle] = useState(initialPostData.postTitle);
  const [audience, setAudience] = useState(initialPostData.audience);
  const [files, setFiles] = useState(initialPostData.files);
  const [description, setDescription] = useState(initialPostData.description);
  const [tags, setTags] = useState(initialPostData.tags); // Tags are now an array
  const [newTagInput, setNewTagInput] = useState('');
  const [visibility] = useState(initialPostData.visibility); // Visibility is fictional
  const [allowComments, setAllowComments] = useState(
    initialPostData.allowComments,
  );
  const [isModalVisible, setIsModalVisible] = useState(false); // Modal state

  // --- Functional Handlers ---

  const handleAudienceUpdate = useCallback(newSelection => {
    // Allows the modal to update the audience array directly
    setAudience(newSelection);
  }, []);

  const removeAudience = item => {
    setAudience(audience.filter(a => a !== item));
  };

  const removeFile = fileName => {
    setFiles(files.filter(file => file.name !== fileName));
  };

  // 🌟 FUNCTIONAL TAGS: Logic to add a tag
  const addTag = useCallback(
    tagText => {
      const formattedTag = tagText
        .trim()
        .replace(/[.,]/g, '')
        .replace(/^#/, ''); // Remove #, comma, space
      if (
        formattedTag &&
        tags.findIndex(t => t.toLowerCase() === formattedTag.toLowerCase()) ===
          -1
      ) {
        setTags(prev => [...prev, formattedTag]);
      }
    },
    [tags],
  );

  const removeTag = tagToRemove => {
    setTags(tags.filter(t => t !== tagToRemove));
  };

  const handleTagInputSubmit = () => {
    if (newTagInput) {
      addTag(newTagInput);
      setNewTagInput('');
    }
  };

  // 🌟 FUNCTIONAL UPLOAD: Using react-native-image-crop-picker
  const handleMediaUpload = () => {
    ImagePicker.openPicker({
      multiple: true,
      mediaType: 'any',
      cropping: false, // Cropping usually not needed for docs/multi-select
      maxFiles: 5,
    })
      .then(images => {
        const newFiles = Array.isArray(images) ? images : [images];
        const formattedFiles = newFiles.map(file => ({
          name: file.filename || file.path.split('/').pop(),
          type: file.mime.startsWith('image')
            ? 'image'
            : file.mime.startsWith('video')
            ? 'video'
            : 'document',
          uri: file.path,
          mime: file.mime,
        }));
        setFiles(prev => [...prev, ...formattedFiles]);
      })
      .catch(error => {
        if (error.code !== 'E_PICKER_CANCELLED') {
          console.log('Image picker error:', error);
        }
      });
  };

  // --- Render Sections (Updated) ---

  const renderAudienceChips = () => (
    <View style={styles.chipContainer}>
      {audience.map((item, index) => (
        <View
          key={index}
          style={[
            styles.audienceChip,
            {backgroundColor: CHIP_BG, borderColor: CHIP_TEXT},
          ]}>
          <Text style={[styles.chipText, {color: CHIP_TEXT}]}>{item}</Text>
          <TouchableOpacity
            style={{marginLeft: 5}}
            onPress={() => removeAudience(item)}>
            <MaterialCommunityIcons
              name="close-circle"
              size={16}
              color={CHIP_TEXT}
            />
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );

  const renderUploadedFiles = () => (
    <View style={styles.filesContainer}>
      {/* Existing and Newly Added Files */}
      {files.map((file, index) => (
        <View key={index} style={styles.fileBox}>
          <View style={styles.filePreview}>
            {file.type === 'image' || file.mime.startsWith('image') ? (
              <Image
                source={{uri: file.uri}}
                style={styles.fileImage}
                resizeMode="cover"
              />
            ) : (
              <MaterialCommunityIcons
                name="file-document"
                size={32}
                color={PRIMARY_ORANGE}
              />
            )}
          </View>
          <TouchableOpacity
            style={styles.fileRemoveButton}
            onPress={() => removeFile(file.name)}>
            <MaterialCommunityIcons
              name="close-circle"
              size={20}
              color={PRIMARY_ORANGE}
            />
          </TouchableOpacity>
        </View>
      ))}

      {/* Add More Media Button */}
      <TouchableOpacity
        style={[styles.fileBox, styles.mediaUploadBox]}
        onPress={handleMediaUpload}>
        <MaterialCommunityIcons name="plus" size={24} color={LIGHT_GRAY_TEXT} />
        <Text style={styles.uploadTextSmall}>Add more photos/videos</Text>
      </TouchableOpacity>
    </View>
  );

  const renderTags = () => (
    <View style={styles.tagChipsContainer}>
      {tags.map((tag, index) => (
        <View key={index} style={[styles.audienceChip, styles.tagDisplayChip]}>
          <Text style={[styles.chipText, {color: DARK_GRAY_TEXT}]}>#{tag}</Text>
          <TouchableOpacity
            style={{marginLeft: 5}}
            onPress={() => removeTag(tag)}>
            <MaterialCommunityIcons
              name="close-circle"
              size={16}
              color={DARK_GRAY_TEXT}
            />
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );

  const renderPostStatus = () => (
    /* ... (metrics JSX is unchanged) ... */
    <View style={styles.statusRow}>
      <View style={styles.statusItem}>
        <Text style={styles.statusValue}>233</Text>
        <Text style={styles.statusLabel}>Total Views</Text>
      </View>
      <View style={styles.statusItem}>
        <Text style={styles.statusValue}>18</Text>
        <Text style={styles.statusLabel}>Comments</Text>
      </View>
      <View style={styles.statusItem}>
        <Text style={styles.statusValue}>3h</Text>
        <Text style={styles.statusLabel}>Published</Text>
      </View>
      <View
        style={[
          styles.statusChip,
          {backgroundColor: TAG_BG, borderColor: TAG_TEXT},
        ]}>
        <Text style={[styles.statusChipText, {color: TAG_TEXT}]}>
          Published
        </Text>
      </View>
      <View
        style={[
          styles.statusChip,
          {backgroundColor: CHIP_BG_ACTIVE, borderColor: CHIP_TEXT_ACTIVE},
        ]}>
        <FontAwesome
          name="thumb-tack"
          size={12}
          color={CHIP_TEXT_ACTIVE}
          style={{marginRight: 4}}
        />
        <Text style={[styles.statusChipText, {color: CHIP_TEXT_ACTIVE}]}>
          Pinned
        </Text>
      </View>
    </View>
  );

  // --- Main Render ---
  return (
    <View style={styles.mainContainer}>
      {/* 1. HEADER */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <MaterialCommunityIcons
            name="arrow-left"
            size={24}
            color={DARK_GRAY_TEXT}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Post</Text>
        <View style={styles.headerRightPlaceholder} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* Post Title */}
        <Text style={styles.inputLabel}>Post Title</Text>
        <TextInput
          style={styles.textInput}
          value={postTitle}
          onChangeText={setPostTitle}
        />

        {/* 🌟 FUNCTIONAL POST AUDIENCE */}
        <Text style={styles.inputLabel}>Post Audience</Text>
        <TouchableOpacity
          style={styles.dropdownInput}
          onPress={() => setIsModalVisible(true)}>
          <Text style={styles.audienceText} numberOfLines={1}>
            {audience.length > 0
              ? audience.join(', ')
              : 'Select additional audiences...'}
          </Text>
          <MaterialCommunityIcons
            name="chevron-down"
            size={24}
            color={LIGHT_GRAY_TEXT}
          />
        </TouchableOpacity>
        {renderAudienceChips()}

        {/* 🌟 FUNCTIONAL UPLOAD MEDIA (Crop Picker) */}
        <Text style={styles.inputLabel}>Upload Media</Text>
        {renderUploadedFiles()}
        <Text style={styles.uploadHelperText}>
          Max 10MB file • JPG, PNG, MP4, PDF
        </Text>

        {/* Post Description */}
        <Text style={styles.inputLabel}>Post Description *</Text>
        <View style={styles.toolbar}>
          {[
            'format-bold',
            'format-italic',
            'format-underline',
            'format-list-bulleted',
            'format-align-left',
            'link',
            'eraser',
          ].map((icon, index) => (
            <MaterialCommunityIcons
              key={index}
              name={icon}
              size={20}
              color={MEDIUM_GRAY_TEXT}
              style={styles.toolbarIcon}
            />
          ))}
        </View>
        <TextInput
          style={[styles.textInput, styles.descriptionInput]}
          multiline
          value={description}
          onChangeText={setDescription}
        />
        <View style={styles.descriptionFooter}>
          <Text style={styles.charCount}>{description.length}/2000</Text>
        </View>

        {/* 🌟 FUNCTIONAL TAGS */}
        <Text style={styles.inputLabel}>Tags (Optional)</Text>
        {renderTags()}
        <TextInput
          style={styles.textInput}
          placeholder="Add tags... (e.g., #event, #deadline)"
          placeholderTextColor={LIGHT_GRAY_TEXT}
          value={newTagInput}
          onChangeText={setNewTagInput}
          onSubmitEditing={handleTagInputSubmit} // Add tag on 'Enter'
          onBlur={handleTagInputSubmit} // Add tag on focus loss
        />
        <Text style={styles.tagHelperText}>
          Press Enter or use a space/comma to add tags. Use # prefix for
          hashtags.
        </Text>

        {/* 🌟 VISIBILITY CHECK (Fictional UI) */}
        <View style={styles.visibilityRow}>
          <Text style={styles.inputLabel}>Visibility</Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={styles.statusChipActive}>
              <Text style={styles.statusChipTextActive}>{visibility}</Text>
            </View>
            <TouchableOpacity onPress={() => console.log('Change Visibility')}>
              <Text style={styles.changeLink}>Change</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.helperText}>
          Currently visible to all selected audiences
        </Text>

        {/* Post Status (Read-Only Metrics) */}
        {renderPostStatus()}

        {/* 🌟 FUNCTIONAL COMMENT ALLOW SWITCH */}
        <View style={styles.switchRow}>
          <View>
            <Text style={styles.switchTitle}>Allow Comments</Text>
            <Text style={styles.switchSubtitle}>
              Let audience members comment on this post
            </Text>
          </View>
          <Switch
            value={allowComments}
            onValueChange={setAllowComments}
            trackColor={{false: BORDER_COLOR, true: PRIMARY_ORANGE}}
            thumbColor={WHITE}
          />
        </View>

        <View style={{height: 100}} />
      </ScrollView>

      {/* 3. FIXED FOOTER */}
      <View style={styles.buttonContainerFixed}>
        <TouchableOpacity
          style={styles.archiveButton}
          onPress={() => console.log('Archive')}>
          <Text style={styles.archiveButtonText}>Archive</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.updateButton]}
          onPress={() => console.log('Update Post')}>
          <Text style={styles.updateButtonText}>Update Post</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => console.log('Delete')}>
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>

      {/* 4. Audience Modal */}
      <AudienceModal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onSelect={handleAudienceUpdate}
        selectedAudiences={audience}
      />
    </View>
  );
};

export default EditPost;

// --------------------------------------------------------------------------------
// 4. Stylesheets
// --------------------------------------------------------------------------------

const styles = StyleSheet.create({
  mainContainer: {flex: 1, backgroundColor: LIGHT_BG},
  // --- Header ---
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 12,
    backgroundColor: WHITE,
    borderBottomColor: BORDER_COLOR,
    borderBottomWidth: 1,
  },
  backButton: {padding: 5},
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: DARK_GRAY_TEXT,
    flex: 1,
    textAlign: 'center',
  },
  headerRightPlaceholder: {width: 34},

  // --- ScrollView Content ---
  scrollViewContent: {padding: 20},
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: DARK_GRAY_TEXT,
    marginBottom: 8,
    marginTop: 15,
  },
  textInput: {
    borderWidth: 1,
    borderColor: BORDER_COLOR,
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 14,
    color: DARK_GRAY_TEXT,
    backgroundColor: WHITE,
  },

  // --- Audience ---
  dropdownInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: BORDER_COLOR,
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    backgroundColor: WHITE,
  },
  audienceText: {flex: 1, fontSize: 14, color: MEDIUM_GRAY_TEXT, padding: 0},
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
    marginBottom: 5,
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
  chipText: {fontSize: 13, fontWeight: '500'},

  // --- Upload Media ---
  filesContainer: {flexDirection: 'row', flexWrap: 'wrap', marginTop: 10},
  fileBox: {
    width: width / 4 - 15,
    height: width / 4 - 15,
    borderRadius: 8,
    backgroundColor: MEDIA_UPLOAD_BG,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  filePreview: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fileImage: {width: '100%', height: '100%'},
  fileRemoveButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: WHITE,
    borderRadius: 10,
    zIndex: 1,
  },
  mediaUploadBox: {
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: BORDER_COLOR,
  },
  uploadTextSmall: {
    fontSize: 11,
    color: LIGHT_GRAY_TEXT,
    textAlign: 'center',
    marginTop: 5,
    paddingHorizontal: 5,
  },
  uploadHelperText: {fontSize: 12, color: LIGHT_GRAY_TEXT, marginTop: 5},

  // --- Description (Text Editor) ---
  toolbar: {
    flexDirection: 'row',
    backgroundColor: WHITE,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderBottomWidth: 0,
    borderColor: BORDER_COLOR,
    marginTop: 15,
  },
  toolbarIcon: {paddingHorizontal: 6},
  descriptionInput: {
    minHeight: 120,
    textAlignVertical: 'top',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    paddingVertical: 15,
  },
  descriptionFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 5,
  },
  charCount: {fontSize: 12, color: LIGHT_GRAY_TEXT},

  // --- Tags ---
  tagChipsContainer: {flexDirection: 'row', flexWrap: 'wrap', marginBottom: 10},
  tagDisplayChip: {
    backgroundColor: LIGHT_BG,
    borderWidth: 1,
    borderColor: BORDER_COLOR,
  },
  tagHelperText: {fontSize: 12, color: LIGHT_GRAY_TEXT, marginTop: 5},

  // --- Visibility & Metrics ---
  visibilityRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
  },
  statusChipActive: {
    backgroundColor: TAG_BG,
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  statusChipTextActive: {fontSize: 13, fontWeight: '600', color: TAG_TEXT},
  changeLink: {fontSize: 14, fontWeight: '600', color: PRIMARY_ORANGE},
  helperText: {fontSize: 12, color: MEDIUM_GRAY_TEXT},
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: BORDER_COLOR,
    marginTop: 15,
  },
  statusItem: {paddingRight: 20},
  statusValue: {fontSize: 16, fontWeight: '700', color: DARK_GRAY_TEXT},
  statusLabel: {fontSize: 12, color: LIGHT_GRAY_TEXT, marginTop: 2},
  statusChip: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginRight: 8,
  },
  statusChipText: {fontSize: 13, fontWeight: '600'},

  // --- Switch Row ---
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: BORDER_COLOR,
  },
  switchTitle: {fontSize: 14, fontWeight: '600', color: DARK_GRAY_TEXT},
  switchSubtitle: {fontSize: 12, color: MEDIUM_GRAY_TEXT, marginTop: 2},

  // --- Fixed Footer Buttons ---
  buttonContainerFixed: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: BORDER_COLOR,
    backgroundColor: WHITE,
    zIndex: 10,
  },
  archiveButton: {flex: 0.3, paddingVertical: 14, alignItems: 'center'},
  archiveButtonText: {color: DARK_GRAY_TEXT, fontSize: 15, fontWeight: '600'},
  button: {
    flex: 0.8,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 8,
  },
  updateButton: {backgroundColor: PRIMARY_ORANGE},
  updateButtonText: {color: WHITE, fontSize: 16, fontWeight: '600'},
  deleteButton: {flex: 0.3, paddingVertical: 14, alignItems: 'center'},
  deleteButtonText: {color: MEDIUM_GRAY_TEXT, fontSize: 15, fontWeight: '600'},

  // --- Modal Styles (Copied from MyPost component) ---
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: WHITE,
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: '100%',
    maxHeight: '60%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: DARK_GRAY_TEXT,
    marginBottom: 15,
  },
  modalOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: BORDER_COLOR,
  },
  modalOptionText: {fontSize: 16, color: DARK_GRAY_TEXT},
  modalCloseButton: {
    backgroundColor: PRIMARY_ORANGE,
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
  },
  modalCloseButtonText: {color: WHITE, fontSize: 16, fontWeight: '600'},
});
