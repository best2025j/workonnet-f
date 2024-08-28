<script setup>
import passwordicon from "@/assets/images/passwordconfirmation.png";
</script>

<template>
  <section>
    <div>
      <div
        class="flex flex-col items-center justify-center w-1/2 h-full mx-auto"
      >
        <img :src="passwordicon" alt="" class="mt-8" />
        <h2 class="mt-3 text-xl font-normal font-['Georgia']">All done!!!</h2>
        <p class="mb-20 font-['Nexa']">Your password has been reset.</p>

        <button
          class="font-['Nexa'] font-black text-white w-[375px] h-12 rounded-xl text-sm bg-[#FE8900]"
        >
          <NuxtLink to="/auth/signin">Go to Login</NuxtLink>
        </button>
      </div>
    </div>
  </section>
</template>
