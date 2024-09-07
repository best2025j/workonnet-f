<script setup lang="ts">
const route = useRoute();
const router = useRouter();

onMounted(() => {
  if (!route?.query?.tab) {
    router.replace("/admin/dashboard/posted-jobs?tab=under-review");
  }
  console.log(router.replace);
});

const links = [
  {
    to: "/admin/dashboard/posted-jobs?tab=under-review",
    name: "Under-Review",
    disabled: false,
    badge: 9,
    tabId: POST_JOBS_TABS.UNDER_REVIEW,
  },
  {
    to: "/admin/dashboard/posted-jobs?tab=active",
    name: "Active",
    disabled: false,
    badge: 4,
    tabId: POST_JOBS_TABS.ACTIVE,
  },
  {
    to: "/admin/dashboard/posted-jobs?tab=removed",
    name: "Removed",
    disabled: false,
    badge: 1,
    tabId: POST_JOBS_TABS.REMOVED,
  },
  {
    to: "/admin/dashboard/posted-jobs?tab=drafts",
    name: "Drafts",
    disabled: false,
    tabId: POST_JOBS_TABS.DRAFTS,
  },
];

// 

const isActive = (currentTab: POST_JOBS_TABS) =>
  route?.query?.tab === currentTab;
// const changeTab = (routeTo: TABS) => router.push(`/dashboard/recruiter/jobs-openings?tab=${routeTo}`);
</script>

<template>
  <nav class="flex w-1/3 border-b-2">
    <ul class="flex gap-x-6 items-center">
      <li v-for="(link, index) in links" :key="index" class="">
        <NuxtLink
          :to="link.to"
          :class="[
            'flex items-center pb-2',
            isActive(link.tabId)
              ? 'text-primary-1 border-primary-1 font-black text-xs'
              : 'text-xs',
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
