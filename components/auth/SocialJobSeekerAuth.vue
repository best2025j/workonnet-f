<script setup lang="ts">
import { POSITION, useToast } from 'vue-toastification';
import type { ApiErrorResponse, ApiSuccessResponse } from '~/types';
import { useOneTap, type CredentialResponse } from 'vue3-google-signin';

const router = useRouter();
const toast = useToast();
const isLoading = ref<boolean>(false);
const authStore = useAuthStore();
const userStore = useUserStore();

const config = useRuntimeConfig();

const emit = defineEmits(['update:isLoading']);
const updateIsLoading = (value: boolean) => {
  emit('update:isLoading', value);
};

const { isReady, login } = useOneTap({
  disableAutomaticPrompt: false,
  onSuccess: async (response: CredentialResponse) => {
    isLoading.value = true;
    updateIsLoading(isLoading.value)
    await handleGoogleLogin(response?.credential as string)
  },
  onError: () => {
    isLoading.value = true;
    updateIsLoading(isLoading.value)
    toast.error('Google login failed.')
    setTimeout(() => {
      isLoading.value = false
      updateIsLoading(isLoading.value)
    }, 1500)
  },
  // options
});

const getUserProfile = async (token: string) => {
  try {
    const resp = await userStore.$api.refreshAuthUserProfile(token);
    const responseData = resp as ApiSuccessResponse;
    userStore.setUserDetails(responseData)
  } catch (e) {
    console.log(e);
  }
};


const handleGoogleLogin = async (token: string) => {
  isLoading.value = true;
  updateIsLoading(isLoading.value)

  try {
    const response = await $fetch('/api/auth/social/authenticate-auth', {
      method: 'POST',
      body: {
        token,
        userType: LOGGED_IN_USER.JOBSEEKER.toString().toUpperCase()
      }
    });

    const responseData = response as ApiSuccessResponse;

    authStore.setCurrentUserType(LOGGED_IN_USER.JOBSEEKER);
    authStore.setUserAuthData({
      accountType: LOGGED_IN_USER.JOBSEEKER,
      userId: responseData.data.userId,
    });
    authStore.setUserToken(responseData.data.accessToken);
    authStore.setLoginSecret(null);

    await getUserProfile(responseData.data.accessToken)
    setTimeout(() => {
      isLoading.value = false;
      updateIsLoading(isLoading.value)
      router.push("/dashboard/jobseeker");
    }, 3000);
  } catch (error: any) {
    const errorData = error.data as ApiErrorResponse;

    console.log(error);

    if (errorData.data?.errorCode === 'CI0001') {
      toast.error(errorData.data.message, {
        timeout: 3000,
        position: POSITION.TOP_RIGHT,
      });
    } else {
      toast.error('An error occurred try again', {
        timeout: 3000,
        position: POSITION.TOP_RIGHT,
      });
    }

    setTimeout(() => {
      isLoading.value = false;
      updateIsLoading(isLoading.value)
    }, 2000);
  }
};

const loginWithLinkedIn = () => {
  const clientId = config.public.linkedinId;
  const redirectUri = 'http://localhost:3000/auth/linkedin/jobseeker/callback';
  const linkedInOAuthUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=r_liteprofile%20r_emailaddress`;

  window.location.href = linkedInOAuthUrl;
};
</script>
<template>
    <div class="flex flex-col items-center justify-center gap-4 text-[12px]">
         <button
           :disabled="!isReady"
           @click="() => login()"
           class="w-full flex gap-4 items-center justify-center border font-light border-[#D0D5DD] border-solid px-5 py-2 text-[#344054] rounded-lg"
         >
           <span class="w-6"
             ><svg
               width="25"
               height="24"
               viewBox="0 0 25 24"
               fill="none"
               xmlns="http://www.w3.org/2000/svg"
             >
               <g clip-path="url(#clip0_1964_13106)">
                 <path
                   d="M24.266 12.2764C24.266 11.4607 24.1999 10.6406 24.0588 9.83807H12.74V14.4591H19.2217C18.9528 15.9494 18.0885 17.2678 16.823 18.1056V21.1039H20.69C22.9608 19.0139 24.266 15.9274 24.266 12.2764Z"
                   fill="#4285F4"
                 />
                 <path
                   d="M12.74 24.0008C15.9764 24.0008 18.7058 22.9382 20.6944 21.1039L16.8274 18.1055C15.7516 18.8375 14.3626 19.252 12.7444 19.252C9.61376 19.252 6.95934 17.1399 6.00693 14.3003H2.01648V17.3912C4.05359 21.4434 8.20278 24.0008 12.74 24.0008Z"
                   fill="#34A853"
                 />
                 <path
                   d="M6.00253 14.3003C5.49987 12.8099 5.49987 11.1961 6.00253 9.70575V6.61481H2.01649C0.31449 10.0056 0.31449 14.0004 2.01649 17.3912L6.00253 14.3003Z"
                   fill="#FBBC04"
                 />
                 <path
                   d="M12.74 4.74966C14.4508 4.7232 16.1043 5.36697 17.3433 6.54867L20.7694 3.12262C18.6 1.0855 15.7207 -0.034466 12.74 0.000808666C8.20277 0.000808666 4.05359 2.55822 2.01648 6.61481L6.00252 9.70575C6.95052 6.86173 9.60935 4.74966 12.74 4.74966Z"
                   fill="#EA4335"
                 />
               </g>
               <defs>
                 <clipPath id="clip0_1964_13106">
                   <rect
                     width="24"
                     height="24"
                     fill="white"
                     transform="translate(0.5)"
                   />
                 </clipPath>
               </defs>
             </svg>
           </span>
           Continue with Google
         </button>
         <button
          @click="loginWithLinkedIn()"
           class="w-full flex gap-3 items-center justify-center font-thin bg-[#0A66C2] px-5 py-2 text-white rounded-lg"
         >
           <span class="w-6">
             <svg
               width="23"
               height="24"
               viewBox="0 0 23 24"
               fill="none"
               xmlns="http://www.w3.org/2000/svg"
             >
               <path
                 d="M0.000488281 2.14797C0.000488281 1.23861 0.761792 0.500488 1.70026 0.500488H21.2997C22.2386 0.500488 22.9995 1.23861 22.9995 2.14797V21.8523C22.9995 22.7619 22.2386 23.4995 21.2997 23.4995H1.70026C0.761882 23.4995 0.000488281 22.762 0.000488281 21.8526V2.1477V2.14797Z"
                 fill="white"
               />
               <path
                 d="M6.98966 19.7475V9.39323H3.54807V19.7475H6.99002H6.98966ZM5.26959 7.97978C6.46949 7.97978 7.21651 7.18469 7.21651 6.19106C7.19405 5.17479 6.46949 4.4019 5.29241 4.4019C4.11451 4.4019 3.34521 5.17479 3.34521 6.19097C3.34521 7.1846 4.09196 7.97969 5.24704 7.97969H5.26932L5.26959 7.97978ZM8.89463 19.7475H12.3359V13.9658C12.3359 13.6568 12.3584 13.3469 12.4493 13.1262C12.698 12.5076 13.2643 11.8673 14.2152 11.8673C15.4602 11.8673 15.9586 12.8168 15.9586 14.2088V19.7475H19.3998V13.8107C19.3998 10.6304 17.7022 9.15048 15.4379 9.15048C13.5816 9.15048 12.7663 10.188 12.3133 10.8947H12.3362V9.39359H8.89481C8.93973 10.3649 8.89454 19.7478 8.89454 19.7478L8.89463 19.7475Z"
                 fill="#0A66C2"
               />
             </svg>
           </span>
           Continue with LinkedIn
         </button>
       </div>
 </template>