import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const CardWithAction = ({children, title, description}) => {
  //   console.log(children, '******sssssss*****');
  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>{title}</Text>
        {description && (
          <Text style={styles.cardDescription}>{description}</Text>
        )}
      </View>
      <View style={styles.cardBody}>{children}</View>
    </View>
  );
};

export default CardWithAction;

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    padding: 15,
    marginBottom: 20,
    elevation: 2, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
  },
  cardHeader: {
    marginBottom: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#F0F0F0',
    paddingBottom: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#333',
  },
  cardDescription: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },
  cardBody: {
    // Fields are rendered here. No special style needed unless fields need alignment.
  },
});
