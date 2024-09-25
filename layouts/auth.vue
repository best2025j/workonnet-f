<!-- <template>
  <NuxtLayout name="default">
    <div
      class="flex items-center mx-auto justify-center gap-4 mb-2 mt-14 md:pr-20 w-full"
    >
      <slot />

      <LayoutAuthSide class="md:block hidden" />
    </div>
  </NuxtLayout>
</template> -->

<template>
  <NuxtLayout name="default">
    <div
      class="flex items-center justify-center h-full w-full mx-auto md:pr-20"
    >
      <slot />
      <LayoutAuthSide class="md:block hidden" />
    </div>
  </NuxtLayout>
</template>
