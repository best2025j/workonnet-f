<script setup lang="ts">
// Create a ref to manage modal visibility
const showModal = ref(false);

// Function to open modal
const openModal = () => {
  showModal.value = true;
};

// Function to close modal
const closeModal = () => {
  showModal.value = false;
};
</script>

<template>
  <div class="w-full">
    <!-- Trigger button -->
    <h1 @click="openModal" class="cursor-pointer text-primary-600">View</h1>

    <!-- Modal -->
    <transition name="fade">
      <div
        v-if="showModal"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      >
        <div
          class="modal-box bg-white text-black rounded-lg p-6 w-full max-w-md"
        >
          <div class="flex items-center justify-between border-b-2 pb-4">
            <div class="text-gray-500">no text.</div>
            <h3 class="text-lg font-bold">Delete job post!</h3>

            <!-- Close button -->
            <button
              @click="closeModal"
              class="text-gray-500 hover:text-gray-700"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M0.726027 0.724657C0.970105 0.480579 1.36583 0.480579 1.60991 0.724657L13.2758 12.3905C13.5199 12.6346 13.5199 13.0303 13.2758 13.2744C13.0317 13.5185 12.636 13.5185 12.3919 13.2744L0.726027 1.60854C0.481949 1.36446 0.481949 0.968734 0.726027 0.724657Z"
                  fill="#57575B"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M13.274 0.724657C13.5181 0.968734 13.5181 1.36446 13.274 1.60854L1.60809 13.2744C1.36401 13.5185 0.968285 13.5185 0.724208 13.2744C0.48013 13.0303 0.480131 12.6346 0.724208 12.3905L12.3901 0.724657C12.6342 0.480579 13.0299 0.480579 13.274 0.724657Z"
                  fill="#57575B"
                />
              </svg>
            </button>
          </div>

          <!-- Modal content -->

          <div class="flex flex-col">
            <label for="">The recruiter will be notified while there post was removed</label>
            <textarea name="" role="6" placeholder="Add notes and reasons" id=""></textarea>
          </div>

          <!-- Buttons -->
          <div class="space-x-2">
            <button
              @click="closeModal"
              class="rounded-10 px-4 py-2 text-white text-xs bg-primary-1"
            >
              SEND
            </button>
           
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<style>
/* Optional: fade transition effect */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
