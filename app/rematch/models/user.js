import AsyncStorage from '@react-native-community/async-storage';
import { USER } from '../../util/app_constants';
import { getService, postService } from '../../network';


getUserFromStorage = async () => {
  try {
    return await AsyncStorage.getItem(USER);
  } catch (e) {
    console.log(`AsyncStorage error : ${e}`);
  }
}

setUser = async (user) => {
  try {
    return await AsyncStorage.setItem(USER, JSON.stringify(user))
  } catch (e) {
    console.log(`AsyncStorage error : ${e}`);
  }
}

getUserFromApi = async () => {
  try {
    let request = {
      endPoint: '/auth/users/me',
      authenticate: true,
      showLoader: true,
    }
    let response = await getService(request);
    response.success && await setUser(response.data.data.data.user);
    return response;
  } catch (e) {
    console.log(`AsyncStorage error : ${e}`);
  }
}

getUserRanking = async () => {
  try {
    let request = {
      endPoint: '/api/v3/auth/farmer/referral/points',
      authenticate: true,
      showLoader: true,
    }
    return await getService(request);
  } catch (e) {
    console.log(`AsyncStorage error : ${e}`);
  }
}



export default {
  state: {
    userState: null,
    userRanking: null
  },
  reducers: {
    setUserState: (state, payload) => {
      return {
        ...state,
        userState: payload
      }
    },
    setUserRanking: (state, payload) => {
      return {
        ...state,
        userRanking: payload
      }
    }
  },
  effects: (dispatch) => ({
    async getUserAsync(payload) {
      if (payload) {
        let user = await getUserFromStorage();

        if (user) {
          this.setUserState(JSON.parse(user));
        } else {
          let response = await getUserFromApi();
          this.setUserState(JSON.parse(response.data.data.data.user));
        }
      } else {
        let response = await getUserFromApi();
        this.setUserState(response.data.data.data.user);
      }
    },
    async getUserRankingAsync() {
      let response = await getUserRanking();
      response.success && this.setUserRanking(response.data.data.points)
    }
  })
}