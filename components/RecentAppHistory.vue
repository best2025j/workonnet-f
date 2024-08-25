<script setup lang="ts">
import Table from "./Table.vue";
import ButtonBlueRight from "./ul/ButtonBlueRight.vue";
</script>

<template>
  <div
    class="text-[#3D3D3D] bg-white my-4 h-full w-[671px] divide-y rounded-10"
  >
    <div class="mx-auto h-12 flex justify-between w-full items-center p-4">
      <h1 class="text-lg text-[#000] font-bold">Recent Application History</h1>
      <!-- Ensure the icon component is used correctly -->
      <div class="pb-6"><ButtonBlueRight /></div>
    </div>

    <main class="">
      <!-- table -->
      <Table />
      <!-- end of table -->
    </main>
  </div>
</template>
