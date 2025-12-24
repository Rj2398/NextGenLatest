import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Text, View, Image} from 'react-native';

import Billing from '../views/pages/onBoardScreen/Billing';
import Account from '../views/pages/onBoardScreen/Account';
import MerchantProfileScreen from '../views/pages/onBoardScreen/MerchantProfileScreen';
import DrawerComponent from './DrawerComponents';
import {useSelector} from 'react-redux';
import Bazar from '../views/pages/user/Bazar';
import UserProfile from '../views/pages/user/UserProfile';
import MyAds from '../views/pages/onBoardScreen/MyAds';

const Tab = createBottomTabNavigator();

const TabsComponent = () => {
  const useTypeStore =
    useSelector(({user}) => user?.useTypeStore) || 'Academia';

  return (
    <Tab.Navigator
      // initialRouteName="Inventory"
      screenOptions={({route}) => ({
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: '#ED8A00',
        tabBarInactiveTintColor: '#9D0C0C',
        tabBarStyle: {
          backgroundColor: '#FFF',
          borderTopWidth: 0,
          elevation: 10,
          shadowColor: '#000',
          shadowOffset: {width: 0, height: 4},
          shadowOpacity: 0.3,
          shadowRadius: 4,
        },

        headerShown: false,
      })}>
      {/* first tabs */}
      {useTypeStore === 'Merchant' && (
        <Tab.Screen
          name="Orders"
          component={DrawerComponent} // This contains the nested Drawer Navigator
          options={{
            tabBarLabel: ({focused}) => (
              <Text
                style={{
                  color: focused ? '#ED8A00' : '#858D9D',
                  fontSize: 14,
                  fontWeight: 'bold',
                }}>
                Orders
              </Text>
            ),
            tabBarIcon: ({focused}) => (
              <Image
                source={require('./../assets/inventory.png')}
                style={{
                  width: 24,
                  height: 24,
                  tintColor: focused ? '#ED8A00' : '#858D9D',
                  resizeMode: 'contain',
                }}
              />
            ),
          }}
        />
      )}
      {useTypeStore === 'User' && (
        <Tab.Screen
          name="My Posts"
          component={DrawerComponent} // This contains the nested Drawer Navigator
          options={{
            tabBarLabel: ({focused}) => (
              <Text
                style={{
                  color: focused ? '#ED8A00' : '#858D9D',
                  fontSize: 14,
                  fontWeight: 'bold',
                }}>
                My Posts
              </Text>
            ),
            tabBarIcon: ({focused}) => (
              <Image
                source={require('../assets/tabsIcon/myPost.png')}
                style={{
                  width: 24,
                  height: 24,
                  tintColor: focused ? '#ED8A00' : '#858D9D',
                  resizeMode: 'contain',
                }}
              />
            ),
          }}
        />
      )}

      {useTypeStore === 'Academia' && (
        <Tab.Screen
          name="Posts"
          component={DrawerComponent} // This contains the nested Drawer Navigator
          options={{
            tabBarLabel: ({focused}) => (
              <Text
                style={{
                  color: focused ? '#ED8A00' : '#858D9D',
                  fontSize: 14,
                  fontWeight: 'bold',
                }}>
                Posts
              </Text>
            ),
            tabBarIcon: ({focused}) => (
              <Image
                source={require('../assets/tabsIcon/post.png')}
                style={{
                  width: 24,
                  height: 24,
                  tintColor: focused ? '#ED8A00' : '#292D32',
                  resizeMode: 'contain',
                }}
              />
            ),
          }}
        />
      )}

      {/* 2. MIDDLE TAB: BILLING */}

      {/* second tabs */}
      {useTypeStore === 'Academia' && (
        <Tab.Screen
          name="Ads"
          component={MyAds}
          options={{
            tabBarLabel: ({focused}) => (
              <Text
                style={{
                  color: focused ? '#ED8A00' : '#858D9D',
                  fontSize: 14,
                  fontWeight: 'bold',
                }}>
                Ads
              </Text>
            ),
            tabBarIcon: ({focused}) => (
              // <View style={{width: size, height: size, backgroundColor: color}} />
              <Image
                source={require('../assets/tabsIcon/add.png')} // 👈 one single icon
                style={{
                  width: 24,
                  height: 24,
                  tintColor: focused ? '#ED8A00' : '#292D32', // 👈 dynamic color
                  resizeMode: 'contain',
                }}
              />
            ),
          }}
        />
      )}
      {useTypeStore === 'Merchant' && (
        <Tab.Screen
          name="Ads"
          component={Billing}
          options={{
            tabBarLabel: ({focused}) => (
              <Text
                style={{
                  color: focused ? '#ED8A00' : '#858D9D',
                  fontSize: 14,
                  fontWeight: 'bold',
                }}>
                Ads
              </Text>
            ),
            tabBarIcon: ({focused}) => (
              // <View style={{width: size, height: size, backgroundColor: color}} />
              <Image
                source={require('../assets/tabsIcon/add.png')} // 👈 one single icon
                style={{
                  width: 24,
                  height: 24,
                  tintColor: focused ? '#ED8A00' : '#858D9D', // 👈 dynamic color
                  resizeMode: 'contain',
                }}
              />
            ),
          }}
        />
      )}
      {useTypeStore === 'User' && (
        <Tab.Screen
          name="Bazaar"
          component={Bazar}
          options={{
            tabBarLabel: ({focused}) => (
              <Text
                style={{
                  color: focused ? '#ED8A00' : '#858D9D',
                  fontSize: 14,
                  fontWeight: 'bold',
                }}>
                Bazaar
              </Text>
            ),
            tabBarIcon: ({focused}) => (
              // <View style={{width: size, height: size, backgroundColor: color}} />
              <Image
                source={require('../assets/tabsIcon/bazar.png')}
                style={{
                  width: 24,
                  height: 24,
                  tintColor: focused ? '#ED8A00' : '#858D9D', // 👈 dynamic color
                  resizeMode: 'contain',
                }}
              />
            ),
          }}
        />
      )}
      {/* 3. LAST TAB (Right Side): ACCOUNT */}
      {/* third tabs */}

      {useTypeStore === 'Merchant' && (
        <Tab.Screen
          name="Account"
          component={MerchantProfileScreen}
          options={{
            tabBarLabel: ({focused}) => (
              <Text
                style={{
                  color: focused ? '#ED8A00' : '#858D9D',
                  fontSize: 14,
                  fontWeight: 'bold',
                }}>
                Account
              </Text>
            ),
            tabBarIcon: ({focused}) => (
              <Image
                source={require('./../assets/account.png')} // 👈 one single icon
                style={{
                  width: 24,
                  height: 24,
                  tintColor: focused ? '#ED8A00' : '#858D9D', // 👈 dynamic color
                  resizeMode: 'contain',
                }}
              />
            ),
          }}
        />
      )}
      {useTypeStore === 'Academia' && (
        <Tab.Screen
          name="Account"
          component={MerchantProfileScreen}
          options={{
            tabBarLabel: ({focused}) => (
              <Text
                style={{
                  color: focused ? '#ED8A00' : '#292D32',
                  fontSize: 14,
                  fontWeight: 'bold',
                }}>
                Account
              </Text>
            ),
            tabBarIcon: ({focused}) => (
              <Image
                source={require('./../assets/account.png')} // 👈 one single icon
                style={{
                  width: 24,
                  height: 24,
                  tintColor: focused ? '#ED8A00' : '#858D9D', // 👈 dynamic color
                  resizeMode: 'contain',
                }}
              />
            ),
          }}
        />
      )}
      {useTypeStore === 'User' && (
        <Tab.Screen
          name="Account"
          component={UserProfile}
          options={{
            // headerShown: false,
            tabBarLabel: ({focused}) => (
              <Text
                style={{
                  color: focused ? '#ED8A00' : '#858D9D',
                  fontSize: 14,
                  fontWeight: 'bold',
                }}>
                Account
              </Text>
            ),
            tabBarIcon: ({focused}) => (
              <Image
                source={require('../assets/tabsIcon/account.png')}
                style={{
                  width: 24,
                  height: 24,
                  tintColor: focused ? '#ED8A00' : '#5C5D5E', // 👈 dynamic color
                  resizeMode: 'contain',
                }}
              />
            ),
          }}
        />
      )}
    </Tab.Navigator>
  );
};

export default TabsComponent;
