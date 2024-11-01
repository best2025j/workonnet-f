<script setup lang="ts">
import { POSITION, useToast } from 'vue-toastification';
import type { ApiErrorResponse, ApiSuccessResponse } from '~/types';

const router = useRouter();
const route = useRoute();
const toast = useToast();
const isLoading = ref<boolean>(true);
const authStore = useAuthStore();
const userStore = useUserStore();
const isError = ref<boolean>(false);

const config = useRuntimeConfig();

const getUserProfile = async (token: string) => {
  try {
    const resp = await userStore.$api.refreshAuthUserProfile(token);
    const responseData = resp as ApiSuccessResponse;
    userStore.setUserDetails(responseData);
  } catch (e) {
    console.log(e);
  }
};
const getRecruiterProfile = async (token: string) => {
  try {
    const resp = await userStore.$api.refreshAuthRecruiterProfile(token);
    const responseData = resp as ApiSuccessResponse;
    userStore.setUserDetails(responseData);
  } catch (e) {
    console.log(e);
  }
};

const handleLinkedInLogin = async () => {
  const code = route.query.code;
  const redirectBase = config.public.linkedinRedirectBase;
  const redirectUrl = `${redirectBase}auth/linkedin/${route.params.slug}/callback`;

  if (
    code &&
    [LOGGED_IN_USER.JOBSEEKER, LOGGED_IN_USER.RECRUITER].includes(
      route.params.slug as string as LOGGED_IN_USER
    )
  ) {
    try {
      // Send the authorization code to the backend to exchange for an access token
      const response = await $fetch('/api/auth/social/linkedin', {
        method: 'POST',
        body: {
          token: code,
          redirectUrl,
          userType: (route.params.slug as string).toUpperCase(),
        },
      });

      const responseData = response as ApiSuccessResponse;

      if (route.params.slug === LOGGED_IN_USER.JOBSEEKER) {
        authStore.setCurrentUserType(LOGGED_IN_USER.JOBSEEKER);
        authStore.setUserAuthData({
          accountType: LOGGED_IN_USER.JOBSEEKER,
          userId: responseData.data.userId,
        });
        authStore.setUserToken(responseData.data.accessToken);

        await getUserProfile(responseData.data.accessToken);
        setTimeout(() => {
          isLoading.value = false;
          router.push('/dashboard/jobseeker');
        }, 1500);
      } else if (route.params.slug === LOGGED_IN_USER.RECRUITER) {
        authStore.setCurrentUserType(LOGGED_IN_USER.RECRUITER);
        authStore.setUserAuthData({
          accountType: LOGGED_IN_USER.RECRUITER,
          recruiterId: responseData.data.recruiterId,
        });
        authStore.setUserToken(responseData.data.accessToken);
        await getRecruiterProfile(responseData.data.accessToken);
        setTimeout(() => {
          isLoading.value = false;
          router.push('/dashboard/recruiter');
        }, 1500);
      }
    } catch (error: any) {
      const errorData = error.data as ApiErrorResponse;
      console.log(error);
      isError.value = true;
      toast.error('An error occurred try again', {
        timeout: 3000,
        position: POSITION.TOP_RIGHT,
      });

      setTimeout(() => {
        isLoading.value = false;
      }, 1500);
    }
  }
};

onMounted(() => {
  handleLinkedInLogin();
});
</script>
<template>
  <div class="md:w-1/2 mx-auto h-full">
    <div
      class="flex flex-col items-center justify-center h-full md:w-[23.375rem] mx-auto mt-10 px-6 md:px-0"
    >
      <span class="mt-8">
        <svg
          width="72"
          height="72"
          viewBox="0 0 72 72"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="72" height="72" rx="36" fill="#FBD0A3" />
          <rect x="12" y="12" width="48" height="48" rx="24" fill="#F3B05F" />
          <path
            d="M41 26H31C28.24 26 26 28.23 26 30.98V36.96V37.96C26 40.71 28.24 42.94 31 42.94H32.5C32.77 42.94 33.13 43.12 33.3 43.34L34.8 45.33C35.46 46.21 36.54 46.21 37.2 45.33L38.7 43.34C38.89 43.09 39.19 42.94 39.5 42.94H41C43.76 42.94 46 40.71 46 37.96V30.98C46 28.23 43.76 26 41 26ZM32 36C31.44 36 31 35.55 31 35C31 34.45 31.45 34 32 34C32.55 34 33 34.45 33 35C33 35.55 32.56 36 32 36ZM36 36C35.44 36 35 35.55 35 35C35 34.45 35.45 34 36 34C36.55 34 37 34.45 37 35C37 35.55 36.56 36 36 36ZM40 36C39.44 36 39 35.55 39 35C39 34.45 39.45 34 40 34C40.55 34 41 34.45 41 35C41 35.55 40.56 36 40 36Z"
            fill="#B7680C"
          />
        </svg>
      </span>
      <h2 v-if="isLoading" class="mt-3 text-xl font-normal font-['Georgia']">
        Authenticating
      </h2>
      <h2 v-else class="mt-3 text-xl font-normal font-['Georgia']">
        Login <span v-if="!isError">Successful</span>
        <span v-else>Failed</span>
      </h2>
      <p v-if="isLoading" class="mb-20 font-['Nexa']">Loading please wait...</p>
      <p v-else class="mb-20 font-['Nexa']">Redirecting...</p>
      <NuxtLink
        v-if="isError"
        :to="`/auth/signin/${route.params.slug}`"
        class="font-black text-white w-full py-3.5 rounded-xl text-sm bg-[#FE8900] items-center text-center"
        >Go Back</NuxtLink
      >
    </div>
  </div>
</template>
