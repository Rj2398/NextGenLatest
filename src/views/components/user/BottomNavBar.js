// BottomNavBar.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Colors = {
    White: '#fff',
    IconInactive: '#888',
    IconActive: '#FF6600',
    ShadowColor: '#000',
};

const TabItem = ({ icon, label, isActive }) => (
    <TouchableOpacity style={styles.tabItem} activeOpacity={0.7}>
        <Text style={[styles.icon, { color: isActive ? Colors.IconActive : Colors.IconInactive }]}>
            {icon}
        </Text>
        {/* You can add a text label here if needed, but the screenshot only shows icons */}
    </TouchableOpacity>
);

const BottomNavBar = () => (
    <View style={styles.container}>
        <TabItem icon="💬" label="Chat" isActive={false} />
        <TabItem icon="🛍️" label="Shop" isActive={true} />
        <TabItem icon="👤" label="Profile" isActive={false} />
    </View>
);

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 60,
        backgroundColor: Colors.White,
        borderTopWidth: 1,
        borderTopColor: '#eee',
        // Shadow for the floating effect
        shadowColor: Colors.ShadowColor,
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 10,
    },
    tabItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
    },
    icon: {
        fontSize: 24,
    },
});

export default BottomNavBar;