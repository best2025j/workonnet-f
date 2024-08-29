<script setup lang="ts">
definePageMeta({
  name: "Track Application",
  title: "My Applications",
  pageName: "dashboard.my-applications",
  layout: "dashboard",
});
</script>

<template>
  <div class="flex gap-4 text-black-600">
    <div class="">
      <div class="flex space-x-4 items-center">
        <img src="/assets/images/ms.png" alt="ms image" />
        <div>
          <h1 class="font-black">Social Media Assistant</h1>
          <h6>Microsoft</h6>
        </div>
      </div>
      <!--  -->
      <div class="bg-white mt-4 rounded-10 py-8 px-8">
        <h1 class="font-black">Application Tracking</h1>

        <!-- checks that are disable -->
        <!-- <div
          class="flex flex-col items-center w-10 space-y-1 rounded-10 bg-westside-50 py-4"
        >
        <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 0.25C8.07164 0.25 6.18657 0.821828 4.58319 1.89317C2.97982 2.96451 1.73013 4.48726 0.992179 6.26884C0.254225 8.05042 0.061142 10.0108 0.437348 11.9021C0.813554 13.7934 1.74215 15.5307 3.10571 16.8943C4.46928 18.2579 6.20656 19.1865 8.09787 19.5627C9.98919 19.9389 11.9496 19.7458 13.7312 19.0078C15.5127 18.2699 17.0355 17.0202 18.1068 15.4168C19.1782 13.8134 19.75 11.9284 19.75 10C19.7473 7.41498 18.7192 4.93661 16.8913 3.10872C15.0634 1.28084 12.585 0.25273 10 0.25ZM14.2806 8.28063L9.03063 13.5306C8.96097 13.6004 8.87826 13.6557 8.78721 13.6934C8.69616 13.7312 8.59857 13.7506 8.5 13.7506C8.40144 13.7506 8.30385 13.7312 8.2128 13.6934C8.12175 13.6557 8.03903 13.6004 7.96938 13.5306L5.71938 11.2806C5.57865 11.1399 5.49959 10.949 5.49959 10.75C5.49959 10.551 5.57865 10.3601 5.71938 10.2194C5.86011 10.0786 6.05098 9.99958 6.25 9.99958C6.44903 9.99958 6.6399 10.0786 6.78063 10.2194L8.5 11.9397L13.2194 7.21937C13.2891 7.14969 13.3718 7.09442 13.4628 7.0567C13.5539 7.01899 13.6515 6.99958 13.75 6.99958C13.8486 6.99958 13.9461 7.01899 14.0372 7.0567C14.1282 7.09442 14.2109 7.14969 14.2806 7.21937C14.3503 7.28906 14.4056 7.37178 14.4433 7.46283C14.481 7.55387 14.5004 7.65145 14.5004 7.75C14.5004 7.84855 14.481 7.94613 14.4433 8.03717C14.4056 8.12822 14.3503 8.21094 14.2806 8.28063Z"
              fill="#0FA968"
            />
          </svg>

          <span
            ><svg
              width="2"
              height="80"
              viewBox="0 0 2 80"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line
                x1="1"
                y1="79"
                x2="1"
                y2="1"
                stroke="#0FA968"
                stroke-width="2"
                stroke-linecap="round"
                stroke-dasharray="4 4"
              />
            </svg>
          </span>

          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 0.25C8.07164 0.25 6.18657 0.821828 4.58319 1.89317C2.97982 2.96451 1.73013 4.48726 0.992179 6.26884C0.254225 8.05042 0.061142 10.0108 0.437348 11.9021C0.813554 13.7934 1.74215 15.5307 3.10571 16.8943C4.46928 18.2579 6.20656 19.1865 8.09787 19.5627C9.98919 19.9389 11.9496 19.7458 13.7312 19.0078C15.5127 18.2699 17.0355 17.0202 18.1068 15.4168C19.1782 13.8134 19.75 11.9284 19.75 10C19.7473 7.41498 18.7192 4.93661 16.8913 3.10872C15.0634 1.28084 12.585 0.25273 10 0.25ZM13.75 10.75H6.25C6.05109 10.75 5.86033 10.671 5.71967 10.5303C5.57902 10.3897 5.5 10.1989 5.5 10C5.5 9.80109 5.57902 9.61032 5.71967 9.46967C5.86033 9.32902 6.05109 9.25 6.25 9.25H13.75C13.9489 9.25 14.1397 9.32902 14.2803 9.46967C14.421 9.61032 14.5 9.80109 14.5 10C14.5 10.1989 14.421 10.3897 14.2803 10.5303C14.1397 10.671 13.9489 10.75 13.75 10.75Z"
              fill="#006EFF"
            />
          </svg>

          <svg
            width="2"
            height="80"
            viewBox="0 0 2 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line
              x1="1"
              y1="79"
              x2="1"
              y2="1"
              stroke="#B0B0B0"
              stroke-width="2"
              stroke-linecap="round"
              stroke-dasharray="4 4"
            />
          </svg>

          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 0.25C8.07164 0.25 6.18657 0.821828 4.58319 1.89317C2.97982 2.96451 1.73013 4.48726 0.992179 6.26884C0.254225 8.05042 0.061142 10.0108 0.437348 11.9021C0.813554 13.7934 1.74215 15.5307 3.10571 16.8943C4.46928 18.2579 6.20656 19.1865 8.09787 19.5627C9.98919 19.9389 11.9496 19.7458 13.7312 19.0078C15.5127 18.2699 17.0355 17.0202 18.1068 15.4168C19.1782 13.8134 19.75 11.9284 19.75 10C19.7473 7.41498 18.7192 4.93661 16.8913 3.10872C15.0634 1.28084 12.585 0.25273 10 0.25ZM13.75 10.75H6.25C6.05109 10.75 5.86033 10.671 5.71967 10.5303C5.57902 10.3897 5.5 10.1989 5.5 10C5.5 9.80109 5.57902 9.61032 5.71967 9.46967C5.86033 9.32902 6.05109 9.25 6.25 9.25H13.75C13.9489 9.25 14.1397 9.32902 14.2803 9.46967C14.421 9.61032 14.5 9.80109 14.5 10C14.5 10.1989 14.421 10.3897 14.2803 10.5303C14.1397 10.671 13.9489 10.75 13.75 10.75Z"
              fill="#B0B0B0"
            />
          </svg>

          <svg
            width="2"
            height="80"
            viewBox="0 0 2 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line
              x1="1"
              y1="79"
              x2="1"
              y2="1"
              stroke="#B0B0B0"
              stroke-width="2"
              stroke-linecap="round"
              stroke-dasharray="4 4"
            />
          </svg>

          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 0.25C8.07164 0.25 6.18657 0.821828 4.58319 1.89317C2.97982 2.96451 1.73013 4.48726 0.992179 6.26884C0.254225 8.05042 0.061142 10.0108 0.437348 11.9021C0.813554 13.7934 1.74215 15.5307 3.10571 16.8943C4.46928 18.2579 6.20656 19.1865 8.09787 19.5627C9.98919 19.9389 11.9496 19.7458 13.7312 19.0078C15.5127 18.2699 17.0355 17.0202 18.1068 15.4168C19.1782 13.8134 19.75 11.9284 19.75 10C19.7473 7.41498 18.7192 4.93661 16.8913 3.10872C15.0634 1.28084 12.585 0.25273 10 0.25ZM13.75 10.75H6.25C6.05109 10.75 5.86033 10.671 5.71967 10.5303C5.57902 10.3897 5.5 10.1989 5.5 10C5.5 9.80109 5.57902 9.61032 5.71967 9.46967C5.86033 9.32902 6.05109 9.25 6.25 9.25H13.75C13.9489 9.25 14.1397 9.32902 14.2803 9.46967C14.421 9.61032 14.5 9.80109 14.5 10C14.5 10.1989 14.421 10.3897 14.2803 10.5303C14.1397 10.671 13.9489 10.75 13.75 10.75Z"
              fill="#B0B0B0"
            />
          </svg>

          <svg
            width="2"
            height="80"
            viewBox="0 0 2 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line
              x1="1"
              y1="79"
              x2="1"
              y2="1"
              stroke="#B0B0B0"
              stroke-width="2"
              stroke-linecap="round"
              stroke-dasharray="4 4"
            />
          </svg>

          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 0.25C8.07164 0.25 6.18657 0.821828 4.58319 1.89317C2.97982 2.96451 1.73013 4.48726 0.992179 6.26884C0.254225 8.05042 0.061142 10.0108 0.437348 11.9021C0.813554 13.7934 1.74215 15.5307 3.10571 16.8943C4.46928 18.2579 6.20656 19.1865 8.09787 19.5627C9.98919 19.9389 11.9496 19.7458 13.7312 19.0078C15.5127 18.2699 17.0355 17.0202 18.1068 15.4168C19.1782 13.8134 19.75 11.9284 19.75 10C19.7473 7.41498 18.7192 4.93661 16.8913 3.10872C15.0634 1.28084 12.585 0.25273 10 0.25ZM13.75 10.75H6.25C6.05109 10.75 5.86033 10.671 5.71967 10.5303C5.57902 10.3897 5.5 10.1989 5.5 10C5.5 9.80109 5.57902 9.61032 5.71967 9.46967C5.86033 9.32902 6.05109 9.25 6.25 9.25H13.75C13.9489 9.25 14.1397 9.32902 14.2803 9.46967C14.421 9.61032 14.5 9.80109 14.5 10C14.5 10.1989 14.421 10.3897 14.2803 10.5303C14.1397 10.671 13.9489 10.75 13.75 10.75Z"
              fill="#B0B0B0"
            />
          </svg>
        </div> -->

        <!--  -->
        <div class="flex gap-4 items-start py-6">
          <div
            class="flex flex-col items-center w-10 space-y-1 rounded-20 bg-westside-50 py-4"
          >
            <!-- active checkbox -->
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 0.25C8.07164 0.25 6.18657 0.821828 4.58319 1.89317C2.97982 2.96451 1.73013 4.48726 0.992179 6.26884C0.254225 8.05042 0.061142 10.0108 0.437348 11.9021C0.813554 13.7934 1.74215 15.5307 3.10571 16.8943C4.46928 18.2579 6.20656 19.1865 8.09787 19.5627C9.98919 19.9389 11.9496 19.7458 13.7312 19.0078C15.5127 18.2699 17.0355 17.0202 18.1068 15.4168C19.1782 13.8134 19.75 11.9284 19.75 10C19.7473 7.41498 18.7192 4.93661 16.8913 3.10872C15.0634 1.28084 12.585 0.25273 10 0.25ZM14.2806 8.28063L9.03063 13.5306C8.96097 13.6004 8.87826 13.6557 8.78721 13.6934C8.69616 13.7312 8.59857 13.7506 8.5 13.7506C8.40144 13.7506 8.30385 13.7312 8.2128 13.6934C8.12175 13.6557 8.03903 13.6004 7.96938 13.5306L5.71938 11.2806C5.57865 11.1399 5.49959 10.949 5.49959 10.75C5.49959 10.551 5.57865 10.3601 5.71938 10.2194C5.86011 10.0786 6.05098 9.99958 6.25 9.99958C6.44903 9.99958 6.6399 10.0786 6.78063 10.2194L8.5 11.9397L13.2194 7.21937C13.2891 7.14969 13.3718 7.09442 13.4628 7.0567C13.5539 7.01899 13.6515 6.99958 13.75 6.99958C13.8486 6.99958 13.9461 7.01899 14.0372 7.0567C14.1282 7.09442 14.2109 7.14969 14.2806 7.21937C14.3503 7.28906 14.4056 7.37178 14.4433 7.46283C14.481 7.55387 14.5004 7.65145 14.5004 7.75C14.5004 7.84855 14.481 7.94613 14.4433 8.03717C14.4056 8.12822 14.3503 8.21094 14.2806 8.28063Z"
                fill="#0FA968"
              />
            </svg>

            <span
              ><svg
                width="2"
                height="80"
                viewBox="0 0 2 80"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line
                  x1="1"
                  y1="79"
                  x2="1"
                  y2="1"
                  stroke="#0FA968"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-dasharray="4 4"
                />
              </svg>
            </span>

            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 0.25C8.07164 0.25 6.18657 0.821828 4.58319 1.89317C2.97982 2.96451 1.73013 4.48726 0.992179 6.26884C0.254225 8.05042 0.061142 10.0108 0.437348 11.9021C0.813554 13.7934 1.74215 15.5307 3.10571 16.8943C4.46928 18.2579 6.20656 19.1865 8.09787 19.5627C9.98919 19.9389 11.9496 19.7458 13.7312 19.0078C15.5127 18.2699 17.0355 17.0202 18.1068 15.4168C19.1782 13.8134 19.75 11.9284 19.75 10C19.7473 7.41498 18.7192 4.93661 16.8913 3.10872C15.0634 1.28084 12.585 0.25273 10 0.25ZM14.2806 8.28063L9.03063 13.5306C8.96097 13.6004 8.87826 13.6557 8.78721 13.6934C8.69616 13.7312 8.59857 13.7506 8.5 13.7506C8.40144 13.7506 8.30385 13.7312 8.2128 13.6934C8.12175 13.6557 8.03903 13.6004 7.96938 13.5306L5.71938 11.2806C5.57865 11.1399 5.49959 10.949 5.49959 10.75C5.49959 10.551 5.57865 10.3601 5.71938 10.2194C5.86011 10.0786 6.05098 9.99958 6.25 9.99958C6.44903 9.99958 6.6399 10.0786 6.78063 10.2194L8.5 11.9397L13.2194 7.21937C13.2891 7.14969 13.3718 7.09442 13.4628 7.0567C13.5539 7.01899 13.6515 6.99958 13.75 6.99958C13.8486 6.99958 13.9461 7.01899 14.0372 7.0567C14.1282 7.09442 14.2109 7.14969 14.2806 7.21937C14.3503 7.28906 14.4056 7.37178 14.4433 7.46283C14.481 7.55387 14.5004 7.65145 14.5004 7.75C14.5004 7.84855 14.481 7.94613 14.4433 8.03717C14.4056 8.12822 14.3503 8.21094 14.2806 8.28063Z"
                fill="#0FA968"
              />
            </svg>

            <svg
              width="2"
              height="80"
              viewBox="0 0 2 80"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line
                x1="1"
                y1="79"
                x2="1"
                y2="1"
                stroke="#006EFF"
                stroke-width="2"
                stroke-linecap="round"
                stroke-dasharray="4 4"
              />
            </svg>

            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 0.25C8.07164 0.25 6.18657 0.821828 4.58319 1.89317C2.97982 2.96451 1.73013 4.48726 0.992179 6.26884C0.254225 8.05042 0.061142 10.0108 0.437348 11.9021C0.813554 13.7934 1.74215 15.5307 3.10571 16.8943C4.46928 18.2579 6.20656 19.1865 8.09787 19.5627C9.98919 19.9389 11.9496 19.7458 13.7312 19.0078C15.5127 18.2699 17.0355 17.0202 18.1068 15.4168C19.1782 13.8134 19.75 11.9284 19.75 10C19.7473 7.41498 18.7192 4.93661 16.8913 3.10872C15.0634 1.28084 12.585 0.25273 10 0.25ZM13.75 10.75H6.25C6.05109 10.75 5.86033 10.671 5.71967 10.5303C5.57902 10.3897 5.5 10.1989 5.5 10C5.5 9.80109 5.57902 9.61032 5.71967 9.46967C5.86033 9.32902 6.05109 9.25 6.25 9.25H13.75C13.9489 9.25 14.1397 9.32902 14.2803 9.46967C14.421 9.61032 14.5 9.80109 14.5 10C14.5 10.1989 14.421 10.3897 14.2803 10.5303C14.1397 10.671 13.9489 10.75 13.75 10.75Z"
                fill="#006EFF"
              />
            </svg>

            <svg
              width="2"
              height="80"
              viewBox="0 0 2 80"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line
                x1="1"
                y1="79"
                x2="1"
                y2="1"
                stroke="#F60C17"
                stroke-width="2"
                stroke-linecap="round"
                stroke-dasharray="4 4"
              />
            </svg>

            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2.25C10.0716 2.25 8.18657 2.82183 6.58319 3.89317C4.97982 4.96451 3.73013 6.48726 2.99218 8.26884C2.25422 10.0504 2.06114 12.0108 2.43735 13.9021C2.81355 15.7934 3.74215 17.5307 5.10571 18.8943C6.46928 20.2579 8.20656 21.1865 10.0979 21.5627C11.9892 21.9389 13.9496 21.7458 15.7312 21.0078C17.5127 20.2699 19.0355 19.0202 20.1068 17.4168C21.1782 15.8134 21.75 13.9284 21.75 12C21.7473 9.41498 20.7192 6.93661 18.8913 5.10872C17.0634 3.28084 14.585 2.25273 12 2.25ZM15.5306 14.4694C15.6003 14.5391 15.6556 14.6218 15.6933 14.7128C15.731 14.8039 15.7504 14.9015 15.7504 15C15.7504 15.0985 15.731 15.1961 15.6933 15.2872C15.6556 15.3782 15.6003 15.4609 15.5306 15.5306C15.4609 15.6003 15.3782 15.6556 15.2872 15.6933C15.1961 15.731 15.0986 15.7504 15 15.7504C14.9015 15.7504 14.8039 15.731 14.7128 15.6933C14.6218 15.6556 14.5391 15.6003 14.4694 15.5306L12 13.0603L9.53063 15.5306C9.46095 15.6003 9.37822 15.6556 9.28718 15.6933C9.19613 15.731 9.09855 15.7504 9 15.7504C8.90146 15.7504 8.80388 15.731 8.71283 15.6933C8.62179 15.6556 8.53906 15.6003 8.46938 15.5306C8.3997 15.4609 8.34442 15.3782 8.30671 15.2872C8.269 15.1961 8.24959 15.0985 8.24959 15C8.24959 14.9015 8.269 14.8039 8.30671 14.7128C8.34442 14.6218 8.3997 14.5391 8.46938 14.4694L10.9397 12L8.46938 9.53063C8.32865 9.38989 8.24959 9.19902 8.24959 9C8.24959 8.80098 8.32865 8.61011 8.46938 8.46937C8.61011 8.32864 8.80098 8.24958 9 8.24958C9.19903 8.24958 9.3899 8.32864 9.53063 8.46937L12 10.9397L14.4694 8.46937C14.5391 8.39969 14.6218 8.34442 14.7128 8.3067C14.8039 8.26899 14.9015 8.24958 15 8.24958C15.0986 8.24958 15.1961 8.26899 15.2872 8.3067C15.3782 8.34442 15.4609 8.39969 15.5306 8.46937C15.6003 8.53906 15.6556 8.62178 15.6933 8.71283C15.731 8.80387 15.7504 8.90145 15.7504 9C15.7504 9.09855 15.731 9.19613 15.6933 9.28717C15.6556 9.37822 15.6003 9.46094 15.5306 9.53063L13.0603 12L15.5306 14.4694Z"
                fill="#F60C17"
              />
            </svg>

            <svg
              width="2"
              height="80"
              viewBox="0 0 2 80"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line
                x1="1"
                y1="79"
                x2="1"
                y2="1"
                stroke="#F60C17"
                stroke-width="2"
                stroke-linecap="round"
                stroke-dasharray="4 4"
              />
            </svg>

            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2.25C10.0716 2.25 8.18657 2.82183 6.58319 3.89317C4.97982 4.96451 3.73013 6.48726 2.99218 8.26884C2.25422 10.0504 2.06114 12.0108 2.43735 13.9021C2.81355 15.7934 3.74215 17.5307 5.10571 18.8943C6.46928 20.2579 8.20656 21.1865 10.0979 21.5627C11.9892 21.9389 13.9496 21.7458 15.7312 21.0078C17.5127 20.2699 19.0355 19.0202 20.1068 17.4168C21.1782 15.8134 21.75 13.9284 21.75 12C21.7473 9.41498 20.7192 6.93661 18.8913 5.10872C17.0634 3.28084 14.585 2.25273 12 2.25ZM15.5306 14.4694C15.6003 14.5391 15.6556 14.6218 15.6933 14.7128C15.731 14.8039 15.7504 14.9015 15.7504 15C15.7504 15.0985 15.731 15.1961 15.6933 15.2872C15.6556 15.3782 15.6003 15.4609 15.5306 15.5306C15.4609 15.6003 15.3782 15.6556 15.2872 15.6933C15.1961 15.731 15.0986 15.7504 15 15.7504C14.9015 15.7504 14.8039 15.731 14.7128 15.6933C14.6218 15.6556 14.5391 15.6003 14.4694 15.5306L12 13.0603L9.53063 15.5306C9.46095 15.6003 9.37822 15.6556 9.28718 15.6933C9.19613 15.731 9.09855 15.7504 9 15.7504C8.90146 15.7504 8.80388 15.731 8.71283 15.6933C8.62179 15.6556 8.53906 15.6003 8.46938 15.5306C8.3997 15.4609 8.34442 15.3782 8.30671 15.2872C8.269 15.1961 8.24959 15.0985 8.24959 15C8.24959 14.9015 8.269 14.8039 8.30671 14.7128C8.34442 14.6218 8.3997 14.5391 8.46938 14.4694L10.9397 12L8.46938 9.53063C8.32865 9.38989 8.24959 9.19902 8.24959 9C8.24959 8.80098 8.32865 8.61011 8.46938 8.46937C8.61011 8.32864 8.80098 8.24958 9 8.24958C9.19903 8.24958 9.3899 8.32864 9.53063 8.46937L12 10.9397L14.4694 8.46937C14.5391 8.39969 14.6218 8.34442 14.7128 8.3067C14.8039 8.26899 14.9015 8.24958 15 8.24958C15.0986 8.24958 15.1961 8.26899 15.2872 8.3067C15.3782 8.34442 15.4609 8.39969 15.5306 8.46937C15.6003 8.53906 15.6556 8.62178 15.6933 8.71283C15.731 8.80387 15.7504 8.90145 15.7504 9C15.7504 9.09855 15.731 9.19613 15.6933 9.28717C15.6556 9.37822 15.6003 9.46094 15.5306 9.53063L13.0603 12L15.5306 14.4694Z"
                fill="#F60C17"
              />
            </svg>
          </div>

          <!--  text for the checks-->
          <div class="">
            <div class="flex flex-col gap-y-8">
              <div class="flex space-x-4 items-start">
                <div class="flex flex-col">
                  <h1 class="font-black">Stage 0: Applied for Job </h1>
                  <p class="text-xs">
                    You profile has been sent to the Microsoft team
                  </p>
                  <p class="text-xs">Applied On: 2024-07-29 09:21:33</p>
                </div>
              </div>
              <!--  -->
              <div class="flex space-x-4 items-start py-7">
                <div class="flex flex-col">
                  <h1 class="font-black">Stage 1: Profile Review </h1>
                  <p class="text-xs">Your profile is reviewed at this stage</p>
                </div>
              </div>
              <!--  -->
              <div class="flex space-x-4 items-start py-3">
                <div class="flex flex-col">
                  <h1 class="font-black">Stage 2: Interview</h1>
                  <p class="text-xs">Get interviewed</p>
                </div>
              </div>
              <!--  -->
              <div class="flex space-x-4 items-start py-6">
                <div class="flex flex-col">
                  <h1 class="font-black">Stage 3: Push to Client </h1>
                  <p class="text-xs">
                    You profile has been sent to the Microsoft team
                  </p>
                  <p class="text-xs">Applied On: 2024-07-29 09:21:33</p>
                </div>
              </div>
              <!--  -->
              <div class="flex space-x-4 items-start">
                <div class="flex flex-col">
                  <h1 class="font-black">Stage 0: Applied for Job </h1>
                  <p class="text-xs">
                    You profile has been sent to the Microsoft team
                  </p>
                  <p class="text-xs">Applied On: 2024-07-29 09:21:33</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!--  -->
        <div
          class="bg-danger-50 rounded-10 px-8 py-4 text-danger-600 text-xs space-y-4"
        >
          <h4>Dear Talent,</h4>
          <p>
            Thank you for your patience during the vetting process. We
            appreciate you taking the time to apply for the social media
            assistant role.
          </p>
          <h3>Role: Social Media Assistnt role</h3>
          <p>
            URL:
            https://app.prodevs.io/job/public/b21XK3FVcjYyZm5CK1ZTMnpSeUNUQT09
          </p>
          <p>
            At this time, we have closed the role because a talent has been
            hired for the position. We will be posting new positions in the
            coming weeks and will reach out if we have a role that matches your
            skills. Please visit our tech community for upcoming sessions with
            industry experts in software development.
          </p>
          <p>
            Thank you for your time, and we wish you the very best. Looking
            forward to placing you in a suitable role soon.
          </p>
          <h4>Best regards,</h4>
          <p>
            Kindly contact your talent manager on your dashboard if you need
            further clarifications or have questions.
          </p>
        </div>
      </div>
    </div>

    <!--second div  -->
    <div class="bg-white w-full rounded-10">
      <div class="flex items-center flex-col space-y-3 py-4 border-b-2">
        <img src="/assets/images//ms.png" alt="" />
        <h1 class="text base font-black">Social Media Assistant</h1>
        <p class="text-xs">Microsoft</p>
      </div>
      <!--  -->
      <div class="flex gap-x-6 p-6 border-b-2">
        <div class="space-y-4">
          <div class="space-y-2">
            <h1 class="text-xs">Job Type</h1>
            <h1 class="font-black text-sm">Full-time</h1>
          </div>

          <div class="space-y-2">
            <h1 class="text-xs">Location</h1>
            <h1 class="font-black text-sm">Paris, France</h1>
          </div>

          <div class="space-y-2">
            <h1 class="text-xs">Salary</h1>
            <h1 class="font-black text-sm">$4,000 to $5,000/month</h1>
          </div>
        </div>
        <!--  -->
        <div class="space-y-4">
          <div class="space-y-2">
            <h1 class="text-xs">Work Type</h1>
            <h1 class="font-black text-sm">Hybrid</h1>
          </div>

          <div class="space-y-2">
            <h1 class="text-xs">Experience</h1>
            <h1 class="font-black text-sm">4 years</h1>
          </div>

          <div>
            <button class="bg-primary-1 px-4 py-3 text-xs rounded-8 text-white">
              Apply Now
            </button>
          </div>
        </div>
      </div>

      <!--  -->
      <div class="space-y-4 py-4">
        <div class="px-6 space-y-2">
          <h1 class="font-black">Description</h1>
          <div class="px-4">
            <ul class="list-disc text-xs">
              <li class="">
                In this role, you’ll work underneath a Marketing Manager to
                optimize our paid advertising channels.
              </li>
              <li>
                This position is ideal for someone with 1+ years of experience
                in paid ads who is eager to apply their expertise to platforms
                such as Meta, X, Google and LinkedIn.
              </li>
              <li>
                You'll also be working deeply in our CRM (HubSpot) and alongside
                our creative + content teams and will be responsible for helping
                to understand and track attribution cross-platform.
              </li>
            </ul>
          </div>
        </div>
        <!--  -->
        <div class="px-6 space-y-2">
          <h1 class="font-black">Key Responsibilities</h1>
          <div class="px-4">
            <ul class="list-disc text-xs">
              <li class="">
                Develop and execute paid advertising campaigns across various
                digital platforms.
              </li>
              <li>
                Analyze conversion events using Google Analytics to inform
                campaign strategies.
              </li>
              <li>
                Utilize Google Tag Manager to deploy tracking tags and manage
                marketing data.
              </li>
              <li>
                Create compelling ad materials and write effective ad copy.
              </li>
              <li>Track and report on campaign performance metrics weekly.</li>
              <li>
                Maintain and update performance dashboards with the latest data.
              </li>
              <li>
                Dive into our CRM and help understand channel attribution.
              </li>
              <li>Work alongside the creative team to get assets made.</li>
              <li>
                Collaborate closely with the marketing team to ensure alignment
                with overall marketing objectives.
              </li>
              <li>
                Help the team get landing page tests over the line that you'll
                run conversion tests on.
              </li>
            </ul>
          </div>
        </div>
        <!--  -->
        <div class="px-6 space-y-2">
          <h1 class="font-black">Qualification</h1>
          <div class="px-4">
            <ul class="list-disc text-xs">
              <li class="">
                1-2 years of experience in managing paid advertising campaigns.
              </li>
              <li>
                Proficient in Google Analytics and Google Tag Manager for
                tracking and data management.
              </li>
              <li>
                Ability to create visually appealing ad creatives and write
                effective ad copy.
              </li>
              <li>
                Skilled in analyzing, tracking, and reporting on campaign
                metrics.
              </li>
              <li>Proficient in using formulas in Google Sheets.</li>
              <li>Knowledgable in a CRM (pref HubSpot)</li>
              <li>
                Strong communication skills and the ability to work effectively
                in a remote environment.
              </li>
              <li>
                Speak quickly. Everyone on our team is a fast-talker. This
                matters to us ;)
              </li>
            </ul>
          </div>
        </div>
        <!--  -->
        <div class="px-6 space-y-2">
          <h1 class="font-black">How to apply</h1>
          <div class="px-4">
            <ul class="list-disc text-xs">
              <li>
                Please submit your resume + video highlighting your experience
                in paid advertising and your proficiency with Paid Channels,
                Google Analytics, Google Tag Manager and a CRM.Include relevant
                work samples or any case studies showcasing your expertise.
              </li>
              <li>
                You'll also be working deeply in our CRM (HubSpot) and alongside
                our creative + content teams and will be responsible for helping
                to understand and track attribution cross-platform.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
