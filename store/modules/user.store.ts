import { STORAGE_LOGGED_IN_USER_DETAILS_KEY } from '~/utils/common';
import { skipHydrate } from 'pinia';
import { storageSerializer } from '~/composables';

export const UserStore = defineStore('user-store', () => {
  const loggedInUserDetails = ref(
    useLocalStorage(STORAGE_LOGGED_IN_USER_DETAILS_KEY, null, storageSerializer)
  );

  function setUserDetails(userDetails: any) {
    loggedInUserDetails.value = userDetails;
  }

  function clearUserStore() {
    loggedInUserDetails.value = null;
  }

  async function refreshAuthUserProfile(token: string) {
    try {
      const response = await $fetch('/api/jobseeker/my-profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return await Promise.resolve(response);
    } catch (error) {
      return await Promise.reject(error);
    }
  }

  async function refreshAuthRecruiterProfile(token: string) {
    try {
      const response = await $fetch('/api/recruiter/my-profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return await Promise.resolve(response);
    } catch (error) {
      return await Promise.reject(error);
    }
  }

  return {
    loggedInUserDetails: skipHydrate(loggedInUserDetails),
    setUserDetails,
    clearUserStore,
    $api: { refreshAuthUserProfile, refreshAuthRecruiterProfile },
  };
});
