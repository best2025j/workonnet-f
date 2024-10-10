<script setup lang="ts">
import type { IUserDetails } from '~/types';

const route = useRoute();

// State to track whether the mobile side nav is open
const isSideNavOpen = ref(false);
const authStore = useAuthStore();
const userStore = useUserStore();

// Function to toggle the side nav
const toggleSideNav = () => {
  isSideNavOpen.value = !isSideNavOpen.value;
};

const showNotifications = ref(false);
const showProfileView = ref(false);

// Toggle notifications visibility
const toggleNotifications = () => {
  showProfileView.value = false;
  showNotifications.value = !showNotifications.value;
};

const toggleProfileView = () => {
  showNotifications.value = false;
  showProfileView.value = !showProfileView.value;
};

// Close notifications
// const closeNotifications = () => {
//   showNotifications.value = false;
// };

const userData = computed<IUserDetails>(() => userStore.loggedInUserDetails);
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
        <div
          class="hidden md:block"
          v-if="
            route.path !== '/dashboard/recruiter' &&
            authStore.currentUserType === LOGGED_IN_USER.RECRUITER
          "
        >
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

        <div
          class="text-black-900 hover:underline flex items-center gap-4 flex-row-reverse"
        >
          <div
            @click="toggleProfileView"
            class="rounded-full border p-0.5 flex items-center justify-center cursor-pointer"
          >
            <img
              v-if="!userData?.photo"
              src="/assets/svgs/avatar-user.svg"
              alt="Profile Picture"
              class="h-8 w-8"
            />

            <img
              v-else
              :src="userData?.photo?.url"
              alt="Profile Picture"
              class="h-8 w-8"
            />
          </div>
          <!-- Use the bellIcon component correctly -->
          <IconsBellIcon
            @click="toggleNotifications"
            aria-label="Notifications"
            class="h-6 w-6 inline-block cursor-pointer"
          />
        </div>
      </div>
    </div>

    <!-- notification section -->
    <div
      v-if="showNotifications"
      class="md:w-[370px] bg-white shadow py-4 px-4 space-y-4 absolute md:right-20 top-12 rounded-[20px]"
    >
      <div class="flex justify-between items-center">
        <h1 class="text-2xl font-black">Notifications</h1>
        <span
          ><svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 15.75C14.0711 15.75 15.75 14.0711 15.75 12C15.75 9.92893 14.0711 8.25 12 8.25C9.92893 8.25 8.25 9.92893 8.25 12C8.25 14.0711 9.92893 15.75 12 15.75Z"
              stroke="#343330"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M3.884 16.6959C3.4696 15.9821 3.15212 15.2163 2.93994 14.4187L4.51307 12.4499C4.49525 12.149 4.49525 11.8472 4.51307 11.5462L2.94088 9.57744C3.1527 8.7797 3.46953 8.01363 3.88307 7.29932L6.38713 7.01807C6.58709 6.79278 6.80028 6.57959 7.02557 6.37963L7.30682 3.8765C8.0201 3.46494 8.78492 3.14999 9.58119 2.93994L11.5499 4.51307C11.8509 4.49525 12.1527 4.49525 12.4537 4.51307L14.4224 2.94088C15.2202 3.1527 15.9863 3.46953 16.7006 3.88307L16.9818 6.38713C17.2071 6.58709 17.4203 6.80028 17.6203 7.02557L20.1234 7.30682C20.5378 8.0206 20.8553 8.78639 21.0674 9.584L19.4943 11.5528C19.5121 11.8537 19.5121 12.1555 19.4943 12.4565L21.0665 14.4253C20.8562 15.2228 20.5409 15.9888 20.129 16.7034L17.6249 16.9846C17.425 17.2099 17.2118 17.4231 16.9865 17.6231L16.7053 20.1262C15.9915 20.5406 15.2257 20.8581 14.4281 21.0703L12.4593 19.4971C12.1583 19.5149 11.8566 19.5149 11.5556 19.4971L9.58682 21.0693C8.78931 20.859 8.02325 20.5437 7.30869 20.1318L7.02744 17.6278C6.80215 17.4278 6.58897 17.2146 6.389 16.9893L3.884 16.6959Z"
              stroke="#343330"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </span>
      </div>

      <div class="border p-3 rounded-8 space-y-4 py-4">
        <div class="flex justify-between">
          <div>
            <span>
              <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="40" height="40" rx="4" fill="#FE8900" />
                <path
                  d="M14.0319 26.3815L13.1459 27.8815C13.0958 27.9663 13.0295 28.0405 12.9508 28.0996C12.872 28.1588 12.7824 28.2019 12.6869 28.2265C12.4942 28.2761 12.2898 28.2471 12.1184 28.1459C11.9471 28.0447 11.823 27.8796 11.7734 27.6869C11.7239 27.4942 11.7529 27.2897 11.8541 27.1184L12.7409 25.6184C12.7898 25.5313 12.8557 25.4548 12.9345 25.3935C13.0134 25.3322 13.1037 25.2872 13.2002 25.2613C13.2966 25.2353 13.3973 25.2289 13.4963 25.2424C13.5953 25.2559 13.6906 25.2891 13.7766 25.3399C13.8626 25.3907 13.9376 25.4582 13.9971 25.5385C14.0567 25.6187 14.0996 25.71 14.1234 25.807C14.1471 25.904 14.1513 26.0048 14.1356 26.1035C14.1199 26.2021 14.0846 26.2967 14.0319 26.3815ZM29.75 22.2499H25.2687L22.3878 17.3749C22.3389 17.2878 22.2731 17.2114 22.1942 17.15C22.1154 17.0887 22.0251 17.0438 21.9286 17.0178C21.8321 16.9919 21.7314 16.9855 21.6324 16.999C21.5335 17.0125 21.4382 17.0456 21.3522 17.0965C21.2662 17.1473 21.1912 17.2148 21.1316 17.295C21.0721 17.3752 21.0292 17.4665 21.0054 17.5636C20.9816 17.6606 20.9774 17.7614 20.9932 17.86C21.0089 17.9587 21.0441 18.0532 21.0969 18.1381L26.8541 27.8815C26.9553 28.0528 27.1204 28.1769 27.3131 28.2265C27.5058 28.2761 27.7103 28.2471 27.8816 28.1459C28.0529 28.0447 28.177 27.8796 28.2266 27.6869C28.2761 27.4942 28.2471 27.2897 28.1459 27.1184L26.1556 23.7499H29.75C29.9489 23.7499 30.1397 23.6709 30.2803 23.5303C30.421 23.3896 30.5 23.1989 30.5 22.9999C30.5 22.801 30.421 22.6103 30.2803 22.4696C30.1397 22.329 29.9489 22.2499 29.75 22.2499ZM21.3566 22.2499H16.4731L22.8959 11.3815C22.9971 11.2102 23.0261 11.0057 22.9766 10.813C22.927 10.6203 22.8029 10.4552 22.6316 10.354C22.4602 10.2528 22.2558 10.2238 22.0631 10.2734C21.8704 10.323 21.7053 10.4471 21.6041 10.6184L20 13.3334L18.3959 10.6146C18.3458 10.5298 18.2795 10.4557 18.2008 10.3965C18.122 10.3373 18.0324 10.2942 17.9369 10.2696C17.7442 10.2201 17.5398 10.2491 17.3684 10.3503C17.1971 10.4514 17.073 10.6166 17.0234 10.8092C16.9739 11.0019 17.0029 11.2064 17.1041 11.3778L19.1291 14.8043L14.7313 22.2499H10.25C10.0511 22.2499 9.86032 22.329 9.71967 22.4696C9.57902 22.6103 9.5 22.801 9.5 22.9999C9.5 23.1989 9.57902 23.3896 9.71967 23.5303C9.86032 23.6709 10.0511 23.7499 10.25 23.7499H21.3566C21.5555 23.7499 21.7462 23.6709 21.8869 23.5303C22.0275 23.3896 22.1066 23.1989 22.1066 22.9999C22.1066 22.801 22.0275 22.6103 21.8869 22.4696C21.7462 22.329 21.5555 22.2499 21.3566 22.2499Z"
                  fill="white"
                />
              </svg>
            </span>
            <!-- <img :src="imageSrc" alt="Notification" width="40" height="40" /> -->
          </div>

          <span
            ><svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18.75 5.25L5.25 18.75"
                stroke="#888888"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M18.75 18.75L5.25 5.25"
                stroke="#888888"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </span>
        </div>

        <div class="space-y-2">
          <h1 class="text-xs font-black">You have a new message</h1>
          <p class="text-xs w-[282px]">
            Lorem ipsum dolor sit amet consectetur. Tempus vitae sit et fusce
            tincidunt pretium donec tristique quisque. Nunc.
          </p>
          <span class="text-xs flex justify-end text-red-50">Just now</span>
        </div>
      </div>
      <!--  -->
      <div class="border p-3 rounded-8 space-y-4 py-4">
        <div class="flex justify-between">
          <div>
            <span
              ><svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="0.5"
                  y="0.5"
                  width="39"
                  height="39"
                  rx="3.5"
                  stroke="#FE8900"
                />
                <path
                  d="M20 10.25C18.0716 10.25 16.1866 10.8218 14.5832 11.8932C12.9798 12.9645 11.7301 14.4873 10.9922 16.2688C10.2542 18.0504 10.0611 20.0108 10.4373 21.9021C10.8136 23.7934 11.7422 25.5307 13.1057 26.8943C14.4693 28.2579 16.2066 29.1865 18.0979 29.5627C19.9892 29.9389 21.9496 29.7458 23.7312 29.0078C25.5127 28.2699 27.0355 27.0202 28.1068 25.4168C29.1782 23.8134 29.75 21.9284 29.75 20C29.7473 17.415 28.7192 14.9366 26.8913 13.1087C25.0634 11.2808 22.585 10.2527 20 10.25ZM20 28.25C18.3683 28.25 16.7733 27.7661 15.4165 26.8596C14.0598 25.9531 13.0024 24.6646 12.378 23.1571C11.7536 21.6496 11.5902 19.9908 11.9085 18.3905C12.2269 16.7902 13.0126 15.3202 14.1664 14.1664C15.3202 13.0126 16.7902 12.2268 18.3905 11.9085C19.9909 11.5902 21.6497 11.7536 23.1571 12.378C24.6646 13.0024 25.9531 14.0598 26.8596 15.4165C27.7661 16.7733 28.25 18.3683 28.25 20C28.2475 22.1873 27.3775 24.2843 25.8309 25.8309C24.2843 27.3775 22.1873 28.2475 20 28.25ZM21.5 24.5C21.5 24.6989 21.421 24.8897 21.2803 25.0303C21.1397 25.171 20.9489 25.25 20.75 25.25C20.3522 25.25 19.9706 25.092 19.6893 24.8107C19.408 24.5294 19.25 24.1478 19.25 23.75V20C19.0511 20 18.8603 19.921 18.7197 19.7803C18.579 19.6397 18.5 19.4489 18.5 19.25C18.5 19.0511 18.579 18.8603 18.7197 18.7197C18.8603 18.579 19.0511 18.5 19.25 18.5C19.6478 18.5 20.0294 18.658 20.3107 18.9393C20.592 19.2206 20.75 19.6022 20.75 20V23.75C20.9489 23.75 21.1397 23.829 21.2803 23.9697C21.421 24.1103 21.5 24.3011 21.5 24.5ZM18.5 15.875C18.5 15.6525 18.566 15.435 18.6896 15.25C18.8132 15.065 18.9889 14.9208 19.1945 14.8356C19.4001 14.7505 19.6263 14.7282 19.8445 14.7716C20.0627 14.815 20.2632 14.9222 20.4205 15.0795C20.5778 15.2368 20.685 15.4373 20.7284 15.6555C20.7718 15.8738 20.7495 16.1 20.6644 16.3055C20.5792 16.5111 20.435 16.6868 20.25 16.8104C20.065 16.934 19.8475 17 19.625 17C19.3266 17 19.0405 16.8815 18.8295 16.6705C18.6185 16.4595 18.5 16.1734 18.5 15.875Z"
                  fill="#FE8900"
                />
              </svg>
            </span>
            <!-- <img :src="imageSrc" alt="Notification" width="40" height="40" /> -->
          </div>

          <span
            ><svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18.75 5.25L5.25 18.75"
                stroke="#888888"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M18.75 18.75L5.25 5.25"
                stroke="#888888"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </span>
        </div>

        <div class="space-y-2">
          <h1 class="text-xs font-black">You have a new message</h1>
          <p class="text-xs w-[282px]">
            Lorem ipsum dolor sit amet consectetur. Tempus vitae sit et fusce
            tincidunt pretium donec tristique quisque. Nunc.
          </p>
          <div class="text-sm flex justify-between pt-3">
            <div class="flex space-x-4">
              <h1 class="font-black">Dismiss</h1>
              <h1 class="font-black text-primary-1">5 mins ago</h1>
            </div>
            <h1>5 mins ago</h1>
          </div>
        </div>
      </div>

      <div class="text-center md:py-2">
        <button
          class="bg-primary-1 font-black px-4 py-2.5 rounded-lg text-white"
        >
          Clear all
        </button>
      </div>
    </div>

    <!-- profile view section -->
    <div
      v-if="showProfileView"
      class="md:w-[241px] bg-white shadow py-4 px-4 space-y-4 right-2.5 absolute md:right-5 top-14 rounded-[20px] w-[341px]"
    >
      <div class="flex space-x-2 bg-black-50 rounded-10 px-3 py-2">
        <img
          src="/assets/images/Ellipse10.png"
          class="w-10 h-10"
          alt="no image"
        />
        <div class="flex flex-col">
          <h1 class="text-sm capitalize">Stanley Nwosu</h1>
          <p class="text-[10px] capitalize">example@example.com</p>
        </div>
      </div>

      <div class="space-y-2">
        <div class="flex justify-between bg-black-50 rounded-10 px-3 py-2">
          <h1 class="text-xs font-[400] capitalize">Switch Language</h1>

          <span>
            <svg
              width="18"
              height="19"
              viewBox="0 0 18 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.5855 9.89792L10.523 14.9604C10.4174 15.066 10.2743 15.1253 10.125 15.1253C9.97573 15.1253 9.83258 15.066 9.72703 14.9604C9.62148 14.8549 9.56219 14.7117 9.56219 14.5624C9.56219 14.4132 9.62148 14.27 9.72703 14.1645L13.8298 10.0624H2.8125C2.66332 10.0624 2.52024 10.0032 2.41475 9.89769C2.30926 9.79221 2.25 9.64913 2.25 9.49995C2.25 9.35076 2.30926 9.20769 2.41475 9.1022C2.52024 8.99671 2.66332 8.93745 2.8125 8.93745H13.8298L9.72703 4.83542C9.62148 4.72987 9.56219 4.58671 9.56219 4.43745C9.56219 4.28818 9.62148 4.14503 9.72703 4.03948C9.83258 3.93393 9.97573 3.87463 10.125 3.87463C10.2743 3.87463 10.4174 3.93393 10.523 4.03948L15.5855 9.10198C15.6378 9.15422 15.6793 9.21626 15.7076 9.28454C15.7359 9.35283 15.7504 9.42603 15.7504 9.49995C15.7504 9.57387 15.7359 9.64706 15.7076 9.71535C15.6793 9.78364 15.6378 9.84567 15.5855 9.89792Z"
                fill="#343330"
              />
            </svg>
          </span>
        </div>

        <div class="bg-danger-100 rounded-10 px-3 py-2">
          <h1 class="text-xs font-black text-danger-600 capitalize">Logout</h1>
        </div>
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
