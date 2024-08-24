<script>
</script>

<template>
    <header class="text-black bg-white items-center flex py-4 text-xs sticky top-0 z-10">
      <div class="container mx-auto flex justify-between items-center">
      <h1 class="text-3xl text-[#FE8900] font-bold">{{$route?.meta?.name}}</h1>
      <nav>
        <NuxtLink
          to="/"
          class="text-[#000] hover:underline flex items-center gap-4"
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
