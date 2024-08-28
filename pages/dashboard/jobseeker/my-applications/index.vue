<script setup lang="ts">

definePageMeta({
  name: "My Applications",
  title: "My Applications",
  pageName: "dashboard.my-applications",
  layout: "dashboard",
});
</script>

<template>
  <div class="py-2 w-full">
    <AppNav />
    <div>
      <!--  -->
      <div class="w-full">
        <!-- content for applied -->
        <div v-if="$route?.query?.tab === TABS.APPLIED">
          <AppCards />
        </div>
        <!-- content for in review -->

        <div v-if="$route?.query?.tab === TABS.IN_REVIEW">
          <AppCard />
        </div>

        <!-- content for interview -->

        <div v-if="$route?.query?.tab === TABS.INTERVIEW">
          <AppBlank />
        </div>

        <!-- content for offered -->

        <div v-if="$route?.query?.tab === TABS.OFFERED">
          <AppBlank />
        </div>
        <!-- content for rejected -->

        <div v-if="$route?.query?.tab === TABS.REJECTED">
          <AppRejectCard />
        </div>
        <!--  -->
      </div>
    </div>
  </div>
</template>
