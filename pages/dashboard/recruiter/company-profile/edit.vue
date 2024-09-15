<script setup lang="ts">
definePageMeta({
  title: "Company Profile",
  pageName: "dashboard.recruiter.company-profile.edit",
  layout: "dashboard",
  middleware: ['auth']
});
</script>

<template>
  <div class="w-full h-full">
    <div class="text-black-700 flex gap-4 text-sm h-full w-full relative">
      <div class="w-[28rem] fixed rounded-10 font-[Georgia] h-full">
        <div class="divide-y bg-white p-6 border-primary-1 border-l-4">
          <div class="space-x-3 flex items-center">
            <span
              ><svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 0.25C8.07164 0.25 6.18657 0.821828 4.58319 1.89317C2.97982 2.96451 1.73013 4.48726 0.992179 6.26884C0.254225 8.05042 0.061142 10.0108 0.437348 11.9021C0.813554 13.7934 1.74215 15.5307 3.10571 16.8943C4.46928 18.2579 6.20656 19.1865 8.09787 19.5627C9.98919 19.9389 11.9496 19.7458 13.7312 19.0078C15.5127 18.2699 17.0355 17.0202 18.1068 15.4168C19.1782 13.8134 19.75 11.9284 19.75 10C19.7473 7.41498 18.7192 4.93661 16.8913 3.10872C15.0634 1.28084 12.585 0.25273 10 0.25ZM9.625 4.75C9.84751 4.75 10.065 4.81598 10.25 4.9396C10.435 5.06321 10.5792 5.23891 10.6644 5.44448C10.7495 5.65005 10.7718 5.87625 10.7284 6.09448C10.685 6.31271 10.5778 6.51316 10.4205 6.6705C10.2632 6.82783 10.0627 6.93498 9.84448 6.97838C9.62625 7.02179 9.40005 6.99951 9.19449 6.91436C8.98892 6.82922 8.81322 6.68502 8.6896 6.50002C8.56598 6.31501 8.5 6.0975 8.5 5.875C8.5 5.57663 8.61853 5.29048 8.82951 5.0795C9.04049 4.86853 9.32664 4.75 9.625 4.75ZM10.75 15.25C10.3522 15.25 9.97065 15.092 9.68934 14.8107C9.40804 14.5294 9.25 14.1478 9.25 13.75V10C9.05109 10 8.86033 9.92098 8.71967 9.78033C8.57902 9.63968 8.5 9.44891 8.5 9.25C8.5 9.05109 8.57902 8.86032 8.71967 8.71967C8.86033 8.57902 9.05109 8.5 9.25 8.5C9.64783 8.5 10.0294 8.65804 10.3107 8.93934C10.592 9.22064 10.75 9.60218 10.75 10V13.75C10.9489 13.75 11.1397 13.829 11.2803 13.9697C11.421 14.1103 11.5 14.3011 11.5 14.5C11.5 14.6989 11.421 14.8897 11.2803 15.0303C11.1397 15.171 10.9489 15.25 10.75 15.25Z"
                  fill="#FE8900"
                />
              </svg>
            </span>
            <NuxtLink :to="{ hash: '#basic_information' }">
              <h1 class="text-primary-1 font-bold">
                Company’s Basic Information
              </h1></NuxtLink
            >
          </div>
        </div>
        <div class="border-t-2 bg-white p-6">
          <div class="space-x-3 flex items-center">
            <span
              ><svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22.5 19.5H21V9C21 8.60217 20.842 8.22064 20.5607 7.93934C20.2794 7.65803 19.8978 7.5 19.5 7.5H13.5V3C13.5002 2.72837 13.4266 2.46179 13.2871 2.22872C13.1476 1.99564 12.9474 1.80482 12.708 1.67661C12.4685 1.54841 12.1987 1.48764 11.9274 1.50078C11.6561 1.51393 11.3935 1.60049 11.1675 1.75125L3.6675 6.75C3.46176 6.88727 3.29315 7.07328 3.17669 7.29148C3.06023 7.50968 2.99953 7.75329 3 8.00062V19.5H1.5C1.30109 19.5 1.11032 19.579 0.96967 19.7197C0.829018 19.8603 0.75 20.0511 0.75 20.25C0.75 20.4489 0.829018 20.6397 0.96967 20.7803C1.11032 20.921 1.30109 21 1.5 21H22.5C22.6989 21 22.8897 20.921 23.0303 20.7803C23.171 20.6397 23.25 20.4489 23.25 20.25C23.25 20.0511 23.171 19.8603 23.0303 19.7197C22.8897 19.579 22.6989 19.5 22.5 19.5ZM19.5 9V19.5H13.5V9H19.5ZM4.5 8.00062L12 3V19.5H4.5V8.00062ZM10.5 10.5V12C10.5 12.1989 10.421 12.3897 10.2803 12.5303C10.1397 12.671 9.94891 12.75 9.75 12.75C9.55109 12.75 9.36032 12.671 9.21967 12.5303C9.07902 12.3897 9 12.1989 9 12V10.5C9 10.3011 9.07902 10.1103 9.21967 9.96967C9.36032 9.82902 9.55109 9.75 9.75 9.75C9.94891 9.75 10.1397 9.82902 10.2803 9.96967C10.421 10.1103 10.5 10.3011 10.5 10.5ZM7.5 10.5V12C7.5 12.1989 7.42098 12.3897 7.28033 12.5303C7.13968 12.671 6.94891 12.75 6.75 12.75C6.55109 12.75 6.36032 12.671 6.21967 12.5303C6.07902 12.3897 6 12.1989 6 12V10.5C6 10.3011 6.07902 10.1103 6.21967 9.96967C6.36032 9.82902 6.55109 9.75 6.75 9.75C6.94891 9.75 7.13968 9.82902 7.28033 9.96967C7.42098 10.1103 7.5 10.3011 7.5 10.5ZM7.5 15.75V17.25C7.5 17.4489 7.42098 17.6397 7.28033 17.7803C7.13968 17.921 6.94891 18 6.75 18C6.55109 18 6.36032 17.921 6.21967 17.7803C6.07902 17.6397 6 17.4489 6 17.25V15.75C6 15.5511 6.07902 15.3603 6.21967 15.2197C6.36032 15.079 6.55109 15 6.75 15C6.94891 15 7.13968 15.079 7.28033 15.2197C7.42098 15.3603 7.5 15.5511 7.5 15.75ZM10.5 15.75V17.25C10.5 17.4489 10.421 17.6397 10.2803 17.7803C10.1397 17.921 9.94891 18 9.75 18C9.55109 18 9.36032 17.921 9.21967 17.7803C9.07902 17.6397 9 17.4489 9 17.25V15.75C9 15.5511 9.07902 15.3603 9.21967 15.2197C9.36032 15.079 9.55109 15 9.75 15C9.94891 15 10.1397 15.079 10.2803 15.2197C10.421 15.3603 10.5 15.5511 10.5 15.75Z"
                  fill="#3D3D3D"
                />
              </svg>
            </span>
            <NuxtLink :to="{ hash: '#about_me' }">
              <h1 class="font-bold text-sm text-black-600">
                About the company
              </h1></NuxtLink
            >
          </div>
        </div>
        <div class="border-t-2 bg-white p-6">
          <div class="space-x-3 flex items-center">
            <span
              ><svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.5309 8.46975C15.6006 8.53941 15.6559 8.62212 15.6937 8.71317C15.7314 8.80422 15.7509 8.90182 15.7509 9.00038C15.7509 9.09894 15.7314 9.19654 15.6937 9.28758C15.6559 9.37863 15.6006 9.46135 15.5309 9.531L9.53089 15.531C9.46121 15.6007 9.37849 15.656 9.28744 15.6937C9.1964 15.7314 9.09881 15.7508 9.00027 15.7508C8.90172 15.7508 8.80414 15.7314 8.7131 15.6937C8.62205 15.656 8.53933 15.6007 8.46964 15.531C8.39996 15.4613 8.34469 15.3786 8.30697 15.2875C8.26926 15.1965 8.24985 15.0989 8.24985 15.0004C8.24985 14.9018 8.26926 14.8043 8.30697 14.7132C8.34469 14.6222 8.39996 14.5394 8.46964 14.4698L14.4696 8.46975C14.5393 8.40002 14.622 8.3447 14.7131 8.30696C14.8041 8.26922 14.9017 8.24979 15.0003 8.24979C15.0988 8.24979 15.1964 8.26922 15.2875 8.30696C15.3785 8.3447 15.4612 8.40002 15.5309 8.46975ZM20.2128 3.78788C19.7253 3.30031 19.1465 2.91355 18.5095 2.64968C17.8725 2.38581 17.1898 2.25 16.5003 2.25C15.8108 2.25 15.1281 2.38581 14.4911 2.64968C13.8541 2.91355 13.2753 3.30031 12.7878 3.78788L9.96964 6.60507C9.82891 6.7458 9.74985 6.93667 9.74985 7.13569C9.74985 7.33471 9.82891 7.52559 9.96964 7.66632C10.1104 7.80705 10.3012 7.88611 10.5003 7.88611C10.6993 7.88611 10.8902 7.80705 11.0309 7.66632L13.849 4.85382C14.5548 4.16349 15.5044 3.77936 16.4917 3.7848C17.479 3.79024 18.4243 4.1848 19.1225 4.88286C19.8207 5.58092 20.2154 6.52615 20.221 7.51343C20.2266 8.5007 19.8427 9.45037 19.1525 10.1563L16.3334 12.9744C16.1927 13.115 16.1136 13.3058 16.1135 13.5047C16.1134 13.7037 16.1923 13.8945 16.3329 14.0352C16.4735 14.176 16.6643 14.2551 16.8632 14.2552C17.0622 14.2552 17.253 14.1763 17.3937 14.0357L20.2128 11.2129C20.7003 10.7254 21.0871 10.1466 21.351 9.50959C21.6148 8.8726 21.7506 8.18986 21.7506 7.50038C21.7506 6.81089 21.6148 6.12816 21.351 5.49117C21.0871 4.85417 20.7003 4.27539 20.2128 3.78788ZM12.9696 16.3335L10.1515 19.1516C9.80472 19.5062 9.39102 19.7885 8.93438 19.9821C8.47774 20.1757 7.98722 20.2768 7.49124 20.2795C6.99526 20.2823 6.50367 20.1866 6.04492 19.998C5.58617 19.8094 5.16939 19.5317 4.81871 19.181C4.46802 18.8302 4.1904 18.4134 4.00192 17.9546C3.81343 17.4959 3.71783 17.0042 3.72065 16.5083C3.72347 16.0123 3.82465 15.5218 4.01834 15.0652C4.21203 14.6086 4.49437 14.1949 4.84902 13.8482L7.66621 11.031C7.80694 10.8903 7.886 10.6994 7.886 10.5004C7.886 10.3014 7.80694 10.1105 7.66621 9.96975C7.52548 9.82902 7.3346 9.74996 7.13558 9.74996C6.93656 9.74996 6.74569 9.82902 6.60496 9.96975L3.78777 12.7879C2.80315 13.7725 2.25 15.1079 2.25 16.5004C2.25 17.8928 2.80315 19.2283 3.78777 20.2129C4.77238 21.1975 6.10781 21.7506 7.50027 21.7506C8.89273 21.7506 10.2282 21.1975 11.2128 20.2129L14.0309 17.3938C14.1715 17.2531 14.2504 17.0623 14.2504 16.8633C14.2503 16.6644 14.1712 16.4736 14.0304 16.333C13.8897 16.1924 13.6989 16.1135 13.4999 16.1136C13.301 16.1137 13.1102 16.1928 12.9696 16.3335Z"
                  fill="#3D3D3D"
                />
              </svg>
            </span>

            <NuxtLink :to="{ hash: '#links' }">
              <h1 class="font-bold text-sm text-black-600">
                Company Links
              </h1></NuxtLink
            >
          </div>
        </div>
      </div>

      <!--  -->
      <div class="h-full ml-[30rem] space-y-4 w-3/4">
        <div
          id="basic_information"
          class="bg-white w-full rounded-10 p-6 h-full space-y-3"
        >
          <h1 class="font-bold text-xl font-[Georgia]">
            Company’s Basic Information
          </h1>
          <div class="flex divide-x-2 gap-x-4">
            <div class="py-2">
              <div class="pb-6 space-y-4">
                <img src="/assets/images/sportify.png" alt="" />
                <button
                  class="text-xs py-2 text-primary-1 border px-3.5 rounded-8 border-primary-1 font-[Nexa] font-[100]"
                >
                  Replace company photo
                </button>
              </div>

              <!--  -->
              <div class="bg-black-50 w-44 space-y-4 p-3 rounded-10">
                <div class="flex items-start gap-x-2">
                  <span
                    ><svg
                      width="20"
                      height="18"
                      viewBox="0 0 20 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M18.25 0.75H1.75C1.35218 0.75 0.970644 0.908035 0.68934 1.18934C0.408035 1.47064 0.25 1.85218 0.25 2.25V15.75C0.25 16.1478 0.408035 16.5294 0.68934 16.8107C0.970644 17.092 1.35218 17.25 1.75 17.25H18.25C18.6478 17.25 19.0294 17.092 19.3107 16.8107C19.592 16.5294 19.75 16.1478 19.75 15.75V2.25C19.75 1.85218 19.592 1.47064 19.3107 1.18934C19.0294 0.908035 18.6478 0.75 18.25 0.75ZM18.25 2.25V11.8828L15.8059 9.43969C15.6666 9.30036 15.5013 9.18984 15.3193 9.11444C15.1372 9.03904 14.9422 9.00023 14.7452 9.00023C14.5481 9.00023 14.3531 9.03904 14.1711 9.11444C13.989 9.18984 13.8237 9.30036 13.6844 9.43969L11.8094 11.3147L7.68438 7.18969C7.4031 6.9086 7.02172 6.7507 6.62406 6.7507C6.22641 6.7507 5.84503 6.9086 5.56375 7.18969L1.75 11.0034V2.25H18.25ZM1.75 13.125L6.625 8.25L14.125 15.75H1.75V13.125ZM18.25 15.75H16.2466L12.8716 12.375L14.7466 10.5L18.25 14.0044V15.75ZM11.5 6.375C11.5 6.1525 11.566 5.93499 11.6896 5.74998C11.8132 5.56498 11.9889 5.42078 12.1945 5.33564C12.4 5.25049 12.6262 5.22821 12.8445 5.27162C13.0627 5.31502 13.2632 5.42217 13.4205 5.5795C13.5778 5.73684 13.685 5.93729 13.7284 6.15552C13.7718 6.37375 13.7495 6.59995 13.6644 6.80552C13.5792 7.01109 13.435 7.18679 13.25 7.3104C13.065 7.43402 12.8475 7.5 12.625 7.5C12.3266 7.5 12.0405 7.38147 11.8295 7.1705C11.6185 6.95952 11.5 6.67337 11.5 6.375Z"
                        fill="#343330"
                      />
                    </svg>
                  </span>
                  <div class="space-y-2">
                    <h1 class="text-xs">Choose banner photo</h1>
                    <h1 class="text-xs text-info-600">Document Name.pdf</h1>
                  </div>
                </div>

                <button
                  class="text-xs py-2 w-full text-primary-1 border px-3.5 rounded-8 border-primary-1 font-[Nexa] font-[100]"
                >
                  Replace photo
                </button>
              </div>
            </div>

            <!-- input for full name -->
            <div class="p-4 pl-12 font-[Nexa] w-full space-y-4">
              <!-- ocupation -->
              <div class="flex flex-col w-full">
                <label for="first-name" class="text-sm mb-2">Full Name</label>
                <input
                  type="text"
                  placeholder="Enter your full name here"
                  class="pl-2 placeholder:text-sm pr-4 h-11 outline-none border border-gray-300 rounded-md"
                />
              </div>
              <!--  -->
              <div class="flex flex-col w-full">
                <label for="first-name" class="text-sm mb-2"
                  >Email Address</label
                >
                <input
                  type="text"
                  placeholder="example@example.com"
                  class="pl-2 placeholder:text-sm pr-4 h-11 outline-none border border-gray-300 rounded-md"
                />
              </div>
              <!-- company -->
              <div class="flex flex-col">
                <label for="first-name" class="text-sm mb-2"
                  >Company Name</label
                >
                <input
                  type="text"
                  placeholder="Workonnect"
                  class="pl-2 placeholder:text-sm pr-4 h-11 outline-none border border-gray-300 rounded-md"
                />
              </div>

              <!--  -->
              <div class="flex flex-col">
                <label for="first-name" class="text-sm mb-2">Website</label>
                <input
                  type="text"
                  placeholder="example.com"
                  class="pl-2 placeholder:text-sm pr-4 h-11 outline-none border border-gray-300 rounded-md"
                />
              </div>

              <!--  -->
              <div class="flex flex-col">
                <label for="first-name" class="text-sm mb-2"
                  >Company Size</label
                >
                <div class="relative w-full">
                  <input
                    type="text"
                    placeholder="Monthly"
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

              <!--  -->
              <div class="flex gap-2">
                <div class="flex flex-col w-full">
                  <label for="first-name" class="text-sm mb-2">Location</label>
                  <input
                    type="text"
                    placeholder="Ikeja Lagos, Nigeria"
                    class="pl-2 placeholder:text-sm pr-4 h-11 outline-none border border-gray-300 rounded-md"
                  />
                </div>
              </div>
            </div>
            <!-- social media links -->
          </div>
        </div>

        <!-- about -->
        <div id="about_me" class="bg-white p-4 rounded-10 font-[Nexa]">
          <h1 class="font-bold text-xl font-[Georgia]">About me</h1>
          <p class="text-xs">
            Write something about you that entice the recruiters......
          </p>

          <!--  -->
          <div class="flex flex-col space-y-4 pt-6">
            <div class="flex flex-col w-full">
              <label for="first-name" class="text-sm mb-2">Section Title</label>
              <input
                type="text"
                placeholder="About me"
                class="pl-2 placeholder:text-sm pr-4 h-11 outline-none border border-gray-300 rounded-md"
              />
            </div>

            <div class="flex flex-col w-full">
              <label for="first-name" class="text-sm mb-2">Description</label>
              <textarea
                type="text"
                rows="10"
                placeholder="Write something about you that entice the recruiters......"
                class="p-2 border border-gray-300 rounded-lg w-full"
              />
            </div>
          </div>

          <!-- about me -->
        </div>

        <!-- social media links-->
        <div id="links" class="bg-white p-4 rounded-10 font-[Nexa]">
          <h1 class="font-bold text-xl font-[Georgia]">Links</h1>
          <p class="text-xs">
            Build trust with recruiters by verifying your social profiles
          </p>

          <!-- company links -->
          <div class="flex w-3/4 flex-col h-full">
            <label for="first-name" class="text-sm mb-2">Company URL</label>
            <div class="flex w-full gap-x-2">
              <div class="flex flex-grow w-full">
                <input
                  type="text"
                  placeholder="http://exampltext.example.com"
                  class="pl-2 placeholder:text-sm pr-4 h-11 outline-none border w-full border-gray-300 rounded-md"
                />
              </div>

              <div>
                <button class="border p-3 rounded-5">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14.375 5H3.125C2.95924 5 2.80027 5.06585 2.68306 5.18306C2.56585 5.30027 2.5 5.45924 2.5 5.625V16.875C2.5 17.0408 2.56585 17.1997 2.68306 17.3169C2.80027 17.4342 2.95924 17.5 3.125 17.5H14.375C14.5408 17.5 14.6997 17.4342 14.8169 17.3169C14.9342 17.1997 15 17.0408 15 16.875V5.625C15 5.45924 14.9342 5.30027 14.8169 5.18306C14.6997 5.06585 14.5408 5 14.375 5ZM13.75 16.25H3.75V6.25H13.75V16.25ZM17.5 3.125V14.375C17.5 14.5408 17.4342 14.6997 17.3169 14.8169C17.1997 14.9342 17.0408 15 16.875 15C16.7092 15 16.5503 14.9342 16.4331 14.8169C16.3158 14.6997 16.25 14.5408 16.25 14.375V3.75H5.625C5.45924 3.75 5.30027 3.68415 5.18306 3.56694C5.06585 3.44973 5 3.29076 5 3.125C5 2.95924 5.06585 2.80027 5.18306 2.68306C5.30027 2.56585 5.45924 2.5 5.625 2.5H16.875C17.0408 2.5 17.1997 2.56585 17.3169 2.68306C17.4342 2.80027 17.5 2.95924 17.5 3.125Z"
                      fill="#6D6D6D"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div class="flex w-3/4 flex-col h-full">
            <label for="first-name" class="text-sm mb-2">Company job URL</label>
            <div class="flex w-full gap-x-2">
              <div class="flex flex-grow w-full">
                <input
                  type="text"
                  placeholder="http://exampltext.example.com"
                  class="pl-2 placeholder:text-sm pr-4 h-11 outline-none border w-full border-gray-300 rounded-md"
                />
              </div>

              <div>
                <button class="border p-3 rounded-5">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14.375 5H3.125C2.95924 5 2.80027 5.06585 2.68306 5.18306C2.56585 5.30027 2.5 5.45924 2.5 5.625V16.875C2.5 17.0408 2.56585 17.1997 2.68306 17.3169C2.80027 17.4342 2.95924 17.5 3.125 17.5H14.375C14.5408 17.5 14.6997 17.4342 14.8169 17.3169C14.9342 17.1997 15 17.0408 15 16.875V5.625C15 5.45924 14.9342 5.30027 14.8169 5.18306C14.6997 5.06585 14.5408 5 14.375 5ZM13.75 16.25H3.75V6.25H13.75V16.25ZM17.5 3.125V14.375C17.5 14.5408 17.4342 14.6997 17.3169 14.8169C17.1997 14.9342 17.0408 15 16.875 15C16.7092 15 16.5503 14.9342 16.4331 14.8169C16.3158 14.6997 16.25 14.5408 16.25 14.375V3.75H5.625C5.45924 3.75 5.30027 3.68415 5.18306 3.56694C5.06585 3.44973 5 3.29076 5 3.125C5 2.95924 5.06585 2.80027 5.18306 2.68306C5.30027 2.56585 5.45924 2.5 5.625 2.5H16.875C17.0408 2.5 17.1997 2.56585 17.3169 2.68306C17.4342 2.80027 17.5 2.95924 17.5 3.125Z"
                      fill="#6D6D6D"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="flex gap-x-4 justify-end">
          <div>
            <button class="px-4 py-2 bg-primary-1 text-white rounded-5">
              Save
            </button>
          </div>
          <div>
            <button
              class="px-4 py-2 border border-danger-600 text-danger-600 rounded-5"
            >
              Cancel
            </button>
          </div>
        </div>

        <!-- work experience -->
        <!-- <div id="work_experience" class="bg-white p-4 rounded-10 font-[Nexa]">
          <div class="flex justify-between items-center">
            <div class="py-4">
              <h1 class="font-bold text-xl font-[Georgia] capitalize">
                work experience
              </h1>
              <p class="text-xs">
                Build trust with recruiters by verifying your social profiles
              </p>
            </div>

            <div>
              <button class="px-4 py-2 bg-primary-1 text-white rounded-5">
                Edit experience
              </button>
            </div>
          </div>

          <ul class="list-disc pl-4 space-y-4">
            <div>
              <li class="text-info-600 font-black">
                User Interface Designer at Workonnect
              </li>
              <div class="text-sm flex gap-3">
                <h1 class="font-black">May - June 2020</h1>
                <h1>Lagos, Nigeria.</h1>
              </div>
            </div>

            <div>
              <li class="text-info-600 font-black">Accountant at Workonnect</li>
              <div class="text-sm flex gap-3">
                <h1 class="font-black">May - June 2020</h1>
                <h1>Lagos, Nigeria.</h1>
              </div>
            </div>

            <div>
              <li class="text-info-600 font-black">HR Manager at Workonnect</li>
              <div class="text-sm flex gap-3">
                <h1 class="font-black">May - June 2020</h1>
                <h1>Lagos, Nigeria.</h1>
              </div>
            </div>

            <div>
              <li class="text-info-600 font-black">
                Graphic Designer at Workonnect
              </li>
              <div class="text-sm flex gap-3">
                <h1 class="font-black">May - June 2020</h1>
                <h1>Lagos, Nigeria.</h1>
              </div>
            </div>
          </ul>


        </div> -->
      </div>
    </div>
  </div>
</template>
