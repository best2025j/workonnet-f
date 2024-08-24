<script>
import JobSeekerHeader from "@/components/JobSeekerHeader.vue";
import JobSeekerSideNav from "@/components/JobSeekerSideNav.vue";

export default {
  components: {
    JobSeekerHeader,
    JobSeekerSideNav,
  },
};
</script>

<!-- style for sc -->
<style scoped>
/* Hide scrollbar for Chrome, Safari and Opera */
.no-scrollbar::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.no-scrollbar {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>

<template>
  <div class="flex">
    <!-- Side Navigation -->
    <JobSeekerSideNav />

    <!-- Main Content Area -->
    <div class="flex-1 bg-[#E7E7E7]">
      <JobSeekerHeader />
      <main class="px-4 mt-6">
        <!-- Dashboard content goes here -->
        <h2 class="text-2xl font-bold">Good Morning, Stanley</h2>
        <p class="text-sm">
          Here’s what’s happening with your job application since you joined us.
        </p>

        <!--  -->
        <div class="flex gap-4">
          <div>
            <div class="py-4">
              <div class="rounded-xl w-[210px] bg-white h-full">
                <div class="px-4 pt-2">
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
            </div>

            <div class="">
              <div class="rounded-xl w-[210px] bg-white h-full">
                <div class="px-4 pt-2">
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
          </div>

          <div class="font-[Nexa] bg-[#FFFFFF] w-96 rounded-lg px-4 py-4 mt-4">
            <h3 class="font-bold">Jobs Applied Status</h3>
            <div class="flex gap-4 items-center">
              <div class="flex flex-col items-center pt-6">
                <!-- chart -->
                <div
                  class="w-32 h-32 rounded-full border-8 border-black/20"
                ></div>
                <button
                  class="text-[#007AFF] text-sm border border-[#007AFF] mt-6 w-[9.7rem] h-5"
                >
                  View all applications
                </button>
              </div>

              <div class="space-y-4">
                <div class="flex items-center space-x-3">
                  <div class="bg-[#82410C] w-6 h-6 rounded" />
                  <div class="text-sm">
                    <h6 class="font-bold">20%</h6>
                    <p>Under Review</p>
                  </div>
                </div>
                <div class="flex items-center space-x-3">
                  <div class="bg-[#FE8900] w-6 h-6 rounded" />
                  <div class="text-sm">
                    <h6 class="font-bold">32%</h6>
                    <p>Unsuccessful</p>
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

          <div
            class="font-[Nexa] bg-[#FFFFFF] w-96 h-72 rounded-lg mt-2 shadow-lg"
          >
            <h3 class="font-bold border-b p-4 text-lg text-gray-800">
              Upcoming Interviews
            </h3>
            <h3 class="border-b p-4 text-base text-gray-600">
              <b>Today</b>, 26th August 2024.
            </h3>

            <!-- Scrollable Content Area -->
            <div
              class="overflow-y-auto h-[calc(100%-120px)] scroll-smooth no-scrollbar"
            >
              <div class="flex justify-between items-center p-4">
                <h6 class="text-gray-700 font-light whitespace-nowrap">
                  10:00 AM
                </h6>
                <div class="w-full h-[1px] bg-gray-300 mx-4"></div>
              </div>

              <!-- Profile Section -->
              <div class="flex justify-between items-center px-4">
                <h6 class="text-gray-700 font-light whitespace-nowrap">
                  10:00 AM
                </h6>
                <div class="w-full rounded-xl p-2 bg-gray-100 mx-4">
                  <div class="flex items-center space-x-4">
                    <img
                      class="w-10 h-10 rounded-full"
                      src="/Ellipse 12.png"
                      alt="Profile Image"
                    />
                    <div>
                      <h6 class="font-semibold text-gray-800">
                        Juliet Spincer
                      </h6>
                      <p class="text-sm text-gray-500">
                        HR Manager at Microsoft
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Additional Time Slots -->
              <div class="flex justify-between items-center p-4">
                <h6 class="text-gray-700 font-light whitespace-nowrap">
                  11:00 AM
                </h6>
                <div class="w-full h-[1px] bg-gray-300 mx-4"></div>
              </div>
              <div class="flex justify-between items-center p-4">
                <h6 class="text-gray-700 font-light whitespace-nowrap">
                  11:00 AM
                </h6>
                <div class="w-full h-[1px] bg-gray-300 mx-4"></div>
              </div>
              <div class="flex justify-between items-center p-4">
                <h6 class="text-gray-700 font-light whitespace-nowrap">
                  11:00 AM
                </h6>
                <div class="w-full h-[1px] bg-gray-300 mx-4"></div>
              </div>
              <div class="flex justify-between items-center p-4">
                <h6 class="text-gray-700 font-light whitespace-nowrap">
                  11:00 AM
                </h6>
                <div class="w-full h-[1px] bg-gray-300 mx-4"></div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped>
/* Add any additional styles for the dashboard here */
</style>
