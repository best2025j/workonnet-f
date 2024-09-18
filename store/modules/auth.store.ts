import {
  STORAGE_CURRENT_PHONE,
  STORAGE_USER_TOKEN,
  STORAGE_LOGGED_IN_USER_KEY,
  LOGGED_IN_USER,
} from '~/utils/common';
import { type IPhoneNumberField, type IUserAuthData } from '~/types';
import { skipHydrate } from 'pinia';
import { storageSerializer } from '~/composables';

interface IAuthState {
  userType: LOGGED_IN_USER;
  loggedInUser: IUserAuthData | null;
  isAuthenticated: boolean;
  userToken: string | null;
}

interface IStepOneRecruiterForm {
  email: string;
  fullName: string;
  password: string;
  companySize: string;
  companyName: string;
  industry: string;
  websiteUrl: string;
}
// const getIsAuthenticated = getItem(STORAGE_TOKEN_KEY) != null ? true : false;
// const userToken = getItem(STORAGE_TOKEN_KEY);
// const loggedInUser: IUserAuthData | null = getItem(STORAGE_LOGGED_IN_USER_KEY);

export const AuthStore = defineStore('auth-store', () => {
  const currentUserType = ref(
    useLocalStorage(
      STORAGE_CURRENT_USER_TYPE,
      LOGGED_IN_USER.GUEST,
      storageSerializer
    )
  );
  const loggedInUser = ref(
    useLocalStorage(STORAGE_LOGGED_IN_USER_KEY, null, storageSerializer)
  );
  const isAuthenticated = ref(
    useLocalStorage(STORAGE_CURRENT_PHONE, false, storageSerializer)
  );

  const userToken = ref(
    useLocalStorage(STORAGE_USER_TOKEN, null, storageSerializer)
  );

  const publicToken = ref(
    useLocalStorage(STORAGE_USER_PUBLIC_TOKEN, null, storageSerializer)
  );

  const stepOneRecruiterForm = ref(
    useLocalStorage('regData', null, storageSerializer)
  );

  function setStepOneFormData(data: IStepOneRecruiterForm | null) {
    stepOneRecruiterForm.value = data;
  }

  function setCurrentUserType(userType: LOGGED_IN_USER) {
    currentUserType.value = userType;
  }

  function setUserToken(token: string) {
    userToken.value = token;
    isAuthenticated.value = true;
  }

  function setLoginSecret(token: string | null) {
    publicToken.value = token;
  }

  function setUserAuthData(authData: IUserAuthData) {
    loggedInUser.value = authData;
  }

  function logoutUser() {
    currentUserType.value = LOGGED_IN_USER.GUEST;
    loggedInUser.value = null;
    isAuthenticated.value = null;
    userToken.value = null;
    publicToken.value = null;
  }

  return {
    currentUserType: skipHydrate(currentUserType),
    loggedInUser: skipHydrate(loggedInUser),
    isAuthenticated: skipHydrate(isAuthenticated),
    userToken: skipHydrate(userToken),
    publicToken: skipHydrate(publicToken),
    stepOneRecruiterForm: skipHydrate(stepOneRecruiterForm),
    setCurrentUserType,
    setUserToken,
    setUserAuthData,
    logoutUser,
    setLoginSecret,
    setStepOneFormData,
    // $api: { loginOrSignupUser, verifyAuthCode },
  };
});
