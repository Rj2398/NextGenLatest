// import React, {useState} from 'react';
// import {
//   StyleSheet,
//   Text,
//   View,
//   ScrollView,
//   TouchableOpacity,
//   Alert,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// // Assuming UserHeader is in this path
// import UserHeader from '../../components/user/UserHeader';
// import RemoveModal from '../../components/user/RemoveModal';

// // --- Mock Data ---
// const MOCK_STUDENTS = [
//   {
//     id: 's1',
//     name: 'Shivam Gupta',
//     location: 'Cambridge, MA',
//     type: 'University',
//     data: {
//       studentId: 'UNI1001',
//       age: 25,
//       gender: 'Male',
//       grade: 'Graduate Student',
//     },
//   },
//   {
//     id: 's2',
//     name: 'Sanjeev Yadav',
//     location: 'New Delhi, India',
//     type: 'School',
//     data: {
//       studentId: 'SCH502',
//       age: 15,
//       gender: 'Male',
//       grade: '10th Grade',
//     },
//   },
//   {
//     id: 's3',
//     name: 'Arzoo Sacahan',
//     location: 'Boston, MA',
//     type: 'College',
//     data: {
//       studentId: 'COL305',
//       age: 20,
//       gender: 'Female',
//       grade: 'College Freshman',
//     },
//   },
// ];

// // -----------------------------------------------------------------
// // --- Dropdown Menu Component (CardMenu) ---
// // -----------------------------------------------------------------
// const CardMenu = ({onEdit, onRemove}) => (
//   <View style={styles.menuDropdown}>
//     {/* Edit Option */}
//     <TouchableOpacity onPress={onEdit} style={styles.menuItem}>
//       <Icon name="pencil-outline" size={16} color="#333" />
//       <Text style={styles.menuItemText}>Edit</Text>
//     </TouchableOpacity>

//     {/* Remove Option */}
//     <View style={styles.menuDivider} />
//     <TouchableOpacity onPress={onRemove} style={styles.menuItem}>
//       <Icon name="delete-outline" size={16} color="#d9534f" />
//       <Text style={[styles.menuItemText, styles.removeText]}>Remove</Text>
//     </TouchableOpacity>
//   </View>
// );

// // -----------------------------------------------------------------
// // --- Student Card Component (Stateless - only shows '...') ---
// // -----------------------------------------------------------------

// // The card now only accepts a handler for the menu button
// const StudentCard = ({item, onMenuPress}) => {
//   return (
//     <View style={styles.cardContainer}>
//       {/* User Icon */}
//       <Icon name="account" size={24} color="#ff8c42" style={styles.cardIcon} />

//       {/* Student Details */}
//       <View style={styles.cardTextContainer}>
//         <Text style={styles.cardName}>{item.name}</Text>
//         <Text style={styles.cardDetails}>
//           {item.location} • {item.type}
//         </Text>
//       </View>

//       {/* Menu/Options Button - Calls the parent handler */}
//       <TouchableOpacity
//         onPress={() => onMenuPress(item.id)}
//         style={styles.cardMenuButton}>
//         <Icon name="dots-vertical" size={24} color="#666" />
//       </TouchableOpacity>
//     </View>
//   );
// };

// // -----------------------------------------------------------------
// // --- Main Students Screen (Handles all menu state) ---
// // -----------------------------------------------------------------

// const Students = ({navigation}) => {
//   const [isRemoveModalVisible, setIsRemoveModalVisible] = useState(false);

//   const [students, setStudents] = useState(MOCK_STUDENTS);
//   // State to track which card's menu is open
//   const [activeMenuId, setActiveMenuId] = useState(null);

//   // --- Menu Handlers ---
//   const handleMenuPress = id => {
//     // Toggle the menu: if the same card is pressed, close it; otherwise, open the new one.
//     setActiveMenuId(prevId => (prevId === id ? null : id));
//   };

//   const handleRemoveStudent = id => {
//     setStudents(prev => prev.filter(student => student.id !== id));
//   };

//   // --- Action Handlers passed to CardMenu ---

//   // FIX: Ensure 'item' is received here to pass the student's data for editing
//   const handleEdit = item => {
//     setActiveMenuId(null); // Close menu after action
//     navigation.navigate('StudentDetails', {
//       studentData: item, // CORRECT: Now passes the specific student object
//       isEditing: true,
//       title: 'Edit Student Details',
//     });
//   };

//   const handleRemove = (id, name) => {
//     setActiveMenuId(null); // Close menu after action
//     Alert.alert('Confirm Removal', `Are you sure you want to remove ${name}?`, [
//       {text: 'Cancel', style: 'cancel'},
//       {
//         text: 'Remove',
//         onPress: () => handleRemoveStudent(id),
//         style: 'destructive',
//       },
//     ]);
//   };

//   const handleAddStudent = () => {
//     navigation.navigate('StudentDetails', {
//       isEditing: false,
//       title: 'Add New Student',
//     });
//   };

//   return (
//     <View style={styles.container}>
//       {/* Header */}
//       <UserHeader
//         title={'Students'}
//         backButton={true}
//         arrow={true}
//         navigation={navigation}
//       />

//       {/* List of Students */}
//       <ScrollView contentContainerStyle={styles.listContainer}>
//         {students.map(item => (
//           // 1. Wrapper View with position: 'relative' to anchor the absolute menu
//           <View key={item.id} style={styles.cardWrapper}>
//             <StudentCard item={item} onMenuPress={handleMenuPress} />

//             {/* 2. Conditional Menu Rendering based on parent state */}
//             {activeMenuId === item.id && (
//               <View style={styles.menuPlacement}>
//                 <CardMenu
//                   // Pass item-specific logic to the menu component
//                   onEdit={() => handleEdit(item)}
//                   onRemove={() => handleRemove(item.id, item.name)}
//                 />
//               </View>
//             )}
//           </View>
//         ))}
//       </ScrollView>

//       {/* Floating Action Button (FAB) */}
//       <TouchableOpacity onPress={handleAddStudent} style={styles.fab}>
//         <Icon name="plus" size={30} color="#fff" />
//       </TouchableOpacity>

//       <RemoveModal
//         isVisible={isRemoveModalVisible}
//         onClose={closeRemoveModal}
//         onConfirm={confirmRemove}
//         instituteData={instituteToRemove} // Pass the selected institute data
//       />
//     </View>
//   );
// };

// export default Students;

// // -----------------------------------------------------------------
// // --- Unified Styles (Updated for the new menu structure) ---
// // -----------------------------------------------------------------

// const styles = StyleSheet.create({
//   // --- Screen/Layout Styles ---
//   container: {
//     flex: 1,
//     backgroundColor: '#f7f7f7',
//   },
//   listContainer: {
//     padding: 15,
//   },
//   fab: {
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
//     shadowRadius: 4,
//     elevation: 8,
//   },

//   // --- Card Wrapper (New style for menu anchor) ---
//   cardWrapper: {
//     position: 'relative',
//     marginBottom: 10,
//     zIndex: 1, // Ensure the wrapper is a stacking context
//   },

//   // --- Card Styles ---
//   cardContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     padding: 15,
//     // marginBottom removed, now handled by cardWrapper
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: 1},
//     shadowOpacity: 0.08,
//     shadowRadius: 2,
//     elevation: 2,
//     zIndex: 2, // Ensure the card is above other elements in the wrapper
//   },
//   cardIcon: {
//     marginRight: 15,
//     padding: 8,
//     backgroundColor: '#fff7f2',
//     borderRadius: 20,
//   },
//   cardTextContainer: {
//     flex: 1,
//   },
//   cardName: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#333',
//   },
//   cardDetails: {
//     fontSize: 13,
//     color: '#777',
//   },
//   cardMenuButton: {
//     padding: 5,
//     marginLeft: 10,
//   },

//   // --- Menu/Dropdown Styles ---
//   menuPlacement: {
//     position: 'absolute',
//     top: 5,
//     right: 5,
//     zIndex: 10,
//   },
//   menuDropdown: {
//     backgroundColor: '#fff',
//     borderRadius: 8,
//     width: 140,
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: 2},
//     shadowOpacity: 0.2,
//     shadowRadius: 5,
//     elevation: 10,
//     paddingVertical: 5,
//   },
//   menuItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 10,
//   },
//   menuItemText: {
//     marginLeft: 8,
//     fontSize: 14,
//     color: '#333',
//   },
//   menuDivider: {
//     height: 1,
//     backgroundColor: '#f0f0f0',
//     marginHorizontal: 10,
//   },
//   removeText: {
//     color: '#d9534f',
//   },
//   // actionButton styles removed as direct buttons are no longer used
//   cardActionsContainer: {},
//   actionButton: {},
// });

//

import React, {useState, useCallback} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Assuming UserHeader is in this path
import UserHeader from '../../components/user/UserHeader';
// Assuming this RemoveModal is now configured to display student details
// If this is the Institute modal, you should change the import path/name
// to the RemoveStudentModal created in the previous turn.
import RemoveModal from '../../components/user/RemoveModal';
import {SafeAreaView} from 'react-native-safe-area-context';

// --- Mock Data ---
const MOCK_STUDENTS = [
  {
    id: 's1',
    name: 'Shivam Gupta',
    location: 'Cambridge, MA',
    type: 'University',
    data: {
      studentId: 'UNI1001',
      age: 25,
      gender: 'Male',
      grade: 'Graduate Student',
    },
  },
  {
    id: 's2',
    name: 'Sanjeev Yadav',
    location: 'New Delhi, India',
    type: 'School',
    data: {
      studentId: 'SCH502',
      age: 15,
      gender: 'Male',
      grade: '10th Grade',
    },
  },
  {
    id: 's3',
    name: 'Arzoo Sacahan',
    location: 'Boston, MA',
    type: 'College',
    data: {
      studentId: 'COL305',
      age: 20,
      gender: 'Female',
      grade: 'College Freshman',
    },
  },
];

// -----------------------------------------------------------------
// --- Dropdown Menu Component (CardMenu) ---
// -----------------------------------------------------------------
const CardMenu = ({onEdit, onRemove}) => (
  <View style={styles.menuDropdown}>
    {/* Edit Option */}
    <TouchableOpacity onPress={onEdit} style={styles.menuItem}>
      <Icon name="pencil-outline" size={16} color="#333" />
      <Text style={styles.menuItemText}>Edit</Text>
    </TouchableOpacity>

    {/* Remove Option */}
    <View style={styles.menuDivider} />
    <TouchableOpacity onPress={onRemove} style={styles.menuItem}>
      <Icon name="delete-outline" size={16} color="#d9534f" />
      <Text style={[styles.menuItemText, styles.removeText]}>Remove</Text>
    </TouchableOpacity>
  </View>
);

// -----------------------------------------------------------------
// --- Student Card Component (Stateless - only shows '...') ---
// -----------------------------------------------------------------

// The card now only accepts a handler for the menu button
const StudentCard = ({item, onMenuPress}) => {
  return (
    <View style={styles.cardContainer}>
      {/* User Icon */}
      <Icon name="account" size={24} color="#ff8c42" style={styles.cardIcon} />

      {/* Student Details */}
      <View style={styles.cardTextContainer}>
        <Text style={styles.cardName}>{item.name}</Text>
        <Text style={styles.cardDetails}>
          {item.location} • {item.type}
        </Text>
      </View>

      {/* Menu/Options Button - Calls the parent handler */}
      <TouchableOpacity
        onPress={() => onMenuPress(item.id)}
        style={styles.cardMenuButton}>
        <Icon name="dots-vertical" size={24} color="#666" />
      </TouchableOpacity>
    </View>
  );
};

// -----------------------------------------------------------------
// --- Main Students Screen (Handles all menu state) ---
// -----------------------------------------------------------------

const Students = ({navigation}) => {
  const [students, setStudents] = useState(MOCK_STUDENTS);
  // State to track which card's menu is open
  const [activeMenuId, setActiveMenuId] = useState(null);

  // --- NEW STATES FOR REMOVE MODAL ---
  const [isRemoveModalVisible, setIsRemoveModalVisible] = useState(false);
  const [studentToRemove, setStudentToRemove] = useState(null);

  // --- Menu Handlers ---
  const handleMenuPress = id => {
    // Toggle the menu: if the same card is pressed, close it; otherwise, open the new one.
    setActiveMenuId(prevId => (prevId === id ? null : id));
  };

  // 1. Function to perform the actual student removal
  const confirmRemove = useCallback(() => {
    if (studentToRemove) {
      setStudents(prev =>
        prev.filter(student => student.id !== studentToRemove.id),
      );
      Alert.alert('Success', `${studentToRemove.name} has been removed.`);
    }
    // Close the modal and clear the selected student
    setIsRemoveModalVisible(false);
    setStudentToRemove(null);
  }, [studentToRemove]);

  // 2. Handler for closing the Remove Modal (Cancel action)
  const closeRemoveModal = useCallback(() => {
    setIsRemoveModalVisible(false);
    setStudentToRemove(null);
  }, []);

  // --- Action Handlers passed to CardMenu ---

  // Handle Edit action
  const handleEdit = item => {
    setActiveMenuId(null); // Close menu after action
    navigation.navigate('StudentDetails', {
      studentData: item,
      isEditing: true,
      title: 'Edit Student Details',
    });
  };

  // 3. UPDATED: Captures student data and opens the custom modal
  const handleRemove = useCallback(item => {
    // 1. Set the student data that will be removed
    setStudentToRemove(item);
    // 2. Open the modal
    setIsRemoveModalVisible(true);
    // 3. Close the dropdown menu
    setActiveMenuId(null);
  }, []);

  const handleAddStudent = () => {
    navigation.navigate('StudentDetails', {
      isEditing: false,
      title: 'Add New Student',
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <UserHeader title={'Students'} onBackPress={() => navigation.goBack()} />

      {/* List of Students */}
      <ScrollView contentContainerStyle={styles.listContainer}>
        {students.map(item => (
          // 1. Wrapper View with position: 'relative' to anchor the absolute menu
          <View key={item.id} style={styles.cardWrapper}>
            <StudentCard item={item} onMenuPress={handleMenuPress} />

            {/* 2. Conditional Menu Rendering based on parent state */}
            {activeMenuId === item.id && (
              <View style={styles.menuPlacement}>
                <CardMenu
                  // Pass the whole 'item' object to handlers for easy data access
                  onEdit={() => handleEdit(item)}
                  // Pass the whole 'item' object to the new handleRemove function
                  onRemove={() => handleRemove(item)}
                />
              </View>
            )}
          </View>
        ))}
      </ScrollView>

      {/* Floating Action Button (FAB) */}
      <TouchableOpacity onPress={handleAddStudent} style={styles.fab}>
        <Icon name="plus" size={30} color="#fff" />
      </TouchableOpacity>

      {/* RENDER THE NEW REMOVE MODAL */}
      <RemoveModal
        isVisible={isRemoveModalVisible}
        onClose={closeRemoveModal}
        onConfirm={confirmRemove} // This runs the actual deletion
        studentData={studentToRemove} // Pass the selected student data
      />
    </SafeAreaView>
  );
};

export default Students;

// -----------------------------------------------------------------
// --- Unified Styles (Unchanged) ---
// -----------------------------------------------------------------

const styles = StyleSheet.create({
  // --- Screen/Layout Styles ---
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  listContainer: {
    padding: 15,
  },
  fab: {
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
    shadowRadius: 4,
    elevation: 8,
  },

  // --- Card Wrapper (New style for menu anchor) ---
  cardWrapper: {
    position: 'relative',
    marginBottom: 10,
    zIndex: 1, // Ensure the wrapper is a stacking context
  },

  // --- Card Styles ---
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
    zIndex: 2, // Ensure the card is above other elements in the wrapper
  },
  cardIcon: {
    marginRight: 15,
    padding: 8,
    backgroundColor: '#fff7f2',
    borderRadius: 20,
  },
  cardTextContainer: {
    flex: 1,
  },
  cardName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  cardDetails: {
    fontSize: 13,
    color: '#777',
  },
  cardMenuButton: {
    padding: 5,
    marginLeft: 10,
  },

  // --- Menu/Dropdown Styles ---
  menuPlacement: {
    position: 'absolute',
    top: 5,
    right: 5,
    zIndex: 10,
  },
  menuDropdown: {
    backgroundColor: '#fff',
    borderRadius: 8,
    width: 140,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 10,
    paddingVertical: 5,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  menuItemText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#333',
  },
  menuDivider: {
    height: 1,
    backgroundColor: '#f0f0f0',
    marginHorizontal: 10,
  },
  removeText: {
    color: '#d9534f',
  },
});
