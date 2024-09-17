<script setup lang="ts">
import { ref } from "vue";

// State to track whether the mobile side nav is open
const isSideNavOpen = ref(false);

// Function to toggle the side nav
const toggleSideNav = () => {
  isSideNavOpen.value = !isSideNavOpen.value;
};
</script>

<template>
  <!-- Navbar -->
  <div class="pb-4">
    <nav
      class="flex justify-between w-full left-0 items-center px-6 h-16 text-xs fixed top-0 z-50"
      :class="[
        $route.path === '/'
          ? 'bg-[#00000066] backdrop-blur-sm shadow-md'
          : 'text-black-300',
      ]"
    >
      <div>
        <img src="/assets/images/logo3.png" alt="Logo" class="" />
      </div>

      <!-- Desktop Nav Links -->
      <ul class="md:flex space-x-8 text-black-50 hidden">
        <LandingPageNavbarLinks />
      </ul>

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

      <!-- Desktop Buttons (Register/Login) -->
      <div class="space-x-4 md:block hidden">
        <button
          class="text-white py-2 px-4 rounded-8 shadow shadow-black-900 bg-primary-1"
        >
          Register
        </button>
        <button
          class="bg-gray-200 text-primary-1 py-2 px-4 rounded-8 hover:bg-gray-300"
        >
          Login
        </button>
      </div>
    </nav>
  </div>

  <!-- Mobile Side Nav -->
  <div
    v-if="isSideNavOpen"
    class="fixed inset-0 md:hidden shadow-md shadow-black-950 z-40 flex w-52 rounded-r-[20px] flex-col pt-20 space-y-10 px-6 h-full justify-start"
  >
    <!-- <button
      @click="toggleSideNav"
      class="self-end relative -top-16 ml-6 p-2 bg-white text-black-50 rounded-full"
    >
      Close
    </button> -->

    <!-- Nav Links for Mobile -->
    <ul class="flex flex-col space-y-4 text-black-50">
      <LandingPageNavbarLinks />
      <!-- side nav buttons -->
      <button
        class="text-white py-2 px-4 rounded-8 shadow shadow-black-900 bg-primary-1"
      >
        Register
      </button>
      <button
        class="bg-gray-200 text-primary-1 py-2 px-4 rounded-8 hover:bg-gray-300"
      >
        Login
      </button>
    </ul>
  </div>
</template>

<style scoped>
/* Example styling for the close button (for the side nav) */
button.close {
  background-color: white;
  color: black;
}
</style>
