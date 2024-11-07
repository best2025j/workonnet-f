<script setup lang="ts">
const route = useRoute();
const router = useRouter();

onMounted(() => {
  if (!route?.query?.tab) {
    router.replace("/dashboard/jobseeker/find-jobs?tab=all");
  }
});

const links = [
  {
    to: "/dashboard/jobseeker/find-jobs?tab=all",
    name: "All",
    disabled: false,
    badge: 4,
    tabId:'all',
  },
  {
    to: "/dashboard/jobseeker/find-jobs?tab=recommended",
    name: "Recommended",
    disabled: false,
    badge: 2,
    tabId: 'recommended',
  },
  {
    to: "/dashboard/jobseeker/find-jobs?tab=matched",
    name: "Matched",
    disabled: false,
    tabId: 'matched',
  },
];

const isActive = (currentTab: string) => route?.query?.tab === currentTab;
</script>

<template>
  <nav class="flex md:w-3/5 w-full border-b-2">
    <ul class="flex md:gap-x-6 gap-4 items-center">
      <li v-for="(link, index) in links" :key="index" :class="[index ===  0 ? 'md:pl-2' : 'md:pl-5']">
        <NuxtLink
          :to="link.to"
          :class="[
            'flex items-center pb-2',
            isActive(link.tabId)
              ? 'text-primary-1 border-primary-1 font-black md:text-sm text-[10px]'
              : 'md:text-sm text-[10px]',
          ]"
        >
          {{ link.name }}
        </NuxtLink>
        
        <div
          v-if="isActive(link.tabId)"
          class="bg-primary-1 font-bold h-[5px] rounded-t-10"
        />
      </li>
    </ul>
  </nav>
</template>

<style scoped></style>
