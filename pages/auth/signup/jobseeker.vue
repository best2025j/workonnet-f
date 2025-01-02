<script setup lang="ts">
import { POSITION, useToast } from 'vue-toastification';
import {
  required,
  helpers,
  email,
  minLength,
  alpha,
  sameAs,
} from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core';
import type { ApiErrorResponse, ApiSuccessResponse } from '~/types';

definePageMeta({
  layout: 'auth',
  title: 'jobseeker.signup',
  pageName: 'jobseeker.signin',
  middleware: ['no-auth'],
});

const router = useRouter();
const toast = useToast();
const isLoading = ref<boolean>(false);
const authStore = useAuthStore();
const userStore = useUserStore();

const showConfirmPassword = ref(false);

function toggleShowConfirmPassword() {
  showConfirmPassword.value = !showConfirmPassword.value;
}

const updateIsLoading = (value: boolean) => {
  isLoading.value = value;
};

const formData = reactive({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '', //
});

const rules = computed(() => {
  return {
    firstName: {
      required: helpers.withMessage('Firstname is required', required),
      alpha: helpers.withMessage('Firstname can only contain letters', alpha),
    },
    lastName: {
      required: helpers.withMessage('Lastname is required', required),
      alpha: helpers.withMessage('Lastname can only contain letters', alpha),
    },
    email: {
      required: helpers.withMessage('Email is required', required),
      email: helpers.withMessage('Enter a valid email', email),
    },
    password: {
      required: helpers.withMessage('Please enter a password', required),
      minLength: helpers.withMessage(
        'Password cannot be less than 8 characters',
        minLength(8)
      ),
    },
    confirmPassword: {
      required: helpers.withMessage(
        'Please enter a confirm password',
        required
      ),
      sameAs: helpers.withMessage(
        'Password does not match',
        sameAs(formData.password)
      ),
    },
  };
});

const v$ = useVuelidate(rules, formData);

const handleSignup = async () => {
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
  
  const {confirmPassword, ...otherData} = formData

  try {
    await $fetch('/api/auth/jobseeker/register', {
      method: 'POST',
      body: otherData,
    });

    const loginResponse = await $fetch('/api/auth/jobseeker/authenticate', {
      method: 'POST',
      body: { password: formData.password, email: formData.email },
    });

    const responseData = loginResponse as ApiSuccessResponse;
    authStore.setLoginSecret(responseData.data.accessToken);

    setTimeout(() => {
      isLoading.value = false;
    }, 1000);

    return router.push({
      path: '/dashboard/jobseeker',
      query: {
        tk: responseData.data.accessToken,
        email: formData.email,
      },
    });
  } catch (error: any) {
    const errorData = error.data as ApiErrorResponse;

    if (errorData.data?.errorCode === 'E11000') {
      toast.error('Email already in use', {
        timeout: 3000,
        position: POSITION.TOP_RIGHT,
      });
    } else if (errorData.data?.errorCode === '100001') {
      toast.error('Password must be 8 characters long', {
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
</script>
<template>
  <div class="flex justify-center items-center w-full px-6 md:px-0">
    <div class="md:w-[23.375rem] w-full flex flex-col">
      <h2
        class="text-center md:text-[32px] mb-10 font-[Georgia] text-2xl font-normal"
      >
        Create Account
      </h2>

      <AuthSocialJobSeekerAuth v-on:update:isLoading="updateIsLoading" />

      <form
        class="flex flex-col mt-6 mx-auto space-y-3 items-start justify-center text-left w-full max-w-md"
      >
        <div class="flex items-start justify-between space-x-2">
          <div>
            <label class="text-sm font-thin text-left"
              >First Name
              <span class="text-red-500 text-xl">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter firstname here"
              v-model="formData.firstName"
              :disabled="isLoading"
              @change="v$.firstName.$touch"
              required
              class="outline-none w-full text-base rounded-md px-3 py-2.5 border border-black-200 border-solid"
            />
            <div
              class="input-errors"
              v-for="error of v$.firstName.$errors"
              :key="error.$uid"
            >
              <div class="text-xs text-danger-500">* {{ error.$message }}</div>
            </div>
          </div>
          <div>
            <label class="text-sm font-thin text-left"
              >Last Name
              <span class="text-red-500 text-xl">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter lastname here"
              v-model="formData.lastName"
              :disabled="isLoading"
              @change="v$.lastName.$touch"
              required
              class="outline-none w-full text-base rounded-md px-3 py-2.5 border border-black-200 border-solid"
            />

            <div
              class="input-errors"
              v-for="error of v$.lastName.$errors"
              :key="error.$uid"
            >
              <div class="text-xs text-danger-500">* {{ error.$message }}</div>
            </div>
          </div>
        </div>
        <div class="w-full">
          <label class="text-sm font-thin text-left"
            >Email
            <span class="text-red-500 text-xl">*</span>
          </label>
          <input
            type="email"
            placeholder="Enter email address here"
            v-model="formData.email"
            :disabled="isLoading"
            @change="v$.email.$touch"
            required
            class="outline-none w-full text-base rounded-md px-3 py-2.5 border border-black-200 border-solid"
          />

          <div
            class="input-errors"
            v-for="error of v$.email.$errors"
            :key="error.$uid"
          >
            <div class="text-xs text-danger-500">* {{ error.$message }}</div>
          </div>
        </div>

        <div class="w-full">
          <label class="text-base font-thin text-left"
            >Create Password
            <span class="text-red-500 text-xl">*</span>
          </label>
          <div class="relative mb-3">
            <input
              :type="showPassword ? 'text' : 'password'"
              placeholder="Enter new password"
              pattern=".{8,}"
              v-model="formData.password"
              :disabled="isLoading"
              @change="v$.password.$touch"
              required
              class="outline-none text-base leading-5 w-full p border border-solid border-black-200 rounded-lg px-3 py-2.5"
            />
            <button
              type="button"
              @click="toggleShowPassword"
              class="absolute right-3 top-1/2 transform -translate-y-1/2"
            >
              <span v-if="showPassword">Hide</span>
              <span v-else>Show</span>
            </button>

            <div
              class="input-errors"
              v-for="error of v$.password.$errors"
              :key="error.$uid"
            >
              <div class="text-xs text-danger-500">* {{ error.$message }}</div>
            </div>
          </div>

          <label class="text-base font-thin text-left">Confirm Password </label>
          <div class="relative">
            <input
              :type="showConfirmPassword ? 'text' : 'password'"
              placeholder="Confirm password"
              pattern=".{8,}"
              v-model="formData.confirmPassword"
              :disabled="isLoading"
              @change="v$.confirmPassword.$touch"
              class="outline-none text-base leading-5 w-full p border border-solid border-black-200 rounded-lg px-3 py-2.5"
            />
            <button
              type="button"
              @click="toggleShowConfirmPassword"
              class="absolute right-3 top-1/2 transform -translate-y-1/2"
            >
              <span v-if="showConfirmPassword">Hide</span>
              <span v-else>Show</span>
            </button>

            <div
              class="input-errors"
              v-for="error of v$.confirmPassword.$errors"
              :key="error.$uid"
            >
              <span class="text-xs text-danger-500"
                >* {{ error.$message }}</span
              >
            </div>
          </div>

          <div
            class="input-errors"
            v-for="error of v$.password.$errors"
            :key="error.$uid"
          >
            <span class="text-xs text-danger-500">* {{ error.$message }}</span>
          </div>
        </div>

        <div class="pt-5"></div>
        <BtnPrimary
          @click="handleSignup()"
          :isLoading="isLoading"
          :disabled="isLoading"
        >
          <template #text>
            {{ !isLoading ? 'Signup' : 'Please wait...' }}
          </template>
        </BtnPrimary>
      </form>
      <p class="text-center mt-5 text-sm mb-5 font-thin">
        Already have an account?
        <NuxtLink to="/auth/signin/jobseeker" class="font-thin text-[#007AFF]"
          >Sign In</NuxtLink
        >
      </p>
    </div>
  </div>
</template>
