<template>
  <NuxtLayout name="default">
    <div class="flex items-center justify-center gap-4 mb-2 mt-14 pr-20">
      <slot />

      <LayoutAuthSide class="md:block hidden" />
    </div>
  </NuxtLayout>
</template>
