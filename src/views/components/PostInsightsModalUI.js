import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Image,
} from 'react-native';
import React, {useState} from 'react';

// --- Icon Imports ---
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

// --- Color Palette and Constants ---
const PRIMARY_ORANGE = '#F97316';
const DARK_GRAY_TEXT = '#1F2937';
const MEDIUM_GRAY_TEXT = '#4B5563';
const BORDER_COLOR = '#D1D5DB';
const WHITE = '#FFFFFF';
const LIGHT_BG = '#F9FAFB';
const PINNED_BG = '#FEF3C7';
const PINNED_TEXT = '#92400E';
const PUBLIC_TAG_BG = '#F0F9FF';
const PUBLIC_TAG_TEXT = '#0B6699';

const {height, width} = Dimensions.get('window');

// --- Static Data for Demonstration ---
const staticPostData = {
  title: 'Science Fair 2024 - Registration Now Open!',
  author: 'Science Department',
  time: 'Posted 5 hours ago',
  avatarUri: 'https://randomuser.me/api/portraits/women/1.jpg',
  metrics: [
    {label: 'Total Views', value: 235},
    {label: 'Unique Viewers', value: 187},
    {label: 'Comments', value: 18},
  ],
  trendData: [
    {day: 'Mon', views: 80},
    {day: 'Tue', views: 120},
    {day: 'Wed', views: 50},
    {day: 'Thu', views: 250}, // Highest value for scaling
    {day: 'Fri', views: 230},
    {day: 'Sat', views: 100},
    {day: 'Sun', views: 40},
  ],
  topAudiences: [
    {name: 'All Grades', percentage: '45%', views: '106 views'},
    {name: 'Science Dept', percentage: '32%', views: '75 views'},
    {name: 'Grade 10', percentage: '23%', views: '54 views'},
  ],
};

// --------------------------------------------------------------------------------
// 1. Bar Chart Sub-Component (Views Trend)
// --------------------------------------------------------------------------------

const BarChart = ({data}) => {
  // Find the maximum views for scaling the bars
  const maxViews = 250; // Hardcode max for consistent scale
  const chartHeight = 100;

  return (
    <View style={chartStyles.chartContainer}>
      {data.map((item, index) => {
        const barHeight = (item.views / maxViews) * chartHeight;
        // Highlight the Thursday/Friday bar range
        const isHighlight = item.day === 'Thu' || item.day === 'Fri';

        return (
          <View key={index} style={chartStyles.barWrapper}>
            <View
              style={[
                chartStyles.bar,
                {
                  height: barHeight,
                  backgroundColor: isHighlight
                    ? PRIMARY_ORANGE
                    : PRIMARY_ORANGE + '40',
                },
              ]}
            />
            <Text style={chartStyles.barLabel}>{item.day}</Text>
          </View>
        );
      })}
    </View>
  );
};

// --------------------------------------------------------------------------------
// 2. Main Modal Component
// --------------------------------------------------------------------------------

const PostInsightsModal = ({isVisible, onClose}) => {
  const [trendRange, setTrendRange] = useState('7d'); // State for '7d' or '30d'

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}>
      {/* Faded Background Overlay */}
      <View style={modalStyles.overlay}>
        {/* Modal Content Sheet */}
        <View style={modalStyles.container}>
          {/* Header */}
          <View style={modalStyles.header}>
            <Text style={modalStyles.title}>Post Insights</Text>
            <TouchableOpacity onPress={onClose} style={modalStyles.closeButton}>
              <MaterialCommunityIcons
                name="close"
                size={24}
                color={MEDIUM_GRAY_TEXT}
              />
            </TouchableOpacity>
          </View>

          {/* Post Info Section */}
          <View style={modalStyles.postInfo}>
            <Image
              source={{uri: staticPostData.avatarUri}}
              style={modalStyles.avatar}
            />
            <View style={modalStyles.postDetails}>
              <Text style={modalStyles.postTitle} numberOfLines={1}>
                {staticPostData.title}
              </Text>
              <Text style={modalStyles.postMeta}>
                {staticPostData.author} • {staticPostData.time}
              </Text>
              <View style={modalStyles.postChips}>
                {/* Public Tag */}
                <View
                  style={[
                    modalStyles.chip,
                    {
                      backgroundColor: PUBLIC_TAG_BG,
                      borderColor: PUBLIC_TAG_TEXT + '40',
                    },
                  ]}>
                  <Text
                    style={[modalStyles.chipText, {color: PUBLIC_TAG_TEXT}]}>
                    Public
                  </Text>
                </View>
                {/* Pinned Tag */}
                <View
                  style={[
                    modalStyles.chip,
                    {
                      backgroundColor: PINNED_BG,
                      borderColor: PINNED_TEXT + '40',
                    },
                  ]}>
                  <FontAwesome
                    name="thumb-tack"
                    size={10}
                    color={PINNED_TEXT}
                    style={{marginRight: 4}}
                  />
                  <Text style={[modalStyles.chipText, {color: PINNED_TEXT}]}>
                    Pinned
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <ScrollView contentContainerStyle={modalStyles.scrollViewContent}>
            {/* Performance Overview */}
            <Text style={modalStyles.sectionTitle}>Performance Overview</Text>
            <View style={modalStyles.metricsContainer}>
              {staticPostData.metrics.map((metric, index) => (
                <View
                  key={index}
                  style={[
                    modalStyles.metricBox,
                    index < staticPostData.metrics.length - 1 &&
                      modalStyles.metricSeparator,
                  ]}>
                  <Text style={modalStyles.metricValue}>{metric.value}</Text>
                  <Text style={modalStyles.metricLabel}>{metric.label}</Text>
                </View>
              ))}
            </View>
            {/* Views Trend */}
            <View style={modalStyles.trendSection}>
              <Text style={modalStyles.sectionTitle}>Views Trend</Text>
              {/* Range Toggle */}
              <View style={modalStyles.rangeToggle}>
                <TouchableOpacity
                  style={[
                    modalStyles.rangeButton,
                    trendRange === '7d' && modalStyles.rangeButtonActive,
                  ]}
                  onPress={() => setTrendRange('7d')}>
                  <Text
                    style={[
                      modalStyles.rangeText,
                      trendRange === '7d' && modalStyles.rangeTextActive,
                    ]}>
                    7d
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    modalStyles.rangeButton,
                    trendRange === '30d' && modalStyles.rangeButtonActive,
                  ]}
                  onPress={() => setTrendRange('30d')}>
                  <Text
                    style={[
                      modalStyles.rangeText,
                      trendRange === '30d' && modalStyles.rangeTextActive,
                    ]}>
                    30d
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <BarChart data={staticPostData.trendData} />
            <Text style={modalStyles.trendPercent}>
              <MaterialCommunityIcons
                name="arrow-up-thin"
                size={16}
                color="#10B981"
              />{' '}
              +24% vs last week
            </Text>
            {/* Top Audiences */}
            <Text style={modalStyles.sectionTitle}>Top Audiences</Text>
            <View style={modalStyles.audienceList}>
              {staticPostData.topAudiences.map((audience, index) => (
                <View key={index} style={modalStyles.audienceRow}>
                  <View style={[modalStyles.chip, modalStyles.audienceChip]}>
                    <Text
                      style={[modalStyles.chipText, {color: DARK_GRAY_TEXT}]}>
                      {audience.name}
                    </Text>
                  </View>
                  <Text style={modalStyles.audiencePercent}>
                    {audience.percentage}{' '}
                    <Text style={{color: MEDIUM_GRAY_TEXT}}>
                      ({audience.views})
                    </Text>
                  </Text>
                </View>
              ))}
            </View>
            <View style={{height: 20}} /> {/* Padding bottom */}
          </ScrollView>

          {/* Footer */}
          <View style={modalStyles.footer}>
            <TouchableOpacity
              onPress={onClose}
              style={modalStyles.footerButton}>
              <Text style={modalStyles.footerButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default PostInsightsModal;

// --------------------------------------------------------------------------------
// 3. Stylesheets
// --------------------------------------------------------------------------------

const modalStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  container: {
    width: '100%',
    maxHeight: height * 0.9,
    backgroundColor: WHITE,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: BORDER_COLOR,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: DARK_GRAY_TEXT,
  },
  closeButton: {
    padding: 5,
  },
  postInfo: {
    flexDirection: 'row',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: LIGHT_BG,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 15,
  },
  postDetails: {
    flex: 1,
  },
  postTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: DARK_GRAY_TEXT,
  },
  postMeta: {
    fontSize: 12,
    color: MEDIUM_GRAY_TEXT,
    marginTop: 2,
  },
  postChips: {
    flexDirection: 'row',
    marginTop: 5,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingVertical: 3,
    paddingHorizontal: 8,
    marginRight: 8,
    borderWidth: 1,
  },
  chipText: {
    fontSize: 11,
    fontWeight: '600',
  },
  scrollViewContent: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: DARK_GRAY_TEXT,
    marginTop: 15,
    marginBottom: 10,
  },
  metricsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: BORDER_COLOR,
    borderRadius: 8,
  },
  metricBox: {
    flex: 1,
    alignItems: 'center',
  },
  metricSeparator: {
    borderRightWidth: 1,
    borderRightColor: BORDER_COLOR,
  },
  metricValue: {
    fontSize: 24,
    fontWeight: '700',
    color: DARK_GRAY_TEXT,
  },
  metricLabel: {
    fontSize: 12,
    color: MEDIUM_GRAY_TEXT,
    textAlign: 'center',
    marginTop: 4,
  },
  trendSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rangeToggle: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: PRIMARY_ORANGE,
    borderRadius: 8,
    overflow: 'hidden',
  },
  rangeButton: {
    paddingVertical: 5,
    paddingHorizontal: 12,
    backgroundColor: WHITE,
  },
  rangeButtonActive: {
    backgroundColor: PRIMARY_ORANGE,
  },
  rangeText: {
    fontSize: 13,
    fontWeight: '600',
    color: PRIMARY_ORANGE,
  },
  rangeTextActive: {
    color: WHITE,
  },
  trendPercent: {
    fontSize: 13,
    fontWeight: '600',
    color: '#10B981', // Green for increase
    textAlign: 'center',
    marginTop: 10,
  },
  audienceList: {
    marginTop: 5,
  },
  audienceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: LIGHT_BG,
  },
  audienceChip: {
    backgroundColor: LIGHT_BG,
    borderColor: BORDER_COLOR,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginRight: 0,
  },
  audiencePercent: {
    fontSize: 14,
    color: DARK_GRAY_TEXT,
    fontWeight: '500',
  },
  footer: {
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: BORDER_COLOR,
    alignItems: 'center',
  },
  footerButton: {
    width: width * 0.8,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: LIGHT_BG,
    borderWidth: 1,
    borderColor: BORDER_COLOR,
  },
  footerButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: MEDIUM_GRAY_TEXT,
  },
});

// Styles for the Bar Chart
const chartStyles = StyleSheet.create({
  chartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 120,
    paddingHorizontal: 5,
    paddingTop: 10,
  },
  barWrapper: {
    alignItems: 'center',
    width: width / 12,
    marginHorizontal: 2,
  },
  bar: {
    width: '100%',
    borderRadius: 3,
    minHeight: 5,
  },
  barLabel: {
    fontSize: 11,
    color: MEDIUM_GRAY_TEXT,
    marginTop: 5,
  },
});
