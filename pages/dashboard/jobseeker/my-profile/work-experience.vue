<script setup lang="ts">
definePageMeta({
  title: "My profile",
  pageName: "dashboard.jobsseeker.my-profile.work-experience",
  layout: "dashboard",
});
</script>

<template>
  <div>
    <!-- social media links-->
    <div class="bg-white p-4 rounded-10 font-[Nexa] w-2/3">
      <h1 class="font-bold text-xl font-[Georgia]">Basic Information</h1>
      <p class="text-xs">
        Build trust with recruiters by verifying your social profiles
      </p>
      <div class="flex flex-col w-2/3 space-y-4 pt-6">
        <div class="flex flex-col w-full">
          <label for="first-name" class="text-sm mb-2">Full Name</label>
          <input
            type="text"
            placeholder="Enter your full name here"
            class="pl-2 placeholder:text-sm pr-4 h-11 outline-none border border-gray-300 rounded-md"
          />
        </div>
        <div class="flex flex-col w-full">
          <label for="first-name" class="text-sm mb-2"
            >Occupation/Job Title</label
          >
          <input
            type="text"
            placeholder="UI/UX Designer"
            class="pl-2 placeholder:text-sm pr-4 h-11 outline-none border border-gray-300 rounded-md"
          />
        </div>
        <div class="flex flex-col w-1/2">
          <label for="first-name" class="text-sm mb-2">Location</label>
          <div class="relative w-full">
            <input
              type="text"
              placeholder="Nigeria"
              class="pl-2 placeholder:text-sm pr-4 h-11 w-full outline-none border rel border-gray-300 rounded-md"
            />
            <svg
              width="14"
              height="9"
              class="absolute right-3 top-3.5 h-4 w-4 text-gray-400"
              viewBox="0 0 14 9"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.6923 1.94254L7.44229 8.19254C7.38425 8.25065 7.31531 8.29675 7.23944 8.3282C7.16357 8.35965 7.08224 8.37584 7.0001 8.37584C6.91797 8.37584 6.83664 8.35965 6.76077 8.3282C6.68489 8.29675 6.61596 8.25065 6.55792 8.19254L0.307916 1.94254C0.19064 1.82526 0.124756 1.6662 0.124756 1.50035C0.124756 1.3345 0.19064 1.17544 0.307916 1.05816C0.425191 0.940884 0.584251 0.875 0.750103 0.875C0.915956 0.875 1.07502 0.940884 1.19229 1.05816L7.0001 6.86675L12.8079 1.05816C12.866 1.00009 12.9349 0.954028 13.0108 0.922601C13.0867 0.891175 13.168 0.875 13.2501 0.875C13.3322 0.875 13.4135 0.891175 13.4894 0.922601C13.5653 0.954028 13.6342 1.00009 13.6923 1.05816C13.7504 1.11623 13.7964 1.18517 13.8278 1.26104C13.8593 1.33691 13.8755 1.41823 13.8755 1.50035C13.8755 1.58247 13.8593 1.66379 13.8278 1.73966C13.7964 1.81553 13.7504 1.88447 13.6923 1.94254Z"
                fill="#343330"
              />
            </svg>
          </div>
        </div>
        <div class="flex flex-col w-1/2">
          <label for="first-name" class="text-sm mb-2">City</label>
          <input
            type="text"
            placeholder="Lagos"
            class="pl-2 placeholder:text-sm pr-4 h-11 outline-none border border-gray-300 rounded-md"
          />
        </div>
      </div>

      <!-- about me -->
    </div>
    <!-- work experience -->
    <div class="bg-white p-4 rounded-10 font-[Nexa] w-2/3 mt-6">
      <h1 class="text-xl font-black">Work Experience</h1>
      <p class="text-xs">Showcase your previous roles and experiences</p>

      <div class="border rounded-10 p-4 mt-4">
        <!--  -->
        <form action="" class="">
          <div class="w-3/5 p-2 space-y-2">
            <div class="flex gap-x-2">
              <div class="flex flex-col w-full">
                <label for="first-name" class="text-sm mb-2"
                  >Company / Organization</label
                >
                <input
                  type="text"
                  placeholder="Lagos"
                  class="pl-2 placeholder:text-sm pr-4 h-11 outline-none border border-gray-300 rounded-md"
                />
              </div>
              <div class="flex flex-col w-full">
                <label for="first-name" class="text-sm mb-2">Website</label>
                <input
                  type="text"
                  placeholder="https://"
                  class="pl-2 placeholder:text-sm pr-4 h-11 outline-none border border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div class="flex flex-col w-1/2">
              <label for="first-name" class="text-sm mb-2">Location</label>
              <div class="relative w-full">
                <input
                  type="text"
                  placeholder="Nigeria"
                  class="pl-2 placeholder:text-sm pr-4 h-11 w-full outline-none border rel border-gray-300 rounded-md"
                />
              </div>
            </div>
            <div class="flex flex-col w-1/2">
              <label for="first-name" class="text-sm mb-2">City</label>
              <input
                type="text"
                placeholder="Lagos"
                class="pl-2 placeholder:text-sm pr-4 h-11 outline-none border border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div class="border-b-2 py-4 w-full" />

          <div class="py-4 divide-black-600 w-2/3 p-2 space-y-2">
            <div class="flex flex-col w-full">
              <label for="first-name" class="text-sm mb-2">Position</label>
              <div class="relative w-full">
                <input
                  type="text"
                  placeholder="UI/UX Designer"
                  class="pl-2 placeholder:text-sm pr-4 h-11 w-full outline-none border rel border-gray-300 rounded-md"
                />
              </div>
            </div>
            <div class="flex flex-col w-1/2">
              <label for="first-name" class="text-sm mb-2">City</label>
              <input
                type="text"
                placeholder="Lagos"
                class="pl-2 placeholder:text-sm pr-4 h-11 outline-none border border-gray-300 rounded-md"
              />
            </div>

            <div
              class="py-4 divide-black-600 grid grid-cols-4 items-center p-2 w-full space-x-2"
            >
              <div class="flex flex-col w-full">
                <label for="first-name" class="text-sm mb-2"
                  >Starting From</label
                >
                <div class="relative w-full">
                  <input
                    type="text"
                    placeholder="Lagos"
                    class="pl-2 placeholder:text-sm pr-4 h-11 w-full outline-none border rel border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div class="flex flex-col">
                <label for="first-name" class="text-sm mb-2">location</label>
                <input
                  type="text"
                  placeholder="Lagos"
                  class="pl-2 placeholder:text-sm pr-4 h-11 outline-none border border-gray-300 rounded-md"
                />
              </div>

              <div class="flex flex-col">
                <label for="first-name" class="text-sm mb-2">Location</label>
                <input
                  type="text"
                  placeholder="Lagos"
                  class="pl-2 placeholder:text-sm pr-4 h-11 outline-none border border-gray-300 rounded-md"
                />
              </div>
              <div class="flex flex-col">
                <label for="first-name" class="text-sm mb-2">locatiion</label>
                <input
                  type="text"
                  placeholder="Lagos"
                  class="pl-2 placeholder:text-sm pr-4 h-11 outline-none border border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div class="flex flex-col">
              <label for="first-name" class="text-sm mb-2">Details</label>
              <textarea
                name=""
                rows="8"
                class="border pl-2 border-black-200 rounded-8 w-full"
                placeholder="Lagos"
              />
            </div>
          </div>

          <div class="flex space-x-2 text-xs">
            <button
              class="px-3.5 border rounded-8 py-2 bg-success-600 text-white"
            >
              save
            </button>
            <button class="px-3.5 border text-black-600 rounded-8 py-2">
              Cancel
            </button>
            <button class="px-3.5  text-info-600 py-2">
              Delete this work experience
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
