import React, { Fragment, useState, useEffect, useRef } from "react";
import { TouchableOpacity, StatusBar, Image, Text, View, KeyboardAvoidingView, TextInput, ScrollView } from 'react-native';
import BusyIndicator from 'react-native-busy-indicator';
import OtpInputs from 'react-native-otp-inputs'
import styles from './styles';
import { useSelector, useDispatch } from "react-redux";

const Otp = props => {
    const dispatch = useDispatch();
    const otpErrorState = useSelector(state => state.auth.otpError);
    const [otp, setOtp] = useState("");
    const [otpError, setOtpError] = useState(" ");


    useEffect(() => {
        otpErrorState && setOtpError("আপনার মোবাইলে পাঠানো পিন নম্বর-টি লিখুন");
    }, [otpErrorState]);

    submitOtp = () => {
        if (otp.length === 4) {
            !otpErrorState && setOtpError(" ");
            dispatch({ type: 'auth/getTokenAsync', payload: otp })
        } else {
            setOtpError("আপনার মোবাইলে পাঠানো পিন নম্বর-টি লিখুন");
        }
    }
    return (
        <Fragment>
            <StatusBar backgroundColor="#1da326" barStyle="light-content" translucent={false} />
            <ScrollView>
                <KeyboardAvoidingView enabled style={styles.container} >
                    <Image style={styles.smsIcon} source={require('../../assets/sms.png')} />
                    <Text style={styles.smsText}>আপনার মোবাইল এ এসএমএস দেখুন</Text>
                    <Text style={styles.smsDescription}>আপনার মোবাইলে চার সংখ্যার একটি পাসওয়ার্ড পাঠানো  হয়েছে। পাসওয়ার্ডটি নিচের ফাঁকা ঘরে লিখুন।</Text>
                    <Text style={[styles.mobileNumberTitle, { marginLeft: 5 }]}>ওয়ান টাইম পাসওয়ার্ড (ও.টি.পি.) দিন</Text>
                    <OtpInputs
                        handleChange={otp => setOtp(otp)}
                        numberOfInputs={4}
                        inputStyles={{ borderColor: '#9e9e9e', borderWidth: 3 }}
                        clearTextOnFocus={true}
                        errorMessage={otpError}
                        errorMessageTextStyles={{ fontSize: 20, color: 'red', textAlign: "center" }}
                    />
                    <Text style={styles.resendSmsText}>এসএমএস পাইনি, আবার পাঠান।</Text>
                    <TouchableOpacity style={styles.submitContainer}
                        onPress={() => submitOtp()}>
                        <Text style={styles.submitText}>সাবমিট করুন</Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </ScrollView>
            <BusyIndicator />
        </Fragment>
    );
}

export default Otp;