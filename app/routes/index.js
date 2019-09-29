import { createMaterialTopTabNavigator, TabBarTop, createSwitchNavigator, createAppContainer, createDrawerNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import SplashScreen from './SplashScreen';
import Login from '../component/Login';
import Dashboard from '../component/Dashboard';


const AppStack = createStackNavigator(
    {
        Dashboard
    },
    {
        initialRouteName: 'Dashboard',
        headerMode: 'none'
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