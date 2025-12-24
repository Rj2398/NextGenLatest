import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';

const {width: screenWidth} = Dimensions.get('window');

const NewsPost = ({title, date, location, images, description}) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const scrollViewRef = useRef(null);
  const [scrollEnable, setScrollEnable] = useState(false);

  const handleScroll = event => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const offset = event.nativeEvent.contentOffset.x;
    const index = Math.round(offset / slideSize);
    setActiveSlide(index);
  };

  const goToSlide = index => {
    setActiveSlide(index);
    scrollViewRef.current?.scrollTo({
      x: index * (screenWidth - 32),
      animated: true,
    });
  };

  return (
    <View style={styles.newsPost}>
      {/* Header */}
      <View style={styles.newsHeader}>
        <View style={styles.newsIcon}>
          <Text style={styles.newsIconText}>🏫</Text>
        </View>

        <View style={{flex: 1}}>
          <Text style={styles.newsTitle}>{title}</Text>

          <View style={styles.newsMetaRow}>
            <Image
              source={require('../../../assets/images/ic_calendar_icon_white.png')}
              style={{height: 12, width: 12, marginRight: 3}}
            />
            <Text style={styles.newsMetaText}>{date}</Text>

            <Image
              source={require('../../../assets/images/ic_location_white.png')}
              style={{height: 12, width: 12, marginRight: 3}}
            />
            <Text style={styles.newsMetaText}>{location}</Text>
          </View>
        </View>
      </View>

      {/* Image Slider */}
      <View style={styles.sliderContainer}>
        <ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}>
          {images.map((img, idx) => (
            <Image key={idx} source={img} style={styles.newsImage} />
          ))}
        </ScrollView>

        {scrollEnable && (
          <View style={styles.paginationContainer}>
            {images.map((_, idx) => (
              <TouchableOpacity
                key={idx}
                onPress={() => goToSlide(idx)}
                style={[
                  styles.paginationDot,
                  activeSlide === idx && styles.paginationDotActive,
                ]}
              />
            ))}
          </View>
        )}
      </View>

      {/* Actions */}
      <View style={styles.newsActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Image
            source={require('../../../assets/images/ic_like_icon.png')}
            style={{height: 16, width: 18, marginRight: 5}}
          />
          <Text style={styles.actionText}>24</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <Image
            source={require('../../../assets/images/ic_comment_icon_newone.png')}
            style={{height: 16, width: 18, marginRight: 5}}
          />
          <Text style={styles.actionText}>8</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <Image
            source={require('../../../assets/images/ic_share_icon_new.png')}
            style={{height: 18, width: 18}}
            resizeMode="contain"
          />
        </TouchableOpacity>

        <View style={{flex: 1}} />

        <TouchableOpacity style={styles.directionButton}>
          <Image
            source={require('../../../assets/images/ic_get_direction.png')}
            style={{height: 11, width: 11}}
            resizeMode="contain"
          />
          <Text style={styles.directionText}>Get Direction</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.newsDescription}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  newsPost: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
  },
  newsHeader: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: '#1A5A5A',
  },
  newsIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFB84D',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  newsIconText: {
    fontSize: 20,
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
  newsMetaText: {
    fontSize: 11,
    color: '#E0E0E0',
    marginRight: 8,
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
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
    backgroundColor: 'rgba(255,255,255,0.5)',
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
    borderBottomColor: '#EEE',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  actionText: {
    fontSize: 13,
    color: '#484848',
  },
  directionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#DCDCDC',
    borderWidth: 1,
    padding: 7,
    borderRadius: 15,
  },
  directionText: {
    fontSize: 13,
    color: '#333',
    marginLeft: 4,
    fontWeight: 'bold',
  },
  newsDescription: {
    padding: 16,
    fontSize: 13,
    lineHeight: 20,
    color: '#666',
  },
});

export default NewsPost;
