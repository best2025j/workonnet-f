<script setup lang="ts">
definePageMeta({
  title: 'Company Profile',
  pageName: 'dashboard.recruiter.company-profile.index',
  layout: 'dashboard',
  middleware: ['auth', 'is-recruiter'],
});

const userStore = useUserStore();
const userData = computed(() => userStore.loggedInUserDetails);
</script>

<template>
  <div class="w-full h-full">
    <div class="p-4 bg-white rounded-10">
      <div
        class="w-full h-32 md:h-[214px] flex items-center justify-center bg-black-400 rounded"
        v-if="!userData?.photoHeader"
      >
      <span class="text-white">No Header Photo</span>
      </div>
      <img
         v-if="userData?.photoHeader"
        :src="userData?.photoHeader.url"
        class="w-full h-32 md:h-[214px]"
        alt="no image yet..."
      />
      <div class="mt-12 md:pl-6 pl-3 space-y-2 z-[9999px] relative">
        <div
          class="bg-white rounded-full h-[100px] w-[100px] border-2 z-[9999px] flex items-center justify-center absolute -top-24"
        >
          <img
            v-if="userData.photo"
            :src="userData.photo.url"
            class="rounded-full max-w-[100px] max-h-[100px]"
            alt="profile-image"
          />
        </div>
        <div class="flex flex-col md:flex-row justify-between pt-3">
          <div class="space-y-2">
            <div class="flex items-center space-x-6">
              <h1 class="font-black text-sm md:text-base">
                {{ userData.fullName }}
              </h1>
            </div>

            <div class="flex items-start space-x-4">
              <div class="space-y-2">
                <h1 class="text-xs flex items-center gap-x-2">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M21 4.5H3C2.80109 4.5 2.61032 4.57902 2.46967 4.71967C2.32902 4.86032 2.25 5.05109 2.25 5.25V18C2.25 18.3978 2.40804 18.7794 2.68934 19.0607C2.97064 19.342 3.35218 19.5 3.75 19.5H20.25C20.6478 19.5 21.0294 19.342 21.3107 19.0607C21.592 18.7794 21.75 18.3978 21.75 18V5.25C21.75 5.05109 21.671 4.86032 21.5303 4.71967C21.3897 4.57902 21.1989 4.5 21 4.5ZM19.0716 6L12 12.4828L4.92844 6H19.0716ZM20.25 18H3.75V6.95531L11.4928 14.0531C11.6312 14.1801 11.8122 14.2506 12 14.2506C12.1878 14.2506 12.3688 14.1801 12.5072 14.0531L20.25 6.95531V18Z"
                      fill="#343330"
                    />
                  </svg>
                  {{ userData.companyName || 'N/A' }}
                </h1>
                <h1 class="text-xs flex items-center gap-x-2">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 6C11.2583 6 10.5333 6.21993 9.91661 6.63199C9.29993 7.04404 8.81928 7.62971 8.53545 8.31494C8.25162 9.00016 8.17736 9.75416 8.32205 10.4816C8.46675 11.209 8.8239 11.8772 9.34835 12.4017C9.8728 12.9261 10.541 13.2833 11.2684 13.4279C11.9958 13.5726 12.7498 13.4984 13.4351 13.2145C14.1203 12.9307 14.706 12.4501 15.118 11.8334C15.5301 11.2167 15.75 10.4917 15.75 9.75C15.75 8.75544 15.3549 7.80161 14.6517 7.09835C13.9484 6.39509 12.9946 6 12 6ZM12 12C11.555 12 11.12 11.868 10.75 11.6208C10.38 11.3736 10.0916 11.0222 9.92127 10.611C9.75097 10.1999 9.70642 9.7475 9.79323 9.31105C9.88005 8.87459 10.0943 8.47368 10.409 8.15901C10.7237 7.84434 11.1246 7.63005 11.561 7.54323C11.9975 7.45642 12.4499 7.50097 12.861 7.67127C13.2722 7.84157 13.6236 8.12996 13.8708 8.49997C14.118 8.86998 14.25 9.30499 14.25 9.75C14.25 10.3467 14.0129 10.919 13.591 11.341C13.169 11.7629 12.5967 12 12 12ZM12 1.5C9.81273 1.50248 7.71575 2.37247 6.16911 3.91911C4.62247 5.46575 3.75248 7.56273 3.75 9.75C3.75 12.6938 5.11031 15.8138 7.6875 18.7734C8.84552 20.1108 10.1489 21.3151 11.5734 22.3641C11.6995 22.4524 11.8498 22.4998 12.0037 22.4998C12.1577 22.4998 12.308 22.4524 12.4341 22.3641C13.856 21.3147 15.1568 20.1104 16.3125 18.7734C18.8859 15.8138 20.25 12.6938 20.25 9.75C20.2475 7.56273 19.3775 5.46575 17.8309 3.91911C16.2843 2.37247 14.1873 1.50248 12 1.5ZM12 20.8125C10.4503 19.5938 5.25 15.1172 5.25 9.75C5.25 7.95979 5.96116 6.2429 7.22703 4.97703C8.4929 3.71116 10.2098 3 12 3C13.7902 3 15.5071 3.71116 16.773 4.97703C18.0388 6.2429 18.75 7.95979 18.75 9.75C18.75 15.1153 13.5497 19.5938 12 20.8125Z"
                      fill="#343330"
                    />
                  </svg>
                  {{ userData.location || 'N/A' }}
                </h1>
              </div>
            </div>
          </div>

          <div>
            <div class="flex justify-end w-full">
              <NuxtLink to="/dashboard/recruiter/company-profile/edit">
                <button
                  class="px-4 py-2 rounded-8 text-xs text-white bg-primary-1"
                >
                  {{
                    userData.status === 'draft'
                      ? 'Complete my profile'
                      : 'Edit company profile info'
                  }}
                </button>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="p-4 mt-4 bg-white rounded-10">
      <div class="space-y-4">
        <h1 class="font-black text-sm">About my company</h1>
        <p class="text-xs">
          {{ userData.bio || "This should be the company's about" }}
        </p>
        <h1 class="text-sm font-black">My company size</h1>
        <p class="text-xs">{{ userData.companySize || 'N/A' }}</p>
        <h1 class="text-sm font-black">Website</h1>
        <p class="text-xs">{{ userData.websiteUrl }}</p>
        <h1 class="text-sm font-black">Company links</h1>

        <!-- company links -->
        <div class="flex md:w-1/3 flex-col h-full">
          <label for="first-name" class="text-sm mb-2">Company URL</label>
          <div class="flex w-full gap-x-2">
            <div class="flex flex-grow w-full">
              <input
                type="text"
                readonly
                :placeholder="userData.websiteUrl"
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

        <div class="flex md:w-1/3 flex-col h-full" v-if="userData.jobUrl">
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
    </div>
  </div>
</template>
