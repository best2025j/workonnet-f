<script setup lang="ts">

</script>

<template>
  <div class="flex w-full">
    <!-- Side Navigation -->
    <div class="w-[250px] h-full flex-none">
      <LayoutSideNav />
    </div>

    <!-- Main Content Area -->
    <div class="w-full h-full bg-black-50">
      <LayoutHeader class="px-4 h-full" />

      <main class="pl-4 pr-8 py-4">
        <slot />
      </main>
    </div>
  </div>
</template>
