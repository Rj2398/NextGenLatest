import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import ReportsReschedulingScreen from '../../components/ReportsReschedulingScreen';
import NoAnalyticsAvailable from '../../components/NoAnalyticsAvailable';
import ReportConnectionProblem from '../../components/ReportConnectionProblem';

const ReportsScreen = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('7d');
  const periods = ['Last 24h', '7d', '30d', 'YTD'];
  const tabIndicator = ['Overview', 'Reports'];
  const [showNoData, setshowNoData] = useState(true);
  const [selectTab, setSelectTab] = useState('Overview');
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      setshowNoData(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const bestSellingCategories = [
    {name: 'Online Courses', value: '$12,450', color: '#FF6B35'},
    {name: 'Textbooks', value: '$8,320', color: '#FFB088'},
    {name: 'Lab Equipment', value: '$5,890', color: '#4ECDC4'},
  ];

  const bestSellingProducts = [
    {name: 'Advanced Mathematics', sku: 'EDU-001', sold: 124, value: '$2,480'},
    {name: 'Chemistry Lab Kit', sku: 'LAB-205', sold: 89, value: '$1,780'},
    {
      name: 'Digital Learning Platform',
      sku: 'DIG-102',
      sold: 67,
      value: '$1,340',
    },
  ];

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleTabClickListener = () => {};

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content" // options: 'light-content' | 'dark-content'
        backgroundColor="#FFFFFF" // sets background color on Android
      />
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <Image
            source={require('../../../assets/images/ic_back_btn.png')}
            style={{height: 16, width: 16}}></Image>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Reports</Text>
        {/* <TouchableOpacity style={styles.menuButton}>
          <Image source={require('../../../assets/images/slider_icon.png')} style={{height:16,width:22}}></Image>
        </TouchableOpacity> */}
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Tabs */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={
              selectTab === 'Overview' ? styles.tabActive : styles.tabInactive
            }
            onPress={() => {
              setSelectTab('Overview');
            }}>
            <Text
              style={
                selectTab === 'Overview'
                  ? styles.tabTextActive
                  : styles.tabTextInactive
              }>
              Overview
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={
              selectTab === 'Overview' ? styles.tabInactive : styles.tabActive
            }
            onPress={() => setSelectTab('Reports')}>
            <Text
              style={
                selectTab === 'Overview'
                  ? styles.tabTextInactive
                  : styles.tabTextActive
              }>
              Schedule
            </Text>
          </TouchableOpacity>
        </View>

        {showNoData ? (
          <NoAnalyticsAvailable />
        ) : selectTab === 'Reports' ? (
          <ReportsReschedulingScreen />
        ) : (
          <>
            {/* Period Filter */}
            <View style={styles.periodContainer}>
              {periods.map(period => (
                <TouchableOpacity
                  key={period}
                  style={[
                    styles.periodButton,
                    selectedPeriod === period && styles.periodButtonActive,
                  ]}
                  onPress={() => setSelectedPeriod(period)}>
                  <Text
                    style={[
                      styles.periodText,
                      selectedPeriod === period && styles.periodTextActive,
                    ]}>
                    {period}
                  </Text>
                </TouchableOpacity>
              ))}
              <TouchableOpacity style={styles.filterButton}>
                <Image
                  source={require('../../../assets/images/ic_filter_black.png')}
                  style={{height: 15, width: 15}}
                  resizeMode="contain"></Image>
              </TouchableOpacity>
            </View>

            {/* Metrics */}
            <View style={styles.metricsContainer}>
              <View style={styles.metricCard}>
                <Text style={styles.metricLabel}>💲 Total Profit</Text>
                <Text style={styles.metricValue}>$24,500</Text>
                <Text style={styles.metricChange}>↑ 12.5%</Text>
              </View>

              <View style={styles.metricCard}>
                <View style={styles.rowcard}>
                  <Image
                    source={require('../../../assets/images/ic_revenue.png')}></Image>
                  <Text style={styles.metricLabel}> Revenue</Text>
                </View>
                <Text style={styles.metricValue}>$89,240</Text>
                <Text style={styles.metricChange}>↑ 8.2%</Text>
              </View>

              <View style={styles.metricCard}>
                <View style={styles.rowcard}>
                  <Image
                    source={require('../../../assets/images/ic_cart_icon.png')}
                    style={{height: 13, width: 13, marginTop: 3}}></Image>
                  <Text style={styles.metricLabel}> Sales</Text>
                </View>
                <Text style={styles.metricValue}>1,247</Text>
                <Text style={styles.metricSubtext}>vs last month</Text>
              </View>
            </View>

            {/* Sales Overview */}
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>Sales Overview</Text>
                <View style={styles.backgroundLast}>
                  <Text style={styles.cardSubtitle}>Last 7 days</Text>
                </View>
              </View>
              <View style={styles.chartPlaceholder}>
                <Text style={styles.chartText}>Chart Area</Text>
              </View>
            </View>

            {/* Best Selling Categories */}
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>Best Selling Categories</Text>
                <TouchableOpacity>
                  <Text style={styles.seeAllText}>See All</Text>
                </TouchableOpacity>
              </View>
              {bestSellingCategories.map((category, index) => (
                <View key={index} style={styles.categoryItem}>
                  <View style={styles.categoryLeft}>
                    <View
                      style={[
                        styles.categoryDot,
                        {backgroundColor: category.color},
                      ]}
                    />
                    <Text style={styles.categoryName}>{category.name}</Text>
                  </View>
                  <Text style={styles.categoryValue}>{category.value}</Text>
                </View>
              ))}
            </View>

            {/* Best Selling Products */}
            <View style={[styles.card, styles.lastCard]}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>Best Selling Products</Text>
                <TouchableOpacity>
                  <Text style={styles.seeAllText}>See All</Text>
                </TouchableOpacity>
              </View>
              {bestSellingProducts.map((product, index) => (
                <View key={index} style={styles.productItem}>
                  <View style={styles.productImage}>
                    <Image
                      source={require('../../../assets/images/ic_maggi.png')}
                      style={{flex: 1, width: '100%', height: '100%'}}></Image>
                  </View>
                  <View style={styles.productInfo}>
                    <Text style={styles.productName}>{product.name}</Text>
                    <Text style={styles.productSku}>SKU: {product.sku}</Text>
                  </View>
                  <View style={styles.productStats}>
                    <Text style={styles.productSold}>{product.sold} sold</Text>
                    <Text style={styles.productValue}>{product.value}</Text>
                  </View>
                </View>
              ))}
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#F5F5F5'},
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
  },
  rowcard: {flexDirection: 'row'},
  backButton: {padding: 8},
  backIcon: {fontSize: 20, color: '#333'},
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginLeft: 120,
  },
  menuButton: {padding: 8},
  menuIcon: {fontSize: 20, color: '#333'},
  content: {flex: 1, padding: 16},
  tabContainer: {flexDirection: 'row', marginBottom: 16, gap: 8},
  tabActive: {
    flex: 1,
    paddingVertical: 12,
    backgroundColor: '#FF7A00',
    borderRadius: 8,
    alignItems: 'center',
  },
  backgroundLast: {
    backgroundColor: '#F0F8FF',
    borderRadius: 19,
    padding: 9,
  },
  tabInactive: {
    flex: 1,
    paddingVertical: 12,
    backgroundColor: '#E5E7EB',
    borderRadius: 8,
    alignItems: 'center',
  },
  tabTextActive: {color: '#FFF', fontWeight: '600', fontSize: 14},
  tabTextInactive: {color: '#666', fontWeight: '500', fontSize: 14},
  periodContainer: {flexDirection: 'row', marginBottom: 16, gap: 8},
  periodButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
  },
  periodButtonActive: {backgroundColor: '#FF7A00'},
  periodText: {color: '#666', fontSize: 13},
  periodTextActive: {color: '#FFF', fontWeight: '600'},
  filterButton: {
    marginLeft: 'auto',
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
  },
  filterIcon: {fontSize: 12, color: '#666'},
  metricsContainer: {flexDirection: 'row', marginBottom: 16, gap: 12},
  metricCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
  },
  metricLabel: {fontSize: 13, color: '#666', marginBottom: 8},
  metricValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    marginBottom: 4,
  },
  metricChange: {fontSize: 12, color: '#43A3A3'},
  metricSubtext: {fontSize: 11, color: '#999'},
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  lastCard: {marginBottom: 32},
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardTitle: {fontSize: 16, fontWeight: '600', color: '#333'},
  cardSubtitle: {fontSize: 13, color: '#999'},
  seeAllText: {fontSize: 13, color: '#FF7A00', fontWeight: '600'},
  chartPlaceholder: {
    height: 180,
    backgroundColor: '#F9F9F9',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chartText: {color: '#999', fontSize: 14},
  categoryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  categoryLeft: {flexDirection: 'row', alignItems: 'center'},
  categoryDot: {width: 10, height: 10, borderRadius: 5, marginRight: 12},
  categoryName: {fontSize: 14, color: '#333'},
  categoryValue: {fontSize: 15, fontWeight: '600', color: '#333'},
  productItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  productImage: {
    width: 48,
    height: 48,
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    marginRight: 12,
  },
  productInfo: {flex: 1},
  productName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  productSku: {fontSize: 12, color: '#999'},
  productStats: {alignItems: 'flex-end'},
  productSold: {fontSize: 12, color: '#999', marginBottom: 4},
  productValue: {fontSize: 15, fontWeight: '600', color: '#333'},
});

export default ReportsScreen;
