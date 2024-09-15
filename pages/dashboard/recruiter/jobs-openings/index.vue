<script setup lang="ts">
definePageMeta({
  title: "Jobs Openings",
  pageName: "dashboard.recruiter.jobs-opening.index",
  layout: "dashboard",
  middleware: ['auth']
});
</script>

<template>
  <div class="py-2 w-full">
    <OpenJobsNav />
    <div>
      <!--  -->
      <div class="w-full">
        <!-- content for applied -->
        <div v-if="$route?.query?.tab === JOB_OPENING_TABS.ACTIVE">
          <OpenJobsActive />
        </div>
        <!-- content for in review -->

        <div v-if="$route?.query?.tab === JOB_OPENING_TABS.IN_ACTIVE">
          <OpenJobsInactive />
        </div>

        <!-- content for interview -->

        <div v-if="$route?.query?.tab === JOB_OPENING_TABS.DRAFT">
          <OpenJobsDraft />
        </div>

        <!--  -->
      </div>
    </div>

 
  </div>
</template>
