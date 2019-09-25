import { createMaterialTopTabNavigator, TabBarTop, createSwitchNavigator, createStackNavigator, createAppContainer, createDrawerNavigator } from 'react-navigation';
import SplashScreen from './SplashScreen';

const AppNavigator = createAppContainer(createSwitchNavigator(
    {
        SplashScreen: SplashScreen,
    },
    {
        initialRouteName: 'SplashScreen',
        mode: 'modal'
    }
));

export default AppNavigator;