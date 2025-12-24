import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons'; // For icons like arrow-back, bar-chart, add
import useGet from '../../../hooks/useGet';
import {useSelector} from 'react-redux';
import Loader from '../../components/Loader';
import useCreate from '../../../hooks/useCreate';
import {useToast} from 'react-native-toast-notifications';
import {showErrorToast, showSuccessToast} from '../../../config/Toast';

// --- Centralized Color Definitions ---
const colors = {
  white: '#FFFFFF',
  black: '#000000',
  greyBackground: '#F5F5F5', // Light grey background
  orangePrimary: '#FF8719',
  orangeLight: '#FFF6EE', // For inactive tab background (Manage School)
  textDark: '#1E1E1E', // Dark text for titles, item names
  textGrey: '#464D61', // Grey text for sub-titles (e.g., "120 Students")
  textLightGrey: '#A0A0A0', // For inactive toggle text
  greenActive: '#28A745', // Green for 'Active' status
  redInactive: '#DC3545', // Red for 'Inactive' status/dot
  dotOrange: '#FF9800', // Orange dot for students/units count
  borderLight: '#E0E0E0', // Light border for item cards
  bottomNavActive: '#FF7A00', // Bottom nav active icon tint
  bottomNavInactive: '#A0A0A0', // Bottom nav inactive icon tint
  checkboxBorder: '#D0D0D0', // Checkbox border
  inactiveTab: '#E5E7EB',
  activeColor: '#5CAC5B',
  inactiveColorl: '#FC9768',
};

// --- Custom Switch Button Component ---
// This component replaces the native Switch for consistent, custom design.
const CustomSwitchButton = ({
  value,
  onValueChange,
  activeColor = colors.greenActive,
  inactiveColor = colors.textLightGrey,
}) => {
  const switchWidth = 48;
  const switchHeight = 28;
  const thumbSize = 24;
  const padding = 2; // For inner spacing

  const trackStyle = {
    width: switchWidth,
    height: switchHeight,
    borderRadius: switchHeight / 2,
    backgroundColor: value ? activeColor : inactiveColor,
    justifyContent: 'center',
    paddingHorizontal: padding,
    // Add a light border to match the image's subtle outline effect
    borderWidth: 1.5,
    borderColor: value ? activeColor : inactiveColor,
  };

  const thumbStyle = {
    width: thumbSize,
    height: thumbSize,
    borderRadius: thumbSize / 2,
    backgroundColor: colors.white,
    // Position the thumb (moves from left=0 to right=switchWidth - thumbSize - 2*padding)
    transform: [
      {translateX: value ? switchWidth - thumbSize - padding * 2 : 0},
    ],
    // Shadow for the thumb
    shadowColor: colors.black,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onValueChange}
      style={trackStyle}>
      <View style={thumbStyle} />
    </TouchableOpacity>
  );
};

// --- Data Structures ---

// Data for Manage Store Tab
const storeItems = [
  {
    id: '1',
    name: 'Notebook Small',
    units: 123,
    status: 'Active',
    isChecked: true,
  },
  {
    id: '2',
    name: 'Notebook Large',
    units: 89,
    status: 'Active',
    isChecked: true,
  },
  {
    id: '3',
    name: 'School Bag',
    units: 250,
    status: 'Inactive',
    isChecked: true,
  },
  {id: '4', name: 'Socks', units: 250, status: 'Inactive', isChecked: false},
  {
    id: '5',
    name: 'Water Bottle',
    units: 250,
    status: 'Inactive',
    isChecked: false,
  },
];

// --- Component Definition ---
const Manage = ({navigation}) => {
  const toast = useToast();
  const [schoolManageActive, setSchoolManageActive] = useState(true);
  const {userInfo} = useSelector(({user}) => user);

  const academia_id = userInfo?.academia?.id;
  const {
    getDepartments,
    loadingDepartments,
    searchAdvanceDepartment,
    loadingSearchAdvanceDepartment,
  } = useGet(academia_id, {isActive: schoolManageActive});

  const {UpdateDepartmentActive, loadingUpdateDepartmentActive} = useCreate();

  const [activeTab, setActiveTab] = useState('store');
  // State for Manage Store Data
  const [storeStatus, setStoreStatus] = useState(true);
  const [items, setItems] = useState(storeItems);
  // State for Manage School Data
  const [grades, setGrades] = useState([]);

  useEffect(() => {
    if (schoolManageActive) {
      setGrades(getDepartments?.items || []);
    } else {
      setGrades(searchAdvanceDepartment?.items || []);
    }
  }, [schoolManageActive, getDepartments, searchAdvanceDepartment]);

  // --- Helper Functions ---

  const getStatusColor = status => {
    return status === 'Active' ? colors.textGrey : colors.textGrey;
  };

  const getStatusViewColor = status => {
    return status === 'Active' ? colors.activeColor : colors.inactiveColorl;
  };

  // Function to toggle individual store item status
  const toggleItemStatus = async id => {
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id
          ? {...item, isActive: item.isActive === true ? false : true}
          : item,
      ),
    );
  };

  // Function to toggle individual school grade status
  // const toggleGradeStatus = async (id, data) => {
  //   setGrades(prevGrades =>
  //     prevGrades.map(grade =>
  //       grade.id === id
  //         ? {
  //             ...grade,
  //             isActive: grade.isActive === true ? false : true,
  //           }
  //         : grade,
  //     ),
  //   );

  //   const formData = new FormData();

  //   formData.append(
  //     'CreateDepartment.DepartmentInformation.name_of_department',
  //     data.name,
  //   );

  //   formData.append(
  //     'CreateDepartment.DepartmentInformation.description',
  //     data.description,
  //   );

  //   formData.append(
  //     'CreateDepartment.DepartmentInformation.academia_id',
  //     data.academiaId, // always send as string in FormData
  //   );

  //   formData.append(
  //     'CreateDepartment.DepartmentInformation.isactive',
  //     data.isActive == true ? false : true,
  //   );
  //   console.log('api cll');
  //   for (let pair of formData.entries()) {
  //     console.log(pair[0], pair[1], 'upat api response');
  //   }
  //   console.log();
  //   try {
  //     const response = await UpdateDepartmentActive({
  //       department_id: id,
  //       payload: formData,
  //     });
  //     console.log(response, 'department created response');

  //     if (response.data) {
  //       showSuccessToast(toast, 'Department Status Updated!');
  //     }
  //   } catch (error) {
  //     console.log(error, 'error');
  //     showErrorToast(toast, 'someting went wrong!!');
  //   }
  // };

  const toggleGradeStatus = async (id, data) => {
    const toggledIsActive = !data.isActive; // ✅ single source of truth

    // 1️⃣ Update UI
    setGrades(prevGrades =>
      prevGrades.map(grade =>
        grade.id === id ? {...grade, isActive: toggledIsActive} : grade,
      ),
    );

    // 2️⃣ Prepare FormData
    const formData = new FormData();

    formData.append(
      'CreateDepartment.DepartmentInformation.name_of_department',
      data.name,
    );

    formData.append(
      'CreateDepartment.DepartmentInformation.description',
      data.description,
    );

    formData.append(
      'CreateDepartment.DepartmentInformation.academia_id',
      String(data.academiaId),
    );

    formData.append(
      'CreateDepartment.DepartmentInformation.isactive',
      toggledIsActive, // ✅ safest
    );

    // 3️⃣ Debug FormData

    // for (let pair of formData.entries()) {
    //   console.log(pair[0], pair[1]);
    // }

    try {
      const response = await UpdateDepartmentActive({
        department_id: id,
        payload: formData,
      });

      showSuccessToast(toast, 'Department Status Updated!');
    } catch (error) {
      console.log(error, 'error');

      // ❗ rollback UI on failure
      setGrades(prevGrades =>
        prevGrades.map(grade =>
          grade.id === id ? {...grade, isActive: data.isActive} : grade,
        ),
      );

      showErrorToast(toast, 'Something went wrong!');
    }
  };

  // Function to toggle individual store item checkbox
  const toggleItemCheck = id => {
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? {...item, isChecked: !item.isChecked} : item,
      ),
    );
  };

  // Function to toggle individual school grade checkbox (simple check/uncheck)
  const toggleGradeCheck = id => {
    setGrades(prevGrades =>
      prevGrades.map(grade =>
        grade.id === id ? {...grade, isChecked: !grade.isChecked} : grade,
      ),
    );
  };
  const handleCreateDepartmentsPress = () => {
    // 'CreateDepartment' is the name of the screen registered in the Stack Navigator (in DrawerComponent.js)
    navigation.navigate('CreateDepartment');
  };

  // --- Render Store Content ---
  const renderStoreContent = () => (
    <>
      {/* Store Status Toggle */}
      <View style={styles.statusToggleContainer}>
        <Text style={styles.statusToggleText}>Store Status</Text>
        {/* Custom Switch Button for Store Status */}
        <View style={styles.itemStatusContainer2}>
          <CustomSwitchButton
            value={storeStatus}
            onValueChange={() =>
              setStoreStatus(previousState => !previousState)
            }
            activeColor={colors.greenActive}
            inactiveColor={colors.textLightGrey}
          />
          <Text
            style={[
              styles.statusToggleActiveText,
              {color: storeStatus ? colors.black : colors.textLightGrey},
            ]}>
            {storeStatus ? 'Active' : 'Inactive'}
          </Text>
        </View>
      </View>

      {/* Inventory Item Cards */}
      {items.map(item => (
        <View key={item.id} style={styles.itemCard}>
          <TouchableOpacity
            style={styles.checkboxContainer}
            onPress={() => toggleItemCheck(item.id)}>
            {item.isChecked ? (
              <Ionicons
                name="checkbox-sharp"
                size={24}
                color={colors.orangePrimary}
              />
            ) : (
              <View style={styles.uncheckedBox} />
            )}
          </TouchableOpacity>
          <View style={styles.itemInfo}>
            <Text style={styles.itemName}>{item.name}</Text>
            <View style={styles.itemDetailsRow}>
              <Ionicons
                name="stats-chart-outline"
                size={16}
                color={colors.textGrey}
              />
              <Text style={styles.itemUnits}>{item.units} Units</Text>
            </View>
          </View>
          <View style={styles.itemStatusContainer}>
            <View
              style={[
                styles.statusDot,
                {backgroundColor: getStatusViewColor(item.status)},
              ]}
            />
            <Text
              style={[
                styles.itemStatusText,
                {color: getStatusColor(item.status)},
              ]}>
              {item.status}
            </Text>
            {/* Custom Switch Button for Item Status */}
            <CustomSwitchButton
              value={item.status === 'Active'}
              onValueChange={() => toggleItemStatus(item.id)}
              activeColor={colors.greenActive}
              inactiveColor={'#DCDCDC'}
            />
          </View>
        </View>
      ))}
    </>
  );

  // --- Render School Content ---
  const renderSchoolContent = () => (
    <>
      {/* Grades Status Toggle */}
      <View style={styles.statusToggleContainer}>
        <Loader visible={loadingDepartments} />
        <Text style={styles.statusToggleText}>Grades</Text>
        {/* Custom Switch Button for Store Status */}
        <View style={styles.itemStatusContainer2}>
          <CustomSwitchButton
            value={schoolManageActive}
            onValueChange={() =>
              setSchoolManageActive(previousState => !previousState)
            }
            activeColor={colors.greenActive}
            inactiveColor={colors.textLightGrey}
          />
          <Text
            style={[
              styles.statusToggleActiveText,
              {color: storeStatus ? colors.black : colors.textLightGrey},
            ]}>
            {storeStatus ? 'Active' : 'Inactive'}
          </Text>
        </View>
      </View>

      {/* Grade Item Cards */}
      {grades?.length === 0 ? (
        <View style={styles.noDataContainer}>
          <Text style={styles.noDataText}>No data found</Text>
        </View>
      ) : (
        grades?.map(grade => (
          <View key={grade.id} style={styles.itemCard}>
            {/* <Loader visible={loadingUpdateDepartmentActive} /> */}

            <View style={styles.itemInfo}>
              <Text style={styles.itemName}>{grade.name}</Text>

              <View style={styles.itemDetailsRow}>
                <Text style={styles.itemSubText}>
                  {grade.sections} Sections
                </Text>

                <View
                  style={[
                    styles.statusDot,
                    {
                      backgroundColor: colors.dotOrange,
                      marginLeft: 100,
                      marginRight: 5,
                    },
                  ]}
                />

                <Text style={styles.itemSubText}>
                  {grade.students} Students
                </Text>
              </View>
            </View>

            <View style={styles.itemStatusContainer}>
              <CustomSwitchButton
                value={grade.isActive === true}
                onValueChange={() => toggleGradeStatus(grade.id, grade)}
                activeColor={colors.greenActive}
                inactiveColor={colors.textLightGrey}
              />
            </View>
          </View>
        ))
      )}

      {/* Create Departments Button */}
      <TouchableOpacity
        style={styles.createButton}
        onPress={handleCreateDepartmentsPress}>
        <Text style={styles.createButtonText}>Create Departments</Text>
        <Ionicons
          name="add"
          size={20}
          color={colors.white}
          style={{marginLeft: 5}}
        />
      </TouchableOpacity>
      {/* Added margin bottom to give space before bottom nav */}
      <View style={{height: 20}} />
    </>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={colors.black} />
        </TouchableOpacity>
        {/* Dynamic Header Title */}
        <Text style={styles.headerTitle}>
          {activeTab === 'store' ? 'Manage Store' : 'Manage School'}
        </Text>
        <View style={styles.placeholder} /> {/* Placeholder for alignment */}
      </View>

      {/* Toggle Tabs */}
      <View style={styles.toggleTabsContainer}>
        <TouchableOpacity
          style={activeTab === 'store' ? styles.activeTab : styles.inactiveTab}
          onPress={() => setActiveTab('store')}>
          <Text
            style={
              activeTab === 'store'
                ? styles.activeTabText
                : styles.inactiveTabText
            }>
            Manage Store
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={activeTab === 'school' ? styles.activeTab : styles.inactiveTab}
          onPress={() => setActiveTab('school')}>
          <Text
            style={
              activeTab === 'school'
                ? styles.activeTabText
                : styles.inactiveTabText
            }>
            Manage School
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Render content based on active tab */}
        {activeTab === 'store' ? renderStoreContent() : renderSchoolContent()}
      </ScrollView>

      {/* Bottom Navigation */}
      {/* <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.bottomNavItem}>
          <Image
            source={require('./../assets/ads.png')} // Local image for Ads
            style={[styles.bottomNavIcon, { tintColor: colors.bottomNavInactive }]}
          />
          <Text style={[styles.bottomNavText, { color: colors.bottomNavInactive }]}>Ads</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.bottomNavItem}>
          <Image
            source={require('./../assets/orders.png')} // Local image for Manage Orders
            style={[styles.bottomNavIcon, { tintColor: colors.bottomNavActive }]}
          />
          <Text style={[styles.bottomNavText, { color: colors.bottomNavActive }]}>Manage Orders</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.bottomNavItem}>
          <Ionicons
            name="person-outline" // Ionicons for Account
            size={24}
            color={colors.bottomNavInactive}
          />
          <Text style={[styles.bottomNavText, { color: colors.bottomNavInactive }]}>Account</Text>
        </TouchableOpacity>
      </View> */}
    </SafeAreaView>
  );
};

// --- Stylesheet ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.greyBackground,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 12,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.black,
  },
  placeholder: {
    width: 24, // Same width as back button to keep title centered
  },
  // --- Tab Styles ---
  toggleTabsContainer: {
    flexDirection: 'row',
    backgroundColor: colors.inactiveTab,
    marginHorizontal: 15,
    marginVertical: 15,
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.orangeLight,
  },
  activeTab: {
    flex: 1,
    backgroundColor: colors.orangePrimary,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTabText: {
    color: colors.white,
    fontWeight: '600',
    fontSize: 15,
  },
  inactiveTab: {
    flex: 1,
    backgroundColor: colors.inactiveTab, // Changed to white/transparent for inactive tab background
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  inactiveTabText: {
    color: '#49454F',
    fontWeight: '600',
    fontSize: 15,
  },
  // --- Status Toggle (Used for both Store and Grades) ---
  statusToggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    marginHorizontal: 15,
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 5,
  },
  statusToggleText: {
    fontSize: 16,
    color: colors.textDark,
    fontWeight: '500',
  },
  statusToggleActiveText: {
    fontSize: 16,
    fontWeight: '500',
    marginStart: 10,
    marginRight: 10,
  },
  // --- Item Card Styles (Used for both Inventory and Grades) ---
  itemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    marginHorizontal: 15,
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  checkboxContainer: {
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  uncheckedBox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: colors.checkboxBorder,
  },
  itemInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textDark,
    marginBottom: 4,
  },
  itemDetailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemUnits: {
    // Specific style for 'Units' text in Store tab
    fontSize: 14,
    color: colors.textGrey,
    marginLeft: 5,
  },
  itemSubText: {
    // Specific style for Sections/Students in School tab
    fontSize: 14,
    color: colors.textGrey,
  },
  itemStatusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemStatusContainer2: {
    flexDirection: 'row',

    alignItems: 'center',
  },
  statusDot: {
    width: 15,
    height: 15,
    borderRadius: 10,
    marginRight: 5,
  },
  itemStatusText: {
    fontSize: 14,
    fontWeight: '500',
    marginRight: 10,
  },
  // --- Create Button Styles (School Tab) ---
  createButton: {
    flexDirection: 'row',
    backgroundColor: '#F89941',
    marginHorizontal: 15,
    marginTop: 10,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.orangePrimary,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  createButtonText: {
    color: colors.white,
    fontSize: 17,
    fontWeight: '700',
  },
  // --- Bottom Nav (Unchanged) ---
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
    paddingVertical: 8,
  },
  bottomNavItem: {
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  bottomNavIcon: {
    width: 24,
    height: 24,
    marginBottom: 4,
  },
  bottomNavText: {
    fontSize: 12,
    fontWeight: '500',
  },
  noDataContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  noDataText: {
    color: colors.textLightGrey,
    fontSize: 14,
  },
});

export default Manage;
