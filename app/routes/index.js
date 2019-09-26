import { createMaterialTopTabNavigator, TabBarTop, createSwitchNavigator, createStackNavigator, createAppContainer, createDrawerNavigator } from 'react-navigation';
import SplashScreen from './SplashScreen';
import Login from '../component/Login'

const AppNavigator = createAppContainer(createSwitchNavigator(
    {
        SplashScreen,
        Login,
        App: SplashScreen,
    },
    {
        initialRouteName: 'SplashScreen',
        mode: 'modal'
    }
));

export default AppNavigator;