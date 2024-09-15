<script setup>
import messageicon from "@/assets/images/messageicon.png";

const inputValue = ref("");
const inputValue2 = ref("");
const inputValue3 = ref("");
const inputValue4 = ref("");
</script>

<template>
  <div class="w-1/2 mx-auto h-full">
    <div
      class="flex flex-col items-center justify-center w-[23.375rem] mx-auto mt-10"
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
      <h2 class="mt-3 text-xl font-['Georgia'] font-normal">Enter Code</h2>
      <p class="mb-5 text-[12px] font-thin">
        We sent a code to example@example.com
      </p>
      <div class="flex items-center justify-center gap-3 mt-5 mb-7">
        <input
          type="text"
          maxlength="1"
          v-model="inputValue"
          :class="{
            'focus:outline-none  border-2 border-solid shadow-lg': inputValue,
            'border-2 border-solid  ': !inputValue,
          }"
          class="focus:outline-none resize-none w-[64px] font-medium rounded-lg text-5xl text-center h-[64px] text-purple-500"
          required
        />
        <input
          type="text"
          maxlength="1"
          v-model="inputValue2"
          :class="{
            ' focus:outline-none  border-2 border-solid shadow-lg': inputValue2,
            'border-2 border-solid  ': !inputValue2,
          }"
          class="focus:outline-none resize-none w-[64px] font-medium rounded-lg text-5xl text-center h-[64px] text-purple-500"
          required
        />
        <input
          type="text"
          maxlength="1"
          v-model="inputValue3"
          :class="{
            'focus:outline-none  border-2 border-solid shadow-lg': inputValue3,
            'border-2 border-solid  ': !inputValue3,
          }"
          class="focus:outline-none w-[64px] font-medium rounded-lg text-5xl text-center h-[64px] text-purple-500"
          required
        />
        <input
          type="text"
          maxlength="1"
          v-model="inputValue4"
          :class="{
            'focus:outline-none  border-2 border-solid shadow-lg': inputValue4,
            'border-2 border-solid  ': !inputValue4,
          }"
          class="focus:outline-none w-[64px] rounded-lg font-medium text-5xl text-center h-[64px] text-purple-500"
          required
        />
      </div>
      <p class="text-sm font-thin mb-14">
        Didn't receive the code?<NuxtLink
          class="ml-1 cursor-pointer text-black font-semibold rounded-b-sm border-b-2 border-b-black border-b-solid"
          >Click to resend</NuxtLink
        >
      </p>
      <button
        class="font-black text-white w-full  py-3.5 rounded-lg text-sm bg-[#FE8900]"
      >
        <NuxtLink to="/auth/set-new-password">Continue</NuxtLink>
      </button>
    </div>
   </div>
</template>
