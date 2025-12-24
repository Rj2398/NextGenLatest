import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet,Image } from 'react-native';

const UserHeader = ({ title, onBackPress }) => {
    return (
        <View style={styles.headerContainer}>

            {/* Back Button */}
            <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
                {/* <Text style={styles.backArrowIcon}>{'<'}</Text> */}
                <Image
            source={require('../../../assets/images/i.png')}
            style={{ width: 20, height: 20 }}
            resizeMode="contain"
          />
            </TouchableOpacity>

            {/* Center Title */}
            <Text style={styles.headerTitle}>{title}</Text>

        </View>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        width:'100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'#FFFFFF'
    },

    backButton: {
        position: 'absolute',
        left: 10,
        justifyContent: 'center',
        height: '100%',
    },

    backArrowIcon: {
        fontSize: 26,
        color: '#222222',
    },

    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#222222',
    },
});

export default UserHeader;
