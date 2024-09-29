<script setup lang="ts">
import type { ApiSuccessResponse } from '~/types';

const authStore = useAuthStore();
const userStore = useUserStore();

const getUserProfile = async () => {
  try {
    const token = authStore.userToken;
    const resp = await userStore.$api.refreshAuthUserProfile(token);
    const responseData = resp as ApiSuccessResponse;
    userStore.setUserDetails(responseData.data);
  } catch (e) {
    console.log(e);
  }
};

const getRecruiterProfile = async () => {
  try {
    const token = authStore.userToken;
    const resp = await userStore.$api.refreshAuthRecruiterProfile(token);
    const responseData = resp as ApiSuccessResponse;
    userStore.setUserDetails(responseData.data);
  } catch (e) {
    console.log(e);
  }
};

onMounted(async () => {
  if (userStore.loggedInUserDetails === null) {
    if (authStore.currentUserType === LOGGED_IN_USER.JOBSEEKER) {
      await getUserProfile();
    } else if (authStore.currentUserType === LOGGED_IN_USER.RECRUITER) {
      await getRecruiterProfile();
    }
  }
});
</script>

<template>
  <div class="flex w-full">
    <!-- Side Navigation -->
    <div class="w-[250px] h-full flex-none hidden md:block">
      <LayoutSideNav />
    </div>

    <!-- Main Content Area -->
    <div class="w-full h-full bg-black-50">
      <LayoutHeader class="px-4 h-full" />
      <main class="md:pl-4 px-4 md:px-0 md:pr-8 py-4">
        <slot />
      </main>
    </div>
  </div>
</template>
