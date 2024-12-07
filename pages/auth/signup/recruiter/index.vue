<script setup lang="ts">
import { POSITION, useToast } from 'vue-toastification';
import {
  required,
  helpers,
  email,
  minLength,
  sameAs,
} from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core';

definePageMeta({
  layout: 'auth',
  title: 'recruiter.signup.index',
  pageName: 'recruiter.signup',
  // middleware: ['no-auth'],
});

const toast = useToast();
const router = useRouter();
const authStore = useAuthStore();
const isLoading = ref<boolean>(false);

const formData = reactive({
  fullName: '',
  email: '',
  password: '',
  confirmPassword: '', //
  companyName: '',
  companySize: '',
  industry: '',
  websiteUrl: '',
});

const showPassword = ref(false);
const showConfirmPassword = ref(false);

function toggleShowPassword() {
  showPassword.value = !showPassword.value;
}

function toggleShowConfirmPassword() {
  showConfirmPassword.value = !showConfirmPassword.value;
}

const updateIsLoading = (value: boolean) => {
  isLoading.value = value;
};

const rules = computed(() => {
  return {
    fullName: {
      required: helpers.withMessage('FullName is required', required),
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

const handleNextStep = async () => {
  isLoading.value = true;
  const isValidForm = await v$.value.$validate();
  if (!isValidForm) {
    toast.error('Please enter a valid email or password or fullname', {
      timeout: 3000,
      position: POSITION.TOP_RIGHT,
    });

    setTimeout(() => {
      isLoading.value = false;
    }, 2000);

    return;
  }

  // store step one data -
  authStore.setStepOneFormData(formData);
  // navigate to step two
  router.push('/auth/signup/recruiter/complete-signup');
};

onMounted(() => {
  if (authStore.stepOneRecruiterForm != null) {
    if (authStore.stepOneRecruiterForm?.fullName !== null) {
      formData.fullName = authStore.stepOneRecruiterForm.fullName;
    }
    if (authStore.stepOneRecruiterForm?.email !== null) {
      formData.email = authStore.stepOneRecruiterForm?.email;
    }
    if (authStore.stepOneRecruiterForm.password !== null) {
      formData.password = authStore.stepOneRecruiterForm?.password;
    }
    if (authStore.stepOneRecruiterForm.confirmPassword !== null) {
      formData.confirmPassword =
        authStore.stepOneRecruiterForm?.confirmPassword;
    }

    if (authStore.stepOneRecruiterForm.companyName !== null) {
      formData.companyName = authStore.stepOneRecruiterForm.companyName;
    }
    if (authStore.stepOneRecruiterForm.companySize !== null) {
      formData.companySize = authStore.stepOneRecruiterForm.companySize;
    }
    if (authStore.stepOneRecruiterForm.industry !== null) {
      formData.industry = authStore.stepOneRecruiterForm.industry;
    }
    if (authStore.stepOneRecruiterForm.websiteUrl !== null) {
      formData.websiteUrl = authStore.stepOneRecruiterForm.websiteUrl;
    }
  }
});
</script>

<template>
  <div class="flex justify-center items-center w-full px-6 md:px-0">
    <div class="md:w-[23.375rem] w-full flex flex-col">
      <h2
        class="text-center text-2xl md:text-[32px] mb-6 font-['Georgia'] font-normal"
      >
        Signup to account
      </h2>

      <AuthSocialRecruiterAuth v-on:update:isLoading="updateIsLoading" />

      <form
        class="flex flex-col mt-6 mx-auto items-start space-y-2 justify-center text-left w-full max-w-md"
      >
        <div class="w-full">
          <label class="text-base font-thin mb-2 text-left mt-4"
            >Full Name
            <span class="text-red-500 text-xl">*</span>
          </label>
          <input
            type="text"
            placeholder="Full name here"
            required
            v-model="formData.fullName"
            :disabled="isLoading"
            @change="v$.lastName.$touch"
            class="outline-none w-full text-base font-thin placeholder:font-thin placeholder:text-[#958D8D] rounded-lg px-3 py-2.5 border border-black-200 border-solid"
          />
          <div
            class="input-errors"
            v-for="error of v$.fullName.$errors"
            :key="error.$uid"
          >
            <span class="text-xs text-danger-500">* {{ error.$message }}</span>
          </div>
        </div>

        <div class="w-full">
          <label class="text-base font-thin mb-2 text-left mt-4"
            >Email
            <span class="text-red-500 text-xl">*</span>
          </label>
          <input
            type="email"
            placeholder="Enter email address here"
            required
            v-model="formData.email"
            :disabled="isLoading"
            @change="v$.email.$touch"
            class="outline-none w-full text-base font-thin placeholder:font-thin placeholder:text-[#958D8D] rounded-lg px-3 py-2.5 border border-black-200 border-solid"
          />

          <div
            class="input-errors"
            v-for="error of v$.email.$errors"
            :key="error.$uid"
          >
            <span class="text-xs text-danger-500">* {{ error.$message }}</span>
          </div>
        </div>

        <div class="w-full">
          <label class="text-base font-thin mb-2 text-left mt-4"
            >Password
            <span class="text-red-500 text-xl">*</span>
          </label>
          <div class="relative mb-3">
            <input
              :type="showPassword ? 'text' : 'password'"
              placeholder="Enter new password"
              required
              pattern=".{8,}"
              v-model="formData.password"
              :disabled="isLoading"
              @change="v$.password.$touch"
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
              <span class="text-xs text-danger-500"
                >* {{ error.$message }}</span
              >
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

        <div class="pt-10"></div>
        <BtnPrimary
          @click="handleNextStep()"
          :isLoading="isLoading"
          :disabled="isLoading"
        >
          <template #text> Next : Add Company </template>
        </BtnPrimary>
      </form>

      <p class="text-center mt-10 mb-5 text-sm font-thin">
        Already have an account?
        <NuxtLink to="/auth/signin/recruiter" class="font-thin text-[#007AFF]"
          >Sign In</NuxtLink
        >
      </p>
    </div>
  </div>
</template>
