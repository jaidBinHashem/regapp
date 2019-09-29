import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

import { BASE_URL } from './URL'
import loaderHandler from 'react-native-busy-indicator/LoaderHandler';

export const getService = async (request) => {
    // console.log(request, "get request");
    try {
        request.showLoader && loaderHandler.showLoader("Loading");
        let requestHeaders = {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        };

        if (request.authenticate) {
            let accessToken = await AsyncStorage.getItem("@app_token");
            requestHeaders.authorization = 'Bearer ' + accessToken;
        }
        let response = await axios({
            method: 'get',
            url: BASE_URL + request.endPoint,
            headers: requestHeaders,
        });

        request.showLoader && loaderHandler.hideLoader();
        return { success: true, data: response };
    }
    catch (error) {
        if (error.response) {
            request.showLoader && loaderHandler.hideLoader();
            return { success: false, data: error.response.data }
        }
    }
}


export const postService = async (request) => {
    try {
        request.showLoader && loaderHandler.showLoader("Loading");
        let requestHeaders = {
            'Content-Type': request.contentType ? request.contentType : 'application/json',
            'Accept': 'application/json'
        };
        if (request.authenticate) {
            let accessToken = await AsyncStorage.getItem("@app_token");
            requestHeaders.authorization = 'Bearer ' + accessToken;
        }
        let response = await axios({
            method: 'post',
            url: BASE_URL + request.endPoint,
            headers: requestHeaders,
            data: request.params
        });
        request.showLoader && loaderHandler.hideLoader();
        return { success: true, data: response };
    }
    catch (error) {
        if (error.response) {
            request.showLoader && loaderHandler.hideLoader();
            return { success: false, data: error.response.data }
        }
    }
}