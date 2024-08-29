<script setup lang="ts">
definePageMeta({
  name: "Input",
  title: "My profile",
  pageName: "dashboard.my-profile",
  layout: "dashboard",
});
</script>

<template>
  <div class="w-full h-full">
    <div class="text-black-700 flex gap-4 text-sm h-full w-full">
      <div class="w-1/2 rounded-10 font-[Georgia] h-full">
        <div class="border bg-white border-b-2 p-6">
          <div class="space-x-3 flex items-center">
            <span
              ><svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 0.25C8.07164 0.25 6.18657 0.821828 4.58319 1.89317C2.97982 2.96451 1.73013 4.48726 0.992179 6.26884C0.254225 8.05042 0.061142 10.0108 0.437348 11.9021C0.813554 13.7934 1.74215 15.5307 3.10571 16.8943C4.46928 18.2579 6.20656 19.1865 8.09787 19.5627C9.98919 19.9389 11.9496 19.7458 13.7312 19.0078C15.5127 18.2699 17.0355 17.0202 18.1068 15.4168C19.1782 13.8134 19.75 11.9284 19.75 10C19.7473 7.41498 18.7192 4.93661 16.8913 3.10872C15.0634 1.28084 12.585 0.25273 10 0.25ZM9.625 4.75C9.84751 4.75 10.065 4.81598 10.25 4.9396C10.435 5.06321 10.5792 5.23891 10.6644 5.44448C10.7495 5.65005 10.7718 5.87625 10.7284 6.09448C10.685 6.31271 10.5778 6.51316 10.4205 6.6705C10.2632 6.82783 10.0627 6.93498 9.84448 6.97838C9.62625 7.02179 9.40005 6.99951 9.19449 6.91436C8.98892 6.82922 8.81322 6.68502 8.6896 6.50002C8.56598 6.31501 8.5 6.0975 8.5 5.875C8.5 5.57663 8.61853 5.29048 8.82951 5.0795C9.04049 4.86853 9.32664 4.75 9.625 4.75ZM10.75 15.25C10.3522 15.25 9.97065 15.092 9.68934 14.8107C9.40804 14.5294 9.25 14.1478 9.25 13.75V10C9.05109 10 8.86033 9.92098 8.71967 9.78033C8.57902 9.63968 8.5 9.44891 8.5 9.25C8.5 9.05109 8.57902 8.86032 8.71967 8.71967C8.86033 8.57902 9.05109 8.5 9.25 8.5C9.64783 8.5 10.0294 8.65804 10.3107 8.93934C10.592 9.22064 10.75 9.60218 10.75 10V13.75C10.9489 13.75 11.1397 13.829 11.2803 13.9697C11.421 14.1103 11.5 14.3011 11.5 14.5C11.5 14.6989 11.421 14.8897 11.2803 15.0303C11.1397 15.171 10.9489 15.25 10.75 15.25Z"
                  fill="#FE8900"
                />
              </svg>
            </span>
            <h1 class="text-primary-1 font-bold">Basic Information</h1>
          </div>
        </div>
        <div class="border-b-2 bg-white p-6">
          <div class="space-x-3 flex items-center">
            <span
              ><svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.5307 6.46975C13.6004 6.53941 13.6557 6.62212 13.6934 6.71317C13.7312 6.80422 13.7506 6.90182 13.7506 7.00038C13.7506 7.09894 13.7312 7.19654 13.6934 7.28758C13.6557 7.37863 13.6004 7.46135 13.5307 7.531L7.53065 13.531C7.46097 13.6007 7.37824 13.656 7.2872 13.6937C7.19615 13.7314 7.09857 13.7508 7.00002 13.7508C6.90148 13.7508 6.8039 13.7314 6.71285 13.6937C6.62181 13.656 6.53908 13.6007 6.4694 13.531C6.39972 13.4613 6.34444 13.3786 6.30673 13.2875C6.26902 13.1965 6.24961 13.0989 6.24961 13.0004C6.24961 12.9018 6.26902 12.8043 6.30673 12.7132C6.34444 12.6222 6.39972 12.5394 6.4694 12.4698L12.4694 6.46975C12.5391 6.40002 12.6218 6.3447 12.7128 6.30696C12.8039 6.26922 12.9015 6.24979 13 6.24979C13.0986 6.24979 13.1962 6.26922 13.2872 6.30696C13.3783 6.3447 13.461 6.40002 13.5307 6.46975ZM18.2125 1.78788C17.725 1.30031 17.1462 0.913554 16.5092 0.649684C15.8722 0.385813 15.1895 0.25 14.5 0.25C13.8105 0.25 13.1278 0.385813 12.4908 0.649684C11.8538 0.913554 11.275 1.30031 10.7875 1.78788L7.9694 4.60507C7.82867 4.7458 7.74961 4.93667 7.74961 5.13569C7.74961 5.33471 7.82867 5.52559 7.9694 5.66632C8.11013 5.80705 8.301 5.88611 8.50002 5.88611C8.69905 5.88611 8.88992 5.80705 9.03065 5.66632L11.8488 2.85382C12.5546 2.16349 13.5042 1.77936 14.4915 1.7848C15.4788 1.79024 16.4241 2.1848 17.1222 2.88286C17.8204 3.58092 18.2151 4.52615 18.2208 5.51343C18.2264 6.5007 17.8424 7.45037 17.1522 8.15632L14.3331 10.9744C14.1924 11.115 14.1133 11.3058 14.1132 11.5047C14.1131 11.7037 14.1921 11.8945 14.3327 12.0352C14.4733 12.176 14.664 12.2551 14.863 12.2552C15.0619 12.2552 15.2527 12.1763 15.3935 12.0357L18.2125 9.21288C18.7001 8.72536 19.0868 8.14658 19.3507 7.50959C19.6146 6.8726 19.7504 6.18986 19.7504 5.50038C19.7504 4.81089 19.6146 4.12816 19.3507 3.49117C19.0868 2.85417 18.7001 2.27539 18.2125 1.78788ZM10.9694 14.3335L8.15127 17.1516C7.80447 17.5062 7.39077 17.7885 6.93413 17.9821C6.47749 18.1757 5.98698 18.2768 5.491 18.2795C4.99502 18.2823 4.50342 18.1866 4.04468 17.998C3.58593 17.8094 3.16915 17.5317 2.81846 17.181C2.46778 16.8302 2.19015 16.4134 2.00167 15.9546C1.81319 15.4959 1.71759 15.0042 1.72041 14.5083C1.72323 14.0123 1.82441 13.5218 2.01809 13.0652C2.21178 12.6086 2.49412 12.1949 2.84877 11.8482L5.66596 9.031C5.80669 8.89027 5.88575 8.6994 5.88575 8.50038C5.88575 8.30136 5.80669 8.11048 5.66596 7.96975C5.52523 7.82902 5.33436 7.74996 5.13534 7.74996C4.93631 7.74996 4.74544 7.82902 4.60471 7.96975L1.78752 10.7879C0.802908 11.7725 0.249756 13.1079 0.249756 14.5004C0.249756 15.8928 0.802908 17.2283 1.78752 18.2129C2.77214 19.1975 4.10757 19.7506 5.50002 19.7506C6.89248 19.7506 8.22791 19.1975 9.21252 18.2129L12.0306 15.3938C12.1713 15.2531 12.2502 15.0623 12.2501 14.8633C12.25 14.6644 12.1709 14.4736 12.0302 14.333C11.8895 14.1924 11.6986 14.1135 11.4997 14.1136C11.3008 14.1137 11.11 14.1928 10.9694 14.3335Z"
                  fill="#3D3D3D"
                />
              </svg>
            </span>
            <h1 class="font-bold text-sm text-black-600">links</h1>
          </div>
        </div>
        <div class="border-b-2 bg-white p-6">
          <div class="space-x-3 flex items-center">
            <span
              ><svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19.6488 17.8746C18.2209 15.4062 16.0206 13.6362 13.4528 12.7971C14.723 12.041 15.7098 10.8888 16.2618 9.51755C16.8137 8.14629 16.9003 6.63175 16.5082 5.20652C16.1161 3.78129 15.267 2.52418 14.0912 1.62824C12.9155 0.732298 11.4782 0.24707 10 0.24707C8.52182 0.24707 7.08451 0.732298 5.90878 1.62824C4.73306 2.52418 3.88394 3.78129 3.49183 5.20652C3.09971 6.63175 3.18629 8.14629 3.73825 9.51755C4.29021 10.8888 5.27704 12.041 6.5472 12.7971C3.97938 13.6352 1.77907 15.4052 0.35126 17.8746C0.298899 17.96 0.264169 18.055 0.249118 18.154C0.234067 18.253 0.239 18.3541 0.263626 18.4511C0.288252 18.5482 0.332073 18.6394 0.392502 18.7192C0.452931 18.7991 0.528745 18.8661 0.61547 18.9162C0.702196 18.9663 0.798076 18.9985 0.897455 19.0109C0.996833 19.0234 1.0977 19.0158 1.19409 18.9886C1.29049 18.9614 1.38047 18.9152 1.45872 18.8527C1.53697 18.7902 1.6019 18.7126 1.6497 18.6246C3.41595 15.5721 6.53782 13.7496 10 13.7496C13.4622 13.7496 16.5841 15.5721 18.3503 18.6246C18.3981 18.7126 18.4631 18.7902 18.5413 18.8527C18.6196 18.9152 18.7095 18.9614 18.8059 18.9886C18.9023 19.0158 19.0032 19.0234 19.1026 19.0109C19.2019 18.9985 19.2978 18.9663 19.3845 18.9162C19.4713 18.8661 19.5471 18.7991 19.6075 18.7192C19.6679 18.6394 19.7118 18.5482 19.7364 18.4511C19.761 18.3541 19.766 18.253 19.7509 18.154C19.7358 18.055 19.7011 17.96 19.6488 17.8746ZM4.75001 6.99962C4.75001 5.96127 5.05792 4.94624 5.63479 4.08288C6.21167 3.21952 7.03161 2.54661 7.99092 2.14925C8.95023 1.75189 10.0058 1.64793 11.0242 1.8505C12.0426 2.05307 12.9781 2.55308 13.7123 3.28731C14.4465 4.02154 14.9466 4.957 15.1491 5.9754C15.3517 6.9938 15.2477 8.0494 14.8504 9.00871C14.453 9.96802 13.7801 10.788 12.9168 11.3648C12.0534 11.9417 11.0384 12.2496 10 12.2496C8.60808 12.2481 7.27359 11.6945 6.28934 10.7103C5.3051 9.72604 4.7515 8.39155 4.75001 6.99962Z"
                  fill="#3D3D3D"
                />
              </svg>
            </span>
            <h1 class="font-bold text-sm text-black-600">About Me</h1>
          </div>
        </div>
        <div class="border-b-2 bg-white p-6">
          <div class="space-x-3 flex items-center">
            <span
              ><svg
                width="18"
                height="20"
                viewBox="0 0 18 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.0306 5.71938L11.7806 0.469375C11.7109 0.399749 11.6282 0.344539 11.5371 0.306898C11.4461 0.269257 11.3485 0.249923 11.25 0.25H2.25C1.85218 0.25 1.47064 0.408035 1.18934 0.68934C0.908035 0.970645 0.75 1.35218 0.75 1.75V18.25C0.75 18.6478 0.908035 19.0294 1.18934 19.3107C1.47064 19.592 1.85218 19.75 2.25 19.75H15.75C16.1478 19.75 16.5294 19.592 16.8107 19.3107C17.092 19.0294 17.25 18.6478 17.25 18.25V6.25C17.2501 6.15148 17.2307 6.05391 17.1931 5.96286C17.1555 5.87182 17.1003 5.78908 17.0306 5.71938ZM12 2.81031L14.6897 5.5H12V2.81031ZM15.75 18.25H2.25V1.75H10.5V6.25C10.5 6.44891 10.579 6.63968 10.7197 6.78033C10.8603 6.92098 11.0511 7 11.25 7H15.75V18.25ZM12.75 10.75C12.75 10.9489 12.671 11.1397 12.5303 11.2803C12.3897 11.421 12.1989 11.5 12 11.5H6C5.80109 11.5 5.61032 11.421 5.46967 11.2803C5.32902 11.1397 5.25 10.9489 5.25 10.75C5.25 10.5511 5.32902 10.3603 5.46967 10.2197C5.61032 10.079 5.80109 10 6 10H12C12.1989 10 12.3897 10.079 12.5303 10.2197C12.671 10.3603 12.75 10.5511 12.75 10.75ZM12.75 13.75C12.75 13.9489 12.671 14.1397 12.5303 14.2803C12.3897 14.421 12.1989 14.5 12 14.5H6C5.80109 14.5 5.61032 14.421 5.46967 14.2803C5.32902 14.1397 5.25 13.9489 5.25 13.75C5.25 13.5511 5.32902 13.3603 5.46967 13.2197C5.61032 13.079 5.80109 13 6 13H12C12.1989 13 12.3897 13.079 12.5303 13.2197C12.671 13.3603 12.75 13.5511 12.75 13.75Z"
                  fill="#3D3D3D"
                />
              </svg>
            </span>
            <h1 class="font-bold text-sm text-black-600">Work Experience</h1>
          </div>
        </div>
        <div class="text-right py-3">
          <button
            class="text-xs py-2 text-white px-3.5 rounded-8 bg-success-600 font-[Nexa] font-[100]"
          >
            Save changes
          </button>
        </div>
      </div>

      <!--  -->
      <div class="w-full h-full space-y-4">
        <div class="bg-white w-full rounded-10 p-4 h-full space-y-3">
          <h1 class="font-bold text-xl font-[Georgia]">Basic Information</h1>
          <div class="flex divide-x-2 gap-4">
            <div class="py-2">
              <div class="px-2 pb-6 space-y-4">
                <img src="/assets/images/man.png" alt="" />
                <button
                  class="text-xs py-2 text-primary-1 border px-3.5 rounded-8 border-primary-1 font-[Nexa] font-[100]"
                >
                  Replace photo
                </button>
              </div>

              <!--  -->
              <div class="bg-black-50 w-44 space-y-2 p-3 rounded-10">
                <div class="flex items-start gap-x-2">
                  <span
                    ><svg
                      width="20"
                      height="18"
                      viewBox="0 0 20 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M18.25 0.75H1.75C1.35218 0.75 0.970644 0.908035 0.68934 1.18934C0.408035 1.47064 0.25 1.85218 0.25 2.25V15.75C0.25 16.1478 0.408035 16.5294 0.68934 16.8107C0.970644 17.092 1.35218 17.25 1.75 17.25H18.25C18.6478 17.25 19.0294 17.092 19.3107 16.8107C19.592 16.5294 19.75 16.1478 19.75 15.75V2.25C19.75 1.85218 19.592 1.47064 19.3107 1.18934C19.0294 0.908035 18.6478 0.75 18.25 0.75ZM18.25 2.25V11.8828L15.8059 9.43969C15.6666 9.30036 15.5013 9.18984 15.3193 9.11444C15.1372 9.03904 14.9422 9.00023 14.7452 9.00023C14.5481 9.00023 14.3531 9.03904 14.1711 9.11444C13.989 9.18984 13.8237 9.30036 13.6844 9.43969L11.8094 11.3147L7.68438 7.18969C7.4031 6.9086 7.02172 6.7507 6.62406 6.7507C6.22641 6.7507 5.84503 6.9086 5.56375 7.18969L1.75 11.0034V2.25H18.25ZM1.75 13.125L6.625 8.25L14.125 15.75H1.75V13.125ZM18.25 15.75H16.2466L12.8716 12.375L14.7466 10.5L18.25 14.0044V15.75ZM11.5 6.375C11.5 6.1525 11.566 5.93499 11.6896 5.74998C11.8132 5.56498 11.9889 5.42078 12.1945 5.33564C12.4 5.25049 12.6262 5.22821 12.8445 5.27162C13.0627 5.31502 13.2632 5.42217 13.4205 5.5795C13.5778 5.73684 13.685 5.93729 13.7284 6.15552C13.7718 6.37375 13.7495 6.59995 13.6644 6.80552C13.5792 7.01109 13.435 7.18679 13.25 7.3104C13.065 7.43402 12.8475 7.5 12.625 7.5C12.3266 7.5 12.0405 7.38147 11.8295 7.1705C11.6185 6.95952 11.5 6.67337 11.5 6.375Z"
                        fill="#343330"
                      />
                    </svg>
                  </span>
                  <div>
                    <h1 class="text-xs">Choose banner photo</h1>
                    <h1 class="text-xs text-info-600">Document Name.pdf</h1>
                  </div>
                </div>
                <button
                  class="text-xs py-2 text-primary-1 border px-3.5 rounded-8 border-primary-1 font-[Nexa] font-[100]"
                >
                  Replace photo
                </button>
              </div>
            </div>
            <!-- input for full name -->
            <div class="p-4 font-[Nexa] w-full space-y-4">
              <div class="flex gap-2">
                <div class="flex flex-col w-full">
                  <label for="first-name" class="text-sm mb-2"
                    >First Name</label
                  >
                  <input
                    type="text"
                    placeholder="Enter your first name here"
                    class="pl-2 placeholder:text-sm pr-4 h-11 outline-none border border-gray-300 rounded-md"
                  />
                </div>
                <div class="flex flex-col w-full">
                  <label for="first-name" class="text-sm mb-2">Last Name</label>
                  <input
                    type="text"
                    placeholder="Enter your last name here"
                    class="pl-2 placeholder:text-sm pr-4 h-11 outline-none border border-gray-300 rounded-md"
                  />
                </div>
              </div>
              <!-- ocupation -->
              <div class="flex flex-col w-full">
                <label for="first-name" class="text-sm mb-2">Occupation</label>
                <input
                  type="text"
                  placeholder="UI/UX Designer"
                  class="pl-2 placeholder:text-sm pr-4 h-11 outline-none border border-gray-300 rounded-md"
                />
              </div>
              <!-- company -->
              <div class="flex flex-col w-full">
                <label for="first-name" class="text-sm mb-2">Company</label>
                <input
                  type="text"
                  placeholder="Workonnect"
                  class="pl-2 placeholder:text-sm pr-4 h-11 outline-none border border-gray-300 rounded-md"
                />
              </div>
              <!-- location -->
              <div class="flex flex-col w-1/2">
                <label for="first-name" class="text-sm mb-2">Location</label>
                <input
                  type="text"
                  placeholder="Nigeria"
                  class="pl-2 placeholder:text-sm pr-4 h-11 outline-none border border-gray-300 rounded-md"
                />
              </div>

              <!-- city -->
              <div class="flex flex-col w-1/2">
                <label for="first-name" class="text-sm mb-2">City</label>
                <input
                  type="text"
                  placeholder="Lagos"
                  class="pl-2 placeholder:text-sm pr-4 h-11 outline-none border border-gray-300 rounded-md"
                />
              </div>

              <!-- portfolio -->
              <div class="flex flex-col w-1/2">
                <label for="first-name" class="text-sm mb-2"
                  >Portfolio URL</label
                >
                <input
                  type="text"
                  placeholder="https://example.example.com"
                  class="pl-2 placeholder:text-sm pr-4 h-11 outline-none border border-gray-300 rounded-md"
                />
              </div>

              <!--  -->
              <div class="flex gap-2">
                <div class="flex flex-col w-full">
                  <label for="first-name" class="text-sm mb-2"
                    >Salary Expectation</label
                  >
                  <input
                    type="text"
                    placeholder="$5000"
                    class="pl-2 placeholder:text-sm pr-4 h-11 outline-none border border-gray-300 rounded-md"
                  />
                </div>

                <div class="flex flex-col w-full">
                  <label for="first-name" class="text-sm mb-2">Duration</label>
                  <div class="relative w-full">
                    <input
                      type="text"
                      placeholder="Monthly"
                      class="pl-2 placeholder:text-sm pr-4 h-11 w-full outline-none border rel border-gray-300 rounded-md"
                    />
                    <svg
                      width="14"
                      height="9"
                      class="absolute right-3 top-3.5 h-4 w-4 text-gray-400"
                      viewBox="0 0 14 9"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M13.6923 1.94254L7.44229 8.19254C7.38425 8.25065 7.31531 8.29675 7.23944 8.3282C7.16357 8.35965 7.08224 8.37584 7.0001 8.37584C6.91797 8.37584 6.83664 8.35965 6.76077 8.3282C6.68489 8.29675 6.61596 8.25065 6.55792 8.19254L0.307916 1.94254C0.19064 1.82526 0.124756 1.6662 0.124756 1.50035C0.124756 1.3345 0.19064 1.17544 0.307916 1.05816C0.425191 0.940884 0.584251 0.875 0.750103 0.875C0.915956 0.875 1.07502 0.940884 1.19229 1.05816L7.0001 6.86675L12.8079 1.05816C12.866 1.00009 12.9349 0.954028 13.0108 0.922601C13.0867 0.891175 13.168 0.875 13.2501 0.875C13.3322 0.875 13.4135 0.891175 13.4894 0.922601C13.5653 0.954028 13.6342 1.00009 13.6923 1.05816C13.7504 1.11623 13.7964 1.18517 13.8278 1.26104C13.8593 1.33691 13.8755 1.41823 13.8755 1.50035C13.8755 1.58247 13.8593 1.66379 13.8278 1.73966C13.7964 1.81553 13.7504 1.88447 13.6923 1.94254Z"
                        fill="#343330"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <!-- social media links -->
          </div>
        </div>

        <!-- social media links-->
        <div class="bg-white p-4 rounded-10 font-[Nexa]">
          <h1 class="font-bold text-xl font-[Georgia]">Links</h1>
          <p class="text-xs">
            Build trust with recruiters by verifying your social profiles
          </p>
          <div class="flex flex-col w-2/3 space-y-4 pt-6">
            <div class="flex flex-col w-full">
              <label for="first-name" class="text-sm mb-2">Facebook URL</label>
              <input
                type="text"
                placeholder="UI/UX Designer"
                class="pl-2 placeholder:text-sm pr-4 h-11 outline-none border border-gray-300 rounded-md"
              />
            </div>
            <div class="flex flex-col w-full">
              <label for="first-name" class="text-sm mb-2">Linkedin URL</label>
              <input
                type="text"
                placeholder="Workonnect"
                class="pl-2 placeholder:text-sm pr-4 h-11 outline-none border border-gray-300 rounded-md"
              />
            </div>
            <div class="flex flex-col w-full">
              <label for="first-name" class="text-sm mb-2">Instagram URL</label>
              <input
                type="text"
                placeholder="Nigeria"
                class="pl-2 placeholder:text-sm pr-4 h-11 outline-none border border-gray-300 rounded-md"
              />
            </div>
            <div class="flex flex-col w-full">
              <label for="first-name" class="text-sm mb-2">Twitter URL</label>
              <input
                type="text"
                placeholder="Lagos"
                class="pl-2 placeholder:text-sm pr-4 h-11 outline-none border border-gray-300 rounded-md"
              />
            </div>
          </div>

          <!-- about me -->
        </div>

        <!-- about -->
        <div class="bg-white p-4 rounded-10 font-[Nexa]">
          <h1 class="font-bold text-xl font-[Georgia]">About me</h1>
          <p class="text-xs">
            Write something about you that entice the recruiters......
          </p>

          <!--  -->
          <div class="flex flex-col space-y-4 pt-6">
            <div class="flex flex-col w-full">
              <label for="first-name" class="text-sm mb-2">Section Title</label>
              <input
                type="text"
                placeholder="About me"
                class="pl-2 placeholder:text-sm pr-4 h-11 outline-none border border-gray-300 rounded-md"
              />
            </div>

            <div class="flex flex-col w-full">
              <label for="first-name" class="text-sm mb-2">Description</label>
              <textarea
                type="text"
                rows="10"
                placeholder="Write something about you that entice the recruiters......"
                class="p-2 border border-gray-300 rounded-lg w-full"
              />
            </div>
          </div>

          <!-- about me -->
        </div>

        <!-- work experience -->
        <div class="bg-white p-4 rounded-10 font-[Nexa]">
          <div class="flex justify-between items-center">
            <div class="py-4">
              <h1 class="font-bold text-xl font-[Georgia] capitalize">
                work experience
              </h1>
              <p class="text-xs">
                Build trust with recruiters by verifying your social profiles
              </p>
            </div>

            <div>
              <button class="px-4 py-2 bg-primary-1 text-white rounded-5">
                Edit experience
              </button>
            </div>
          </div>

          <ul class="list-disc pl-4 space-y-4">
            <div>
              <li class="text-info-600 font-black">
                User Interface Designer at Workonnect
              </li>
              <div class="text-sm flex gap-3">
                <h1 class="font-black">May - June 2020</h1>
                <h1>Lagos, Nigeria.</h1>
              </div>
            </div>

            <div>
              <li class="text-info-600 font-black">Accountant at Workonnect</li>
              <div class="text-sm flex gap-3">
                <h1 class="font-black">May - June 2020</h1>
                <h1>Lagos, Nigeria.</h1>
              </div>
            </div>

            <div>
              <li class="text-info-600 font-black">HR Manager at Workonnect</li>
              <div class="text-sm flex gap-3">
                <h1 class="font-black">May - June 2020</h1>
                <h1>Lagos, Nigeria.</h1>
              </div>
            </div>

            <div>
              <li class="text-info-600 font-black">
                Graphic Designer at Workonnect
              </li>
              <div class="text-sm flex gap-3">
                <h1 class="font-black">May - June 2020</h1>
                <h1>Lagos, Nigeria.</h1>
              </div>
            </div>
          </ul>

          <!--  -->

          <!-- about me -->
        </div>
      </div>
    </div>
  </div>
</template>
