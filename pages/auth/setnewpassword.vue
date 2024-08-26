<script setup>
import { ref, computed } from 'vue';
import Codepop from '~/components/codepop.vue';
import passwordicon from '@/assets/images/passwordicion.png';
</script>

<template>
  <section>
    <div>
      <div
        class="flex flex-col items-center justify-center w-1/2 h-full relative left-[25%] p-1"
      >
        <img :src="passwordicon" alt="" class="mt-5" />
        <h2 class="mt-3 text-xl font-normal font-['Nexa']">Set new password</h2>
        <p class="mb-6 font-['Nexa'] font-thin">
          Must be at least 8 characters
        </p>

        <form class="flex flex-col mb-14">
          <label class="mb-3 text-md fotn-thin font-['Nexa']"
            >New Password</label
          >
          <input
            placeholder="......"
            class="placeholder-custom outline-none w-[345px] px-3 py-2 border-2 border-solid border-[#D1D1D1] rounded-md font-['Nexa']"
          />
          <label class="mb-3 mt-3 text-md fotn-thin font-['Nexa']"
            >Confirm Password</label
          >

          <input
            placeholder="......"
            class="placeholder-custom outline-none w-[345px] px-3 py-2 border-2 border-solid border-[#D1D1D1] rounded-md font-['Nexa']"
          />
        </form>

        <button
          class="font-['Nexa'] font-black text-white w-1/2 py-2 rounded-xl text-xl bg-[#FE8900]"
        >
          <NuxtLink to="/auth/passwordconfirmation">Set new password</NuxtLink>
        </button>
      </div>

      <Codepop :isVisible="showPopup" @update:isVisible="showPopup = $event" />
    </div>
  </section>
</template>
<style scoped>
.placeholder-custom::placeholder {
  font-size: 5rem;
  color: #aaa;
}
</style>
