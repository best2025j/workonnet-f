<script setup lang="ts">
import { useToast } from 'vue-toastification';
import type { ApiErrorResponse, ApiSuccessResponse, IPricing } from '~/types';

definePageMeta({
  title: 'Pricing',
  pageName: 'dashboard.recruiter.pricing',
  layout: 'dashboard',
  middleware: ['auth', 'is-recruiter'],
});

const isLoading = ref(false);
const authStore = useAuthStore();
const userStore = useUserStore();
const toast = useToast();
const pricingList = ref<IPricing[] | []>([]);
const modalTrigger = ref(null);

const showSubConfirmationModal = async () => {
  (modalTrigger.value as unknown as any).showModal();
};

const subscribeToPlan = (plan: IPricing) => {
  if (plan.frequencyType === 'free') {
    // run free subscription end point
    return;
  }
};

const subscribeToFreePlan = (plan: IPricing) => {}

const getPackages = async () => {
  try {
    isLoading.value = true;
    const token = authStore.userToken;
    const response = await $fetch('/api/subscription/get-all-package', {
      query: {
        forUserType: 'RECRUITER',
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const responseData = response as ApiSuccessResponse;
    pricingList.value = responseData.data;
    setTimeout(() => {
      isLoading.value = false;
    }, 1000);
  } catch (error: any) {
    const errorData = error.data as ApiErrorResponse;

    console.log(error);
    setTimeout(() => {
      isLoading.value = false;
    }, 1000);
  }
};

const getMySubscription = async () => {
  try {
    isLoading.value = true;
    const token = authStore.userToken;
    const response = await $fetch('/api/subscription/recruiter/my-sub', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const responseData = response as ApiSuccessResponse;
    pricingList.value = responseData.data;
    setTimeout(() => {
      isLoading.value = false;
    }, 1000);
  } catch (error: any) {
    const errorData = error.data as ApiErrorResponse;

    console.log(error);
    setTimeout(() => {
      isLoading.value = false;
    }, 1000);
  }
};

onBeforeMount(async () => {
  //
  await getPackages();
});
</script>

<template>
  <div class="text-black-900 pt-6">
    <div
      class="flex flex-col md:flex-row justify-between items-start space-y-2 md:space-y-0 md:items-center"
    >
      <div class="space-y-2">
        <h1 class="font-black text-xl">Plan & Pricing</h1>
        <h1 class="text-sm">Let’s find the top job that we have.</h1>
        <p class="text-sm">
          Simple Pricing No Hidden Fees. Advanced Features for you.
        </p>
      </div>
    </div>
    <div v-if="isLoading" class="w-full">
      <div class="h-40 w-full flex items-center justify-center">
        <span class="loader-2"></span>
      </div>
    </div>
    <div
      v-if="pricingList.length > 0 && !isLoading"
      class="grid md:grid-cols-3 gap-4 py-4"
    >
      <div
        v-for="(pricing, index) in pricingList"
        :key="index"
        class="bg-white md:h-[481px] py-6 p-2 rounded-10 space-y-4 w-full mt-4"
      >
        <div class="flex justify-between items-start">
          <div class="space-y-2">
            <img src="/assets/images/Logo2.png" alt="no pix" />
            <h1 class="text-sm font-black">{{ pricing.packageName }}</h1>
            <h1 class="text-xs">{{ pricing.description }}</h1>
          </div>
          <button
            v-if="pricing.packageName === 'Basic Plan'"
            class="py-2 px-3 border text-xs bg-info-100 text-info-600 rounded-8"
          >
            Custom
          </button>
        </div>

        <div class="flex items-center">
          <h1 class="text-sm font-black">
            ₦{{ formatCurrency(pricing.price) }}
          </h1>
          <h6 class="text-xs">/month</h6>
        </div>

        <!-- <div class="py-4">
          <button
            class="bg-success-100 border font-black py-3 rounded-10 text-xs w-full text-success-600"
          >
            Active
          </button>
        </div> -->

        <div class="py-4">
          <button
            @click="subscribeToPlan(pricing)"
            class="border-primary-1 border bg-westside-100 font-black py-3 rounded-10 text-xs w-full text-primary-1"
          >
            Get Started
          </button>
        </div>
        <!-- checks -->
        <div class="space-y-4 px-2">
          <div
            v-for="(benefit, index) in pricing.benefits"
            :key="index"
            class="flex space-x-4 items-center"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 0.25C8.07164 0.25 6.18657 0.821828 4.58319 1.89317C2.97982 2.96451 1.73013 4.48726 0.992179 6.26884C0.254225 8.05042 0.061142 10.0108 0.437348 11.9021C0.813554 13.7934 1.74215 15.5307 3.10571 16.8943C4.46928 18.2579 6.20656 19.1865 8.09787 19.5627C9.98919 19.9389 11.9496 19.7458 13.7312 19.0078C15.5127 18.2699 17.0355 17.0202 18.1068 15.4168C19.1782 13.8134 19.75 11.9284 19.75 10C19.7473 7.41498 18.7192 4.93661 16.8913 3.10872C15.0634 1.28084 12.585 0.25273 10 0.25ZM14.2806 8.28063L9.03063 13.5306C8.96097 13.6004 8.87826 13.6557 8.78721 13.6934C8.69616 13.7312 8.59857 13.7506 8.5 13.7506C8.40144 13.7506 8.30385 13.7312 8.2128 13.6934C8.12175 13.6557 8.03903 13.6004 7.96938 13.5306L5.71938 11.2806C5.57865 11.1399 5.49959 10.949 5.49959 10.75C5.49959 10.551 5.57865 10.3601 5.71938 10.2194C5.86011 10.0786 6.05098 9.99958 6.25 9.99958C6.44903 9.99958 6.6399 10.0786 6.78063 10.2194L8.5 11.9397L13.2194 7.21937C13.2891 7.14969 13.3718 7.09442 13.4628 7.0567C13.5539 7.01899 13.6515 6.99958 13.75 6.99958C13.8486 6.99958 13.9461 7.01899 14.0372 7.0567C14.1282 7.09442 14.2109 7.14969 14.2806 7.21937C14.3503 7.28906 14.4056 7.37178 14.4433 7.46283C14.481 7.55387 14.5004 7.65145 14.5004 7.75C14.5004 7.84855 14.481 7.94613 14.4433 8.03717C14.4056 8.12822 14.3503 8.21094 14.2806 8.28063Z"
                fill="#0FA968"
              />
            </svg>
            <h1 class="text-xs">{{ benefit }}</h1>
          </div>
        </div>
      </div>
    </div>
    <!--  -->
    <div v-else-if="pricingList.length < 0 && !isLoading" class="w-full">
      <div class="w-full flex items-center justify-center h-40">
        <p class="text-xl">Pricing not available at the moment</p>
      </div>
    </div>
    <!--  -->

    <!-- Sub Modal -->
    <dialog
      ref="modalTrigger"
      id="delete_modal"
      class="modal text-black-950 backdrop-blur-sm backdrop-opacity-2 backdrop-filter"
    >
      <div class="modal-box flex-col max-w-md flex items-center space-y-3">
        <div
          class="flex items-center justify-between w-full pb-3 -mt-3 border-b-2"
        >
          <div class="text-white">no text.</div>
          <h3 class="text-lg font-bold">Subscribe to Plan</h3>

          <form method="dialog">
            <button class="btn">
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M0.726027 0.724657C0.970105 0.480579 1.36583 0.480579 1.60991 0.724657L13.2758 12.3905C13.5199 12.6346 13.5199 13.0303 13.2758 13.2744C13.0317 13.5185 12.636 13.5185 12.3919 13.2744L0.726027 1.60854C0.481949 1.36446 0.481949 0.968734 0.726027 0.724657Z"
                  fill="#57575B"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M13.274 0.724657C13.5181 0.968734 13.5181 1.36446 13.274 1.60854L1.60809 13.2744C1.36401 13.5185 0.968285 13.5185 0.724208 13.2744C0.48013 13.0303 0.480131 12.6346 0.724208 12.3905L12.3901 0.724657C12.6342 0.480579 13.0299 0.480579 13.274 0.724657Z"
                  fill="#57575B"
                />
              </svg>
            </button>
          </form>
        </div>

        <p class="py-2 text-sm text-center">
          Do you want to want to reject this applicant ?
        </p>

        <div class="flex flex-col w-full"></div>

        <div class="space-x-4 flex items-center justify-between w-full">
          <BtnPrimary
            :isLoading="isLoading"
            :disabled="isLoading"
            class="rounded-8 px-3.5 py-2 text-white text-xs bg-primary-1 !flex-1"
          >
            <template #text>
              {{ !isLoading ? 'Yes, Subscribe' : 'Loading...' }}
            </template>
          </BtnPrimary>
          <form method="dialog" class="flex-1">
            <button
              class="md:px-3.5 w-full md:w-full border text-black-600 rounded-8 py-1"
            >
              No, Cancel
            </button>
          </form>
        </div>
      </div>
    </dialog>
    <!-- Modal -->
  </div>
</template>
