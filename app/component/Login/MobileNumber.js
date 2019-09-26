import React, { Fragment, useState, useEffect, useRef } from "react";
import { TouchableOpacity, StatusBar, Image, Text, View, KeyboardAvoidingView, Linking, ScrollView, Alert } from 'react-native';
import { Input } from 'react-native-elements';
import AppLink from 'react-native-app-link';
import BusyIndicator from 'react-native-busy-indicator';
import styles from './styles';
import { useSelector, useDispatch } from "react-redux";

const mobileNoRegx = new RegExp("^01([3-9])\\d{8}$");

const MobileNumber = props => {
    const dispatch = useDispatch();
    const userNotFound = useSelector(state => state.auth.userNotFound);
    const [mobileNumber, setMobileNumber] = useState("01621370573");
    const [mobileNumberError, setMobileNumberError] = useState("");


    useEffect(() => {
        userNotFound && setMobileNumberError("You are not a registered user");
        userNotFound && openFosholiApp();
    }, [userNotFound]);

    openFosholiApp = () => {
        Alert.alert(
            '',
            'Please register on Fosholi first !',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Open Fosholi',
                    onPress: () => { AppLink.maybeOpenURL('fosholi://dashboard', { 'appName': 'ফসলি', 'appStoreId': '', 'appStoreLocale': '', 'playStoreId': 'com.aci.idss' }) }
                },
            ],
            { cancelable: true },
        );
    }

    submitMobileNumber = () => {
        if (mobileNoRegx.test(mobileNumber)) {
            setMobileNumberError("");
            dispatch({ type: 'auth/makeOtpRequestAsync', payload: mobileNumber })
        } else {
            setMobileNumberError("একটি সঠিক মোবাইল নম্বর লিখুন");
        }
    }

    return (
        <Fragment>
            <StatusBar backgroundColor="#1da326" barStyle="light-content" translucent={false} />
            <ScrollView keyboardShouldPersistTaps="always">
                <KeyboardAvoidingView enabled style={styles.container} >
                    <Image style={styles.smsIcon} source={require('../../assets/sms.png')} />
                    <Text style={styles.smsText}>এসএমএস-এর মাধ্যমে লগইন করুন</Text>
                    <Text style={styles.smsDescription}>আপনার মোবাইল নম্বর নিচের ঘরে লিখে সাবমিট করুন। অল্প কিছুক্ষণের মধ্যে আপনার মোবাইলে একটি এসএমএস আসবে, যেখানে আপনার লগইন এর জন্য একটি ওয়ান টাইম পাসওয়ার্ড (ও.টি.পি) থাকবে।</Text>
                    <Input
                        label="মোবাইল নাম্বার"
                        labelStyle={styles.mobileNumberTitle}
                        inputContainerStyle={styles.mobileNumberTextInputContainer}
                        placeholder="মোবাইল নাম্বার (01x xxxx xxxx)"
                        errorStyle={{ color: 'red' }}
                        errorMessage={mobileNumberError}
                        onChangeText={(mobileNumber) => setMobileNumber(mobileNumber)}
                        value={mobileNumber}
                    />
                    <View style={{ marginHorizontal: 8 }}>
                        <TouchableOpacity style={styles.submitContainer}
                            onPress={() => submitMobileNumber()}>
                            <Text style={styles.submitText}>সাবমিট করুন</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
            <BusyIndicator />
        </Fragment>
    )
}

export default MobileNumber;