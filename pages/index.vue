<script setup lang="ts">
const route = useRoute();
</script>

<template>
  <div
    class="min-h-screen bg-gray-100 flex flex-col items-center justify-center"
  >
    <header class="text-center mb-8">
      <h1 class="text-4xl font-black text-gray-900">Welcome to Workonnect</h1>
      <p class="text-lg text-gray-600 mt-2">
        Your go-to platform for connecting job seekers and recruiters.
      </p>
    </header>

    <section class="flex space-x-4">
      <!-- Link to Job Seeker Dashboard -->
      <NuxtLink
        to="/dashboard/jobseeker"
        class="bg-blue-500 text-white py-2 px-6 rounded-10 shadow hover:bg-blue-600 transition duration-300"
      >
        I'm a Job Seeker
      </NuxtLink>

      <!-- Link to Recruiter Dashboard -->
      <NuxtLink
        to="/dashboard/recruiter/job"
        class="bg-green-500 text-white py-2 px-6 rounded-10 shadow hover:bg-green-600 transition duration-300"
      >
        I'm a Recruiter
      </NuxtLink>
    </section>
  </div>
</template>
