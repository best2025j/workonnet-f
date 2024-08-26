<script setup lang="ts">
import Blank from '~/components/Blank.vue';

definePageMeta({
  name: "My Applications",
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
          <Blank />
        </div>

        <!-- content for offered -->

        <div v-if="$route?.query?.tab === TABS.OFFERED">
          <Blank />
        </div>
        <!-- content for rejected -->

        <div v-if="$route?.query?.tab === TABS.REJECTED">
          <RejectCard />
        </div>
      </div>
    </div>
  </div>
</template>
