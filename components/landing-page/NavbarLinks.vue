<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
const route = useRoute();
const router = useRouter();

const links = [
  {
    to: '/',
    name: 'Home',
    pageName: 'home',
  },
  {
    to: '/#pricing',
    name: 'Pricing',
    pageName: 'pricing',
  },
  {
    to: '/auth/signin/recruiter',
    name: 'For Recruiters',
    pageName: 'recruiter.signin',
  },
  {
    to: '/auth/signin/jobseeker',
    name: 'For Job Seekers',
    pageName: 'jobseeker.signin',
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
          : 'text-xs text-white',
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
          ? 'text-primary-1 font-black text-sm border-primary-1 border-l-4 rounded-[5px] h-6'
          : 'text-sm text-[#1D2939]',
        'flex items-center py-4 text-sm',
      ]"
    >
      <component
        class="inline-block mr-2 md:mr-0 md:block"
        :isActive="isActive(link.pageName)"
      />
      {{ link.name }}
    </NuxtLink>
  </li>
</template>
