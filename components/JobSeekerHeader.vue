<script>
import bellIcon from "~/components/icons/bellIcon.vue";

export default {
  name: "JobSeekerHeader",
  components: {
    bellIcon,
  },
};
</script>

<template>
  <header class="text-black bg-white p-4 shadow-md">
    <div class="container mx-auto flex justify-between items-center">
      <h1 class="text-3xl text-[#FE8900] font-bold">Dashboard</h1>
      <nav>
        <!-- Ensure the icon component is used correctly -->
        <NuxtLink
          to="/"
          class="text-[#000] hover:underline flex items-center gap-4"
        >
          <img src="/Ellipse 12.png" alt="" />
          <bellIcon class="h-6 w-6 inline-block" />
        </NuxtLink>
      </nav>
    </div>
  </header>
</template>

<style scoped>
/* Add any additional styles for the header here */
</style>
