<script setup lang="ts">
withDefaults(
  defineProps<{
    isLoading: boolean;
    disabled: boolean;
    loaderClasses?: string
  }>(),
  {disabled: false, isLoading: false, loaderClasses: 'loader-1' }
);
</script>
<template>
    <button :disabled="disabled" class="bg-primary-1 p-3.5 w-full rounded-8 text-white text-sm font-black flex items-center justify-center disabled:bg-black-100 gap-x-5">
        <slot name="text" />
        <span v-if="isLoading" :class="loaderClasses"></span>
    </button>
</template>