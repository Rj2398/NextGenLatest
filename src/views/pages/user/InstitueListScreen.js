import React, {useState, useRef} from 'react';

import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Dimensions,
  TextInput,
} from 'react-native';

import {SafeAreaView} from 'react-native-safe-area-context';
import SwitchInstituteModal from '../../components/user/SwitchInstituteModal';
import NewsPost from '../../components/user/NewsPost';
import HorizontalFilterBar from '../../components/user/HorizontalFilterBar';
import UserFilterModal from '../../components/user/UserFilterModal';
import UserFilterGroup from '../../components/user/UserFilterGroup';
import {useDispatch, useSelector} from 'react-redux';
import {setUserDashboardModalToggle} from '../../../store/slices/userSlice';

const {width: screenWidth} = Dimensions.get('window');

const InstituteListScreen = () => {
  const dispatch = useDispatch();
  const {userDashboardModal} = useSelector(({user}) => user);
  console.log(userDashboardModal, 'ahsgdjfd');
  const [activeTab, setActiveTab] = useState('bulletin');
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(userDashboardModal);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [currentFilter, setCurrentFilter] = useState('all');
  const [isGroupFilterVisible, setIsGroupFilter] = useState(false);
  const [showImages, setShowImages] = useState(true); // Control the conditional option

  const handleApplyFilter = selectedFilter => {
    setActiveFilter(selectedFilter);
    Alert.alert('Filter Applied', `Content filtered by: ${selectedFilter}`);
  };

  // 2. Logic to handle the selection change
  const handleFilterChange = newValue => {
    setCurrentFilter(newValue);
    if (newValue === 'Include Only') {
      setIsFilterVisible(true);
    } else if (newValue === 'Group') {
      setIsGroupFilter(true);
    }
  };

  // 3. Simple list data placeholder based on the filter
  const getFilteredContent = () => {
    switch (currentFilter) {
      case 'important':
        return ['Task A (Important)', 'Task B (Important)'];
      case 'groups':
        return ['Group Event X', 'Group Project Y'];
      case 'all':
      default:
        return ['All Content 1', 'All Content 2', 'All Content 3'];
    }
  };

  const handleCloseModal = () => {
    dispatch(setUserDashboardModalToggle(false));
    // setIsModalVisible(false);
  };

  const newsData = [
    {
      id: 1,
      title: 'Bishop Cotton School hockey',
      date: '4/3/2025',
      location: 'MA 02139, United States',
      images: [require('../../../assets/images/ic_dummy_player_1.png')],
      description:
        'Massachusetts organised a Dotch ball competition last Sunday and the students performed amazingly well. Here is the moment of the students scoring the winning goal of the game.',
    },
    {
      id: 2,
      title: 'Bishop Cotton School hockey',
      date: '4/3/2025',
      location: 'MA 02139, United States',
      images: [
        require('../../../assets/images/ic_dummy_player_1.png'),
        require('../../../assets/images/ic_dummy_player_1.png'),
      ],
      description:
        'Massachusetts organised a Dotch ball competition last Sunday and the students performed amazingly well. Here is the moment of the students scoring the winning goal of the game.',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* <View style={styles.header}>
        <TouchableOpacity>
          <Image
            source={require('../../../assets/images/slider_icon.png')}
            style={{height: 17, width: 23}}></Image>
        </TouchableOpacity>

        <Image
          source={require('../../../assets/images/nextgenlogo.png')}
          style={styles.logo}
        />
        <TouchableOpacity style={styles.switchButton} onPress={handleOpenModal}>
          <Image
            source={require('../../../assets/images/ic_park_switch.png')}
            style={{marginRight: 3}}></Image>
        </TouchableOpacity>
      </View> */}

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}>
        {/*Search Container */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Image
              source={require('../../../assets/images/ic_search_icon.png')}
              style={{height: 20, width: 20}}></Image>
            <TextInput
              style={styles.searchInput}
              placeholder="Search order ID, email, SKU..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor="#9CA3AF"
            />
          </View>
        </View>

        {/**/}
        <HorizontalFilterBar
          selectedValue={currentFilter}
          onSelect={handleFilterChange}
        />

        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'bulletin' && styles.activeTab]}
            onPress={() => setActiveTab('bulletin')}>
            <Text
              style={[
                styles.tabText,
                activeTab === 'bulletin' && styles.activeTabText,
              ]}>
              Institute Bulletin
            </Text>
            {activeTab === 'bulletin' && (
              <Image
                source={require('../../../assets/images/ic_bottom_corners.png')}
                style={styles.activeIndicatior}></Image>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'news' && styles.activeTab]}
            onPress={() => setActiveTab('news')}>
            <Text
              style={[
                styles.tabText,
                activeTab === 'news' && styles.activeTabText,
              ]}>
              News
            </Text>

            {activeTab === 'news' && (
              <Image
                source={require('../../../assets/images/ic_bottom_corners.png')}
                style={styles.activeIndicatior}></Image>
            )}
          </TouchableOpacity>
        </View>

        {/* News Posts */}
        {newsData.map(news => (
          <NewsPost key={news.id} {...news} />
        ))}

        <View style={styles.footer}>
          <Text style={styles.footerText}>Powered by</Text>
          <Image
            source={require('../../../assets/images/nextgenlogo.png')}
            style={styles.footerLogo}
          />
        </View>
        <SwitchInstituteModal
          isVisible={userDashboardModal}
          onClose={() => handleCloseModal()}
        />

        <UserFilterModal
          isVisible={isFilterVisible}
          onClose={() => setIsFilterVisible(false)}
          onApply={handleApplyFilter}
          showImagesFilter={showImages}
        />
        <UserFilterGroup
          isVisible={isGroupFilterVisible}
          onClose={() => setIsGroupFilter(false)}
          onApply={handleApplyFilter}
          showImagesFilter={false}></UserFilterGroup>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },

  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    // paddingTop: 16,
    gap: 12,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  searchIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#1F2937',
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  activeIndicatior: {
    position: 'absolute',
    bottom: 0, // sticks image to bottom of tab
    alignSelf: 'center', // centers horizontally
    width: 70, // 40% of screen width
    height: 3, // maintain aspect ratio
    resizeMode: 'contain',
  },
  logo: {
    width: 100,
    height: 30,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  switchButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  switchIcon: {
    fontSize: 14,
    marginRight: 4,
  },
  switchText: {
    fontSize: 13,
    color: '#333',
  },
  scrollView: {
    flex: 1,
  },
  heroImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 20,
  },
  schoolCard: {
    backgroundColor: '#1A5A5A',
    margin: 16,
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
  },
  schoolIconContainer: {
    marginRight: 12,
  },
  schoolIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FFB84D',
    justifyContent: 'center',
    alignItems: 'center',
  },
  schoolIconText: {
    fontSize: 24,
  },
  schoolInfo: {
    flex: 1,
  },
  schoolName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 6,
  },
  schoolDescription: {
    fontSize: 12,
    color: '#E0E0E0',
    marginBottom: 8,
    lineHeight: 18,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  locationIcon: {
    fontSize: 12,
    marginRight: 4,
  },
  locationText: {
    fontSize: 11,
    color: '#E0E0E0',
    marginRight: 12,
  },
  tabContainer: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 8,
    overflow: 'hidden',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    position: 'relative',
  },
  activeTab: {
    backgroundColor: '#FFB84D',
    borderColor: '#FFB84D',
  },
  fourSideCorner: {
    flex: 1,
    borderRadius: 20,
    overflow: 'hidden',
    marginHorizontal: 20,
    marginTop: 20,
  },
  tabText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  newsPost: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    marginTop: 16,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  newsHeader: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: '#1A5A5A',
  },
  newsIconContainer: {
    marginRight: 10,
  },
  newsIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFB84D',
    justifyContent: 'center',
    alignItems: 'center',
  },
  newsIconText: {
    fontSize: 20,
  },
  newsHeaderInfo: {
    flex: 1,
  },
  newsTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  newsMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  newsMetaIcon: {
    fontSize: 10,
    marginRight: 4,
  },
  newsMetaText: {
    fontSize: 11,
    color: '#E0E0E0',
    marginRight: 10,
  },
  sliderContainer: {
    position: 'relative',
  },
  newsImage: {
    width: screenWidth - 32,
    height: 300,
    resizeMode: 'cover',
  },
  paginationContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 16,
    alignSelf: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: '#FFB84D',
    width: 24,
  },
  newsActions: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  actionButton: {
    flexDirection: 'column',
    alignItems: 'center',
    marginRight: 16,
  },
  actionIcon: {
    fontSize: 16,
    marginRight: 4,
  },
  actionText: {
    fontSize: 13,
    color: '#666',
  },
  directionButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  directionIcon: {
    fontSize: 14,
    marginRight: 4,
  },
  directionText: {
    fontSize: 13,
    color: '#333',
  },
  newsDescription: {
    padding: 16,
    fontSize: 13,
    color: '#666',
    lineHeight: 20,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  footerText: {
    fontSize: 12,
    color: '#999',
    marginBottom: 8,
  },
  footerLogo: {
    width: 100,
    height: 30,
    resizeMode: 'contain',
  },
});

export default InstituteListScreen;
