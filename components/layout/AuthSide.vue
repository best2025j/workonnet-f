<script setup lang="ts">
const route = useRoute();

const title = computed(() => route.meta.title as string)
</script>
<template>
  <div class="bg-custom-gradient max-w-[545px] rounded-lg">
    <div class="flex items-center justify-center gap-10 mx-4 pt-10">
      <h1 class="text-[34.33px] font-['Georgia'] font-normal text-white mx-6">
        {{
          title.includes("recruiter")
            ? "Recruiting Executive Talents"
            : "What Our Jobseekers Said."
        }}
      </h1>
      <span>
        <svg
          width="95"
          height="84"
          viewBox="0 0 95 84"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M38.4949 23.8169C38.4949 31.2094 35.9659 40.1583 30.9079 50.6635C26.0443 60.9741 18.6518 71.8684 8.73022 83.3463L2.01857 77.5101C8.63295 69.5339 13.2047 62.4332 15.7337 56.2079C18.4573 49.9826 19.9163 44.2437 20.1109 38.9911H19.2354C13.5937 38.9911 9.02203 37.2402 5.5203 33.7385C2.01857 30.2367 0.2677 25.5677 0.2677 19.7315C0.2677 14.0898 2.01857 9.51813 5.5203 6.01639C9.02203 2.51466 13.5937 0.763794 19.2354 0.763794C24.8771 0.763794 29.4488 2.80647 32.9505 6.89183C36.6468 10.7826 38.4949 16.4243 38.4949 23.8169ZM94.8145 23.8169C94.8145 31.2094 92.2854 40.1583 87.2274 50.6635C82.3639 60.9741 74.9713 71.8684 65.0498 83.3463L58.3381 77.5101C64.9525 69.5339 69.5242 62.4332 72.0532 56.2079C74.7768 49.9826 76.2358 44.2437 76.4304 38.9911H75.555C69.9133 38.9911 65.3416 37.2402 61.8398 33.7385C58.3381 30.2367 56.5872 25.5677 56.5872 19.7315C56.5872 14.0898 58.3381 9.51813 61.8398 6.01639C65.3416 2.51466 69.9133 0.763794 75.555 0.763794C81.1966 0.763794 85.7683 2.80647 89.2701 6.89183C92.9663 10.7826 94.8145 16.4243 94.8145 23.8169Z"
            fill="white"
            fill-opacity="0.2"
          />
        </svg>
      </span>
    </div>
    <LayoutRecruiterTestimonials
      v-if="title.includes('recruiter')"
    />
    <LayoutJobSeekerTestimonials
      v-if="title.includes('jobseeker')"
    />
    <div class="w-[85%] mt-10 mx-10 mb-5 rounded-tr-15%]">
      <img src="../../assets/svgs/Frame1618869200.svg" alt="" />
    </div>
  </div>
</template>
