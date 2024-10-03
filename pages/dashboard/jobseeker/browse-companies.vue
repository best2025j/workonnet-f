<script setup lang="ts">
import type { IRecruiterDetails } from '~/types';
import type { ApiSuccessResponse, IRecruitersWithPagination } from '~/types';

definePageMeta({
  title: "Browse Companies (Ai)",
  pageName: "dashboard.jobseeker.browse-companies",
  layout: "dashboard",
  middleware: ["auth", "is-jobseeker"],
});

const authStore = useAuthStore();
const userStore = useUserStore();
const recruiterListPage = ref<{}>({});
const isLoading = ref(false);

const recruiters = computed<IRecruiterDetails[]>(() => userStore.recruiters)

const browseCompanies = async () => {
  try {
    if(!userStore.recruiters.length){
      isLoading.value = true;
    }
    const token = authStore.userToken;
    const response = await $fetch('/api/jobseeker/company/browse', {
      headers: {
          Authorization: `Bearer ${token}`,
        },
    });
    const responseData = response as ApiSuccessResponse;

    const { docs, ...other } = responseData.data as IRecruitersWithPagination;
    recruiterListPage.value = other;
    userStore.setRecruiters((responseData.data as IRecruitersWithPagination).docs);

    setTimeout(() => {
      isLoading.value = false;
    }, 1000);
  } catch (e) {
    console.log(e);
  }
};

onBeforeMount(async () => {
 await browseCompanies()
})
</script>

<template>
  <div class="text-black-900 w-full full">
    <div class="flex justify-between flex-col md:flex-row items-center">
      <div class="space-y-1.5">
        <h3 class="md:text-2xl text-xl font-black">Recommended Companies</h3>
        <h1 class="text-sm">
          Based on your profile, company preferences and recent activities
        </h1>
      </div>
      <!-- search inputs -->
      <div class="w-full">
        <div class="flex flex-col md:flex-row w-full gap-2 pt-2 md:justify-end">
          <div class="relative">
            <input
              type="text"
              placeholder="Search"
              class="pl-10 placeholder:text-sm pr-4 h-11 w-full outline-none border border-gray-300 rounded-md"
            />
            <svg
              width="10"
              height="10"
              class="absolute left-3 top-3.5 h-4 w-4 text-gray-400"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.9422 16.0577L13.0305 12.1468C14.1642 10.7856 14.7296 9.03977 14.6089 7.27238C14.4883 5.50499 13.6909 3.85217 12.3826 2.65772C11.0744 1.46328 9.35597 0.819195 7.58492 0.859445C5.81388 0.899695 4.12653 1.62118 2.87389 2.87383C1.62125 4.12647 0.899756 5.81382 0.859506 7.58486C0.819256 9.35591 1.46334 11.0743 2.65779 12.3825C3.85223 13.6908 5.50506 14.4882 7.27244 14.6089C9.03983 14.7295 10.7857 14.1642 12.1469 13.0304L16.0578 16.9421C16.1159 17.0002 16.1848 17.0463 16.2607 17.0777C16.3366 17.1091 16.4179 17.1253 16.5 17.1253C16.5821 17.1253 16.6634 17.1091 16.7393 17.0777C16.8152 17.0463 16.8841 17.0002 16.9422 16.9421C17.0003 16.8841 17.0463 16.8151 17.0777 16.7392C17.1092 16.6634 17.1253 16.5821 17.1253 16.4999C17.1253 16.4178 17.1092 16.3365 17.0777 16.2606C17.0463 16.1848 17.0003 16.1158 16.9422 16.0577ZM2.125 7.74993C2.125 6.63741 2.4549 5.54988 3.07298 4.62485C3.69106 3.69982 4.56957 2.97885 5.5974 2.55311C6.62524 2.12737 7.75624 2.01598 8.84738 2.23302C9.93852 2.45006 10.9408 2.98579 11.7275 3.77246C12.5141 4.55913 13.0499 5.56141 13.2669 6.65255C13.484 7.74369 13.3726 8.87469 12.9468 9.90253C12.5211 10.9304 11.8001 11.8089 10.8751 12.427C9.95005 13.045 8.86252 13.3749 7.75 13.3749C6.25866 13.3733 4.82888 12.7801 3.77435 11.7256C2.71981 10.6711 2.12665 9.24127 2.125 7.74993Z"
                fill="#343330"
              />
            </svg>
          </div>

          <div class="relative">
            <input
              type="text"
              placeholder="Job location"
              class="pl-10 pr-4 h-11 w-full outline-none placeholder:text-sm border border-gray-300 rounded-md"
            />
            <svg
              width="10"
              height="10"
              class="absolute left-3 top-3.5 h-4 w-4 text-gray-400"
              viewBox="0 0 14 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7 4C6.38193 4 5.77775 4.18328 5.26384 4.52666C4.74994 4.87004 4.3494 5.3581 4.11288 5.92911C3.87635 6.50013 3.81447 7.12847 3.93505 7.73466C4.05562 8.34085 4.35325 8.89767 4.79029 9.33471C5.22733 9.77175 5.78415 10.0694 6.39034 10.19C6.99653 10.3105 7.62487 10.2486 8.19589 10.0121C8.7669 9.7756 9.25496 9.37506 9.59834 8.86116C9.94172 8.34725 10.125 7.74307 10.125 7.125C10.125 6.2962 9.79576 5.50134 9.20971 4.91529C8.62366 4.32924 7.8288 4 7 4ZM7 9C6.62916 9 6.26665 8.89003 5.95831 8.68401C5.64996 8.47798 5.40964 8.18514 5.26773 7.84253C5.12581 7.49992 5.08868 7.12292 5.16103 6.75921C5.23337 6.39549 5.41195 6.0614 5.67417 5.79917C5.9364 5.53695 6.27049 5.35837 6.63421 5.28603C6.99792 5.21368 7.37492 5.25081 7.71753 5.39273C8.06014 5.53464 8.35298 5.77496 8.55901 6.08331C8.76503 6.39165 8.875 6.75416 8.875 7.125C8.875 7.62228 8.67746 8.09919 8.32583 8.45083C7.97419 8.80246 7.49728 9 7 9ZM7 0.25C5.17727 0.252068 3.42979 0.97706 2.14092 2.26592C0.85206 3.55479 0.127068 5.30227 0.125 7.125C0.125 9.57812 1.25859 12.1781 3.40625 14.6445C4.37127 15.759 5.45739 16.7626 6.64453 17.6367C6.74962 17.7103 6.87482 17.7498 7.00312 17.7498C7.13143 17.7498 7.25663 17.7103 7.36172 17.6367C8.54668 16.7623 9.63069 15.7587 10.5938 14.6445C12.7383 12.1781 13.875 9.57812 13.875 7.125C13.8729 5.30227 13.1479 3.55479 11.8591 2.26592C10.5702 0.97706 8.82273 0.252068 7 0.25ZM7 16.3438C5.70859 15.3281 1.375 11.5977 1.375 7.125C1.375 5.63316 1.96763 4.20242 3.02252 3.14752C4.07742 2.09263 5.50816 1.5 7 1.5C8.49184 1.5 9.92258 2.09263 10.9775 3.14752C12.0324 4.20242 12.625 5.63316 12.625 7.125C12.625 11.5961 8.29141 15.3281 7 16.3438Z"
                fill="#343330"
              />
            </svg>
          </div>

          <button
            class="bg-primary-1 px-4 flex items-center justify-center p-3 rounded-10"
          >
            <h1 class="text-sm text-white md:hidden font-black pr-1">Search</h1>
            <svg
              width="18"
              height="16"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.5855 9.39804L10.523 14.4605C10.4174 14.5661 10.2743 14.6254 10.125 14.6254C9.97573 14.6254 9.83258 14.5661 9.72703 14.4605C9.62148 14.355 9.56219 14.2118 9.56219 14.0626C9.56219 13.9133 9.62148 13.7701 9.72703 13.6646L13.8298 9.56257H2.8125C2.66332 9.56257 2.52024 9.50331 2.41475 9.39782C2.30926 9.29233 2.25 9.14925 2.25 9.00007C2.25 8.85088 2.30926 8.70781 2.41475 8.60232C2.52024 8.49683 2.66332 8.43757 2.8125 8.43757H13.8298L9.72703 4.33554C9.62148 4.22999 9.56219 4.08684 9.56219 3.93757C9.56219 3.7883 9.62148 3.64515 9.72703 3.5396C9.83258 3.43405 9.97573 3.37476 10.125 3.37476C10.2743 3.37476 10.4174 3.43405 10.523 3.5396L15.5855 8.6021C15.6378 8.65434 15.6793 8.71638 15.7076 8.78466C15.7359 8.85295 15.7504 8.92615 15.7504 9.00007C15.7504 9.07399 15.7359 9.14719 15.7076 9.21547C15.6793 9.28376 15.6378 9.3458 15.5855 9.39804Z"
                fill="white"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
    <!--  grid cards-->
    <div v-if="isLoading" class="h-40 w-full flex items-center justify-center">
      <span class="loader-2"></span>
    </div>
    <div v-else class="grid md:grid-cols-3 gap-4 my-6">
      <div v-for="(recruiter, index) in recruiters" :key="index" class="bg-white h-full p-4 rounded-10 space-y-4">
        <div class="flex justify-between items-start">
          <div class="space-y-2">
            <img v-if="recruiter?.photo" :src="recruiter?.photo?.url" alt="no pix" />
            <h1 class="text-sm font-black">{{ recruiter.companyName }}</h1>
            <h1 class="text-xs">{{recruiter.location }}</h1>
          </div>
          <!-- <button class="py-2 text-primary-1 text-sm px-3 rounded-10">3 jobs</button> -->
        </div>
        <div class="md:text-sm text-xs text-[#000]">
         {{recruiter?.bio?.substring(0, 200)+'...'}}
        </div>
        <div>
          <!-- <NuxtLink
            
            class="border-primary-1 border py-2.5 rounded-10 text-xs px-4 text-primary-1"
          >
            More Information
          </NuxtLink> -->
        </div>
      </div>
    </div>
    <!-- button for pagination -->
    <!-- <div class="flex gap-2 justify-center items- py-4">
      <button class="py-2 px-4 rounded-10 border bg-black-400">
        <svg
          width="9"
          height="12"
          viewBox="0 0 9 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.16 1.41L3.58 6L8.16 10.59L6.75 12L0.750004 6L6.75 0L8.16 1.41Z"
            fill="#C4CDD5"
          />
        </svg>
      </button>
      <button class="py-2 px-4 rounded-10 border border-primary-1">1</button>
      <button class="py-2 px-4 rounded-10 border border-black-300">2</button>
      <button class="rounded-10 px-4 py-2 border border-black-300">
        <svg
          width="8"
          height="2"
          viewBox="0 0 8 2"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.0338 1.084C0.903138 1.084 0.791138 1.042 0.697805 0.958C0.604471 0.864667 0.557805 0.752667 0.557805 0.622C0.557805 0.482 0.604471 0.37 0.697805 0.286C0.791138 0.192667 0.903138 0.146 1.0338 0.146C1.1738 0.146 1.2858 0.192667 1.3698 0.286C1.46314 0.37 1.5098 0.482 1.5098 0.622C1.5098 0.752667 1.46314 0.864667 1.3698 0.958C1.2858 1.042 1.1738 1.084 1.0338 1.084ZM4.0006 1.084C3.86993 1.084 3.75793 1.042 3.6646 0.958C3.57127 0.864667 3.5246 0.752667 3.5246 0.622C3.5246 0.482 3.57127 0.37 3.6646 0.286C3.75793 0.192667 3.86993 0.146 4.0006 0.146C4.1406 0.146 4.2526 0.192667 4.3366 0.286C4.42993 0.37 4.4766 0.482 4.4766 0.622C4.4766 0.752667 4.42993 0.864667 4.3366 0.958C4.2526 1.042 4.1406 1.084 4.0006 1.084ZM6.9674 1.084C6.83673 1.084 6.72473 1.042 6.6314 0.958C6.53807 0.864667 6.4914 0.752667 6.4914 0.622C6.4914 0.482 6.53807 0.37 6.6314 0.286C6.72473 0.192667 6.83673 0.146 6.9674 0.146C7.1074 0.146 7.2194 0.192667 7.3034 0.286C7.39673 0.37 7.4434 0.482 7.4434 0.622C7.4434 0.752667 7.39673 0.864667 7.3034 0.958C7.2194 1.042 7.1074 1.084 6.9674 1.084Z"
            fill="#3D3D3D"
          />
        </svg>
      </button>
      <button class="py-2 px-4 rounded-10 border border-black-300">9</button>
      <button class="py-2 px-4 rounded-10 border border-black-300">10</button>
      <button class="py-2 px-4 rounded-10 border border-black-300">
        <svg
          width="9"
          height="12"
          viewBox="0 0 9 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0.839996 1.41L5.42 6L0.839996 10.59L2.25 12L8.25 6L2.25 0L0.839996 1.41Z"
            fill="#C4CDD5"
          />
        </svg>
      </button>
    </div> -->
  </div>
</template>
