<script setup lang="ts">
definePageMeta({
  title: 'home',
  pageName: 'home',
  layout: 'no-layout',
});


const route = useRoute();

const authStore = useAuthStore();
const userStore = useUserStore();

onMounted(() => {
  if (route.query.logout) {
    authStore.logoutUser();
    userStore.clearUserStore();
  }
});
</script>
<template>
  <div class="h-full w-full bg-white overflow-x-hidden">
    <div class="relative z-50">
      <LandingPageNavbar />
    </div>
    <LandingPageHero />
    <LandingPageSections />
    <LandingPageRecruitment />
    <LandingPageHiring />
    <LandingPageTestimony />
    <LandingPageConnect />
    <LandingPageFooter />
  </div>
</template>


