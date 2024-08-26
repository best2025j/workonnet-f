<template>
    <div
      :class="[
        'p-2 mb-2 rounded',
        message.sender === 'You' ? 'bg-blue-500 text-white self-end' : 'bg-gray-300 self-start',
      ]"
    >
      {{ message.text }}
    </div>
  </template>
  
  <script setup>
  const props = defineProps({
    message: {
      type: Object,
      required: true,
    },
  });
  </script>
  