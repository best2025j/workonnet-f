<script setup lang="ts">
definePageMeta({
  title: "My Profile",
  pageName: "dashboard.jobseeker.my-profile.index",
  layout: "dashboard",
  middleware: ['auth', 'is-jobseeker']
});
</script>

<template>
  <div class="text-black-900">
    <!-- profile uploads -->
    <div class="p-4 bg-white rounded-10">
      <img
        src="/assets/images/bridge.png"
        class="w-full h-32 md:h-auto "
        alt="no image yet..."
      />

      <div class="-mt-12 md:pl-6 space-y-2">
        <img src="/assets/images/man.png" alt="profile-image" class="flex justify-center w-[30%] mx-auto md:mx-0 md:w-auto h-full items-center" />

        <div class="flex flex-col md:flex-row justify-between space-y-3 md:items-center">
          <div class="space-y-2">
            <h1 class="font-black text-base">Stanley Nwosu</h1>
            <div class="flex items-start space-x-4">
              <div class="space-y-2">
                <h1 class="text-xs">UI/UX Designer</h1>
                <h1 class="text-xs">Lagos, Nigeria</h1>
              </div>
            </div>
          </div>
          <!--  user info-->
          <div class="space-y-2">
            <div class="flex gap-2 items-center">
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.9422 6.05813C12.0003 6.11617 12.0464 6.1851 12.0778 6.26098C12.1093 6.33685 12.1255 6.41818 12.1255 6.50032C12.1255 6.58245 12.1093 6.66378 12.0778 6.73965C12.0464 6.81553 12.0003 6.88446 11.9422 6.9425L6.94218 11.9425C6.88411 12.0006 6.81517 12.0466 6.7393 12.0781C6.66343 12.1095 6.58212 12.1257 6.49999 12.1257C6.41787 12.1257 6.33655 12.1095 6.26068 12.0781C6.18481 12.0466 6.11587 12.0006 6.05781 11.9425C5.99974 11.8844 5.95367 11.8155 5.92225 11.7396C5.89082 11.6638 5.87465 11.5824 5.87465 11.5003C5.87465 11.4182 5.89082 11.3369 5.92225 11.261C5.95367 11.1851 5.99974 11.1162 6.05781 11.0581L11.0578 6.05813C11.1159 6.00002 11.1848 5.95392 11.2607 5.92246C11.3365 5.89101 11.4179 5.87482 11.5 5.87482C11.5821 5.87482 11.6635 5.89101 11.7393 5.92246C11.8152 5.95392 11.8841 6.00002 11.9422 6.05813ZM15.8437 2.15657C15.4375 1.75026 14.9552 1.42796 14.4243 1.20807C13.8935 0.988177 13.3246 0.875 12.75 0.875C12.1754 0.875 11.6065 0.988177 11.0756 1.20807C10.5448 1.42796 10.0625 1.75026 9.65624 2.15657L7.30781 4.50422C7.19053 4.6215 7.12465 4.78056 7.12465 4.94641C7.12465 5.11226 7.19053 5.27132 7.30781 5.3886C7.42508 5.50587 7.58414 5.57176 7.74999 5.57176C7.91585 5.57176 8.07491 5.50587 8.19218 5.3886L10.5406 3.04485C11.1288 2.46957 11.9201 2.14947 12.7429 2.154C13.5656 2.15853 14.3534 2.48733 14.9352 3.06905C15.517 3.65076 15.8459 4.43846 15.8506 5.26119C15.8553 6.08392 15.5353 6.8753 14.9601 7.4636L12.6109 9.81203C12.4937 9.92921 12.4277 10.0882 12.4277 10.2539C12.4276 10.4197 12.4934 10.5787 12.6105 10.696C12.7277 10.8133 12.8867 10.8792 13.0525 10.8793C13.2182 10.8794 13.3772 10.8136 13.4945 10.6964L15.8437 8.34406C16.25 7.9378 16.5723 7.45549 16.7922 6.92466C17.0121 6.39383 17.1253 5.82489 17.1253 5.25032C17.1253 4.67574 17.0121 4.1068 16.7922 3.57597C16.5723 3.04514 16.25 2.56283 15.8437 2.15657ZM9.80781 12.6113L7.45937 14.9597C7.17037 15.2552 6.82562 15.4904 6.44508 15.6517C6.06455 15.8131 5.65579 15.8973 5.24247 15.8996C4.82916 15.9019 4.41949 15.8221 4.0372 15.665C3.65492 15.5079 3.3076 15.2765 3.01536 14.9842C2.72312 14.6919 2.49177 14.3445 2.3347 13.9622C2.17763 13.5799 2.09796 13.1702 2.10031 12.7569C2.10266 12.3436 2.18698 11.9348 2.34839 11.5543C2.50979 11.1738 2.74508 10.8291 3.04062 10.5402L5.38827 8.1925C5.50555 8.07523 5.57143 7.91617 5.57143 7.75032C5.57143 7.58446 5.50555 7.4254 5.38827 7.30813C5.271 7.19085 5.11194 7.12497 4.94609 7.12497C4.78024 7.12497 4.62118 7.19085 4.5039 7.30813L2.15624 9.65656C1.33573 10.4771 0.874771 11.5899 0.874771 12.7503C0.874771 13.9107 1.33573 15.0236 2.15624 15.8441C2.97676 16.6646 4.08961 17.1255 5.24999 17.1255C6.41038 17.1255 7.52323 16.6646 8.34374 15.8441L10.6922 13.4948C10.8094 13.3776 10.8751 13.2186 10.8751 13.0528C10.875 12.887 10.8091 12.728 10.6918 12.6109C10.5745 12.4937 10.4155 12.4279 10.2497 12.428C10.0839 12.4281 9.92498 12.494 9.80781 12.6113Z"
                  fill="#343330"
                />
              </svg>

              <h1 class="text-xs">
                Portfolio link: <b>https://stanleynwosu.framer.ai</b>
              </h1>
            </div>
            <div class="flex gap-2 items-center">
              <svg
                width="18"
                height="16"
                viewBox="0 0 18 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.875 3.375H12.75V2.75C12.75 2.25272 12.5525 1.77581 12.2008 1.42417C11.8492 1.07254 11.3723 0.875 10.875 0.875H7.125C6.62772 0.875 6.15081 1.07254 5.79917 1.42417C5.44754 1.77581 5.25 2.25272 5.25 2.75V3.375H2.125C1.79348 3.375 1.47554 3.5067 1.24112 3.74112C1.0067 3.97554 0.875 4.29348 0.875 4.625V14.625C0.875 14.9565 1.0067 15.2745 1.24112 15.5089C1.47554 15.7433 1.79348 15.875 2.125 15.875H15.875C16.2065 15.875 16.5245 15.7433 16.7589 15.5089C16.9933 15.2745 17.125 14.9565 17.125 14.625V4.625C17.125 4.29348 16.9933 3.97554 16.7589 3.74112C16.5245 3.5067 16.2065 3.375 15.875 3.375ZM6.5 2.75C6.5 2.58424 6.56585 2.42527 6.68306 2.30806C6.80027 2.19085 6.95924 2.125 7.125 2.125H10.875C11.0408 2.125 11.1997 2.19085 11.3169 2.30806C11.4342 2.42527 11.5 2.58424 11.5 2.75V3.375H6.5V2.75ZM15.875 4.625V7.87578C13.7655 9.02404 11.4018 9.62543 9 9.625C6.59828 9.62544 4.23471 9.02434 2.125 7.87656V4.625H15.875ZM15.875 14.625H2.125V9.28438C4.26557 10.3314 6.61708 10.8755 9 10.875C11.383 10.8751 13.7344 10.3307 15.875 9.28359V14.625ZM7.125 7.75C7.125 7.58424 7.19085 7.42527 7.30806 7.30806C7.42527 7.19085 7.58424 7.125 7.75 7.125H10.25C10.4158 7.125 10.5747 7.19085 10.6919 7.30806C10.8092 7.42527 10.875 7.58424 10.875 7.75C10.875 7.91576 10.8092 8.07473 10.6919 8.19194C10.5747 8.30915 10.4158 8.375 10.25 8.375H7.75C7.58424 8.375 7.42527 8.30915 7.30806 8.19194C7.19085 8.07473 7.125 7.91576 7.125 7.75Z"
                  fill="#343330"
                />
              </svg>

              <h1 class="text-xs">Applied Jobs: <b>34</b></h1>
            </div>
            <div class="flex gap-2 items-center">
              <svg
                width="20"
                height="14"
                viewBox="0 0 20 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19.3211 6.74688C19.2937 6.68516 18.632 5.21719 17.1609 3.74609C15.2008 1.78594 12.725 0.75 9.99999 0.75C7.27499 0.75 4.79921 1.78594 2.83905 3.74609C1.36796 5.21719 0.703118 6.6875 0.678899 6.74688C0.643362 6.82681 0.625 6.91331 0.625 7.00078C0.625 7.08826 0.643362 7.17476 0.678899 7.25469C0.706243 7.31641 1.36796 8.78359 2.83905 10.2547C4.79921 12.2141 7.27499 13.25 9.99999 13.25C12.725 13.25 15.2008 12.2141 17.1609 10.2547C18.632 8.78359 19.2937 7.31641 19.3211 7.25469C19.3566 7.17476 19.375 7.08826 19.375 7.00078C19.375 6.91331 19.3566 6.82681 19.3211 6.74688ZM9.99999 12C7.5953 12 5.49452 11.1258 3.75546 9.40234C3.0419 8.69273 2.43483 7.88356 1.95312 7C2.4347 6.11636 3.04179 5.30717 3.75546 4.59766C5.49452 2.87422 7.5953 2 9.99999 2C12.4047 2 14.5055 2.87422 16.2445 4.59766C16.9595 5.307 17.5679 6.11619 18.0508 7C17.4875 8.05156 15.0336 12 9.99999 12ZM9.99999 3.25C9.25831 3.25 8.53329 3.46993 7.9166 3.88199C7.29992 4.29404 6.81927 4.87971 6.53544 5.56494C6.25162 6.25016 6.17735 7.00416 6.32205 7.73159C6.46674 8.45902 6.82389 9.1272 7.34834 9.65165C7.87279 10.1761 8.54097 10.5333 9.2684 10.6779C9.99583 10.8226 10.7498 10.7484 11.4351 10.4645C12.1203 10.1807 12.7059 9.70007 13.118 9.08339C13.5301 8.4667 13.75 7.74168 13.75 7C13.749 6.00576 13.3535 5.05253 12.6505 4.34949C11.9475 3.64645 10.9942 3.25103 9.99999 3.25ZM9.99999 9.5C9.50554 9.5 9.02219 9.35338 8.61107 9.07867C8.19994 8.80397 7.87951 8.41352 7.69029 7.95671C7.50107 7.49989 7.45157 6.99723 7.54803 6.51227C7.64449 6.02732 7.88259 5.58186 8.23222 5.23223C8.58186 4.8826 9.02731 4.6445 9.51227 4.54804C9.99722 4.45157 10.4999 4.50108 10.9567 4.6903C11.4135 4.87952 11.804 5.19995 12.0787 5.61107C12.3534 6.0222 12.5 6.50555 12.5 7C12.5 7.66304 12.2366 8.29893 11.7678 8.76777C11.2989 9.23661 10.663 9.5 9.99999 9.5Z"
                  fill="#343330"
                />
              </svg>
              <h1 class="text-xs">Profile views: <b>12</b></h1>
            </div>
          </div>
          <!-- socialmedia links -->
          <div class="space-y-2">
            <div class="flex gap-2 items-center">
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 0.875C7.39303 0.875 5.82214 1.35152 4.486 2.24431C3.14985 3.1371 2.10844 4.40605 1.49348 5.8907C0.87852 7.37535 0.717618 9.00901 1.03112 10.5851C1.34463 12.1612 2.11846 13.6089 3.25476 14.7452C4.39106 15.8815 5.8388 16.6554 7.4149 16.9689C8.99099 17.2824 10.6247 17.1215 12.1093 16.5065C13.594 15.8916 14.8629 14.8502 15.7557 13.514C16.6485 12.1779 17.125 10.607 17.125 9C17.1227 6.84581 16.266 4.78051 14.7427 3.25727C13.2195 1.73403 11.1542 0.877275 9 0.875ZM9.625 15.8461V10.875H11.5C11.6658 10.875 11.8247 10.8092 11.9419 10.6919C12.0592 10.5747 12.125 10.4158 12.125 10.25C12.125 10.0842 12.0592 9.92527 11.9419 9.80806C11.8247 9.69085 11.6658 9.625 11.5 9.625H9.625V7.75C9.625 7.41848 9.7567 7.10054 9.99112 6.86612C10.2255 6.6317 10.5435 6.5 10.875 6.5H12.125C12.2908 6.5 12.4497 6.43415 12.5669 6.31694C12.6842 6.19973 12.75 6.04076 12.75 5.875C12.75 5.70924 12.6842 5.55027 12.5669 5.43306C12.4497 5.31585 12.2908 5.25 12.125 5.25H10.875C10.212 5.25 9.57608 5.51339 9.10724 5.98223C8.6384 6.45107 8.375 7.08696 8.375 7.75V9.625H6.5C6.33424 9.625 6.17527 9.69085 6.05806 9.80806C5.94085 9.92527 5.875 10.0842 5.875 10.25C5.875 10.4158 5.94085 10.5747 6.05806 10.6919C6.17527 10.8092 6.33424 10.875 6.5 10.875H8.375V15.8461C6.61312 15.6853 4.98107 14.8514 3.81831 13.5179C2.65556 12.1845 2.05162 10.4541 2.13212 8.68674C2.21263 6.91936 2.97137 5.25106 4.25053 4.02883C5.52969 2.80661 7.2308 2.12456 9 2.12456C10.7692 2.12456 12.4703 2.80661 13.7495 4.02883C15.0286 5.25106 15.7874 6.91936 15.8679 8.68674C15.9484 10.4541 15.3444 12.1845 14.1817 13.5179C13.0189 14.8514 11.3869 15.6853 9.625 15.8461Z"
                  fill="#343330"
                />
              </svg>
              <h1 class="text-xs">
                Facebook: <b>https://www.facebook.com/example</b>
              </h1>
            </div>
            <div class="flex gap-2 items-center">
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.875 0.875H2.125C1.79348 0.875 1.47554 1.0067 1.24112 1.24112C1.0067 1.47554 0.875 1.79348 0.875 2.125V15.875C0.875 16.2065 1.0067 16.5245 1.24112 16.7589C1.47554 16.9933 1.79348 17.125 2.125 17.125H15.875C16.2065 17.125 16.5245 16.9933 16.7589 16.7589C16.9933 16.5245 17.125 16.2065 17.125 15.875V2.125C17.125 1.79348 16.9933 1.47554 16.7589 1.24112C16.5245 1.0067 16.2065 0.875 15.875 0.875ZM15.875 15.875H2.125V2.125H15.875V15.875ZM6.5 7.75V12.75C6.5 12.9158 6.43415 13.0747 6.31694 13.1919C6.19973 13.3092 6.04076 13.375 5.875 13.375C5.70924 13.375 5.55027 13.3092 5.43306 13.1919C5.31585 13.0747 5.25 12.9158 5.25 12.75V7.75C5.25 7.58424 5.31585 7.42527 5.43306 7.30806C5.55027 7.19085 5.70924 7.125 5.875 7.125C6.04076 7.125 6.19973 7.19085 6.31694 7.30806C6.43415 7.42527 6.5 7.58424 6.5 7.75ZM13.375 9.9375V12.75C13.375 12.9158 13.3092 13.0747 13.1919 13.1919C13.0747 13.3092 12.9158 13.375 12.75 13.375C12.5842 13.375 12.4253 13.3092 12.3081 13.1919C12.1908 13.0747 12.125 12.9158 12.125 12.75V9.9375C12.125 9.5231 11.9604 9.12567 11.6674 8.83265C11.3743 8.53962 10.9769 8.375 10.5625 8.375C10.1481 8.375 9.75067 8.53962 9.45765 8.83265C9.16462 9.12567 9 9.5231 9 9.9375V12.75C9 12.9158 8.93415 13.0747 8.81694 13.1919C8.69973 13.3092 8.54076 13.375 8.375 13.375C8.20924 13.375 8.05027 13.3092 7.93306 13.1919C7.81585 13.0747 7.75 12.9158 7.75 12.75V7.75C7.75078 7.59691 7.80771 7.44943 7.91001 7.33553C8.01231 7.22164 8.15285 7.14925 8.30498 7.1321C8.45711 7.11495 8.61024 7.15423 8.73533 7.2425C8.86041 7.33076 8.94876 7.46186 8.98359 7.61094C9.4064 7.32412 9.89934 7.15789 10.4095 7.13009C10.9196 7.1023 11.4277 7.21399 11.8792 7.45317C12.3306 7.69236 12.7084 8.05 12.972 8.48769C13.2355 8.92538 13.3748 9.42659 13.375 9.9375ZM6.8125 5.5625C6.8125 5.74792 6.75752 5.92918 6.6545 6.08335C6.55149 6.23752 6.40507 6.35768 6.23377 6.42864C6.06246 6.49959 5.87396 6.51816 5.6921 6.48199C5.51025 6.44581 5.3432 6.35652 5.21209 6.22541C5.08098 6.0943 4.99169 5.92725 4.95551 5.7454C4.91934 5.56354 4.93791 5.37504 5.00886 5.20373C5.07982 5.03243 5.19998 4.88601 5.35415 4.783C5.50832 4.67998 5.68958 4.625 5.875 4.625C6.12364 4.625 6.3621 4.72377 6.53791 4.89959C6.71373 5.0754 6.8125 5.31386 6.8125 5.5625Z"
                  fill="#343330"
                />
              </svg>
              <h1 class="text-xs">
                Linkedin: <b>http://www.linkedin.com/in/stanleynw</b>
              </h1>
            </div>
            <div class="flex gap-2 items-center">
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 5.25C8.25832 5.25 7.5333 5.46993 6.91661 5.88199C6.29993 6.29404 5.81928 6.87971 5.53545 7.56494C5.25162 8.25016 5.17736 9.00416 5.32206 9.73159C5.46675 10.459 5.8239 11.1272 6.34835 11.6517C6.8728 12.1761 7.54098 12.5333 8.26841 12.6779C8.99584 12.8226 9.74984 12.7484 10.4351 12.4645C11.1203 12.1807 11.706 11.7001 12.118 11.0834C12.5301 10.4667 12.75 9.74168 12.75 9C12.749 8.00576 12.3535 7.05253 11.6505 6.34949C10.9475 5.64645 9.99424 5.25103 9 5.25ZM9 11.5C8.50555 11.5 8.0222 11.3534 7.61107 11.0787C7.19995 10.804 6.87952 10.4135 6.6903 9.95671C6.50108 9.49989 6.45157 8.99723 6.54804 8.51227C6.6445 8.02732 6.8826 7.58186 7.23223 7.23223C7.58186 6.8826 8.02732 6.6445 8.51227 6.54804C8.99723 6.45157 9.49989 6.50108 9.95671 6.6903C10.4135 6.87952 10.804 7.19995 11.0787 7.61107C11.3534 8.0222 11.5 8.50555 11.5 9C11.5 9.66304 11.2366 10.2989 10.7678 10.7678C10.2989 11.2366 9.66304 11.5 9 11.5ZM12.75 0.875H5.25C4.09006 0.876241 2.97798 1.33758 2.15778 2.15778C1.33758 2.97798 0.876241 4.09006 0.875 5.25V12.75C0.876241 13.9099 1.33758 15.022 2.15778 15.8422C2.97798 16.6624 4.09006 17.1238 5.25 17.125H12.75C13.9099 17.1238 15.022 16.6624 15.8422 15.8422C16.6624 15.022 17.1238 13.9099 17.125 12.75V5.25C17.1238 4.09006 16.6624 2.97798 15.8422 2.15778C15.022 1.33758 13.9099 0.876241 12.75 0.875ZM15.875 12.75C15.875 13.5788 15.5458 14.3737 14.9597 14.9597C14.3737 15.5458 13.5788 15.875 12.75 15.875H5.25C4.4212 15.875 3.62634 15.5458 3.04029 14.9597C2.45424 14.3737 2.125 13.5788 2.125 12.75V5.25C2.125 4.4212 2.45424 3.62634 3.04029 3.04029C3.62634 2.45424 4.4212 2.125 5.25 2.125H12.75C13.5788 2.125 14.3737 2.45424 14.9597 3.04029C15.5458 3.62634 15.875 4.4212 15.875 5.25V12.75ZM14 4.9375C14 5.12292 13.945 5.30418 13.842 5.45835C13.739 5.61252 13.5926 5.73268 13.4213 5.80364C13.25 5.87459 13.0615 5.89316 12.8796 5.85699C12.6977 5.82081 12.5307 5.73152 12.3996 5.60041C12.2685 5.4693 12.1792 5.30225 12.143 5.1204C12.1068 4.93854 12.1254 4.75004 12.1964 4.57873C12.2673 4.40743 12.3875 4.26101 12.5417 4.158C12.6958 4.05498 12.8771 4 13.0625 4C13.3111 4 13.5496 4.09877 13.7254 4.27459C13.9012 4.4504 14 4.68886 14 4.9375Z"
                  fill="#343330"
                />
              </svg>
              <h1 class="text-xs">
                Instagram: <b>http://www.instagram.com/ </b>
              </h1>
            </div>
          </div>
          <!-- btn -->
          <div class="space-y-3 pt-4 md:pt-0">
            <div class="flex md:justify-end">
              <button class="text-info-600 font-black text-xs">
                Premium user
              </button>
            </div>

            <div class="space-y-3">
              <div class="space-x-2 flex items-center">
                <svg
                  width="12"
                  height="19"
                  viewBox="0 0 12 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.875 8.875H6.625V3.875H7.25C7.91304 3.875 8.54893 4.13839 9.01777 4.60723C9.48661 5.07607 9.75 5.71196 9.75 6.375C9.75 6.54076 9.81585 6.69973 9.93306 6.81694C10.0503 6.93415 10.2092 7 10.375 7C10.5408 7 10.6997 6.93415 10.8169 6.81694C10.9342 6.69973 11 6.54076 11 6.375C10.999 5.38076 10.6035 4.42753 9.90051 3.72449C9.19747 3.02145 8.24424 2.62603 7.25 2.625H6.625V1.375C6.625 1.20924 6.55915 1.05027 6.44194 0.933058C6.32473 0.815848 6.16576 0.75 6 0.75C5.83424 0.75 5.67527 0.815848 5.55806 0.933058C5.44085 1.05027 5.375 1.20924 5.375 1.375V2.625H4.75C3.75544 2.625 2.80161 3.02009 2.09835 3.72335C1.39509 4.42661 1 5.38044 1 6.375C1 7.36956 1.39509 8.32339 2.09835 9.02665C2.80161 9.72991 3.75544 10.125 4.75 10.125H5.375V15.125H4.125C3.46196 15.125 2.82607 14.8616 2.35723 14.3928C1.88839 13.9239 1.625 13.288 1.625 12.625C1.625 12.4592 1.55915 12.3003 1.44194 12.1831C1.32473 12.0658 1.16576 12 1 12C0.83424 12 0.675269 12.0658 0.558058 12.1831C0.440848 12.3003 0.375 12.4592 0.375 12.625C0.376034 13.6192 0.771454 14.5725 1.47449 15.2755C2.17753 15.9785 3.13076 16.374 4.125 16.375H5.375V17.625C5.375 17.7908 5.44085 17.9497 5.55806 18.0669C5.67527 18.1842 5.83424 18.25 6 18.25C6.16576 18.25 6.32473 18.1842 6.44194 18.0669C6.55915 17.9497 6.625 17.7908 6.625 17.625V16.375H7.875C8.86956 16.375 9.82339 15.9799 10.5267 15.2767C11.2299 14.5734 11.625 13.6196 11.625 12.625C11.625 11.6304 11.2299 10.6766 10.5267 9.97335C9.82339 9.27009 8.86956 8.875 7.875 8.875ZM4.75 8.875C4.08696 8.875 3.45107 8.61161 2.98223 8.14277C2.51339 7.67393 2.25 7.03804 2.25 6.375C2.25 5.71196 2.51339 5.07607 2.98223 4.60723C3.45107 4.13839 4.08696 3.875 4.75 3.875H5.375V8.875H4.75ZM7.875 15.125H6.625V10.125H7.875C8.53804 10.125 9.17393 10.3884 9.64277 10.8572C10.1116 11.3261 10.375 11.962 10.375 12.625C10.375 13.288 10.1116 13.9239 9.64277 14.3928C9.17393 14.8616 8.53804 15.125 7.875 15.125Z"
                    fill="#343330"
                  />
                </svg>
                <h1 class="md:text-lg text-sm font-black">$5,000/month</h1>
              </div>

              <nuxt-link to="/dashboard/jobseeker/my-profile/edit">
                <div class="flex justify-end">
                  <button
                    class="md:px-[14px] w-full my-4 text-xs md:py-2 py-3 rounded-5 bg-primary-1 text-white"
                  >
                    Edit profile info
                  </button>
                </div>
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="flex flex-col md:flex-row gap-4">
      <!-- cards -->
      <div class="p-4 bg-white rounded-10 w-full my-4">
        <div class="space-y-4 pt-4">
          <h1 class="text-xl font-black">About me</h1>
          <p class="text-xs tracking-wider">
            Lorem ipsum dolor sit amet consectetur. Dignissim aliquam vitae
            accumsan eget nisl felis magna rhoncus. Nisl duis netus id lobortis
            nec dui leo. Ornare scelerisque vivamus egestas adipiscing in amet
            varius. Velit in nec dolor ultrices scelerisque. Ipsum facilisi
            nulla sed sed proin pulvinar. Libero sed donec lorem blandit aliquam
            diam. Egestas et amet elit a nulla rhoncus sagittis in sem. Lectus
            ut vivamus id at vitae. Elit non ut eget massa id lorem tincidunt
            porttitor. Viverra duis sit a dignissim molestie placerat. Tempus
            velit interdum fames pellentesque.
          </p>
        </div>
        <div class="space-y-4 pt-10">
          <h1 class="text-xl font-black">Experience</h1>
          <div class="bg-westside-50 space-y-4 rounded-10 p-4">
            <img src="/assets/images/Logo2.png" alt="no image yet" />
            <h1 class="text-info-600 font-black text-sm">
              User Interface Designer at Workonnect
            </h1>
            <div class="flex gap-2">
              <h1 class="text-xs font-black">May - June 2020</h1>
              <h1 class="text-xs">Lagos, Nigeria.</h1>
            </div>
            <p class="text-xs tracking-wider">
              Lorem ipsum dolor sit amet consectetur. Dignissim aliquam vitae
              accumsan eget nisl felis magna rhoncus. Nisl duis netus id
              lobortis nec dui leo. Ornare scelerisque vivamus egestas
              adipiscing in amet varius. Velit in nec dolor ultrices
              scelerisque. Ipsum facilisi nulla sed sed proin pulvinar. Libero
              sed donec lorem blandit aliquam diam. Egestas et amet elit a nulla
              rhoncus sagittis in sem. Lectus ut vivamus id at vitae. Elit non
              ut eget massa id lorem tincidunt porttitor. Viverra duis sit a
              dignissim molestie placerat. Tempus velit interdum fames
              pellentesque.
            </p>
            <p class="text-xs tracking-wider">
              Lorem ipsum dolor sit amet consectetur. Dignissim aliquam vitae
              accumsan eget nisl felis magna rhoncus. Nisl duis netus id
              lobortis nec dui leo. Ornare scelerisque vivamus egestas
              adipiscing in amet varius. Velit in nec dolor ultrices
              scelerisque. Ipsum facilisi nulla sed sed proin pulvinar. Libero
              sed donec lorem blandit aliquam diam. Egestas et amet elit a nulla
              rhoncus sagittis in sem. Lectus ut vivamus id at vitae. Elit non
              ut eget massa id lorem tincidunt porttitor. Viverra duis sit a
              dignissim molestie placerat. Tempus velit interdum fames
              pellentesque.
            </p>
          </div>
          <div class="bg-westside-50 space-y-4 rounded-10 p-4">
            <img src="/assets/images/ms.png" alt="no image yet" />
            <h1 class="text-info-600 font-black text-sm">
              User Interface Designer at Workonnect
            </h1>
            <div class="flex gap-2">
              <h1 class="text-xs font-black">May - June 2020</h1>
              <h1 class="text-xs">Lagos, Nigeria.</h1>
            </div>
            <p class="text-xs tracking-wider">
              Lorem ipsum dolor sit amet consectetur. Dignissim aliquam vitae
              accumsan eget nisl felis magna rhoncus. Nisl duis netus id
              lobortis nec dui leo. Ornare scelerisque vivamus egestas
              adipiscing in amet varius. Velit in nec dolor ultrices
              scelerisque. Ipsum facilisi nulla sed sed proin pulvinar. Libero
              sed donec lorem blandit aliquam diam. Egestas et amet elit a nulla
              rhoncus sagittis in sem. Lectus ut vivamus id at vitae. Elit non
              ut eget massa id lorem tincidunt porttitor. Viverra duis sit a
              dignissim molestie placerat. Tempus velit interdum fames
              pellentesque.
            </p>
            <p class="text-xs tracking-wider">
              Lorem ipsum dolor sit amet consectetur. Dignissim aliquam vitae
              accumsan eget nisl felis magna rhoncus. Nisl duis netus id
              lobortis nec dui leo. Ornare scelerisque vivamus egestas
              adipiscing in amet varius. Velit in nec dolor ultrices
              scelerisque. Ipsum facilisi nulla sed sed proin pulvinar. Libero
              sed donec lorem blandit aliquam diam. Egestas et amet elit a nulla
              rhoncus sagittis in sem. Lectus ut vivamus id at vitae. Elit non
              ut eget massa id lorem tincidunt porttitor. Viverra duis sit a
              dignissim molestie placerat. Tempus velit interdum fames
              pellentesque.
            </p>
          </div>
          <div class="bg-westside-50 space-y-4 rounded-10 p-4">
            <img src="/assets/images/ms.png" alt="no image yet" />
            <h1 class="text-info-600 font-black text-sm">
              User Interface Designer at Workonnect
            </h1>
            <div class="flex gap-2">
              <h1 class="text-xs font-black">May - June 2020</h1>
              <h1 class="text-xs">Lagos, Nigeria.</h1>
            </div>
            <p class="text-xs tracking-wider">
              Lorem ipsum dolor sit amet consectetur. Dignissim aliquam vitae
              accumsan eget nisl felis magna rhoncus. Nisl duis netus id
              lobortis nec dui leo. Ornare scelerisque vivamus egestas
              adipiscing in amet varius. Velit in nec dolor ultrices
              scelerisque. Ipsum facilisi nulla sed sed proin pulvinar. Libero
              sed donec lorem blandit aliquam diam. Egestas et amet elit a nulla
              rhoncus sagittis in sem. Lectus ut vivamus id at vitae. Elit non
              ut eget massa id lorem tincidunt porttitor. Viverra duis sit a
              dignissim molestie placerat. Tempus velit interdum fames
              pellentesque.
            </p>
            <p class="text-xs tracking-wider">
              Lorem ipsum dolor sit amet consectetur. Dignissim aliquam vitae
              accumsan eget nisl felis magna rhoncus. Nisl duis netus id
              lobortis nec dui leo. Ornare scelerisque vivamus egestas
              adipiscing in amet varius. Velit in nec dolor ultrices
              scelerisque. Ipsum facilisi nulla sed sed proin pulvinar. Libero
              sed donec lorem blandit aliquam diam. Egestas et amet elit a nulla
              rhoncus sagittis in sem. Lectus ut vivamus id at vitae. Elit non
              ut eget massa id lorem tincidunt porttitor. Viverra duis sit a
              dignissim molestie placerat. Tempus velit interdum fames
              pellentesque.
            </p>
          </div>
        </div>
      </div>

      <!--  -->
      <div class="p-4 bg-white rounded-10 my-4 md:w-[670px] w-full h-full">
        <div class="space-y-6">
          <h1 class="text-xl font-black">Uploaded Documents</h1>
          <div class="flex justify-between">
            <div class="flex items-start gap-x-2">
              <svg
                width="18"
                height="20"
                viewBox="0 0 18 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.0306 5.71938L11.7806 0.469375C11.7109 0.399749 11.6282 0.344539 11.5371 0.306898C11.4461 0.269257 11.3485 0.249923 11.25 0.25H2.25C1.85218 0.25 1.47064 0.408035 1.18934 0.68934C0.908035 0.970645 0.75 1.35218 0.75 1.75V18.25C0.75 18.6478 0.908035 19.0294 1.18934 19.3107C1.47064 19.592 1.85218 19.75 2.25 19.75H15.75C16.1478 19.75 16.5294 19.592 16.8107 19.3107C17.092 19.0294 17.25 18.6478 17.25 18.25V6.25C17.2501 6.15148 17.2307 6.05391 17.1931 5.96286C17.1555 5.87182 17.1003 5.78908 17.0306 5.71938ZM12 2.81031L14.6897 5.5H12V2.81031ZM15.75 18.25H2.25V1.75H10.5V6.25C10.5 6.44891 10.579 6.63968 10.7197 6.78033C10.8603 6.92098 11.0511 7 11.25 7H15.75V18.25Z"
                  fill="#343330"
                />
              </svg>
              <div>
                <h1 class="text-xs">Resume/CV</h1>
                <p class="text-xs text-info-600">Document Name.pdf</p>
              </div>
            </div>

            <button
              class="px-[14px] text-xs py-2 text-primary-1 rounded-10 border border-primary-1"
            >
              Change
            </button>
          </div>
          <div class="flex justify-between">
            <div class="flex items-start gap-x-2">
              <svg
                width="18"
                height="20"
                viewBox="0 0 18 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.0306 5.71938L11.7806 0.469375C11.7109 0.399749 11.6282 0.344539 11.5371 0.306898C11.4461 0.269257 11.3485 0.249923 11.25 0.25H2.25C1.85218 0.25 1.47064 0.408035 1.18934 0.68934C0.908035 0.970645 0.75 1.35218 0.75 1.75V18.25C0.75 18.6478 0.908035 19.0294 1.18934 19.3107C1.47064 19.592 1.85218 19.75 2.25 19.75H15.75C16.1478 19.75 16.5294 19.592 16.8107 19.3107C17.092 19.0294 17.25 18.6478 17.25 18.25V6.25C17.2501 6.15148 17.2307 6.05391 17.1931 5.96286C17.1555 5.87182 17.1003 5.78908 17.0306 5.71938ZM12 2.81031L14.6897 5.5H12V2.81031ZM15.75 18.25H2.25V1.75H10.5V6.25C10.5 6.44891 10.579 6.63968 10.7197 6.78033C10.8603 6.92098 11.0511 7 11.25 7H15.75V18.25Z"
                  fill="#343330"
                />
              </svg>
              <div>
                <h1 class="text-xs">Resume/CV</h1>
                <p class="text-xs text-info-600">Document Name.pdf</p>
              </div>
            </div>

            <button
              class="px-[14px] text-xs py-2 text-primary-1 rounded-10 border border-primary-1"
            >
              Change
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
