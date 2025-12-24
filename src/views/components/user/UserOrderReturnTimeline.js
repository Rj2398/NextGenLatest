import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

const getIconSource = iconType => {
  switch (iconType) {
    case 'completed':
      // Placeholder for a green checkmark icon asset
      return require('../../../assets/images/ic_shipment_track.png');
    case 'in_transit':
      // Placeholder for a yellow truck icon asset
      return require('../../../assets/images/ic_in_transit_truck.png');
    case 'pending':
    default:
      // Placeholder for a gray clock/time icon asset
      return require('../../../assets/images/ic_pending_clock.png');
  }
};

const getStyleColor = iconType => {
  switch (iconType) {
    case 'completed':
      return '#10B981'; // Green
    case 'in_transit':
      return '#F59E0B'; // Yellow/Amber
    case 'pending':
    default:
      return '#D1D5DB'; // Light Gray
  }
};

const UserOrderReturnTimeline = ({statuses = []}) => {
  return (
    <View style={styles.container}>
      {statuses.map((item, index) => {
        const isLast = index === statuses.length - 1;
        const iconColor = getStyleColor(item.iconType);

        const lineColor = iconColor;

        return (
          <View key={item.id} style={styles.row}>
            <View style={styles.leftColumn}>
              {!isLast && (
                <View style={[styles.line, {backgroundColor: lineColor}]} />
              )}

              <View style={[styles.dotContainer, {borderColor: iconColor}]}>
                <Image
                  source={getIconSource(item.iconType)}
                  style={styles.iconImage}
                  resizeMode="contain"
                />
              </View>
            </View>

            <View style={styles.rightColumn}>
              <Text
                style={[
                  styles.title,
                  item.iconType === 'in_transit' && styles.activeTitle,
                ]}>
                {item.status}
              </Text>

              {/* Conditional Date/Time */}
              {item.dateTime && (
                <Text style={styles.date}>{item.dateTime}</Text>
              )}

              <Text style={styles.description}>{item.description}</Text>
            </View>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 4,
  },

  row: {
    flexDirection: 'row',
    marginBottom: 21,
    paddingLeft: 10,
  },

  leftColumn: {
    width: 30,
    alignItems: 'center',
    position: 'relative',
  },

  line: {
    position: 'absolute',
    top: 25,
    width: 2,
    height: '100%',
    zIndex: 0,
  },

  dotContainer: {
    width: 25,
    height: 25,
    borderRadius: 12.5, // Make it a perfect circle
    borderWidth: 2,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },

  iconImage: {
    width: 20, // Adjust size to fit inside the 25x25 dot
    height: 20,
  },

  rightColumn: {
    flex: 1,
    paddingLeft: 12,
  },

  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  activeTitle: {
    fontWeight: '700', // Make active title bolder
  },

  date: {
    marginTop: 2,
    fontSize: 13,
    color: '#6B7280',
  },

  description: {
    marginTop: 4,
    fontSize: 14,
    color: '#4B5563',
  },
});

export default UserOrderReturnTimeline;
