<template>
    <div>
        <header class="w-ful h-20 flex items-center justify-between mx-10" >
        <img :src="workLogo" alt="">
<div>
  <nav class="">
    <ul class="flex gap-5 text-lg font-['Nexa'] font-semibold">
      <li>
        <NuxtLink to="/" class="py-1">
          Home
        </NuxtLink>
      </li>
      <li>
        <NuxtLink class="py-1"> Pricing</NuxtLink>
        </li>
      <li>
        <NuxtLink class="py-1">For Recruiters</NuxtLink>
        </li>
      <li>
        <NuxtLink to="/auth/signin" class="py-1" >Job Seekers</NuxtLink>
        </li>
    </ul>
  </nav>
  </div>
  <div class="" >
    <button class=" py-2 px-4 rounded-md bg-[#FE8900] text-white font-['Nexa'] font-light mr-4  "> Register</button>
    <button class="text-[#FE8900] bg-[#E7E7E7] py-2 px-4 rounded-md font-['Nexa'] font-light" >LogIn</button>
  </div>

    </header>
    <div>
        <slot />
    </div>
    </div>
</template>

<script setup>
import workLogo from '@/assets/images/workconnectlogo.png';
</script>

<style  scoped>
.router-link-exact-active{
  border-bottom: 5px solid #FE8900;
  color: #FE8900;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;

}
</style>