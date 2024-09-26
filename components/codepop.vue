<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
  isVisible: Boolean,
});
const emit = defineEmits(['update:isVisible']);
const router = useRouter();
const closePopup = () => {
  emit('update:isVisible', false);
};
const goToDashboard = () => {
  router.push('/dashboard/jobseeker');
};
</script>
<template>
  
    <div
      v-if="isVisible"
      class="fixed top-0 left-0 w-full h-full flex items-center justify-center backdrop-brightness-75 backdrop-blur-sm"
      @click="closePopup"
    >
      <div
        class="bg-white rounded-lg relative max-w-[400px] w-full text-center"
        @click.stop
      >
        <button
          class="absolute top-3 right-5 text-4xl font-thin text-[#57575B] bg-transparent border-none cursor-pointer"
          @click="closePopup"
        >
          &times;
        </button>
        <h2 class="mt-5 font-black text-[16px] mb-10">Success</h2>

       <div class="w-full flex items-center justify-center py-10">
        <span>
          <svg
            width="82"
            height="82"
            viewBox="0 0 82 82"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M41 0.375C32.9652 0.375 25.1107 2.75761 18.43 7.22155C11.7492 11.6855 6.54222 18.0302 3.46741 25.4535C0.392602 32.8767 -0.411908 41.0451 1.15562 48.9255C2.72314 56.806 6.5923 64.0447 12.2738 69.7262C17.9553 75.4077 25.194 79.2769 33.0745 80.8444C40.955 82.4119 49.1233 81.6074 56.5465 78.5326C63.9698 75.4578 70.3145 70.2508 74.7785 63.57C79.2424 56.8893 81.625 49.0349 81.625 41C81.6136 30.2291 77.3299 19.9025 69.7137 12.2863C62.0975 4.67015 51.7709 0.386374 41 0.375ZM58.836 33.8359L36.961 55.7109C36.6707 56.0015 36.3261 56.232 35.9467 56.3893C35.5673 56.5465 35.1607 56.6275 34.75 56.6275C34.3393 56.6275 33.9327 56.5465 33.5533 56.3893C33.174 56.232 32.8293 56.0015 32.5391 55.7109L23.1641 46.3359C22.5777 45.7496 22.2483 44.9543 22.2483 44.125C22.2483 43.2957 22.5777 42.5004 23.1641 41.9141C23.7505 41.3277 24.5458 40.9983 25.375 40.9983C26.2043 40.9983 26.9996 41.3277 27.586 41.9141L34.75 49.082L54.4141 29.4141C54.7044 29.1237 55.0491 28.8934 55.4285 28.7363C55.8078 28.5791 56.2144 28.4983 56.625 28.4983C57.0356 28.4983 57.4422 28.5791 57.8216 28.7363C58.2009 28.8934 58.5456 29.1237 58.836 29.4141C59.1263 29.7044 59.3566 30.0491 59.5137 30.4284C59.6709 30.8078 59.7518 31.2144 59.7518 31.625C59.7518 32.0356 59.6709 32.4422 59.5137 32.8216C59.3566 33.2009 59.1263 33.5456 58.836 33.8359Z"
              fill="#0FA968"
            />
          </svg>
        </span>
       </div>

        <p class="font-thin text-sm">Code verified successfully.</p>
        <button
          class="text-white bg-[#FE8900] w-32 h-8 text-[12px] mb-5 rounded-md cursor-pointer mt-5"
          @click="goToDashboard"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
</template>

<style scoped></style>
