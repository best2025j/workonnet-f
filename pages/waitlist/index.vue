<script setup lang="ts">
definePageMeta({
  title: "Join our waitlist",
  pageName: 'waitlist',
})

const router = useRouter();

enum SELECTED_USER_TYPE {
  JOBSEEKER = 'jobseeker',
  RECRUITER = 'recruiter',
}

const selectedUserType = ref<SELECTED_USER_TYPE |  null>(null)

const selectUserType = (selectedType: SELECTED_USER_TYPE) => {
  selectedUserType.value = selectedType
}
</script>
<template>
  <div class="w-full h-full overflow-x-hidden">
    <div
      class="flex flex-col items-center mx-auto h-full justify-center max-w-[516px] text-center space-y-3 p-3"
    >
      <div
        class="flex items-center bg-westside-50 space-x-2 p-1 px-4 rounded-2xl"
      >
        <h1 class="text-sm">Welcome to Workonnect</h1>
        <span
          ><svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.4073 3.45L14.3489 6.60833C14.3406 7.04166 14.6156 7.61666 14.9656 7.875L17.0323 9.44166C18.3573 10.4417 18.1406 11.6667 16.5573 12.1667L13.8656 13.0083C13.4156 13.15 12.9406 13.6417 12.8239 14.1L12.1823 16.55C11.6739 18.4833 10.4073 18.675 9.35726 16.975L7.89059 14.6C7.62392 14.1667 6.99059 13.8417 6.49059 13.8667L3.70726 14.0083C1.71559 14.1083 1.14892 12.9583 2.44892 11.4417L4.09892 9.525C4.40726 9.16666 4.54892 8.5 4.40726 8.05L3.55726 5.35C3.06559 3.76666 3.94892 2.89166 5.52392 3.40833L7.98226 4.21666C8.39892 4.35 9.02392 4.25833 9.37392 4L11.9406 2.15C13.3323 1.15833 14.4406 1.74166 14.4073 3.45Z"
              fill="#FE8900"
            />
            <path
              d="M17.8669 17.0583L15.3419 14.5333C15.1003 14.2917 14.7003 14.2917 14.4586 14.5333C14.2169 14.775 14.2169 15.175 14.4586 15.4167L16.9836 17.9417C17.1086 18.0667 17.2669 18.125 17.4253 18.125C17.5836 18.125 17.7419 18.0667 17.8669 17.9417C18.1086 17.7 18.1086 17.3 17.8669 17.0583Z"
              fill="#FE8900"
            />
          </svg>
        </span>
      </div>
      <hi class="md:text-5xl text-2xl font-black">The Future of Work Powered by AI</hi>
      <div class="flex flex-col pt-8 space-y-6">
        <div>
          <p class="text-sm md:text-xl">To continue, choose a user type that best</p>
          <p class="text-sm md:text-xl">describes you, or what you do</p>
        </div>
        <div class="flex space-x-8">
          <div @click="selectUserType(SELECTED_USER_TYPE.JOBSEEKER)" class="relative cursor-pointer" >
            <img src="/assets/images/waitlist-jobseeker.png" class="rounded-[50px]"  :class="[selectedUserType === SELECTED_USER_TYPE.JOBSEEKER ? 'border-[6px] border-primary-1' : '']" alt="JOBSEEKER" />
            <h1
              class="absolute bottom-8 uppercase left-0 right-0 text-white font-black"
            >
              Job Seeker
            </h1>
          </div>

          <div @click="selectUserType(SELECTED_USER_TYPE.RECRUITER)" class="relative cursor-pointer" >
            <img src="/assets/images/waitlist-recruiter.png" class="rounded-[50px]" :class="[selectedUserType === SELECTED_USER_TYPE.RECRUITER ? 'border-[6px] border-primary-1' : '']" alt="RECRUITER" />
            <h1
              class="absolute bottom-8 uppercase left-0 right-0 text-white font-black"
            >
              Recruiter
            </h1>
          </div>
        </div>
      </div>
      <div class="py-4">
        <BtnPrimary
         @click="router.push(`/waitlist/${selectedUserType}`)"
        :isLoading="false"
        :disabled="selectedUserType === null"
          class="uppercase !px-12"
        >
          <template #text>
            continue
          </template>
        </BtnPrimary>
      </div>
    </div>
  </div>
</template>
