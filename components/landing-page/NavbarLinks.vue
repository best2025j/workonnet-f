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
<template>
  <li
    v-for="(link, index) in links"
    :key="index"
    class="hover:text-primary-1 cursor-pointer"
  >
    <NuxtLink
      :to="link.to"
      :class="[
        isActive(link.pageName)
          ? 'text-primary-1 font-black text-sm '
          : 'text-sm text-[#1D2939]',
      ]"
    >
      {{ link.name }}
    </NuxtLink>

    <div
      v-if="isActive(link.pageName)"
      class="md:bg-primary-1 font-bold md:h-[5px] border-primary-1 border-l-4 rounded-t-10"
    />
  </li>
</template>
