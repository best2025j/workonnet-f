<script setup>
import { ref } from 'vue';
import passwordicon from '@/assets/images/password.png';

const inputValue = ref('');
</script>

<template>
  <section>
    <div>
      <div
        class="flex flex-col items-center justify-center w-1/2 h-full relative left-[25%] p-1"
      >
        <img :src="passwordicon" alt="" class="mt-5" />
        <h2 class="mt-3 text-xl font-normal font-['Nexa']">Forgot password?</h2>
        <p class="mb-6 font-['Nexa']">Enter your email for instructions</p>

        <form class="flex flex-col mb-14">
          <label class="mb-3 text-md font-['Nexa']">Email address</label>
          <input
            v-model="inputValue"
            :class="{
              'focus:outline-none  border-2 border-solid shadow-lg': inputValue,
              'border-2 border-solid  ': !inputValue,
            }"
            type="text"
            class="outline-none w-[345px] px-3 py-2 rounded-md font-['Nexa']"
            placeholder="Enter email address here"
          />
        </form>

        <button
          class="font-['Nexa'] font-black text-white w-1/2 py-2 rounded-xl text-xl bg-[#FE8900]"
        >
          <NuxtLink to="/auth/forgottenpasswordactivationcode"
            >Send 4-digits</NuxtLink
          >
        </button>
      </div>
    </div>
  </section>
</template>
