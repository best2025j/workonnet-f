<script setup lang="ts">
definePageMeta({
  title: "Dashboard",
  pageName: "dashboard.jobseeker.index",
  layout: "dashboard",
  middleware: ["auth", "is-jobseeker"],
});
</script>

<template>
  <div class="pt-4 text-black-900 w-full">
    <!-- Dashboard content goes here -->
    <div class="space-y-1 pb-2">
      <h2 class="text-2xl font-black">Good Morning, Stanley</h2>
      <p class="text-sm">
        Here’s what’s happening with your job application since you joined us.
      </p>
    </div>

    <!-- card -->
    <div class="md:flex md:space-x-4 w-full mt-3 h-full">
      <div
        class="flex flex-col h-full md:flex-row space-y-4 md:space-x-4 md:w-3/5 items-center"
      >
      <!-- for destop view -->
        <div class="hidden md:block w-96 min-w-[210px]">
          <div class="rounded-10 bg-white h-full mt-4">
            <div
              class="px-4 flex md:block items-center space-y-2 space-x-8 md:space-x-0 md:space-y-0 md:pt-4"
            >
              <h3 class="text-base whitespace-nowrap font-black">
                Total Jobs Applied
              </h3>

              <div class="flex items-center justify-between w-full">
                <p
                  class="md:text-5xl text-2xl md:pb-8 md:tracking-tighter font-[Georgia] font-black"
                >
                  23
                </p>
                <div class="md:pt-7">
                  <IconsWhiteFileIcon class="hidden md:block" />
                </div>
              </div>
            </div>
          </div>

          <div class="rounded-10 mt-4 bg-white h-full">
            <div
              class="px-4 flex md:block items-center space-y-2 space-x-8 md:space-x-0 md:space-y-0 md:pt-4"
            >
              <h3 class="text-base whitespace-nowrap font-black">
                Total Interviewed
              </h3>
              <div class="flex items-center justify-between w-full">
                <p
                  class="md:text-5xl text-2xl md:pb-8 md:tracking-tighter font-[Georgia] font-black"
                >
                  12
                </p>
                <div class="md:pt-8">
                  <IconsWhiteChatIcon class="md:block hidden" />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- for mobile view -->
        <div class="block md:hidden w-full min-w-[210px] space-y-4">
          <div class="rounded-10 bg-white h-full py-3 ">
            <div
              class="px-4 flex md:block items-center space-y-2 space-x-8 md:space-x-0 md:space-y-0 md:pt-4"
            >
              <div class="flex items-center justify-start space-x-4 w-full">
                <span>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.25 15C8.25 15.1989 8.32902 15.3897 8.46967 15.5303C8.61032 15.671 8.80109 15.75 9 15.75H15C15.1989 15.75 15.3897 15.671 15.5303 15.5303C15.671 15.3897 15.75 15.1989 15.75 15C15.75 14.8011 15.671 14.6103 15.5303 14.4697C15.3897 14.329 15.1989 14.25 15 14.25H9C8.80109 14.25 8.61032 14.329 8.46967 14.4697C8.32902 14.6103 8.25 14.8011 8.25 15ZM9 11.25H15C15.1989 11.25 15.3897 11.329 15.5303 11.4697C15.671 11.6103 15.75 11.8011 15.75 12C15.75 12.1989 15.671 12.3897 15.5303 12.5303C15.3897 12.671 15.1989 12.75 15 12.75H9C8.80109 12.75 8.61032 12.671 8.46967 12.5303C8.32902 12.3897 8.25 12.1989 8.25 12C8.25 11.8011 8.32902 11.6103 8.46967 11.4697C8.61032 11.329 8.80109 11.25 9 11.25ZM12 9.75H9C8.80109 9.75 8.61032 9.67098 8.46967 9.53033C8.32902 9.38968 8.25 9.19891 8.25 9C8.25 8.80109 8.32902 8.61032 8.46967 8.46967C8.61032 8.32902 8.80109 8.25 9 8.25H12C12.1989 8.25 12.3897 8.32902 12.5303 8.46967C12.671 8.61032 12.75 8.80109 12.75 9C12.75 9.19891 12.671 9.38968 12.5303 9.53033C12.3897 9.67098 12.1989 9.75 12 9.75ZM21 19.5V9.31031C21.0006 9.11326 20.9621 8.91804 20.8866 8.73602C20.8111 8.55399 20.7002 8.38878 20.5603 8.25L15.75 3.43969C15.6112 3.29979 15.446 3.18888 15.264 3.1134C15.082 3.03792 14.8867 2.99937 14.6897 3H4.5C4.10218 3 3.72064 3.15804 3.43934 3.43934C3.15804 3.72064 3 4.10217 3 4.5V19.5C3 19.8978 3.15804 20.2794 3.43934 20.5607C3.72064 20.842 4.10218 21 4.5 21H19.5C19.8978 21 20.2794 20.842 20.5607 20.5607C20.842 20.2794 21 19.8978 21 19.5ZM4.5 4.5H14.25V9C14.25 9.19891 14.329 9.38968 14.4697 9.53033C14.6103 9.67098 14.8011 9.75 15 9.75H19.5V19.5H4.5V4.5ZM15.75 8.25V5.55938L18.4397 8.25H15.75Z"
                      fill="#343330"
                    />
                  </svg>
                </span>
                <h3 class="text-sm whitespace-nowrap font-black">
                  Total Jobs Applied
                </h3>
              </div>
              <p
                class="md:text-5xl text-2xl md:pb-8 md:tracking-tighter font-[Georgia] font-black"
              >
                23
              </p>
            </div>
          </div>
          <div class="rounded-10 bg-white h-full py-3">
            <div
              class="px-4 flex md:block items-center space-y-2 space-x-8 md:space-x-0 md:space-y-0 md:pt-4"
            >
              <div class="flex items-center justify-start space-x-4 w-full">
                <span>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M21.7303 17.5622C22.2593 16.4871 22.5229 15.3008 22.4992 14.1029C22.4754 12.9049 22.165 11.73 21.5939 10.6767C21.0228 9.62333 20.2076 8.72215 19.2166 8.04859C18.2257 7.37503 17.0877 6.94871 15.8981 6.80533C15.502 5.88786 14.9266 5.05882 14.2055 4.36688C13.4845 3.67495 12.6325 3.13408 11.6995 2.77606C10.7665 2.41803 9.7714 2.25007 8.77259 2.28204C7.77378 2.314 6.79143 2.54525 5.88325 2.9622C4.97507 3.37915 4.15937 3.9734 3.48407 4.71002C2.80877 5.44664 2.2875 6.31079 1.95086 7.25171C1.61422 8.19262 1.46902 9.19132 1.52377 10.1891C1.57853 11.187 1.83214 12.1638 2.26971 13.0622L1.55158 15.5766C1.49573 15.7718 1.48595 15.9774 1.52303 16.1771C1.5601 16.3768 1.64302 16.5652 1.76524 16.7274C1.88747 16.8896 2.04567 17.0212 2.22739 17.1119C2.40912 17.2026 2.60942 17.2499 2.81252 17.25C2.93432 17.2504 3.05554 17.2333 3.17252 17.1994L5.68689 16.4813C6.44534 16.8562 7.26252 17.0981 8.10283 17.1966C8.50288 18.1335 9.08963 18.9792 9.82728 19.6819C10.5649 20.3846 11.438 20.9297 12.3933 21.2839C13.3486 21.638 14.366 21.7938 15.3834 21.7418C16.4009 21.6898 17.3971 21.431 18.3113 20.9813L20.8256 21.6994C21.0506 21.7635 21.2886 21.7663 21.515 21.7075C21.7414 21.6488 21.9479 21.5306 22.1133 21.3652C22.2787 21.1998 22.3969 20.9932 22.4557 20.7668C22.5144 20.5404 22.5116 20.3025 22.4475 20.0775L21.7303 17.5622ZM6.12752 15.0197C5.95555 14.9258 5.75365 14.9029 5.56502 14.956L3.08908 15.6638L3.79689 13.1878C3.84994 12.9992 3.82706 12.7973 3.73314 12.6253C2.95937 11.2347 2.76973 9.59361 3.20593 8.06314C3.64212 6.53267 4.66844 5.23816 6.05908 4.46439C7.44973 3.69062 9.0908 3.50097 10.6213 3.93717C12.1517 4.37337 13.4462 5.39968 14.22 6.79033C12.3769 6.98557 10.6711 7.85536 9.43053 9.23243C8.19001 10.6095 7.50243 12.3966 7.50002 14.25C7.50033 14.6997 7.54144 15.1484 7.62283 15.5906C7.10091 15.4687 6.59791 15.2766 6.12752 15.0197ZM20.206 17.6878L20.9138 20.1638L18.4378 19.456C18.2492 19.4029 18.0473 19.4258 17.8753 19.5197C16.6093 20.2093 15.1371 20.4196 13.7286 20.1121C12.3201 19.8045 11.0696 18.9997 10.2062 17.8451C9.34283 16.6905 8.92442 15.2635 9.02764 13.8255C9.13087 12.3875 9.74881 11.0349 10.7682 10.0154C11.7877 8.99599 13.1403 8.37805 14.5783 8.27483C16.0163 8.1716 17.4433 8.59001 18.5979 9.45338C19.7525 10.3168 20.5573 11.5673 20.8649 12.9758C21.1724 14.3843 20.9621 15.8565 20.2725 17.1225C20.1769 17.2949 20.153 17.498 20.206 17.6878ZM13.5 13.125C13.5 13.3475 13.434 13.565 13.3104 13.75C13.1868 13.935 13.0111 14.0792 12.8055 14.1644C12.6 14.2495 12.3738 14.2718 12.1555 14.2284C11.9373 14.185 11.7369 14.0778 11.5795 13.9205C11.4222 13.7632 11.315 13.5627 11.2716 13.3445C11.2282 13.1263 11.2505 12.9001 11.3357 12.6945C11.4208 12.4889 11.565 12.3132 11.75 12.1896C11.935 12.066 12.1525 12 12.375 12C12.6734 12 12.9595 12.1185 13.1705 12.3295C13.3815 12.5405 13.5 12.8266 13.5 13.125ZM18.75 13.125C18.75 13.3475 18.684 13.565 18.5604 13.75C18.4368 13.935 18.2611 14.0792 18.0555 14.1644C17.85 14.2495 17.6238 14.2718 17.4055 14.2284C17.1873 14.185 16.9869 14.0778 16.8295 13.9205C16.6722 13.7632 16.565 13.5627 16.5216 13.3445C16.4782 13.1263 16.5005 12.9001 16.5857 12.6945C16.6708 12.4889 16.815 12.3132 17 12.1896C17.185 12.066 17.4025 12 17.625 12C17.9234 12 18.2095 12.1185 18.4205 12.3295C18.6315 12.5405 18.75 12.8266 18.75 13.125Z"
                      fill="#343330"
                    />
                  </svg>
                </span>
                <h3 class="text-sm whitespace-nowrap font-black">
                  Total Interviewed
                </h3>
              </div>
              <p
                class="md:text-5xl text-2xl md:pb-8 md:tracking-tighter font-[Georgia] font-black"
              >
                12
              </p>
            </div>
          </div>
        </div>
        <!--  -->
        <div class="font-[Nexa] bg-[#FFFFFF] w-full rounded-10 px-4 py-4 h-72">
          <h3 class="font-black">Jobs Applied Status</h3>
          <div class="flex gap-4 items-center">
            <div class="flex flex-col items-center pt-6">
              <!-- chart -->
              <div
                class="w-32 h-32 rounded-full border-8 border-black/20"
              ></div>
              <BtnBlueRight class="text-xs md:text-sm" />
            </div>

            <div class="space-y-4">
              <div class="flex items-center space-x-3">
                <div class="bg-[#82410C] w-6 h-6 rounded" />
                <div class="text-sm">
                  <h6 class="font-black">20%</h6>
                  <p>Unsuccessful</p>
                </div>
              </div>
              <div class="flex items-center space-x-3">
                <div class="bg-[#FE8900] w-6 h-6 rounded" />
                <div class="text-sm">
                  <h6 class="font-black">32%</h6>
                  <p>Under Review</p>
                </div>
              </div>
              <div class="flex items-center space-x-3">
                <div class="bg-[#FFD76D] w-6 h-6 rounded" />
                <div class="text-sm">
                  <h6 class="font-black">48%</h6>
                  <p>Interviewed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        class="font-[Nexa] md:mt-4 mt-4 w-full bg-[#FFFFFF] h-72 rounded-10 md:w-2/5"
      >
        <h3 class="font-black border-b px-6 ml-2 py-4 text-base text-gray-800">
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
            <div class="w-full rounded-10 p-2 bg-gray-100 md:mx-4 mx-2">
              <div class="flex items-center space-x-4">
                <img
                  class="w-10 h-10 rounded-10"
                  src="/assets/images/Ellipse12.png"
                  alt="Profile Image"
                />
                <div>
                  <h6 class="font-semibold text-gray-800">Juliet Spincer</h6>
                  <p class="md:text-xs text-[9px] text-gray-500">HR Manager at Microsoft</p>
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
    <DashboardRecentAppHistory class=" md:inline-flex" />
  </div>
</template>
