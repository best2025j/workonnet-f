<script setup lang="ts">
import { POSITION, useToast } from "vue-toastification";
import { required, helpers, email } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import type { ApiErrorResponse } from "~/types";

definePageMeta({
  title: "Recruiter | Join our waitlist",
  pageName: "waitlist",
});

const toast = useToast();
const isLoading = ref<boolean>(false);
const isSubmitted = ref<boolean>(false);

const modalTrigger = ref(null);

const formData = reactive({
  fullName: "",
  email: "",
  userType: LOGGED_IN_USER.JOBSEEKER.toString().toUpperCase(),
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
  };
});

const v$ = useVuelidate(rules, formData);

const handleSubmit = async () => {
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
    await $fetch("/api/waitlist/jobseeker", {
      method: "POST",
      body: formData,
    });

    toast.success("Hurray!!! You're on the List.", {
      timeout: 2000,
      position: POSITION.TOP_RIGHT,
    });

    setTimeout(() => {
      isLoading.value = false;
    }, 500);

    isSubmitted.value = true;

    setTimeout(() => {
      (modalTrigger.value as unknown as any).showModal();
    }, 1500);
  } catch (error: any) {
    const errorData = error.data as ApiErrorResponse;

    toast.error("An error occurred try again", {
      timeout: 3000,
      position: POSITION.TOP_RIGHT,
    });

    setTimeout(() => {
      isLoading.value = false;
    }, 2000);
  }
};
</script>
<template>
  <div class="w-full h-full relative">
    <div class="h-full w-full flex mx-auto justify-around items-center">
      <img src="/assets/images/Vector 5.png" alt="" class="w-full h-full" />
    </div>

    <div
      class="h-full w-full flex mx-auto justify-around items-center absolute top-0"
    >
      <div class="flex flex-col relative">
        <!--  -->
        <div class="absolute -left-24 right-0 -top-32">
          <span>
            <img src="/assets/svgs/polygon5.svg" alt="Polygon Image" />
          </span>
        </div>
        <!--  -->
        <div class="absolute -top-52 ml-[20rem] left-0 -right-80">
          <span>
            <img
              src="/assets/svgs/rocket-red.svg"
              class="w-auto h-auto ml-2"
              alt="Polygon Image"
            />
          </span>
        </div>
        <!--  -->
        <div class="absolute -top-3 ml-[28rem] left-0 -right-80">
          <span>
            <img src="/assets/svgs/eclipse14.svg" alt="Polygon Image" />
          </span>
        </div>
        <!--  -->
        <div class="relative top-16">
          <span>
            <img src="/assets/svgs/folder67.svg" alt="Polygon Image" />
          </span>
        </div>
        <!--  -->
        <div class="relative top-52 -right-72">
          <span>
            <img
              src="/assets/svgs/folder66.svg"
              class="w-auto h-auto pl-24"
              alt="Polygon Image"
            />
          </span>
        </div>
      </div>

      <!--  -->
      <div class="relative left-14 -top-20">
        <span>
          <img src="/assets/svgs/polygon4.svg" alt="Polygon Image" />
        </span>
      </div>

      <div class="flex flex-col relative w-80">
        <!--  -->
        <div class="absolute -top-32 -left-64 right-0">
          <span>
            <img src="/assets/svgs/polygon3.svg" alt="Polygon Image" />
          </span>
        </div>
        <!--  -->
        <div class="absolute -left-32 top-2 right-0">
          <span>
            <img src="/assets/svgs/eclipse13.svg" alt="Polygon Image" />
          </span>
        </div>
        <!--  -->
        <div class="relative left-14 -top-20 right-0">
          <span>
            <img src="/assets/svgs/rocket-blue.svg" alt="Polygon Image" />
          </span>
        </div>
        <!--  -->
        <div>
          <span>
            <img src="/assets/svgs/book-blue.svg" alt="Polygon Image" />
          </span>
        </div>
        <!--  -->
        <div class="relative -left-52 -top-8 right-0">
          <span>
            <img src="/assets/svgs/star-red.svg" alt="Polygon Image" />
          </span>
        </div>
      </div>
    </div>
  </div>

  <div
    class="flex flex-col items-center mx-auto mt-24 md:mt-0 h-full justify-center max-w-[516px] text-center space-y-3 absolute top-0 left-0 right-0"
  >
    <h1
      class="md:text-6xl text-3xl font-black bg-custom-gradient bg-clip-text text-transparent leading-[77px] py-4"
    >
      Coming Soon
    </h1>
    <p class="font-black text-base max-w-[322px]">
      Get started with the easiest and most trusted platform to recruit and find
      jobs online.
    </p>

    <div class="w-full pt-4">
      <div class="w-full">
        <form class="md:py-4 space-y-2">
          <div
            class="pt-2 flex flex-col md:flex-row space-y-2 md:space-y-0 space-x-0 md:space-x-2 w-full"
          >
            <!-- First Input Field -->
            <div class="flex items-start flex-col w-full">
              <label for="fullname" class="text-sm mb-2">Name</label>
              <input
                type="text"
                placeholder="Enter your full names"
                class="pl-2 placeholder:text-sm pr-4 py-3.5 w-full outline-none border bg-transparent border-gray-300 rounded-8"
                v-model="formData.fullName"
                :disabled="isLoading"
                @change="v$.fullName.$touch"
              />

              <div
                class="input-errors"
                v-for="error of v$.fullName.$errors"
                :key="error.$uid"
              >
                <div class="text-xs text-danger-500">
                  * {{ error.$message }}
                </div>
              </div>
            </div>
          </div>
          <!--  -->
          <div
            class="pt-2 flex flex-col md:flex-row space-y-2 md:space-y-0 space-x-0 md:space-x-2"
          >
            <!-- First Input Field -->
            <div class="flex items-start flex-col w-full">
              <label for="first-name" class="text-sm mb-2">Email Address</label>
              <input
                type="email"
                placeholder="Email address..."
                class="pl-2 placeholder:text-sm pr-4 py-3.5 w-full outline-none border bg-transparent border-gray-300 rounded-lg"
                v-model="formData.email"
                :disabled="isLoading"
                @change="v$.email.$touch"
              />

              <div
                class="input-errors"
                v-for="error of v$.email.$errors"
                :key="error.$uid"
              >
                <div class="text-xs text-danger-500">
                  * {{ error.$message }}
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
    <!-- modal button -->
    <div class="w-full py-4">
      <BtnPrimary
        @click="handleSubmit()"
        :isLoading="isLoading"
        :disabled="isLoading || v$.$invalid"
        class="w-full font-black uppercase"
      >
        <template #text> join </template>
      </BtnPrimary>

      <!-- modal -->
      <dialog
        ref="modalTrigger"
        id="my_modal_1"
        class="modal text-black-950 backdrop-blur-sm backdrop-opacity-2 backdrop-filter -top-8"
      >
        <div class="modal-box flex-col max-w-md flex items-center space-y-3">
          <div
            class="flex items-center justify-between w-full pb-3 -mt-3 border-b-2"
          >
            <div class="text-white">no text.</div>
            <h3 class="text-base font-black">Success</h3>

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
          <span class="py-3">
            <svg
              width="100"
              height="100"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M50 9.375C41.9652 9.375 34.1107 11.7576 27.43 16.2215C20.7492 20.6855 15.5422 27.0302 12.4674 34.4535C9.3926 41.8767 8.58809 50.0451 10.1556 57.9255C11.7231 65.806 15.5923 73.0447 21.2738 78.7262C26.9553 84.4077 34.194 88.2769 42.0745 89.8444C49.955 91.4119 58.1233 90.6074 65.5465 87.5326C72.9698 84.4578 79.3145 79.2508 83.7785 72.57C88.2424 65.8893 90.625 58.0349 90.625 50C90.6136 39.2291 86.3299 28.9025 78.7137 21.2863C71.0975 13.6701 60.7709 9.38637 50 9.375ZM67.836 42.8359L45.961 64.7109C45.6707 65.0015 45.3261 65.232 44.9467 65.3893C44.5673 65.5465 44.1607 65.6275 43.75 65.6275C43.3393 65.6275 42.9327 65.5465 42.5533 65.3893C42.174 65.232 41.8293 65.0015 41.5391 64.7109L32.1641 55.3359C31.5777 54.7496 31.2483 53.9543 31.2483 53.125C31.2483 52.2957 31.5777 51.5004 32.1641 50.9141C32.7505 50.3277 33.5458 49.9983 34.375 49.9983C35.2043 49.9983 35.9996 50.3277 36.586 50.9141L43.75 58.082L63.4141 38.4141C63.7044 38.1237 64.0491 37.8934 64.4285 37.7363C64.8078 37.5791 65.2144 37.4983 65.625 37.4983C66.0356 37.4983 66.4422 37.5791 66.8216 37.7363C67.2009 37.8934 67.5456 38.1237 67.836 38.4141C68.1263 38.7044 68.3566 39.0491 68.5137 39.4284C68.6709 39.8078 68.7518 40.2144 68.7518 40.625C68.7518 41.0356 68.6709 41.4422 68.5137 41.8216C68.3566 42.2009 68.1263 42.5456 67.836 42.8359Z"
                fill="#0FA968"
              />
            </svg>
          </span>
          <p class="py-2 text-[32px] font-black text-center leading-8">
            We’ve added you to our waiting list!
          </p>
          <p class="py-2 w-[85%] text-sm text-center">
            We’ll let you know when workonnect starts...
          </p>

          <div class="py-4">
            <NuxtLink
              to="/"
              class="rounded-8 px-4 py-3 text-white text-xs bg-primary-1"
            >
              Back to home page
            </NuxtLink>
          </div>
        </div>
      </dialog>
    </div>

    <div class="absolute bottom-10 text-base -left-[26rem]">
      <h1>Privacy Policy</h1>
    </div>
  </div>
</template>
