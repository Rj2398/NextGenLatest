import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,    Image,
  Dimensions,
} from 'react-native';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const FilterBottomSheet = ({ visible, onClose, onApply }) => {
  const [filterRating, setFilterRating] = useState('all');
  const [filterVerified, setFilterVerified] = useState(false);
  const [filterWithComments, setFilterWithComments] = useState(false);
  const [filterFlagged, setFilterFlagged] = useState(false);
  const [filterMostHelpful, setFilterMostHelpful] = useState(false);

  const resetFilters = () => {
    setFilterRating('all');
    setFilterVerified(false);
    setFilterWithComments(false);
    setFilterFlagged(false);
    setFilterMostHelpful(false);
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filterRating !== 'all') count++;
    if (filterVerified) count++;
    if (filterWithComments) count++;
    if (filterFlagged) count++;
    if (filterMostHelpful) count++;
    return count;
  };

  const handleApply = () => {
    const filters = {
      rating: filterRating,
      verified: filterVerified,
      withComments: filterWithComments,
      flagged: filterFlagged,
      mostHelpful: filterMostHelpful,
    };
    onApply(filters);
    onClose();
  };


  const renderStars = (count) => (
  <View style={{ flexDirection: 'row' }}>
    {[1, 2, 3, 4, 5].map((i) => (
      <Image
        key={i}
        source={i <= count 
          ? require('../../assets/images/ic_filled_icon.png') 
          : require('../../assets/images/ic_empty_icon.png')}
        style={{ width: 13, height: 13, marginRight: 2 }}
      />
    ))}
  </View>
);

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <TouchableOpacity 
          style={styles.modalBackdrop} 
          activeOpacity={1}
          onPress={onClose}
        />
        <View style={styles.bottomSheet}>
          <View style={styles.bottomSheetHandle} />
          
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.bottomSheetTitle}>Apply Filters</Text>
            <Text style={styles.bottomSheetSubtitle}>Refine your review listings</Text>

            {/* Rating Range Section */}
            <View style={styles.filterGroup}>
              <Text style={styles.filterGroupTitle}>Rating Range</Text>
              
              <TouchableOpacity 
                style={styles.radioOption}
                onPress={() => setFilterRating('all')}
              >
                <View style={styles.radioButton}>
                  {filterRating === 'all' && <View style={styles.radioButtonSelected} />}
                </View>
                <Text style={styles.radioLabel1}>All Ratings</Text>
                <Text style={styles.radioCount}>1,247 reviews</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.radioOption}
                onPress={() => setFilterRating('5')}
              >
                <View style={styles.radioButton}>
                  {filterRating === '5' && <View style={styles.radioButtonSelected} />}
                </View>
                <Text style={styles.radioLabel}>5 Stars Only</Text>
                <Text style={styles.starRating}>{renderStars(5)}</Text>
                <Text style={styles.radioCount}>811 reviews</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.radioOption}
                onPress={() => setFilterRating('4+')}
              >
                <View style={styles.radioButton}>
                  {filterRating === '4+' && <View style={styles.radioButtonSelected} />}
                </View>
                <Text style={styles.radioLabel}>4+ Stars</Text>
                <Text style={styles.starRating}>{renderStars(4)}</Text>
                <Text style={styles.radioCount}>1,061 reviews</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.radioOption}
                onPress={() => setFilterRating('3-')}
              >
                <View style={styles.radioButton}>
                  {filterRating === '3-' && <View style={styles.radioButtonSelected} />}
                </View>
                <Text style={styles.radioLabel}>3 Stars & Below</Text>
                <Text style={styles.starRating}>{renderStars(3)}</Text>
                <Text style={styles.radioCount}>186 reviews</Text>
              </TouchableOpacity>
            </View>

            {/* Status Section */}
            <View style={styles.filterGroup}>
              <Text style={styles.filterGroupTitle}>Status</Text>
              
              <View style={styles.statusGrid}>
                <TouchableOpacity 
                  style={[styles.statusCard, filterVerified && styles.statusCardActive]}
                  onPress={() => setFilterVerified(!filterVerified)}
                >
                  <View style={styles.statusCheckbox}>
                    {filterVerified && <Text style={styles.checkmark}>✓</Text>}
                  </View>
                  <View style={styles.statusContent}>
                    <View style={styles.statusHeader}>
                      <Text style={styles.statusLabel}>Verified</Text>
                      
                    <Image 
    source={require('../../assets/images/ic_verified_green.png')} // correct prop
    style={{ width: 16, height: 16 }} // set your desired size
  />
                    </View>
                    <Text style={styles.statusCount}>892 reviews</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={[styles.statusCard, filterWithComments && styles.statusCardActive]}
                  onPress={() => setFilterWithComments(!filterWithComments)}
                >
                  <View style={styles.statusCheckbox}>
                    {filterWithComments && <Text style={styles.checkmark}>✓</Text>}
                  </View>
                  <View style={styles.statusContent}>
                    <View style={styles.statusHeader}>
                      <Text style={styles.statusLabel}>With Comments</Text>
                                <Image 
    source={require('../../assets/images/ic_comment_icon.png')} // correct prop
    style={{ width: 16, height: 16 }} // set your desired size
  />
       
                    </View>
                    <Text style={styles.statusCount}>1,124 reviews</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={[styles.statusCard, filterFlagged && styles.statusCardActive]}
                  onPress={() => setFilterFlagged(!filterFlagged)}
                >
                  <View style={styles.statusCheckbox}>
                    {filterFlagged && <Text style={styles.checkmark}>✓</Text>}
                  </View>
                  <View style={styles.statusContent}>
                    <View style={styles.statusHeader}>
                      <Text style={styles.statusLabel}>Flagged</Text>
                                 
                                <Image 
    source={require('../../assets/images/ic_flag_icon_green.png')} // correct prop
    style={{ width: 16, height: 16 }} // set your desired size
  />    
                    </View>
                    <Text style={styles.statusCount}>23 reviews</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={[styles.statusCard, filterMostHelpful && styles.statusCardActive]}
                  onPress={() => setFilterMostHelpful(!filterMostHelpful)}
                >
                  <View style={styles.statusCheckbox}>
                    {filterMostHelpful && <Text style={styles.checkmark}>✓</Text>}
                  </View>
                  <View style={styles.statusContent}>
                    <View style={styles.statusHeader}>
                      <Text style={styles.statusLabel}>Most Helpful</Text>
                              <Image 
         source={require('../../assets/images/ic_green_like.png')} // correct prop
    style={{ width: 16, height: 16 }} // set your desired size
  /> 
                    </View>
                    <Text style={styles.statusCount}>342 reviews</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>

            {/* Entity Type Section */}
            <View style={styles.filterGroup}>
              <Text style={styles.filterGroupTitle}>Entity Type</Text>
            </View>

            {/* Action Buttons */}
            <View style={styles.bottomSheetActions}>
              <TouchableOpacity 
                style={styles.resetButton}
                onPress={resetFilters}
              >
                <Text style={styles.resetButtonText}>Reset All</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.applyButton}
                onPress={handleApply}
              >
                <Image source={require('../../assets/images/ic_filter_icon_white.png')} style={{height:10,width:10,marginInlineEnd:10}}></Image>
                <Text style={styles.applyButtonText}>
                   Apply Filters ({getActiveFiltersCount()})
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalBackdrop: {
    flex: 1,
  },
  bottomSheet: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 12,
    paddingHorizontal: 20,
    paddingBottom: 32,
    maxHeight: SCREEN_HEIGHT * 0.85,
  },
  bottomSheetHandle: {
    width: 40,
    height: 4,
    backgroundColor: '#E5E7EB',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 20,
  },
  bottomSheetTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 8,
  },
  bottomSheetSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 24,
  },
  filterGroup: {
    marginBottom: 24,
  },
  filterGroupTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    marginBottom: 8,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonSelected: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#0075FF',
  },
  radioLabel: {
    fontSize: 14,
    color: '#1F2937',
   
  },
   radioLabel1: {
    fontSize: 14,
    color: '#1F2937',
   flex:1
  },
  starRating: {
    fontSize: 12,
    marginRight: 8,
    flex:1,marginLeft:10
  },
  radioCount: {
    fontSize: 12,
    color: '#6B7280',
  },
  statusGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statusCard: {
    width: '48%',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 12,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  statusCardActive: {
    borderColor: '#FF6B35',
    backgroundColor: '#FFF7F5',
  },
  statusCheckbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    marginBottom: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmark: {
    fontSize: 14,
    color: '#FF6B35',
    fontWeight: 'bold',
  },
  statusContent: {
    flex: 1,
  },
  statusHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  statusLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1F2937',
  },
  statusIcon: {
    fontSize: 16,
  },
  statusCount: {
    fontSize: 12,
    color: '#6B7280',
  },
  bottomSheetActions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 24,
  },
  resetButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
  },
  resetButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
  },
  applyButton: {
    flex: 2,
    paddingVertical: 14,
    borderRadius: 8,
    backgroundColor: '#FF6B35',
    alignItems: 'center',
    flexDirection:'row',
    justifyContent:'center'
  },
  applyButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
  },
});

export default FilterBottomSheet;
