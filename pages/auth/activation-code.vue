<script setup>
import { ref } from "vue";
import Codepop from "~/components/codepop.vue";
import messageicon from "@/assets/images/messageicon.png";

const showPopup = ref(false);

const inputValue = ref("");
const inputValue2 = ref("");
const inputValue3 = ref("");
const inputValue4 = ref("");
</script>

<template>
  <div>
    <div
      class="flex flex-col items-center justify-center w-full h-full mx-auto mt-10"
    >
      <img :src="messageicon" alt="" class=" " />
      <h2 class="mt-3 text-xl font-normal font-['Georgia']">Enter Code</h2>
      <p class="font-thin text-[12px]">We sent a code to example@example.com</p>
      <div class="flex items-center justify-center gap-2 mb-8 mt-8">
        <input
          type="text"
          maxlength="1"
          v-model="inputValue"
          placeholder="0"
          :class="{
            'focus:outline-none  border-2 border-solid shadow-lg': inputValue,
            'border-2 border-solid  ': !inputValue,
          }"
          class="focus:outline-none resize-none w-[64px] font-medium rounded-md text-5xl text-center h-[64px] text-purple-500"
          required
        />
        <input
          type="text"
          maxlength="1"
          v-model="inputValue2"
          placeholder="0"
          :class="{
            ' focus:outline-none  border-2 border-solid shadow-lg': inputValue2,
            'border-2 border-solid  ': !inputValue2,
          }"
          class="focus:outline-none resize-none w-[64px] font-medium rounded-md text-5xl text-center h-[64px] text-purple-500"
          required
        />
        <input
          type="text"
          maxlength="1"
          v-model="inputValue3"
          placeholder="0"
          :class="{
            'focus:outline-none  border-2 border-solid shadow-lg': inputValue3,
            'border-2 border-solid  ': !inputValue3,
          }"
          class="focus:outline-none w-[64px] font-medium rounded-md text-5xl text-center h-[64px] text-purple-500"
          required
        />
        <input
          type="text"
          maxlength="1"
          v-model="inputValue4"
          placeholder="0"
          :class="{
            'focus:outline-none  border-2 border-solid shadow-lg': inputValue4,
            'border-2 border-solid  ': !inputValue4,
          }"
          class="focus:outline-none w-[64px] rounded-md font-medium text-5xl text-center h-[64px] text-purple-500"
          required
        />
      </div>
      <p class="text-[12px] font-thin mb-10">
        Didn't recieve the code?
        <NuxtLink
          class="ml-1 cursor-pointer text-black font-thin rounded-b-sm border-b-2 border-b-black border-b-solid"
        >
          Click to resend</NuxtLink
        >
      </p>
      <button
        @click="showPopup = true"
        class="font-black text-white w-[375px] h-12 rounded-xl text-xl bg-[#FE8900]"
      >
        Continue
      </button>
    </div>

    <Codepop :isVisible="showPopup" @update:isVisible="showPopup = $event" />
  </div>
</template>
