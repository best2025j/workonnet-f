




  
  <script setup>

import messageicon from '@/assets/images/messageicon.png'
  

const inputValue = ref('');
const inputValue2 = ref('');
const inputValue3 = ref('');
const inputValue4 = ref('');

 


  </script>

<template>
    <div>
      <div class=" flex flex-col items-center justify-center w-1/2 h-full mx-auto">
<img :src="messageicon" alt="" class="mt-5 ">
<h2 class="mt-3 text-xl  font-['Georgia'] font-normal ">Enter Code</h2>
<p class="mb-5 text-[12px] font-thin ">We sent a code to example@example.com</p>
<div class="flex items-center justify-center gap-3 mt-5 mb-7 ">
 
   <input type="text" maxlength="1" v-model="inputValue" placeholder="0" :class="{ 'focus:outline-none  border-2 border-solid shadow-lg' : inputValue, 'border-2 border-solid  ' : !inputValue}" class="focus:outline-none resize-none w-[64px] font-medium rounded-md text-5xl text-center h-[64px] text-purple-500 " required>
   <input type="text" maxlength="1" v-model="inputValue2" placeholder="0" :class="{ ' focus:outline-none  border-2 border-solid shadow-lg' : inputValue2, 'border-2 border-solid  ' : !inputValue2}" class="focus:outline-none resize-none w-[64px] font-medium rounded-md text-5xl text-center h-[64px] text-purple-500 " required>
   <input type="text" maxlength="1" v-model="inputValue3" placeholder="0" :class="{ 'focus:outline-none  border-2 border-solid shadow-lg' : inputValue3, 'border-2 border-solid  ' : !inputValue3}" class="focus:outline-none w-[64px] font-medium rounded-md text-5xl text-center h-[64px] text-purple-500 " required>
   <input type="text" maxlength="1" v-model="inputValue4" placeholder="0" :class="{ 'focus:outline-none  border-2 border-solid shadow-lg' : inputValue4, 'border-2 border-solid  ' : !inputValue4}" class="focus:outline-none w-[64px] rounded-md font-medium text-5xl text-center h-[64px] text-purple-500 " required>


</div>
<p class=" text-sm font-thin mb-14">Didn't recieve the code?<NuxtLink class="ml-1 cursor-pointer text-black font-semibold  rounded-b-sm border-b-2 border-b-black  border-b-solid ">Click to resend</NuxtLink> </p>
<button class=" font-black text-white w-[375px] h-12 rounded-xl text-sm bg-[#FE8900]">
    <NuxtLink to="/auth/set-new-password">Continue</NuxtLink>
</button>
      </div>
      
     
    </div>
  </template>