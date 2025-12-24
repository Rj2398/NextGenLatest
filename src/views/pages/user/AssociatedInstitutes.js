// import {
//   StyleSheet,
//   Text,
//   View,
//   ScrollView,
//   TouchableOpacity,
//   Modal,
//   Dimensions,
// } from 'react-native';
// import React, {useState, useCallback} from 'react';
// import UserHeader from '../../components/user/UserHeader';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import AddInstituteModal from '../../components/user/AddInstituteModal';
// import {useNavigation} from '@react-navigation/native';

// // Initialize data with a unique ID counter
// let nextId = 4;
// const initialInstitutes = [
//   {
//     id: '1',
//     name: 'Harvard University',
//     location: 'Cambridge, MA',
//     type: 'University',
//     icon: 'office-building',
//   },
//   {
//     id: '2',
//     name: 'Delhi Public School',
//     location: 'New Delhi, India',
//     type: 'School',
//     icon: 'school',
//   },
//   {
//     id: '3',
//     name: 'MIT College',
//     location: 'Boston, MA',
//     type: 'College',
//     icon: 'domain',
//   },
// ];

// // --- Menu Component (Popover Simulation) ---
// const CardMenu = ({onEdit, onRemove}) => (
//   <View style={styles.menuContainer}>
//     <TouchableOpacity style={styles.menuItem} onPress={onEdit}>
//       <Icon name="pencil" size={16} color="#333" />
//       <Text style={styles.menuText}>Edit</Text>
//     </TouchableOpacity>
//     <View style={styles.menuSeparator} />
//     <TouchableOpacity style={styles.menuItem} onPress={onRemove}>
//       <Icon name="trash-can-outline" size={16} color="#ff8c42" />
//       <Text style={[styles.menuText, {color: '#ff8c42'}]}>Remove</Text>
//     </TouchableOpacity>
//   </View>
// );

// // --- Institute Card Component ---
// const InstituteCard = ({item, onMenuPress, navigation}) => (
//   <View style={[styles.cardBase, styles.instituteCard]}>
//     <View style={styles.iconBackgroundWrapper}>
//       <Icon name={item.icon} size={28} color="#ff8c42" />
//     </View>
//     <TouchableOpacity
//       style={styles.textContainer}
//       onPress={() => navigation.navigate('Students')}>
//       <Text style={styles.instituteName}>{item.name}</Text>
//       <Text style={styles.instituteDetails}>
//         {item.location} • {item.type}
//       </Text>
//     </TouchableOpacity>

//     <TouchableOpacity
//       style={styles.menuButton}
//       onPress={() => onMenuPress(item.id)}>
//       <Icon name="dots-vertical" size={24} color="#666" />
//     </TouchableOpacity>
//   </View>
// );

// // --- Main Screen Component ---
// const AssociatedInstitutes = () => {
//   const navigation = useNavigation();

//   const [institutes, setInstitutes] = useState(initialInstitutes);
//   const [activeMenuId, setActiveMenuId] = useState(null);
//   const [isModalVisible, setIsModalVisible] = useState(false);

//   const handleMenuPress = id => {
//     setActiveMenuId(id === activeMenuId ? null : id);
//   };

//   const handleEdit = () => {
//     console.log('Editing Institute:', activeMenuId);
//     setActiveMenuId(null);
//   };

//   const handleRemove = useCallback(() => {
//     setInstitutes(currentInstitutes =>
//       currentInstitutes.filter(inst => inst.id !== activeMenuId),
//     );
//     console.log('Removed Institute:', activeMenuId);
//     setActiveMenuId(null);
//   }, [activeMenuId]);

//   const handleSaveNewInstitute = useCallback(({name, location, type}) => {
//     const newInstitute = {
//       id: String(nextId++),
//       name,
//       location,
//       type,
//       // Simple logic to choose icon based on type
//       icon: type.toLowerCase().includes('school')
//         ? 'school'
//         : 'office-building',
//     };
//     setInstitutes(currentInstitutes => [...currentInstitutes, newInstitute]);
//     setIsModalVisible(false);
//   }, []);

//   return (
//     <View style={{flex: 1, backgroundColor: '#fdf7f4'}}>
//       <UserHeader
//         title="Associated Institutes"
//         backButton={true}
//         arrow={false}
//       />
//       <ScrollView contentContainerStyle={styles.scrollContent}>
//         {institutes.map(item => (
//           <View key={item.id}>
//             <InstituteCard
//               item={item}
//               onMenuPress={handleMenuPress}
//               navigation={navigation}
//             />

//             {activeMenuId === item.id && (
//               <View style={styles.menuPlacement}>
//                 <CardMenu onEdit={handleEdit} onRemove={handleRemove} />
//               </View>
//             )}
//           </View>
//         ))}
//       </ScrollView>

//       {/* FLOATING ACTION BUTTON (FAB) */}
//       <TouchableOpacity
//         style={styles.fabButton}
//         onPress={() => setIsModalVisible(true)}>
//         <Icon name="plus" size={30} color="#fff" />
//       </TouchableOpacity>

//       {/* ADD NEW INSTITUTE MODAL */}
//       <AddInstituteModal
//         isVisible={isModalVisible}
//         onClose={() => setIsModalVisible(false)}
//         onSave={handleSaveNewInstitute}
//       />
//     </View>
//   );
// };

// export default AssociatedInstitutes;

// // --- Stylesheet ---
// const styles = StyleSheet.create({
//   scrollContent: {
//     padding: 20,
//     paddingBottom: 40,
//   },
//   cardBase: {
//     backgroundColor: '#fff',
//     borderRadius: 12,
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: 1},
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   instituteCard: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 15,
//     marginBottom: 15,
//     zIndex: 1,
//   },
//   iconBackgroundWrapper: {
//     backgroundColor: '#ffe7d9',
//     borderRadius: 8,
//     padding: 8,
//     marginRight: 15,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   textContainer: {
//     flex: 1,
//     justifyContent: 'center',
//   },
//   instituteName: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#333',
//     marginBottom: 2,
//   },
//   instituteDetails: {
//     fontSize: 12,
//     color: '#666',
//   },
//   menuButton: {
//     padding: 5,
//   },
//   menuPlacement: {
//     position: 'absolute',
//     top: 5,
//     right: 5,
//     zIndex: 10,
//   },
//   menuContainer: {
//     backgroundColor: '#fff',
//     borderRadius: 8,
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: 2},
//     shadowOpacity: 0.2,
//     shadowRadius: 5,
//     elevation: 5,
//     paddingVertical: 5,
//     width: 120,
//   },
//   menuItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 15,
//     paddingVertical: 10,
//   },
//   menuText: {
//     marginLeft: 10,
//     fontSize: 14,
//     color: '#333',
//   },
//   menuSeparator: {
//     height: 1,
//     backgroundColor: '#eee',
//     marginVertical: 2,
//   },
//   fabButton: {
//     position: 'absolute',
//     width: 60,
//     height: 60,
//     alignItems: 'center',
//     justifyContent: 'center',
//     right: 20,
//     bottom: 20,
//     backgroundColor: '#ff8c42',
//     borderRadius: 30,
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: 4},
//     shadowOpacity: 0.3,
//     shadowRadius: 5,
//     elevation: 8,
//   },
// });

//

import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Modal,
  Dimensions,
} from 'react-native';
import React, {useState, useCallback} from 'react';
import UserHeader from '../../components/user/UserHeader';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AddInstituteModal from '../../components/user/AddInstituteModal'; // Assuming this component exists
// import RemoveModal from './RemoveModal'; // <-- IMPORT THE NEW MODAL
import {useNavigation} from '@react-navigation/native';
import RemoveModal from '../../components/user/RemoveModal';
import {SafeAreaView} from 'react-native-safe-area-context';

// Initialize data with a unique ID counter
let nextId = 4;
const initialInstitutes = [
  {
    id: '1',
    name: 'Harvard University',
    location: 'Cambridge, MA',
    type: 'University',
    icon: 'office-building',
  },
  {
    id: '2',
    name: 'Delhi Public School',
    location: 'New Delhi, India',
    type: 'School',
    icon: 'school',
  },
  {
    id: '3',
    name: 'MIT College',
    location: 'Boston, MA',
    type: 'College',
    icon: 'domain',
  },
];

// --- Menu Component (Popover Simulation) ---
const CardMenu = ({onEdit, onRemove}) => (
  <View style={styles.menuContainer}>
    <TouchableOpacity style={styles.menuItem} onPress={onEdit}>
      <Icon name="pencil" size={16} color="#333" />
      <Text style={styles.menuText}>Edit</Text>
    </TouchableOpacity>
    <View style={styles.menuSeparator} />
    <TouchableOpacity style={styles.menuItem} onPress={onRemove}>
      <Icon name="trash-can-outline" size={16} color="#ff8c42" />
      <Text style={[styles.menuText, {color: '#ff8c42'}]}>Remove</Text>
    </TouchableOpacity>
  </View>
);

// --- Institute Card Component ---
const InstituteCard = ({item, onMenuPress, navigation}) => (
  <View style={[styles.cardBase, styles.instituteCard]}>
    <View style={styles.iconBackgroundWrapper}>
      <Icon name={item.icon} size={28} color="#ff8c42" />
    </View>
    <TouchableOpacity
      style={styles.textContainer}
      onPress={() => navigation.navigate('Students')}>
      <Text style={styles.instituteName}>{item.name}</Text>
      <Text style={styles.instituteDetails}>
        {item.location} • {item.type}
      </Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={styles.menuButton}
      onPress={() => onMenuPress(item.id)}>
      <Icon name="dots-vertical" size={24} color="#666" />
    </TouchableOpacity>
  </View>
);

// --- Main Screen Component ---
const AssociatedInstitutes = () => {
  const navigation = useNavigation();

  const [institutes, setInstitutes] = useState(initialInstitutes);
  const [activeMenuId, setActiveMenuId] = useState(null);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false); // Renamed for clarity

  // NEW STATES FOR REMOVE MODAL
  const [isRemoveModalVisible, setIsRemoveModalVisible] = useState(false);
  // Store the data of the institute being considered for removal
  const [instituteToRemove, setInstituteToRemove] = useState(null);

  const handleMenuPress = id => {
    setActiveMenuId(id === activeMenuId ? null : id);
  };

  const handleEdit = () => {
    console.log('Editing Institute:', activeMenuId);
    setActiveMenuId(null);
  };

  // 1. UPDATED: Open the Remove Modal and set the institute to remove
  const handleRemove = useCallback(() => {
    const instituteData = institutes.find(inst => inst.id === activeMenuId);

    // Set the data and show the modal
    if (instituteData) {
      setInstituteToRemove(instituteData);
      setIsRemoveModalVisible(true);
    }
    // Always close the card menu
    setActiveMenuId(null);
  }, [activeMenuId, institutes]);

  // 2. NEW: Function executed when 'Delete' is pressed inside the RemoveModal
  const confirmRemove = useCallback(() => {
    if (instituteToRemove) {
      setInstitutes(currentInstitutes =>
        currentInstitutes.filter(inst => inst.id !== instituteToRemove.id),
      );
      console.log('Removed Institute:', instituteToRemove.name);
    }
    // Close the modal and clear the removal data
    setIsRemoveModalVisible(false);
    setInstituteToRemove(null);
  }, [instituteToRemove]);

  // Handler for closing the Remove Modal (Cancel action)
  const closeRemoveModal = useCallback(() => {
    setIsRemoveModalVisible(false);
    setInstituteToRemove(null);
  }, []);

  const handleSaveNewInstitute = useCallback(({name, location, type}) => {
    const newInstitute = {
      id: String(nextId++),
      name,
      location,
      type,
      // Simple logic to choose icon based on type
      icon: type.toLowerCase().includes('school')
        ? 'school'
        : 'office-building',
    };
    setInstitutes(currentInstitutes => [...currentInstitutes, newInstitute]);
    setIsAddModalVisible(false);
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fdf7f4'}}>
      <UserHeader
        title="Associated Institutes"
        onBackPress={() => navigation.goBack()}
      />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {institutes.map(item => (
          <View key={item.id}>
            <InstituteCard
              item={item}
              onMenuPress={handleMenuPress}
              navigation={navigation}
            />

            {activeMenuId === item.id && (
              <View style={styles.menuPlacement}>
                <CardMenu onEdit={handleEdit} onRemove={handleRemove} />
              </View>
            )}
          </View>
        ))}
      </ScrollView>

      {/* FLOATING ACTION BUTTON (FAB) */}
      <TouchableOpacity
        style={styles.fabButton}
        onPress={() => setIsAddModalVisible(true)}>
        <Icon name="plus" size={30} color="#fff" />
      </TouchableOpacity>

      {/* ADD NEW INSTITUTE MODAL */}
      <AddInstituteModal
        isVisible={isAddModalVisible}
        onClose={() => setIsAddModalVisible(false)}
        onSave={handleSaveNewInstitute}
      />

      {/* RENDER THE NEW REMOVE MODAL */}
      <RemoveModal
        isVisible={isRemoveModalVisible}
        onClose={closeRemoveModal}
        onConfirm={confirmRemove}
        instituteData={instituteToRemove} // Pass the selected institute data
      />
    </SafeAreaView>
  );
};

export default AssociatedInstitutes;

// --- Stylesheet (Unchanged) ---
const styles = StyleSheet.create({
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  cardBase: {
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  instituteCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginBottom: 15,
    zIndex: 1,
  },
  iconBackgroundWrapper: {
    backgroundColor: '#ffe7d9',
    borderRadius: 8,
    padding: 8,
    marginRight: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  instituteName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  instituteDetails: {
    fontSize: 12,
    color: '#666',
  },
  menuButton: {
    padding: 5,
  },
  menuPlacement: {
    position: 'absolute',
    top: 5,
    right: 5,
    zIndex: 10,
  },
  menuContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    paddingVertical: 5,
    width: 120,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  menuText: {
    marginLeft: 10,
    fontSize: 14,
    color: '#333',
  },
  menuSeparator: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 2,
  },
  fabButton: {
    position: 'absolute',
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
    bottom: 20,
    backgroundColor: '#ff8c42',
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
});
