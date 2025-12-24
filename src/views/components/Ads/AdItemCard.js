import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import PrimaryButton from '../PrimaryButton';

// --- COLORS ---
const color = {
    white: '#FFFFFF',
    black: '#000000',
    textDark: '#1E1E1E',
    textGrey: '#757575',
    borderLight: '#E0E0E0',
    orangePrimary: '#FF8719',
    greenLive: '#43A3A3', // For 'Live' tag
    yellowExpired: '#C8A825', // For 'Expired/Expiring' tag
    orangeLight: '#FF8719',
    greyBackground: '#F5F5F5',
};

// Note: PrimaryButton component is no longer needed here as we use a simple TouchableOpacity 
// for the fixed split layout.

const Tag = ({ text, type }) => {
    let backgroundColor = color.greenLive;
    let textColor = color.white;


    if (type === 'Expired') {
        backgroundColor = color.yellowExpired;
        textColor = color.black;
    } else if (type === 'Boosted') {
        backgroundColor = color.orangeLight;
        textColor = color.orangePrimary;
    }

    return (
        <View style={[styles.tagContainer, { backgroundColor }]}>
            <Text style={[styles.tagText, { color: textColor }]}>{text}</Text>
        </View>
    );
};


const AdItemCard = ({ 
    imageUri, 
    title, 
    price, 
    location, 
    status, // 'Live', 'Expiring Soon'
    isBoosted, // Boolean
    onBoost,
    onEdit,
    onView,
    onDelete,
}) => {
    const getStatusTag = () => {
        if (status === 'Live') return <Tag text="Live" type="Live" />;
        if (status === 'Expiring Soon') return <Tag text="Expiring Soon" type="Expired" />;
        return null;
    };

    return (
        <View style={styles.card}>
            <Image source={{ uri: imageUri }} style={styles.productImage} />

            <View style={styles.infoContainer}>
                <View style={styles.titleRow}>
                    <Text style={styles.productTitle} numberOfLines={1}>{title}</Text>
                    {getStatusTag()}
                </View>

                <Text style={styles.productPrice}>{`$${price}`}</Text>

                <View style={styles.locationRow}>
                    <Ionicons name="location-outline" size={14} color={color.textGrey} />
                    <Text style={styles.locationText}>{location}</Text>
                </View>

                {/* Boosted Text */}
                {isBoosted && (
                    <Text style={styles.boostedText}>Boosted</Text>
                )}

                {/* --- ALWAYS SPLIT ACTION ROW (New Requirement) --- */}
                <View style={styles.actionRow}>
                    {/* 1. Boost Button (Always present on the left) */}
            
                    <PrimaryButton 
                    title="Boost" 
                    style={styles.boostButton}/>
                    
                    {/* 2. Icon Group (Always present on the right) */}
                    <View style={styles.iconGroup}>
                        <TouchableOpacity onPress={onEdit} style={styles.iconButton}>
                            {/* <Ionicons name="pencil-outline" size={20} color={color.textGrey} /> */}
                            <Image
                            source={require('../../../assets/ad_edit.png')}
                            style={{ width: 20, height: 20 }}
                            resizeMode="contain"/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onView} style={styles.iconButton}>
                        <Image
                            source={require('../../../assets/ad_view.png')}
                            style={{ width: 20, height: 20 }}
                            resizeMode="contain"/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onDelete} style={styles.iconButton}>
                        <Image
                            source={require('../../../assets/ad_delete.png')}
                            style={{ width: 20, height: 20 }}
                            resizeMode="contain"/>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
};

// --- STYLESHEET for AdItemCard ---
const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        backgroundColor: color.white,
        borderRadius: 12,
        marginHorizontal: 15,
        marginBottom: 15,
        padding: 10,
        borderWidth: 1,
        borderColor: color.borderLight,
    },
    productImage: {
        width: 80,
        height: 80,
        borderRadius: 8,
        marginRight: 10,
        backgroundColor: color.greyBackground,
        resizeMode: 'cover',
    },
    infoContainer: {
        flex: 1,
        justifyContent: 'space-between',
    },
    titleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 2,
        
    
    },
    productTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: color.textDark,
        flexShrink: 1,
        marginRight: 5,
        
    },
    productPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: color.textDark,
        marginBottom: 4,
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
        
    },
    locationText: {
        fontSize: 12,
        color: color.textGrey,
        marginLeft: 3,
    },
    boostedText: {
        fontSize: 12,
        fontWeight: '600',
        color: color.orangePrimary,
        marginBottom: 5,
    },
    tagContainer: {
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 5,
        alignSelf: 'flex-start',
      borderRadius: 15,
    },
    tagText: {
        fontSize: 10,
        fontWeight: '700',
    },
    
    // --- FIXED ACTION ROW STYLES ---
    actionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between', // Pushes Boost button left and Icons right
        alignItems: 'center',
        marginTop: 5,
    },
    boostButton: {
        backgroundColor: color.orangePrimary,
        borderRadius: 8,
        paddingVertical: 8,
        paddingHorizontal: 15,
        alignItems: 'center',
        width: '40%', // Fixed width for Boost button
    },
    boostButtonText: {
        color: color.white,
        fontSize: 14,
        fontWeight: '600',
    },
    iconGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        // flex: 1, // Optional: You can uncomment this if you need icons to aggressively push right
    },
    iconButton: {
        paddingHorizontal: 5,
        paddingVertical: 2,
        marginLeft: 8,
    },
});

export default AdItemCard;