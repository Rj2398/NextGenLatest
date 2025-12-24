import {AppRegistry} from 'react-native';
import App from './src/App';
import {ToastProvider} from 'react-native-toast-notifications';
import {name as appName} from './app.json';

//

//

const AppWithToastProvider = () => (
  <ToastProvider
    normalColor="gray"
    successColor="#4BB543"
    dangerColor="#F95F62"
    warningColor="orange">
    <App />
  </ToastProvider>
);
AppRegistry.registerComponent(appName, () => AppWithToastProvider);
