import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import Header from '../../components/Header';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
//import Icon from 'react-native-vector-icons/Ionicons';

const Billing = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      {/* Custom Header */}

      <Header title={'Billing'} onBackPress={() => navigation.goBack()} />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Current Plan */}
        <View style={styles.card}>
          <View style={styles.row}>
            <Image
              source={require('../../../assets/paper_plane.png')} // 💡 Path Updated
              style={styles.paperPlaneImage}
              resizeMode="contain"
            />
            <View style={styles.textContainer}>
              <Text style={styles.planTitle}>Standard Monthly Plan</Text>
              <View style={styles.row}>
                <View
                  style={[styles.rowBetween, {marginStart: 10, marginTop: 10}]}>
                  <View style={styles.activeBadge}>
                    <Text style={styles.activeText}>Active</Text>
                  </View>
                </View>
                <Text
                  style={[styles.planSub, {marginStart: 10, marginTop: 10}]}>
                  since April 9th, 2025
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.divider} />

          <Text style={styles.sectionTitle}>What’s included</Text>
          <View style={styles.bulletContainer}>
            <View style={styles.bullet}>
              <Image
                source={require('../../../assets/check.png')} // 💡 Path Updated
                resizeMode="contain"
              />
            </View>
            <Text style={styles.bulletText}>Unlimited Platform</Text>
          </View>
          <View style={styles.bulletContainer}>
            <View style={styles.bullet}>
              <Image
                source={require('../../../assets/check.png')} // 💡 Path Updated
                resizeMode="contain"
              />
            </View>
            <Text style={styles.bulletText}>5 featured ads per month</Text>
          </View>
          <View style={styles.bulletContainer}>
            <View style={styles.bullet}>
              <Image
                source={require('../../../assets/check.png')} // 💡 Path Updated
                resizeMode="contain"
              />
            </View>
            <Text style={styles.bulletText}>24/7 customer support</Text>
          </View>

          <TouchableOpacity style={styles.cancelBtn}>
            <Text style={styles.cancelBtnText}>Cancel Plan</Text>
          </TouchableOpacity>
        </View>

        {/* Next Invoice */}
        <View style={styles.card}>
          <View style={styles.row}>
            <Image
              source={require('../../../assets/invoice.png')} // 💡 Path Updated
              style={styles.paperPlaneImage}
              resizeMode="contain"
            />
            <View style={styles.textContainer}>
              <Text style={[styles.invoiceTitle, {marginStart: 10}]}>
                Next Invoice
              </Text>
              <View style={styles.row}>
                <View style={[styles.rowBetween, {marginStart: 10}]}>
                  <View style={styles.invoiceBadge}>
                    <Text style={styles.invoceText}>Due</Text>
                  </View>
                </View>
                <Text style={[styles.invoceSub, {marginStart: 10, width: 115}]}>
                  Feb1, 2025 standard (monthly)
                </Text>
              </View>
            </View>
          </View>

          <TouchableOpacity style={[styles.orangeBtn, {marginTop: 30}]}>
            <Text style={styles.orangeText}>Pay Now</Text>
          </TouchableOpacity>
        </View>

        {/* Payment Method */}
        <View style={styles.card}>
          <Text style={styles.paymentTitle}>Payment Method</Text>
          <View style={styles.rowBetween}>
            <View style={[styles.row]}>
              <Image
                source={require('../../../assets/visa_icon.png')} // 💡 Path Updated
                style={styles.cardIcon}
                resizeMode="contain"
              />
              <View style={styles.textContainer}>
                <Text style={styles.planTitle}>**** **** 4242</Text>

                <Text style={[styles.cardNameSub, {marginStart: 10}]}>
                  Peter Black
                </Text>
                <Text style={[styles.planSub, {marginStart: 10}]}>
                  Expires 12/36
                </Text>
              </View>
            </View>
            <Image
              source={require('../../../assets/delete_icon.png')} // 💡 Path Updated
              style={[
                styles.cardIcon,
                {alignContent: 'flex-end', alignItems: 'flex-end'},
              ]}
              resizeMode="contain"
            />
          </View>
          <TouchableOpacity style={styles.orangeBtn}>
            <Text style={styles.orangeText}>Change Payment Card</Text>
          </TouchableOpacity>
        </View>

        {/* Recent Invoices */}
        <View style={[styles.card, {marginBottom: 20}]}>
          <View style={styles.row}>
            <Image
              source={require('../../../assets/paper_plane.png')} // 💡 Path Updated
              style={styles.paperPlaneImage}
              resizeMode="contain"
            />
            <Text style={[styles.recentinvoiceTitle, {marginStart: 10}]}>
              Recent Invoices
            </Text>
          </View>

          {[
            {date: 'Jan1, 2025  at 11:34 PM', amount: '$20.00'},
            {date: 'Feb1, 2025  at 11:34 PM', amount: '$20.00'},
            {date: 'March1, 2025  at 11:34 PM', amount: '$20.00'},
          ].map((item, index) => (
            <View style={[styles.recentcard]}>
              <View key={index} style={styles.invoiceRow}>
                <View style={styles.textContainerrecent}>
                  {/* --- TOP ROW --- */}
                  <View style={styles.dateAndDownloadRow}>
                    {/* This will push the download icon to the right */}
                    <Text style={styles.invoiceDate}>{item.date}</Text>
                    <Image
                      source={require('../../../assets/csv_icon.png')} // 💡 Path Updated (as per previous request)
                      style={styles.downloadImage}
                      resizeMode="contain"
                    />
                  </View>

                  {/* --- BOTTOM ROW --- */}
                  <View style={styles.statusAndAmountRow}>
                    {/* This will push the amount to the right */}
                    <Text style={styles.invoiceStatus}>Featured ads</Text>
                    <Text style={styles.invoiceAmount}>{item.amount}</Text>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Billing;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#F7F5F4'},
  textContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  textContainerrecent: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  recentcard: {
    width: '100%',
    backgroundColor: '#fff',
    marginTop: 16,
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    borderColor: '#E3E3E3',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  paperPlaneImage: {width: 50, height: 50},
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  row: {flexDirection: 'row', alignItems: 'center'},

  planTitle: {
    fontSize: 16,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    color: '#170F49',
    marginStart: 10,
  },
  planSub: {
    color: '#767E94',
    fontSize: 13,
    marginTop: 2,
    fontFamily: 'Roboto',
    fontWeight: 'medium',
  },
  activeBadge: {
    backgroundColor: '#BBE6BE',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  invoiceBadge: {
    backgroundColor: '#FFD7D7',
    paddingHorizontal: 25,
    paddingVertical: 4,
    borderRadius: 15,
  },
  activeText: {
    color: '#0E7215',
    fontSize: 12,
    fontWeight: 'medium',
    fontFamily: 'Inter',
  },

  divider: {height: 1, backgroundColor: '#EEE', marginVertical: 10},
  sectionTitle: {
    fontSize: 12,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    color: '#170F49',
    marginBottom: 8,
  },

  bulletContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    marginTop: 10,
  },
  bullet: {width: 15, height: 15, borderRadius: 3, marginRight: 8},
  bulletText: {
    fontSize: 12,
    color: '#170F49',
    fontFamily: 'Roboto',
    fontWeight: 'regular',
  },
  priceText: {fontSize: 15, color: '#000', fontWeight: '700', marginTop: 10},
  cancelBtn: {
    backgroundColor: '#FFFAF5',
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  cancelBtnText: {color: '#000000', fontWeight: 'bold', fontFamily: 'Roboto'},
  invoiceTitle: {
    fontSize: 16,
    fontFamily: 'Roboto',
    fontWeight: 'medium',
    color: '#170F49',
    marginBottom: 8,
  },
  invoceSub: {
    color: '#767E94',
    fontSize: 13,
    marginTop: 2,
    fontFamily: 'Roboto',
    fontWeight: 'medium',
  },
  orangeBtn: {
    backgroundColor: '#FF8719',
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  paymentTitle: {
    fontSize: 16,
    fontFamily: 'Inter',
    fontWeight: 'medium',
    color: '#170F49',
    marginBottom: 8,
  },
  orangeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    padding: 5,
  },
  cardNameSub: {
    color: '#170F49',
    fontSize: 13,
    marginTop: 2,
    fontFamily: 'Roboto',
    fontWeight: 'medium',
  },

  nextDate: {color: '#555', fontSize: 13, marginBottom: 8},

  cardIcon: {width: 31, height: 22, marginRight: 10},
  cardText: {fontSize: 14, color: '#000'},

  invoiceRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
  invoceText: {
    textAlign: 'center',
    justifyContent: 'center',
    color: '#AD5757',
    fontSize: 12,
    fontWeight: 'medium',
    fontFamily: 'Inter',
  },
  invoiceDate: {
    color: '#464D61',
    fontSize: 14,
    fontFamily: 'Roboto',
    fontWeight: '600',
  },
  invoiceStatus: {
    color: '#464D61',
    fontSize: 12,
    marginTop: 5,
    fontFamily: 'Roboto',
    fontWeight: '400',
  },
  invoiceAmount: {color: '#464D61', fontWeight: '700', fontFamily: 'Inter'},
  recentinvoiceTitle: {
    fontSize: 16,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    color: '#170F49',
    marginBottom: 8,
  },
  downloadImage: {width: 20, height: 20},
  statusAndAmountRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
  },
  dateAndDownloadRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
});
