<template>
  <NuxtLayout name="default">
    <div
      class="flex items-center justify-center h-full w-full mx-auto md:pr-40"
    >
      <slot />
      <LayoutAuthSide class="md:block hidden" />
    </div>
  </NuxtLayout>
</template>
