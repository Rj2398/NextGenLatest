import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Dimensions,
  Switch,
  Modal,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';

// --- External Library Imports ---
import ImagePicker from 'react-native-image-crop-picker';
import NetInfo from '@react-native-community/netinfo'; // 👈 NEW: Internet Checker

// --- Icon Imports ---
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import PostInsightsModalUI from '../../components/PostInsightsModalUI';
import PinPostModal from '../../components/PinPostModal';
import AudienceModal from '../../components/AudienceModal';

// --- Color Palette and Constants ---
const PRIMARY_ORANGE = '#F97316';
const DARK_GRAY_TEXT = '#1F2937';
const MEDIUM_GRAY_TEXT = '#4B5563';
const LIGHT_GRAY_TEXT = '#6B7280';
const BORDER_COLOR = '#D1D5DB';
const INPUT_BORDER = '#D1D5DB';
const WHITE = '#FFFFFF';
const LIGHT_BG = '#F9FAFB';
const CHIP_BG_ACTIVE = '#FEF3C7';
const CHIP_TEXT_ACTIVE = '#92400E';
const TAG_BG = '#F0F9FF';
const TAG_TEXT = '#0B6699';
const CHIP_BG = '#FEE2E2';
const CHIP_TEXT = '#991B1B';
const MEDIA_UPLOAD_BG = '#F3F4F6';

const {width} = Dimensions.get('window');

// --- Dummy Data ---
// 1. postsData: Used for the 'loaded' state
const loadedPosts = [
  {
    id: '1',
    type: 'text_image',
    avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
    author: 'Science Department',
    time: '1h',
    status: 'Public',
    content:
      "Students fair 2024 - Registration Now Open! Students fair registration is a campus event to this. There is limited entrance fee. Registration deadline is March 10th. Don't miss this opportunity to showcase your... See more",
    image: 'https://picsum.photos/id/237/600/400',
    tags: ['#ArtFair', '#Technology', '#ScienceFair'],
    views: 473,
    comments: 89,
  },
  {
    id: '2',
    type: 'text_only',
    avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
    author: 'PEDepartment',
    time: '4m',
    status: 'Only me',
    content:
      'Reminder: Equipment check scheduled for tomorrow at 10 PM. Please ensure all sports equipment is properly stored and accounted for.',
    tags: ['#PEClass', '#Equipment'],
    views: 62,
    comments: 10,
  },
  {
    id: '3',
    type: 'text_image',
    avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
    author: 'Mathematics Dept.',
    time: '2d',
    status: 'Private',
    content:
      'Congratulations to our students who participated in the regional math competition! Outstanding performance by Grade 10 team.',
    image: 'https://picsum.photos/id/238/600/400',
    tags: ['#Grade10', '#MathClub', '#Competition'],
    views: 189,
    comments: 37,
  },
];
// 2. emptyPosts: Used for the 'empty' state
const emptyPosts = [];

// --------------------------------------------------------------------------------
// 1. PostCard Component
// --------------------------------------------------------------------------------

const PostCard = ({post, setPinPostModalVisible}) => (
  <View style={styles.card}>
    <View style={styles.cardHeader}>
      <View style={styles.authorInfo}>
        <Image source={{uri: post.avatar}} style={styles.avatar} />
        <View>
          <Text style={styles.authorName}>{post.author}</Text>
          <View style={styles.statusAndTime}>
            <Text style={styles.postTime}>{post.time}</Text>
            {post.status === 'Public' ? (
              <MaterialCommunityIcons
                name="web"
                size={14}
                color={LIGHT_GRAY_TEXT}
                style={{marginLeft: 5}}
              />
            ) : (
              <MaterialCommunityIcons
                name="lock"
                size={14}
                color={LIGHT_GRAY_TEXT}
                style={{marginLeft: 5}}
              />
            )}
            <Text style={styles.postStatus}>{post.status}</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity onPress={() => setPinPostModalVisible(true)}>
        <Ionicons name="ellipsis-vertical" size={20} color={LIGHT_GRAY_TEXT} />
      </TouchableOpacity>
    </View>

    <Text style={styles.postContent}>{post.content}</Text>

    {post.image && (
      <Image
        source={{uri: post.image}}
        style={styles.postImage}
        resizeMode="cover"
      />
    )}

    <View style={styles.tagsContainer}>
      {post.tags.map((tag, index) => (
        <View key={index} style={styles.tagChip}>
          <Text style={styles.tagText}>{tag}</Text>
        </View>
      ))}
    </View>

    <View style={styles.cardFooter}>
      <View style={styles.engagementMetric}>
        <MaterialCommunityIcons name="eye" size={16} color={LIGHT_GRAY_TEXT} />
        <Text style={styles.metricText}>{post.views} Views</Text>
      </View>
      <View style={styles.engagementMetric}>
        <MaterialCommunityIcons
          name="comment-text-outline"
          size={16}
          color={LIGHT_GRAY_TEXT}
        />
        <Text style={styles.metricText}>{post.comments} Comments</Text>
      </View>
    </View>
  </View>
);

const MyPost = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [pinPostModalVisible, setPinPostModalVisible] = useState(false);

  const [activeTab, setActiveTab] = useState('My Post');
  const [activeFilter, setActiveFilter] = useState('All post');

  // 🌟 NEW NETINFO STATES
  const [isConnected, setIsConnected] = useState(true); // Tracks actual network status
  const [postStatus, setPostStatus] = useState('loaded'); // 'loading', 'loaded', 'empty', or 'error'
  const [isLoading, setIsLoading] = useState(false); // For Try Again button

  // --- Dummy Post Form State (as before) ---
  const [postTitle, setPostTitle] = useState('');
  const [audience, setAudience] = useState(['School-wide']);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [description, setDescription] = useState(
    'Students from grades 6-12 can participate...',
  );
  const [allowComments] = useState(true);
  const [sendNotification] = useState(true);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  // --- Fetching Logic ---

  // 1. Initial Load / Try Again Logic

  const fetchPosts = () => {
    // // If already loading or disconnected, stop.
    // if (isLoading) {
    //   return;
    // }
    // // 🌟 If disconnected, show error and stop.
    // if (!isConnected) {
    //   setPostStatus('error');
    //   return;
    // }
    // // We only show the "Loading" spinner for asynchronous *retries* or *updates*.
    // // The initial state is already set based on local data above.
    // setIsLoading(true);
    // setPostStatus('loading'); // Show spinner during the simulated API call
    // setTimeout(() => {
    //   setIsLoading(false);
    //   // Re-check posts after the simulated fetch
    //   const posts = loadedPosts;
    //   if (posts.length === 0) {
    //     setPostStatus('empty');
    //   } else {
    //     setPostStatus('loaded');
    //   }
    // }, 1000);
    setPostStatus('error');
  };

  // 3. EFFECT: Manages NetInfo listener and connection status changes.
  useEffect(() => {
    let isMounted = true;

    const unsubscribe = NetInfo.addEventListener(state => {
      const isOnline = state.isConnected && state.isInternetReachable;

      if (isMounted) {
        setIsConnected(isOnline);

        if (!isOnline) {
          setPostStatus('error'); // Show error instantly
        } else if (isOnline && postStatus === 'error') {
          // If connection restored after an error, perform fetch/retry
          //   fetchPosts();
        }
      }
    });

    // 🌟 CHANGE 2: Remove the initial fetchPosts() call.
    // The initial state handles the first render.

    return () => {
      isMounted = false;
      unsubscribe();
    };
    // ⚠️ Dependency Array: We include postStatus to ensure the logic within the listener
    // (especially the 'else if' block) uses the current status.
  }, [postStatus]);

  // --- Form Handlers (as before) ---
  const handleAudienceSelect = selectedAudience => {
    /* ... */
    setAudience(prev =>
      prev.includes(selectedAudience)
        ? prev.filter(a => a !== selectedAudience)
        : [...prev, selectedAudience],
    );
  };
  const handleMediaUpload = () => {
    /* ... */
    ImagePicker.openPicker({
      multiple: true,
      mediaType: 'any',
      cropping: true,
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
          size: file.size,
        }));
        setUploadedFiles(prev => [...prev, ...formattedFiles]);
      })
      .catch(error => {
        if (error.code !== 'E_PICKER_CANCELLED') {
          console.log('Image picker error:', error);
        }
      });
  };
  const removeFile = fileName => {
    setUploadedFiles(uploadedFiles.filter(file => file.name !== fileName));
  };
  const handlePublish = () => {
    setActiveTab('My Post');
  };
  const handleCancel = () => {
    setActiveTab('My Post');
  };

  // ------------------------------------------------------------------------
  // 🌟 Conditional Rendering Logic for My Post Screen
  // ------------------------------------------------------------------------

  const renderMyPostContent = () => {
    if (postStatus === 'loading') {
      return (
        <View style={styles.statusContainer}>
          <ActivityIndicator size="large" color={PRIMARY_ORANGE} />
          <Text style={[styles.errorSubtitle, {marginTop: 10}]}>
            Loading Posts...
          </Text>
        </View>
      );
    }

    // 1. Connectivity Error State
    if (postStatus === 'error') {
      return (
        <View style={styles.statusContainer}>
          <View style={styles.errorBox}>
            <MaterialCommunityIcons
              name="wifi-off"
              size={60}
              color={PRIMARY_ORANGE}
              style={{marginBottom: 10}}
            />
            <Text style={styles.errorTitle}>Connection Problem</Text>
            <Text style={styles.errorSubtitle}>
              Unable to load your posts. Please check your internet connection
              and try again.
            </Text>

            <TouchableOpacity
              style={styles.tryAgainButton}
              onPress={() => fetchPosts()}
              disabled={isLoading || isConnected}>
              {isLoading ? (
                <ActivityIndicator color={WHITE} />
              ) : (
                <Text style={styles.tryAgainButtonText}>Try Again</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => console.log('Viewing cached posts')}>
              <Text style={styles.viewCachedText}>View Cached Posts</Text>
            </TouchableOpacity>
          </View>

          {/* Connection Status Section */}
          <View style={styles.connectionStatus}>
            <Text style={styles.statusText}>Connection Status</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View
                style={[
                  styles.onlineIndicator,
                  {backgroundColor: isConnected ? '#059669' : '#EF4444'},
                ]}
              />
              <Text style={styles.onlineText}>
                {isConnected ? 'Online' : 'Offline'}
              </Text>
            </View>
          </View>
          <View style={styles.troubleshooting}>
            <Text style={styles.statusText}>Troubleshooting Tips</Text>
            <MaterialCommunityIcons
              name="chevron-down"
              size={20}
              color={DARK_GRAY_TEXT}
            />
          </View>
        </View>
      );
    }

    // 2. Empty State
    if (postStatus === 'empty') {
      return (
        <View style={[styles.statusContainer, styles.emptyContainer]}>
          <View style={styles.errorBox}>
            <MaterialCommunityIcons
              name="file-outline"
              size={60}
              color={LIGHT_GRAY_TEXT}
              style={{marginBottom: 10}}
            />
            <Text style={styles.errorTitle}>No Posts Yet</Text>
            <Text style={styles.errorSubtitle}>
              Create your first post to share updates with your audience.
            </Text>

            <TouchableOpacity
              style={styles.createPostButton}
              onPress={() => setActiveTab('Create Post')}>
              <Text style={styles.createPostButtonText}>+ Create Post</Text>
            </TouchableOpacity>
          </View>
          {/* Include Search/Filter area for a cleaner transition to content */}
          {renderSearchAndFilter(emptyPosts)}
        </View>
      );
    }

    // 3. Loaded State
    if (postStatus === 'loaded') {
      return (
        <ScrollView contentContainerStyle={styles.listScrollViewContent}>
          {renderSearchAndFilter(loadedPosts)}
          {/* Posts List */}
          <View style={styles.postsList}>
            {loadedPosts.map(post => (
              <PostCard
                key={post.id}
                post={post}
                setPinPostModalVisible={setPinPostModalVisible}
              />
            ))}
          </View>

          <TouchableOpacity style={styles.loadMoreButton}>
            <Text style={styles.loadMoreButtonText}>Load More Posts</Text>
          </TouchableOpacity>
        </ScrollView>
      );
    }

    return null;
  };

  // Helper to render Search and Filter bar (used in both loaded and empty states)
  const renderSearchAndFilter = posts => (
    <>
      {/* Search and Filter */}
      <View style={styles.searchFilterContainer}>
        <View style={styles.searchInputWrapper}>
          <FontAwesome
            name="search"
            size={16}
            color={LIGHT_GRAY_TEXT}
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search this, next, Audience..."
            placeholderTextColor={LIGHT_GRAY_TEXT}
          />
        </View>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setIsVisible(true)}>
          <FontAwesome name="filter" size={20} color={DARK_GRAY_TEXT} />
        </TouchableOpacity>
      </View>

      {/* Filter Chips */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.chipsScrollView}>
        {[
          'All post',
          `Published (${posts.length})`,
          'Archived (0)',
          'Pinned (0)',
        ].map(
          // Dynamic counts for demo
          filter => (
            <TouchableOpacity
              key={filter}
              style={[
                styles.chip,
                activeFilter === filter && styles.activeChip,
              ]}
              onPress={() => setActiveFilter(filter)}>
              <Text
                style={[
                  styles.chipText,
                  activeFilter === filter && styles.activeChipText,
                ]}>
                {filter}
              </Text>
            </TouchableOpacity>
          ),
        )}
      </ScrollView>
    </>
  );

  return (
    <View style={styles.mainContainer}>
      {/* 1. TOP HEADER */}
      <View style={styles.topHeader}>
        {activeTab === 'Create Post' ? (
          <View style={{width: 34}} />
        ) : (
          <Image
            source={require('../../../assets/nextlogo.png')}
            style={styles.logo}
          />
        )}

        <Text style={styles.headerTitle}>
          {activeTab === 'Create Post' ? 'Create Post' : 'My Post'}
        </Text>

        {activeTab === 'Create Post' ? (
          <View style={{width: 34}} />
        ) : (
          <TouchableOpacity style={styles.menuIcon}>
            <MaterialCommunityIcons
              name="menu"
              size={24}
              color={DARK_GRAY_TEXT}
            />
          </TouchableOpacity>
        )}
      </View>

      {/* 2. TOGGLE SWITCH (ALWAYS VISIBLE) */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === 'My Post' && styles.activeTab,
          ]}
          onPress={() => setActiveTab('My Post')}>
          <Text
            style={[
              styles.tabButtonText,
              activeTab === 'My Post' && styles.activeTabButtonText,
            ]}>
            My Post
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === 'Create Post' && styles.activeTab,
          ]}
          onPress={() => setActiveTab('Create Post')}>
          <Text
            style={[
              styles.tabButtonText,
              activeTab === 'Create Post' && styles.activeTabButtonText,
            ]}>
            Create Post
          </Text>
        </TouchableOpacity>
      </View>

      {/* 3. CONDITIONAL CONTENT */}
      {activeTab === 'My Post' ? (
        // --- Render My Post States (Loaded, Empty, Error, Loading) ---
        <>
          {renderMyPostContent()}
          {/* FAB is only shown when not in Error state */}
          {postStatus !== 'error' && (
            <TouchableOpacity
              style={styles.fab}
              onPress={() => setActiveTab('Create Post')}>
              <MaterialCommunityIcons name="plus" size={28} color={WHITE} />
            </TouchableOpacity>
          )}
        </>
      ) : (
        // --- Create Post Form View ---
        <>
          <ScrollView contentContainerStyle={styles.createScrollViewContent}>
            {/* Post Title */}
            <Text style={styles.inputLabel}>Post Title</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Enter post title..."
              placeholderTextColor={LIGHT_GRAY_TEXT}
              value={postTitle}
              onChangeText={setPostTitle}
            />

            {/* Post Audience (Dropdown Trigger) */}
            <Text style={styles.inputLabel}>Post Audience *</Text>
            <TouchableOpacity
              style={styles.dropdownInput}
              onPress={() => setIsModalVisible(true)}>
              <Text style={styles.audienceText} numberOfLines={1}>
                {audience.length > 0
                  ? audience.join(', ')
                  : 'Select audience...'}
              </Text>
              <MaterialCommunityIcons
                name="chevron-down"
                size={24}
                color={LIGHT_GRAY_TEXT}
              />
            </TouchableOpacity>

            {/* Audience Chips (Selected) */}
            <View style={styles.chipContainer}>
              {audience.map((item, index) => (
                <View
                  key={index}
                  style={[
                    styles.audienceChip,
                    {backgroundColor: CHIP_BG, borderColor: CHIP_TEXT},
                  ]}>
                  <Text style={[styles.chipText, {color: CHIP_TEXT}]}>
                    {item}
                  </Text>
                  <TouchableOpacity
                    style={{marginLeft: 5}}
                    onPress={() => handleAudienceSelect(item)}>
                    <MaterialCommunityIcons
                      name="close-circle"
                      size={16}
                      color={CHIP_TEXT}
                    />
                  </TouchableOpacity>
                </View>
              ))}
            </View>

            {/* Upload Media (Crop Picker) */}
            <Text style={styles.inputLabel}>Upload Media</Text>
            <TouchableOpacity
              style={styles.mediaUploadBox}
              onPress={handleMediaUpload}>
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
                  <MaterialCommunityIcons
                    name={
                      file.mime.startsWith('image')
                        ? 'image'
                        : file.mime.startsWith('video')
                        ? 'video'
                        : 'file-document'
                    }
                    size={18}
                    color={DARK_GRAY_TEXT}
                    style={{marginRight: 4}}
                  />
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

            {/* Post Description */}
            <Text style={styles.inputLabel}>Post Description *</Text>
            <View style={styles.toolbar}>
              <SimpleLineIcons
                name="pencil"
                size={18}
                color={MEDIUM_GRAY_TEXT}
                style={styles.toolbarIcon}
              />
            </View>
            <TextInput
              style={[styles.textInput, styles.descriptionInput]}
              multiline
              value={description}
              onChangeText={text => setDescription(text)}
            />
            <View style={styles.descriptionFooter}>
              <Text style={styles.requiredText}>* Required field</Text>
              <Text style={styles.charCount}>{description.length}/2000</Text>
            </View>

            {/* Switches */}
            <View style={styles.switchRow}>
              <View>
                <Text style={styles.switchTitle}>Allow Comments</Text>
                <Text style={styles.switchSubtitle}>
                  Let audience members comment on this post
                </Text>
              </View>
              <Switch
                value={allowComments}
                trackColor={{false: INPUT_BORDER, true: PRIMARY_ORANGE}}
                thumbColor={WHITE}
              />
            </View>

            <View style={[styles.switchRow, {borderBottomWidth: 0}]}>
              <View>
                <Text style={styles.switchTitle}>Send Push Notification</Text>
                <Text style={styles.switchSubtitle}>
                  Notify selected audiences immediately
                </Text>
              </View>
              <Switch
                value={sendNotification}
                trackColor={{false: INPUT_BORDER, true: PRIMARY_ORANGE}}
                thumbColor={WHITE}
              />
            </View>
          </ScrollView>

          {/* Fixed Footer Buttons */}
          <View style={styles.buttonContainerFixed}>
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
        </>
      )}

      {/* 4. Audience Selection Modal (Overlay) */}
      <AudienceModal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onSelect={handleAudienceSelect}
        selectedAudiences={audience}
      />
      <PostInsightsModalUI
        isVisible={isVisible}
        // Passes the handler to close the modal
        onClose={() => setIsVisible(false)}
      />

      <PinPostModal
        isVisible={pinPostModalVisible}
        onClose={() => setPinPostModalVisible(false)}
      />
    </View>
  );
};

export default MyPost;

// --------------------------------------------------------------------------------
// 4. Stylesheets
// --------------------------------------------------------------------------------

const styles = StyleSheet.create({
  mainContainer: {flex: 1, backgroundColor: LIGHT_BG},
  // --- Top Header Bar & Toggle ---
  topHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: WHITE,
    borderBottomColor: BORDER_COLOR,
    borderBottomWidth: 1,
  },
  logo: {width: 30, height: 30, resizeMode: 'contain'},
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: DARK_GRAY_TEXT,
    flex: 1,
    textAlign: 'center',
    marginLeft: 10,
  },
  menuIcon: {padding: 5},
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#E5E7EB',
    padding: 3,
    borderRadius: 8,
    marginHorizontal: 15,
    marginVertical: 10,
    borderBottomWidth: 0,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
    borderRadius: 8,
    marginHorizontal: 0,
  },
  activeTab: {backgroundColor: PRIMARY_ORANGE},
  tabButtonText: {fontSize: 15, fontWeight: '600', color: DARK_GRAY_TEXT},
  activeTabButtonText: {color: WHITE},

  // --- ScrollView Content Styles ---
  listScrollViewContent: {padding: 15, paddingBottom: 80},
  createScrollViewContent: {padding: 20, paddingBottom: 100},

  // --- Post Card Styles ---
  card: {
    backgroundColor: WHITE,
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  authorInfo: {flexDirection: 'row', alignItems: 'center'},
  avatar: {width: 40, height: 40, borderRadius: 20, marginRight: 10},
  authorName: {fontSize: 15, fontWeight: '600', color: DARK_GRAY_TEXT},
  statusAndTime: {flexDirection: 'row', alignItems: 'center', marginTop: 2},
  postTime: {fontSize: 12, color: LIGHT_GRAY_TEXT},
  postStatus: {fontSize: 12, color: LIGHT_GRAY_TEXT, marginLeft: 3},
  postContent: {
    fontSize: 14,
    color: DARK_GRAY_TEXT,
    lineHeight: 20,
    marginBottom: 10,
  },
  postImage: {
    width: '100%',
    height: width * 0.5,
    borderRadius: 8,
    marginBottom: 10,
  },
  tagsContainer: {flexDirection: 'row', flexWrap: 'wrap', marginBottom: 10},
  tagChip: {
    backgroundColor: TAG_BG,
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {fontSize: 12, color: TAG_TEXT, fontWeight: '500'},
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: BORDER_COLOR,
  },
  engagementMetric: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  metricText: {fontSize: 12, color: LIGHT_GRAY_TEXT, marginLeft: 5},
  loadMoreButton: {
    backgroundColor: LIGHT_BG,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: BORDER_COLOR,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 0,
  },
  loadMoreButtonText: {fontSize: 15, fontWeight: '600', color: DARK_GRAY_TEXT},

  // --- Search and Filter (My Post View) ---
  searchFilterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    paddingHorizontal: 0,
  }, // Removed redundant padding
  searchInputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: WHITE,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginRight: 10,
    borderWidth: 1,
    borderColor: BORDER_COLOR,
    height: 45,
  },
  searchIcon: {marginRight: 8},
  searchInput: {flex: 1, fontSize: 14, color: DARK_GRAY_TEXT, height: '100%'},
  filterButton: {
    backgroundColor: WHITE,
    borderRadius: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: BORDER_COLOR,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chipsScrollView: {marginBottom: 20, paddingVertical: 5},
  chip: {
    backgroundColor: WHITE,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginRight: 10,
    borderWidth: 1,
    borderColor: BORDER_COLOR,
  },
  activeChip: {backgroundColor: CHIP_BG_ACTIVE, borderColor: CHIP_TEXT_ACTIVE},
  chipText: {fontSize: 13, color: MEDIUM_GRAY_TEXT, fontWeight: '500'},
  activeChipText: {color: CHIP_TEXT_ACTIVE, fontWeight: '600'},

  fab: {
    position: 'absolute',
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
    bottom: 20,
    backgroundColor: PRIMARY_ORANGE,
    borderRadius: 28,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
    zIndex: 10,
  },

  // 🌟 Error/Empty Status Styles
  statusContainer: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 50,
    alignItems: 'center',
  },
  emptyContainer: {paddingTop: 80},
  errorBox: {
    alignItems: 'center',
    marginBottom: 40,
    width: '100%',
    paddingHorizontal: 20,
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: DARK_GRAY_TEXT,
    marginBottom: 5,
  },
  errorSubtitle: {
    fontSize: 14,
    color: MEDIUM_GRAY_TEXT,
    textAlign: 'center',
    marginBottom: 25,
    lineHeight: 20,
  },
  tryAgainButton: {
    backgroundColor: PRIMARY_ORANGE,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    width: '90%',
    marginBottom: 15,
    height: 50,
    justifyContent: 'center',
  },
  tryAgainButtonText: {color: WHITE, fontSize: 16, fontWeight: '600'},
  viewCachedText: {color: PRIMARY_ORANGE, fontSize: 14, fontWeight: '600'},
  createPostButton: {
    backgroundColor: PRIMARY_ORANGE,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    width: '90%',
    marginTop: 20,
  },
  createPostButtonText: {color: WHITE, fontSize: 16, fontWeight: '600'},
  connectionStatus: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    backgroundColor: WHITE,
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: BORDER_COLOR,
  },
  troubleshooting: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    backgroundColor: WHITE,
    padding: 15,
  },
  statusText: {fontSize: 14, fontWeight: '600', color: DARK_GRAY_TEXT},
  onlineIndicator: {width: 8, height: 8, borderRadius: 4, marginRight: 5},
  onlineText: {fontSize: 14, color: MEDIUM_GRAY_TEXT},

  // --- Create Post Form Styles (Kept as before) ---
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
  audienceText: {flex: 1, fontSize: 14, color: DARK_GRAY_TEXT, padding: 0},
  chipContainer: {flexDirection: 'row', flexWrap: 'wrap', marginTop: 10},
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
  uploadInfo: {fontSize: 12, color: LIGHT_GRAY_TEXT, marginTop: 5},
  filesContainer: {flexDirection: 'row', flexWrap: 'wrap', marginTop: 10},
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
  fileName: {
    fontSize: 12,
    color: DARK_GRAY_TEXT,
    marginRight: 8,
    maxWidth: width * 0.35,
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
  requiredText: {fontSize: 12, color: PRIMARY_ORANGE, fontWeight: '500'},
  charCount: {fontSize: 12, color: LIGHT_GRAY_TEXT},
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: INPUT_BORDER,
  },
  switchTitle: {fontSize: 14, fontWeight: '600', color: DARK_GRAY_TEXT},
  switchSubtitle: {fontSize: 12, color: MEDIUM_GRAY_TEXT, marginTop: 2},
  buttonContainerFixed: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: INPUT_BORDER,
    backgroundColor: WHITE,
    zIndex: 10,
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
  cancelButtonText: {color: DARK_GRAY_TEXT, fontSize: 16, fontWeight: '600'},
  publishButton: {backgroundColor: PRIMARY_ORANGE},
  publishButtonText: {color: WHITE, fontSize: 16, fontWeight: '600'},
});
