import { STORAGE_LOGGED_IN_USER_DETAILS_KEY } from '~/utils/common';
import { skipHydrate } from 'pinia';
import { storageSerializer } from '~~/composables';
import type { IUserDetails } from '~/types';
import { useAxiosInstance } from '~~/http/http.request';

export const UserStore = defineStore('user-store', () => {
  const loggedInUserDetails = ref(
    useLocalStorage(STORAGE_LOGGED_IN_USER_DETAILS_KEY, null, storageSerializer)
  );

  function setUserDetails(userDetails: IUserDetails) {
    loggedInUserDetails.value = userDetails;
  }

  function clearUserStore() {
    loggedInUserDetails.value = null;
  }

  async function refreshAuthUserProfile(token: string) {
    try {
      const response = await useAxiosInstance().get('users/my-profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return await Promise.resolve(response);
    } catch (error) {
      return await Promise.reject(error);
    }
  }

  async function setUserAccountType(data: Record<string, any>, token: string) {
    try {
      const response = await useAxiosInstance().post(
        'users/set-account-type',
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return await Promise.resolve(response);
    } catch (error) {
      return await Promise.reject(error);
    }
  }

  async function updateUserProfile(data: FormData, token: string) {
    try {
      const response = await useAxiosInstance().put(
        'users/update-profile',
        data,
        {
          headers: {
            // 'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return await Promise.resolve(response);
    } catch (error) {
      return await Promise.reject(error);
    }
  }

  return {
    loggedInUserDetails: skipHydrate(loggedInUserDetails),
    setUserDetails,
    clearUserStore,
    $api: { refreshAuthUserProfile, setUserAccountType, updateUserProfile },
  };
});
