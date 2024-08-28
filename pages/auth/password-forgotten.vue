<script setup>
import { ref } from "vue";
import passwordicon from "@/assets/images/password.png";

const inputValue = ref("");
</script>

<template>
  <section>
    <div>
      <div
        class="flex flex-col items-center justify-center w-1/2 h-full mx-auto"
      >
        <img :src="passwordicon" alt="" class="mt-5" />
        <h2 class="mt-3 text-xl font-normal font-['Nexa']">Forgot password?</h2>
        <p class="mb-6 font-thin text-sm">Enter your email for instructions</p>

        <form class="flex flex-col mb-14">
          <label class="mb-3 text-sm">Email address</label>
          <input
            v-model="inputValue"
            :class="{
              'focus:outline-none border-black-200 border-2 border-solid shadow-lg':
                inputValue,
              'border-2 border-solid  ': !inputValue,
            }"
            type="text"
            class="outline-none w-[375px] border-black-200 border-2 border-solid px-3 py-2 rounded-md"
            placeholder="example@exapmle.com"
          />
        </form>

        <button
          class="font-black text-white w-[375px] h-12 rounded-xl text-sm bg-[#FE8900]"
        >
          <NuxtLink to="/auth/forgotten-password-activation-code"
            >Send 4-digits</NuxtLink
          >
        </button>
      </div>
    </div>
  </section>
</template>
