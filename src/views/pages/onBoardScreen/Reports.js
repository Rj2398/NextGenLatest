
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

// --- Components (Assuming you have Header and the ones we just created) ---
// import Header from '../../components/Header'; // Assuming Header exists
import StatCard from '../../components/Report/StatCard'; // Assuming in the same directory for this example
import { CategoryItem, ProductItem } from '../../components/Report/ReportItemCard'; // Assuming in the same directory
// --------------------------------------------------------------------------

// --- COLORS ---
const color = {
    white: '#FFFFFF',
    black: '#000000',
    greyBackground: '#F5F5F5',
    orangePrimary: '#FF8719', 
    textDark: '#1E1E1E',
    textGrey: '#757575',
    borderLight: '#E0E0E0',
    orangeLight: '#FFF5E8', // Light background for active tab
};

// --- Mock Data ---
const statData = [
    { title: 'Total Profit', value: '$24,500', change: '12.5%', isPositive: true },
    { title: 'Revenue', value: '$89,240', change: '8.2%', isPositive: true},
    { title: 'Sales', value: '1,247', change: '2% less than', isPositive: false},
];

const categoryData = [
    { name: 'Online Courses', value: '12,458', dotColor: '#FF8719' }, // Orange
    { name: 'Textbooks', value: '8,329', dotColor: '#EF5350' }, // Red
    { name: 'Lab Equipment', value: '5,898', dotColor: '#26A69A' }, // Teal
];

const productData = [
    { name: 'Advanced Mathematics', sku: 'SKU: ADS-907', value: '2,458', unitsSold: 124, imageUri: 'https://picsum.photos/40/40?random=1' },
    { name: 'Chemistry Lab Kit', sku: 'SKU: LAB-105', value: '1,780', unitsSold: 89, imageUri: 'https://picsum.photos/40/40?random=2' },
    { name: 'Digital Learning Platform', sku: 'SKU: DIG-102', value: '1,348', unitsSold: 67, imageUri: 'https://picsum.photos/40/40?random=3' },
];

const Reports = ({ navigation }) => {
    const [activeTab, setActiveTab] = useState('Overview');
    const [activeDateFilter, setActiveDateFilter] = useState('7D');
    
    const dateFilters = ['Last 24h', '7D', '1M', 'YTD'];
    const tabs = ['Overview', 'Reports & Rescheduling'];
    
    // Placeholder for Header (Since we don't have your actual Header component)
    const renderHeader = () => (
        <View style={styles.headerContainer}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerIcon}>
                <Ionicons name="arrow-back" size={24} color={color.textDark} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Reports</Text>
            <TouchableOpacity onPress={() => console.log('Menu Pressed')} style={styles.headerIcon}>
                <Ionicons name="menu-outline" size={30} color={color.textDark} />
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            {/* Header */}
            {renderHeader()}
            
            {/* Tabs (Fixed at the top) */}
            <View style={styles.tabsContainer}>
                {tabs.map(tab => (
                    <TouchableOpacity
                        key={tab}
                        style={[
                            styles.tabButton,
                            activeTab === tab && styles.activeTabButton,
                        ]}
                        onPress={() => setActiveTab(tab)}
                    >
                        <Text style={[
                            styles.tabText,
                            activeTab === tab && styles.activeTabText,
                        ]}>{tab}</Text>
                    </TouchableOpacity>
                ))}
            </View>
            
            {/* Main Content ScrollView */}
            <ScrollView contentContainerStyle={styles.scrollContent}>
                
                {/* Date Filters */}
                <View style={styles.filterRow}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {dateFilters.map(filter => (
                            <TouchableOpacity
                                key={filter}
                                style={[
                                    styles.dateFilterButton,
                                    activeDateFilter === filter && styles.activeDateFilterButton,
                                ]}
                                onPress={() => setActiveDateFilter(filter)}
                            >
                                <Text style={[
                                    styles.dateFilterText,
                                    activeDateFilter === filter && styles.activeDateFilterText,
                                ]}>{filter}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                    <TouchableOpacity onPress={() => console.log('Filter Pressed')} style={styles.dateFilterIcon}>
                        <Ionicons name="filter-outline" size={20} color={color.textDark} />
                    </TouchableOpacity>
                </View>

                {/* Stat Cards */}
                <View style={styles.statsRow}>
                    {statData.map((stat, index) => (
                        <StatCard 
                            key={index}
                            title={stat.title}
                            value={stat.value}
                            change={stat.change}
                            isPositive={stat.isPositive}
                            unit={stat.unit}
                        />
                    ))}
                </View>
                
                {/* Sales Overview Card (Placeholder for Graph) */}
                <View style={styles.chartCard}>
                    <View style={styles.chartHeader}>
                        <Text style={styles.chartTitle}>Sales Overview</Text>
                        <Text style={styles.chartSubTitle}>Last 7 Days</Text>
                    </View>
                    <View style={styles.chartPlaceholder} />
                </View>

                {/* Best Selling Category Card */}
                <View style={styles.dataCard}>
                    <View style={styles.dataCardHeader}>
                        <Text style={styles.dataCardTitle}>Best Selling Category</Text>
                        <TouchableOpacity onPress={() => console.log('See all Categories')}>
                            <Text style={styles.seeAllText}>See all</Text>
                        </TouchableOpacity>
                    </View>
                    {categoryData.map((item, index) => (
                        <CategoryItem 
                            key={index} 
                            name={item.name} 
                            value={item.value} 
                            dotColor={item.dotColor}
                        />
                    ))}
                </View>

                {/* Best Selling Products Card */}
                <View style={styles.dataCard}>
                    <View style={styles.dataCardHeader}>
                        <Text style={styles.dataCardTitle}>Best Selling Products</Text>
                        <TouchableOpacity onPress={() => console.log('See all Products')}>
                            <Text style={styles.seeAllText}>See all</Text>
                        </TouchableOpacity>
                    </View>
                    {productData.map((item, index) => (
                        <ProductItem 
                            key={index} 
                            name={item.name} 
                            sku={item.sku} 
                            value={item.value} 
                            unitsSold={item.unitsSold}
                            imageUri={item.imageUri}
                        />
                    ))}
                </View>
                
                <View style={{ height: 20 }} /> 
            </ScrollView>

        </View>
    );
};

// --- STYLESHEET for Reports.js ---
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.greyBackground,
    },
    // Header Styles (Placeholder)
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 15,
        backgroundColor: color.white,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: color.textDark,
    },
    headerIcon: {
        paddingHorizontal: 5,
    },

    // Tabs Styles
    tabsContainer: {
        flexDirection: 'row',
        backgroundColor: color.orangeLight,
        borderRadius: 10,
        marginHorizontal: 15,
        marginBottom: 10,
        padding: 4,
    },
    tabButton: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 10,
        borderRadius: 8,
    },
    activeTabButton: {
        backgroundColor: color.orangePrimary,
    },
    tabText: {
        fontSize: 14,
        fontWeight: '600',
        color: color.orangePrimary,
    },
    activeTabText: {
        color: color.white,
    },

    // Main Scroll Content
    scrollContent: {
        paddingHorizontal: 15,
        paddingBottom: 20,
    },

    // Date Filters
    filterRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        justifyContent: 'space-between',
    },
    dateFilterButton: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 5,
        marginRight: 8,
        backgroundColor: color.white,
    },
    activeDateFilterButton: {
        backgroundColor: color.orangePrimary,
    },
    dateFilterText: {
        fontSize: 12,
        fontWeight: '600',
        color: color.textDark,
    },
    activeDateFilterText: {
        color: color.white,
    },
    dateFilterIcon: {
        padding: 5,
    },

    // Stat Cards
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
        marginHorizontal: -4, // Counteract card margin
    },

    // Sales Overview Card (Chart)
    chartCard: {
        backgroundColor: color.white,
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: color.borderLight,
    },
    chartHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    chartTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: color.textDark,
    },
    chartSubTitle: {
        fontSize: 14,
        fontWeight: '500',
        color: color.textGrey,
    },
    chartPlaceholder: {
        height: 200, // Placeholder height for the chart area
        backgroundColor: color.greyBackground,
        borderRadius: 5,
    },

    // Best Selling Data Cards (Category/Products)
    dataCard: {
        backgroundColor: color.white,
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: color.borderLight,
    },
    dataCardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 5,
        marginBottom: 5,
    },
    dataCardTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: color.textDark,
    },
    seeAllText: {
        fontSize: 12,
        fontWeight: '600',
        color: color.orangePrimary,
    },
});

export default Reports;