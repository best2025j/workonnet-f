<script setup>
import googleLogo from "@/assets/images/googlelogo.png";
import linkedinlogo from "@/assets/images/linkedin.png";
import asterix from "@/assets/images/”.png";
import jobseeker from "@/assets/images/Frame 1618869200.svg";
import arrowleft from "@/assets/images/arrowright.png";
import arrowright from "@/assets/images/arrowleft.png";
import { ref } from "vue";

const testimonials = [
  {
    name: "John Doe",
    message:
      "Searching and finding your dream job is now easier than ever. Get AI recommended Job Match, Apply and Get Accepted",
    occupation: "UI/UX Designer",
  },
  {
    name: "Jane Smith",
    message: "I absolutely love it!",
    occupation: "UI/UX Designer",
  },
  {
    name: "Alice Johnson",
    message: "Highly recommend to everyone!",
    occupation: "UI/UX Designer",
  },
  // Add more testimonials as needed
];

const currentIndex = ref(0);

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % testimonials.length;
};

const prevSlide = () => {
  currentIndex.value =
    (currentIndex.value - 1 + testimonials.length) % testimonials.length;
};
</script>

<template>
  <section>
    <div class="flex items-center justify-center gap-4 mb-32 mt-14 mx-2">
      <div class="flex flex-col -mt-20 w-full">
        <h2 class="text-center text-3xl mb-10 font-['Georgia'] font-normal">
          Create Account
        </h2>
        <div class="flex flex-col items-center justify-center gap-5">
          <button
            class="flex gap-4 items-center justify-center text-[12px] font-thin border-2 border-[#D0D5DD] border-solid w-[374px] h-10 text-[#344054] rounded-md"
          >
            <img :src="googleLogo" alt="" class="w-6" />
            Continue with Google
          </button>
          <button
            class="flex gap-3 items-center justify-center bg-[#0A66C2] font-thin text-[12px] w-[374px] h-10 text-white rounded-md"
          >
            <img :src="linkedinlogo" alt="" class="w-6" />
            Continue with LinkedIn
          </button>
        </div>
        <form
          class="flex flex-col mt-6 mx-auto items-start justify-center text-left w-[50%] max-w-md"
        >
          <label class="text-sm font-thin mb-2 text-left mt-4"
            >Full Name
          </label>
          <input
            type="email"
            placeholder="Enter full name here"
            class="outline-none w-full text-[12px] font-thin placehoder:font-thin placehoder:text-[#958D8D] rounded-md px-3 py-2 border-2 border-black-200 border-solid"
          />

          <label class="text-sm font-thin mb-2 text-left mt-4">Email </label>
          <input
            type="email"
            placeholder="Enter email address here"
            class="outline-none w-full text-[12px] font-thin placehoder:font-thin placehoder:text-[#958D8D] rounded-md px-3 py-2 border-2 border-black-200 border-solid"
          />

          <label class="text-sm font-thin mb-2 text-left mt-4"
            >Create Password
          </label>
          <input
            type="password"
            class="placeholder-custom outline-none w-full px-3 font-thin placehoder:font-thin placehoder:text-[#d9d9d9] rounded-md py-2 border-2 border-black-200 border-solid"
          />

          <button
            class="h-12 bg-[#FE8900] font-black text-white mt-20 text-sm w-[375px] rounded-md"
          >
            <NuxtLink to="/auth/activation-code"> Create Account</NuxtLink>
          </button>
        </form>
        <p class="text-center mt-10 mb-5 text-sm font-thin">
          Already have an account?
          <NuxtLink to="/auth/signin" class="font-thin text-[#007AFF]"
            >Sign In</NuxtLink
          >
        </p>
      </div>

      <div class="bg-custom-gradient w-[75%] mr-16 rounded-xl">
        <div class="flex items-center justify-center gap-10 mx-3 mt-10">
          <h1
            class="text-[34.33px] font-['Georgia'] font-normal text-white mx-6"
          >
            What Our Jobseekers Said.
          </h1>
          <img :src="asterix" alt="" />
        </div>

        <div class="relative flex flex-col">
          <div class="overflow-hidden">
            <div
              class="flex transition-transform duration-300"
              :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
            >
              <div
                v-for="(testimonial, index) in testimonials"
                :key="index"
                class="flex-none w-full mt-10 mb-6 p-4 pl-10"
              >
                <p class="text-lg text-white mb-6 font-thin">
                  "{{ testimonial.message }} "
                </p>
                <p class="mt-2 font-black text-white">
                  {{ testimonial.name }}
                </p>
                <p class="text-white font-thin">{{ testimonial.occupation }}</p>
              </div>
            </div>
          </div>
          <div class="mx-10">
            <button
              @click="prevSlide"
              class="btn transform mr-5 -translate-y-1/2 p-2 text-white bg-white"
            >
              <img :src="arrowleft" alt="" class="absolute left-3 top-4" />
            </button>
            <button
              @click="nextSlide"
              class="btn transform -translate-y-1/2 p-2 text-white bg-[#B7680C]"
            >
              <img :src="arrowright" alt="" class="absolute left-3 top-4" />
            </button>
          </div>
        </div>

        <div class="w-[85%] mt-10 mx-10 mb-5 rounded-tr-15%]">
          <img :src="jobseeker" alt="" />
        </div>
      </div>
    </div>
  </section>
</template>
<style scoped>
.btn {
  width: 2.5rem;
  height: 2.5rem;
}

.placeholder-custom::placeholder {
  font-size: 2rem;
  color: #d9d9d9;
}
</style>
