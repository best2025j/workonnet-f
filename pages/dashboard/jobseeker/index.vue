<script setup lang="ts">
import ButtonBlueRight from "~/components/ul/ButtonBlueRight.vue";

definePageMeta({
  name: "Dashboard",
  pageName: 'dashboard.index',
  layout: "dashboard",
});
</script>

<template>
  <div class="pt-4 pr-4 text-black-900 w-full ">
    <!-- Dashboard content goes here -->
    <h2 class="text-2xl font-bold">Good Morning, Stanley</h2>
    <p class="text-sm">
      Here’s what’s happening with your job application since you joined us.
    </p>

    <!-- card -->
    <div class="flex space-x-4 w-full mt-2">
      <div class="flex space-x-4 w-3/5 items-center">
        <div class="space-y-2">
          <div class="rounded-10 w-[210px] bg-white h-auto">
            <div class="px-4 space-y-2 pt-2">
              <h3 class="text-base whitespace-nowrap font-bold">
                Total Jobs Applied
              </h3>
              <div class="flex items-center justify-between">
                <p
                  class="text-5xl pb-8 tracking-tighter font-[Georgia] font-bold"
                >
                  23
                </p>
                <div class="pt-8"><IconsWhiteFileIcon class="" /></div>
              </div>
            </div>
          </div>

          <div class="rounded-10 w-[210px] bg-white h-auto">
            <div class="px-4 space-y-2 pt-2">
              <h3 class="text-base whitespace-nowrap font-bold">
                Total Interviewed
              </h3>
              <div class="flex items-center justify-between">
                <p
                  class="text-5xl pb-8 tracking-tighter font-[Georgia] font-bold"
                >
                  12
                </p>
                <div class="pt-8"><IconsWhiteChatIcon class="" /></div>
              </div>
            </div>
          </div>
        </div>

        <!--  -->
        <div class="font-[Nexa] bg-[#FFFFFF] w-full rounded-10 px-4 py-4 h-72">
          <h3 class="font-bold">Jobs Applied Status</h3>
          <div class="flex gap-4 items-center">
            <div class="flex flex-col items-center pt-6">
              <!-- chart -->
              <div
                class="w-32 h-32 rounded-full border-8 border-black/20"
              ></div>
              <ButtonBlueRight />
            </div>

            <div class="space-y-4">
              <div class="flex items-center space-x-3">
                <div class="bg-[#82410C] w-6 h-6 rounded" />
                <div class="text-sm">
                  <h6 class="font-bold">20%</h6>
                  <p>Unsuccessful</p>
                </div>
              </div>
              <div class="flex items-center space-x-3">
                <div class="bg-[#FE8900] w-6 h-6 rounded" />
                <div class="text-sm">
                  <h6 class="font-bold">32%</h6>
                  <p>Under Review</p>
                </div>
              </div>
              <div class="flex items-center space-x-3">
                <div class="bg-[#FFD76D] w-6 h-6 rounded" />
                <div class="text-sm">
                  <h6 class="font-bold">48%</h6>
                  <p>Interviewed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="font-[Nexa] bg-[#FFFFFF] h-72 rounded-10 w-2/5">
        <h3 class="font-bold border-b px-6 ml-2 py-4 text-base text-gray-800">
          Upcoming Interviews
        </h3>

        <h3
          class="border-b flex justify-between px-6 ml-2 py-4 text-xs text-gray-600"
        >
          <div><b>Today</b>, 26th August 2024.</div>
          <span class="flex space-x-3">
            <!-- buttons left -->
            <button>
              <svg
                width="7"
                height="14"
                viewBox="0 0 7 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.64798 12.227C6.70025 12.2792 6.7417 12.3413 6.76999 12.4096C6.79827 12.4779 6.81283 12.551 6.81283 12.6249C6.81283 12.6989 6.79827 12.772 6.76999 12.8403C6.7417 12.9086 6.70025 12.9707 6.64798 13.0229C6.59572 13.0752 6.53368 13.1166 6.46539 13.1449C6.39711 13.1732 6.32392 13.1878 6.25001 13.1878C6.17611 13.1878 6.10292 13.1732 6.03464 13.1449C5.96635 13.1166 5.90431 13.0752 5.85205 13.0229L0.227046 7.39792C0.174747 7.34567 0.133258 7.28364 0.104951 7.21535C0.0766431 7.14706 0.0620728 7.07387 0.0620728 6.99995C0.0620728 6.92603 0.0766431 6.85283 0.104951 6.78454C0.133258 6.71626 0.174747 6.65422 0.227046 6.60198L5.85205 0.976978C5.95759 0.87143 6.10075 0.812134 6.25001 0.812134C6.39928 0.812134 6.54244 0.87143 6.64798 0.976978C6.75353 1.08253 6.81283 1.22568 6.81283 1.37495C6.81283 1.52421 6.75353 1.66737 6.64798 1.77292L1.42025 6.99995L6.64798 12.227Z"
                  fill="#B0B0B0"
                />
              </svg>
            </button>
            <!-- buttons right -->
            <button>
              <svg
                width="7"
                height="14"
                viewBox="0 0 7 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.77298 7.39792L1.14798 13.0229C1.09571 13.0752 1.03367 13.1166 0.965387 13.1449C0.897103 13.1732 0.823917 13.1878 0.750008 13.1878C0.676098 13.1878 0.602912 13.1732 0.534628 13.1449C0.466345 13.1166 0.404301 13.0752 0.352039 13.0229C0.299777 12.9707 0.25832 12.9086 0.230036 12.8403C0.201752 12.772 0.187195 12.6989 0.187195 12.6249C0.187195 12.551 0.201752 12.4779 0.230036 12.4096C0.25832 12.3413 0.299777 12.2792 0.352039 12.227L5.57977 6.99995L0.352039 1.77292C0.246491 1.66737 0.187195 1.52421 0.187195 1.37495C0.187195 1.22568 0.246491 1.08253 0.352039 0.976978C0.457586 0.87143 0.60074 0.812134 0.750008 0.812134C0.899275 0.812134 1.04243 0.87143 1.14798 0.976978L6.77298 6.60198C6.82528 6.65422 6.86677 6.71626 6.89507 6.78454C6.92338 6.85283 6.93795 6.92603 6.93795 6.99995C6.93795 7.07387 6.92338 7.14706 6.89507 7.21535C6.86677 7.28364 6.82528 7.34567 6.77298 7.39792Z"
                  fill="#343330"
                />
              </svg>
            </button>
          </span>
        </h3>

        <!-- Scrollable Content Area -->
        <div
          class="overflow-y-auto h-[calc(100%-120px)] no-scrollbar text-xs px-4"
        >
          <div class="flex justify-between items-center p-4">
            <h6 class="text-gray-700 font-light whitespace-nowrap">10:00 AM</h6>
            <div class="w-full h-[1px] bg-gray-300 mx-4"></div>
          </div>

          <!-- Profile Section -->
          <div class="flex justify-between items-center px-4">
            <h6 class="text-gray-700 font-light whitespace-nowrap">10:00 AM</h6>
            <div class="w-full rounded-10 p-2 bg-gray-100 mx-4">
              <div class="flex items-center space-x-4">
                <img
                  class="w-10 h-10 rounded-10"
                  src="/Ellipse 12.png"
                  alt="Profile Image"
                />
                <div>
                  <h6 class="font-semibold text-gray-800">Juliet Spincer</h6>
                  <p class="text-sm text-gray-500">HR Manager at Microsoft</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Additional Time Slots -->
          <div class="flex justify-between items-center p-4">
            <h6 class="text-gray-700 font-light whitespace-nowrap">11:00 AM</h6>
            <div class="w-full h-[1px] bg-gray-300 mx-4"></div>
          </div>
          <div class="flex justify-between items-center p-4">
            <h6 class="text-gray-700 font-light whitespace-nowrap">11:00 AM</h6>
            <div class="w-full h-[1px] bg-gray-300 mx-4"></div>
          </div>
          <div class="flex justify-between items-center p-4">
            <h6 class="text-gray-700 font-light whitespace-nowrap">11:00 AM</h6>
            <div class="w-full h-[1px] bg-gray-300 mx-4"></div>
          </div>
          <div class="flex justify-between items-center p-4">
            <h6 class="text-gray-700 font-light whitespace-nowrap">11:00 AM</h6>
            <div class="w-full h-[1px] bg-gray-300 mx-4"></div>
          </div>
        </div>
      </div>
    </div>
    <!--  -->
    <RecentAppHistory />
  </div>
</template>
