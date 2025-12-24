import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Image,
  TextInput,
} from 'react-native';

import DateRangeScreen from './DateRangeScreen';
import ScheduleReportModal from './ScheduleReportModal'; 

const ReportsReschedulingScreen = () => {
  const [selectedReport, setSelectedReport] = useState('Sales Summary');
  const [selectedFormat, setSelectedFormat] = useState('CSV');
  const [quickExportFormat, setQuickExportFormat] = useState('CSV');
  const [startDate, setStartDate] = useState('2024-01-01');
  const [endDate, setEndDate] = useState('2024-01-31');
const [showScheduleModal, setShowScheduleModal] = useState(false);


  const savedSchedules = [
    {
      id: 1,
      title: 'Sales Summary — Daily at 09:00 UTC',
      frequency: 'Daily',
      format: 'CSV',
      alternateFormat: 'PDF',
      recipients: ['admin@school.edu', 'finance@school.edu'],
      lastSent: 'Last sent 2 hours ago',
    },
    {
      id: 2,
      title: 'Best Sellers — Weekly on Monday',
      frequency: 'Weekly',
      format: 'CSV',
      recipients: ['marketing@school.edu'],
      lastSent: 'Last sent 3 days ago',
    },
    {
      id: 3,
      title: 'Orders Report — Monthly',
      frequency: 'Monthly',
      format: 'PDF',
      status: 'Paused',
      recipients: ['operations@school.edu'],
      lastSent: 'Paused since last week',
    },
  ];

  const getDateInputStyle = (index) => [
    styles.dateInput,
    { width: '45%' },
    index === 0 ? { marginRight: 8 } : {},
  ];

  return (
    <SafeAreaView style={styles.container}>

     

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>

      

        {/* Report Selector */}
        <View style={styles.card}>
          <TouchableOpacity style={styles.dropdown}>
            <Text style={styles.dropdownText}>{selectedReport}</Text>
           <Image source={require('../../assets/images/ic_drop_down_black.png')}
            style={{height:12,width:12}}
            resizeMode='contain'
           ></Image>
          </TouchableOpacity>

          <View style={styles.formatContainer}>
            <TouchableOpacity
              style={[
                styles.formatButton,
                selectedFormat === 'CSV' && styles.formatButtonActive,
                { marginRight: 12 },
              ]}
              onPress={() => setSelectedFormat('CSV')}
            >
      
            
          <Image
  source={require('../../assets/images/ic_csv.png')}
  style={[
    styles.formatIconImage,{marginRight:5},
    selectedFormat === 'PDF' && styles.formatIconImageActive,
  ]}
/>
 <Text  style={[
                  styles.formatText,
                  selectedFormat === 'CSV' && styles.formatTextActive,
                ]}
              >
                CSV
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.formatButton,
                selectedFormat === 'PDF' && styles.formatButtonActive,
                
              ]}
              onPress={() => setSelectedFormat('PDF')}
            >
     <Image
    source={require('../../assets/images/ic_pdf_icon_img.png')}
    style={[
    styles.formatIconImage,{marginRight:5},
    selectedFormat === 'PDF' && styles.formatIconImageActive,
  ]}
/>
              <Text
                style={[
                  styles.formatText,
                  selectedFormat === 'PDF' && styles.formatTextActive,
                ]}
              >
                PDF
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Saved Schedules */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Saved Schedules</Text>
          <Text style={styles.activeCount}>{savedSchedules.length} active</Text>
        </View>

        {savedSchedules.map((schedule) => (
          <View key={schedule.id} style={styles.scheduleCard}>
            <View style={styles.scheduleHeader}>
              <Text style={styles.scheduleTitle}>{schedule.title}</Text>
              <TouchableOpacity style={styles.moreButton}>
                <Text style={styles.moreIcon}>⋮</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.tagContainer}>
              <View
                style={[
                  styles.tag,
                  schedule.frequency === 'Daily' && styles.tagDaily,
                  schedule.frequency === 'Weekly' && styles.tagWeekly,
                  schedule.frequency === 'Monthly' && styles.tagMonthly,
                ]}
              >
                <Text
                  style={[
                    styles.tagText,
                    schedule.frequency === 'Daily' && styles.tagTextDaily,
                    schedule.frequency === 'Weekly' && styles.tagTextWeekly,
                    schedule.frequency === 'Monthly' && styles.tagTextMonthly,
                  ]}
                >
                  {schedule.frequency}
                </Text>
              </View>

              <View style={styles.tagGray}>
                <Text style={styles.tagTextGray}>{schedule.format}</Text>
              </View>

              {schedule.alternateFormat && (
                <View style={styles.tagGray}>
                  <Text style={styles.tagTextGray}>{schedule.alternateFormat}</Text>
                </View>
              )}

              {schedule.status && (
                <View style={styles.tagPaused}>
                  <Text style={styles.tagTextPaused}>{schedule.status}</Text>
                </View>
              )}
            </View>

            <View style={styles.recipientsContainer}>
              {schedule.recipients.map((recipient, index) => (
                <View key={index} style={styles.recipientWrapper}>
                  <Text style={styles.recipientText}>{recipient}</Text>
                </View>
              ))}
            </View>

            <Text style={styles.lastSentText}>{schedule.lastSent}</Text>
          </View>
        ))}

        {/* Quick Export */}
        <View style={styles.quickExportCard}>
          <Text style={styles.quickExportTitle}>Quick Export</Text>

          <Text style={styles.label}>Report Type</Text>
          <TouchableOpacity style={styles.dropdown}>
            <Text style={styles.dropdownText}>Sales Summary</Text>
            <Image source={require('../../assets/images/ic_drop_down_black.png')} style={{heigh:11,width:11}} resizeMode='contain'></Image>
          </TouchableOpacity>

      <DateRangeScreen />
      <Text style={styles.label}>Format</Text>
          <View style={styles.checkboxContainer}>
            <TouchableOpacity
              style={styles.checkboxRow}
              onPress={() => setQuickExportFormat('CSV')}
            >
              <View
                style={[
                  styles.checkbox,
                  quickExportFormat === 'CSV' && styles.checkboxChecked,
                ]}
              >
                {quickExportFormat === 'CSV' && <Text style={styles.checkmark}>✓</Text>}
              </View>
              <Text style={styles.checkboxLabel}>CSV</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.checkboxRow, { marginLeft: 24 }]}
              onPress={() => setQuickExportFormat('PDF')}
            >
              <View
                style={[
                  styles.checkbox,
                  quickExportFormat === 'PDF' && styles.checkboxChecked,
                ]}
              >
                {quickExportFormat === 'PDF' && <Text style={styles.checkmark}>✓</Text>}
              </View>
              <Text style={styles.checkboxLabel}>PDF</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.exportButton}>
          <Image source={require('../../assets/images/ic_download_icon_new.png')} style={{heigh:11,width:11,marginRight:7}} resizeMode='contain'></Image>
           <Text style={styles.exportButtonText}>Export Report</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.scheduleButton} onPress={() => setShowScheduleModal(true)}>
          <Text style={styles.scheduleButtonIcon}>+</Text>
          <Text style={styles.scheduleButtonText}>Schedule New Report</Text>
        </TouchableOpacity>

         <TouchableOpacity style={styles.floatingButton}>
        <Image
  source={require('../../assets/images/ic_plus_icon.png')}
  resizeMode="contain"
  style={{ height: 20, width: 20 }}
/>
      </TouchableOpacity>
       <ScheduleReportModal
        isVisible={showScheduleModal}
        onClose={() => setShowScheduleModal(false)}
      />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
floatingButton: {
  position: 'absolute',   // absolute positioning
  right: 20,              // distance from right edge
  bottom: 40,             // distance from bottom edge (increased for margin)
  width: 60,              // button width
  height: 60,             // button height
  borderRadius: 30,       // circular
  backgroundColor: '#FF6B35',
  justifyContent: 'center',
  alignItems: 'center',
  elevation: 5,           // shadow for Android
  shadowColor: '#000',    // shadow for iOS
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.3,
  shadowRadius: 3,
}
  ,
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
  },
  rowContainer:{
      flexDirection:'row',
      flex:1,
      width:'100%'
  },
  menuButton: { padding: 8 },
  menuIcon: { fontSize: 20, color: '#666' },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    flex: 1,
  },
  rightPlaceholder: { width: 36 },
  content: { flex: 1, },
  tabContainer: { flexDirection: 'row', marginBottom: 16 },
  tabActive: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 8,
    backgroundColor: '#FF6B35',
    borderRadius: 8,
    alignItems: 'center',
  },
  tabRight: { marginLeft: 8 },
  tabInactive: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 8,
    backgroundColor: '#E8E8E8',
    borderRadius: 8,
    alignItems: 'center',
  },
  tabTextActive: { color: '#FFF', fontWeight: '600', fontSize: 13 },
  tabTextInactive: { color: '#666', fontWeight: '500', fontSize: 13 },
  card: { backgroundColor: '#FFF', borderRadius: 12, padding: 16, marginBottom: 16 },
  dropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 14,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    marginBottom: 16,
  },
  dropdownText: { fontSize: 15, color: '#333' },
  dropdownIcon: { fontSize: 12, color: '#666' },
  formatContainer: { flexDirection: 'row', marginBottom: 4 },
  formatButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 14,
    backgroundColor: '#FFF',
    borderWidth: 1.5,
    borderColor: '#E0E0E0',
    borderRadius: 8,
  },
  formatButtonActive: { borderColor: '#FF6B35', backgroundColor: '#FFF5F2' },
  formatIcon: { height:13,width:13, marginRight: 8 },
  formatText: { fontSize: 15, fontWeight: '600', color: '#666' },
  formatTextActive: { color: '#FF6B35' },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: { fontSize: 16, fontWeight: '600', color: '#333' },
  activeCount: { fontSize: 13, color: '#999' },
  scheduleCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  scheduleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  scheduleTitle: { fontSize: 15, fontWeight: '600', color: '#333', flex: 1 },
  moreButton: { padding: 4 },
  moreIcon: { fontSize: 18, color: '#666' },
  tagContainer: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 12 },
  tag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  tagDaily: { backgroundColor: '#C5DFDD' },
  tagWeekly: { backgroundColor: '#FFF3E0' },
  tagMonthly: { backgroundColor: '#FFE9EC' },

  tagGray: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#FF7A001A',
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
    
  },
  tagPaused: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#FFF9E6',
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: { fontSize: 12, fontWeight: '500' },
  tagTextDaily: { color: '#43A3A3' },
  tagTextWeekly: { color: '#FFAF66' },
  tagTextMonthly: { color: '#E57373' },
  tagTextGray: { fontSize: 12, fontWeight: '500', color: '#FF7A00' },
  tagTextPaused: { fontSize: 12, fontWeight: '500', color: '#F9A825' },
  recipientsContainer: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 8 },
  recipientWrapper: { marginRight: 12, marginBottom: 8 },
  recipientText: {
    fontSize: 13,
    color: '#666',
    backgroundColor: '#F9F9F9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  lastSentText: { fontSize: 12, color: '#999', marginTop: 4 },
  quickExportCard: { backgroundColor: '#FFF', borderRadius: 12, padding: 16, marginBottom: 16 },
  quickExportTitle: { fontSize: 16, fontWeight: '600', color: '#333', marginBottom: 16 },
  label: { fontSize: 14, fontWeight: '500', color: '#333', marginBottom: 8, marginTop: 8 },
  dateRangeContainer: { flexDirection: 'row', justifyContent: 'space', marginBottom: 8,maxHeight: 50 },

  dateInput: {
    padding: 14,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    fontSize: 14,
    color: '#333',
    width:'100%',
    flex:1
  },
  calendarButton: {
    padding: 14,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  calendarIcon: { fontSize: 20 },
  checkboxContainer: { flexDirection: 'row', marginBottom: 16 },
  checkboxRow: { flexDirection: 'row', alignItems: 'center' },
  checkbox: {
    width: 22,
    height: 22,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    borderRadius: 4,
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: { backgroundColor: '#2196F3', borderColor: '#2196F3' },
  checkmark: { color: '#FFF', fontSize: 14, fontWeight: '700' },
  checkboxLabel: { fontSize: 15, color: '#333' },
  exportButton: {
    flexDirection: 'row',
    backgroundColor: '#FF6B35',
    padding: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  exportIcon: { color: '#FFF', fontSize: 18, marginRight: 8 },
  exportButtonText: { color: '#FFF', fontSize: 16, fontWeight: '600' },
scheduleButton: {
  flexDirection: 'row',
  backgroundColor: '#FF6B35',
  padding: 16,
  borderRadius: 8,
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: 30,
  marginHorizontal:10
  // works if parent allows stacking
},
  scheduleButtonIcon: { color: '#FFF', fontSize: 20, marginRight: 8, fontWeight: '600' },
  scheduleButtonText: { color: '#FFF', fontSize: 16, fontWeight: '600' },
});

export default ReportsReschedulingScreen;
