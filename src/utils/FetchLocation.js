// import Geolocation from '@react-native-community/geolocation';
import Geolocation from 'react-native-geolocation-service';
import {PermissionsAndroid, Platform} from 'react-native';

const fetchLocation = async callback => {
  try {
    // Request permissions on Android
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'This app needs access to your location.',
          buttonPositive: 'OK',
        },
      );

      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        throw new Error('Location permission denied');
      }
    }

    // Fetch the current location
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        const location = {latitude, longitude};

        // Call the callback with the location
        if (callback && typeof callback === 'function') {
          callback(null, location);
        }
      },
      error => {
        // Call the callback with the error
        if (callback && typeof callback === 'function') {
          callback(error, null);
        }
      },
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  } catch (error) {
    // Handle permission errors or other unexpected errors
    if (callback && typeof callback === 'function') {
      callback(error, null);
    }
  }
};

export default fetchLocation;
