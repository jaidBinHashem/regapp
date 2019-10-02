import { createMaterialTopTabNavigator, TabBarTop, createSwitchNavigator, createAppContainer, createDrawerNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { fromRight } from 'react-navigation-transitions';
import SplashScreen from './SplashScreen';
import Login from '../component/Login';
import Dashboard from '../component/Dashboard';
import AddFarmer from '../component/AddFarmer';


const AppStack = createStackNavigator(
    {
        Dashboard,
        AddFarmer
    },
    {
        initialRouteName: 'Dashboard',
        cardStyle: {
            backgroundColor: '#EAE9EF'
        },
        transitionConfig: () => fromRight(),
    }
);


const AppNavigator = createAppContainer(createSwitchNavigator(
    {
        SplashScreen,
        Login,
        AppStack,
    },
    {
        initialRouteName: 'SplashScreen',
        mode: 'modal',
    }
));

export default AppNavigator;