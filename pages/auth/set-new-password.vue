<script setup>
import { ref, computed } from "vue";
import Codepop from "~/components/codepop.vue";
import passwordicon from "@/assets/images/passwordicion.png";
</script>

<template>
  <section>
    <div>
      <div
        class="flex flex-col items-center justify-center w-1/2 h-full mx-auto"
      >
        <img :src="passwordicon" alt="" class="mt-5" />
        <h2 class="mt-3 text-lg font-normal font-['Georgia']">
          Set new password
        </h2>
        <p class="mb-6 text-[12px] font-thin">Must be at least 8 characters</p>

        <form class="flex flex-col gap-4">
          <label class="text-sm fotn-thin">New Password</label>
          <input
            type="password"
            placeholder="......"
            class="placeholder-custom outline-none w-[375px] px-3 h-12 border-2 border-solid border-black-200 rounded-md"
          />
          <label class="text-md fotn-thin">Confirm Password</label>

          <input
            type="password"
            placeholder="......"
            class="placeholder-custom outline-none w-[375px] px-3 h-12 border-2 border-solid border-black-200 rounded-md"
          />
        </form>

        <button
          class="font-black text-white w-[375px] h-12 rounded-xl m-10 text-sm bg-[#FE8900]"
        >
          <NuxtLink to="/auth/password-confirmation">Set new password</NuxtLink>
        </button>
      </div>

      <Codepop :isVisible="showPopup" @update:isVisible="showPopup = $event" />
    </div>
  </section>
</template>
<style scoped>
.placeholder-custom::placeholder {
  font-size: 3rem;
  color: #d9d9d9;
}
</style>
