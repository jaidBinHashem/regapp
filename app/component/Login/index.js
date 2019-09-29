import React, { Fragment, useEffect, useRef } from "react";
import { TouchableOpacity, StatusBar, Image, Text, View, KeyboardAvoidingView, TextInput, ScrollView } from 'react-native';
import Swiper from 'react-native-swiper';
import MobileNumber from './MobileNumber';
import Otp from './Otp';
import styles from './styles';
import { useSelector, useDispatch } from "react-redux";

const Login = props => {
    const otpSent = useSelector(state => state.auth.otpSent);
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    useEffect(() => {
        !isAuthenticated && otpSent && this.scroll.scrollBy(1);
        isAuthenticated && props.navigation.navigate('AppStack');
    }, [otpSent, isAuthenticated]);

    return (
        <Swiper
            ref={node => (this.scroll = node)}
            showsButtons={false}
            showsPagination={false}
            loop={false}
            scrollEnabled={false}
        >
            <MobileNumber />
            <Otp />
        </Swiper>
    )
}

export default Login;