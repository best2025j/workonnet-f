<script setup lang="ts">
import { POSITION, useToast } from "vue-toastification";
import { required, helpers, email } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import type { ApiErrorResponse, ApiSuccessResponse } from "~/types";

definePageMeta({
  layout: "auth",
  title: "recruiter.signin",
  pageName: "recruiter.signin",
  middleware: ["no-auth"],
});

const router = useRouter();
const route = useRoute();
const toast = useToast();
const isLoading = ref<boolean>(false);
const authStore = useAuthStore();
const userStore = useUserStore();

const updateIsLoading  = (value: boolean) => {
  isLoading.value = value
}

const formData = reactive({
  email: route.query?.email ? route.query?.email : "",
  password: "",
});

const rules = computed(() => {
  return {
    email: {
      required: helpers.withMessage("Email is required", required),
      email: helpers.withMessage("Enter a valid email", email),
    },
    password: {
      required: helpers.withMessage("Please enter a password", required),
    },
  };
});
//password visibility
const showPassword = ref(false);
function toggleShowPassword() {
  showPassword.value = !showPassword.value;
}

const v$ = useVuelidate(rules, formData);

const getRecruiterProfile = async (token: string) => {
  try {
    const resp = await userStore.$api.refreshAuthRecruiterProfile(token);
    const responseData = resp as ApiSuccessResponse;
    userStore.setUserDetails(responseData);
  } catch (e) {
    console.log(e);
  }
};

const loginRecruiter = async () => {
  isLoading.value = true;
  const isValidForm = await v$.value.$validate();
  if (!isValidForm) {
    toast.error("Please enter a valid email or password", {
      timeout: 3000,
      position: POSITION.TOP_RIGHT,
    });

    setTimeout(() => {
      isLoading.value = false;
    }, 2000);
    return;
  }

  try {
    const response = await $fetch("/api/auth/recruiter/authenticate", {
      method: "POST",
      body: formData,
    });

    toast.success("Signin successful", {
      timeout: 3000,
      position: POSITION.TOP_RIGHT,
    });

    const responseData = response as ApiSuccessResponse;

    authStore.setCurrentUserType(LOGGED_IN_USER.RECRUITER);
    authStore.setUserAuthData({
      accountType: LOGGED_IN_USER.RECRUITER,
      recruiterId: responseData.data.recruiterId,
    });

    authStore.setUserToken(responseData.data.accessToken);

    await getRecruiterProfile(responseData.data.accessToken);
    setTimeout(() => {
      isLoading.value = false;
    }, 1000);

    return router.push("/dashboard/recruiter");
  } catch (error: any) {
    const errorData = error.data as ApiErrorResponse;

    if (errorData.data?.errorCode === "CI0001") {
      toast.error(errorData.data.message, {
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

</script>

<template>
  <div class="flex justify-center items-center w-full px-6 md:px-0">
    <div class="md:w-[23.375rem] w-full flex flex-col">
      <h2
        class="text-center text-2xl md:text-[32px] mb-6 font-[Georgia] font-normal"
      >
        Continue to account
      </h2>
      <AuthSocialRecruiterAuth v-on:update:isLoading="updateIsLoading" />
      <form
        class="flex flex-col mt-6 mx-auto items-start justify-center text-left w-full max-w-md"
      >
        <label class="text-base font-thin mb-2 text-left mt-4">Email
          <span class="text-red-500 text-xl">*</span>
        </label>
        <input
          type="email"
          placeholder="Enter email address here"
          required
          v-model="formData.email"
          :disabled="isLoading"
          @change="v$.email.$touch"
          class="outline-none w-full text-base placeholder:text-[#958D8D] rounded-md px-3 py-2.5 border border-black-200 border-solid"
        />

        <label class="text-base font-thin mb-2 text-left mt-4">Password
          <span class="text-red-500 text-xl">*</span>
        </label>
        <div class="relative w-full">
            <input
            :type="showPassword ? 'text' : 'password'"
            placeholder="Enter password"
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
          </div>

        <div class="flex justify-end w-full mt-2">
          <NuxtLink
            class="text-sm text-black underline cursor-pointer"
            to="/auth/password-forgotten?reqId=recruiter"
            >Forgot password?</NuxtLink
          >
        </div>
        <div class="mt-10"></div>
        <BtnPrimary
          @click="loginRecruiter()"
          :isLoading="isLoading"
          :disabled="isLoading "
        >
          <template #text>
            {{ !isLoading ? "Sign in" : "Please wait..." }}
          </template>
        </BtnPrimary>
      </form>

      <p class="text-center pt-10 pb-4 text-sm font-thin">
        Don't have an account?
        <NuxtLink to="/auth/signup/recruiter" class="font-thin text-[#007AFF]"
          >Sign up</NuxtLink
        >
      </p>
    </div>
  </div>
</template>
