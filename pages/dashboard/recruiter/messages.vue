<script setup lang="ts">
import Messages from "../jobseeker/messages.vue";

definePageMeta({
  title: "Messages",
  pageName: "dashboard.recruiter.messages",
  layout: "dashboard",
  middleware: ['auth']
});
</script>
<template>
  <Messages  />
</template>
