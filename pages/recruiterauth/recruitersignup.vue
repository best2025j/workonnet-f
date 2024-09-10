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
      "Workonnect has helped our company to recruit the best talents nationwide and improved more experienced output.",
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
    <div class="flex items-center justify-center gap-4 mb-2 mt-10 mx-2">
      <div class="flex flex-col w-full mt-10">
        <h2 class="text-center text-3xl mb-6 font-['Georgia'] font-normal">
          Continue to account
        </h2>
        <div class="flex flex-col items-center justify-center gap-4">
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
          <label class="text-sm font-thin mb-2 text-left mt-4">Full Name</label>
          <input
            type="text"
            placeholder="Full name here"
            class="outline-none w-full text-[12px] font-thin placeholder:font-thin placeholder:text-[#958D8D] rounded-md px-3 py-2 border-2 border-black-200 border-solid"
          />
          <label class="text-sm font-thin mb-2 text-left mt-4"
            >Company Name</label
          >
          <input
            type="text"
            placeholder="Enter company name here"
            class="outline-none w-full text-[12px] font-thin placeholder:font-thin placeholder:text-[#958D8D] rounded-md px-3 py-2 border-2 border-black-200 border-solid"
          />
          <!--Company Size -->
          <label class="text-sm font-thin mb-2 text-left mt-4"
            >Company Size
            <select
              class="outline-none mt-2 bg-white w-[133%] text-[12px] font-thin placeholder:font-thin placeholder:text-[#958D8D] rounded-md px-3 py-2 border-2 border-black-200 border-solid"
            >
              Company Size
              <option value="" disabled selected>Select company size</option>
              <option value="">0-10</option>
              <option value="">11-50</option>
              <option value="">51-100</option>
              <option value="">101-500</option>
              <option value="">500+</option>
            </select>
          </label>
          <!--Industry -->

          <label class="text-sm font-thin mb-2 text-left mt-4">
            Industry
            <select
              class="outline-none mt-2 bg-white w-[123%] text-[12px] font-thin placeholder:font-thin placeholder:text-[#958D8D] rounded-md px-3 py-2 border-2 border-black-200 border-solid"
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
          </label>

          <label class="text-sm font-thin mb-2 text-left mt-4"
            >Company Website</label
          >
          <input
            type="url"
            placeholder="Website"
            class="outline-none w-full text-[12px] font-thin placeholder:font-thin placeholder:text-[#958D8D] rounded-md px-3 py-2 border-2 border-black-200 border-solid"
          />
          <label class="text-sm font-thin mb-2 text-left mt-4">Email</label>
          <input
            type="email"
            placeholder="Enter email address here"
            class="outline-none w-full text-[12px] font-thin placeholder:font-thin placeholder:text-[#958D8D] rounded-md px-3 py-2 border-2 border-black-200 border-solid"
          />

          <label class="text-sm font-thin mb-2 text-left mt-4">Password</label>
          <input
            type="password"
            placeholder="......."
            class="placeholder:text-[2.5rem] placeholder:mt-20 outline-none w-full font-thin placeholder:font-thin placeholder:text-[#958D8D] rounded-md px-3 py-2 border-2 border-black-200 border-solid"
          />

          <button
            class="h-12 bg-[#FE8900] font-black text-white mt-20 text-sm w-[375px] rounded-md"
          >
            <NuxtLink to="/auth/activation-code">Create account</NuxtLink>
          </button>
        </form>

        <p class="text-center mt-10 mb-5 text-sm font-thin">
          Already have an account?
          <NuxtLink
            to="/recruiterauth/recruitersignup"
            class="font-thin text-[#007AFF]"
            >Sign In</NuxtLink
          >
        </p>
      </div>

      <div class="bg-custom-gradient w-[75%] -mt-52 mr-16 rounded-xl">
        <div class="flex items-center justify-center gap-10 mx-3 mt-10">
          <h1
            class="text-[34.33px] font-['Georgia'] font-normal text-white mx-6"
          >
            Recruiting Executive Talents
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
                <p class="text-sm text-white mb-6 font-thin">
                  "{{ testimonial.message }} "
                </p>
                <p class="mt-2 text-sm font-black text-white">
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
  font-size: 5rem;
  color: #d9d9d9;
}
</style>
