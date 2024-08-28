<script setup lang="ts"></script>

<template>
  <div class="flex space-x-4 w-full py-4">
    <div class="text-black-900 bg-white h-full divide-y rounded-10 w-3/5">
      <div class="mx-auto h-12 flex justify-between w-full items-center p-4">
        <h1 class="text-lg text-black-900 font-black">
          Recent Application History
        </h1>
        <!-- Ensure the icon component is used correctly -->
        <div class="pb-6"><BtnBlueRight /></div>
      </div>
      <!-- table -->
      <Table />
      <!-- end of table -->
    </div>
    <!-- first table -->
    <div class="w-2/5">
      <div
        class="text-black-900 bg-white w-full divide-y rounded-10 flex-grow h-full"
      >
        <div class="mx-auto h-12 flex justify-between items-center p-4">
          <h1 class="text-base text-black-900 font-black">Offered jobs</h1>
          <!-- Ensure the icon component is used correctly -->
        </div>

        <div class="align-middle inline-block min-w-full">
          <div class="overflow-hidden mt-2">
            <table class="min-w-full table-fixed">
              <tbody class="divide-y divide-grey-200">
                <tr class="text-black-900">
                  <td class="py-6 whitespace-nowrap pl-4">
                    <div class="flex space-x-4">
                      <div class="flex flex-col">
                        <img
                          src="/SocialMedia3.png"
                          alt="Google"
                          class="w-10 h-10 rounded"
                        />
                      </div>
                      <div
                        class="text-left w-[104px] flex whitespace-break-spaces flex-col"
                      >
                        <span class="text-sm font-black"
                          >Social Media Assistant</span
                        ><span class="text-sm font-semimedium">Microsoft</span>
                      </div>
                    </div>
                  </td>

                  <td class="py-4 whitespace-nowrap">
                    <div class="text-left flex flex-col">
                      <span class="text-sm font-black">Location</span
                      ><span class="text-sm font-semimedium"
                        >Paris, France.</span
                      >
                    </div>
                  </td>

                  <td class="py-4 whitespace-nowrap">
                    <div class="text-left flex flex-col">
                      <span class="text-sm font-black">Date Applied</span
                      ><span class="text-sm font-semimedium"
                        >14th July, 2024</span
                      >
                    </div>
                  </td>

                  <td class="py-4 whitespace-nowrap">
                    <div class="font-normal flex text-left">
                      <span
                        class="px-6 py-2 rounded-10 font-black bg-success-100 text-xs text-success-600"
                        >Selected</span
                      >
                    </div>
                  </td>
                </tr>

                <tr class="text-black-900">
                  <td class="py-6 whitespace-nowrap pl-4">
                    <div class="flex space-x-4">
                      <div class="flex flex-col">
                        <img
                          src="/SocialMedia3.png"
                          alt="Google"
                          class="w-10 h-10 rounded"
                        />
                      </div>
                      <div
                        class="text-left w-[104px] flex whitespace-break-spaces flex-col"
                      >
                        <span class="text-sm font-black"
                          >Social Media Assistant</span
                        ><span class="text-sm font-semimedium">Microsoft</span>
                      </div>
                    </div>
                  </td>

                  <td class="py-4 whitespace-nowrap">
                    <div class="text-left flex flex-col">
                      <span class="text-sm font-black">Location</span
                      ><span class="text-sm font-semimedium"
                        >Paris, France.</span
                      >
                    </div>
                  </td>

                  <td class="py-4 whitespace-nowrap">
                    <div class="text-left flex flex-col">
                      <span class="text-sm font-black">Date Applied</span
                      ><span class="text-sm font-semimedium"
                        >14th July, 2024</span
                      >
                    </div>
                  </td>

                  <td class="py-4 whitespace-nowrap">
                    <div class="font-normal flex text-left">
                      <span
                        class="px-6 py-2 rounded-10 font-black bg-success-100 text-xs text-success-600"
                        >Selected</span
                      >
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
