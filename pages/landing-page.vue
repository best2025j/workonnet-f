<script setup lang="ts">
definePageMeta({
  layout: 'no-layout'
})
</script>
<template>
  <div class="h-full w-full bg-white">
    <div class="relative z-50">
      <LandingPageNavbar/>
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

