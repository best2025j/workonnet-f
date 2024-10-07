import { STORAGE_LOGGED_IN_USER_DETAILS_KEY } from '~/utils/common';
import { skipHydrate } from 'pinia';
import { storageSerializer } from '~/composables';
import type {
  IRecruiterDetails,
  ISettingsDetails,
  IWorkExperience,
} from '~/types';

export const UserStore = defineStore('user-store', () => {
  const loggedInUserDetails = ref(
    useLocalStorage(STORAGE_LOGGED_IN_USER_DETAILS_KEY, null, storageSerializer)
  );

  const userSettings = ref<ISettingsDetails | null>(null);

  const recruiters = ref<IRecruiterDetails[] | []>([]);

  const workExperience = ref<IWorkExperience[] | []>([]);

  function setUserDetails(userDetails: any) {
    loggedInUserDetails.value = userDetails;
  }

  function setRecruiters(recruitersData: IRecruiterDetails[]) {
    recruiters.value = recruitersData;
  }

  function setWorkExperience(workExps: IWorkExperience[]) {
    workExperience.value = workExps;
  }

  function setUserSettings(userDetails: ISettingsDetails) {
    userSettings.value = userDetails;
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

  async function refreshAuthRecruiterSettings(token: string) {
    try {
      const response = await $fetch('/api/settings/recruiter/fetch', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return await Promise.resolve(response);
    } catch (error) {
      return await Promise.reject(error);
    }
  }

  async function refreshAuthUserSettings(token: string) {
    try {
      const response = await $fetch('/api/settings/jobseeker/fetch', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return await Promise.resolve(response);
    } catch (error) {
      return await Promise.reject(error);
    }
  }

  async function updateRecruiterSettings(
    token: string,
    data: Partial<ISettingsDetails>,
    settingsId: string
  ) {
    try {
      const response = await $fetch('/api/settings/recruiter/update', {
        method: 'PATCH',
        body: data,
        query: {
          settingsId,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return await Promise.resolve(response);
    } catch (error) {
      return await Promise.reject(error);
    }
  }

  async function updateUserSettings(
    token: string,
    data: Partial<ISettingsDetails>,
    settingsId: string
  ) {
    try {
      const response = await $fetch('/api/settings/jobseeker/update', {
        method: 'PATCH',
        body: data,
        query: {
          settingsId,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return await Promise.resolve(response);
    } catch (error) {
      return await Promise.reject(error);
    }
  }

  async function refreshUserWorkExperience(token: string) {
    try {
      const response = await $fetch('/api/jobseeker/work-experience/fetch', {
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
    userSettings: skipHydrate(userSettings),
    recruiters: skipHydrate(recruiters),
    workExperience: skipHydrate(workExperience),
    setUserDetails,
    setUserSettings,
    clearUserStore,
    setRecruiters,
    setWorkExperience,
    $api: {
      updateRecruiterSettings,
      updateUserSettings,
      refreshAuthUserSettings,
      refreshAuthUserProfile,
      refreshAuthRecruiterProfile,
      refreshAuthRecruiterSettings,
      refreshUserWorkExperience,
    },
  };
});
