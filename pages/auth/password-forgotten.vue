<script setup lang="ts">
import { POSITION, useToast } from 'vue-toastification';
import { required, helpers, email } from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core';
import type { ApiErrorResponse, ApiSuccessResponse } from '~/types';

definePageMeta({
  title: 'Forgotten Password',
  pageName: 'auth.forgotten.password',
})

const router  = useRouter();
const route  = useRoute();
const toast = useToast();
const isLoading = ref<boolean>(false);

const formData = reactive({
  email: '',
});

const rules = computed(() => {
  return {
    email: {
      required: helpers.withMessage('Email is required', required),
      email: helpers.withMessage('Enter a valid email', email),
    }
  };
});

const v$ = useVuelidate(rules, formData);

const forgotPassword = async () => {
  isLoading.value = true;
  const isValidForm = await v$.value.$validate();
  if (!isValidForm) {
    toast.error('Please enter a valid email', {
      timeout: 3000,
      position: POSITION.TOP_RIGHT,
    });

    setTimeout(() => {
      isLoading.value = false;
    }, 2000);
    return;
  }

  try {
    const response = await $fetch('/api/auth/forgot-password', {
      method: 'POST',
      body: {
        email: formData.email,
        reqId: route.query.reqId?.toString().toUpperCase()
      },
    });

    toast.info('Forgot password code sent to your email.', {
      timeout: 3000,
      position: POSITION.TOP_RIGHT,
    });

    const responseData = response as ApiSuccessResponse;
    setTimeout(() => {
      isLoading.value = false;
    }, 1000);

    setTimeout(() => {
      isLoading.value = false;
    }, 1000);

   return router.push({
    path: '/auth/forgotten-password-activation-code',
    query: {
      email: formData.email,
      reqId: route.query.reqId,
      tke: responseData.data.publicToken
    }
   });
  } catch (error: any) {
    const errorData = error.data as ApiErrorResponse;
      toast.error('An error occurred try again', {
        timeout: 3000,
        position: POSITION.TOP_RIGHT,
      });

    setTimeout(() => {
      isLoading.value = false;
    }, 2000);
  }
};

onMounted(() => {
  if(!route.query || !route.query.reqId){
    return router.replace('/')
  }
})
</script>

<template>
  <div class="md:w-1/2 mx-auto h-full">
    <div
      class="flex flex-col items-center justify-center md:w-[23.375rem] mx-auto mt-32"
    >
      <span class="mt-5">
        <svg
          width="72"
          height="72"
          viewBox="0 0 72 72"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="72" height="72" rx="36" fill="#FBD0A3" />
          <rect x="12" y="12" width="48" height="48" rx="24" fill="#F3B05F" />
          <path
            d="M41 26H31C28.24 26 26 28.23 26 30.98V36.96V37.96C26 40.71 28.24 42.94 31 42.94H32.5C32.77 42.94 33.13 43.12 33.3 43.34L34.8 45.33C35.46 46.21 36.54 46.21 37.2 45.33L38.7 43.34C38.89 43.09 39.19 42.94 39.5 42.94H41C43.76 42.94 46 40.71 46 37.96V30.98C46 28.23 43.76 26 41 26ZM32 36C31.44 36 31 35.55 31 35C31 34.45 31.45 34 32 34C32.55 34 33 34.45 33 35C33 35.55 32.56 36 32 36ZM36 36C35.44 36 35 35.55 35 35C35 34.45 35.45 34 36 34C36.55 34 37 34.45 37 35C37 35.55 36.56 36 36 36ZM40 36C39.44 36 39 35.55 39 35C39 34.45 39.45 34 40 34C40.55 34 41 34.45 41 35C41 35.55 40.56 36 40 36Z"
            fill="#B7680C"
          />
        </svg>
      </span>
      <h2 class="mt-3 text-xl font-normal font-['Nexa']">Forgot password?</h2>
      <p class="mb-6 font-thin text-sm">Enter your email for instructions</p>

      <form class="flex flex-col mb-5 w-full">
        <label class="mb-3 text-sm">Email address</label>
        <input
        v-model="formData.email"
            :disabled="isLoading"
            @change="v$.email.$touch"
         class="outline-none text-base w-full font-thin rounded-lg px-3 py-2.5 border border-black-200 border-solid"
          type="text"
          placeholder="Enter email"
        />
      </form>

      <BtnPrimary @click="forgotPassword()" :disabled="isLoading || v$.$invalid" :isLoading="isLoading">
        <template #text>
          {{ !isLoading ? 'Send 5-digits' : 'Please waiting...' }}
        </template>
      </BtnPrimary>
    </div>
  </div>
</template>
