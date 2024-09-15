<script setup lang="ts">
const localStore = useLocalStore();
</script>

<template>
  <header
    class="text-black-900 bg-white items-center flex py-4 text-xs sticky top-0 z-10"
  >
    <div class="container mx-auto flex justify-between items-center">
      <h1 class="text-3xl text-primary-1 font-black font-[Georgia]">
        {{ $route?.meta?.title }}
      </h1>

      <!-- search input -->
      <form
        v-show="localStore.$state.currentUserType === LOGGED_USER.RECRUITER"
        class="relative"
      >
        <input
          type="text"
          placeholder="Search for jobs, candidates & more..."
          class="pl-10 placeholder:text-sm pr-4 h-10 w-[375px] outline-none border border-gray-300 rounded-md"
        />
        <svg
          width="10"
          height="10"
          class="absolute left-3 top-3 h-4 w-4 text-gray-400"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16.9422 16.0577L13.0305 12.1468C14.1642 10.7856 14.7296 9.03977 14.6089 7.27238C14.4883 5.50499 13.6909 3.85217 12.3826 2.65772C11.0744 1.46328 9.35597 0.819195 7.58492 0.859445C5.81388 0.899695 4.12653 1.62118 2.87389 2.87383C1.62125 4.12647 0.899756 5.81382 0.859506 7.58486C0.819256 9.35591 1.46334 11.0743 2.65779 12.3825C3.85223 13.6908 5.50506 14.4882 7.27244 14.6089C9.03983 14.7295 10.7857 14.1642 12.1469 13.0304L16.0578 16.9421C16.1159 17.0002 16.1848 17.0463 16.2607 17.0777C16.3366 17.1091 16.4179 17.1253 16.5 17.1253C16.5821 17.1253 16.6634 17.1091 16.7393 17.0777C16.8152 17.0463 16.8841 17.0002 16.9422 16.9421C17.0003 16.8841 17.0463 16.8151 17.0777 16.7392C17.1092 16.6634 17.1253 16.5821 17.1253 16.4999C17.1253 16.4178 17.1092 16.3365 17.0777 16.2606C17.0463 16.1848 17.0003 16.1158 16.9422 16.0577ZM2.125 7.74993C2.125 6.63741 2.4549 5.54988 3.07298 4.62485C3.69106 3.69982 4.56957 2.97885 5.5974 2.55311C6.62524 2.12737 7.75624 2.01598 8.84738 2.23302C9.93852 2.45006 10.9408 2.98579 11.7275 3.77246C12.5141 4.55913 13.0499 5.56141 13.2669 6.65255C13.484 7.74369 13.3726 8.87469 12.9468 9.90253C12.5211 10.9304 11.8001 11.8089 10.8751 12.427C9.95005 13.045 8.86252 13.3749 7.75 13.3749C6.25866 13.3733 4.82888 12.7801 3.77435 11.7256C2.71981 10.6711 2.12665 9.24127 2.125 7.74993Z"
            fill="#343330"
          />
        </svg>
      </form>

      <nav>
        <NuxtLink
          to="/"
          class="text-black-900 hover:underline flex items-center gap-4 flex-row-reverse"
        >
          <img
            src="/assets/images/Ellipse12.png"
            alt="Profile Picture"
            v-if="localStore.$state.currentUserType !== LOGGED_USER.ADMIN"
          />
          <!-- Use the bellIcon component correctly -->
          <IconsBellIcon class="h-6 w-6 inline-block" />
        </NuxtLink>
      </nav>
    </div>
  </header>
</template>

<style scoped>
/* Add any additional styles for the header here */
</style>
