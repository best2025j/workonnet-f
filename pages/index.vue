<script setup lang="ts">
const route = useRoute();

const localStore =  useLocalStore()

const setUserType = (userType: LOGGED_USER, routePath: string) => {
  localStore.setCurrentUserType(userType)
  useRouter().replace(routePath)
}
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
      <button
      @click="setUserType(LOGGED_USER.JOBSEEKER, '/dashboard/jobseeker')"
        class="bg-blue-500 text-white py-2 px-6 rounded-10 shadow hover:bg-blue-600 transition duration-300"
      >
        I'm a Job Seeker
      </button>

      <!-- Link to Recruiter Dashboard -->
      <button
      @click="setUserType(LOGGED_USER.RECRUITER, '/dashboard/recruiter')"
        class="bg-green-500 text-white py-2 px-6 rounded-10 shadow hover:bg-green-600 transition duration-300"
      >
        I'm a Recruiter
      </button>
    </section>
  </div>
</template>


<style>

</style>