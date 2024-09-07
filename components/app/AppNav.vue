<script setup lang="ts">
const route = useRoute();
const router = useRouter();

onMounted(() => {
  if (!route?.query?.tab) {
    router.replace("/dashboard/jobseeker/my-applications?tab=applied");
  }
});

const links = [
  {
    to: "/dashboard/jobseeker/my-applications?tab=applied",
    name: "Applied",
    disabled: false,
    badge: 4,
    tabId: TABS.APPLIED,
  },
  {
    to: "/dashboard/jobseeker/my-applications?tab=in-review",
    name: "In Review",
    disabled: false,
    badge: 1,
    tabId: TABS.IN_REVIEW,
  },
  {
    to: "/dashboard/jobseeker/my-applications?tab=interview",
    name: "Interview",
    disabled: false,
    tabId: TABS.INTERVIEW,
  },
  {
    to: "/dashboard/jobseeker/my-applications?tab=offered",
    name: "Offered",
    disabled: false,
    tabId: TABS.OFFERED,
  },
  {
    to: "/dashboard/jobseeker/my-applications?tab=rejected",
    name: "Rejected",
    disabled: false,
    tabId: TABS.REJECTED,
  },
];

const isActive = (currentTab: TABS) => route?.query?.tab === currentTab;
// const changeTab = (routeTo: TABS) => router.push(`/dashboard/jobseeker/my-applications?tab=${routeTo}`);
</script>

<template>
  <nav class="flex w-3/5 border-b-2">
    <ul class="flex gap-x-6 items-center">
      <li v-for="(link, index) in links" :key="index" class="pl-12 ">
        <NuxtLink
          :to="link.to"
          :class="[
            'flex items-center pb-2',
            isActive(link.tabId)
              ? 'text-primary-1 border-primary-1 font-black text-sm'
              : 'text-sm',
          ]"
        >
          {{ link.name }}
          <span
            v-if="link.badge"
            class="ml-1 text-xs bg-primary-1 text-white rounded-full px-2 py-0.5"
          >
            {{ link.badge }}
          </span>
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
