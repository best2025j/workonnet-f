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
        <!-- form -->
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
              class="py-4 divide-black-600 grid grid-cols-4 items-center w-full space-x-2"
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

          <div class="flex space-x-2 text-xs pl-2">
            <button
              class="px-3.5 border rounded-8 py-2 bg-success-600 text-white"
            >
              save
            </button>
            <button class="px-3.5 border text-black-600 rounded-8 py-2">
              Cancel
            </button>
            <button class="px-3.5 text-info-600 py-2">
              Delete this work experience
            </button>
          </div>

          <!--  list -->

          <div class="space-y-3 w-full h-full">
            <div
              class="flex justify-between p-4 mt-4 bg-black-50 items-center rounded-10"
            >
              <ul class="space-y-2 pl-4">
                <li class="text-sm font-black text-info-600 list-disc">
                  Accountant at Workonnect
                </li>
                <div>
                  <h1 class="font-black text-xs">May - June 2020</h1>
                  <h1 class="font-blacl text-xs">Lagos, Nigeria.</h1>
                </div>
              </ul>
              <span>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21.3103 6.87817L17.1216 2.68848C16.9823 2.54916 16.8169 2.43864 16.6349 2.36324C16.4529 2.28783 16.2578 2.24902 16.0608 2.24902C15.8638 2.24902 15.6687 2.28783 15.4867 2.36324C15.3047 2.43864 15.1393 2.54916 15 2.68848L3.43969 14.2497C3.2998 14.3885 3.18889 14.5537 3.11341 14.7358C3.03792 14.9178 2.99938 15.113 3.00001 15.31V19.4997C3.00001 19.8976 3.15804 20.2791 3.43935 20.5604C3.72065 20.8417 4.10218 20.9997 4.50001 20.9997H8.6897C8.88675 21.0004 9.08197 20.9618 9.26399 20.8863C9.44602 20.8109 9.61122 20.6999 9.75001 20.56L21.3103 8.99973C21.4496 8.86044 21.5602 8.69507 21.6356 8.51306C21.711 8.33105 21.7498 8.13596 21.7498 7.93895C21.7498 7.74194 21.711 7.54686 21.6356 7.36485C21.5602 7.18284 21.4496 7.01747 21.3103 6.87817ZM8.6897 19.4997H4.50001V15.31L12.75 7.06005L16.9397 11.2497L8.6897 19.4997ZM18 10.1885L13.8103 5.99973L16.0603 3.74973L20.25 7.93848L18 10.1885Z"
                    fill="#343330"
                  />
                </svg>
              </span>
            </div>
          </div>

          <div class="space-y-3 w-full h-full">
            <div
              class="flex justify-between p-4 mt-4 bg-black-50 items-center rounded-10"
            >
              <ul class="space-y-2 pl-4">
                <li class="text-sm font-black text-info-600 list-disc">
                  Accountant at Workonnect
                </li>
                <div>
                  <h1 class="font-black text-xs">May - June 2020</h1>
                  <h1 class="font-blacl text-xs">Lagos, Nigeria.</h1>
                </div>
              </ul>
              <span>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21.3103 6.87817L17.1216 2.68848C16.9823 2.54916 16.8169 2.43864 16.6349 2.36324C16.4529 2.28783 16.2578 2.24902 16.0608 2.24902C15.8638 2.24902 15.6687 2.28783 15.4867 2.36324C15.3047 2.43864 15.1393 2.54916 15 2.68848L3.43969 14.2497C3.2998 14.3885 3.18889 14.5537 3.11341 14.7358C3.03792 14.9178 2.99938 15.113 3.00001 15.31V19.4997C3.00001 19.8976 3.15804 20.2791 3.43935 20.5604C3.72065 20.8417 4.10218 20.9997 4.50001 20.9997H8.6897C8.88675 21.0004 9.08197 20.9618 9.26399 20.8863C9.44602 20.8109 9.61122 20.6999 9.75001 20.56L21.3103 8.99973C21.4496 8.86044 21.5602 8.69507 21.6356 8.51306C21.711 8.33105 21.7498 8.13596 21.7498 7.93895C21.7498 7.74194 21.711 7.54686 21.6356 7.36485C21.5602 7.18284 21.4496 7.01747 21.3103 6.87817ZM8.6897 19.4997H4.50001V15.31L12.75 7.06005L16.9397 11.2497L8.6897 19.4997ZM18 10.1885L13.8103 5.99973L16.0603 3.74973L20.25 7.93848L18 10.1885Z"
                    fill="#343330"
                  />
                </svg>
              </span>
            </div>
          </div>

          <div class="space-y-3 w-full h-full">
            <div
              class="flex justify-between p-4 mt-4 bg-black-50 items-center rounded-10"
            >
              <ul class="space-y-2 pl-4">
                <li class="text-sm font-black text-info-600 list-disc">
                  Accountant at Workonnect
                </li>
                <div>
                  <h1 class="font-black text-xs">May - June 2020</h1>
                  <h1 class="font-blacl text-xs">Lagos, Nigeria.</h1>
                </div>
              </ul>
              <span>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21.3103 6.87817L17.1216 2.68848C16.9823 2.54916 16.8169 2.43864 16.6349 2.36324C16.4529 2.28783 16.2578 2.24902 16.0608 2.24902C15.8638 2.24902 15.6687 2.28783 15.4867 2.36324C15.3047 2.43864 15.1393 2.54916 15 2.68848L3.43969 14.2497C3.2998 14.3885 3.18889 14.5537 3.11341 14.7358C3.03792 14.9178 2.99938 15.113 3.00001 15.31V19.4997C3.00001 19.8976 3.15804 20.2791 3.43935 20.5604C3.72065 20.8417 4.10218 20.9997 4.50001 20.9997H8.6897C8.88675 21.0004 9.08197 20.9618 9.26399 20.8863C9.44602 20.8109 9.61122 20.6999 9.75001 20.56L21.3103 8.99973C21.4496 8.86044 21.5602 8.69507 21.6356 8.51306C21.711 8.33105 21.7498 8.13596 21.7498 7.93895C21.7498 7.74194 21.711 7.54686 21.6356 7.36485C21.5602 7.18284 21.4496 7.01747 21.3103 6.87817ZM8.6897 19.4997H4.50001V15.31L12.75 7.06005L16.9397 11.2497L8.6897 19.4997ZM18 10.1885L13.8103 5.99973L16.0603 3.74973L20.25 7.93848L18 10.1885Z"
                    fill="#343330"
                  />
                </svg>
              </span>
            </div>
          </div>

          <div class="space-y-3 w-full h-full">
            <div
              class="flex justify-between p-4 mt-4 bg-black-50 items-center rounded-10"
            >
              <ul class="space-y-2 pl-4">
                <li class="text-sm font-black text-info-600 list-disc">
                  Accountant at Workonnect
                </li>
                <div>
                  <h1 class="font-black text-xs">May - June 2020</h1>
                  <h1 class="font-blacl text-xs">Lagos, Nigeria.</h1>
                </div>
              </ul>
              <span>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21.3103 6.87817L17.1216 2.68848C16.9823 2.54916 16.8169 2.43864 16.6349 2.36324C16.4529 2.28783 16.2578 2.24902 16.0608 2.24902C15.8638 2.24902 15.6687 2.28783 15.4867 2.36324C15.3047 2.43864 15.1393 2.54916 15 2.68848L3.43969 14.2497C3.2998 14.3885 3.18889 14.5537 3.11341 14.7358C3.03792 14.9178 2.99938 15.113 3.00001 15.31V19.4997C3.00001 19.8976 3.15804 20.2791 3.43935 20.5604C3.72065 20.8417 4.10218 20.9997 4.50001 20.9997H8.6897C8.88675 21.0004 9.08197 20.9618 9.26399 20.8863C9.44602 20.8109 9.61122 20.6999 9.75001 20.56L21.3103 8.99973C21.4496 8.86044 21.5602 8.69507 21.6356 8.51306C21.711 8.33105 21.7498 8.13596 21.7498 7.93895C21.7498 7.74194 21.711 7.54686 21.6356 7.36485C21.5602 7.18284 21.4496 7.01747 21.3103 6.87817ZM8.6897 19.4997H4.50001V15.31L12.75 7.06005L16.9397 11.2497L8.6897 19.4997ZM18 10.1885L13.8103 5.99973L16.0603 3.74973L20.25 7.93848L18 10.1885Z"
                    fill="#343330"
                  />
                </svg>
              </span>
            </div>
          </div>
        </form>
      </div>
    </div>
    <!-- education -->
    <div class="bg-white mt-4 rounded-10 space-y-3 w-2/3 h-full p-5">
      <h1 class="text xl font-black font-[Georgia]">Education</h1>
      <div class="space-y-3">
        <div
          class="flex justify-between p-4 mt-4 bg-black-50 items-center rounded-10"
        >
          <ul class="space-y-2 pl-4">
            <li class="text-sm font-black text-info-600 list-disc">
              Accountant at Workonnect
            </li>
            <div>
              <h1 class="font-black text-xs">May - June 2020</h1>
              <h1 class="font-blacl text-xs">Lagos, Nigeria.</h1>
            </div>
          </ul>
          <span>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21.3103 6.87817L17.1216 2.68848C16.9823 2.54916 16.8169 2.43864 16.6349 2.36324C16.4529 2.28783 16.2578 2.24902 16.0608 2.24902C15.8638 2.24902 15.6687 2.28783 15.4867 2.36324C15.3047 2.43864 15.1393 2.54916 15 2.68848L3.43969 14.2497C3.2998 14.3885 3.18889 14.5537 3.11341 14.7358C3.03792 14.9178 2.99938 15.113 3.00001 15.31V19.4997C3.00001 19.8976 3.15804 20.2791 3.43935 20.5604C3.72065 20.8417 4.10218 20.9997 4.50001 20.9997H8.6897C8.88675 21.0004 9.08197 20.9618 9.26399 20.8863C9.44602 20.8109 9.61122 20.6999 9.75001 20.56L21.3103 8.99973C21.4496 8.86044 21.5602 8.69507 21.6356 8.51306C21.711 8.33105 21.7498 8.13596 21.7498 7.93895C21.7498 7.74194 21.711 7.54686 21.6356 7.36485C21.5602 7.18284 21.4496 7.01747 21.3103 6.87817ZM8.6897 19.4997H4.50001V15.31L12.75 7.06005L16.9397 11.2497L8.6897 19.4997ZM18 10.1885L13.8103 5.99973L16.0603 3.74973L20.25 7.93848L18 10.1885Z"
                fill="#343330"
              />
            </svg>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
