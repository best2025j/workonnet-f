<script setup lang="ts">
import { POSITION, useToast } from 'vue-toastification';
import { required, helpers } from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core';
import type { ApiErrorResponse, ApiSuccessResponse } from '~/types';

const router  = useRouter()
const toast = useToast();
const isLoading = ref<boolean>(false);
const authStore = useAuthStore();

const formData = reactive({
  email: '',
  password: '',
});

const rules = computed(() => {
  return {
    email: {
      required: helpers.withMessage('Please enter valid email', required),
    },
    password: {
      required: helpers.withMessage('Please enter a password', required),
    },
  };
});

const v$ = useVuelidate(rules, formData);

const loginAdmin = async () => {
  isLoading.value = true;
  const isValidForm = await v$.value.$validate();
  if (!isValidForm) {
    toast.error('Please enter a valid email or password', {
      timeout: 3000,
      position: POSITION.TOP_RIGHT,
    });

    setTimeout(() => {
      isLoading.value = false;
    }, 2000);
    return;
  }

  try {
    const response = await $fetch('/api/auth/admin/authenticate', {
      method: 'POST',
      body: formData,
    });

    toast.success('Signin successful', {
      timeout: 3000,
      position: POSITION.TOP_RIGHT,
    });

    const responseData = response as ApiSuccessResponse;

    authStore.setCurrentUserType(LOGGED_USER.ADMIN);
    authStore.setUserAuthData({
      accountType: LOGGED_USER.ADMIN,
      adminId: responseData.data.adminId,
    });

    authStore.setUserToken(responseData.data.accessToken)
    setTimeout(() => {
      isLoading.value = false;
    }, 1000);

   return router.push('/admin/dashboard/');
  } catch (error: any) {
    const errorData = error.data as ApiErrorResponse;

    if (errorData.data?.errorCode === 'CI0001') {
      toast.error(errorData.data.message, {
        timeout: 3000,
        position: POSITION.TOP_RIGHT,
      });
    } else {
      toast.error('An error occurred try again', {
        timeout: 3000,
        position: POSITION.TOP_RIGHT,
      });
    }

    setTimeout(() => {
      isLoading.value = false;
    }, 2000);
  }
};
</script>
<template>
  <div class="h-screen w-full">
    <div
      class="h-3/4 relative top-16 w-1/2 py-4 flex items-center justify-center mx-auto"
    >
      <div class="flex flex-col space-y-3 w-[375px]">
        <div class="text-center flex-col flex items-center space-y-3">
          <img src="/assets/images/Logo2.png" alt="logo" />
          <h1 class="text-[32px] font-[400] font-[Georgia]">Sign in</h1>
        </div>

        <div class="space-y-3">
          <div class="flex flex-col">
            <label for="first-name" class="text-sm mb-2">Email</label>
            <input
              type="text"
              placeholder="Enter your email address here"
              v-model="formData.email"
              :disabled="isLoading"
              @change="v$.email.$touch"
              class="pl-2 placeholder:text-sm pr-4 h-10 outline-none border border-gray-300 rounded-md"
            />
          </div>

          <div class="flex flex-col">
            <label for="first-name" class="text-sm mb-2">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              pattern=".{8,}"
              v-model="formData.password"
              :disabled="isLoading"
              @change="v$.password.$touch"
              title="Password should be at least 8 characters"
              class="pl-2 placeholder:text-md pr-4 h-10 outline-none border border-gray-300 rounded-md"
            />
          </div>
        </div>
        <button class="underline text-right text-xs">Forgot password?</button>

        <div class="space-y-3 pt-6">
          <BtnPrimary
            @click="loginAdmin()"
            :isLoading="isLoading"
            :disabled="isLoading || v$.$invalid"
          >
            <template #text>
              {{ !isLoading ? 'Sign in' : 'Please wait...' }}
            </template>
          </BtnPrimary>
        </div>
      </div>
    </div>
  </div>
</template>
