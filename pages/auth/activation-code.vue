<script setup lang="ts">
import { required, helpers, maxLength } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import { useToast, POSITION } from "vue-toastification";
import VOtpInput from "vue3-otp-input";
import type { ApiErrorResponse, ApiSuccessResponse } from "~/types";

definePageMeta({
  title: "Auth Code",
  pageName: "jobseeker.code",
  middleware: ["is-code-exists"],
});

const toast = useToast();
const countDown = ref<number>(60);
const otpInput = ref<InstanceType<typeof VOtpInput> | null>(null);
const isLoading = ref<boolean>(false);
const showPopup = ref<boolean>(false);

const route = useRoute();
const router = useRouter();

const authStore = useAuthStore();
const userStore = useUserStore();

const handleOnComplete = (value: string) => {
  formData.code = value;
};

const handleOnChange = (value: string) => {
  // console.log('OTP changed: ', value);
};

const clearInput = () => {
  otpInput.value?.clearInput();
};

const formData = reactive({
  token: route.query.tk,
  code: "",
});

const rules = computed(() => {
  return {
    token: {
      required: helpers.withMessage("Invalid token", required),
    },
    code: {
      required: helpers.withMessage("Code is required", required),
      maxLength: helpers.withMessage("Please enter a valid code", maxLength(5)),
    },
  };
});

const v$ = useVuelidate(rules, formData);

const getUserProfile = async (token: string) => {
  try {
    const resp = await userStore.$api.refreshAuthUserProfile(token);
    const responseData = resp as ApiSuccessResponse;
    userStore.setUserDetails(responseData)
  } catch (e) {
    console.log(e);
  }
};

const verifyCode = async () => {
  isLoading.value = true;
  const isValidForm = await v$.value.$validate();
  if (!isValidForm) {
    toast.error("Please enter a valid code", {
      timeout: 3000,
      position: POSITION.TOP_RIGHT,
    });

    setTimeout(() => {
      isLoading.value = false;
    }, 2000);
    return;
  }

  try {
    const response = await $fetch("/api/auth/verify-otp", {
      method: "POST",
      body: { ...formData, email: route.query.email },
    });

    showPopup.value = true;
    toast.success("Login successful....", {
      timeout: 2000,
      position: POSITION.TOP_RIGHT,
    });

    const responseData = response as ApiSuccessResponse;

    authStore.setCurrentUserType(LOGGED_IN_USER.JOBSEEKER);
    authStore.setUserAuthData({
      accountType: LOGGED_IN_USER.JOBSEEKER,
      userId: responseData.data.userId,
    });
    authStore.setUserToken(responseData.data.accessToken);
    setTimeout(() => {
      isLoading.value = false;
      showPopup.value = false;
    }, 1000);
    authStore.setLoginSecret(null);

    await getUserProfile(responseData.data.accessToken)
    setTimeout(() => {
      router.push("/dashboard/jobseeker");
    }, 3000);
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

onMounted(() => {
  const interval = setInterval(() => {
    --countDown.value;
  }, 1000);

  watch(countDown, (countDown, oldCount) => {
    if (countDown <= 0) {
      clearInterval(interval);
    }
  });
});
</script>

<template>
  <div class="md:w-1/2 mx-auto h-full">
    <div
      class="flex flex-col items-center justify-center md:w-[23.375rem] mx-auto mt-32 px-6 md:px-0"
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
      <h2 class="mt-3 text-xl font-normal font-['Georgia']">Enter Code</h2>
      <p class="font-thin text-[12px]">
        We sent a code to {{ route.query.email }}
      </p>
      <div class="flex items-center justify-center gap-2 mb-8 mt-8">
        <div class="flex items-center justify-center space-y-6">
          <v-otp-input
            v-model="formData.code"
            @change="v$.code.$touch"
            ref="otpInput"
            input-classes="otp-input"
            separator="&nbsp;"
            :num-inputs="5"
            :should-auto-focus="true"
            :is-input-num="true"
            :conditionalClass="['one', 'two', 'three', 'four', 'five']"
            :placeholder="['0', '0', '0', '0', '0']"
            @on-change="handleOnChange"
            @on-complete="handleOnComplete"
          />
        </div>
      </div>
      <p class="text-xs font-thin mb-10">
        Didn't receive the code?

        <span v-if="countDown > 0">
          Resend Code in {{ countDown }} Second(s)
        </span>
        <button
          v-else
          class="ml-1 cursor-pointer text-black font-semibold rounded-b-sm border-b-2 border-b-black border-b-solid"
        >
          Click to resend
        </button>
      </p>
      <BtnPrimary
        @click="verifyCode()"
        :disabled="isLoading"
        :isLoading="isLoading"
      >
        <template #text>
          {{ !isLoading ? "Continue" : "Verifying Otp..." }}
        </template>
      </BtnPrimary>
    </div>

    <CodePop :isVisible="showPopup" @update:isVisible="showPopup = $event" />
  </div>
</template>
<style>
.otp-input {
  width: 52px;
  height: 52px;
  padding: 8px;
  margin: 0 4px;
  font-weight: 500;
  border-radius: 6px;
  border: 1px solid #d0d5dd;
  text-align: center;
  color: #7f56d9;
  background-color: #fff;
  font-size: 32px;
  line-height: 40px;
  font-family: "Inter";
}

@media (min-width: 640px) {
  .otp-input {
    width: 64px;
    height: 64px;
    padding: 8px;
    margin: 0 4px;
    font-weight: 500;
    border-radius: 8px;
    border: 1px solid #d0d5dd;
    text-align: center;
    color: #7f56d9;
    background-color: #fff;
    font-size: 48px;
    line-height: 60px;
    font-family: "Inter";
  }

  input.otp-input::placeholder {
    font-size: 48px !important;
    text-align: center;
    font-weight: 500;
  }
}

/* Background color of an input field with value */
.otp-input.is-complete {
  background-color: transparent;
  border: 4px solid #f4ebff;
}

.otp-input::-webkit-inner-spin-button,
.otp-input::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input.otp-input::placeholder {
  font-size: 32px;
  text-align: center;
  font-weight: 500;
}

input.otp-input:focus {
  border: 4px solid #f4ebff;
  outline: none;
}
</style>
