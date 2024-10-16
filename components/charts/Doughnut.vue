<script setup lang="ts">


const props = withDefaults(
  defineProps<{ rejected: number; inReview: number; interviewed: number }>(),
  {
    rejected: 0,
    inReview: 0,
    interviewed: 0,
  }
);


</script>
<template>
  
</template>
