<script setup lang="ts">



</script>

<template>
  <div class="flex w-screen">
    <!-- Side Navigation -->
    <div class="w-[250px] h-full flex-none">
      <DashboardSideNav />
    </div>

    <!-- Main Content Area -->
    <div class="flex-1 w-full h-full bg-[#F6F6F6]">
      <DashboardHeader class="px-4 h-full" />

      <main class="px-5 pt-5 h-full">
        <slot />
      </main>
    </div>
  </div>
</template>
