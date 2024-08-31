<script setup lang="ts">
const route = useRoute();
const router = useRouter();

onMounted(() => {
  if (!route?.query?.tab) {
    router.replace("/dashboard/recruiter/jobs-openings?tab=applied");
  }
});

const links = [
  {
    to: "/dashboard/recruiter/jobs-openings?tab=active",
    name: "Active",
    disabled: false,
    badge: 4,
    tabId: JOB_OPENING_TABS.ACTIVE,
},
  {
    to: "/dashboard/recruiter/jobs-openings?tab=inactive",
    name: "Inactive",
    disabled: false,
    badge: 1,
    tabId: JOB_OPENING_TABS.IN_ACTIVE,
  },
  {
    to: "/dashboard/recruiter/jobs-openings?tab=draft",
    name: "Draft",
    disabled: false,
    tabId: JOB_OPENING_TABS.DRAFT,
  },
];

const isActive = (currentTab: JOB_OPENING_TABS) =>
  route?.query?.tab === currentTab;
// const changeTab = (routeTo: TABS) => router.push(`/dashboard/recruiter/jobs-openings?tab=${routeTo}`);
</script>

<template>
  <nav class="flex w-3/5 border-b-2">
    <ul class="flex gap-x-6 items-center">
      <li v-for="(link, index) in links" :key="index" class="pl-12">
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
