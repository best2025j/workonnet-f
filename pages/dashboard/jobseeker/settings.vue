<script setup lang="ts">
import type {
  ApiErrorResponse,
  ApiSuccessResponse,
  IRecruiterDetails,
  ISettingsDetails,
IUserDetails,
} from '~/types';
import { POSITION, useToast } from 'vue-toastification';

definePageMeta({
  title: "Settings",
  pageName: "dashboard.jobseeker.settings",
  layout: "dashboard",
  middleware: ["auth", "is-jobseeker"],
});

const authStore = useAuthStore();
const userStore = useUserStore();
const isLoading = ref<boolean>(false);
const toast = useToast();
const userSettings = computed(() => userStore.userSettings);
const userData = computed<IUserDetails>(() => userStore.loggedInUserDetails)

const onNewsAndUpdatesSettingsChange = async () => {
   // run any checks before update
  await handleUpdateSettings({newsAndUpdates: !userSettings.value?.newsAndUpdates})
}

const onSettingsRemindersChange = async () => {
   // run any checks before update
  await handleUpdateSettings({reminders: !userSettings.value?.reminders})
}

const onTipsAndTutorialsSettingsChange = async () => {
  // run any checks before update
  await handleUpdateSettings({tipsAndTutorials: !userSettings.value?.tipsAndTutorials})
}

const handleUpdateSettings = async (data: Partial<ISettingsDetails>) => {
  try {
    const token = authStore.userToken;
    const response = await userStore.$api.updateUserSettings(token, data, userSettings.value?.id as string);
    const responseData = response as ApiSuccessResponse;
    toast.success('Your settings was updated successfully', {
      timeout: 3000,
      position: POSITION.TOP_RIGHT,
    });

    setTimeout(() => {
      isLoading.value = false;
    }, 500);
    userStore.setUserSettings(responseData.data);
  } catch (error: any) {
    const errorData = error.data as ApiErrorResponse;
    toast.error('Could not update settings, An error occurred try again', {
      timeout: 3000,
      position: POSITION.TOP_RIGHT,
    });

    setTimeout(() => {
      isLoading.value = false;
    }, 2000);
  }
};

onBeforeMount(async () => {
  if (userStore.userSettings === null || !userStore.userSettings) {
    try {
      const token = authStore.userToken;
      const response = await userStore.$api.refreshAuthUserSettings(token);
      const responseData = response as ApiSuccessResponse;
      setTimeout(() => {
        isLoading.value = false;
      }, 500);

      userStore.setUserSettings(responseData.data);
    } catch (e) {
      console.log(e);
    }
  }
});

</script>

<template>
  <div class="text-black-700 flex gap-4 text-sm pb-4 relative">
    <!-- Fixed position left sidebar -->
    <div class="bg-white md:w-1/4 rounded-10 fixed hidden md:block">
      <div class="border border-b-2 h-20 w-full items-center flex px-4">
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
          <NuxtLink :to="{ hash: '#preference_notification' }">
            <h1 class="text-primary-1 font-bold">Preference & Notification</h1>
          </NuxtLink>
        </div>
      </div>

      <div class="border-b-2 h-20 w-full items-center flex px-4">
        <div class="space-x-3 flex items-center">
          <span
            ><svg
              width="20"
              height="18"
              viewBox="0 0 20 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.75 7.5C16.75 7.69891 16.671 7.88968 16.5303 8.03033C16.3897 8.17098 16.1989 8.25 16 8.25H12.25C12.0511 8.25 11.8603 8.17098 11.7197 8.03033C11.579 7.88968 11.5 7.69891 11.5 7.5C11.5 7.30109 11.579 7.11032 11.7197 6.96967C11.8603 6.82902 12.0511 6.75 12.25 6.75H16C16.1989 6.75 16.3897 6.82902 16.5303 6.96967C16.671 7.11032 16.75 7.30109 16.75 7.5ZM16 9.75H12.25C12.0511 9.75 11.8603 9.82902 11.7197 9.96967C11.579 10.1103 11.5 10.3011 11.5 10.5C11.5 10.6989 11.579 10.8897 11.7197 11.0303C11.8603 11.171 12.0511 11.25 12.25 11.25H16C16.1989 11.25 16.3897 11.171 16.5303 11.0303C16.671 10.8897 16.75 10.6989 16.75 10.5C16.75 10.3011 16.671 10.1103 16.5303 9.96967C16.3897 9.82902 16.1989 9.75 16 9.75ZM19.75 2.25V15.75C19.75 16.1478 19.592 16.5294 19.3107 16.8107C19.0294 17.092 18.6478 17.25 18.25 17.25H1.75C1.35218 17.25 0.970644 17.092 0.68934 16.8107C0.408035 16.5294 0.25 16.1478 0.25 15.75V2.25C0.25 1.85218 0.408035 1.47064 0.68934 1.18934C0.970644 0.908035 1.35218 0.75 1.75 0.75H18.25C18.6478 0.75 19.0294 0.908035 19.3107 1.18934C19.592 1.47064 19.75 1.85218 19.75 2.25ZM18.25 15.75V2.25H1.75V15.75H18.25ZM10.7256 12.5625C10.7754 12.7552 10.7465 12.9598 10.6454 13.1312C10.5443 13.3026 10.3793 13.4268 10.1866 13.4766C9.99387 13.5263 9.78931 13.4974 9.61789 13.3963C9.44647 13.2952 9.32223 13.1302 9.2725 12.9375C9.02594 11.9756 8.04812 11.25 6.99906 11.25C5.95 11.25 4.97312 11.9756 4.72563 12.9375C4.6759 13.1302 4.55166 13.2952 4.38024 13.3963C4.20882 13.4974 4.00426 13.5263 3.81156 13.4766C3.61887 13.4268 3.45382 13.3026 3.35272 13.1312C3.25163 12.9598 3.22277 12.7552 3.2725 12.5625C3.51588 11.6566 4.09118 10.8755 4.88406 10.3744C4.46272 9.95553 4.17522 9.42102 4.05802 8.83859C3.94082 8.25616 3.99918 7.65205 4.22572 7.10283C4.45226 6.55361 4.83676 6.08402 5.3305 5.75358C5.82423 5.42315 6.40496 5.24675 6.99906 5.24675C7.59317 5.24675 8.17389 5.42315 8.66763 5.75358C9.16136 6.08402 9.54587 6.55361 9.77241 7.10283C9.99894 7.65205 10.0573 8.25616 9.94011 8.83859C9.8229 9.42102 9.53541 9.95553 9.11406 10.3744C9.90781 10.8748 10.4836 11.6562 10.7266 12.5625H10.7256ZM7 9.75C7.29667 9.75 7.58668 9.66203 7.83335 9.4972C8.08003 9.33238 8.27229 9.09811 8.38582 8.82403C8.49935 8.54994 8.52906 8.24834 8.47118 7.95736C8.4133 7.66639 8.27044 7.39912 8.06066 7.18934C7.85088 6.97956 7.58361 6.8367 7.29264 6.77882C7.00166 6.72094 6.70006 6.75065 6.42597 6.86418C6.15189 6.97771 5.91762 7.16997 5.7528 7.41665C5.58797 7.66332 5.5 7.95333 5.5 8.25C5.5 8.64782 5.65804 9.02936 5.93934 9.31066C6.22064 9.59196 6.60218 9.75 7 9.75Z"
                fill="#3D3D3D"
              />
            </svg>
          </span>
          <NuxtLink :to="{ hash: '#privacy' }">
            <h1 class="font-bold text-sm text-black-600">Privacy</h1>
          </NuxtLink>
        </div>
      </div>

      <div class="border-b-2 h-20 w-full items-center flex px-4">
        <div class="space-x-3 flex items-center">
          <span
            ><svg
              width="18"
              height="21"
              viewBox="0 0 18 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 10.5C8.36962 10.5002 7.76037 10.7273 7.28361 11.1397C6.80684 11.552 6.4944 12.1222 6.40339 12.746C6.31238 13.3698 6.44887 14.0055 6.78793 14.5369C7.12699 15.0683 7.64596 15.46 8.25 15.6403V17.25C8.25 17.4489 8.32902 17.6397 8.46967 17.7803C8.61032 17.921 8.80109 18 9 18C9.19891 18 9.38968 17.921 9.53033 17.7803C9.67098 17.6397 9.75 17.4489 9.75 17.25V15.6403C10.354 15.46 10.873 15.0683 11.2121 14.5369C11.5511 14.0055 11.6876 13.3698 11.5966 12.746C11.5056 12.1222 11.1932 11.552 10.7164 11.1397C10.2396 10.7273 9.63038 10.5002 9 10.5ZM9 14.25C8.7775 14.25 8.55999 14.184 8.37498 14.0604C8.18998 13.9368 8.04578 13.7611 7.96064 13.5555C7.87549 13.35 7.85321 13.1238 7.89662 12.9055C7.94002 12.6873 8.04717 12.4868 8.2045 12.3295C8.36184 12.1722 8.56229 12.065 8.78052 12.0216C8.99875 11.9782 9.22495 12.0005 9.43052 12.0856C9.63608 12.1708 9.81179 12.315 9.9354 12.5C10.059 12.685 10.125 12.9025 10.125 13.125C10.125 13.4234 10.0065 13.7095 9.79549 13.9205C9.58452 14.1315 9.29837 14.25 9 14.25ZM16.5 7.5H13.5V5.25C13.5 4.05653 13.0259 2.91193 12.182 2.06802C11.3381 1.22411 10.1935 0.75 9 0.75C7.80653 0.75 6.66193 1.22411 5.81802 2.06802C4.97411 2.91193 4.5 4.05653 4.5 5.25V7.5H1.5C1.10218 7.5 0.720644 7.65804 0.43934 7.93934C0.158035 8.22064 0 8.60218 0 9V19.5C0 19.8978 0.158035 20.2794 0.43934 20.5607C0.720644 20.842 1.10218 21 1.5 21H16.5C16.8978 21 17.2794 20.842 17.5607 20.5607C17.842 20.2794 18 19.8978 18 19.5V9C18 8.60218 17.842 8.22064 17.5607 7.93934C17.2794 7.65804 16.8978 7.5 16.5 7.5ZM6 5.25C6 4.45435 6.31607 3.69129 6.87868 3.12868C7.44129 2.56607 8.20435 2.25 9 2.25C9.79565 2.25 10.5587 2.56607 11.1213 3.12868C11.6839 3.69129 12 4.45435 12 5.25V7.5H6V5.25ZM16.5 19.5H1.5V9H16.5V19.5Z"
                fill="#3D3D3D"
              />
            </svg>
          </span>
          <NuxtLink :to="{ hash: '#security' }">
            <h1 class="font-bold text-sm text-black-600">Security</h1>
          </NuxtLink>
        </div>
      </div>

      <!-- <div class="h-20 w-full items-center flex px-4">
        <div class="space-x-3 flex items-center">
          <span
            ><svg
              width="22"
              height="18"
              viewBox="0 0 22 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.6875 0C13.7516 0 12.0566 0.8325 11 2.23969C9.94344 0.8325 8.24844 0 6.3125 0C4.77146 0.00173694 3.29404 0.614681 2.20436 1.70436C1.11468 2.79404 0.501737 4.27146 0.5 5.8125C0.5 12.375 10.2303 17.6869 10.6447 17.9062C10.7539 17.965 10.876 17.9958 11 17.9958C11.124 17.9958 11.2461 17.965 11.3553 17.9062C11.7697 17.6869 21.5 12.375 21.5 5.8125C21.4983 4.27146 20.8853 2.79404 19.7956 1.70436C18.706 0.614681 17.2285 0.00173694 15.6875 0ZM11 16.3875C9.28813 15.39 2 10.8459 2 5.8125C2.00149 4.66921 2.45632 3.57317 3.26475 2.76475C4.07317 1.95632 5.16921 1.50149 6.3125 1.5C8.13594 1.5 9.66687 2.47125 10.3062 4.03125C10.3628 4.16881 10.4589 4.28646 10.5824 4.36926C10.7059 4.45207 10.8513 4.49627 11 4.49627C11.1487 4.49627 11.2941 4.45207 11.4176 4.36926C11.5411 4.28646 11.6372 4.16881 11.6937 4.03125C12.3331 2.46844 13.8641 1.5 15.6875 1.5C16.8308 1.50149 17.9268 1.95632 18.7353 2.76475C19.5437 3.57317 19.9985 4.66921 20 5.8125C20 10.8384 12.71 15.3891 11 16.3875Z"
                fill="#3D3D3D"
              />
            </svg>
          </span>
          <h1 class="font-bold text-sm text-black-600">Saved/Favourites</h1>
        </div>
      </div> -->
    </div>
    <!--  -->
    <div class="md:w-3/4 w-full h-full space-y-3 md:ml-[33%]">
      <div
        id="preferences_notifications"
        class="bg-white rounded-10 p-4 font-[Nexa] h-full space-y-3"
      >
        <div class="py-4 space-y-2 md:w-[440px]">
          <h1 class="font-black">Preferences & Notifications</h1>
          <p class="text-xs">
            Change your preferences and decide what you want to be notified
            about, and unsubscribe from what you don't.
          </p>
        </div>

        <div class="space-y-4">
          <div>
            <div
              class="flex items-center justify-between w-full pt-6 border-t-2 md:px-4"
            >
              <div class="md:w-1/4">
                <h1 class="text-xs font-black">Email address</h1>
              </div>

              <div class="hidden md:flex md:w-2/4">
                <p class="text-xs">{{userData?.email || ''}}</p>
              </div>

              <div class="md:w-1/4 flex justify-end">
                <button
                  class="text-xs px-4 py-2 border rounded-8 text-[#344054]"
                >
                  Change
                </button>
              </div>
            </div>
            <p class="text-xs md:hidden">{{userData?.email || ''}}</p>
          </div>

          <!--  -->
          <div>
            <div
              class="flex items-center h-12 justify-between w-full md:px-4 border-t-2"
            >
              <div class="md:w-1/4">
                <h1 class="text-xs font-black">News and updates</h1>
              </div>
              <div class="md:w-2/4 md:block hidden">
                <p class="text-xs">News about products and feature updates.</p>
              </div>
              <div class="md:w-1/4 flex justify-end">
                <div class="form-control">
                  <input
                    type="checkbox"
                    :checked="userSettings?.newsAndUpdates"
                    @change="onNewsAndUpdatesSettingsChange()"
                    class="toggle toggle-sm bg-primary-1 checked:bg-white checked:border-primary-1 border-primary-1 checked:[--tglbg:#FE8900] hover:bg-none"
                  />
                </div>
              </div>
            </div>
            <p class="text-xs md:hidden">
              News about products and feature updates.
            </p>
          </div>

          <!--  -->
          <div>
            <div
              class="flex items-center h-10 md:h-12 justify-between w-full md:px-4 border-t-2"
            >
              <div class="md:w-1/4">
                <h1 class="text-xs font-black">Tips and tutorials</h1>
              </div>
              <div class="md:w-2/4 hidden md:flex">
                <p class="text-xs">Tips on getting more out of Workonnect.</p>
              </div>
              <div class="md:w-1/4 flex justify-end">
                <div class="form-control">
                  <input
                    type="checkbox"
                    :checked="userSettings?.tipsAndTutorials"
                    @change="onTipsAndTutorialsSettingsChange"
                    class="toggle toggle-sm bg-primary-1 checked:bg-white checked:border-primary-1 border-primary-1 checked:[--tglbg:#FE8900] hover:bg-none"
                  />
                </div>
              </div>
            </div>
            <p class="text-xs md:hidden">
              Tips on getting more out of Workonnect.
            </p>
          </div>

          <!--  -->
          <div>
            <div
              class="flex items-center h-10 md:h-12 justify-between w-full md:px-4 border-t-2"
            >
              <div class="md:w-1/4">
                <h1 class="text-xs font-black">Reminders</h1>
              </div>
              <div class="md:w-2/4 hidden md:flex">
                <p class="text-xs">
                  These are notifications to remind you updates about what you
                  might miss about Workonnect.
                </p>
              </div>

              <div class="justify-end md:w-1/4 flex">
                <div class="form-control">
                  <input
                    type="checkbox"
                     :checked="userSettings?.reminders"
                    @change="onSettingsRemindersChange()"
                    class="toggle toggle-sm bg-primary-1 checked:bg-white checked:border-primary-1 border-primary-1 checked:[--tglbg:#FE8900] hover:bg-none"
                  />
                </div>
              </div>
            </div>
            <p class="text-xs md:hidden">
              These are notifications to remind you updates about what you might
              miss about Workonnect.
            </p>
          </div>
        </div>
      </div>

      <!--  -->
      <div
        id="privacy"
        class="bg-white rounded-10 p-4 font-[Nexa] h-full space-y-3"
      >
        <div class="py-4 space-y-2 md:w-[440px]">
          <h1 class="font-black">Privacy</h1>
          <p class="text-xs">
            Exercise your privacy rights and control how your data is used.
          </p>
        </div>

        <!--  -->
        <div class="">
          <div
            class="flex items-center justify-between w-full py-6 border-t-2 md:px-4"
          >
            <div class="w-1/4">
              <h1 class="text-xs font-black">Privacy</h1>
            </div>
            <div class="md:w-2/4 hidden md:block">
              <p class="text-xs">{{userData?.email || ''}}</p>
              <p class="text-xs">
                Select "Manage" to change your privacy settings and exercise
                your rights using our request form.
              </p>
            </div>
            <div class="w-1/4 flex justify-end">
              <button class="text-xs px-4 py-2 border rounded-8 text-[#344054]">
                Manage
              </button>
            </div>
          </div>

          <div class="flex md:hidden flex-col space-y-3">
            <p class="text-xs">{{userData?.email || ''}}</p>
            <p class="text-xs">
              Select "Manage" to change your privacy settings and exercise your
              rights using our request form.
            </p>
          </div>
        </div>
      </div>

      <!--  -->
      <div
        id="security"
        class="bg-white rounded-10 p-4 font-[Nexa] h-full space-y-3"
      >
        <div class="py-4 space-y-2 md:w-[440px]">
          <h1 class="font-black">Security</h1>
          <p class="text-xs">
            Change your security settings, set up secure authentication, or
            delete your account.
          </p>
        </div>

        <!--  -->
        <div>
          <div
            class="flex items-center justify-between w-full md:py-6 py-4 border-t-2 md:px-4"
          >
            <div class="md:w-1/4">
              <h1 class="text-xs font-black">Two-Factor Authentication</h1>
            </div>
            <div class="md:w-2/4">
              <p class="text-xs hidden md:flex">
                Increase your account's security by setting up
                two-factor authentication..com
              </p>
            </div>
            <div class="md:w-1/4 flex justify-end">
              <button class="text-xs px-4 py-2 border rounded-8 text-[#344054]">
                Enabled
              </button>
            </div>
          </div>

          <p class="text-xs md:hidden">
            Increase your account's security by setting up two-factor
            authentication..com
          </p>
        </div>

        <!--  -->
        <div>
          <div
            class="flex items-center justify-between w-full md:py-6 py-4 border-t-2 md:px-4"
          >
            <div class="md:w-1/4">
              <h1 class="text-xs font-black">Active sessions</h1>
            </div>
            <div class="md:w-2/4">
              <p class="text-xs hidden md:flex">
                Selecting "Sign out" will sign you out from all devices except
                this one. This can take up to 10 minutes.
              </p>
            </div>

            <div class="md:w-1/4 flex justify-end">
              <button class="text-xs px-4 py-2 border rounded-8 text-[#344054]">
                <svg
                  width="18"
                  height="17"
                  viewBox="0 0 18 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17.125 8.00004C17.125 10.1549 16.269 12.2216 14.7452 13.7453C13.2215 15.269 11.1549 16.125 9 16.125C6.84512 16.125 4.77849 15.269 3.25476 13.7453C1.73102 12.2216 0.875 10.1549 0.875 8.00004C0.875 4.79692 2.73516 1.87817 5.61406 0.557073C5.68865 0.522806 5.76925 0.503566 5.85128 0.500451C5.9333 0.497335 6.01513 0.510406 6.0921 0.538916C6.16908 0.567427 6.23968 0.610819 6.29988 0.666615C6.36008 0.72241 6.4087 0.789517 6.44297 0.864104C6.47724 0.938691 6.49648 1.0193 6.49959 1.10132C6.50271 1.18334 6.48964 1.26517 6.46113 1.34215C6.43261 1.41912 6.38922 1.48972 6.33343 1.54992C6.27763 1.61012 6.21052 1.65874 6.13594 1.69301C3.69922 2.81176 2.125 5.28676 2.125 8.00004C2.125 9.82341 2.84933 11.5721 4.13864 12.8614C5.42795 14.1507 7.17664 14.875 9 14.875C10.8234 14.875 12.572 14.1507 13.8614 12.8614C15.1507 11.5721 15.875 9.82341 15.875 8.00004C15.875 5.28676 14.3008 2.81176 11.8641 1.69301C11.7134 1.62381 11.5965 1.4976 11.5389 1.34215C11.4813 1.1867 11.4878 1.01474 11.557 0.864104C11.6262 0.71347 11.7524 0.596496 11.9079 0.538916C12.0633 0.481337 12.2353 0.487868 12.3859 0.557073C15.2648 1.87817 17.125 4.79692 17.125 8.00004Z"
                    fill="#343330"
                  />
                </svg>
              </button>
            </div>
          </div>
          <p class="text-xs md:hidden">
            Selecting "Sign out" will sign you out from all devices except this
            one. This can take up to 10 minutes.
          </p>
        </div>

        <!--  -->
        <div>
          <div
            class="flex items-center justify-between w-full md:py-6 py-4 border-t-2 md:px-4"
          >
            <div class="md:w-1/4">
              <h1 class="text-xs font-black">Delete account</h1>
            </div>
            <div class="md:w-2/4 hidden md:flex">
              <p class="text-xs">
                Permanently delete your Workonnect account.
              </p>
            </div>
            <div class="md:w-1/4 flex justify-end">
              <button
                onclick="my_modal_1.showModal()"
                class="text-xs px-4 py-2 border rounded-8 text-[#344054]"
              >
                Delete account
                <!-- Open the modal using ID.showModal() method -->

                <dialog
                  id="my_modal_1"
                  class="modal text-black-950 backdrop-blur-sm backdrop-filter"
                >
                  <div class="modal-box flex-col flex items-center space-y-3">
                    <div
                      class="flex items-center justify-around w-full pb-4 border-b-2"
                    >
                      <div class="text-white">no text.</div>
                      <h3 class="text-lg font-bold">Information!</h3>

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
                        width="100"
                        height="100"
                        viewBox="0 0 100 100"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M92.5003 73.4729L58.3401 14.1487C57.4865 12.6953 56.2679 11.4902 54.805 10.6528C53.3421 9.8155 51.6858 9.375 50.0003 9.375C48.3147 9.375 46.6584 9.8155 45.1956 10.6528C43.7327 11.4902 42.5141 12.6953 41.6604 14.1487L7.50028 73.4729C6.67894 74.8787 6.24609 76.4776 6.24609 78.1057C6.24609 79.7339 6.67894 81.3327 7.50028 82.7385C8.34298 84.2007 9.55954 85.4124 11.0251 86.2492C12.4907 87.086 14.1526 87.5178 15.8401 87.5003H84.1604C85.8467 87.5164 87.5069 87.0839 88.971 86.2472C90.4351 85.4105 91.6504 84.1996 92.4925 82.7385C93.315 81.3334 93.7492 79.7349 93.7506 78.1068C93.7519 76.4786 93.3204 74.8794 92.5003 73.4729ZM46.8753 40.6253C46.8753 39.7965 47.2045 39.0016 47.7906 38.4155C48.3766 37.8295 49.1715 37.5003 50.0003 37.5003C50.8291 37.5003 51.6239 37.8295 52.21 38.4155C52.796 39.0016 53.1253 39.7965 53.1253 40.6253V56.2503C53.1253 57.0791 52.796 57.8739 52.21 58.46C51.6239 59.046 50.8291 59.3753 50.0003 59.3753C49.1715 59.3753 48.3766 59.046 47.7906 58.46C47.2045 57.8739 46.8753 57.0791 46.8753 56.2503V40.6253ZM50.0003 75.0003C49.0732 75.0003 48.1669 74.7253 47.396 74.2103C46.6252 73.6952 46.0244 72.9631 45.6696 72.1066C45.3148 71.2501 45.222 70.3076 45.4029 69.3983C45.5837 68.489 46.0302 67.6538 46.6857 66.9982C47.3413 66.3426 48.1765 65.8962 49.0858 65.7153C49.9951 65.5345 50.9376 65.6273 51.7941 65.9821C52.6506 66.3369 53.3827 66.9377 53.8978 67.7085C54.4129 68.4794 54.6878 69.3857 54.6878 70.3128C54.6878 71.556 54.1939 72.7482 53.3148 73.6273C52.4358 74.5064 51.2435 75.0003 50.0003 75.0003Z"
                          fill="#F79009"
                        />
                      </svg>
                    </span>
                    <p class="py-2 w-2/3 text-sm">
                      Are you sure you want to delete your Workonnect account?
                    </p>
                    <p class="py-2">This cannot be undone</p>

                    <div class="space-x-2">
                      <!-- if there is a button in form, it will close the modal -->
                      <button
                        class="px-4 py-2 border border-danger-600 text-danger-600 text-xs rounded-10"
                      >
                        Cancel
                      </button>
                      <button
                        class="rounded-10 px-4 py-2 text-white text-xs bg-primary-1"
                      >
                        Proceed
                      </button>
                    </div>
                  </div>
                </dialog>
              </button>
            </div>
          </div>
          <p class="text-xs md:hidden">
            Permanently delete your Workonnect account.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
