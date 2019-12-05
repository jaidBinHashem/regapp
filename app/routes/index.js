import React from 'react';
import { createAppContainer } from 'react-navigation';
import createAnimatedSwitchNavigator from 'react-navigation-animated-switch';
import { Transition } from 'react-native-reanimated';
import { createStackNavigator } from 'react-navigation-stack';
import { fromRight } from 'react-navigation-transitions';
import SplashScreen from './SplashScreen';
import Login from '../component/Login';
import Dashboard from '../component/Dashboard';
import AddFarmer from '../component/AddFarmer';
import FarmersList from '../component/FarmersList';


const AppStack = createStackNavigator(
    {
        Dashboard,
        AddFarmer,
        FarmersList
    },
    {
        initialRouteName: 'Dashboard',
        cardStyle: {
            backgroundColor: '#EAE9EF'
        },
        transitionConfig: () => fromRight(),
    }
);


const AppNavigator = createAppContainer(createAnimatedSwitchNavigator(
    {
        SplashScreen,
        Login,
        AppStack,
    },
    {
        initialRouteName: 'Login',
        mode: 'modal',
        transition: (
            <Transition.Together>
                <Transition.Out
                    type="slide-bottom"
                    durationMs={800}
                    interpolation="easeIn"
                />
                <Transition.In type="fade" durationMs={800} />
            </Transition.Together>
        ),
    }
));

export default AppNavigator;