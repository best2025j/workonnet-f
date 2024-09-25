<script lang="ts"></script>
<template>
  <div class="w-full h-full relative">
    <img src="/assets/images/Vector 5.png" alt="" />
    <div
      class="flex flex-col items-center mx-auto h-full justify-center max-w-[516px] text-center space-y-3 absolute top-0 left-0 right-0"
    >
      <h1
        class="md:text-6xl text-3xl font-black bg-custom-gradient bg-clip-text text-transparent leading-[77px] py-4"
      >
        Coming Soon
      </h1>
      <p class="font-black text-base max-w-[322px]">
        Get started with the easiest and most trusted platform to recruit and
        find jobs online.
      </p>

      <div class="w-full pt-4">
        <div>
          <form class="md:py-4 space-y-2">
            <div class="pt-2 flex flex-col md:flex-row gap-x-2">
              <!-- First Input Field -->
              <div class="flex items-start flex-col w-full md:w-1/2">
                <label for="first-name" class="text-sm mb-2">Name</label>
                <input
                  type="text"
                  placeholder="Email address..."
                  class="pl-2 placeholder:text-sm pr-4 h-12 w-full outline-none border bg-transparent border-gray-300 rounded-8"
                />
              </div>

              <!-- Second Input Field -->
              <div class="flex items-start flex-col w-full md:w-1/2">
                <label for="second-name" class="text-sm mb-2"
                  >Your Company</label
                >
                <input
                  type="text"
                  placeholder="Enter..."
                  class="pl-2 placeholder:text-sm pr-4 h-12 w-full outline-none border bg-transparent border-gray-300 rounded-8"
                />
              </div>
            </div>
            <!--  -->
            <div class="pt-2 flex flex-col md:flex-row gap-x-2">
              <!-- First Input Field -->
              <div class="flex items-start flex-col w-full md:w-1/2">
                <label for="first-name" class="text-sm mb-2"
                  >Email Address</label
                >
                <input
                  type="text"
                  placeholder="Email address..."
                  class="pl-2 placeholder:text-sm pr-4 h-12 w-full outline-none border bg-transparent border-gray-300 rounded-8"
                />
              </div>

              <!-- Second Input Field -->
              <div class="flex items-start flex-col w-full md:w-1/2">
                <label for="second-name" class="text-sm mb-2"
                  >What’s your position</label
                >
                <input
                  type="text"
                  placeholder="Enter your position..."
                  class="pl-2 placeholder:text-sm pr-4 h-12 w-full outline-none border bg-transparent border-gray-300 rounded-8"
                />
              </div>
            </div>
            <!--  -->
            <div class="pt-2 flex flex-col md:flex-row gap-x-2">
              <!-- First Input Field -->
              <div class="flex items-start flex-col w-full md:w-1/2">
                <label for="first-name" class="text-sm mb-2"
                  >Roles you regularly fill</label
                >
                <input
                  type="text"
                  placeholder="Email address..."
                  class="pl-2 placeholder:text-sm pr-4 h-12 w-full outline-none border bg-transparent border-gray-300 rounded-8"
                />
              </div>

              <!-- Second Input Field -->
              <div class="flex items-start flex-col w-full md:w-1/2">
                <label for="second-name" class="text-sm mb-2"
                  >Top technical skills</label
                >
                <input
                  type="text"
                  placeholder="Enter..."
                  class="pl-2 placeholder:text-sm pr-4 h-12 w-full outline-none border bg-transparent border-gray-300 rounded-8"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
      <div class="w-full">
        <button
          class="bg-primary-1 w-full font-black text-white rounded-8 h-12 uppercase"
        >
          join
        </button>
      </div>
    </div>
  </div>
</template>
