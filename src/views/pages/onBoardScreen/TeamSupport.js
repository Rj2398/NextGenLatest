import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Platform,
  Image,
} from 'react-native';
import React, {use, useEffect, useMemo, useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Icon imports
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';
import useGet from '../../../hooks/useGet';
import Loader from '../../components/Loader';
import useCreate from '../../../hooks/useCreate';
import {showSuccessToast} from '../../../config/Toast';
import {Toast, useToast} from 'react-native-toast-notifications';

// --- Constants ---
const PRIMARY_COLOR = '#FF7A00';
const BORDER_COLOR = '#E0E0E0';
const TEXT_GRAY = '#666666';
const LIGHT_GRAY_BG = '#F7F7F7';
const ROLE_COLORS = {
  Admin: '#F44336', // Red
  Manager: '#2196F3', // Blue
  Operator: '#4CAF50', // Green
};

// --- Dummy Data ---
const TEAM_MEMBERS = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Admin',
    department: 'Engineering',
    email: 'sarah.johnson@academia.edu',
    status: 'online', // for the little green/yellow dot
    avatarUrl: 'https://i.pravatar.cc/150?img=3', // Placeholder image URL
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Manager',
    department: 'Computer Science',
    email: 'michael.chen@academia.edu',
    status: 'online',
    avatarUrl: 'https://i.pravatar.cc/150?img=5',
  },
  {
    id: 3,
    name: 'Emma Rodriquez',
    role: 'Operator',
    department: 'Mathematics',
    email: 'emma.rodriguez@academia.edu',
    status: 'online',
    avatarUrl: 'https://i.pravatar.cc/150?img=8',
  },
  {
    id: 4,
    name: 'David Park',
    role: 'Operator',
    department: 'Physics',
    email: 'david.park@academia.edu',
    status: 'busy',
    avatarUrl: 'https://i.pravatar.cc/150?img=15',
  },
  {
    id: 5,
    name: 'Lisa Thompson',
    role: 'Manager',
    department: 'Biology',
    email: 'lisa.thompson@academia.edu',
    status: 'online',
    avatarUrl: 'https://i.pravatar.cc/150?img=17',
  },
  {
    id: 6,
    name: 'James Wilson',
    role: 'Operator',
    department: 'Chemistry',
    email: 'james.wilson@academia.edu',
    status: 'busy',
    avatarUrl: 'https://i.pravatar.cc/150?img=22',
  },
  {
    id: 7,
    name: 'Robert Garcia',
    role: 'Operator',
    department: 'History',
    email: 'robert.garcia@academia.edu',
    status: 'online',
    avatarUrl: 'https://i.pravatar.cc/150?img=25',
  },
  {
    id: 8,
    name: 'Alex Kumar',
    role: 'Operator',
    department: 'Art & Design',
    email: 'alex.kumar@academia.edu',
    status: 'busy',
    avatarUrl: 'https://i.pravatar.cc/150?img=33',
  },
];

// --- Sub-Components ---
const CardMenu = ({onEdit, onRemove, onClose}) => (
  <View style={styles.menuDropdown}>
    {/* Close Icon */}
    <TouchableOpacity style={styles.menuClose} onPress={onClose}>
      <Icon name="close" size={18} color="#555" />
    </TouchableOpacity>

    {/* Edit */}
    <TouchableOpacity onPress={onEdit} style={styles.menuItem}>
      <Icon name="pencil-outline" size={16} color="#333" />
      <Text style={styles.menuItemText}>Edit</Text>
    </TouchableOpacity>

    <View style={styles.menuDivider} />

    {/* Delete */}
    <TouchableOpacity onPress={onRemove} style={styles.menuItem}>
      <Icon name="delete-outline" size={16} color="#d9534f" />
      <Text style={[styles.menuItemText, styles.removeText]}>Delete</Text>
    </TouchableOpacity>
  </View>
);

const TeamMemberItem = ({member, onEdit, onRemove}) => {
  const [showMenu, setShowMenu] = useState(false);

  const roleColor = ROLE_COLORS[member.role] || TEXT_GRAY;
  const statusColor =
    member.status === 'online' ? ROLE_COLORS.Operator : PRIMARY_COLOR;

  return (
    <View style={styles.memberCardWrapper}>
      <TouchableOpacity style={styles.memberCard} activeOpacity={0.9}>
        {/* LEFT */}
        <View style={styles.avatarContainer}>
          <Image
            source={{uri: member?.Teams_Search?.TeamList?.team_image}}
            style={styles.avatar}
          />
          <View style={[styles.statusDot, {backgroundColor: statusColor}]} />
        </View>

        {/* CENTER */}
        <View style={styles.memberDetails}>
          <View style={styles.nameRow}>
            <Text style={styles.memberName}>
              {member?.Teams_Search?.TeamList?.team_title}
            </Text>

            <View style={styles.roleTag}>
              <Text style={[styles.roleText, {color: roleColor}]}>
                {member.Teams_Search?.TeamList?.job_title}
              </Text>
            </View>

            <View
              style={[styles.statusDotSmall, {backgroundColor: statusColor}]}
            />
          </View>

          <Text style={styles.memberDepartment}>{member.department}</Text>
          <Text style={styles.memberEmail}>
            {member.Teams_Search?.TeamList?.team_email}
          </Text>
        </View>

        {/* RIGHT (3 DOT MENU) */}
        <TouchableOpacity onPress={() => setShowMenu(true)}>
          <Feather name="more-vertical" size={22} color={TEXT_GRAY} />
        </TouchableOpacity>
      </TouchableOpacity>

      {/* MENU CARD */}
      {showMenu && (
        <CardMenu
          onClose={() => setShowMenu(false)}
          onEdit={() => {
            setShowMenu(false);
            onEdit(member);
          }}
          onRemove={() => {
            setShowMenu(false);
            onRemove(member);
          }}
        />
      )}
    </View>
  );
};

// Component for the horizontal filter tabs
const FilterTab = ({label, count, isSelected, onPress}) => (
  <TouchableOpacity
    style={[
      styles.filterTab,
      isSelected ? styles.filterTabSelected : styles.filterTabDefault,
    ]}
    onPress={onPress}>
    <Text
      style={[
        styles.filterText,
        isSelected ? styles.filterTextSelected : styles.filterTextDefault,
      ]}>
      {label} {count > 0 && <Text style={styles.filterCount}>{count}</Text>}
    </Text>
  </TouchableOpacity>
);

// --- Main Screen Component ---
const TeamSupport = ({navigation}) => {
  const toast = useToast();
  const {deleteStaff, loadingStaff} = useCreate();

  const [allTeamMember, setTeamMember] = useState([]);

  const FILTER_TABS = [
    {key: 'All', label: 'All', count: allTeamMember.length},
    {key: 'Active', label: 'Active', count: allTeamMember.length},
    {key: 'Invited', label: 'Invited', count: allTeamMember.length},
    {key: 'Suspended', label: 'Suspended', count: allTeamMember.length},
  ];
  const pageSize = 6; // items per page
  const [page, setPage] = useState(1);
  const {userInfo} = useSelector(({user}) => user);
  const [searchQuery, setSearchQuery] = useState({});
  const academia_id = userInfo?.academia?.id;
  const [selectedTab, setSelectedTab] = useState('All');

  const [searchText, setSearchText] = useState('');

  const {
    getTeams,
    teamLoading,
    FliterData,
    loadingFilter,
    FilterBySearch,
    searchLoading,
  } = useGet(academia_id, {
    status: selectedTab !== 'All' ? selectedTab : undefined,
    ...searchQuery,
  });

  const totalPages = Math.ceil(allTeamMember.length / pageSize);

  const paginatedMembers = useMemo(() => {
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return allTeamMember.slice(startIndex, endIndex);
  }, [allTeamMember, page]);

  const goNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const goPrev = () => {
    if (page > 1) setPage(page - 1);
  };

  useEffect(() => {
    // 1️⃣ All tab
    if (selectedTab === 'All') {
      setTeamMember(FilterBySearch?.items ?? []);
      return;
    }

    // 2️⃣ Status-based tabs: Active, Invited, Suspended
    if (
      selectedTab === 'Active' ||
      selectedTab === 'Invited' ||
      selectedTab === 'Suspended'
    ) {
      // If search exists AND matches current tab
      if (Object.keys(searchQuery || {}).length > 0) {
        // Optional: attach current tab to search if needed
        if (selectedTab == 'All') {
          setTeamMember(FilterBySearch?.items ?? []);
          return;
        } else if (selectedTab === 'Active') {
          setTeamMember(FilterBySearch?.items ?? []);
          return;
        } else if (selectedTab === 'Invited') {
          setTeamMember(FilterBySearch?.items ?? []);
          return;
        } else if (selectedTab === 'Suspended') {
          setTeamMember(FilterBySearch?.items ?? []);
          return;
        }
      }

      // Fallback: show default tab data
      setTeamMember(FliterData?.items ?? []);
      return;
    }

    setTeamMember([]);
  }, [
    selectedTab,
    getTeams?.items,
    FliterData?.items,
    FilterBySearch?.items,
    searchQuery,
  ]);

  //

  const handlSearch = () => {
    const text = searchText.trim();

    if (!text) {
      setSearchQuery({});
      return;
    }

    let query = {};

    // Email detection
    if (text.includes('@')) {
      query = {team_email: text};
    }
    // Role keywords (customize if needed)
    else if (
      ['admin', 'manager', 'operator', 'student'].some(role =>
        text.toLowerCase().includes(role),
      )
    ) {
      query = {team_role: text};
    }
    // Department keywords (optional rule)
    else if (
      ['hr', 'finance', 'marketing', 'support'].some(dep =>
        text.toLowerCase().includes(dep),
      )
    ) {
      query = {team_department: text};
    }
    // Default → Name
    else {
      query = {team_title: text};
    }

    setSearchQuery(query);
  };

  const handleEditMember = member => {
    navigation.navigate('CreateOperat', {member: member, isUpdate: true});
    // navigation.navigate('EditMember', { member });
  };

  const handleRemoveMember = async member => {
    try {
      const response = await deleteStaff(member?.id);
      if (response) {
        showSuccessToast(toast, 'Staff deleted successfull!!');
      }
    } catch (error) {
      console.log(error, 'error');
    }

    // show confirmation modal → call API → update list
  };

  return (
    <SafeAreaView style={styles.fullContainer}>
      {/* --- Fixed Header --- */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={styles.backButton}>
          <AntDesign name="left" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Teams</Text>
        <View style={styles.headerIcons}>
          <Ionicons
            name="notifications-outline"
            size={24}
            color="#333"
            style={{marginRight: 10}}
          />
          <Image
            source={{uri: TEAM_MEMBERS[0].avatarUrl}}
            style={styles.headerAvatar}
          />
        </View>
      </View>

      {/* --- Scrollable Content Container --- */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Loader visible={teamLoading || loadingFilter} />
        {/* --- Search and Filter Bar --- */}
        <View style={styles.searchFilterContainer}>
          <View style={styles.searchBar}>
            <Feather name="search" size={20} color={TEXT_GRAY} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search name, role, department or email"
              placeholderTextColor={TEXT_GRAY}
              value={searchText}
              onChangeText={setSearchText}
            />
            <TouchableOpacity onPress={() => handlSearch()}>
              <Ionicons name="filter-outline" size={24} color={TEXT_GRAY} />
            </TouchableOpacity>
          </View>
        </View>

        {/* --- Filter Tabs --- */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.tabScroll}>
          {FILTER_TABS.map(tab => (
            <FilterTab
              key={tab.key}
              label={tab.label}
              count={tab.count}
              isSelected={selectedTab === tab.key}
              onPress={() => setSelectedTab(tab.key)}
            />
          ))}
        </ScrollView>

        {/* --- Team Members List --- */}
        <View style={styles.memberList}>
          {allTeamMember?.length === 0 ? (
            <View style={styles.noDataContainer}>
              <Text style={styles.noDataText}>No data found</Text>
            </View>
          ) : (
            paginatedMembers?.map(member => (
              <TeamMemberItem
                key={member.id}
                member={member}
                onEdit={handleEditMember}
                onRemove={handleRemoveMember}
              />
            ))
          )}
        </View>
        {/* Spacer for FAB */}
        <View style={{height: 100}} />
      </ScrollView>
      {allTeamMember.length > pageSize && (
        <View style={styles.paginationContainer}>
          <TouchableOpacity
            onPress={goPrev}
            disabled={page === 1}
            style={[styles.pageBtn, page === 1 && styles.disabledBtn]}>
            <Text style={styles.pageText}>Prev</Text>
          </TouchableOpacity>

          <Text style={styles.pageCount}>
            {page} / {totalPages}
          </Text>

          <TouchableOpacity
            onPress={goNext}
            disabled={page === totalPages}
            style={[styles.pageBtn, page === totalPages && styles.disabledBtn]}>
            <Text style={styles.pageText}>Next</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* --- Floating Action Button (FAB) --- */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('CreateOperat')}>
        <AntDesign name="plus" size={28} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default TeamSupport;

// --- Stylesheet ---
const styles = StyleSheet.create({
  fullContainer: {
    flex: 1,
    backgroundColor: LIGHT_GRAY_BG,
  },
  // --- Header Styles ---
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 15,
    backgroundColor: 'white',
    paddingTop: Platform.OS === 'ios' ? 50 : 15,
    borderBottomWidth: 1,
    borderBottomColor: BORDER_COLOR,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
  },
  backButton: {
    padding: 5,
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: PRIMARY_COLOR,
  },
  scrollContent: {
    paddingTop: 10,
    paddingHorizontal: 15,
  },
  // --- Search and Filter ---
  searchFilterContainer: {
    marginBottom: 10,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 15,
    height: 50,
    borderWidth: 1,
    borderColor: BORDER_COLOR,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#333',
    paddingHorizontal: 10,
    paddingVertical: 0,
  },
  // --- Filter Tabs ---
  tabScroll: {
    marginBottom: 15,
  },
  filterTab: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
  },
  filterTabDefault: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: BORDER_COLOR,
  },
  filterTabSelected: {
    backgroundColor: PRIMARY_COLOR,
    borderWidth: 1,
    borderColor: PRIMARY_COLOR,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '600',
  },
  filterTextDefault: {
    color: TEXT_GRAY,
  },
  filterTextSelected: {
    color: 'white',
  },
  filterCount: {
    fontWeight: 'bold',
  },
  // --- Member List ---
  memberList: {},
  memberCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: BORDER_COLOR,
  },
  avatarContainer: {
    marginRight: 15,
    position: 'relative',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  statusDot: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: 'white',
  },
  memberDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  memberName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginRight: 8,
  },
  roleTag: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    backgroundColor: LIGHT_GRAY_BG,
    marginRight: 5,
  },
  roleText: {
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  statusDotSmall: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  memberDepartment: {
    fontSize: 13,
    color: TEXT_GRAY,
    marginBottom: 2,
  },
  memberEmail: {
    fontSize: 12,
    color: TEXT_GRAY,
  },
  // --- Floating Action Button (FAB) ---
  fab: {
    position: 'absolute',
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
    bottom: 30,
    backgroundColor: PRIMARY_COLOR,
    borderRadius: 30,
    elevation: 4, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },

  noDataContainer: {
    alignItems: 'center',
    marginTop: 30,
  },
  noDataText: {
    color: '#999',
    fontSize: 14,
  },
  //

  menuDropdown: {
    position: 'absolute',
    right: 12,
    top: 60,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 8,
    width: 140,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
    zIndex: 999,
  },

  menuClose: {
    position: 'absolute',
    right: 6,
    top: 6,
    padding: 4,
  },

  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
  },

  menuItemText: {
    marginLeft: 10,
    fontSize: 14,
    color: '#333',
  },

  menuDivider: {
    height: 1,
    backgroundColor: '#eee',
    marginHorizontal: 10,
  },

  removeText: {
    color: '#d9534f',
  },

  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 16,
  },

  pageBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: PRIMARY_COLOR,
    borderRadius: 6,
  },

  disabledBtn: {
    backgroundColor: '#ccc',
  },

  pageText: {
    color: '#fff',
    fontWeight: '600',
  },

  pageCount: {
    marginHorizontal: 12,
    fontSize: 14,
    fontWeight: '500',
  },
});
