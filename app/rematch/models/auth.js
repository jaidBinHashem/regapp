import AsyncStorage from '@react-native-community/async-storage';
import { APP_TOKEN } from '../../util/app_constants';
import { postService } from '../../network';

getToken = async () => {
    try {
        return await AsyncStorage.getItem(APP_TOKEN);
    } catch (e) {
        console.log(`AsyncStorage error : ${e}`);
    }
}

setToken = async (token) => {
    try {
        return await AsyncStorage.setItem(APP_TOKEN, token)
    } catch (e) {
        console.log(`AsyncStorage error : ${e}`);
    }
}

export default {
    state: {
        isAuthenticated: false,
        otpSent: false,
        sessionId: null,
        mobileNumber: '',
        userNotFound: false,
        otpError: false
    },
    reducers: {
        changeStatus: (state) => {
            return {
                ...state,
                isAuthenticated: true,
                otpSent: false,
                sessionId: null,
                mobileNumber: '',
                userNotFound: false,
                otpError: false
            }
        },
        otpSent: (state, payload) => {
            return {
                ...state,
                otpSent: true,
                mobileNumber: payload.mobile_no,
                sessionId: payload.session_id
            }
        },
        userNotFound: (state) => {
            return {
                ...state,
                userNotFound: true,
            }
        },
        resetUserNotFound: (state) => {
            return {
                ...state,
                userNotFound: false,
            }

        },
        otpError: (state) => {
            return {
                ...state,
                otpError: true
            }
        }
    },
    effects: (dispatch) => ({
        async checkTokenAsync() {
            let token = await getToken();
            token && (dispatch.user.getUserAsync(true), this.changeStatus());
        },
        async makeOtpRequestAsync(payload) {
            this.resetUserNotFound();
            let request = {
                endPoint: '/auth/public/otp',
                showLoader: true,
                params: {
                    "mobile_no": payload,
                    "check_user_exist": true,
                }
            }
            let response = await postService(request);
            response.success ? this.otpSent(response.data.data.data) : this.userNotFound();
        },
        async getTokenAsync(payload, state) {
            let request = {
                endPoint: '/auth/public/otp/access/token',
                showLoader: true,
                params: {
                    "mobile_no": state.auth.mobileNumber,
                    "session_id": state.auth.sessionId,
                    "code": payload
                }
            }
            let response = await postService(request);
            response.success ? this.setTokenAsync(response.data.data.access_token) : this.otpError();
        },
        async setTokenAsync(payload) {
            await setToken(payload);
            dispatch.user.getUserAsync(false);
            this.changeStatus();
        }
    })
}