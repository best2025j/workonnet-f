<!-- pages/recruiter/dashboard/index.vue -->
<template>
  <div>
    <h1>Welcome to the Recruiter Dashboard</h1>
    <!-- Content specific to recruiters -->
  </div>
</template>

<script>
export default {
  layout: "dashboard", // Uses the 'dashboard.vue' layout
  data() {
    return {
      userType: "recruiter",
    };
  },
};
</script>
