<script setup lang="ts">
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
          class="btn transform rounded-[3.4px] mr-2 -translate-y-1/2 p-3 text-white bg-white"
        >
          <span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.56046 8.45182L6.90544 12.7968C6.99603 12.8874 7.11889 12.9383 7.247 12.9383C7.37511 12.9383 7.49798 12.8874 7.58856 12.7968C7.67915 12.7062 7.73005 12.5834 7.73005 12.4552C7.73005 12.3271 7.67915 12.2043 7.58856 12.1137L4.06732 8.59303H13.5231C13.6511 8.59303 13.7739 8.54217 13.8645 8.45163C13.955 8.36109 14.0059 8.2383 14.0059 8.11026C14.0059 7.98222 13.955 7.85942 13.8645 7.76888C13.7739 7.67835 13.6511 7.62748 13.5231 7.62748H4.06732L7.58856 4.10684C7.67915 4.01625 7.73005 3.89339 7.73005 3.76528C7.73005 3.63717 7.67915 3.5143 7.58856 3.42371C7.49798 3.33313 7.37511 3.28223 7.247 3.28223C7.11889 3.28223 6.99603 3.33313 6.90544 3.42371L2.56046 7.76869C2.51557 7.81353 2.47996 7.86678 2.45566 7.92538C2.43137 7.98399 2.41887 8.04681 2.41887 8.11026C2.41887 8.1737 2.43137 8.23652 2.45566 8.29513C2.47996 8.35374 2.51557 8.40699 2.56046 8.45182Z"
                fill="#FE8900"
              />
            </svg>
          </span>
        </button>
        <button
          @click="nextSlide"
          class="btn transform rounded-[3.4px] -translate-y-1/2 p-3 text-white bg-[#B7680C]"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.7938 8.45182L9.44881 12.7968C9.35822 12.8874 9.23536 12.9383 9.10725 12.9383C8.97914 12.9383 8.85627 12.8874 8.76568 12.7968C8.6751 12.7062 8.6242 12.5834 8.6242 12.4552C8.6242 12.3271 8.6751 12.2043 8.76568 12.1137L12.2869 8.59303H2.83116C2.70312 8.59303 2.58033 8.54217 2.48979 8.45163C2.39925 8.36109 2.34839 8.2383 2.34839 8.11026C2.34839 7.98222 2.39925 7.85942 2.48979 7.76888C2.58033 7.67835 2.70312 7.62748 2.83116 7.62748H12.2869L8.76568 4.10684C8.6751 4.01625 8.6242 3.89339 8.6242 3.76528C8.6242 3.63717 8.6751 3.5143 8.76568 3.42371C8.85627 3.33313 8.97914 3.28223 9.10725 3.28223C9.23536 3.28223 9.35822 3.33313 9.44881 3.42371L13.7938 7.76869C13.8387 7.81353 13.8743 7.86678 13.8986 7.92538C13.9229 7.98399 13.9354 8.04681 13.9354 8.11026C13.9354 8.1737 13.9229 8.23652 13.8986 8.29513C13.8743 8.35374 13.8387 8.40699 13.7938 8.45182Z"
              fill="white"
            />
          </svg>
        </button>
      </div>
    </div>

</template>