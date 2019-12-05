/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import AppNavigator from './app/routes';
import store from './app/rematch'


const App = () => {

  useEffect(() => {
    SplashScreen.hide();
  },[])

  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
};

export default App;
