<template>
  <div class="carousel w-full h-full">
    <!-- slide -->
    <div class="text-white carousel-item w-full h-screen">
      <div class="relative w-full">
        <div class="h-full w-full">
          <img
            src="/assets/images/my-lady.png"
            class="w-full h-screen object-cover z-0"
            alt="a lady with book"
          />
        </div>

        <div
          class="text-white absolute top-0 h-full w-full py-20 px-8 space-y-4 flex justify-between"
        >
          <div class=" mt-72">
            <h1 class="font-black text-xl">The Future of Work Powered by AI</h1>
            <div class="py-4 max-w-[864px] text-black-50">
              <h1 class="font-black text-[80px] leading-[88px]">
                Get Matched With Jobs Under 24hrs
              </h1>

              <p class="text-xs max-w-[669px]">
                Our recruitment platform bridges the gap between talented job
                seekers and forward-thinking recruiters. We offer Job seekers an
                intuitive search experience that matches them with the right
                opportunities based on their skills, experience, and career
                goals and our platform provides recruiters with a streamlined
                job posting process and advanced candidate search tools,
                enabling you to find the perfect fit for your team faster and
                more efficiently. Whether you're looking to build your career or
                build your team, our platform empowers both job seekers and
                recruiters to connect and succeed.
              </p>
            </div>
          </div>
         
          
          <!--  -->
          <div
            class="border w-[440px] bg-[#62696FCC] rounded-10 p-6 space-y-4 h-[23rem]"
          >
            <div class="flex items-center justify-between">
              <div>
                <h1 class="text-2xl">Find Your Jobs</h1>
                <p class="text-xs">Find the job that best suits you</p>
              </div>

              <img src="/assets/images/Logo2.png" alt="" />
            </div>
            <!-- input -->
            <form class="py-4 space-y-2">
              <div class="flex flex-col w-full">
                <label for="first-name" class="text-sm mb-2">Search job</label>
                <div class="relative">
                  <input
                    type="text"
                    placeholder="Search here..."
                    class="pl-10 placeholder:text-sm pr-4 h-10 w-full outline-none border bg-transparent border-gray-300 rounded-md"
                  />

                  <svg
                    width="16"
                    height="16"
                    class="absolute left-3 top-3 h-4 w-4 text-white"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15.1479 14.352L11.6273 10.8322C12.6477 9.60714 13.1566 8.03586 13.048 6.44521C12.9394 4.85456 12.2217 3.36702 11.0443 2.29202C9.86684 1.21702 8.32029 0.637343 6.72635 0.673568C5.13241 0.709792 3.6138 1.35913 2.48642 2.48651C1.35904 3.61389 0.709701 5.1325 0.673476 6.72644C0.637251 8.32038 1.21693 9.86693 2.29193 11.0444C3.36692 12.2218 4.85447 12.9394 6.44512 13.048C8.03577 13.1566 9.60705 12.6478 10.8321 11.6274L14.3519 15.148C14.4042 15.2002 14.4663 15.2417 14.5345 15.27C14.6028 15.2983 14.676 15.3128 14.7499 15.3128C14.8238 15.3128 14.897 15.2983 14.9653 15.27C15.0336 15.2417 15.0956 15.2002 15.1479 15.148C15.2001 15.0957 15.2416 15.0337 15.2699 14.9654C15.2982 14.8971 15.3127 14.8239 15.3127 14.75C15.3127 14.6761 15.2982 14.6029 15.2699 14.5346C15.2416 14.4663 15.2001 14.4043 15.1479 14.352ZM1.81242 6.87501C1.81242 5.87374 2.10933 4.89496 2.6656 4.06243C3.22188 3.22991 4.01253 2.58104 4.93758 2.19787C5.86263 1.8147 6.88053 1.71444 7.86256 1.90978C8.84459 2.10512 9.74664 2.58728 10.4546 3.29528C11.1626 4.00328 11.6448 4.90533 11.8401 5.88736C12.0355 6.86939 11.9352 7.88729 11.5521 8.81234C11.1689 9.73739 10.52 10.528 9.68749 11.0843C8.85497 11.6406 7.87618 11.9375 6.87492 11.9375C5.53271 11.936 4.24591 11.4022 3.29683 10.4531C2.34775 9.50401 1.81391 8.21721 1.81242 6.87501Z"
                      fill="white"
                    />
                  </svg>
                </div>
              </div>

              <div class="flex gap-x-2 py-2">
                <div class="flex flex-col w-full">
                  <label for="first-name" class="text-sm mb-2">Location</label>
                  <div class="relative">
                    <input
                      type="text"
                      placeholder="Type location here..."
                      class="pl-10 placeholder:text-sm pr-4 h-10 w-full outline-none border bg-transparent border-gray-300 rounded-md"
                    />
                    <svg
                      width="18"
                      height="18"
                      class="absolute left-3 top-3 h-4 w-4 text-white"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9 4.5C8.44374 4.5 7.89997 4.66495 7.43746 4.97399C6.97495 5.28303 6.61446 5.72229 6.40159 6.2362C6.18872 6.75012 6.13302 7.31562 6.24154 7.86119C6.35006 8.40676 6.61793 8.9079 7.01126 9.30124C7.4046 9.69457 7.90574 9.96244 8.45131 10.071C8.99688 10.1795 9.56238 10.1238 10.0763 9.91091C10.5902 9.69804 11.0295 9.33755 11.3385 8.87504C11.6475 8.41253 11.8125 7.86876 11.8125 7.3125C11.8125 6.56658 11.5162 5.85121 10.9887 5.32376C10.4613 4.79632 9.74592 4.5 9 4.5ZM9 9C8.66624 9 8.33998 8.90103 8.06248 8.7156C7.78497 8.53018 7.56868 8.26663 7.44095 7.95828C7.31323 7.64993 7.27981 7.31063 7.34492 6.98328C7.41004 6.65594 7.57076 6.35526 7.80676 6.11926C8.04276 5.88326 8.34344 5.72254 8.67078 5.65742C8.99813 5.59231 9.33743 5.62573 9.64578 5.75345C9.95413 5.88118 10.2177 6.09747 10.4031 6.37498C10.5885 6.65248 10.6875 6.97874 10.6875 7.3125C10.6875 7.76005 10.5097 8.18928 10.1932 8.50574C9.87678 8.82221 9.44755 9 9 9ZM9 1.125C7.35954 1.12686 5.78681 1.77935 4.62683 2.93933C3.46685 4.09931 2.81436 5.67204 2.8125 7.3125C2.8125 9.52031 3.83273 11.8603 5.76562 14.0801C6.63414 15.0831 7.61165 15.9864 8.68008 16.773C8.77466 16.8393 8.88734 16.8748 9.00281 16.8748C9.11829 16.8748 9.23097 16.8393 9.32555 16.773C10.392 15.986 11.3676 15.0828 12.2344 14.0801C14.1645 11.8603 15.1875 9.52031 15.1875 7.3125C15.1856 5.67204 14.5331 4.09931 13.3732 2.93933C12.2132 1.77935 10.6405 1.12686 9 1.125ZM9 15.6094C7.83773 14.6953 3.9375 11.3379 3.9375 7.3125C3.9375 5.96984 4.47087 4.68217 5.42027 3.73277C6.36967 2.78337 7.65734 2.25 9 2.25C10.3427 2.25 11.6303 2.78337 12.5797 3.73277C13.5291 4.68217 14.0625 5.96984 14.0625 7.3125C14.0625 11.3365 10.1623 14.6953 9 15.6094Z"
                        fill="white"
                      />
                    </svg>
                  </div>
                </div>
                <div class="flex flex-col w-full">
                  <label for="first-name" class="text-sm mb-2">Work Type</label>
                  <div class="relative">
                    <input
                      type="text"
                      placeholder="Work type..."
                      class="pl-10 placeholder:text-sm pr-4 h-10 w-full outline-none border bg-transparent border-gray-300 rounded-md"
                    />

                    <svg
                      width="18"
                      height="18"
                      class="absolute left-3 top-3 h-4 w-4 text-white"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M16.875 14.625H15.75V6.75C15.75 6.45163 15.6315 6.16548 15.4205 5.9545C15.2095 5.74353 14.9234 5.625 14.625 5.625H10.125V2.25C10.1251 2.04628 10.0699 1.84634 9.96533 1.67154C9.86071 1.49673 9.71059 1.35361 9.53098 1.25746C9.35138 1.16131 9.14904 1.11573 8.94556 1.12559C8.74208 1.13544 8.54509 1.20037 8.37563 1.31344L2.75062 5.0625C2.59632 5.16545 2.46986 5.30496 2.38252 5.46861C2.29517 5.63226 2.24965 5.81497 2.25 6.00047V14.625H1.125C0.975816 14.625 0.832742 14.6843 0.727252 14.7898C0.621763 14.8952 0.5625 15.0383 0.5625 15.1875C0.5625 15.3367 0.621763 15.4798 0.727252 15.5852C0.832742 15.6907 0.975816 15.75 1.125 15.75H16.875C17.0242 15.75 17.1673 15.6907 17.2727 15.5852C17.3782 15.4798 17.4375 15.3367 17.4375 15.1875C17.4375 15.0383 17.3782 14.8952 17.2727 14.7898C17.1673 14.6843 17.0242 14.625 16.875 14.625ZM14.625 6.75V14.625H10.125V6.75H14.625ZM3.375 6.00047L9 2.25V14.625H3.375V6.00047ZM7.875 7.875V9C7.875 9.14918 7.81574 9.29226 7.71025 9.39775C7.60476 9.50324 7.46168 9.5625 7.3125 9.5625C7.16332 9.5625 7.02024 9.50324 6.91475 9.39775C6.80926 9.29226 6.75 9.14918 6.75 9V7.875C6.75 7.72581 6.80926 7.58274 6.91475 7.47725C7.02024 7.37176 7.16332 7.3125 7.3125 7.3125C7.46168 7.3125 7.60476 7.37176 7.71025 7.47725C7.81574 7.58274 7.875 7.72581 7.875 7.875ZM5.625 7.875V9C5.625 9.14918 5.56574 9.29226 5.46025 9.39775C5.35476 9.50324 5.21168 9.5625 5.0625 9.5625C4.91332 9.5625 4.77024 9.50324 4.66475 9.39775C4.55926 9.29226 4.5 9.14918 4.5 9V7.875C4.5 7.72581 4.55926 7.58274 4.66475 7.47725C4.77024 7.37176 4.91332 7.3125 5.0625 7.3125C5.21168 7.3125 5.35476 7.37176 5.46025 7.47725C5.56574 7.58274 5.625 7.72581 5.625 7.875ZM5.625 11.8125V12.9375C5.625 13.0867 5.56574 13.2298 5.46025 13.3352C5.35476 13.4407 5.21168 13.5 5.0625 13.5C4.91332 13.5 4.77024 13.4407 4.66475 13.3352C4.55926 13.2298 4.5 13.0867 4.5 12.9375V11.8125C4.5 11.6633 4.55926 11.5202 4.66475 11.4148C4.77024 11.3093 4.91332 11.25 5.0625 11.25C5.21168 11.25 5.35476 11.3093 5.46025 11.4148C5.56574 11.5202 5.625 11.6633 5.625 11.8125ZM7.875 11.8125V12.9375C7.875 13.0867 7.81574 13.2298 7.71025 13.3352C7.60476 13.4407 7.46168 13.5 7.3125 13.5C7.16332 13.5 7.02024 13.4407 6.91475 13.3352C6.80926 13.2298 6.75 13.0867 6.75 12.9375V11.8125C6.75 11.6633 6.80926 11.5202 6.91475 11.4148C7.02024 11.3093 7.16332 11.25 7.3125 11.25C7.46168 11.25 7.60476 11.3093 7.71025 11.4148C7.81574 11.5202 7.875 11.6633 7.875 11.8125Z"
                        fill="white"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </form>
            <!-- btn -->
            <button class="w-full p-3 bg-primary-1 rounded-8 text-xs font-black">
              Search job
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- slide 2 -->
    <div class="bg-primary-1 text-white h-screen carousel-item w-full">
      <div class="flex h-full w-full justify-between items-center px-6">
        <div class="w-1/2 h-auto space-y-4">
          <h1 class="font-black text-xl ">
            Get Matched with Candidates Under 24hrs
          </h1>
          <div class="py-4 max-w-[890px] text-black-50">
            <h1 class="font-black text-[80px] line">
              Recruit The Team You Need In Minutes.
            </h1>

            <p class="text-xs max-w-[669px] py-2">
              Our recruitment platform bridges the gap between talented job
              seekers and forward-thinking recruiters. We offer Job seekers an
              intuitive search experience that matches them with the right
              opportunities based on their skills, experience, and career goals
              and our platform provides recruiters with a streamlined job
              posting process and advanced candidate search tools, enabling you
              to find the perfect fit for your team faster and more efficiently.
              Whether you're looking to build your career or build your team,
              our platform empowers both job seekers and recruiters to connect
              and succeed.
            </p>
            <div class="py-4">
              <button
                class="h-[50px] w-[221px] bg-white text-xs text-black-800 font-black rounded-10"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>

        <div class="h-full w-1/2 text-black-900 relative">
          <div class="relative top-24 right-10 left-0">
            <img src="/assets/images/frame.png" class="w-full h-full" alt="" />
          </div>

          <div class="absolute h-full top-0 right-0">
            <img
              src="/assets/images/3group.png"
              class="h-full w-auto object-cover"
              alt=""
            />
          </div>

          <!--  -->
          <div
            class="bg-white w-64 h-[120px] hover:bg-westside-500 hover:text-white absolute bottom-60 -left-4 rounded-8"
          >
            <div class="flex justify-between items-center border-b-2">
              <div class="flex flex-co8 px-4 py-3 space-y-2">
                <h1 class="text-sm">IOS Mobile Developer</h1>
                <h1 class="text-xs">Experience: 6 years</h1>
              </div>

              <div class="pr-3">
                <img src="/assets/images/Ellipse10.png" alt="" />
              </div>
            </div>

            <div class="flex justify-between px-4 pt-3">
              <h1 class="text-xs">Status: Hired</h1>
              <h1 class="text-xs">Time to hire: 15 days</h1>
            </div>
          </div>

          <div
            class="bg-white w-64 h-20 hover:bg-westside-500 hover:text-white absolute bottom-24 flex flex-col right-6 rounded-8"
          >
            <div class="flex items-center">
              <div class="pl-3">
                <img src="/assets/images/Ellipse6.png" alt="" />
              </div>

              <div class="flex flex-col px-4 py-4 space-y-2">
                <h1 class="text-sm">Esther Howard</h1>
                <h1 class="text-xs">Tech Recruiter</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.line {
  line-height: 88px;
}
</style>
