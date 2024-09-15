
<template>
  <!-- Navbar -->
  <div class="pb-4">
    <nav
      class="flex justify-between w-full left-0 items-center px-6 h-16 text-xs fixed"
      :class="[
       $route.path === '/' ? 'bg-[#00000066] backdrop-blur-sm shadow-md' : 'text-black-300'
      ]"
    >
      <div>
        <img src="/assets/images/logo3.png" alt="Logo" class="" />
      </div>

      <ul class="flex space-x-8 text-black-50">
        <LandingPageNavbarLinks />
      </ul>

      <div class="space-x-4">
        <button
          class="text-white py-2 px-4 rounded-8 shadow shadow-black-900 bg-primary-1"
        >
          Register
        </button>
        <button
          class="bg-gray-200 text-primary-1 py-2 px-4 rounded-8 hover:bg-gray-300"
        >
          Login
        </button>
      </div>
    </nav>
  </div>
</template>
