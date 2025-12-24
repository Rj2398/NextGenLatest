import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const ItemDetailsScreen = () => {
  return (
    <View>
      <Text>ItemDetailsScreen</Text>
    </View>
  );
};

export default ItemDetailsScreen;

const styles = StyleSheet.create({});

// import React, {useCallback} from 'react';
// import {BackHandler} from 'react-native';
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   TouchableOpacity,
//   Image,
//   StatusBar,
//   Alert,
// } from 'react-native';

// import {
//   useFocusEffect,
//   useNavigation,
//   useRoute,
// } from '@react-navigation/native'; // 🚀 Import useRoute

// import {SafeAreaView} from 'react-native-safe-area-context';

// // --- ItemDetailsScreen Component (Converted to JS) ---

// const ItemDetailsScreen = () => {
//   const navigation = useNavigation();
//   const route = useRoute(); // 🚀 Hook to access route parameters

//   // 🚀 Extract the item data from navigation parameters
//   // Use a default empty object {} if params.item is not provided (for safety)
//   const itemData = route.params?.item || {
//     id: '0',
//     name: 'Error Loading Item',
//     description: 'Data not provided via navigation.',
//     openStock: 0,
//     remainingStock: 0,
//     thresholdValue: 0,
//     onTheWay: 0,
//     sellingPrice: 0,
//     weight: 'N/A',
//     recentActivity: [],
//   };

//   useFocusEffect(
//     useCallback(() => {
//       const onBackPress = () => {
//         navigation.goBack();
//         return true;
//       };

//       const subscription = BackHandler.addEventListener(
//         'hardwareBackPress',
//         onBackPress,
//       );
//       return () => subscription.remove();
//     }, [navigation]),
//   );

//   // 🚀 Removed the static [itemData] = useState(...) block

//   const handleBack = () => {
//     navigation.goBack();
//   };

//   const handleEdit = () => {
//     Alert.alert('Edit Item', `Edit item ${itemData.name}`);
//   };

//   const handleDelete = () => {
//     Alert.alert(
//       'Delete Item',
//       `Are you sure you want to delete "${itemData.name}"?`,
//       [
//         {text: 'Cancel', style: 'cancel'},
//         {
//           text: 'Delete',
//           style: 'destructive',
//           onPress: () => console.log('Item deleted'),
//         },
//       ],
//     );
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

//       {/* Header */}
//       <View style={styles.header}>
//         <TouchableOpacity onPress={handleBack} style={styles.backButton}>
//           <Image
//             source={require('../../../assets/images/ic_back_icon.png')}
//             style={{width: 25, height: 25}}
//             resizeMode="contain"
//           />
//         </TouchableOpacity>
//         {/* 🚀 Dynamic Header Title */}
//         <Text style={styles.headerTitle}>
//           {itemData.name || 'Item Details'}
//         </Text>
//         <View style={styles.headerSpacer} />
//       </View>

//       <ScrollView
//         style={styles.scrollView}
//         showsVerticalScrollIndicator={false}>
//         {/* Item Header Card */}
//         <View style={styles.itemHeaderCard}>
//           <View style={styles.itemHeaderContent}>
//             <View style={styles.itemInfo}>
//               {/* 🚀 Dynamic Name */}
//               <Text style={styles.itemName}>{itemData.name}</Text>
//               {/* 🚀 Dynamic Description (Assuming your transformed data included a description) */}
//               <Text style={styles.itemDescription}>
//                 {itemData.description || 'No description available.'}
//               </Text>
//             </View>
//             <View style={styles.imageContainer}>
//               <Image
//                 source={require('../../../assets/images/ic_maggi.png')}
//                 style={styles.itemImage}
//                 resizeMode="contain"
//               />
//             </View>
//           </View>
//         </View>

//         <View style={styles.metricsCard}>
//           <MetricRow
//             icon={require('../../../assets/images/ic_open_stock.png')}
//             label="Open Stock"
//             value={itemData.openStock.toString()} // 🚀 Dynamic
//           />
//           <MetricRow
//             icon={require('../../../assets/images/ic_remaning_stock.png')}
//             label="Remaining Stock"
//             value={itemData.remainingStock.toString()} // 🚀 Dynamic
//           />
//           <MetricRow
//             icon={require('../../../assets/images/ic_threshold.png')}
//             label="Threshold Value"
//             value={itemData.thresholdValue.toString()} // 🚀 Dynamic
//           />
//           <MetricRow
//             icon={require('../../../assets/images/ic_on_the_way.png')}
//             label="On the Way"
//             value={itemData.onTheWay.toString()} // 🚀 Dynamic
//           />
//           <MetricRow
//             icon={require('../../../assets/images/ic_ruppe.png')}
//             label="Selling Price (SP)"
//             value={`₹${itemData.sellingPrice}`} // 🚀 Dynamic
//           />
//           <MetricRow
//             icon={require('../../../assets/images/ic_weight.png')}
//             label="Weight"
//             value={itemData.weight} // 🚀 Dynamic
//           />
//         </View>

//         {/* Action Buttons */}
//         <View style={styles.actionButtons}>
//           <TouchableOpacity
//             style={styles.editButton}
//             onPress={handleEdit}
//             activeOpacity={0.8}>
//             <Image
//               source={require('../../../assets/images/ic_edit_button.png')}
//               style={{width: 25, height: 25}}
//               resizeMode="contain"
//             />
//             <Text style={styles.editButtonText}>Edit Item</Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             style={styles.deleteButton}
//             onPress={handleDelete}
//             activeOpacity={0.8}>
//             <Image
//               source={require('../../../assets/images/ic_delete_icon.png')}
//               style={{width: 25, height: 25}}
//               resizeMode="contain"
//             />
//             <Text style={styles.deleteButtonText}>Delete Item</Text>
//           </TouchableOpacity>
//         </View>

//         {/* Recent Activity (Now uses the dynamically loaded data) */}
//         <View style={styles.activityCard}>
//           <Text style={styles.activityTitle}>Recent Activity</Text>
//           {itemData?.recentActivity?.map(activity => (
//             <View key={activity.id} style={styles.activityItem}>
//               <View
//                 style={[
//                   styles.activityIcon,
//                   activity.type === 'add'
//                     ? styles.activityIconAdd
//                     : styles.activityIconRemove,
//                 ]}>
//                 <Text style={styles.activityIconText}>
//                   {activity.type === 'add' ? '+' : '-'}
//                 </Text>
//               </View>
//               <View style={styles.activityContent}>
//                 <Text style={styles.activityDescription}>
//                   {activity.description}
//                 </Text>
//                 <Text style={styles.activityDate}>{activity.date}</Text>
//               </View>
//             </View>
//           ))}
//         </View>

//         {/* Back to Inventory Link */}
//         <TouchableOpacity
//           style={styles.backToInventory}
//           onPress={() => navigation.navigate('InventoryScreen')}>
//           <Text style={styles.backToInventoryText}>Back to Inventory</Text>
//         </TouchableOpacity>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// // --- MetricRow Component and Styles (Unchanged) ---
// const MetricRow = ({icon, label, value}) => (
//   <View style={styles.metricRow}>
//     <View style={styles.metricLeft}>
//       <Image
//         source={icon}
//         style={{width: 19, height: 19}}
//         resizeMode="contain"
//       />
//       <Text style={styles.metricLabel}>{label}</Text>
//     </View>
//     <Text style={styles.metricValue}>{value}</Text>
//   </View>
// );

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F9FAFB',
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     backgroundColor: '#FFFFFF',
//     borderBottomWidth: 1,
//     borderBottomColor: '#E5E7EB',
//   },
//   backButton: {
//     padding: 8,
//   },
//   headerTitle: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#111827',
//   },
//   headerSpacer: {
//     width: 40,
//   },
//   iconText: {
//     fontSize: 20,
//     color: '#111827',
//   },
//   scrollView: {
//     flex: 1,
//   },
//   itemHeaderCard: {
//     backgroundColor: '#FFFFFF',
//     marginHorizontal: 16,
//     marginTop: 16,
//     borderRadius: 12,
//     padding: 16,
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: 1},
//     shadowOpacity: 0.05,
//     shadowRadius: 2,
//     elevation: 2,
//   },
//   itemHeaderContent: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   itemInfo: {
//     flex: 1,
//     marginRight: 16,
//   },
//   itemName: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#111827',
//     marginBottom: 4,
//   },
//   itemDescription: {
//     fontSize: 14,
//     color: '#6B7280',
//     lineHeight: 20,
//   },
//   imageContainer: {
//     width: 80,
//     height: 80,
//     backgroundColor: '#DBEAFE',
//     borderRadius: 12,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   itemImage: {
//     width: 60,
//     height: 60,
//   },
//   metricsCard: {
//     backgroundColor: '#FFFFFF',
//     marginHorizontal: 16,
//     marginTop: 16,
//     borderRadius: 12,
//     padding: 16,
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: 1},
//     shadowOpacity: 0.05,
//     shadowRadius: 2,
//     elevation: 2,
//   },
//   metricRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingVertical: 12,
//     borderBottomWidth: 1,
//     borderBottomColor: '#F3F4F6',
//   },
//   metricLeft: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   metricIcon: {
//     fontSize: 20,
//     marginRight: 12,
//   },
//   metricLabel: {
//     fontSize: 16,
//     color: '#6B7280',
//     marginLeft: 10,
//   },
//   metricValue: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#111827',
//   },
//   actionButtons: {
//     marginHorizontal: 16,
//     marginTop: 16,
//     gap: 12,
//   },
//   editButton: {
//     backgroundColor: '#F97316',
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingVertical: 16,
//     borderRadius: 12,
//     gap: 8,
//   },
//   editButtonText: {
//     color: '#FFFFFF',
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   deleteButton: {
//     backgroundColor: '#FFFFFF',
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingVertical: 16,
//     borderRadius: 12,
//     borderWidth: 1,
//     borderColor: '#E5E7EB',
//     gap: 8,
//   },
//   deleteButtonText: {
//     color: '#111827',
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   activityCard: {
//     backgroundColor: '#FFFFFF',
//     marginHorizontal: 16,
//     marginTop: 16,
//     borderRadius: 12,
//     padding: 16,
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: 1},
//     shadowOpacity: 0.05,
//     shadowRadius: 2,
//     elevation: 2,
//   },
//   activityTitle: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#111827',
//     marginBottom: 16,
//   },
//   activityItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 16,
//   },
//   activityIcon: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 12,
//   },
//   activityIconAdd: {
//     backgroundColor: '#D1FAE5',
//   },
//   activityIconRemove: {
//     backgroundColor: '#FEE2E2',
//   },
//   activityIconText: {
//     fontSize: 20,
//     fontWeight: '600',
//     color: '#111827',
//   },
//   activityContent: {
//     flex: 1,
//   },
//   activityDescription: {
//     fontSize: 14,
//     color: '#111827',
//     marginBottom: 2,
//   },
//   activityDate: {
//     fontSize: 12,
//     color: '#9CA3AF',
//   },
//   backToInventory: {
//     alignItems: 'center',
//     paddingVertical: 24,
//     marginBottom: 16,
//   },
//   backToInventoryText: {
//     fontSize: 14,
//     color: '#5A5A5A',
//     textDecorationLine: 'underline',
//     marginTop: 15,
//   },
// });

// export default ItemDetailsScreen;
