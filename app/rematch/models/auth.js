import AsyncStorage from '@react-native-community/async-storage';

getToken = async () => {
    try {
        return await AsyncStorage.getItem('@app_token');
    } catch (e) {
        console.log(`AsyncStorage error : ${e}`);
    }
}

export default {
    state: {
        isAuthenticated: false
    },
    reducers: {
        changeStatus: (state) => {
            return {
                ...state,
                isAuthenticated: !state.isAuthenticated
            }
        },
    },
    effects: {
        async checkTokenAsync() {
            let token = await getToken();
            token === null && this.changeStatus();
        }
    }
}