<script lang="ts">
const users = [
  { id: 1, name: "John Doe" },
  { id: 2, name: "Jane Smith" },
  { id: 3, name: "Alice Johnson" },
];
</script>

<template>
  <nav class="w-64 h-screen bg-white text-black-900 p-4">
    <h3 class="text-xl font-bold mb-4">Messages</h3>

    <ul>
      <li v-for="user in users" :key="user.id" class="mb-2">
        <NuxtLink
          :to="{ name: 'ChatView', params: { userId: user.id } }"
          class="block p-2 bg-gray-700 rounded hover:bg-primary-2 cursor-pointer"
        >
          {{ user.name }}
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>
