<script setup>
import googleLogo from '@/assets/images/googlelogo.png';
import linkedinlogo from '@/assets/images/linkedin.png';
import asterix from '@/assets/images/”.png';
import jobseeker from '@/assets/images/Frame 1618869200.png';
import arrowleft from '@/assets/images/arrowright.png';
import arrowright from '@/assets/images/arrowleft.png';
import { ref } from 'vue';

const testimonials = [
  {
    name: 'John Doe',
    message:
      'Searching and finding your dream job is now easier than ever. Get AI recommended Job Match, Apply and Get Accepted',
    occupation: 'UI/UX Designer',
  },
  {
    name: 'Jane Smith',
    message: 'I absolutely love it!',
    occupation: 'UI/UX Designer',
  },
  {
    name: 'Alice Johnson',
    message: 'Highly recommend to everyone!',
    occupation: 'UI/UX Designer',
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
    <div class="flex items-center justify-center gap-4 mb-10 mt-14 mx-2">
      <div class="flex flex-col w-full">
        <h2 class="text-center text-4xl mb-10 font-['Nexa'] font-black">
          Create Account
        </h2>
        <div class="flex flex-col items-center justify-center gap-8 mt-5">
          <button
            class="flex gap-4 items-center justify-center font-['Nexa'] border-2 border-[#344054] border-solid px-5 py-2 w-1/2 text-[#344054] rounded-md"
          >
            <img :src="googleLogo" alt="" class="w-6" />
            Continue with Google
          </button>
          <button
            class="flex gap-3 items-center justify-center font-['Nexa'] bg-[#0A66C2] px-5 py-2 w-1/2 text-white rounded-md"
          >
            <img :src="linkedinlogo" alt="" class="w-8" />
            Continue with LinkedIn
          </button>
        </div>
        <form
          class="flex flex-col mt-6 mx-auto items-start justify-center text-left w-[50%] max-w-md"
        >
          <label
            class="text-xl font-extralight mb-2 text-left mt-4 font-['Nexa']"
            >Full Name
          </label>
          <input
            type="email"
            placeholder="Enter full name here"
            class="w-full font-['Nexa'] rounded-md px-3 py-2 border-2 border-gray-300 border-solid"
          />

          <label
            class="text-xl font-extralight mb-2 text-left mt-4 font-['Nexa']"
            >Email
          </label>
          <input
            type="email"
            placeholder="Enter email address here"
            class="w-full font-['Nexa'] rounded-md px-3 py-2 border-2 border-gray-300 border-solid"
          />

          <label
            class="text-xl font-extralight mb-2 font-['Nexa'] text-left mt-4"
            >Create Password
          </label>
          <input
            placeholder="......"
            class="placeholder-custom outline-none w-full px-3 py-2 border-2 border-solid border-[#D1D1D1] rounded-md font-['Nexa']"
          />
          <button
            class="w-full bg-[#FE8900] font-['Nexa'] font-black text-white mt-20 text-sm py-3 rounded-md"
          >
            <NuxtLink to="/auth/activationcode"> Create Account</NuxtLink>
          </button>
        </form>
        <p class="text-center mt-10 mb-5 text-xl font-['Nexa']">
          Already have an account?
          <NuxtLink
            to="/auth/signin"
            class="font-light font-['Nexa'] text-blue-700"
            >Sign In</NuxtLink
          >
        </p>
      </div>

      <div class="bg-custom-gradient w-[70%] mr-5 rounded-xl">
        <div class="flex items-center justify-center gap-10 mx-4 mt-10">
          <h1 class="text-4xl font-['Georgia'] font-normal text-white mx-6">
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
                <p class="mt-2 font-black text-white">{{ testimonial.name }}</p>
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
  font-size: 5rem;
  color: #aaa;
}
</style>
