<script setup>
import { ref } from 'vue';
import Codepop from '~/components/codepop.vue';
import messageicon from '@/assets/images/messageicon.png';

const showPopup = ref(false);

const inputValue = ref('');
const inputValue2 = ref('');
const inputValue3 = ref('');
const inputValue4 = ref('');
</script>

<template>
  <div>
    <div
      class="flex flex-col items-center justify-center w-[40%] h-full relative left-[25%] p-4"
    >
      <img :src="messageicon" alt="" class=" " />
      <h2 class="mt-3 text-xl font-semibold font-['Nexa']">Enter Code</h2>
      <p class="mb-5 font-['Nexa']">We sent a code to example@example.com</p>
      <div class="flex items-center justify-center gap-2 mb-5 font-['Nexa']">
        <input
          type="text"
          maxlength="1"
          v-model="inputValue"
          placeholder="0"
          :class="{
            'focus:outline-none  border-2 border-solid shadow-lg': inputValue,
            'border-2 border-solid  ': !inputValue,
          }"
          class="focus:outline-none resize-none w-14 rounded-md text-5xl text-center h-14 text-purple-500"
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
          class="focus:outline-none resize-none w-14 rounded-md text-5xl text-center h-14 text-purple-500"
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
          class="focus:outline-none w-14 rounded-md text-5xl text-center h-14 text-purple-500"
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
          class="focus:outline-none w-14 rounded-md text-5xl text-center h-14 text-purple-500"
          required
        />
      </div>
      <p class="text-lg mb-10">
        Didn't recieve the code?<NuxtLink
          class="ml-1 cursor-pointer text-black font-semibold rounded-b-sm border-b-2 border-b-black border-b-solid"
          >Click to resend</NuxtLink
        >
      </p>
      <button
        @click="showPopup = true"
        class="font-['Nexa'] font-black text-white w-[70%] py-3 rounded-xl text-xl bg-[#FE8900]"
      >
        Continue
      </button>
    </div>

    <Codepop :isVisible="showPopup" @update:isVisible="showPopup = $event" />
  </div>
</template>
