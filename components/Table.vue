<template>
  <!-- table -->
    <div class="align-middle inline-block min-w-full">
      <div class="overflow-hidden mt-2">
        <table class="min-w-full table-fixed">
          <tbody class="divide-y divide-grey-200">
            <tr class="text-[#3D3D3D] bg-westside-50">
              <td class="py-6 whitespace-nowrap pl-4">
                <div class="flex space-x-4">
                  <div class="flex flex-col">
                    <img src="/ms.png" alt="Google" class="w-10 h-10 rounded" />
                  </div>

                  <div
                    class="text-left flex flex-col w-[104px] whitespace-break-spaces"
                  >
                    <span class="text-sm font-bold"
                      >Social Media Assistant</span
                    >
                    <span class="text-sm font-semimedium">Microsoft</span>
                  </div>
                </div>
              </td>

              <td class="py-4 whitespace-nowrap">
                <div class="text-left flex flex-col">
                  <span class="text-sm font-bold">Location</span
                  ><span class="text-sm font-semimedium">Paris, France.</span>
                </div>
              </td>

              <td class="py-4 whitespace-nowrap">
                <div class="text-left flex flex-col">
                  <span class="text-sm font-bold">Date Applied</span
                  ><span class="text-sm font-semimedium">14th July, 2024</span>
                </div>
              </td>

              <td class="py-4 whitespace-nowrap">
                <div class="font-normal flex text-left">
                  <span
                    class="px-6 py-2 rounded-10 font-bold bg-[#FFF6D3] text-xs text-[#FE8900]"
                    >In Review</span
                  >
                </div>
              </td>

              <td class="py-4 whitespace-nowrap pr-4">
                <div class="font-normal flex text-left">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16 14.5C16.2967 14.5 16.5867 14.588 16.8334 14.7528C17.08 14.9176 17.2723 15.1519 17.3858 15.426C17.4993 15.7001 17.5291 16.0017 17.4712 16.2926C17.4133 16.5836 17.2704 16.8509 17.0607 17.0607C16.8509 17.2704 16.5836 17.4133 16.2926 17.4712C16.0017 17.5291 15.7001 17.4993 15.426 17.3858C15.1519 17.2723 14.9176 17.08 14.7528 16.8334C14.588 16.5867 14.5 16.2967 14.5 16C14.5 15.6022 14.658 15.2206 14.9393 14.9393C15.2206 14.658 15.6022 14.5 16 14.5ZM14.5 7.5C14.5 7.79667 14.588 8.08668 14.7528 8.33335C14.9176 8.58003 15.1519 8.77229 15.426 8.88582C15.7001 8.99935 16.0017 9.02906 16.2926 8.97118C16.5836 8.9133 16.8509 8.77044 17.0607 8.56066C17.2704 8.35088 17.4133 8.08361 17.4712 7.79263C17.5291 7.50166 17.4993 7.20007 17.3858 6.92598C17.2723 6.65189 17.08 6.41762 16.8334 6.2528C16.5867 6.08797 16.2967 6 16 6C15.6022 6 15.2206 6.15804 14.9393 6.43934C14.658 6.72065 14.5 7.10217 14.5 7.5ZM14.5 24.5C14.5 24.7967 14.588 25.0867 14.7528 25.3334C14.9176 25.58 15.1519 25.7723 15.426 25.8858C15.7001 25.9994 16.0017 26.0291 16.2926 25.9712C16.5836 25.9133 16.8509 25.7704 17.0607 25.5607C17.2704 25.3509 17.4133 25.0836 17.4712 24.7926C17.5291 24.5017 17.4993 24.2001 17.3858 23.926C17.2723 23.6519 17.08 23.4176 16.8334 23.2528C16.5867 23.088 16.2967 23 16 23C15.6022 23 15.2206 23.158 14.9393 23.4393C14.658 23.7206 14.5 24.1022 14.5 24.5Z"
                      fill="#343330"
                    />
                  </svg>
                </div>
              </td>
            </tr>

            <tr class="text-[#3D3D3D]">
              <td class="py-6 whitespace-nowrap pl-4">
                <div class="flex space-x-4">
                  <div class="flex flex-col">
                    <img
                      src="/SocialMedia.png"
                      alt="Google"
                      class="w-10 h-10 rounded"
                    />
                  </div>
                  <div
                    class="text-left w-[104px] flex whitespace-break-spaces flex-col"
                  >
                    <span class="text-sm font-bold">Social Media Assistant</span
                    ><span class="text-sm font-semimedium">Microsoft</span>
                  </div>
                </div>
              </td>
              <td class="py-4 whitespace-nowrap">
                <div class="text-left flex flex-col">
                  <span class="text-sm font-bold">Location</span
                  ><span class="text-sm font-semimedium">Paris, France.</span>
                </div>
              </td>

              <td class="py-4 whitespace-nowrap">
                <div class="text-left flex flex-col">
                  <span class="text-sm font-bold">Date Applied</span
                  ><span class="text-sm font-semimedium">14th July, 2024</span>
                </div>
              </td>

              <td class="py-4 whitespace-nowrap">
                <div class="font-normal flex text-left">
                  <span
                    class="px-6 py-2 rounded-10 font-bold bg-[#FFDEE0] text-xs text-[#F60C17]"
                    >Not selected</span
                  >
                </div>
              </td>

              <td class="py-4 whitespace-nowrap pr-4">
                <div class="font-normal flex text-left">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16 14.5C16.2967 14.5 16.5867 14.588 16.8334 14.7528C17.08 14.9176 17.2723 15.1519 17.3858 15.426C17.4993 15.7001 17.5291 16.0017 17.4712 16.2926C17.4133 16.5836 17.2704 16.8509 17.0607 17.0607C16.8509 17.2704 16.5836 17.4133 16.2926 17.4712C16.0017 17.5291 15.7001 17.4993 15.426 17.3858C15.1519 17.2723 14.9176 17.08 14.7528 16.8334C14.588 16.5867 14.5 16.2967 14.5 16C14.5 15.6022 14.658 15.2206 14.9393 14.9393C15.2206 14.658 15.6022 14.5 16 14.5ZM14.5 7.5C14.5 7.79667 14.588 8.08668 14.7528 8.33335C14.9176 8.58003 15.1519 8.77229 15.426 8.88582C15.7001 8.99935 16.0017 9.02906 16.2926 8.97118C16.5836 8.9133 16.8509 8.77044 17.0607 8.56066C17.2704 8.35088 17.4133 8.08361 17.4712 7.79263C17.5291 7.50166 17.4993 7.20007 17.3858 6.92598C17.2723 6.65189 17.08 6.41762 16.8334 6.2528C16.5867 6.08797 16.2967 6 16 6C15.6022 6 15.2206 6.15804 14.9393 6.43934C14.658 6.72065 14.5 7.10217 14.5 7.5ZM14.5 24.5C14.5 24.7967 14.588 25.0867 14.7528 25.3334C14.9176 25.58 15.1519 25.7723 15.426 25.8858C15.7001 25.9994 16.0017 26.0291 16.2926 25.9712C16.5836 25.9133 16.8509 25.7704 17.0607 25.5607C17.2704 25.3509 17.4133 25.0836 17.4712 24.7926C17.5291 24.5017 17.4993 24.2001 17.3858 23.926C17.2723 23.6519 17.08 23.4176 16.8334 23.2528C16.5867 23.088 16.2967 23 16 23C15.6022 23 15.2206 23.158 14.9393 23.4393C14.658 23.7206 14.5 24.1022 14.5 24.5Z"
                      fill="#343330"
                    />
                  </svg>
                </div>
              </td>
            </tr>

            <tr class="text-[#3D3D3D] bg-westside-50">
              <td class="py-6 whitespace-nowrap pl-4">
                <div class="flex space-x-4">
                  <div class="flex flex-col">
                    <img
                      src="/SocialMedia2.png"
                      alt="Google"
                      class="w-10 h-10 rounded"
                    />
                  </div>
                  <div
                    class="text-left w-[104px] flex whitespace-break-spaces flex-col"
                  >
                    <span class="text-sm font-bold">Social Media Assistant</span
                    ><span class="text-sm font-semimedium">Microsoft</span>
                  </div>
                </div>
              </td>
              <td class="py-4 whitespace-nowrap">
                <div class="text-left flex flex-col">
                  <span class="text-sm font-bold">Location</span
                  ><span class="text-sm font-semimedium">Paris, France.</span>
                </div>
              </td>

              <td class="py-4 whitespace-nowrap">
                <div class="text-left flex flex-col">
                  <span class="text-sm font-bold">Date Applied</span
                  ><span class="text-sm font-semimedium">14th July, 2024</span>
                </div>
              </td>

              <td class="py-4 whitespace-nowrap">
                <div class="font-normal flex text-left">
                  <span
                    class="px-6 py-2 rounded-10 font-bold bg-[#D1EFFF] text-xs text-[#006EFF]"
                    >Pending</span
                  >
                </div>
              </td>

              <td class="py-4 whitespace-nowrap pr-4">
                <div class="font-normal flex text-left">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16 14.5C16.2967 14.5 16.5867 14.588 16.8334 14.7528C17.08 14.9176 17.2723 15.1519 17.3858 15.426C17.4993 15.7001 17.5291 16.0017 17.4712 16.2926C17.4133 16.5836 17.2704 16.8509 17.0607 17.0607C16.8509 17.2704 16.5836 17.4133 16.2926 17.4712C16.0017 17.5291 15.7001 17.4993 15.426 17.3858C15.1519 17.2723 14.9176 17.08 14.7528 16.8334C14.588 16.5867 14.5 16.2967 14.5 16C14.5 15.6022 14.658 15.2206 14.9393 14.9393C15.2206 14.658 15.6022 14.5 16 14.5ZM14.5 7.5C14.5 7.79667 14.588 8.08668 14.7528 8.33335C14.9176 8.58003 15.1519 8.77229 15.426 8.88582C15.7001 8.99935 16.0017 9.02906 16.2926 8.97118C16.5836 8.9133 16.8509 8.77044 17.0607 8.56066C17.2704 8.35088 17.4133 8.08361 17.4712 7.79263C17.5291 7.50166 17.4993 7.20007 17.3858 6.92598C17.2723 6.65189 17.08 6.41762 16.8334 6.2528C16.5867 6.08797 16.2967 6 16 6C15.6022 6 15.2206 6.15804 14.9393 6.43934C14.658 6.72065 14.5 7.10217 14.5 7.5ZM14.5 24.5C14.5 24.7967 14.588 25.0867 14.7528 25.3334C14.9176 25.58 15.1519 25.7723 15.426 25.8858C15.7001 25.9994 16.0017 26.0291 16.2926 25.9712C16.5836 25.9133 16.8509 25.7704 17.0607 25.5607C17.2704 25.3509 17.4133 25.0836 17.4712 24.7926C17.5291 24.5017 17.4993 24.2001 17.3858 23.926C17.2723 23.6519 17.08 23.4176 16.8334 23.2528C16.5867 23.088 16.2967 23 16 23C15.6022 23 15.2206 23.158 14.9393 23.4393C14.658 23.7206 14.5 24.1022 14.5 24.5Z"
                      fill="#343330"
                    />
                  </svg>
                </div>
              </td>
            </tr>

            <tr class="text-[#3D3D3D]">
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
                    <span class="text-sm font-bold">Social Media Assistant</span
                    ><span class="text-sm font-semimedium">Microsoft</span>
                  </div>
                </div>
              </td>
              <td class="py-4 whitespace-nowrap">
                <div class="text-left flex flex-col">
                  <span class="text-sm font-bold">Location</span
                  ><span class="text-sm font-semimedium">Paris, France.</span>
                </div>
              </td>

              <td class="py-4 whitespace-nowrap">
                <div class="text-left flex flex-col">
                  <span class="text-sm font-bold">Date Applied</span
                  ><span class="text-sm font-semimedium">14th July, 2024</span>
                </div>
              </td>

              <td class="py-4 whitespace-nowrap">
                <div class="font-normal flex text-left">
                  <span
                    class="px-6 py-2 rounded-10 font-bold bg-[#DAFEEF] text-xs text-[#0FA968]"
                    >Selected</span
                  >
                </div>
              </td>

              <td class="py-4 whitespace-nowrap pr-4">
                <div class="font-normal flex text-left">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16 14.5C16.2967 14.5 16.5867 14.588 16.8334 14.7528C17.08 14.9176 17.2723 15.1519 17.3858 15.426C17.4993 15.7001 17.5291 16.0017 17.4712 16.2926C17.4133 16.5836 17.2704 16.8509 17.0607 17.0607C16.8509 17.2704 16.5836 17.4133 16.2926 17.4712C16.0017 17.5291 15.7001 17.4993 15.426 17.3858C15.1519 17.2723 14.9176 17.08 14.7528 16.8334C14.588 16.5867 14.5 16.2967 14.5 16C14.5 15.6022 14.658 15.2206 14.9393 14.9393C15.2206 14.658 15.6022 14.5 16 14.5ZM14.5 7.5C14.5 7.79667 14.588 8.08668 14.7528 8.33335C14.9176 8.58003 15.1519 8.77229 15.426 8.88582C15.7001 8.99935 16.0017 9.02906 16.2926 8.97118C16.5836 8.9133 16.8509 8.77044 17.0607 8.56066C17.2704 8.35088 17.4133 8.08361 17.4712 7.79263C17.5291 7.50166 17.4993 7.20007 17.3858 6.92598C17.2723 6.65189 17.08 6.41762 16.8334 6.2528C16.5867 6.08797 16.2967 6 16 6C15.6022 6 15.2206 6.15804 14.9393 6.43934C14.658 6.72065 14.5 7.10217 14.5 7.5ZM14.5 24.5C14.5 24.7967 14.588 25.0867 14.7528 25.3334C14.9176 25.58 15.1519 25.7723 15.426 25.8858C15.7001 25.9994 16.0017 26.0291 16.2926 25.9712C16.5836 25.9133 16.8509 25.7704 17.0607 25.5607C17.2704 25.3509 17.4133 25.0836 17.4712 24.7926C17.5291 24.5017 17.4993 24.2001 17.3858 23.926C17.2723 23.6519 17.08 23.4176 16.8334 23.2528C16.5867 23.088 16.2967 23 16 23C15.6022 23 15.2206 23.158 14.9393 23.4393C14.658 23.7206 14.5 24.1022 14.5 24.5Z"
                      fill="#343330"
                    />
                  </svg>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  <!-- end of table -->
</template>
