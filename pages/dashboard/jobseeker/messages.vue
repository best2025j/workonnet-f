<script setup lang="ts">
definePageMeta({
  title: "Messages",
  pageName: "dashboard.jobseeker.messages",
  layout: "dashboard",
  middleware: ["auth", "is-jobseeker"],
});
</script>

<template>
  <div class="w-full flex md:h-[670px]">
    <div class="h-full md:w-1/4">
      <ChatsSideNav class="absolute left-0 md:relative" />
    </div>
    <!-- Main Content Section -->
    <main class="md:w-3/4 h-full md:flex flex-col w-full hidden">
      <!-- Fixed Header -->
      <div class="w-full bg-white px-4">
        <ChatsHeader class="" />
      </div>

      <div
        class="overflow-y-auto md:h-[calc(100%-120px)] h-screen scrollbar-hide md:px-8 md:pt-4 pt-20 pb-6 space-y-4"
      >
        <div class="flex items-start space-x-4">
          <img src="/assets/images/Ellipse3.png" alt="no pix" />
          <div class="space-y-2 max-w-sm w-full">
            <div class="bg-white flex space-x-2 p-3 rounded-8 w-56">
              <img src="/assets/svgs/Documents.svg" alt="" />

              <div class="max-w-[10rem]">
                <h1 class="text-sm font-black">NDA Document.pdf</h1>
                <h1 class="text-xs">2MB</h1>
              </div>
            </div>

            <h1 class="text-xs bg-white p-3 rounded-8">
              Send a copy of your CV so it can help us review your qualification
            </h1>
          </div>
        </div>

        <div
          class="flex flex-row-reverse items-start space-x-4 gap-4 text-right"
        >
          <img src="/assets/images/Ellipse5.png" alt="no pix" />
          <div class="space-y-2 max-w-sm">
            <div class="space-y-2">
              <h1 class="text-xs bg-white p-3 rounded-8">hey</h1>
              <h1 class="text-xs">Just now</h1>
            </div>

            <h1 class="text-xs flex justify-end">21:45</h1>
          </div>
        </div>

        <div class="flex items-center">
          <div class="flex-grow border-t-2 border-danger-300" />
          <span class="mx-14 text-danger-600 font-black">New message</span>
          <div class="flex-grow border-t-2 border-danger-300" />
        </div>

        <div class="flex items-start space-x-4">
          <img src="/assets/images/Ellipse3.png" alt="no pix" />
          <div class="space-y-2">
            <h1 class="text-xs bg-white p-3 rounded-8">Drop your details</h1>
            <h1 class="text-xs">Just now</h1>
          </div>
        </div>

        <div
          class="flex flex-row-reverse items-start space-x-4 gap-4 text-right"
        >
          <img src="/assets/images/Ellipse5.png" class="" alt="no pix" />
          <div class="">
            <h1 class="text-xs bg-white p-3 rounded-8">
              Send a copy of your CV so it can help us review your qualification
            </h1>
          </div>
        </div>

        <div class="flex items-start space-x-4">
          <img src="/assets/images/Ellipse3.png" alt="no pix" />
          <div class="space-y-2">
            <h1 class="text-xs bg-white p-3 rounded-8">So far so good</h1>
            <h1 class="text-xs">Just now</h1>
          </div>
        </div>
      </div>

      <!-- input -->
      <div class="bottom-2 w-full md:pl-4 md:relative fixed right-0 left-0">
        <div class="flex items-center">
          <button class="absolute md:left-8 left-4" aria-label="Edit">
            <img src="/assets/svgs/Edit.svg" alt="Edit icon" />
          </button>

          <input
            type="text"
            placeholder="Write your message here..."
            class="md:pl-10 pl-12 pr-4 h-14 w-full outline-none rounded-md placeholder:text-sm"
          />

          <div class="flex gap-4 absolute right-6">
            <button aria-label="Emoji">
              <img src="/assets/svgs/Emojis.svg" alt="Emoji icon" />
            </button>

            <button aria-label="Send">
              <img src="/assets/svgs/send.svg" alt="Send icon" />
            </button>
          </div>
        </div>
      </div>
      <!-- end input -->
    </main>
    <!--  -->
  </div>
</template>
<!--  -->
