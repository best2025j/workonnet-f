<script setup lang="ts">
import { POSITION, useToast } from 'vue-toastification';
import { required, helpers, email } from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core';
import type { ApiErrorResponse, ApiSuccessResponse } from '~/types';

definePageMeta({
  layout: 'auth',
  title: 'jobseeker.signin',
  pageName: 'jobseeker.signin',
  middleware: ['no-auth'],
});

const router = useRouter();
const route = useRoute();
const toast = useToast();
const isLoading = ref<boolean>(false);
const authStore = useAuthStore();
const userStore = useUserStore();

//Form Data
const formData = reactive({
  email: route.query?.email ? route.query?.email : '',
  password: '',
});

const rules = computed(() => {
  return {
    email: {
      required: helpers.withMessage('Email is required', required),
      email: helpers.withMessage('Enter a valid email', email),
    },
    password: {
      required: helpers.withMessage('Please enter a password', required),
    },
  };
});

const v$ = useVuelidate(rules, formData);

const handleLogin = async () => {
  isLoading.value = true;
  const isValidForm = await v$.value.$validate();
  if (!isValidForm) {
    toast.error('Please enter a valid email or password', {
      timeout: 3000,
      position: POSITION.TOP_RIGHT,
    });

    setTimeout(() => {
      isLoading.value = false;
    }, 1000);
    return;
  }

  try {
    const response = await $fetch('/api/auth/jobseeker/authenticate', {
      method: 'POST',
      body: formData,
    });

    const responseData = response as ApiSuccessResponse;
    authStore.setLoginSecret(responseData.data.accessToken);
    userStore.setUserDetails(responseData.data.user);
    authStore.isAuthenticated = true;


    setTimeout(() => {
      isLoading.value = false;
    }, 1000);

    // Redirect to dashboard  /auth/activation-code
    return navigateTo('/dashboard/jobseeker');

    return router.push({
      path: '/dashboard/jobseeker',
      query: {
        tk: responseData.data.accessToken,
        email: formData.email,
      },
    });
    
  } catch (error: any) {
    const errorData = error.data as ApiErrorResponse;

    console.log(error);

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
//password visibility
const showPassword = ref(false);
function toggleShowPassword() {
  showPassword.value = !showPassword.value;
}

const updateIsLoading  = (value: boolean) => {
  isLoading.value = value
}
</script>

<template>
  <div class="flex justify-center items-center w-full px-6 md:px-0">
    <div class="md:w-[23.375rem] w-full flex flex-col">
      <h2
        class="text-center text-2xl md:text-[32px] mb-10 font-[Georgia] font-normal"
      >
        Continue to account
      </h2>
      <AuthSocialJobSeekerAuth v-on:update:isLoading="updateIsLoading" />
      <form
        class="flex flex-col mt-6 mx-auto items-start justify-center text-left w-full max-w-md"
      >
        <div class="flex flex-col w-full">
          <label class="text-basefont-thin mb-2 text-left mt-4">Email 
            <span class="text-red-500 text-xl">*</span>

          </label>
          <input
            type="email"
            placeholder="Enter email address here"
            v-model="formData.email"
            :disabled="isLoading"
            @change="v$.email.$touch"
            class="outline-none text-base w-full font-thin rounded-lg px-3 py-2.5 border border-black-200 border-solid"
            reqiired
          />

          <label class="text-base font-thin mb-2 text-left mt-4"
            >Password
            <span class="text-red-500 text-xl">*</span>
            </label
          >
          <div class="relative">
            <input
              :type="showPassword ? 'text' : 'password'"
              placeholder="Enter password"
              pattern=".{8,}"
              v-model="formData.password"
              :disabled="isLoading"
              @change="v$.password.$touch"
              class="outline-none text-base leading-5 w-full p border border-solid border-black-200 rounded-lg px-3 py-2.5"
            required/>
            <button
              type="button"
              @click="toggleShowPassword"
              class="absolute right-3 top-1/2 transform -translate-y-1/2"
            >
              <span v-if="showPassword">Hide</span>
              <span v-else>Show</span>
            </button>
          </div>
          <div class="flex justify-end mt-2">
            <NuxtLink
              class="text-sm text-black underline cursor-pointer"
              to="/auth/password-forgotten?reqId=jobseeker"
            >
              Forgot password?
            </NuxtLink>
          </div>
        </div>

        <div class="mt-10"></div>
        <BtnPrimary
          @click="handleLogin()"
          :isLoading="isLoading"
          :disabled="isLoading"
        >
          <template #text>
            {{ !isLoading ? 'Sign in' : 'Please wait...' }}
          </template>
        </BtnPrimary>
      </form>
      <p class="text-center md:mt-10 pt-4 md:mb-5 text-xs md:text-sm font-thin">
        Don't have an account?
        <NuxtLink to="/auth/signup/jobseeker" class="font-light text-[#007AFF]"
          >Sign up</NuxtLink
        >
      </p>
    </div>
  </div>
</template>
