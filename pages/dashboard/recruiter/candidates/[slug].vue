<script setup lang="ts">
import useVuelidate from '@vuelidate/core';
import { helpers, required } from '@vuelidate/validators';
import { POSITION, useToast } from 'vue-toastification';
import {
  JOB_APPLICATION_STATUS,
  type ApiSuccessResponse,
  type IEducationBackground,
  type IJobApplications,
  type IRecruiterDetails,
  type IUserDetails,
  type IWorkExperience,
} from '~/types';

definePageMeta({
  title: 'View Candidate',
  pageName: 'dashboard.recruiter.candidates',
  layout: 'dashboard',
  middleware: ['auth', 'is-recruiter'],
});

const route = useRoute();
const authStore = useAuthStore();
const jobStore = useJobStore();
const userStore = useUserStore();
const currentJobApp = ref<IJobApplications | null>(null);
const userWorkExperiences = ref<IWorkExperience[] | []>([]);
const userEducations = ref<IEducationBackground[] | []>([]);
const showModal = ref(false); // Manage modal visibility
const modalTrigger = ref(null);
const modalInterviewTrigger = ref(null);
const modalHireTrigger = ref(null);

const toast = useToast();

const jobAppStatusFormData = reactive({
  rejectionNotice: '',
});

const jobAppStatusInterviewFormData = reactive({
  interviewNotice: '',
});

const jobAppStatusHireFormData = reactive({
  acceptanceMessage: '',
});

const jobAppStatusRules = computed(() => {
  return {
    rejectionNotice: {
      required: helpers.withMessage('Message is required', required),
    },
  };
});

const jobAppStatusHireRules = computed(() => {
  return {
    acceptanceMessage: {
      required: helpers.withMessage('Message is required', required),
    },
  };
});

const jobAppStatusInterviewRules = computed(() => {
  return {
    interviewNotice: {
      required: helpers.withMessage('Message is required', required),
    },
  };
});

const v$ = useVuelidate(jobAppStatusRules, jobAppStatusFormData);
const v2$ = useVuelidate(
  jobAppStatusInterviewRules,
  jobAppStatusInterviewFormData
);
const v3$ = useVuelidate(jobAppStatusHireRules, jobAppStatusHireFormData);

const userData = computed<IRecruiterDetails>(
  () => userStore.loggedInUserDetails
);

const isChangingStatus = ref(false);
const isLoading = ref(false);

const showRejectModal = async () => {
  (modalTrigger.value as unknown as any).showModal();
};

const hideRejectModal = async () => {
  (modalTrigger.value as unknown as any).close();
};

const showInterviewModal = async () => {
  (modalInterviewTrigger.value as unknown as any).showModal();
};

const hideInterviewModal = async () => {
  (modalInterviewTrigger.value as unknown as any).close();
};

const showHireModal = async () => {
  (modalHireTrigger.value as unknown as any).showModal();
};

const hideHireModal = async () => {
  (modalHireTrigger.value as unknown as any).close();
};

const getData = async (jobAppId: string, isRefresh: boolean) => {
  try {
    if (isRefresh) {
      isLoading.value = true;
    }

    const token = authStore.userToken;
    const response = await jobStore.$api.fetchSingleApplicationDetailed(
      token,
      jobAppId
    );
    const responseData = response as ApiSuccessResponse;
    currentJobApp.value = responseData.data.jobDetailed;
    userWorkExperiences.value = responseData.data.userExperiences;
    userEducations.value = responseData.data.userEducations;

    setTimeout(() => {
      isLoading.value = false;
    }, 1000);
  } catch (e) {
    console.log(e);
  }
};

const rejectOrInterview = async (status: JOB_APPLICATION_STATUS) => {
  isChangingStatus.value = true;

  let data = {};

  if (status === JOB_APPLICATION_STATUS.INTERVIEW) {
    const isValidForm = await v2$.value.$validate();
    if (!isValidForm) {
      toast.error('Please fill all fields correctly', {
        timeout: 3000,
        position: POSITION.TOP_RIGHT,
      });

      setTimeout(() => {
        isChangingStatus.value = false;
      }, 2000);
      return;
    }

    data = { status, ...jobAppStatusInterviewFormData };
  } else if (status === JOB_APPLICATION_STATUS.ACCEPTED) {
    const isValidForm = await v3$.value.$validate();
    if (!isValidForm) {
      toast.error('Please fill all fields correctly', {
        timeout: 3000,
        position: POSITION.TOP_RIGHT,
      });

      setTimeout(() => {
        isChangingStatus.value = false;
      }, 2000);
      return;
    }

    data = { status, ...jobAppStatusHireFormData };
  } else if (status === JOB_APPLICATION_STATUS.REJECTED) {
    const isValidForm = await v$.value.$validate();
    if (!isValidForm) {
      toast.error('Please fill all fields correctly', {
        timeout: 3000,
        position: POSITION.TOP_RIGHT,
      });

      setTimeout(() => {
        isChangingStatus.value = false;
      }, 2000);
      return;
    }

    data = { status, ...jobAppStatusFormData };
  }

  await updateApplicationStage(data);
};

const changeAppStatus = async (status: JOB_APPLICATION_STATUS) => {
  if (status === JOB_APPLICATION_STATUS.INTERVIEW) {
    // show modal to enter interview message
    showInterviewModal();
    return;
  }

  if (status === JOB_APPLICATION_STATUS.ACCEPTED) {
    // show modal to enter hire message
    showHireModal();
    return;
  }

  if (status === JOB_APPLICATION_STATUS.REJECTED) {
    // show modal to enter rejection reason
    showRejectModal();
    return;
  }

  const data = {
    status,
  };

  await updateApplicationStage(data);
};

const updateApplicationStage = async (data: any) => {
  try {
    isChangingStatus.value = true;
    const token = authStore.userToken;
    await jobStore.$api.updateSingleApplicationData(
      token,
      (route.params.slug as string).split('-')[0],
      data
    );

    toast.success('Job application stage was updated', {
      timeout: 3000,
      position: POSITION.TOP_RIGHT,
    });

    hideRejectModal();
    hideHireModal();
    hideInterviewModal();
    setTimeout(() => {
      isChangingStatus.value = false;
    }, 1000);
    await getData((route.params.slug as string).split('-')[0], false);
  } catch (e) {
    console.log(e);
  }
};

const mapUserDetails = (user: any) => user as IUserDetails;

onBeforeMount(async () => {
  await getData((route.params.slug as string).split('-')[0], true);
});
</script>

<template>
  <div
    v-if="isLoading"
    class="h-full py-40 w-full flex items-center justify-center"
  >
    <span class="loader-2"></span>
  </div>
  <div v-else class="text-black-900">
    <!-- profile uploads -->
    <div class="p-4 bg-white rounded-10">
      <img
        v-if="mapUserDetails(currentJobApp?.user)?.photoHeader"
        :src="mapUserDetails(currentJobApp?.user)?.photoHeader?.url"
        class="w-full h-32 md:h-[200px]"
        alt="no image yet..."
      />
      <div class="mt-12 md:pl-6 pl-3 space-y-2 z-auto relative">
        <div
          class="bg-white rounded-full h-[70px] w-[70px] border-2 z-auto flex items-center justify-center absolute -top-24"
        >
          <img
            v-if="mapUserDetails(currentJobApp?.user)?.photo"
            :src="mapUserDetails(currentJobApp?.user)?.photo?.url"
            class="w-[70px] h-[70px] rounded-full"
            alt="profile-image"
          />
        </div>
        <div
          class="flex flex-col md:flex-row justify-between text-start md:items-center"
        >
          <div class="space-y-2 py-2">
            <h1 class="font-black text-base">
              {{ mapUserDetails(currentJobApp?.user).firstName }}
              {{ mapUserDetails(currentJobApp?.user).lastName }}
            </h1>
            <div class="flex items-start space-x-4">
              <div class="space-y-2">
                <h1 class="text-xs">
                  {{ mapUserDetails(currentJobApp?.user)?.occupation || 'N/A' }}
                </h1>
                <h1 class="text-xs">
                  {{ mapUserDetails(currentJobApp?.user)?.location || 'N/A' }}
                </h1>
              </div>
            </div>
          </div>
          <!--  user info-->
          <div class="space-y-2 py-2">
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
                Portfolio link:
                <b>{{
                  mapUserDetails(currentJobApp?.user)?.socialLinks
                    ?.portfolioUrl || 'N/A'
                }}</b>
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

              <h1 class="text-xs">
                Current Stage: {{ currentJobApp?.status }}
              </h1>
            </div>
            <!-- <div class="flex gap-2 items-center">
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
            </div> -->
          </div>
          <!-- social media links -->
          <div class="space-y-2 py-2">
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
                Facebook:
                <b>{{
                  mapUserDetails(currentJobApp?.user)?.socialLinks?.facebookUrl
                }}</b>
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
                Linkedin:
                <b>{{
                  mapUserDetails(currentJobApp?.user)?.socialLinks
                    ?.linkedinUrl || 'N/A'
                }}</b>
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
                Instagram:
                <b>{{
                  mapUserDetails(currentJobApp?.user)?.socialLinks
                    ?.instagramUrl || 'N/A'
                }}</b>
              </h1>
            </div>
          </div>
          <!-- btn -->
          <div class="space-y-3 py-2">
            <!-- <div class="flex justify-end">
              <button class="text-info-600 font-black text-xs">
                Premium user
              </button>
            </div> -->

            <div class="space-y-3">
              <div class="space-x-2 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-5"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"
                  />
                </svg>
                <h1 class="md:text-lg text-sm font-black">
                  NGN{{
                    formatCurrency(
                      Number(
                        mapUserDetails(currentJobApp?.user)?.salary?.amount
                      ) || 0
                    ) || 'N/A'
                  }}
                  /month
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="flex flex-col md:flex-row gap-4">
      <!-- cards -->
      <div class="p-4 bg-white rounded-10 w-full md:w-[62%] my-4">
        <div class="space-y-4 pt-4">
          <h1 class="text-xl font-black">About me</h1>
          <p class="text-xs tracking-wider">
            {{ mapUserDetails(currentJobApp?.user).bio || 'No bio' }}
          </p>
        </div>
        <div class="space-y-4 pt-5">
          <h1 class="text-xl font-black">Experience</h1>
          <div v-if="userWorkExperiences?.length" class="space-y-3">
            <div
              v-for="(experience, index) in userWorkExperiences"
              :key="index"
              class="bg-westside-50 space-y-4 rounded-10 p-4"
            >
              <h1 class="text-info-600 font-black text-sm">
                {{ experience.jobTitle }} at
                {{ experience.companyOrganization }}
              </h1>
              <div class="flex gap-2">
                <h1 class="text-xs font-black">
                  {{
                    formatExperienceDates(
                      experience.startingFrom,
                      experience?.endingIn
                    )
                  }}
                </h1>
                <h1 class="text-xs">{{ experience.companyLocation }}</h1>
              </div>
              <p class="text-xs tracking-wider">
                {{ experience.details }}
              </p>
            </div>
          </div>

          <div v-else>No work experiences</div>
        </div>
        <!-- education -->
        <div class="space-y-4 pt-5">
          <h1 class="text-xl font-black">Education</h1>
          <div class="space-y-3">
            <div v-if="userEducations.length > 0" class="w-full">
              <div
                v-for="(education, index) in userEducations"
                :key="index"
                class="flex justify-between p-4 mt-4 bg-black-50 items-center rounded-10"
              >
                <div class="space-y-2 md:pl-4">
                  <li class="text-sm font-black text-info-600">
                    {{ education.schoolName }}
                  </li>
                  <p class="text-xs font-black text-black-600">
                    {{ education.degree.text }} in {{ education.fieldOfStudy }}
                  </p>
                  <div class="flex gap-x-4">
                    <h1 class="font-black text-xs">
                      {{ formateDateMonthYear(education.startingYear) }} -
                      {{ formateDateMonthYear(education.endingYear) }}
                    </h1>
                  </div>
                </div>
              </div>
            </div>
            <div v-else>
              <p>No education data yet</p>
            </div>
          </div>
        </div>
        <!-- skills -->
        <div class="pt-4">
          <h1 class="font-black text-xl">Notable Skills</h1>
          <ul
            v-if="mapUserDetails(currentJobApp?.user)?.skills?.length"
            class="space-y-1 list-disc pl-6 py-4 text-xs md:text-sm"
          >
            <li
              v-for="(skill, index) in mapUserDetails(currentJobApp?.user)
                ?.skills"
              :key="index"
            >
              {{ skill }}
            </li>
          </ul>
          <div v-else><p>No skills available</p></div>
        </div>

        <div class="pt-4">
          <h1 class="font-black text-xl">Spoken Languages</h1>
          <ul
            v-if="mapUserDetails(currentJobApp?.user)?.spokenLanguages?.length"
            class="space-y-1 list-disc pl-6 py-4 text-xs md:text-sm"
          >
            <li
              v-for="(lang, index) in mapUserDetails(currentJobApp?.user)
                ?.spokenLanguages"
              :key="index"
            >
              {{ lang }}
            </li>
          </ul>
          <div v-else><p>No language available</p></div>
        </div>

        <div
          v-if="currentJobApp?.status === JOB_APPLICATION_STATUS.REJECTED"
          class="bg-danger-50 rounded-10 px-8 py-4 text-danger-600 text-xs space-y-4"
        >
          <p>
            {{ currentJobApp?.rejectionNotice }}
          </p>
        </div>
      </div>

      <!--  -->
      <div class="my-4 w-full space-y-4 md:w-[38%] h-full">
        <!-- uploading -->
        <div class="bg-white rounded-10 p-4">
          <div class="py-2">
            <h1 class="text-xl font-black">Uploaded Documents</h1>
            <div class="flex py-2 justify-between">
              <div class="flex gap-x-2">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20.0306 7.71938L14.7806 2.46938C14.7109 2.39975 14.6282 2.34454 14.5371 2.3069C14.4461 2.26926 14.3485 2.24992 14.25 2.25H5.25C4.85218 2.25 4.47064 2.40804 4.18934 2.68934C3.90804 2.97064 3.75 3.35218 3.75 3.75V20.25C3.75 20.6478 3.90804 21.0294 4.18934 21.3107C4.47064 21.592 4.85218 21.75 5.25 21.75H18.75C19.1478 21.75 19.5294 21.592 19.8107 21.3107C20.092 21.0294 20.25 20.6478 20.25 20.25V8.25C20.2501 8.15148 20.2307 8.05391 20.1931 7.96286C20.1555 7.87182 20.1003 7.78908 20.0306 7.71938ZM15 4.81031L17.6897 7.5H15V4.81031ZM18.75 20.25H5.25V3.75H13.5V8.25C13.5 8.44891 13.579 8.63968 13.7197 8.78033C13.8603 8.92098 14.0511 9 14.25 9H18.75V20.25Z"
                    fill="#343330"
                  />
                </svg>
                <div>
                  <h1 class="text-xs">Resume/CV</h1>
                  <div
                    class="space-y-1"
                    v-if="
                      mapUserDetails(currentJobApp?.user)?.resumeResource
                        ?.resumeCv
                    "
                  >
                    <p class="text-xs font-bold">
                      {{
                        mapUserDetails(currentJobApp?.user)?.resumeResource
                          ?.resumeCv?.name
                      }}
                    </p>
                    <p class="text-xs text-info-600">
                      Size:
                      {{
                        (
                          mapUserDetails(currentJobApp?.user)!.resumeResource!
                            .resumeCv!.size / 1024
                        ).toFixed(2)
                      }}
                      KB
                    </p>
                  </div>
                  <p v-else class="text-xs text-info-600">No file found</p>
                </div>
              </div>

              <div>
                <button
                  @click="showModal = true"
                  class="px-[14px] text-xs py-2 text-primary-1 rounded-10 border border-primary-1"
                >
                  View
                </button>
              </div>
            </div>
          </div>

          <!-- the 3 button -->
          <div class="flex gap-x-2 w-full pt-3">
            <button
              v-if="currentJobApp?.status === JOB_APPLICATION_STATUS.INTERVIEW"
              @click="changeAppStatus(JOB_APPLICATION_STATUS.ACCEPTED)"
              :disabled="isChangingStatus"
              class="flex items-center bg-success-200 w-full justify-center rounded-5 py-2"
            >
              <svg
                width="21"
                height="20"
                viewBox="0 0 21 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18.7812 6.25938C18.6053 6.05994 18.3888 5.90023 18.1464 5.79086C17.9039 5.68148 17.641 5.62495 17.375 5.625H13V4.375C13 3.5462 12.6708 2.75134 12.0847 2.16529C11.4987 1.57924 10.7038 1.25 9.875 1.25C9.75889 1.24992 9.64505 1.28218 9.54625 1.34317C9.44744 1.40417 9.36758 1.49148 9.31562 1.59531L6.36406 7.5H3C2.66848 7.5 2.35054 7.6317 2.11612 7.86612C1.8817 8.10054 1.75 8.41848 1.75 8.75V15.625C1.75 15.9565 1.8817 16.2745 2.11612 16.5089C2.35054 16.7433 2.66848 16.875 3 16.875H16.4375C16.8943 16.8752 17.3354 16.7085 17.6781 16.4065C18.0208 16.1044 18.2413 15.6876 18.2984 15.2344L19.2359 7.73438C19.2692 7.47033 19.2458 7.20224 19.1674 6.94792C19.089 6.6936 18.9574 6.45888 18.7812 6.25938ZM3 8.75H6.125V15.625H3V8.75ZM17.9953 7.57812L17.0578 15.0781C17.0388 15.2292 16.9653 15.3681 16.851 15.4688C16.7368 15.5695 16.5898 15.6251 16.4375 15.625H7.375V8.27266L10.243 2.53594C10.668 2.62101 11.0505 2.85075 11.3253 3.18605C11.6 3.52135 11.7501 3.9415 11.75 4.375V6.25C11.75 6.41576 11.8158 6.57473 11.9331 6.69194C12.0503 6.80915 12.2092 6.875 12.375 6.875H17.375C17.4637 6.87497 17.5514 6.89382 17.6322 6.93028C17.7131 6.96675 17.7852 7.02001 17.8439 7.08652C17.9026 7.15303 17.9464 7.23126 17.9725 7.31602C17.9986 7.40078 18.0064 7.49013 17.9953 7.57812Z"
                  fill="#3D3D3D"
                />
              </svg>
              <h1 class="text-xs font-black">Hire</h1>
            </button>
            <button
              v-if="currentJobApp?.status === JOB_APPLICATION_STATUS.ACCEPTED"
              :disabled="isChangingStatus"
              class="flex items-center bg-success-200 w-full justify-center rounded-5 py-2"
            >
              <svg
                width="21"
                height="20"
                viewBox="0 0 21 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18.7812 6.25938C18.6053 6.05994 18.3888 5.90023 18.1464 5.79086C17.9039 5.68148 17.641 5.62495 17.375 5.625H13V4.375C13 3.5462 12.6708 2.75134 12.0847 2.16529C11.4987 1.57924 10.7038 1.25 9.875 1.25C9.75889 1.24992 9.64505 1.28218 9.54625 1.34317C9.44744 1.40417 9.36758 1.49148 9.31562 1.59531L6.36406 7.5H3C2.66848 7.5 2.35054 7.6317 2.11612 7.86612C1.8817 8.10054 1.75 8.41848 1.75 8.75V15.625C1.75 15.9565 1.8817 16.2745 2.11612 16.5089C2.35054 16.7433 2.66848 16.875 3 16.875H16.4375C16.8943 16.8752 17.3354 16.7085 17.6781 16.4065C18.0208 16.1044 18.2413 15.6876 18.2984 15.2344L19.2359 7.73438C19.2692 7.47033 19.2458 7.20224 19.1674 6.94792C19.089 6.6936 18.9574 6.45888 18.7812 6.25938ZM3 8.75H6.125V15.625H3V8.75ZM17.9953 7.57812L17.0578 15.0781C17.0388 15.2292 16.9653 15.3681 16.851 15.4688C16.7368 15.5695 16.5898 15.6251 16.4375 15.625H7.375V8.27266L10.243 2.53594C10.668 2.62101 11.0505 2.85075 11.3253 3.18605C11.6 3.52135 11.7501 3.9415 11.75 4.375V6.25C11.75 6.41576 11.8158 6.57473 11.9331 6.69194C12.0503 6.80915 12.2092 6.875 12.375 6.875H17.375C17.4637 6.87497 17.5514 6.89382 17.6322 6.93028C17.7131 6.96675 17.7852 7.02001 17.8439 7.08652C17.9026 7.15303 17.9464 7.23126 17.9725 7.31602C17.9986 7.40078 18.0064 7.49013 17.9953 7.57812Z"
                  fill="#3D3D3D"
                />
              </svg>
              <h1 class="text-xs font-black">Applicant was Hired</h1>
            </button>
            <button
              v-if="currentJobApp?.status === JOB_APPLICATION_STATUS.IN_REVIEW"
              @click="changeAppStatus(JOB_APPLICATION_STATUS.INTERVIEW)"
              class="flex items-center bg-westside-200 justify-center rounded-5 w-full py-2"
              :disabled="isChangingStatus"
            >
              <span>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.1492 1.93815C12.0441 1.88694 11.9268 1.86623 11.8105 1.87839C11.6942 1.89054 11.5836 1.93507 11.4914 2.0069L6.03516 6.24987H2.5C2.16848 6.24987 1.85054 6.38157 1.61612 6.61599C1.3817 6.85041 1.25 7.16835 1.25 7.49987V12.4999C1.25 12.8314 1.3817 13.1493 1.61612 13.3838C1.85054 13.6182 2.16848 13.7499 2.5 13.7499H6.03516L11.4914 17.9928C11.5837 18.0646 11.6944 18.1091 11.8107 18.1211C11.927 18.1331 12.0444 18.1123 12.1495 18.0609C12.2545 18.0096 12.3431 17.9298 12.405 17.8306C12.467 17.7314 12.4999 17.6168 12.5 17.4999V2.49987C12.5 2.38279 12.4671 2.26805 12.4051 2.16874C12.3431 2.06942 12.2544 1.98953 12.1492 1.93815ZM2.5 7.49987H5.625V12.4999H2.5V7.49987ZM11.25 16.2217L6.875 12.8194V7.18034L11.25 3.778V16.2217ZM15.4688 7.93425C15.9715 8.50493 16.2488 9.23935 16.2488 9.99987C16.2488 10.7604 15.9715 11.4948 15.4688 12.0655C15.3583 12.1868 15.2046 12.2599 15.0408 12.2689C14.877 12.2779 14.7162 12.2221 14.5932 12.1136C14.4701 12.0051 14.3947 11.8526 14.3831 11.689C14.3715 11.5253 14.4247 11.3637 14.5312 11.2389C14.8327 10.8966 14.999 10.456 14.999 9.99987C14.999 9.5437 14.8327 9.10318 14.5312 8.76081C14.4247 8.63606 14.3715 8.47442 14.3831 8.31078C14.3947 8.14713 14.4701 7.99461 14.5932 7.88611C14.7162 7.77762 14.877 7.72186 15.0408 7.73086C15.2046 7.73987 15.3583 7.81292 15.4688 7.93425ZM19.375 9.99987C19.3759 11.5375 18.8092 13.0214 17.7836 14.1671C17.6723 14.2875 17.518 14.3594 17.3542 14.3672C17.1903 14.3749 17.03 14.318 16.9077 14.2085C16.7855 14.0991 16.7112 13.9461 16.7008 13.7824C16.6905 13.6186 16.7449 13.4574 16.8523 13.3335C17.6722 12.4168 18.1254 11.2301 18.1254 10.0003C18.1254 8.77044 17.6722 7.58375 16.8523 6.66706C16.7961 6.60617 16.7525 6.53469 16.7241 6.45679C16.6957 6.37888 16.6831 6.29611 16.687 6.21329C16.691 6.13047 16.7113 6.04926 16.7469 5.97439C16.7826 5.89951 16.8327 5.83248 16.8945 5.77718C16.9563 5.72188 17.0284 5.67942 17.1068 5.65229C17.1851 5.62515 17.2681 5.61387 17.3508 5.61911C17.4336 5.62435 17.5145 5.646 17.5888 5.6828C17.6631 5.7196 17.7293 5.77082 17.7836 5.83347C18.8095 6.97864 19.3762 8.46239 19.375 9.99987Z"
                    fill="#3D3D3D"
                  />
                </svg>
              </span>

              <h1 class="text-xs font-black">Interview</h1>
            </button>
            <button
              v-if="currentJobApp?.status === JOB_APPLICATION_STATUS.PENDING"
              @click="changeAppStatus(JOB_APPLICATION_STATUS.IN_REVIEW)"
              class="flex items-center bg-info-300 w-full justify-center rounded-5 py-2 gap-x-1"
              :disabled="isChangingStatus"
            >
              <span
                ><svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M7.5 7.5h-.75A2.25 2.25 0 0 0 4.5 9.75v7.5a2.25 2.25 0 0 0 2.25 2.25h7.5a2.25 2.25 0 0 0 2.25-2.25v-7.5a2.25 2.25 0 0 0-2.25-2.25h-.75m0-3-3-3m0 0-3 3m3-3v11.25m6-2.25h.75a2.25 2.25 0 0 1 2.25 2.25v7.5a2.25 2.25 0 0 1-2.25 2.25h-7.5a2.25 2.25 0 0 1-2.25-2.25v-.75"
                  />
                </svg>
              </span>
              <h1 class="text-xs font-black">Move to Review</h1>
            </button>
            <button
            v-if="currentJobApp?.status !== JOB_APPLICATION_STATUS.REJECTED"
              @click="changeAppStatus(JOB_APPLICATION_STATUS.REJECTED)"
              class="flex items-center bg-danger-200 w-full justify-center rounded-5 py-2 gap-x-1"
              :disabled="isChangingStatus"
            >
              <span
                ><svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.0675 15.1827C16.1256 15.2407 16.1717 15.3097 16.2031 15.3855C16.2345 15.4614 16.2507 15.5427 16.2507 15.6249C16.2507 15.707 16.2345 15.7883 16.2031 15.8642C16.1717 15.94 16.1256 16.009 16.0675 16.067C16.0095 16.1251 15.9405 16.1712 15.8647 16.2026C15.7888 16.234 15.7075 16.2502 15.6253 16.2502C15.5432 16.2502 15.4619 16.234 15.386 16.2026C15.3102 16.1712 15.2412 16.1251 15.1832 16.067L10.0003 10.8835L4.81753 16.067C4.70026 16.1843 4.5412 16.2502 4.37535 16.2502C4.2095 16.2502 4.05044 16.1843 3.93316 16.067C3.81588 15.9498 3.75 15.7907 3.75 15.6249C3.75 15.459 3.81588 15.2999 3.93316 15.1827L9.11675 9.99986L3.93316 4.81705C3.81588 4.69977 3.75 4.54071 3.75 4.37486C3.75 4.20901 3.81588 4.04995 3.93316 3.93267C4.05044 3.8154 4.2095 3.74951 4.37535 3.74951C4.5412 3.74951 4.70026 3.8154 4.81753 3.93267L10.0003 9.11627L15.1832 3.93267C15.3004 3.8154 15.4595 3.74951 15.6253 3.74951C15.7912 3.74951 15.9503 3.8154 16.0675 3.93267C16.1848 4.04995 16.2507 4.20901 16.2507 4.37486C16.2507 4.54071 16.1848 4.69977 16.0675 4.81705L10.8839 9.99986L16.0675 15.1827Z"
                    fill="#3D3D3D"
                  />
                </svg>
              </span>
              <h1 class="text-xs font-black">Reject</h1>
            </button>
            <button
            v-if="currentJobApp?.status === JOB_APPLICATION_STATUS.REJECTED"
              class="flex items-center bg-danger-200 w-full justify-center rounded-5 py-2 gap-x-1"
              :disabled="isChangingStatus"
            >
              <span
                ><svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.0675 15.1827C16.1256 15.2407 16.1717 15.3097 16.2031 15.3855C16.2345 15.4614 16.2507 15.5427 16.2507 15.6249C16.2507 15.707 16.2345 15.7883 16.2031 15.8642C16.1717 15.94 16.1256 16.009 16.0675 16.067C16.0095 16.1251 15.9405 16.1712 15.8647 16.2026C15.7888 16.234 15.7075 16.2502 15.6253 16.2502C15.5432 16.2502 15.4619 16.234 15.386 16.2026C15.3102 16.1712 15.2412 16.1251 15.1832 16.067L10.0003 10.8835L4.81753 16.067C4.70026 16.1843 4.5412 16.2502 4.37535 16.2502C4.2095 16.2502 4.05044 16.1843 3.93316 16.067C3.81588 15.9498 3.75 15.7907 3.75 15.6249C3.75 15.459 3.81588 15.2999 3.93316 15.1827L9.11675 9.99986L3.93316 4.81705C3.81588 4.69977 3.75 4.54071 3.75 4.37486C3.75 4.20901 3.81588 4.04995 3.93316 3.93267C4.05044 3.8154 4.2095 3.74951 4.37535 3.74951C4.5412 3.74951 4.70026 3.8154 4.81753 3.93267L10.0003 9.11627L15.1832 3.93267C15.3004 3.8154 15.4595 3.74951 15.6253 3.74951C15.7912 3.74951 15.9503 3.8154 16.0675 3.93267C16.1848 4.04995 16.2507 4.20901 16.2507 4.37486C16.2507 4.54071 16.1848 4.69977 16.0675 4.81705L10.8839 9.99986L16.0675 15.1827Z"
                    fill="#3D3D3D"
                  />
                </svg>
              </span>
              <h1 class="text-xs font-black">Applicant was rejected</h1>
            </button>
          </div>
        </div>

        <!-- job details -->
        <div class="bg-white w-full rounded-10 pt-4">
          <div class="p-6 flex flex-col items-start space-y-3 py-2 border-b-2">
            <h1 class="text-xl font-black">Job Details</h1>

            <div class="flex items-center justify-between space-x-2">
              <h1 class="text-xs">Job Title</h1>
              <h1 class="font-black text-sm capitalize">
                {{ currentJobApp?.jobListing?.title }}
              </h1>
            </div>
          </div>
          <!--  -->
          <div class="flex gap-x-6 p-6 border-b-2">
            <div class="space-y-4">
              <div class="space-y-2">
                <h1 class="text-xs">Job Type</h1>
                <h1 class="font-black text-sm capitalize">
                  {{ currentJobApp?.jobListing?.jobType }}
                </h1>
              </div>

              <div class="space-y-2">
                <h1 class="text-xs">Salary</h1>
                <h1 class="font-black text-sm capitalize">
                  NGN{{
                    formatCurrency(
                      currentJobApp?.jobListing!.expectedSalary as number
                    )
                  }}/month
                </h1>
              </div>
            </div>
            <!--  -->
            <div class="space-y-4">
              <div class="space-y-2">
                <h1 class="text-xs">Work Type</h1>
                <h1 class="font-black text-sm capitalize">
                  {{ currentJobApp?.jobListing.location }}
                </h1>
              </div>

              <div class="space-y-2">
                <h1 class="text-xs">Experience</h1>
                <h1 class="font-black text-sm capitalize">
                  {{ currentJobApp?.jobListing?.level }}
                </h1>
              </div>
            </div>
          </div>

          <!--  -->
          <div class="space-y-4 py-4">
            <div class="px-6 space-y-2">
              <h1 class="font-black">Description</h1>
              <div>
                <div class="list-disc text-xs">
                  <p class="">
                    {{ currentJobApp?.jobListing?.description }}
                  </p>
                </div>
              </div>
            </div>
            <!--  -->
            <div class="px-6 space-y-2">
              <h1 class="font-black">Requirements</h1>
              <div class="px-4">
                <ul class="list-disc text-xs">
                  <li
                    v-for="(item, index) in currentJobApp?.jobListing
                      ?.requirements"
                    :key="index"
                  >
                    {{ item }}
                  </li>
                </ul>
              </div>
            </div>
            <!--  -->
            <div class="px-6 space-y-2">
              <h1 class="font-black">Benefits</h1>
              <div class="px-4">
                <ul class="list-disc text-xs">
                  <li
                    v-for="(item, index) in currentJobApp?.jobListing?.benefits"
                    :key="index"
                  >
                    {{ item }}
                  </li>
                </ul>
              </div>
            </div>

            <!--  -->
            <div class="px-6">
              <h1 class="font-black text-sm">Must have Skills</h1>
              <ul class="space-y-1 list-disc pl-6 py-2 text-xs md:text-sm">
                <li
                  v-for="(skill, index) in currentJobApp?.jobListing.skills"
                  :key="index"
                  class="text-xs"
                >
                  {{ skill }}
                </li>
              </ul>
            </div>
            <!--  -->
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div
      v-if="showModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 backdrop-blur-sm backdrop-opacity-2 backdrop-filter"
    >
      <div
        class="bg-white p-0 rounded-lg w-full max-w-4xl relative overflow-hidden"
      >
        <!-- Close button -->
        <button
          @click="showModal = false"
          class="absolute top-16 right-5 bg-white border-2 rounded-full p-2"
        >
          <svg
            class="w-6 h-6"
            width="70"
            height="84"
            viewBox="0 0 70 84"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M64.2692 60.7312C64.5014 60.9635 64.6857 61.2392 64.8114 61.5427C64.9371 61.8462 65.0018 62.1714 65.0018 62.4999C65.0018 62.8284 64.9371 63.1537 64.8114 63.4572C64.6857 63.7607 64.5014 64.0364 64.2692 64.2687C64.0369 64.501 63.7611 64.6852 63.4577 64.8109C63.1542 64.9366 62.8289 65.0013 62.5004 65.0013C62.1719 65.0013 61.8467 64.9366 61.5432 64.8109C61.2397 64.6852 60.9639 64.501 60.7317 64.2687L40.0004 43.5343L19.2692 64.2687C18.8001 64.7378 18.1638 65.0013 17.5004 65.0013C16.837 65.0013 16.2008 64.7378 15.7317 64.2687C15.2626 63.7996 14.999 63.1633 14.999 62.4999C14.999 61.8365 15.2626 61.2003 15.7317 60.7312L36.466 39.9999L15.7317 19.2687C15.2626 18.7996 14.999 18.1633 14.999 17.4999C14.999 16.8365 15.2626 16.2003 15.7317 15.7312C16.2008 15.2621 16.837 14.9985 17.5004 14.9985C18.1638 14.9985 18.8001 15.2621 19.2692 15.7312L40.0004 36.4656L60.7317 15.7312C61.2008 15.2621 61.837 14.9985 62.5004 14.9985C63.1638 14.9985 63.8001 15.2621 64.2692 15.7312C64.7383 16.2003 65.0018 16.8365 65.0018 17.4999C65.0018 18.1633 64.7383 18.7996 64.2692 19.2687L43.5348 39.9999L64.2692 60.7312Z"
              fill="#343330"
            />
          </svg>
        </button>

        <!-- PDF Display Area -->
        <iframe
          :src="`https://drive.google.com/viewerng/viewer?embedded=true&url=${
            mapUserDetails(currentJobApp?.user)?.resumeResource?.resumeCv?.url
          }`"
          class="w-full h-[90vh] border-0"
          style="display: block"
          frameborder="0"
          defer
        ></iframe>
      </div>
    </div>
    <!-- Modal -->
    <!-- Reject Modal -->
    <dialog
      ref="modalTrigger"
      id="delete_modal"
      class="modal text-black-950 backdrop-blur-sm backdrop-opacity-2 backdrop-filter"
    >
      <div class="modal-box flex-col max-w-md flex items-center space-y-3">
        <div
          class="flex items-center justify-between w-full pb-3 -mt-3 border-b-2"
        >
          <div class="text-white">no text.</div>
          <h3 class="text-lg font-bold">Please give a feedback</h3>

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

        <p class="py-2 text-sm text-center">
          Do you want to want to reject this applicant ?
        </p>

        <div class="flex flex-col w-full">
          <label for="first-name" class="text-sm mb-2">Enter a message</label>
          <textarea
            v-model="jobAppStatusFormData.rejectionNotice"
            :disabled="isLoading"
            @change="v$.rejectionNotice.$touch"
            name="details"
            rows="8"
            class="border pl-2 border-black-200 rounded-8 w-full"
            placeholder="Enter message to applicant"
          />

          <div
            class="input-errors"
            v-for="error of v$.rejectionNotice.$errors"
            :key="error.$uid"
          >
            <span class="text-xs text-danger-500">* {{ error.$message }}</span>
          </div>
        </div>

        <div class="space-x-4 flex items-center justify-between w-full">
          <BtnPrimary
            @click="rejectOrInterview(JOB_APPLICATION_STATUS.REJECTED)"
            :isLoading="isChangingStatus"
            :disabled="isChangingStatus"
            class="rounded-8 px-3.5 py-2 text-white text-xs bg-primary-1 !flex-1"
          >
            <template #text>
              {{ !isChangingStatus ? 'Yes, Reject Applicant' : 'Loading...' }}
            </template>
          </BtnPrimary>
          <form method="dialog" class="flex-1">
            <button
              class="md:px-3.5 w-full md:w-full border text-black-600 rounded-8 py-1"
            >
              No, Cancel
            </button>
          </form>
        </div>
      </div>
    </dialog>
    <!-- Modal -->

    <!-- Interview Modal -->
    <dialog
      ref="modalInterviewTrigger"
      id="delete_modal"
      class="modal text-black-950 backdrop-blur-sm backdrop-opacity-2 backdrop-filter"
    >
      <div class="modal-box flex-col max-w-md flex items-center space-y-3">
        <div
          class="flex items-center justify-between w-full pb-3 -mt-3 border-b-2"
        >
          <div class="text-white">no text.</div>
          <h3 class="text-lg font-bold">Interview Note</h3>

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

        <p class="py-2 text-sm text-center">Add some notes</p>

        <div class="flex flex-col w-full">
          <label for="message" class="text-sm mb-2">Enter a message</label>
          <textarea
            v-model="jobAppStatusInterviewFormData.interviewNotice"
            :disabled="isLoading"
            @change="v2$.interviewNotice.$touch"
            name="details"
            rows="8"
            class="border pl-2 border-black-200 rounded-8 w-full"
            placeholder="Enter message to applicant"
          />

          <div
            class="input-errors"
            v-for="error of v2$.interviewNotice.$errors"
            :key="error.$uid"
          >
            <span class="text-xs text-danger-500">* {{ error.$message }}</span>
          </div>
        </div>

        <div class="space-x-4 flex items-center justify-between w-full">
          <BtnPrimary
            @click="rejectOrInterview(JOB_APPLICATION_STATUS.INTERVIEW)"
            :isLoading="isChangingStatus"
            :disabled="isChangingStatus"
            class="rounded-8 px-3.5 py-2 text-white text-xs bg-primary-1 !flex-1"
          >
            <template #text>
              {{ !isChangingStatus ? 'Send Interview Message' : 'Loading...' }}
            </template>
          </BtnPrimary>
          <form method="dialog" class="flex-1">
            <button
              class="md:px-3.5 w-full md:w-full border text-black-600 rounded-8 py-1"
            >
              No, Cancel
            </button>
          </form>
        </div>
      </div>
    </dialog>
    <!-- Modal -->

    <!-- Hire Modal -->
    <dialog
      ref="modalHireTrigger"
      id="hire_modal"
      class="modal text-black-950 backdrop-blur-sm backdrop-opacity-2 backdrop-filter"
    >
      <div class="modal-box flex-col max-w-md flex items-center space-y-3">
        <div
          class="flex items-center justify-between w-full pb-3 -mt-3 border-b-2"
        >
          <div class="text-white">no text.</div>
          <h3 class="text-lg font-bold">Add Note</h3>

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

        <p class="py-2 text-sm text-center">
          Send a congratulatory message to applicant
        </p>

        <div class="flex flex-col w-full">
          <label for="first-name" class="text-sm mb-2">Message</label>
          <textarea
            v-model="jobAppStatusHireFormData.acceptanceMessage"
            :disabled="isLoading"
            @change="v3$.acceptanceMessage.$touch"
            name="details"
            rows="8"
            class="border pl-2 border-black-200 rounded-8 w-full"
            placeholder="Enter message"
          />

          <div
            class="input-errors"
            v-for="error of v3$.acceptanceMessage.$errors"
            :key="error.$uid"
          >
            <span class="text-xs text-danger-500">* {{ error.$message }}</span>
          </div>
        </div>

        <div class="space-x-4 flex items-center justify-between w-full">
          <BtnPrimary
            @click="rejectOrInterview(JOB_APPLICATION_STATUS.ACCEPTED)"
            :isLoading="isChangingStatus"
            :disabled="isChangingStatus"
            class="rounded-8 px-3.5 py-2 text-white text-xs bg-primary-1 !flex-1"
          >
            <template #text>
              {{ !isChangingStatus ? 'Continue' : 'Loading...' }}
            </template>
          </BtnPrimary>
          <form method="dialog" class="flex-1">
            <button
              class="md:px-3.5 w-full md:w-full border text-black-600 rounded-8 py-1"
            >
              No, Cancel
            </button>
          </form>
        </div>
      </div>
    </dialog>
    <!-- Modal -->
  </div>
</template>
<style scoped>
/* Full screen modal with the PDF and no borders or scrollbars */
body {
  overflow: hidden; /* Disable body scroll when modal is open */
}

.modal-open iframe {
  border: none;
  overflow: hidden;
}
</style>
