<template>
  <div class="h-screen w-full">
    <div
      class="h-3/4 relative top-16 w-1/2 py-4 flex items-center justify-center mx-auto"
    >
      <div class="flex flex-col space-y-3 w-1/2">
        <div class="text-center flex-col flex items-center space-y-3">
          <img src="/assets/images/Logo2.png" alt="logo" />
          <h1 class="text-[32px] font-[400] font-[Georgia]">Sign in</h1>
        </div>

        <div class="space-y-3">
          <div class="flex flex-col">
            <label for="first-name" class="text-sm mb-2">Email</label>
            <input
              type="text"
              placeholder="Enter your email address here"
              class="pl-2 placeholder:text-sm pr-4 h-10 outline-none border border-gray-300 rounded-md"
            />
          </div>
          <div class="flex flex-col w-full">
            <label for="first-name" class="text-sm mb-2">Password</label>
            <input
              type="password"
              placeholder="********"
              pattern=".{8,}"
              title="Password should be at least 8 characters"
              class="pl-2 placeholder:text-md pr-4 h-10 outline-none border border-gray-300 rounded-md"
            />
          </div>
        </div>
        <button class="underline text-right text-xs">Forgot password?</button>

        <div class="space-y-3 py-4">
          <button
            class="bg-primary-1 p-4 w-full rounded-8 text-white text-sm font-black"
          >
            Sign in
          </button>
          <button class="w-full">
            Don’t have an account?
            <NuxtLink class="text-info-500 text-sm font-black"
              >Sign up</NuxtLink
            >
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
