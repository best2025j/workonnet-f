<template>
  <!-- Navbar -->
  <div class="pb-4">
    <nav
      class="flex justify-between bg-inherit w-full items-center backdrop-blur-sm shadow-md px-6 h-16 text-xs fixed"
    >
      <div>
        <img src="/assets/images/logo3.png" alt="Logo" class="" />
      </div>

      <ul class="flex space-x-8 text-black-50">
        <li class="hover:text-primary-1 cursor-pointer">Home</li>
        <li class="hover:text-primary-1 cursor-pointer">Pricing</li>
        <li class="hover:text-primary-1 cursor-pointer">For Recruiters</li>
        <li class="hover:text-primary-1 cursor-pointer">For Job Seekers</li>
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
