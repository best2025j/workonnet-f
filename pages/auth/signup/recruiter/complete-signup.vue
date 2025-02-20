<script setup lang="ts">
import { POSITION, useToast } from 'vue-toastification';
import {
  required,
  helpers,
  email,
  url,
  minLength,
} from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core';
import type { ApiErrorResponse, ApiSuccessResponse } from '~/types';

definePageMeta({
  layout: 'auth',
  title: 'recruiter.signup.complete',
  pageName: 'recruiter.signup',
  middleware: [
    function (to, from) {
      const authStore = useAuthStore();
      if (import.meta.server) return;
      if (authStore.stepOneRecruiterForm !== null) return;
      return navigateTo('/');
    },
  ],
});

const toast = useToast();
const router = useRouter();
const authStore = useAuthStore();
const isLoading = ref<boolean>(false);
const isSubmitted = ref<boolean>(false);

const formData = reactive({
  fullName: '',
  email: '',
  password: '',
  companyName: '',
  companySize: '',
  industry: '',
  websiteUrl: '',
});

const rules = computed(() => {
  return {
    fullName: {
      required: helpers.withMessage('Full names is required', required),
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
    companyName: {
      required: helpers.withMessage('Company name is required', required),
    },
    companySize: {
      required: helpers.withMessage('Company size is required', required),
    },
    industry: {
      required: helpers.withMessage('Industry is required', required),
    },
    websiteUrl: {
      required: helpers.withMessage('Website url is required', required),
      url: helpers.withMessage('Must be a valid url', url),
    },
  };
});

const v$ = useVuelidate(rules, formData);

const handleSignup = async () => {
  isLoading.value = true;
  const isValidForm = await v$.value.$validate();
  if (!isValidForm) {
    toast.error('Please fill all fields correctly', {
      timeout: 3000,
      position: POSITION.TOP_RIGHT,
    });

    setTimeout(() => {
      isLoading.value = false;
    }, 2000);
    return;
  }

  // try {
  //   await $fetch('/api/auth/recruiter/register', {
  //     method: 'POST',
  //     body: formData,
  //   });

  //   toast.success('Signup successful, Please login', {
  //     timeout: 3000,
  //     position: POSITION.TOP_RIGHT,
  //   });

  //   setTimeout(() => {
  //     isLoading.value = false;
  //   }, 500);

  //   isSubmitted.value = true
  //   return router.push({
  //     path: '/auth/signin/recruiter',
  //     query: {
  //       email: formData.email,
  //     },
  //   });
  // } catch (error: any) {
  //   const errorData = error.data as ApiErrorResponse;

  //   if (errorData.data?.errorCode === 'E11000') {
  //     toast.error('Email already in use', {
  //       timeout: 3000,
  //       position: POSITION.TOP_RIGHT,
  //     });
  //   } else if (errorData.data?.errorCode === '100001') {
  //     toast.error('Password must be 8 characters long', {
  //       timeout: 3000,
  //       position: POSITION.TOP_RIGHT,
  //     });
  //   } else {
  //     toast.error('An error occurred try again', {
  //       timeout: 3000,
  //       position: POSITION.TOP_RIGHT,
  //     });
  //   }

  //   setTimeout(() => {
  //     isLoading.value = false;
  //   }, 2000);
  // }
};

const resetForm = () => {
  formData.fullName = '';
  formData.email = '';
  formData.password = '';
  formData.companyName = '';
  formData.companySize = '';
  formData.industry = '';
  formData.websiteUrl = '';
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
    if (authStore.stepOneRecruiterForm.companyName !== null) {
      formData.companyName = authStore.stepOneRecruiterForm.companyName;
    }
    if (authStore.stepOneRecruiterForm.companySize !== null) {
      formData.companySize = authStore.stepOneRecruiterForm.companySize;
    }
    if (authStore.stepOneRecruiterForm.websiteUrl !== null) {
      formData.websiteUrl = authStore.stepOneRecruiterForm.websiteUrl;
    }
    if (authStore.stepOneRecruiterForm.industry !== null) {
      formData.industry = authStore.stepOneRecruiterForm.industry;
    }
  }
});

onBeforeRouteLeave(() => {
  if(isSubmitted.value === true){
    authStore.setStepOneFormData(null);
  } else {
    authStore.setStepOneFormData(formData);
  }
  
});
</script>

<template>
  <div class="flex justify-center items-center w-full">
    <div class="md:w-[23.375rem] flex flex-col">
      <h2 class="text-center text-[32px] mb-6 font-['Georgia'] font-normal">
        Signup to account
      </h2>
      <div class="flex flex-col items-center justify-center gap-4 text-[12px]">
        <button
          class="w-full flex gap-4 items-center justify-center border font-light border-[#D0D5DD] border-solid px-5 py-2 text-[#344054] rounded-lg"
        >
          <span class="w-6"
            ><svg
              width="25"
              height="24"
              viewBox="0 0 25 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_1964_13106)">
                <path
                  d="M24.266 12.2764C24.266 11.4607 24.1999 10.6406 24.0588 9.83807H12.74V14.4591H19.2217C18.9528 15.9494 18.0885 17.2678 16.823 18.1056V21.1039H20.69C22.9608 19.0139 24.266 15.9274 24.266 12.2764Z"
                  fill="#4285F4"
                />
                <path
                  d="M12.74 24.0008C15.9764 24.0008 18.7058 22.9382 20.6944 21.1039L16.8274 18.1055C15.7516 18.8375 14.3626 19.252 12.7444 19.252C9.61376 19.252 6.95934 17.1399 6.00693 14.3003H2.01648V17.3912C4.05359 21.4434 8.20278 24.0008 12.74 24.0008Z"
                  fill="#34A853"
                />
                <path
                  d="M6.00253 14.3003C5.49987 12.8099 5.49987 11.1961 6.00253 9.70575V6.61481H2.01649C0.31449 10.0056 0.31449 14.0004 2.01649 17.3912L6.00253 14.3003Z"
                  fill="#FBBC04"
                />
                <path
                  d="M12.74 4.74966C14.4508 4.7232 16.1043 5.36697 17.3433 6.54867L20.7694 3.12262C18.6 1.0855 15.7207 -0.034466 12.74 0.000808666C8.20277 0.000808666 4.05359 2.55822 2.01648 6.61481L6.00252 9.70575C6.95052 6.86173 9.60935 4.74966 12.74 4.74966Z"
                  fill="#EA4335"
                />
              </g>
              <defs>
                <clipPath id="clip0_1964_13106">
                  <rect
                    width="24"
                    height="24"
                    fill="white"
                    transform="translate(0.5)"
                  />
                </clipPath>
              </defs>
            </svg>
          </span>
          Continue with Google
        </button>
        <button
          class="w-full flex gap-3 items-center justify-center font-thin bg-[#0A66C2] px-5 py-2 text-white rounded-lg"
        >
          <span class="w-6">
            <svg
              width="23"
              height="24"
              viewBox="0 0 23 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.000488281 2.14797C0.000488281 1.23861 0.761792 0.500488 1.70026 0.500488H21.2997C22.2386 0.500488 22.9995 1.23861 22.9995 2.14797V21.8523C22.9995 22.7619 22.2386 23.4995 21.2997 23.4995H1.70026C0.761882 23.4995 0.000488281 22.762 0.000488281 21.8526V2.1477V2.14797Z"
                fill="white"
              />
              <path
                d="M6.98966 19.7475V9.39323H3.54807V19.7475H6.99002H6.98966ZM5.26959 7.97978C6.46949 7.97978 7.21651 7.18469 7.21651 6.19106C7.19405 5.17479 6.46949 4.4019 5.29241 4.4019C4.11451 4.4019 3.34521 5.17479 3.34521 6.19097C3.34521 7.1846 4.09196 7.97969 5.24704 7.97969H5.26932L5.26959 7.97978ZM8.89463 19.7475H12.3359V13.9658C12.3359 13.6568 12.3584 13.3469 12.4493 13.1262C12.698 12.5076 13.2643 11.8673 14.2152 11.8673C15.4602 11.8673 15.9586 12.8168 15.9586 14.2088V19.7475H19.3998V13.8107C19.3998 10.6304 17.7022 9.15048 15.4379 9.15048C13.5816 9.15048 12.7663 10.188 12.3133 10.8947H12.3362V9.39359H8.89481C8.93973 10.3649 8.89454 19.7478 8.89454 19.7478L8.89463 19.7475Z"
                fill="#0A66C2"
              />
            </svg>
          </span>
          Continue with LinkedIn
        </button>
      </div>
      <form
        class="flex flex-col mt-6 mx-auto items-start justify-center text-left w-full max-w-md space-y-2"
      >
       <div class="w-full">
        <label class="text-base font-thin mb-2 text-left mt-4"
          >Company Name</label
        >
        <input
          type="text"
          placeholder="Enter company name here"
          v-model="formData.companyName"
          :disabled="isLoading"
          @change="v$.companyName.$touch"
          class="outline-none w-full text-base font-thin placeholder:font-thin placeholder:text-[#958D8D] rounded-lg px-3 py-2 border border-black-200 border-solid"
        />

        <div
              class="input-errors"
              v-for="error of v$.companyName.$errors"
              :key="error.$uid"
            >
              <div class="text-xs text-danger-500">* {{ error.$message }}</div>
            </div>
       </div>
        <!--Company Size -->
        <div class="w-full">
          
          <div class="relative mt-2">
            <label>Comapny Size</label>
    <select 
      v-model="formData.companySize"
      :disabled="isLoading"
      @change="v$.companySize.$touch"
      class="outline-none bg-white w-full text-base font-thin placeholder:font-thin placeholder:text-[#958D8D] rounded-lg px-3 py-2 border border-black-200 border-solid pr-8"
    >
      <option value="" disabled selected>Select company size</option>
      <option value="0-10">0-10</option>
      <option value="11-50">11-50</option>
      <option value="51-100">51-100</option>
      <option value="101-500">101-500</option>
      <option value="500+">500+</option>
    </select>
    <div class="absolute right-3 top-12 transform -translate-y-1/2  pointer-events-none">
      <svg width="14" height="9" viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13.6925 1.94219L7.44254 8.19219C7.38449 8.2503 7.31556 8.2964 7.23969 8.32785C7.16381 8.3593 7.08248 8.37549 7.00035 8.37549C6.91821 8.37549 6.83688 8.3593 6.76101 8.32785C6.68514 8.2964 6.61621 8.2503 6.55816 8.19219L0.30816 1.94219C0.190885 1.82491 0.125 1.66585 0.125 1.5C0.125 1.33415 0.190885 1.17509 0.30816 1.05781C0.425435 0.940537 0.584495 0.874653 0.750347 0.874653C0.9162 0.874653 1.07526 0.940537 1.19253 1.05781L7.00035 6.86641L12.8082 1.05781C12.8662 0.999744 12.9352 0.953681 13.011 0.922254C13.0869 0.890828 13.1682 0.874653 13.2503 0.874653C13.3325 0.874653 13.4138 0.890828 13.4897 0.922254C13.5655 0.953681 13.6345 0.999744 13.6925 1.05781C13.7506 1.11588 13.7967 1.18482 13.8281 1.26069C13.8595 1.33656 13.8757 1.41788 13.8757 1.5C13.8757 1.58212 13.8595 1.66344 13.8281 1.73931C13.7967 1.81518 13.7506 1.88412 13.6925 1.94219Z" fill="#343330"/>
</svg>
    </div>
  </div>

          <div
              class="input-errors"
              v-for="error of v$.companySize.$errors"
              :key="error.$uid"
            >
              <div class="text-xs text-danger-500">* {{ error.$message }}</div>
            </div>
        </div>
        <!--Industry -->

        <div class="w-full">
          <div class="relative mt-2">
          <label class="text-base font-thin mb-2 text-left mt-4">
            Industry
            <select
              v-model="formData.industry"
              :disabled="isLoading"
              @change="v$.industry.$touch"
              class="outline-none mt-2 bg-white w-full text-base font-thin placeholder:font-thin placeholder:text-[#958D8D] rounded-lg px-3 py-2 border border-black-200 border-solid"
            >
              <option value="" disabled selected>Select Industry</option>
              <option value="Accounting & Finance">Accounting & Finance</option>
              <option value="Administration & Office Support">
                Administration & Office Support
              </option>
              <option value="Advertising & Marketing">
                Advertising & Marketing
              </option>
              <option value="Agriculture & Farming">
                Agriculture & Farming
              </option>
              <option value="Arts & Entertainment">Arts & Entertainment</option>
              <option value="Construction & Engineering">
                Construction & Engineering
              </option>
              <option value="Education & Training">Education & Training</option>
              <option value="Healthcare & Medical">Healthcare & Medical</option>
              <option value="Hospitality & Tourism">
                Hospitality & Tourism
              </option>
              <option value="Human Resources">Human Resources</option>
              <option value="Information Technology">
                Information Technology
              </option>
              <option value="Legal">Legal</option>
              <option value="Manufacturing & Production">
                Manufacturing & Production
              </option>
              <option value="Retail">Retail</option>
              <option value="Science & Research">Science & Research</option>
              <option value="Transportation & Logistics">
                Transportation & Logistics
              </option>
              <option value="Telecommunications">Telecommunications</option>
              <option value="Utilities & Energy">Utilities & Energy</option>
              <option value="Real Estate">Real Estate</option>
              <option value="Nonprofit & Charity">Nonprofit & Charity</option>
            </select>
            <div class="absolute right-3 top-[3.3rem] transform -translate-y-1/2  pointer-events-none">
      <svg width="14" height="9" viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13.6925 1.94219L7.44254 8.19219C7.38449 8.2503 7.31556 8.2964 7.23969 8.32785C7.16381 8.3593 7.08248 8.37549 7.00035 8.37549C6.91821 8.37549 6.83688 8.3593 6.76101 8.32785C6.68514 8.2964 6.61621 8.2503 6.55816 8.19219L0.30816 1.94219C0.190885 1.82491 0.125 1.66585 0.125 1.5C0.125 1.33415 0.190885 1.17509 0.30816 1.05781C0.425435 0.940537 0.584495 0.874653 0.750347 0.874653C0.9162 0.874653 1.07526 0.940537 1.19253 1.05781L7.00035 6.86641L12.8082 1.05781C12.8662 0.999744 12.9352 0.953681 13.011 0.922254C13.0869 0.890828 13.1682 0.874653 13.2503 0.874653C13.3325 0.874653 13.4138 0.890828 13.4897 0.922254C13.5655 0.953681 13.6345 0.999744 13.6925 1.05781C13.7506 1.11588 13.7967 1.18482 13.8281 1.26069C13.8595 1.33656 13.8757 1.41788 13.8757 1.5C13.8757 1.58212 13.8595 1.66344 13.8281 1.73931C13.7967 1.81518 13.7506 1.88412 13.6925 1.94219Z" fill="#343330"/>
</svg>
    </div>
          </label>
          </div>


          <div
              class="input-errors"
              v-for="error of v$.industry.$errors"
              :key="error.$uid"
            >
              <div class="text-xs text-danger-500">* {{ error.$message }}</div>
            </div>
        </div>

        <div class="w-full">
          <label class="text-base font-thin mb-2 text-left mt-4"
          >Company Website</label
        >
        <input
          type="url"
          placeholder="Website url"
          v-model="formData.websiteUrl"
          :disabled="isLoading"
          @change="v$.websiteUrl.$touch"
          class="outline-none w-full text-basefont-thin placeholder:font-thin placeholder:text-[#958D8D] rounded-lg px-3 py-2 border border-black-200 border-solid"
        />

          <div
              class="input-errors"
              v-for="error of v$.websiteUrl.$errors"
              :key="error.$uid"
            >
              <div class="text-xs text-danger-500">* {{ error.$message }}</div>
            </div>
        </div>
        <div class="pt-5"></div>
        <div class="w-full flex space-x-2">
          <NuxtLink
            to="/auth/signup/recruiter"
            class="w-1/3 items-center font-light border-[#D0D5DD] text-center border-solid px-5 py-2 text-[#344054] border rounded-lg"
          >
            Back
          </NuxtLink>

          <div class="pt-10"></div>
          <BtnPrimary
            @click="handleSignup()"
            :isLoading="isLoading"
            :disabled="isLoading || v$.$invalid"
          >
            <template #text> Complete Signup </template>
          </BtnPrimary>
        </div>
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
