import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

const UserOrderTimeline = ({statuses = []}) => {
  return (
    <View style={styles.container}>
      {statuses.map((item, index) => {
        const isLast = index === statuses.length - 1;
        const color = item.completed ? '#10B981' : '#D1D5DB';

        return (
          <View key={item.id} style={styles.row}>
            {/* LEFT COLUMN */}
            <View style={styles.leftColumn}>
              {/* LINE BEHIND CIRCLE */}
              {!isLast && <View style={styles.line} />}

              {/* CIRCLE */}
              {/* <View style={[styles.dot, { borderColor: color }]}>
                {item.completed && (
                  <Text style={[styles.check, { color: color }]}>✓</Text>
                )}
              </View> */}

              <Image
                source={require('../../../assets/images/ic_shipment_track.png')}
                style={[styles.dot, {borderColor: color}]}></Image>
            </View>

            {/* RIGHT SIDE */}
            <View style={styles.rightColumn}>
              <Text style={styles.title}>{item.status}</Text>
              <Text style={styles.date}>
                {item.date} • {item.time}
              </Text>
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
  },

  leftColumn: {
    width: 30,
    alignItems: 'center',
    position: 'relative',
  },

  /** This creates the PERFECT continuous line */
  line: {
    position: 'absolute',
    top: 20, // start exactly from bottom of circle
    width: 2,
    backgroundColor: '#D1D5DB',
    height: '100%',
    zIndex: 0,
  },

  dot: {
    width: 25,
    height: 25,
    borderRadius: 17,
    borderWidth: 2,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },

  check: {
    fontSize: 12,
    fontWeight: '700',
  },

  rightColumn: {
    flex: 1,
    paddingLeft: 12,
  },

  title: {
    fontSize: 16,
    fontWeight: '900',
    color: '#1F2937',
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

export default UserOrderTimeline;
