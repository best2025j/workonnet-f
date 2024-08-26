<script setup lang="ts">
const route = useRoute()

</script>

<template>
  <div>

   <NuxtLayout></NuxtLayout>
    <h1 class="text-purple-700 font-bold text-5xl">This is the home page</h1>
    <NuxtLink to="/auth/signin">Signin </NuxtLink>

  </div>
</template>


<style>

</style>