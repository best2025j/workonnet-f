<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();

const links = [
  {
    to: "/",
    name: "Home",
    pageName: "home",
  },
  {
    to: "/pricing",
    name: "Pricing",
    pageName: "pricing",
    hasSubLinks: true,
    subLinks: [
      { to: "/pricing/jobseekers", name: "Job Seekers" },
      { to: "/pricing/recruiters", name: "Recruiters" },
    ],
  },
  {
    to: "/auth/signin/recruiter",
    name: "For Recruiters",
    pageName: "recruiter.signin",
  },
  {
    to: "/auth/signin/jobseeker",
    name: "For Job Seekers",
    pageName: "jobseeker.signin",
  },
];

const isActive = (pageName: string) => {
  return route.meta?.pageName === pageName;
};

const isPricingDropdownOpen = ref(false);
//make sub-links visible on mobile
const isMobilePricingDropdownOpen = ref(true);

const togglePricingMobile = () => {
  isMobilePricingDropdownOpen.value = !isMobilePricingDropdownOpen.value;
};

const togglePricingDropdown = () => {
  isPricingDropdownOpen.value = !isPricingDropdownOpen.value;
};
const closeDropdown = () => {
  isPricingDropdownOpen.value = false;
}
</script>
<template>
  <!-- for big screen -->
  <li
    v-for="(link, index) in links"
    :key="index"
    class=" cursor-pointer hidden md:block text-[#1D2939]"
  >
    <NuxtLink
    v-if="!link.hasSubLinks"
      :to="link.to"
       :class="[isActive(link.pageName) ? 'text-primary-1 font-black text-xs' : 'text-xs text-black-50']"
    >
      {{ link.name }}
    </NuxtLink>

    <div
      v-if="isActive(link.pageName)"
      class="bg-primary-1 font-bold md:h-[4px] rounded-t-10"
    />
    <button
        v-if="link.hasSubLinks"
        @click="togglePricingDropdown"
        :class="[isActive(link.pageName) ? 'text-primary-1 font-black text-xs' : 'text-xs text-white']"
      >
        {{ link.name }}
      </button>

      <div
        v-if="link.hasSubLinks && isPricingDropdownOpen"
        class="fixed top-[60px] left-[45%] mt-2 bg-white shadow-2xl rounded-lg px-3 py-2 mb-2 text-sm font-normal font-[Inter]"
      >
        <ul>
          <li
            v-for="(subLink, subIndex) in link.subLinks"
            :key="subIndex"
            class="px-4 py-2 hover:bg-[#F9F5FF] hover:text-[#3D3D3D] cursor-pointer"
          >
            <NuxtLink :to="subLink.to"  @click="closeDropdown">
              {{ subLink.name }}
            </NuxtLink>
          </li>
        </ul>
      </div>
  </li>

  

  <!-- for mobile side nav -->
  <li v-for="(link, index) in links" :key="index" class="md:hidden block">
    <div>
      <NuxtLink
        v-if="!link.hasSubLinks"
        :to="link.to"
        :class="[isActive(link.pageName) ? 'text-primary-1 font-black text-sm' : 'text-sm text-[#1D2939]', 'flex  items-center py-2 text-sm']"
      >
        <div
          class="inline-block mr-2 hover:text-primary-1 md:block border-primary-1 border-r-4 rounded-r-[5px] h-6"
          v-if="isActive(link.pageName)"
        />
        {{ link.name }}
      </NuxtLink>

      <!-- Dropdown for Pricing -->
      <div v-if="link.hasSubLinks"
      class="flex flex-col items-start justify-start ">
        <button
          @click="togglePricingMobile"
          class="hover:text-primary-1"
          :class="[isActive(link.pageName) ? ' text-primary-1 font-black text-sm z-10' : 'text-sm text-[#1D2939]']"
        >
          {{ link.name }}
        </button>
        <ul
          v-if="isMobilePricingDropdownOpen"
          class="ml-1 text-primary-1"
        >
          <li
            v-for="(subLink, subIndex) in link.subLinks"
            :key="subIndex"
            class="py-1 text-sm font-normal text-[#1D2939] px-5"
          >
            <NuxtLink :to="subLink.to" class=" hover:text-primary-1">
              {{ subLink.name }}
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </li>
</template>
