<script></script>

<template>
  <header
    class="text-black-900 bg-white items-center flex py-4 text-xs sticky top-0 z-10"
  >
    <div class="container mx-auto flex justify-between items-center">
      <h1 class="text-3xl text-primary-1 font-black">
        {{ $route?.meta?.title }}
      </h1>
      <nav>
        <NuxtLink
          to="/"
          class="text-black-900 hover:underline flex items-center gap-4 flex-row-reverse"
        >
          <img src="/Ellipse 12.png" alt="Profile Picture" />
          <!-- Use the bellIcon component correctly -->
          <IconsBellIcon class="h-6 w-6 inline-block" />
        </NuxtLink>
      </nav>
    </div>
  </header>
</template>

<style scoped>
/* Add any additional styles for the header here */
</style>
