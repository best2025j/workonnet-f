<!-- <script setup lang="ts">
const route = useRoute();

const localStore = useLocalStore();

const setUserType = (userType: LOGGED_USER, routePath: string) => {
  localStore.setCurrentUserType(userType);
  useRouter().replace(routePath);
};
</script>

<template>
  <div class="relative min-h-screen w-full">
    <img
      src="/assets/images/my-lady.png"
      class="absolute top-0 left-0 w-full h-full object-cover z-0"
      alt="a lady with book"
    />

    <div class="relative z-50">
      <LandingPageNavbar class="" />

      <main>
        <LandingPageHero />
      </main>
    </div>
  </div>
</template> -->

<script setup lang="ts">
const route = useRoute();
const isDashboard = ref(false);
const localStore = useLocalStore();

const setUserType = (userType: LOGGED_USER, routePath: string) => {
  localStore.setCurrentUserType(userType);
  useRouter().replace(routePath);
};
</script>

// Watch for route changes to determine if it's the dashboard or landing page
watchEffect(() => { isDashboard.value = route.path.includes('/dashboard'); });

<template>
  <div>
    <div class="relative min-h-screen w-full">
      <img
        src="/assets/images/my-lady.png"
        class="absolute top-0 left-0 w-full h-screen object-cover z-0"
        alt="a lady with book"
      />
    </div>
    <div class="absolute top-0 left-0 right-0 z-50">
      <LandingPageNavbar class="" />
      <LandingPageHero />
    </div>
    <main>
      <LandingPageSections />
    </main>
    <!-- admin -->
    <div
      v-if="isDashboard"
      class="min-h-screen bg-gray-100 flex flex-col items-center justify-center"
    >
      <header class="text-center mb-8">
        <h1 class="text-4xl font-black text-gray-900">Welcome to Workonnect</h1>
        <p class="text-lg text-gray-600 mt-2">
          Your go-to platform for connecting job seekers and recruiters.
        </p>
      </header>

      <section class="flex space-x-4">
        <button
          @click="setUserType(LOGGED_USER.JOBSEEKER, '/dashboard/jobseeker')"
          class="bg-blue-500 text-white py-2 px-6 rounded-10 shadow hover:bg-blue-600 transition duration-300"
        >
          I'm a Job Seeker
        </button>

        <button
          @click="setUserType(LOGGED_USER.RECRUITER, '/dashboard/recruiter')"
          class="bg-green-500 text-white py-2 px-6 rounded-10 shadow hover:bg-green-600 transition duration-300"
        >
          I'm a Recruiter
        </button>

        <button
          @click="setUserType(LOGGED_USER.ADMIN, '/admin/dashboard')"
          class="bg-westside-500 text-white py-2 px-6 rounded-10 shadow hover:bg-green-600 transition duration-300"
        >
          I'm Admin
        </button>
      </section>
    </div>
  </div>
</template>
