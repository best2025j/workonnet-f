<template>
  <!-- table -->
  <div class="">
    <div class="py-6">
      <div class="align-middle inline-block min-w-full">
        <div class="overflow-hidden sm:rounded-lg">
          <table class="min-w-full table-fixed">
            <thead class="text-black-200 text-sm text-left">
              <tr class="whitespace-nowrap">
                <th
                  scope="col"
                  class="py-4 text-left flex items-center space-x-3"
                >
                  <!-- <CheckBox customClasses="indeterminate-check" /> -->
                  <span> Name </span>
                </th>
                <th scope="col" class="py-4 text-left">Email</th>
                <th scope="col" class="py-4 text-left">Phone Number</th>
                <th scope="col" class="py-4 text-left">Role</th>
                <th scope="col" class="py-4 text-left">Action</th>
              </tr>
            </thead>

            <tbody class="bg-white divide-y divide-grey-200">
              <tr class="text-black-100">
                <td class="py-6 whitespace-nowrap w-[25%]">
                  <div class="">
                    <div class="flex flex-col">
                      <img
                        src="https://via.placeholder.com/50"
                        alt="Google"
                        class="w-10 h-10 rounded-full"
                      />
                    </div>
                  </div>
                </td>
                <td class="py-4 whitespace-nowrap w-[30%]">
                  <div class="text-left flex flex-col">
                    <h1 class="text-sm font-bold">HR Manager</h1>
                    <h6 class="text-xs">Layers</h6>
                  </div>
                </td>
                <td class="whitespace-nowrap w-[25%]">
                  <div class="font-normal text-left flex">
                    <span class="text-sm font-semimedium">+2348102352911</span>
                  </div>
                </td>
                <td class="whitespace-nowrap w-[15%]">
                  <div class="font-normal text-left flex">
                    <span class="text-sm font-semimedium">Recruiter</span>
                  </div>
                </td>
                <td class="whitespace-nowrap flex space-x-3 mt-3">
                  <div class="font-normal flex text-left">
                    <ButtonLightBlue textColor="text-blue">
                      <template v-slot:placeholder>View log</template>
                    </ButtonLightBlue>
                  </div>
                  <div class="font-normal flex text-left">
                    <ButtonLightBlue textColor="text-red">
                      <template v-slot:placeholder>Remove</template>
                    </ButtonLightBlue>
                  </div>
                </td>
              </tr>
              <tr class="text-black-100">
                <td class="py-6 whitespace-nowrap w-[25%]">
                  <div class="">
                    <div class="flex flex-col">
                      <span class="text-sm font-semimedium"
                        >Sunday Destiny</span
                      >
                    </div>
                  </div>
                </td>
                <td class="py-4 whitespace-nowrap w-[30%]">
                  <div class="text-left flex flex-col">
                    <span class="text-sm font-semimedium">user@gmail.com</span>
                  </div>
                </td>
                <td class="whitespace-nowrap w-[25%]">
                  <div class="font-normal text-left flex">
                    <span class="text-sm font-semimedium">+2348102352911</span>
                  </div>
                </td>
                <td class="whitespace-nowrap w-[15%]">
                  <div class="font-normal text-left flex">
                    <span class="text-sm font-semimedium">Recruiter</span>
                  </div>
                </td>
                <td class="whitespace-nowrap flex space-x-3 mt-3">
                  <div class="font-normal flex text-left">
                    <ButtonLightBlue textColor="text-blue">
                      <template v-slot:placeholder>View log</template>
                    </ButtonLightBlue>
                  </div>
                  <div class="font-normal flex text-left">
                    <ButtonLightBlue textColor="text-red">
                      <template v-slot:placeholder>Remove</template>
                    </ButtonLightBlue>
                  </div>
                </td>
              </tr>
              <tr class="text-black-100">
                <td class="py-6 whitespace-nowrap w-[25%]">
                  <div class="">
                    <div class="flex flex-col">
                      <span class="text-sm font-semimedium"
                        >Sunday Destiny</span
                      >
                    </div>
                  </div>
                </td>
                <td class="py-4 whitespace-nowrap w-[30%]">
                  <div class="text-left flex flex-col">
                    <span class="text-sm font-semimedium">user@gmail.com</span>
                  </div>
                </td>
                <td class="whitespace-nowrap w-[25%]">
                  <div class="font-normal text-left flex">
                    <span class="text-sm font-semimedium">+2348102352911</span>
                  </div>
                </td>
                <td class="whitespace-nowrap w-[15%]">
                  <div class="font-normal text-left flex">
                    <span class="text-sm font-semimedium">Recruiter</span>
                  </div>
                </td>
                <td class="whitespace-nowrap flex space-x-3 mt-3">
                  <div class="font-normal flex text-left">
                    <ButtonLightBlue textColor="text-blue">
                      <template v-slot:placeholder>View log</template>
                    </ButtonLightBlue>
                  </div>
                  <div class="font-normal flex text-left">
                    <ButtonLightBlue textColor="text-red">
                      <template v-slot:placeholder>Remove</template>
                    </ButtonLightBlue>
                  </div>
                </td>
              </tr>
              <tr class="text-black-100">
                <td class="py-6 whitespace-nowrap w-[25%]">
                  <div class="">
                    <div class="flex flex-col">
                      <span class="text-sm font-semimedium"
                        >Sunday Destiny</span
                      >
                    </div>
                  </div>
                </td>
                <td class="py-4 whitespace-nowrap w-[30%]">
                  <div class="text-left flex flex-col">
                    <span class="text-sm font-semimedium">user@gmail.com</span>
                  </div>
                </td>
                <td class="whitespace-nowrap w-[25%]">
                  <div class="font-normal text-left flex">
                    <span class="text-sm font-semimedium">+2348102352911</span>
                  </div>
                </td>
                <td class="whitespace-nowrap w-[15%]">
                  <div class="font-normal text-left flex">
                    <span class="text-sm font-semimedium">Recruiter</span>
                  </div>
                </td>
                <td class="whitespace-nowrap flex space-x-3 mt-3">
                  <div class="font-normal flex text-left">
                    <ButtonLightBlue textColor="text-blue">
                      <template v-slot:placeholder>View log</template>
                    </ButtonLightBlue>
                  </div>
                  <div class="font-normal flex text-left">
                    <ButtonLightBlue textColor="text-red">
                      <template v-slot:placeholder>Remove</template>
                    </ButtonLightBlue>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  <!-- end of table -->
</template>
