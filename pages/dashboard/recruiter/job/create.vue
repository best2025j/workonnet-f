<script setup lang="ts">
definePageMeta({
  title: "Create job opening",
  pageName: "dashboard.recruiter.job.create",
  layout: "dashboard",
});

// Reactive variables
const showSkillInput = ref(false);
const skills = ref<string[]>([]); // Array to store selected skills
const newSkill = ref(""); // The current value of the new skill input

// Function to handle adding new skills
const addSkill = (): void => {
  if (newSkill.value && !skills.value.includes(newSkill.value)) {
    skills.value.push(newSkill.value); // Add the new skill
  }
  newSkill.value = ""; // Clear the input field
  showSkillInput.value = false; // Hide the input field after adding the skill
};
</script>

<template>
  <div class="font-[Nexa] scrollbar-hide bg-white p-2 rounded-10 w-full h-full">
    <div class="flex justify-between items-center p-2">
      <div>
        <h1 class="font-[Georgia] font-black text-2xl">Job details</h1>
        <div class="flex space-x-2 items-center py-3">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.25 0.5H1.75C1.41848 0.5 1.10054 0.631696 0.866116 0.866116C0.631696 1.10054 0.5 1.41848 0.5 1.75V14.25C0.5 14.5815 0.631696 14.8995 0.866116 15.1339C1.10054 15.3683 1.41848 15.5 1.75 15.5H14.25C14.5815 15.5 14.8995 15.3683 15.1339 15.1339C15.3683 14.8995 15.5 14.5815 15.5 14.25V1.75C15.5 1.41848 15.3683 1.10054 15.1339 0.866116C14.8995 0.631696 14.5815 0.5 14.25 0.5ZM1.75 1.75H14.25V7.79531L12.3211 5.86562C12.0867 5.63138 11.7689 5.4998 11.4375 5.4998C11.1061 5.4998 10.7883 5.63138 10.5539 5.86562L2.16953 14.25H1.75V1.75ZM14.25 14.25H3.9375L11.4375 6.75L14.25 9.5625V14.25ZM5.5 7.375C5.87084 7.375 6.23335 7.26503 6.54169 7.05901C6.85004 6.85298 7.09036 6.56014 7.23227 6.21753C7.37419 5.87492 7.41132 5.49792 7.33897 5.13421C7.26663 4.77049 7.08805 4.4364 6.82583 4.17417C6.5636 3.91195 6.22951 3.73337 5.86579 3.66103C5.50208 3.58868 5.12508 3.62581 4.78247 3.76773C4.43986 3.90964 4.14702 4.14996 3.94099 4.45831C3.73497 4.76665 3.625 5.12916 3.625 5.5C3.625 5.99728 3.82254 6.47419 4.17417 6.82583C4.52581 7.17746 5.00272 7.375 5.5 7.375ZM5.5 4.875C5.62361 4.875 5.74445 4.91166 5.84723 4.98033C5.95001 5.04901 6.03012 5.14662 6.07743 5.26082C6.12473 5.37503 6.13711 5.50069 6.11299 5.62193C6.08888 5.74317 6.02935 5.85453 5.94194 5.94194C5.85453 6.02935 5.74317 6.08888 5.62193 6.11299C5.50069 6.13711 5.37503 6.12473 5.26082 6.07743C5.14662 6.03012 5.04901 5.95001 4.98033 5.84723C4.91166 5.74445 4.875 5.62361 4.875 5.5C4.875 5.33424 4.94085 5.17527 5.05806 5.05806C5.17527 4.94085 5.33424 4.875 5.5 4.875Z"
              fill="#3D3D3D"
            />
          </svg>

          <h1 class="text-xs">Add header image</h1>
        </div>
      </div>

      <div class="flex gap-3">
        <button class="bg-info-400 text-white px-4 py-2 rounded-5 text-xs">
          Save
        </button>

        <!-- for modal triggring -->
        <button
          onclick="my_modal_1.showModal()"
          class="bg-primary-1 text-white px-4 py-2 rounded-5 text-xs"
        >
          Publish

          <!-- Open the modal using ID.showModal() method -->

          <dialog
            id="my_modal_1"
            class="modal text-black-950 backdrop-blur-sm backdrop-filter"
          >
            <div class="modal-box flex-col flex items-center space-y-3">
              <div class="flex items-center justify-between w-full">
                <div class="text-white">hello.</div>
                <h3 class="text-lg font-bold">Hello!</h3>

                <form method="dialog">
                  <button class="btn">
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
                </form>
              </div>
              <span
                ><svg
                  width="82"
                  height="82"
                  viewBox="0 0 82 82"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M41 0.375C32.9652 0.375 25.1107 2.75761 18.43 7.22155C11.7492 11.6855 6.54222 18.0302 3.46741 25.4535C0.392602 32.8767 -0.411908 41.0451 1.15562 48.9255C2.72314 56.806 6.5923 64.0447 12.2738 69.7262C17.9553 75.4077 25.194 79.2769 33.0745 80.8444C40.955 82.4119 49.1233 81.6074 56.5465 78.5326C63.9698 75.4578 70.3145 70.2508 74.7785 63.57C79.2424 56.8893 81.625 49.0349 81.625 41C81.6136 30.2291 77.3299 19.9025 69.7137 12.2863C62.0975 4.67015 51.7709 0.386374 41 0.375ZM58.836 33.8359L36.961 55.7109C36.6707 56.0015 36.3261 56.232 35.9467 56.3893C35.5673 56.5465 35.1607 56.6275 34.75 56.6275C34.3393 56.6275 33.9327 56.5465 33.5533 56.3893C33.174 56.232 32.8293 56.0015 32.5391 55.7109L23.1641 46.3359C22.5777 45.7496 22.2483 44.9543 22.2483 44.125C22.2483 43.2957 22.5777 42.5004 23.1641 41.9141C23.7505 41.3277 24.5458 40.9983 25.375 40.9983C26.2043 40.9983 26.9996 41.3277 27.586 41.9141L34.75 49.082L54.4141 29.4141C54.7044 29.1237 55.0491 28.8934 55.4285 28.7363C55.8078 28.5791 56.2144 28.4983 56.625 28.4983C57.0356 28.4983 57.4422 28.5791 57.8216 28.7363C58.2009 28.8934 58.5456 29.1237 58.836 29.4141C59.1263 29.7044 59.3566 30.0491 59.5137 30.4284C59.6709 30.8078 59.7518 31.2144 59.7518 31.625C59.7518 32.0356 59.6709 32.4422 59.5137 32.8216C59.3566 33.2009 59.1263 33.5456 58.836 33.8359Z"
                    fill="#0FA968"
                  />
                </svg>
              </span>
              <p class="py-4">
                You job listing has been posted and it’s online now.
              </p>
              <div class="space-x-4">
                <!-- if there is a button in form, it will close the modal -->
                <button
                  class="px-4 py-2 border border-danger-600 text-danger-600 text-xs rounded-10"
                >
                  Return to dashboard
                </button>
                <button
                  class="rounded-10 px-4 py-2 text-white text-xs bg-primary-1"
                >
                  View posted job
                </button>
              </div>
            </div>
          </dialog>
        </button>
      </div>
    </div>

    <!-- form input with dropdown  -->
    <form class="p-4 font-[Nexa] space-y-4 w-3/4">
      <!-- ocupation -->
      <div class="flex flex-col w-full">
        <label for="first-name" class="text-sm mb-2">Job Title</label>
        <input
          type="text"
          placeholder="UI UX Designer"
          class="pl-2 placeholder:text-xs pr-4 h-11 outline-none border border-gray-300 rounded-md"
        />
      </div>

      <!-- input with drop down  -->
      <div class="flex gap-2">
        <div class="flex flex-col w-full relative">
          <label for="first-name" class="text-sm mb-2">Department</label>

          <div class="relative dropdown dropdown-bottom flex flex-col w-full">
            <input
              type="text"
              placeholder="Design"
              class="pl-2 placeholder:text-xs pr-4 h-11 outline-none border bg-white text-xs border-gray-300 rounded-md"
            />
            <!-- list -->
            <ul
              tabindex="0"
              class="dropdown-content menu bg-white absolute left-0 right-0 rounded-box z-10 p-2 shadow"
            >
              <li class="bg-gray-1"><a>Design</a></li>
              <li><a>Human Resourse</a></li>
              <li><a>Health</a></li>
            </ul>

            <svg
              width="18"
              height="10"
              class="absolute right-4 top-4 h-4 w-4 text-gray-400"
              viewBox="0 0 18 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.031 1.53055L9.53104 9.03055C9.46139 9.10029 9.37867 9.15561 9.28762 9.19335C9.19657 9.23109 9.09898 9.25052 9.00042 9.25052C8.90186 9.25052 8.80426 9.23109 8.71321 9.19335C8.62216 9.15561 8.53945 9.10029 8.46979 9.03055L0.969792 1.53055C0.829062 1.38982 0.75 1.19895 0.75 0.999929C0.75 0.800906 0.829062 0.610034 0.969792 0.469303C1.11052 0.328573 1.30139 0.249512 1.50042 0.249512C1.69944 0.249512 1.89031 0.328573 2.03104 0.469303L9.00042 7.43962L15.9698 0.469303C16.0395 0.399621 16.1222 0.344345 16.2132 0.306633C16.3043 0.268921 16.4019 0.249512 16.5004 0.249512C16.599 0.249512 16.6965 0.268921 16.7876 0.306633C16.8786 0.344345 16.9614 0.399621 17.031 0.469303C17.1007 0.538986 17.156 0.621712 17.1937 0.712756C17.2314 0.803801 17.2508 0.901383 17.2508 0.999929C17.2508 1.09847 17.2314 1.19606 17.1937 1.2871C17.156 1.37815 17.1007 1.46087 17.031 1.53055Z"
                fill="#888888"
              />
            </svg>
          </div>
        </div>
        <div class="flex flex-col w-full relative">
          <label for="first-name" class="text-sm mb-2">Job Type</label>
          <div class="relative dropdown dropdown-bottom flex flex-col w-full">
            <input
              type="text"
              placeholder="Full Time"
              class="pl-2 placeholder:text-xs pr-4 h-11 outline-none border bg-white text-xs border-gray-300 rounded-md"
            />
            <!-- list -->
            <ul
              tabindex="0"
              class="dropdown-content menu bg-white absolute left-0 right-0 rounded-box z-10 p-2 shadow"
            >
              <li class="bg-gray-1"><a>Full Time</a></li>
              <li><a>Remote</a></li>
              <li><a>Contract</a></li>
              <li><a>Hybrid</a></li>
            </ul>

            <svg
              width="18"
              height="10"
              class="absolute right-4 top-4 h-4 w-4 text-gray-400"
              viewBox="0 0 18 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.031 1.53055L9.53104 9.03055C9.46139 9.10029 9.37867 9.15561 9.28762 9.19335C9.19657 9.23109 9.09898 9.25052 9.00042 9.25052C8.90186 9.25052 8.80426 9.23109 8.71321 9.19335C8.62216 9.15561 8.53945 9.10029 8.46979 9.03055L0.969792 1.53055C0.829062 1.38982 0.75 1.19895 0.75 0.999929C0.75 0.800906 0.829062 0.610034 0.969792 0.469303C1.11052 0.328573 1.30139 0.249512 1.50042 0.249512C1.69944 0.249512 1.89031 0.328573 2.03104 0.469303L9.00042 7.43962L15.9698 0.469303C16.0395 0.399621 16.1222 0.344345 16.2132 0.306633C16.3043 0.268921 16.4019 0.249512 16.5004 0.249512C16.599 0.249512 16.6965 0.268921 16.7876 0.306633C16.8786 0.344345 16.9614 0.399621 17.031 0.469303C17.1007 0.538986 17.156 0.621712 17.1937 0.712756C17.2314 0.803801 17.2508 0.901383 17.2508 0.999929C17.2508 1.09847 17.2314 1.19606 17.1937 1.2871C17.156 1.37815 17.1007 1.46087 17.031 1.53055Z"
                fill="#888888"
              />
            </svg>
          </div>
        </div>
      </div>

      <!--  -->
      <div class="flex gap-2">
        <div class="flex flex-col w-full relative">
          <label for="first-name" class="text-sm mb-2">Recruitment Quota</label>
          <div class="relative dropdown dropdown-bottom flex flex-col w-full">
            <input
              type="text"
              placeholder="Full Time"
              class="pl-2 placeholder:text-xs pr-4 h-11 outline-none border bg-white text-xs border-gray-300 rounded-md"
            />
            <!-- list -->
            <ul
              tabindex="0"
              class="dropdown-content menu bg-white absolute left-0 right-0 rounded-box z-10 p-2 shadow"
            >
              <li class="bg-gray-1"><a>Full Time</a></li>
              <li><a>Remote</a></li>
              <li><a>Contract</a></li>
              <li><a>Hybrid</a></li>
            </ul>

            <svg
              width="18"
              height="10"
              class="absolute right-4 top-4 h-4 w-4 text-gray-400"
              viewBox="0 0 18 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.031 1.53055L9.53104 9.03055C9.46139 9.10029 9.37867 9.15561 9.28762 9.19335C9.19657 9.23109 9.09898 9.25052 9.00042 9.25052C8.90186 9.25052 8.80426 9.23109 8.71321 9.19335C8.62216 9.15561 8.53945 9.10029 8.46979 9.03055L0.969792 1.53055C0.829062 1.38982 0.75 1.19895 0.75 0.999929C0.75 0.800906 0.829062 0.610034 0.969792 0.469303C1.11052 0.328573 1.30139 0.249512 1.50042 0.249512C1.69944 0.249512 1.89031 0.328573 2.03104 0.469303L9.00042 7.43962L15.9698 0.469303C16.0395 0.399621 16.1222 0.344345 16.2132 0.306633C16.3043 0.268921 16.4019 0.249512 16.5004 0.249512C16.599 0.249512 16.6965 0.268921 16.7876 0.306633C16.8786 0.344345 16.9614 0.399621 17.031 0.469303C17.1007 0.538986 17.156 0.621712 17.1937 0.712756C17.2314 0.803801 17.2508 0.901383 17.2508 0.999929C17.2508 1.09847 17.2314 1.19606 17.1937 1.2871C17.156 1.37815 17.1007 1.46087 17.031 1.53055Z"
                fill="#888888"
              />
            </svg>
          </div>
          <svg
            width="18"
            height="10"
            class="absolute right-4 top-11 h-4 w-4 text-gray-400"
            viewBox="0 0 18 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17.031 1.53055L9.53104 9.03055C9.46139 9.10029 9.37867 9.15561 9.28762 9.19335C9.19657 9.23109 9.09898 9.25052 9.00042 9.25052C8.90186 9.25052 8.80426 9.23109 8.71321 9.19335C8.62216 9.15561 8.53945 9.10029 8.46979 9.03055L0.969792 1.53055C0.829062 1.38982 0.75 1.19895 0.75 0.999929C0.75 0.800906 0.829062 0.610034 0.969792 0.469303C1.11052 0.328573 1.30139 0.249512 1.50042 0.249512C1.69944 0.249512 1.89031 0.328573 2.03104 0.469303L9.00042 7.43962L15.9698 0.469303C16.0395 0.399621 16.1222 0.344345 16.2132 0.306633C16.3043 0.268921 16.4019 0.249512 16.5004 0.249512C16.599 0.249512 16.6965 0.268921 16.7876 0.306633C16.8786 0.344345 16.9614 0.399621 17.031 0.469303C17.1007 0.538986 17.156 0.621712 17.1937 0.712756C17.2314 0.803801 17.2508 0.901383 17.2508 0.999929C17.2508 1.09847 17.2314 1.19606 17.1937 1.2871C17.156 1.37815 17.1007 1.46087 17.031 1.53055Z"
              fill="#888888"
            />
          </svg>
        </div>
        <div class="flex flex-col w-full relative">
          <label for="first-name" class="text-sm mb-2"
            >Recruitment Period</label
          >
          <div class="relative dropdown dropdown-bottom flex flex-col w-full">
            <input
              type="text"
              placeholder="Full Time"
              class="pl-2 placeholder:text-xs pr-4 h-11 outline-none border bg-white text-xs border-gray-300 rounded-md"
            />
            <!-- list -->
            <ul
              tabindex="0"
              class="dropdown-content menu bg-white absolute left-0 right-0 rounded-box z-10 p-2 shadow"
            >
              <li class="bg-gray-1"><a>Full Time</a></li>
              <li><a>Remote</a></li>
              <li><a>Contract</a></li>
              <li><a>Hybrid</a></li>
            </ul>

            <svg
              width="18"
              height="10"
              class="absolute right-4 top-4 h-4 w-4 text-gray-400"
              viewBox="0 0 18 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.031 1.53055L9.53104 9.03055C9.46139 9.10029 9.37867 9.15561 9.28762 9.19335C9.19657 9.23109 9.09898 9.25052 9.00042 9.25052C8.90186 9.25052 8.80426 9.23109 8.71321 9.19335C8.62216 9.15561 8.53945 9.10029 8.46979 9.03055L0.969792 1.53055C0.829062 1.38982 0.75 1.19895 0.75 0.999929C0.75 0.800906 0.829062 0.610034 0.969792 0.469303C1.11052 0.328573 1.30139 0.249512 1.50042 0.249512C1.69944 0.249512 1.89031 0.328573 2.03104 0.469303L9.00042 7.43962L15.9698 0.469303C16.0395 0.399621 16.1222 0.344345 16.2132 0.306633C16.3043 0.268921 16.4019 0.249512 16.5004 0.249512C16.599 0.249512 16.6965 0.268921 16.7876 0.306633C16.8786 0.344345 16.9614 0.399621 17.031 0.469303C17.1007 0.538986 17.156 0.621712 17.1937 0.712756C17.2314 0.803801 17.2508 0.901383 17.2508 0.999929C17.2508 1.09847 17.2314 1.19606 17.1937 1.2871C17.156 1.37815 17.1007 1.46087 17.031 1.53055Z"
                fill="#888888"
              />
            </svg>
          </div>
        </div>
      </div>

      <!--  -->
      <div class="flex gap-2">
        <div class="flex flex-col w-full relative">
          <label for="first-name" class="text-sm mb-2">Expected Salary</label>

          <input
            type="text"
            placeholder="Enter amount"
            class="pl-28 placeholder:text-xs pr-4 h-11 outline-none border border-gray-300 rounded-md"
          />

          <div class="absolute top-10 left-3 flex items-center gap-2">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_405_5557)">
                <path
                  d="M2.22222 2.77783C1.63285 2.77783 1.06762 3.01196 0.650874 3.42871C0.234126 3.84545 0 4.41068 0 5.00005L0 15.0001C0 15.5894 0.234126 16.1547 0.650874 16.5714C1.06762 16.9882 1.63285 17.2223 2.22222 17.2223H6.66667V2.77783H2.22222Z"
                  fill="#009A49"
                />
                <path
                  d="M6.66602 2.77783H13.3327V17.2223H6.66602V2.77783Z"
                  fill="#EEEEEE"
                />
                <path
                  d="M17.7784 2.77783H13.334V17.2223H17.7784C18.3678 17.2223 18.933 16.9882 19.3498 16.5714C19.7665 16.1547 20.0007 15.5894 20.0007 15.0001V5.00005C20.0007 4.41068 19.7665 3.84545 19.3498 3.42871C18.933 3.01196 18.3678 2.77783 17.7784 2.77783Z"
                  fill="#009A49"
                />
              </g>
              <defs>
                <clipPath id="clip0_405_5557">
                  <rect width="20" height="20" fill="white" />
                </clipPath>
              </defs>
            </svg>
            <h1 class="text-xs">NGN</h1>
          </div>

          <svg
            width="18"
            height="10"
            class="absolute left-20 top-11 h-4 w-4 text-gray-400"
            viewBox="0 0 18 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17.031 1.53055L9.53104 9.03055C9.46139 9.10029 9.37867 9.15561 9.28762 9.19335C9.19657 9.23109 9.09898 9.25052 9.00042 9.25052C8.90186 9.25052 8.80426 9.23109 8.71321 9.19335C8.62216 9.15561 8.53945 9.10029 8.46979 9.03055L0.969792 1.53055C0.829062 1.38982 0.75 1.19895 0.75 0.999929C0.75 0.800906 0.829062 0.610034 0.969792 0.469303C1.11052 0.328573 1.30139 0.249512 1.50042 0.249512C1.69944 0.249512 1.89031 0.328573 2.03104 0.469303L9.00042 7.43962L15.9698 0.469303C16.0395 0.399621 16.1222 0.344345 16.2132 0.306633C16.3043 0.268921 16.4019 0.249512 16.5004 0.249512C16.599 0.249512 16.6965 0.268921 16.7876 0.306633C16.8786 0.344345 16.9614 0.399621 17.031 0.469303C17.1007 0.538986 17.156 0.621712 17.1937 0.712756C17.2314 0.803801 17.2508 0.901383 17.2508 0.999929C17.2508 1.09847 17.2314 1.19606 17.1937 1.2871C17.156 1.37815 17.1007 1.46087 17.031 1.53055Z"
              fill="#888888"
            />
          </svg>
        </div>

        <div class="flex flex-col w-full">
          <label for="first-name" class="text-sm mb-2"
            >Experience in years</label
          >
          <input
            type="text"
            placeholder="Enter experience"
            class="pl-2 placeholder:text-xs pr-4 h-11 outline-none border border-gray-300 rounded-md"
          />
        </div>
      </div>
      <!--  -->
      <div class="flex gap-2">
        <div class="flex flex-col w-full">
          <label for="first-name" class="text-sm mb-2">Location</label>
          <input
            type="text"
            placeholder="Lagos, Nigeria"
            class="pl-2 placeholder:text-xs pr-4 h-11 outline-none border border-gray-300 rounded-md"
          />
        </div>

        <div class="flex flex-col w-full relative">
          <label for="first-name" class="text-sm mb-2"
            >Hiring Managers (Optional)</label
          >
          <div class="relative dropdown dropdown-bottom flex flex-col w-full">
            <input
              type="text"
              placeholder="Full Time"
              class="pl-2 placeholder:text-xs pr-4 h-11 outline-none border bg-white text-xs border-gray-300 rounded-md"
            />
            <!-- list -->
            <ul
              tabindex="0"
              class="dropdown-content menu bg-white absolute left-0 right-0 rounded-box z-10 p-2 shadow"
            >
              <li class="bg-gray-1"><a>Full Time</a></li>
              <li><a>Remote</a></li>
              <li><a>Contract</a></li>
              <li><a>Hybrid</a></li>
            </ul>

            <svg
              width="18"
              height="10"
              class="absolute right-4 top-4 h-4 w-4 text-gray-400"
              viewBox="0 0 18 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.031 1.53055L9.53104 9.03055C9.46139 9.10029 9.37867 9.15561 9.28762 9.19335C9.19657 9.23109 9.09898 9.25052 9.00042 9.25052C8.90186 9.25052 8.80426 9.23109 8.71321 9.19335C8.62216 9.15561 8.53945 9.10029 8.46979 9.03055L0.969792 1.53055C0.829062 1.38982 0.75 1.19895 0.75 0.999929C0.75 0.800906 0.829062 0.610034 0.969792 0.469303C1.11052 0.328573 1.30139 0.249512 1.50042 0.249512C1.69944 0.249512 1.89031 0.328573 2.03104 0.469303L9.00042 7.43962L15.9698 0.469303C16.0395 0.399621 16.1222 0.344345 16.2132 0.306633C16.3043 0.268921 16.4019 0.249512 16.5004 0.249512C16.599 0.249512 16.6965 0.268921 16.7876 0.306633C16.8786 0.344345 16.9614 0.399621 17.031 0.469303C17.1007 0.538986 17.156 0.621712 17.1937 0.712756C17.2314 0.803801 17.2508 0.901383 17.2508 0.999929C17.2508 1.09847 17.2314 1.19606 17.1937 1.2871C17.156 1.37815 17.1007 1.46087 17.031 1.53055Z"
                fill="#888888"
              />
            </svg>
          </div>
        </div>
      </div>

      <!--  -->
      <div class="py-4 space-y-2">
        <h1 class="font-black text-base">Skill Sets</h1>
        <button
          type="button"
          class="flex items-center gap-2"
          @click="showSkillInput = true"
        >
          <span
            ><svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.5 0H1.5C1.10218 0 0.720644 0.158035 0.43934 0.43934C0.158035 0.720644 0 1.10218 0 1.5V16.5C0 16.8978 0.158035 17.2794 0.43934 17.5607C0.720644 17.842 1.10218 18 1.5 18H16.5C16.8978 18 17.2794 17.842 17.5607 17.5607C17.842 17.2794 18 16.8978 18 16.5V1.5C18 1.10218 17.842 0.720644 17.5607 0.43934C17.2794 0.158035 16.8978 0 16.5 0ZM14.25 9.75H9.75V14.25C9.75 14.4489 9.67098 14.6397 9.53033 14.7803C9.38968 14.921 9.19891 15 9 15C8.80109 15 8.61032 14.921 8.46967 14.7803C8.32902 14.6397 8.25 14.4489 8.25 14.25V9.75H3.75C3.55109 9.75 3.36032 9.67098 3.21967 9.53033C3.07902 9.38968 3 9.19891 3 9C3 8.80109 3.07902 8.61032 3.21967 8.46967C3.36032 8.32902 3.55109 8.25 3.75 8.25H8.25V3.75C8.25 3.55109 8.32902 3.36032 8.46967 3.21967C8.61032 3.07902 8.80109 3 9 3C9.19891 3 9.38968 3.07902 9.53033 3.21967C9.67098 3.36032 9.75 3.55109 9.75 3.75V8.25H14.25C14.4489 8.25 14.6397 8.32902 14.7803 8.46967C14.921 8.61032 15 8.80109 15 9C15 9.19891 14.921 9.38968 14.7803 9.53033C14.6397 9.67098 14.4489 9.75 14.25 9.75Z"
                fill="#0FA968"
              />
            </svg>
          </span>
          <h1 class="text-success-600 text-xs">Add New Skills</h1>
        </button>

        <!-- Input form to add new skills -->
        <div v-if="showSkillInput" class="mt-4 flex flex-col">
          <input
            type="text"
            v-model="newSkill"
            class="border border-gray-300 rounded-md py-3 px-2 text-sm w-1/2 outline-none"
            @keyup.enter="addSkill"
          />

          <div class="w-20 pt-2">
            <button
              class="bg-primary-1 py-3 rounded-8 w-full text-white font-black text-xs px-4"
            >
              Save
            </button>
          </div>
        </div>

        <!-- Display selected skills with orange background -->
        <!-- <div v-if="skills.length" class="mt-4 space-y-2">
          <h2 class="font-bold text-base">Selected Skills:</h2>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="(skill, index) in skills"
              :key="index"
              class="bg-orange-500 text-white px-3 py-1 rounded-md text-xs"
            >
              {{ skill }}
            </span>
          </div>
        </div> -->
      </div>

      <!-- company -->
      <div class="flex flex-col w-full">
        <label for="first-name" class="text-sm mb-2">Job Description</label>
        <textarea
          type="text"
          rows="10"
          placeholder="Lagos, Nigeria......"
          class="p-2 border border-gray-300 rounded-lg w-full outline-none"
        />
      </div>
    </form>
  </div>
</template>
