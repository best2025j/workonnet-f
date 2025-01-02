<script setup lang="ts">
definePageMeta({
  title: 'Pricing Jobseekers',
  pageName: 'pricing.jobseekers',
});
</script>
<template>
  <main class="pt-16 pl-16 bg-white pb-20 overflow-x-hidden sm:pl-3 md:pl-10">
    <section class="flex flex-col items-start justify-start">
      <h2 class="font-text font-semibold text-[24px] pb-2">Plan & Pricing</h2>
      <p class="font-light text-sm pb-2">
        Let’s find the top job that we have.
      </p>
      <p class="font-light text-sm pb-2">
        Simple Pricing No Hidden Fees. Advanced Features for you.
      </p>

      <div
        class="grid grid-cols-3 gap-2 place-items-center mt-14 md:mb-32 md:gap-3 md:grid-cols-2 lg:grid-cols-3 sm:grid-cols-1"
      >
        <div class="flex flex-col items-start justify-start px-3">
          <div
            class="flex items-center justify-between mb-4 w-[25rem] sm:w-[20rem]"
          >
            <img src="/assets/images/Logo2.png" alt="" loading="lazy" />
            <button
              class="bg-[#D1EFFF] rounded-[10px] text-[#006EFF] font-light text-xs -mt-10 px-4 py-2"
            >
              Custom
            </button>
          </div>
          <h2 class="font-semibold">Free Plan</h2>
          <p class="font-light mt-1 text-xs mb-5">
            These are the benefits under free plan
          </p>
          <h2 class="font-semibold text-[24px] mb-5">
            ₦0.00<span class="font-light text-sm">/month</span>
          </h2>
           <NuxtLink
            to="/auth/signin/jobseeker"
            class="bg-[#FFFBEC] text-primary-1 border-[#FE8900] border-2 border-solid rounded-8 px-40 sm:px-[8rem] md:px-32 py-3 text-xs font-bold transition duration-300"
          >
            Get Started
        </NuxtLink>
          <div class="flex items-center justify-center gap-4 mb-3 mt-5">
            <img src="/assets/images/Vector.png" alt="" class="w-7" />
            <p class="text-xs font-light">Profile Creation</p>
          </div>
          <div class="flex items-center justify-center gap-4 mb-3">
            <img src="/assets/images/Vector.png" alt="" class="w-7" />
            <p class="text-xs font-light">
              Limited Job Applications: <span>5 applications</span>
            </p>
          </div>
          <div class="flex items-center justify-center gap-4 mb-3">
            <img src="/assets/images/Vector.png" alt="" class="w-7" />
            <p class="text-xs font-light">Basic Visibility</p>
          </div>
          <div class="flex items-center justify-center gap-4 mb-3">
            <img src="/assets/images/Vector.png" alt="" class="w-7" />
            <p class="text-xs font-light">Standard AI Customer Support</p>
          </div>
          <div class="flex items-center justify-center gap-4 mb-3">
            <img src="/assets/images/Vector.png" alt="" class="w-7" />
            <p class="text-xs font-light">
              Access to virtual networking events or webinars
            </p>
          </div>
          <div class="flex items-center justify-center gap-4 mb-3">
            <img src="/assets/images/Vector.png" alt="" class="w-7" />
            <p class="text-xs font-light">Interview Preparation Resources</p>
          </div>
        </div>

        <div class="flex flex-col items-start justify-start mt-24 pl-3 sm:pl-6">
          <img
            src="/assets/images/Logo2.png"
            alt=""
            class="mb-5"
            loading="lazy"
          />

          <h2 class="font-semibold">Basic Plan</h2>
          <p class="font-light mt-1 text-xs mb-5">
            These are the benefits under basic plan
          </p>
          <h2 class="font-semibold text-[24px] mb-5">
            ₦1,500<span class="font-light text-sm">/month</span>
          </h2>
          <NuxtLink
            to="/auth/signin/jobseeker"
            class="bg-[#FFFBEC] text-primary-1 border-[#FE8900] border-2 border-solid rounded-8 px-40 sm:px-[8rem] md:px-32 py-3 text-xs font-bold transition duration-300"
          >
            Get Started
        </NuxtLink>
          <div class="flex items-center justify-center gap-4 mb-3 mt-5">
            <img src="/assets/images/Vector.png" alt="" class="w-7" />
            <p class="text-xs font-light">Enhanced Profile Visibility</p>
          </div>
          <div class="flex items-center justify-center gap-4 mb-3">
            <img src="/assets/images/Vector.png" alt="" class="w-7" />
            <p class="text-xs font-light">10 Job Applications</p>
          </div>
          <div class="flex items-center justify-center gap-4 mb-3">
            <img src="/assets/images/Vector.png" alt="" class="w-7" />
            <p class="text-xs font-light">Video Pitch Feature (Limited)</p>
          </div>
          <div class="flex items-center justify-center gap-4 mb-3">
            <img src="/assets/images/Vector.png" alt="" class="w-7" />
            <p class="text-xs font-light">1 Live Interview Training Booth</p>
          </div>
          <div class="flex items-center justify-center gap-4 mb-3">
            <img src="/assets/images/Vector.png" alt="" class="w-7" />
            <p class="text-xs font-light">Standard Analytics</p>
          </div>
          <div class="flex items-center justify-center gap-4 mb-3">
            <img src="/assets/images/Vector.png" alt="" class="w-7" />
            <p class="text-xs font-light">Standard AI Support and Coaching</p>
          </div>
          <div class="flex items-center justify-center gap-4 mb-3">
            <img src="/assets/images/Vector.png" alt="" class="w-7" />
            <p class="text-xs font-light pr-10">
              Exclusive access to virtual networking events or webinars
            </p>
          </div>
          <div class="flex items-center justify-center gap-4 mb-3">
            <img src="/assets/images/Vector.png" alt="" class="w-7" />
            <p class="text-xs font-light">Resume Builder Assistance</p>
          </div>
          <div class="flex items-center justify-center gap-4 mb-3">
            <img src="/assets/images/Vector.png" alt="" class="w-7" />
            <p class="text-xs font-light">Interview Preparation Resources</p>
          </div>
        </div>

        <div
          class="flex flex-col items-start justify-start mx-16 px-3 -mb-52 lg:-mt-2 md:mt-14 sm:mt-20 sm:mb-20"
        >
          <div
            class="flex items-center justify-between mb-4 w-[25rem] sm:w-[19rem]"
          >
            <img src="/assets/images/Logo2.png" alt="" loading="lazy" />
            <button
              class="bg-[#D1EFFF] rounded-[10px] text-[#006EFF] font-light text-xs -mt-10 px-4 py-2"
            >
              Recommended
            </button>
          </div>
          <h2 class="font-semibold">Premium Plan</h2>
          <p class="font-light mt-1 text-xs mb-5">
            These are the benefits under premium plan
          </p>
          <h2 class="font-semibold text-[24px] mb-5">
            ₦5,000.00<span class="font-light text-sm">/month</span>
          </h2>
          <NuxtLink
            to="/auth/signin/jobseeker"
            class="bg-[#FFFBEC] text-primary-1 border-[#FE8900] border-2 border-solid rounded-8 px-40 sm:px-[8rem] md:px-32 py-3 text-xs font-bold transition duration-300"
          >
            Get Started
        </NuxtLink>
          <div class="flex items-center justify-center gap-4 mb-3 mt-5">
            <img src="/assets/images/Vector.png" alt="" class="w-7" />
            <p class="text-xs font-light">Enhanced Profile Visibility</p>
          </div>
          <div class="flex items-center justify-center gap-4 mb-3">
            <img src="/assets/images/Vector.png" alt="" class="w-7" />
            <p class="text-xs font-light">Unlimited Job Applications</p>
          </div>
          <div class="flex items-center justify-center gap-4 mb-3">
            <img src="/assets/images/Vector.png" alt="" class="w-7" />
            <p class="text-xs font-light">Video Pitch Feature</p>
          </div>
          <div class="flex items-center justify-center gap-4 mb-3">
            <img src="/assets/images/Vector.png" alt="" class="w-7" />
            <p class="text-xs font-light">
              Advanced Analytics into recruiters ranking
            </p>
          </div>
          <div class="flex items-center justify-center gap-4 mb-3">
            <img src="/assets/images/Vector.png" alt="" class="w-7" />
            <p class="text-xs font-light">
              Assessment & Screening Tools insight
            </p>
          </div>
          <div class="flex items-center justify-center gap-4 mb-3">
            <img src="/assets/images/Vector.png" alt="" class="w-7" />
            <p class="text-xs font-light">Instant Job Notifications</p>
          </div>
          <div class="flex items-center justify-center gap-4 mb-3">
            <img src="/assets/images/Vector.png" alt="" class="w-7" />
            <p class="text-xs font-light">Dedicated Al Customer Support</p>
          </div>
          <div class="flex items-center justify-center gap-4 mb-3">
            <img src="/assets/images/Vector.png" alt="" class="w-7" />
            <p class="text-xs font-light">
              Resume Exclusive access to virtual networking events or webinars
              Builder Assistance
            </p>
          </div>
          <div class="flex items-center justify-center gap-4 mb-3">
            <img src="/assets/images/Vector.png" alt="" class="w-7" />
            <p class="text-xs font-light">Gamified Certification Programs</p>
          </div>
          <div class="flex items-center justify-center gap-4 mb-3">
            <img src="/assets/images/Vector.png" alt="" class="w-7" />
            <p class="text-xs font-light">Psychometric test</p>
          </div>
          <div class="flex items-center justify-center gap-4 mb-3">
            <img src="/assets/images/Vector.png" alt="" class="w-7" />
            <p class="text-xs font-light">2 Live Interview Preparation</p>
          </div>
        </div>
      </div>
    </section>
  </main>
  <div>
    <LandingPageFooter />
  </div>
</template>

<style scoped>
body {
  background: white;
}
</style>
