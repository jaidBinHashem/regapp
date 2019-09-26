import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

import { BASE_URL } from './URL'
import loaderHandler from 'react-native-busy-indicator/LoaderHandler';


const checkStatus = (response) => {
    // console.log(response, "all res");
    if (response.status >= 200 && response.status < 300) {
        return response;
    }
    else if (response.status >= 400 && response.status < 500) {
        let errorObject = {
            ERROR_CODE: ERROR_CODE_VALUE,
            ERROR_BODY: response
        }
        throw errorObject;
    } else {
        let errorObject = {
            ERROR_CODE: SERVER_ERROR_CODE_VALUE,
            ERROR_BODY: response
        }
        throw errorObject;
    }
}


export const getService = async (request) => {
    // console.log(request, "get request");
    try {
        // request.showLoader && loaderHandler.showLoader("Loading");

        let requestHeaders = {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        };

        // if (request.authenticate) {
        //     let accessToken = await AsyncStorage.getItem("USER_TOKEN");
        //     requestHeaders.authorization = 'Bearer ' + accessToken;
        // }
        let response = await axios({
            method: 'get',
            url: 'https://dog.ceo/api/breeds/image/random',
        });

        if (response.status >= 200 && response.status < 300) return { success: true, data: response };
    }
    catch (err) {
        // response = await err.ERROR_BODY.json();
        console.log(err, "JSON Error in get service");
        // request.showLoader && loaderHandler.hideLoader();
        // return { success: false, data: response, errorCode: err.ERROR_BODY.status }
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