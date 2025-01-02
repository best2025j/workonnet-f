<script setup lang="ts">
import { useRoute } from 'vue-router'
const route = useRoute();

const handleError = () => {
  clearError({
    redirect: '/',
  });
};
</script>

<template>
     <div class="w-full overflow-x-hidden">
    <div
      class="flex flex-col md:flex-row items-center px-6 md:pl-36 pt-6 md:pt-24 md:pr-0"
    >
      <!--  -->
      <div class="space-y-6">
        <div class="space-y-14">
          <h2
            class="text-cyan text-6xl md:text-[5rem] text-orbitron-font font-[900]"
          >
            500 Internal Server Error
          </h2>
          <p class="text-grey-50 text-lg md:text-xl font-normal">
           An error occurred on the server
            <br class="hidden md:block" />
          </p>
          <p class="text-grey-50 text-lg font-normal italic">
            <b class="text-cyan">Error</b> : {{ route.query.message }}
          </p>
        </div>

        <div class="w-1/4">
          <BtnPrimary @click="handleError" :is-loading="false">
            <template #text>
                Go to Home
            </template>
          </BtnPrimary>
        </div>
      </div>
      <!--  -->
    </div>
  </div>
</template>