import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

// --- COLORS ---
const color = {
    white: '#FFFFFF',
    textDark: '#1E1E1E',
    textGrey: '#757575',
    greenPositive: '#4CAF50',
    redNegative: '#F44336',
    borderLight: '#E0E0E0',
};

const StatCard = ({ title, value, change, isPositive, unit }) => {
    const changeColor = isPositive ? color.greenPositive : color.redNegative;
    const iconName = isPositive ? 'arrow-up' : 'arrow-down';

    return (
        <View style={styles.card}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.value}>{value}</Text>
            <View style={styles.changeRow}>
                <Ionicons name={iconName} size={12} color={changeColor} />
                <Text style={[styles.changeText, { color: changeColor }]}>{change}</Text>
                <Text style={styles.unitText}>{unit}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        flex: 1,
        backgroundColor: color.white,
        borderRadius: 10,
        padding: 12,
        marginHorizontal: 4,
        borderWidth: 1,
        borderColor: color.borderLight,
        // Small shadow for depth (optional)
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 1,
        elevation: 1,
    },
    title: {
        fontSize: 12,
        color: color.textGrey,
        fontWeight: '500',
        marginBottom: 5,
    },
    value: {
        fontSize: 18,
        fontWeight: '700',
        color: color.textDark,
        marginBottom: 5,
    },
    changeRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    changeText: {
        fontSize: 12,
        fontWeight: '600',
        marginLeft: 2,
    },
    unitText: {
        fontSize: 12,
        color: color.textGrey,
        marginLeft: 4,
        fontWeight: '500',
    }
});

export default StatCard;