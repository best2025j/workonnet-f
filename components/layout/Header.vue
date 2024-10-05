<script setup lang="ts">
import type { IUserDetails } from '~/types';

const route = useRoute();

// State to track whether the mobile side nav is open
const isSideNavOpen = ref(false);
const authStore = useAuthStore()
const userStore = useUserStore();


// Function to toggle the side nav
const toggleSideNav = () => {
  isSideNavOpen.value = !isSideNavOpen.value;
};

const userData = computed<IUserDetails>(
  () => userStore.loggedInUserDetails
);


</script>

<template>
  <header
    class="text-black-900 bg-white items-center flex py-4 text-xs sticky top-0 z-10"
  >
    <!-- Mobile Side Nav Toggle Button (Hamburger Icon) -->
    <button @click="toggleSideNav" class="block md:hidden">
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M28 16C28 16.2652 27.8946 16.5196 27.7071 16.7071C27.5196 16.8946 27.2652 17 27 17H5C4.73478 17 4.48043 16.8946 4.29289 16.7071C4.10536 16.5196 4 16.2652 4 16C4 15.7348 4.10536 15.4804 4.29289 15.2929C4.48043 15.1054 4.73478 15 5 15H27C27.2652 15 27.5196 15.1054 27.7071 15.2929C27.8946 15.4804 28 15.7348 28 16ZM5 9H27C27.2652 9 27.5196 8.89464 27.7071 8.70711C27.8946 8.51957 28 8.26522 28 8C28 7.73478 27.8946 7.48043 27.7071 7.29289C27.5196 7.10536 27.2652 7 27 7H5C4.73478 7 4.48043 7.10536 4.29289 7.29289C4.10536 7.48043 4 7.73478 4 8C4 8.26522 4.10536 8.51957 4.29289 8.70711C4.48043 8.89464 4.73478 9 5 9ZM27 23H5C4.73478 23 4.48043 23.1054 4.29289 23.2929C4.10536 23.4804 4 23.7348 4 24C4 24.2652 4.10536 24.5196 4.29289 24.7071C4.48043 24.8946 4.73478 25 5 25H27C27.2652 25 27.5196 24.8946 27.7071 24.7071C27.8946 24.5196 28 24.2652 28 24C28 23.7348 27.8946 23.4804 27.7071 23.2929C27.5196 23.1054 27.2652 23 27 23Z"
          fill="#343330"
        />
      </svg>
    </button>
    
    <div class="w-full flex justify-between items-center pl-2 md:pl-0">
      <h1 class="md:text-3xl text-xl text-primary-1 font-black font-[Georgia]">
        {{ route?.meta?.title }}
      </h1>
      <!--  -->
      
      <div class="flex items-center justify-center space-x-7">
        <div class="hidden md:block" v-if="route.path !== '/dashboard/recruiter' && authStore.currentUserType === LOGGED_IN_USER.RECRUITER">
        <NuxtLink to="/dashboard/recruiter/job/create">
          <button
            class="px-4 py-3 text-xs flex bg-primary-1 gap-x-2 rounded-8 text-white items-center justify-center"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.5 8C15.5 8.16576 15.4342 8.32473 15.3169 8.44194C15.1997 8.55915 15.0408 8.625 14.875 8.625H8.625V14.875C8.625 15.0408 8.55915 15.1997 8.44194 15.3169C8.32473 15.4342 8.16576 15.5 8 15.5C7.83424 15.5 7.67527 15.4342 7.55806 15.3169C7.44085 15.1997 7.375 15.0408 7.375 14.875V8.625H1.125C0.95924 8.625 0.800269 8.55915 0.683058 8.44194C0.565848 8.32473 0.5 8.16576 0.5 8C0.5 7.83424 0.565848 7.67527 0.683058 7.55806C0.800269 7.44085 0.95924 7.375 1.125 7.375H7.375V1.125C7.375 0.95924 7.44085 0.800269 7.55806 0.683058C7.67527 0.565848 7.83424 0.5 8 0.5C8.16576 0.5 8.32473 0.565848 8.44194 0.683058C8.55915 0.800269 8.625 0.95924 8.625 1.125V7.375H14.875C15.0408 7.375 15.1997 7.44085 15.3169 7.55806C15.4342 7.67527 15.5 7.83424 15.5 8Z"
                fill="white"
              />
            </svg>
            Create a job opening
          </button>
        </NuxtLink>
      </div>
        <button
          to="/"
          class="text-black-900 hover:underline flex items-center gap-4 flex-row-reverse"
        >
         <div class="rounded-full border p-0.5 flex items-center justify-center">
          <img
            v-if="userData?.photo === null  || userData?.photo === undefined"
            src="/assets/svgs/avatar-user.svg"
            alt="Profile Picture"
            class="h-8 w-8"
          />

          <img
            v-if="userData?.photo"
            :src="userData?.photo?.url"
            alt="Profile Picture"
            class="h-8 w-8"
          />
         </div>
          <!-- Use the bellIcon component correctly -->
          <IconsBellIcon class="h-6 w-6 inline-block" />
        </button>
      </div>
    </div>

    <div v-if="isSideNavOpen">
      <div
        @click="toggleSideNav"
        class="fixed inset-0 opacity-50 bg-transparent backdrop-blur-sm w-full md:hidden animate__animated animate__fadeInLeft shadow-md z-40 flex items-center rounded-r-[20px] space-y-10 h-full justify-between"
      >
        <LayoutSideNav class="h-full" />
      </div>
    </div>
  </header>
</template>

<style scoped>
/* Add any additional styles for the header here */
</style>
