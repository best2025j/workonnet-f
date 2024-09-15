<template>
    <NuxtLayout name="default">
        <div class="flex items-center justify-center gap-4 mb-2 mt-14">
     
        <slot />
     

      <LayoutAuthSide />
    </div>
    </NuxtLayout>
    
</template>
<style scoped>
.btn {
  width: 2.5rem;
  height: 2.5rem;
}

.placeholder-custom::placeholder {
  font-size: 3rem;
  color: #d9d9d9;
}
</style>
