<script setup lang="ts">
definePageMeta({
  title: "Posted jobs",
  pageName: "admin.dashboard.home.posted-jobs",
  layout: "dashboard",
});
</script>

<template>
  <div class="py-2 w-full">
    <PostJobsNav/>
    <div>
      <!--  -->
      <div class="w-full">
        <!-- content for applied -->
        <div v-if="$route?.query?.tab === POST_JOBS_TABS.UNDER_REVEIW">
          <PostJobsUnderReview />
        </div>
        <!-- content for in review -->

        <div v-if="$route?.query?.tab === POST_JOBS_TABS.ACTIVE">
          <PostJobsActive />
        </div>

        <!-- content for interview -->

        <div v-if="$route?.query?.tab === POST_JOBS_TABS.REMOVED">
          <PostJobsRemoved />
        </div>
        <!--  -->
        <div v-if="$route?.query?.tab === POST_JOBS_TABS.DRAFTS">
          <PostJobsDraft />
        </div>

        <!--  -->
      </div>
    </div>
  </div>
</template>
