/**
 * @format
 */

import { AppRegistry, YellowBox } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

YellowBox.ignoreWarnings(['componentWillReceiveProps', 'Failed child context type: Invalid']);
AppRegistry.registerComponent(appName, () => App);
