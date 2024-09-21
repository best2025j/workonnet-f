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
    to: "/#pricing",
    name: "Pricing",
    pageName: "pricing",
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
</script>

<!-- <template>
 
</template> -->

<template>
  <!-- for big screen -->
  <li
    v-for="(link, index) in links"
    :key="index"
    class="hover:text-primary-1 cursor-pointer hidden md:block text-[#1D2939]"
  >
    <NuxtLink
      :to="link.to"
      :class="[
        isActive(link.pageName)
          ? 'text-primary-1 font-black text-xs'
          : 'text-xs',
          route.meta.pageName === 'home' ? 'text-black-50' : 'text-[#1D2939]'
      ]"
    >
      {{ link.name }}
    </NuxtLink>

    <div
      v-if="isActive(link.pageName)"
      class="bg-primary-1 font-bold md:h-[4px] rounded-t-10"
    />
  </li>

  

  <!-- for mobile side nav -->
  <li v-for="(link, index) in links" :key="index" class="md:hidden block">
    <NuxtLink
      :to="link.to"
      :class="[
        isActive(link.pageName)
          ? 'text-primary-1 font-black text-sm'
          : 'text-sm text-[#1D2939]',
        'flex items-center py-2 text-sm',
      ]"
    >
      <div
        class="inline-block mr-2 md:block border-primary-1 border-r-4 rounded-r-[5px] h-6"
        v-if="isActive(link.pageName)"
      />
      {{ link.name }}
    </NuxtLink>
  </li>
</template>
