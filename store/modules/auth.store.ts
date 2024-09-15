import {
  STORAGE_AUTHENTICATED,
  STORAGE_CURRENT_PHONE,
  STORAGE_USER_TOKEN,
  STORAGE_TOKEN_KEY,
  STORAGE_LOGGED_IN_USER_KEY,
  LOGGED_USER,
} from '~/utils/common';
import { type IPhoneNumberField, type IUserAuthData } from '~/types';
import { skipHydrate } from 'pinia';
import { storageSerializer } from '~/composables';
import { useAxiosInstance } from '~~/http/http.request';

interface IAuthState {
  userType: LOGGED_USER;
  loggedInUser: IUserAuthData | null;
  isAuthenticated: boolean;
  userToken: string | null;
}
// const getIsAuthenticated = getItem(STORAGE_TOKEN_KEY) != null ? true : false;
// const userToken = getItem(STORAGE_TOKEN_KEY);
// const loggedInUser: IUserAuthData | null = getItem(STORAGE_LOGGED_IN_USER_KEY);

export const AuthStore = defineStore('auth-store', () => {
  const currentUserType = ref(
    useLocalStorage(
      STORAGE_CURRENT_USER_TYPE,
      LOGGED_USER.GUEST,
      storageSerializer
    )
  );
  const loggedInUser = ref(
    useLocalStorage(STORAGE_LOGGED_IN_USER_KEY, null, storageSerializer)
  );
  const isAuthenticated = ref(
    useLocalStorage(STORAGE_CURRENT_PHONE, false, storageSerializer)
  );
  const currentAuthPhone = ref(
    useLocalStorage(STORAGE_CURRENT_PHONE, null, storageSerializer)
  );
  const userToken = ref(
    useLocalStorage(STORAGE_USER_TOKEN, null, storageSerializer)
  );

  function changeUserType(userType: string) {
    currentUserType.value = userType;
  }

  function setUserToken(token: string) {
    userToken.value = token;
    isAuthenticated.value = true;
  }

  function setUserAuthData(authData: IUserAuthData) {
    loggedInUser.value = authData;
  }

  function logoutUser() {
    currentUserType.value = LOGGED_USER.GUEST;
    loggedInUser.value = null;
    isAuthenticated.value = null;
    currentAuthPhone.value = null;
    userToken.value = null;

    // localStorage.clear();
  }

  async function loginOrSignupUser(
    phoneNumber: IPhoneNumberField,
    username?: string | null
  ) {
    try {
      const response = await useAxiosInstance().post('auth/user/get-code', {
        phoneNumber,
        username,
      });
      return await Promise.resolve(response);
    } catch (error) {
      return await Promise.reject(error);
    }
  }

  async function verifyAuthCode(phoneNumber: string, code: number | string) {
    try {
      const response = await useAxiosInstance().post('auth/user/verify-code', {
        phoneNumber,
        code,
      });
      return await Promise.resolve(response);
    } catch (error) {
      return await Promise.reject(error);
    }
  }

  return {
    currentUserType: skipHydrate(currentUserType),
    loggedInUser: skipHydrate(loggedInUser),
    isAuthenticated: skipHydrate(isAuthenticated),
    currentAuthPhone: skipHydrate(currentAuthPhone),
    userToken: skipHydrate(userToken),
    changeUserType,
    setUserToken,
    setUserAuthData,
    logoutUser,
    $api: { loginOrSignupUser, verifyAuthCode },
  };
});
