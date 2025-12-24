import React from 'react';
import { ScrollView, Text, StyleSheet, TouchableOpacity } from 'react-native';

const tabs = ['All Orders', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

const UserOrderFilterTab = ({ activeTab, onTabPress }) => {
  return (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={tabsStyles.container}
    >
      {tabs.map(tab => (
        <TouchableOpacity
          key={tab}
          style={[
            tabsStyles.tab,
            activeTab === tab && tabsStyles.activeTab,
          ]}
          onPress={() => onTabPress(tab)}
        >
          <Text 
            style={[
              tabsStyles.tabText,
              activeTab === tab && tabsStyles.activeTabText,
            ]}
          >
            {tab}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const tabsStyles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingBottom: 10,
    backgroundColor: '#F7F7F7',
  },
  tab: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F0F0F0',
    marginRight: 10,
    minHeight:40
  },
  activeTab: {
    backgroundColor: '#FF8C00', // Orange background for active tab
  },
  tabText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  activeTabText: {
    color: 'white',
  },
});

export default UserOrderFilterTab;