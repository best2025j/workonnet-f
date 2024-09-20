<script setup lang="ts"></script>

<template>
  <div class="flex w-full">
    <!-- Side Navigation -->
    <div class="w-[250px] h-full flex-none hidden md:block">
      <LayoutSideNav />
    </div>

    <!-- Main Content Area -->
    <div class="w-full h-full bg-black-50">
      <LayoutHeader class="px-4 h-full " />
      <main class="md:pl-4 px-4 md:px-0 md:pr-8 py-4">
        <slot />
      </main>
    </div>
  </div>
</template>
