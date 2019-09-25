import React, { Fragment, useEffect, useRef } from "react";
import { Dimensions, StatusBar, Image } from 'react-native';
import { useSelector, useDispatch } from "react-redux";

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const SplashScreen = props => {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const isAuthenticatedRef = useRef(isAuthenticated);
    isAuthenticatedRef.current = isAuthenticated;
    console.log(isAuthenticated, "now");

    // component did mount
    useEffect(() => {
        dispatch({ type: 'auth/checkTokenAsync' });
        const timer = setTimeout(() => {
            console.log('This will run after 1 second!', isAuthenticatedRef.current)
        }, 5000);
        return () => clearTimeout(timer);
    }, []);

    // component will receive props / props updated
    useEffect(() => {
        console.log('props changed');
    }, [isAuthenticated]);

    //Hooks cmponent will unmount
    // useEffect(() => {
    //     return () => console.log('I am unmounting');
    // }, [])

    return (
        <Fragment>
            <StatusBar backgroundColor="#1da326" barStyle="light-content" translucent={false} />
            <Image source={require('../assets/SplashScreen.jpg')} style={{ height: height, width: width, resizeMode: 'cover' }} />
        </Fragment>
    )
}

export default SplashScreen;