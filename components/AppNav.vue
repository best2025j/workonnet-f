<script setup lang="ts">
const route = useRoute();

const links = [
  { to: "/my-applications/applied", name: "Applied", disabled: false },
  { to: "/my-applications/in-review", name: "In Review", disabled: true },
  { to: "/my-applications/interview", name: "Interview", disabled: true },
  { to: "/my-applications/offered", name: "Offered", disabled: true },
  { to: "/my-applications/rejected", name: "Rejected", disabled: true },
];

const isActive = (path: string) => route.path === path;
</script>

<template>
  <nav class="flex w-3/5">
    <ul class="flex space-x-12 border-b-2 p-4">
      <li v-for="(link, index) in links" :key="index">
        <NuxtLink
          v-if="!link.disabled"
          :to="link.to"
          :class="[
            'flex items-center',
            isActive(link.to)
              ? 'text-primary-1 border-primary-1 rounded-t-sm border-b-4'
              : 'ml-4',
            'text-xs',
          ]"
        >
          {{ link.name }}
        </NuxtLink>
        <span
          v-else
          :class="[
            'flex items-center cursor-not-allowed',
            'ml-4 text-xs text-gray-500',
          ]"
        >
          <!-- Render Icon -->

          {{ link.name }}
        </span>
      </li>
    </ul>
  </nav>
</template>
