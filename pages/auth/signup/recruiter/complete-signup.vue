<script setup lang="ts">
import { POSITION, useToast } from "vue-toastification";
import {
  required,
  helpers,
  email,
  url,
  minLength,
} from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import type { ApiErrorResponse, ApiSuccessResponse } from "~/types";

import { useOneTap, type CredentialResponse } from 'vue3-google-signin';

definePageMeta({
  layout: "auth",
  title: "recruiter.signup.complete",
  pageName: "recruiter.signup",
  middleware: [
    function (to, from) {
      const authStore = useAuthStore();
      if (import.meta.server) return;
      if (authStore.stepOneRecruiterForm !== null) return;
      return navigateTo("/");
    },
  ],
});

const toast = useToast();
const router = useRouter();
const authStore = useAuthStore();
const isLoading = ref<boolean>(false);
const isSubmitted = ref<boolean>(false);
const userStore = useUserStore();

const formData = reactive({
  fullName: "",
  email: "",
  password: "",
  companyName: "",
  companySize: "",
  industry: "",
  websiteUrl: "",
});

const rules = computed(() => {
  return {
    fullName: {
      required: helpers.withMessage("Full names is required", required),
    },
    email: {
      required: helpers.withMessage("Email is required", required),
      email: helpers.withMessage("Enter a valid email", email),
    },
    password: {
      required: helpers.withMessage("Please enter a password", required),
      minLength: helpers.withMessage(
        "Password cannot be less than 8 characters",
        minLength(8)
      ),
    },
    companyName: {
      required: helpers.withMessage("Company name is required", required),
    },
    companySize: {
      required: helpers.withMessage("Company size is required", required),
    },
    industry: {
      required: helpers.withMessage("Industry is required", required),
    },
    websiteUrl: {
      required: helpers.withMessage("Website url is required", required),
      url: helpers.withMessage("Must be a valid url", url),
    },
  };
});

const v$ = useVuelidate(rules, formData);

const updateIsLoading  = (value: boolean) => {
  isLoading.value = value
}

const handleSignup = async () => {
  isLoading.value = true;
  const isValidForm = await v$.value.$validate();
  if (!isValidForm) {
    toast.error("Please fill all fields correctly", {
      timeout: 3000,
      position: POSITION.TOP_RIGHT,
    });

    setTimeout(() => {
      isLoading.value = false;
    }, 2000);
    return;
  }


  try {
    await $fetch("/api/auth/recruiter/register", {
      method: "POST",
      body: formData,
    });

    toast.success("Signup successful, Please login", {
      timeout: 3000,
      position: POSITION.TOP_RIGHT,
    });

    setTimeout(() => {
      isLoading.value = false;
    }, 500);

    isSubmitted.value = true;

    // TODO:// Login INSTEAD
    return router.push({
      path: "/auth/signin/recruiter",
      query: {
        email: formData.email,
      },
    });
  } catch (error: any) {
    const errorData = error.data as ApiErrorResponse;

    if (errorData.data?.errorCode === 'E11000') {
      toast.error(errorData.data.message, {
        timeout: 3000,
        position: POSITION.TOP_RIGHT,
      });
    } else if (errorData.data?.errorCode === "100001") {
      toast.error("Password must be 8 characters long", {
        timeout: 3000,
        position: POSITION.TOP_RIGHT,
      });
    } else {
      toast.error("An error occurred try again", {
        timeout: 3000,
        position: POSITION.TOP_RIGHT,
      });
    }

    setTimeout(() => {
      isLoading.value = false;
    }, 2000);
  }
};

const resetForm = () => {
  formData.fullName = "";
  formData.email = "";
  formData.password = "";
  formData.companyName = "";
  formData.companySize = "";
  formData.industry = "";
  formData.websiteUrl = "";
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
  if (isSubmitted.value === true) {
    authStore.setStepOneFormData(null);
  } else {
    authStore.setStepOneFormData(formData);
  }
});

</script>

<template>
  <div class="flex justify-center items-center w-full px-6 md:px-0">
    <div class="md:w-[23.375rem] flex flex-col">
      <h2
        class="text-center text-2xl md:text-[32px] mb-6 font-['Georgia'] font-normal"
      >
        Signup to account
      </h2>
      <AuthSocialRecruiterAuth v-on:update:isLoading="updateIsLoading" />
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
            class="outline-none w-full text-base font-thin placeholder:font-thin placeholder:text-[#958D8D] rounded-lg px-3 py-2.5 border border-black-200 border-solid"
          />
          <div
            class="input-errors"
            v-for="error of v$.companyName.$errors"
            :key="error.$uid"
          >
            <span class="text-xs text-danger-500">* {{ error.$message }}</span>
          </div>
        </div>
        <!--Company Size -->
        <div class="w-full">
          <label class="text-base font-thin mb-2 text-left mt-4"
            >Company Size
            <div class="relative">
    <select
      v-model="formData.companySize"
      :disabled="isLoading"
      @change="v$.companySize.$touch"
      class="mt-2 bg-white w-full text-base font-thin focus:outline-none placeholder:font-thin placeholder:text-[#958D8D] rounded-lg px-3 py-2.5 border border-black-200 border-solid appearance-none"
    >
      <option value="" disabled selected>Select company size</option>
      <option value="0-10">0-10</option>
      <option value="11-50">11-50</option>
      <option value="51-100">51-100</option>
      <option value="101-500">101-500</option>
      <option value="500+">500+</option>
    </select>
    <span class="absolute right-3 top-[62%] transform -translate-y-1/2 pointer-events-none">
      <svg width="16" height="9" viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13.6925 1.94218L7.44254 8.19218C7.38449 8.25029 7.31556 8.29639 7.23969 8.32785C7.16381 8.3593 7.08248 8.37549 7.00035 8.37549C6.91821 8.37549 6.83688 8.3593 6.76101 8.32785C6.68514 8.29639 6.61621 8.25029 6.55816 8.19218L0.30816 1.94218C0.190885 1.82491 0.125 1.66585 0.125 1.5C0.125 1.33414 0.190885 1.17508 0.30816 1.05781C0.425435 0.940533 0.584495 0.874649 0.750347 0.874649C0.9162 0.874649 1.07526 0.940533 1.19253 1.05781L7.00035 6.8664L12.8082 1.05781C12.8662 0.99974 12.9352 0.953677 13.011 0.922251C13.0869 0.890824 13.1682 0.874649 13.2503 0.874649C13.3325 0.874649 13.4138 0.890824 13.4897 0.922251C13.5655 0.953677 13.6345 0.99974 13.6925 1.05781C13.7506 1.11588 13.7967 1.18482 13.8281 1.26069C13.8595 1.33656 13.8757 1.41787 13.8757 1.5C13.8757 1.58212 13.8595 1.66344 13.8281 1.73931C13.7967 1.81518 13.7506 1.88412 13.6925 1.94218Z" fill="#343330"/>
</svg>

    </span>
  </div>
          </label>

          <div
            class="input-errors"
            v-for="error of v$.companySize.$errors"
            :key="error.$uid"
          >
            <span class="text-xs text-danger-500">* {{ error.$message }}</span>
          </div>
        </div>
        <!--Industry -->
        <div class="w-full">
          <label class="text-base font-thin mb-2 text-left mt-4">
            Industry
            <div class="relative">
            <select
              v-model="formData.industry"
              :disabled="isLoading"
              @change="v$.industry.$touch"
              class="outline-none mt-2 bg-white w-full text-base font-thin placeholder:font-thin placeholder:text-[#958D8D] rounded-lg px-3 py-2.5 border border-black-200 border-solid"
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
            <span class="absolute right-3 top-[62%] transform -translate-y-1/2 pointer-events-none">
      <svg width="16" height="9" viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13.6925 1.94218L7.44254 8.19218C7.38449 8.25029 7.31556 8.29639 7.23969 8.32785C7.16381 8.3593 7.08248 8.37549 7.00035 8.37549C6.91821 8.37549 6.83688 8.3593 6.76101 8.32785C6.68514 8.29639 6.61621 8.25029 6.55816 8.19218L0.30816 1.94218C0.190885 1.82491 0.125 1.66585 0.125 1.5C0.125 1.33414 0.190885 1.17508 0.30816 1.05781C0.425435 0.940533 0.584495 0.874649 0.750347 0.874649C0.9162 0.874649 1.07526 0.940533 1.19253 1.05781L7.00035 6.8664L12.8082 1.05781C12.8662 0.99974 12.9352 0.953677 13.011 0.922251C13.0869 0.890824 13.1682 0.874649 13.2503 0.874649C13.3325 0.874649 13.4138 0.890824 13.4897 0.922251C13.5655 0.953677 13.6345 0.99974 13.6925 1.05781C13.7506 1.11588 13.7967 1.18482 13.8281 1.26069C13.8595 1.33656 13.8757 1.41787 13.8757 1.5C13.8757 1.58212 13.8595 1.66344 13.8281 1.73931C13.7967 1.81518 13.7506 1.88412 13.6925 1.94218Z" fill="#343330"/>
</svg>

    </span>
  </div>
          </label>

          <div
            class="input-errors"
            v-for="error of v$.industry.$errors"
            :key="error.$uid"
          >
            <span class="text-xs text-danger-500">* {{ error.$message }}</span>
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
            class="outline-none w-full text-basefont-thin placeholder:font-thin placeholder:text-[#958D8D] rounded-lg px-3 py-2.5 border border-black-200 border-solid"
          />

          <div
            class="input-errors"
            v-for="error of v$.websiteUrl.$errors"
            :key="error.$uid"
          >
            <span class="text-xs text-danger-500">* {{ error.$message }}</span>
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
            :disabled="isLoading "
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
