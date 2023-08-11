/**
 * @format
 */

import { AppRegistry, LogBox } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import './src/helpers/axios';

LogBox.ignoreLogs(['ReactImageView: Image source "null" doesn\'t exist']); // Ignore log notification by message

AppRegistry.registerComponent(appName, () => App);
