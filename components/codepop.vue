<template>
  <section>
  <div v-if="isVisible" class="fixed top-0 left-0 w-full h-full flex items-center justify-center backdrop-blur-sm" @click="closePopup">
    <div class="bg-white rounded-lg relative max-w-[400px] w-full text-center" @click.stop>
      <button class="absolute top-3 right-3 text-4xl bg-transparent border-none cursor-pointer" @click="closePopup">&times;</button>
      <h2 class="mt-5 font-black text-xl mb-10">Success</h2>
      <img :src="succesicon" alt="Success Icon" class="relative mb-10 mt-10 w-24 mx-auto">
      <p class="font-['Nexa']">Code activated successfully.</p>
      <button class="text-white bg-[#FE8900] py-2 px-3 mb-5 rounded-md cursor-pointer mt-5" @click="goToDashboard">Go to Dashboard</button>
    </div>
  </div>
  </section>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
import { useRouter } from 'vue-router'; 
import succesicon from '@/assets/images/Vector.png';

const props = defineProps({
  isVisible: Boolean
});
const emit = defineEmits(['update:isVisible']);
const router = useRouter();

const closePopup = () => {
  emit('update:isVisible', false);
};

const goToDashboard = () => {
  router.push('/dashboard');
};
</script>

<style scoped>
/* Add any scoped styles here */
</style>
