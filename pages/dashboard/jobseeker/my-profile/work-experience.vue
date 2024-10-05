<script setup lang="ts">
import useVuelidate from '@vuelidate/core';
import { helpers, required, url, requiredIf } from '@vuelidate/validators';
import { POSITION, useToast } from 'vue-toastification';
import type {
  ApiErrorResponse,
  ApiSuccessResponse,
  IUserDetails,
  IWorkExperience,
} from '~/types';

definePageMeta({
  title: 'My profile',
  pageName: 'dashboard.jobseeker.my-profile.work-experience',
  layout: 'dashboard',
  middleware: ['auth', 'is-jobseeker'],
});

const userStore = useUserStore();
const authStore = useAuthStore();
const userData = computed<IUserDetails>(() => userStore.loggedInUserDetails);
const isLoading = ref<boolean>(false);
const isEdit = ref<boolean>(false);
const isEditEducation = ref<boolean>(false);
const isDeleting = ref<boolean>(false);
const isAddWorkExperience = ref<boolean>(false);
  const isAddEducation= ref<boolean>(false);


const selectedIndex = ref<number | null>(null);
const modalTrigger = ref(null);

const toast = useToast();

const workExperienceFormData = reactive({
  companyOrganization: '',
  website: '',
  companyLocation: '',
  jobTitle: '',
  startingFrom: '',
  endingIn: '',
  presentlyWorking: false,
  details: '',
});

const educationFormData = reactive({
  schoolName: '',
  fieldOfStudy: '',
  degree: '',
  startingYear: '',
  endingYear: '',
});

const eduRules = computed(() => {
  return {
    schoolName: {
      required: helpers.withMessage('School name is required', required),
    },
    degree: {
      required: helpers.withMessage('Degree is required', required),
    },
    fieldOfStudy: {
      required: helpers.withMessage('Course of study is required', required),
    },
    startingYear: {
      required: helpers.withMessage('Start year is required', required),
    },
    endingYear: {
      requiredIf: helpers.withMessage(
        'End year is required',
        requiredIf(workExperienceFormData.presentlyWorking === false)
      ),
    },
  };
});

const rules = computed(() => {
  return {
    companyOrganization: {
      required: helpers.withMessage('Company is required', required),
    },
    website: {
      url: helpers.withMessage('Website must be a valid url', url),
    },
    companyLocation: {
      required: helpers.withMessage('Location is required', required),
    },
    jobTitle: {
      required: helpers.withMessage('Job title is required', required),
    },
    startingFrom: {
      required: helpers.withMessage('Start date is required', required),
    },
    endingIn: {
      requiredIf: helpers.withMessage(
        'End date is required',
        requiredIf(workExperienceFormData.presentlyWorking === false)
      ),
    },
    presentlyWorking: {
      requiredIf: helpers.withMessage(
        'Presently working is required',
        requiredIf(!workExperienceFormData?.endingIn)
      ),
    },
    details: {
      required: helpers.withMessage('Details about work is required', required),
    },
  };
});

const v$ = useVuelidate(rules, workExperienceFormData);
const v2$ = useVuelidate(eduRules, educationFormData);

const showDeleteModal = async () => {
  (modalTrigger.value as unknown as any).showModal();
};

const hideDeleteModal = async () => {
  (modalTrigger.value as unknown as any).close();
};

const userWorkExperience = computed<IWorkExperience[]>(
  () => userStore.workExperience
);

const setEditWorkExperience = (index: number) => {
  isEdit.value = true;
  workExperienceFormData.companyOrganization =
    userWorkExperience.value[index].companyOrganization;
  workExperienceFormData.website =
    userWorkExperience.value[index]?.website || '';
  workExperienceFormData.companyLocation =
    userWorkExperience.value[index]?.companyLocation;
  workExperienceFormData.jobTitle = userWorkExperience.value[index]?.jobTitle;
  workExperienceFormData.startingFrom = formatDateForInput(
    userWorkExperience.value[index]?.startingFrom
  );
  workExperienceFormData.endingIn = formatDateForInput(
    userWorkExperience.value[index]?.endingIn
  );
  workExperienceFormData.presentlyWorking =
    (userWorkExperience.value[index]?.presentlyWorking as boolean) || false;
  workExperienceFormData.details = userWorkExperience.value[index]?.details;

  selectedIndex.value = index;
};

const resetForm = () => {
  isEdit.value = false;
  workExperienceFormData.companyOrganization = '';
  workExperienceFormData.website = '';
  workExperienceFormData.companyLocation = '';
  workExperienceFormData.jobTitle = '';
  workExperienceFormData.startingFrom = '';
  workExperienceFormData.endingIn = '';
  workExperienceFormData.presentlyWorking = false;
  workExperienceFormData.details = '';

  v$.value.$reset();
};

const resetEduForm = () => {
  isEditEducation.value = false;
  educationFormData.schoolName = '';
  educationFormData.endingYear = '';
  educationFormData.startingYear = '';
  educationFormData.fieldOfStudy = '';
  educationFormData.degree = '';

  v$.value.$reset();
};

const handleAddExperience = async () => {
  isLoading.value = true;
  const isValidForm = await v$.value.$validate();
  if (!isValidForm) {
    toast.error('Please fill all fields correctly', {
      timeout: 3000,
      position: POSITION.TOP_RIGHT,
    });

    setTimeout(() => {
      isLoading.value = false;
    }, 2000);
    return;
  }

  try {
    const token = authStore.userToken;
    await $fetch('/api/jobseeker/work-experience/add', {
      method: 'POST',
      body: workExperienceFormData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    toast.success('Work experience was added', {
      timeout: 3000,
      position: POSITION.TOP_RIGHT,
    });

    setTimeout(() => {
      isLoading.value = false;
    }, 500);

    resetForm();
    await fetchWorkExperience();
  } catch (error: any) {
    const errorData = error.data as ApiErrorResponse;

    toast.error('An error occurred try again', {
      timeout: 3000,
      position: POSITION.TOP_RIGHT,
    });

    setTimeout(() => {
      isLoading.value = false;
    }, 2000);
  }
};

const handleEditExperience = async () => {
  isLoading.value = true;
  const isValidForm = await v$.value.$validate();
  if (!isValidForm) {
    toast.error('Please fill all fields correctly', {
      timeout: 3000,
      position: POSITION.TOP_RIGHT,
    });

    setTimeout(() => {
      isLoading.value = false;
    }, 2000);
    return;
  }

  if (selectedIndex.value === null) {
    toast.warning('Please select an experience to edit', {
      timeout: 3000,
      position: POSITION.TOP_RIGHT,
    });
  }

  try {
    const token = authStore.userToken;
    await $fetch('/api/jobseeker/work-experience/update', {
      method: 'POST',
      body: workExperienceFormData,
      query: {
        workExperienceId:
          userWorkExperience.value[selectedIndex.value as number].id,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    toast.success('Work experience was updated', {
      timeout: 3000,
      position: POSITION.TOP_RIGHT,
    });

    setTimeout(() => {
      isLoading.value = false;
    }, 500);

    resetForm();
    await fetchWorkExperience();
  } catch (error: any) {
    const errorData = error.data as ApiErrorResponse;

    toast.error('An error occurred try again', {
      timeout: 3000,
      position: POSITION.TOP_RIGHT,
    });

    setTimeout(() => {
      isLoading.value = false;
    }, 2000);
  }
};

const handleDeleteExperience = async () => {
  isDeleting.value = true;
  if (selectedIndex.value === null) {
    toast.warning('Please select an experience to delete', {
      timeout: 3000,
      position: POSITION.TOP_RIGHT,
    });
  }

  try {
    const token = authStore.userToken;
    await $fetch('/api/jobseeker/work-experience/delete', {
      query: {
        workExperienceId:
          userWorkExperience.value[selectedIndex.value as number].id,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    toast.success('Work experience was deleted', {
      timeout: 3000,
      position: POSITION.TOP_RIGHT,
    });

    setTimeout(() => {
      isLoading.value = false;
      isDeleting.value = true;
    }, 500);

    resetForm();
    setTimeout(() => {
      hideDeleteModal();
    }, 1000);
    await fetchWorkExperience();
  } catch (error: any) {
    const errorData = error.data as ApiErrorResponse;

    toast.error('An error occurred try again', {
      timeout: 3000,
      position: POSITION.TOP_RIGHT,
    });

    setTimeout(() => {
      isLoading.value = false;
      isDeleting.value = true;
      isEdit.value = false;
    }, 2000);
  }
};

const fetchWorkExperience = async () => {
  isLoading.value = true;

  try {
    if (!userStore.recruiters.length) {
      isLoading.value = true;
    }
    const token = authStore.userToken;
    const response = await userStore.$api.refreshUserWorkExperience(token);
    const responseData = response as ApiSuccessResponse;

    userStore.setWorkExperience(responseData.data);

    setTimeout(() => {
      isLoading.value = false;
    }, 1000);
  } catch (e) {
    console.log(e);
  }
};

onBeforeMount(async () => {
  // fetch experience
  await fetchWorkExperience();
});
</script>

<template>
  <div class="text-black-600 w-full h-full">
    <div class="flex flex-col md:flex-row md:gap-x-4">
      <div class="md:w-2/3 w-full h-full">
        <div
          class="bg-white md:w-1/3 rounded-lg p-3 h-full flex flex-col md:flex-row items-center md:space-x-2 md:hidden mb-2"
        >
          <div
            class="bg-black-50 flex space-x-2 p-2 w-full items-center md:justify-center justify-between rounded-8"
          >
            <span>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="24" height="24" rx="4.8" fill="#0A66C2" />
                <path
                  d="M5.10034 6.08908C5.10034 5.54346 5.55712 5.10059 6.1202 5.10059H17.8799C18.4432 5.10059 18.8998 5.54346 18.8998 6.08908V17.9117C18.8998 18.4574 18.4432 18.9 17.8799 18.9H6.1202C5.55718 18.9 5.10034 18.4575 5.10034 17.9118V6.08892V6.08908Z"
                  fill="white"
                />
                <path
                  d="M9.29385 16.6487V10.4362H7.22889V16.6487H9.29406H9.29385ZM8.2618 9.58813C8.98174 9.58813 9.42995 9.11108 9.42995 8.5149C9.41648 7.90514 8.98174 7.44141 8.27549 7.44141C7.56876 7.44141 7.10718 7.90514 7.10718 8.51485C7.10718 9.11103 7.55523 9.58808 8.24827 9.58808H8.26164L8.2618 9.58813ZM10.4368 16.6487H12.5016V13.1798C12.5016 12.9943 12.5151 12.8084 12.5696 12.676C12.7189 12.3048 13.0586 11.9207 13.6292 11.9207C14.3762 11.9207 14.6752 12.4903 14.6752 13.3256V16.6487H16.7399V13.0867C16.7399 11.1785 15.7214 10.2906 14.3628 10.2906C13.249 10.2906 12.7598 10.9131 12.488 11.3371H12.5018V10.4364H10.4369C10.4639 11.0192 10.4368 16.649 10.4368 16.649L10.4368 16.6487Z"
                  fill="#0A66C2"
                />
              </svg>
            </span>
            <h1 class="text-xs">Import linkedin profile</h1>
            <button>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22.5 12.75V18.75C22.5 19.1478 22.342 19.5294 22.0607 19.8107C21.7794 20.092 21.3978 20.25 21 20.25H3C2.60218 20.25 2.22064 20.092 1.93934 19.8107C1.65804 19.5294 1.5 19.1478 1.5 18.75V12.75C1.5 12.3522 1.65804 11.9706 1.93934 11.6893C2.22064 11.408 2.60218 11.25 3 11.25H6.75C6.94891 11.25 7.13968 11.329 7.28033 11.4697C7.42098 11.6103 7.5 11.8011 7.5 12C7.5 12.1989 7.42098 12.3897 7.28033 12.5303C7.13968 12.671 6.94891 12.75 6.75 12.75H3V18.75H21V12.75H17.25C17.0511 12.75 16.8603 12.671 16.7197 12.5303C16.579 12.3897 16.5 12.1989 16.5 12C16.5 11.8011 16.579 11.6103 16.7197 11.4697C16.8603 11.329 17.0511 11.25 17.25 11.25H21C21.3978 11.25 21.7794 11.408 22.0607 11.6893C22.342 11.9706 22.5 12.3522 22.5 12.75ZM11.4694 12.5306C11.539 12.6004 11.6217 12.6557 11.7128 12.6934C11.8038 12.7312 11.9014 12.7506 12 12.7506C12.0986 12.7506 12.1962 12.7312 12.2872 12.6934C12.3783 12.6557 12.461 12.6004 12.5306 12.5306L17.0306 8.03063C17.1714 7.88989 17.2504 7.69902 17.2504 7.5C17.2504 7.30098 17.1714 7.11011 17.0306 6.96937C16.8899 6.82864 16.699 6.74958 16.5 6.74958C16.301 6.74958 16.1101 6.82864 15.9694 6.96937L12.75 10.1897V2.25C12.75 2.05109 12.671 1.86032 12.5303 1.71967C12.3897 1.57902 12.1989 1.5 12 1.5C11.8011 1.5 11.6103 1.57902 11.4697 1.71967C11.329 1.86032 11.25 2.05109 11.25 2.25V10.1897L8.03063 6.96937C7.88989 6.82864 7.69902 6.74958 7.5 6.74958C7.30098 6.74958 7.11011 6.82864 6.96938 6.96938C6.82864 7.11011 6.74958 7.30098 6.74958 7.5C6.74958 7.69902 6.82864 7.88989 6.96937 8.03063L11.4694 12.5306ZM18.75 15.75C18.75 15.5275 18.684 15.31 18.5604 15.125C18.4368 14.94 18.2611 14.7958 18.0555 14.7106C17.85 14.6255 17.6238 14.6032 17.4055 14.6466C17.1873 14.69 16.9868 14.7972 16.8295 14.9545C16.6722 15.1118 16.565 15.3123 16.5216 15.5305C16.4782 15.7488 16.5005 15.975 16.5856 16.1805C16.6708 16.3861 16.815 16.5618 17 16.6854C17.185 16.809 17.4025 16.875 17.625 16.875C17.9234 16.875 18.2095 16.7565 18.4205 16.5455C18.6315 16.3345 18.75 16.0484 18.75 15.75Z"
                  fill="#343330"
                />
              </svg>
            </button>
          </div>
          <!--  -->
          <div class="bg-black-200 w-px hidden md:flex text-white">2</div>
          <!--  -->
          <div
            class="bg-black-50 flex space-x-2 p-2 w-full items-center rounded-8 mt-2 md:mt-2 justify-between"
          >
            <h1 class="text-xs">Import from resume</h1>
            <button>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22.5 12.75V18.75C22.5 19.1478 22.342 19.5294 22.0607 19.8107C21.7794 20.092 21.3978 20.25 21 20.25H3C2.60218 20.25 2.22064 20.092 1.93934 19.8107C1.65804 19.5294 1.5 19.1478 1.5 18.75V12.75C1.5 12.3522 1.65804 11.9706 1.93934 11.6893C2.22064 11.408 2.60218 11.25 3 11.25H6.75C6.94891 11.25 7.13968 11.329 7.28033 11.4697C7.42098 11.6103 7.5 11.8011 7.5 12C7.5 12.1989 7.42098 12.3897 7.28033 12.5303C7.13968 12.671 6.94891 12.75 6.75 12.75H3V18.75H21V12.75H17.25C17.0511 12.75 16.8603 12.671 16.7197 12.5303C16.579 12.3897 16.5 12.1989 16.5 12C16.5 11.8011 16.579 11.6103 16.7197 11.4697C16.8603 11.329 17.0511 11.25 17.25 11.25H21C21.3978 11.25 21.7794 11.408 22.0607 11.6893C22.342 11.9706 22.5 12.3522 22.5 12.75ZM11.4694 12.5306C11.539 12.6004 11.6217 12.6557 11.7128 12.6934C11.8038 12.7312 11.9014 12.7506 12 12.7506C12.0986 12.7506 12.1962 12.7312 12.2872 12.6934C12.3783 12.6557 12.461 12.6004 12.5306 12.5306L17.0306 8.03063C17.1714 7.88989 17.2504 7.69902 17.2504 7.5C17.2504 7.30098 17.1714 7.11011 17.0306 6.96937C16.8899 6.82864 16.699 6.74958 16.5 6.74958C16.301 6.74958 16.1101 6.82864 15.9694 6.96937L12.75 10.1897V2.25C12.75 2.05109 12.671 1.86032 12.5303 1.71967C12.3897 1.57902 12.1989 1.5 12 1.5C11.8011 1.5 11.6103 1.57902 11.4697 1.71967C11.329 1.86032 11.25 2.05109 11.25 2.25V10.1897L8.03063 6.96937C7.88989 6.82864 7.69902 6.74958 7.5 6.74958C7.30098 6.74958 7.11011 6.82864 6.96938 6.96938C6.82864 7.11011 6.74958 7.30098 6.74958 7.5C6.74958 7.69902 6.82864 7.88989 6.96937 8.03063L11.4694 12.5306ZM18.75 15.75C18.75 15.5275 18.684 15.31 18.5604 15.125C18.4368 14.94 18.2611 14.7958 18.0555 14.7106C17.85 14.6255 17.6238 14.6032 17.4055 14.6466C17.1873 14.69 16.9868 14.7972 16.8295 14.9545C16.6722 15.1118 16.565 15.3123 16.5216 15.5305C16.4782 15.7488 16.5005 15.975 16.5856 16.1805C16.6708 16.3861 16.815 16.5618 17 16.6854C17.185 16.809 17.4025 16.875 17.625 16.875C17.9234 16.875 18.2095 16.7565 18.4205 16.5455C18.6315 16.3345 18.75 16.0484 18.75 15.75Z"
                  fill="#343330"
                />
              </svg>
            </button>
          </div>
        </div>
        <!--  -->
        <div class="bg-white p-4 rounded-10 font-[Nexa]">
          <h1 class="text-xl font-black">Work Experience</h1>
          <p class="text-xs">Showcase your previous roles and experiences</p>

          <!-- form -->
          <div class="md:border rounded-10 md:px-4 md:pb-4 mt-4">
            <div>
              <div class="w-full" v-show="isAddWorkExperience">
                <div class="md:w-2/3 md:p-2 space-y-2">
                  <div
                    class="flex flex-col md:flex-row gap-x-2 gap-y-2 md:gap-y-0"
                  >
                    <div class="flex flex-col w-full">
                      <label for="first-name" class="text-sm mb-2"
                        >Company / Organization</label
                      >
                      <input
                        type="text"
                        v-model="workExperienceFormData.companyOrganization"
                        :disabled="isLoading"
                        @change="v$.companyOrganization.$touch"
                        placeholder="Enter Organization name"
                        class="pl-2 placeholder:text-sm pr-4 h-11 outline-none border border-gray-300 rounded-md"
                      />

                      <div
                        class="input-errors"
                        v-for="error of v$.companyOrganization.$errors"
                        :key="error.$uid"
                      >
                        <span class="text-xs text-danger-500"
                          >* {{ error.$message }}</span
                        >
                      </div>
                    </div>
                    <div class="flex flex-col w-full">
                      <label for="first-name" class="text-sm mb-2"
                        >Website <span class="text-xs">(optional)</span></label
                      >
                      <input
                        type="text"
                        v-model="workExperienceFormData.website"
                        :disabled="isLoading"
                        @change="v$.website.$touch"
                        placeholder="https://"
                        class="pl-2 placeholder:text-sm pr-4 h-11 outline-none border border-gray-300 rounded-md"
                      />

                      <div
                        class="input-errors"
                        v-for="error of v$.website.$errors"
                        :key="error.$uid"
                      >
                        <span class="text-xs text-danger-500"
                          >* {{ error.$message }}</span
                        >
                      </div>
                    </div>
                  </div>

                  <div class="flex flex-col w-full">
                    <label for="location" class="text-sm mb-2">Location</label>
                    <div class="w-full">
                      <input
                        type="text"
                        v-model="workExperienceFormData.companyLocation"
                        :disabled="isLoading"
                        @change="v$.companyLocation.$touch"
                        placeholder="Enter location"
                        class="pl-2 placeholder:text-sm pr-4 h-11 w-full outline-none border rel border-gray-300 rounded-md"
                      />

                      <div
                        class="input-errors"
                        v-for="error of v$.companyLocation.$errors"
                        :key="error.$uid"
                      >
                        <span class="text-xs text-danger-500"
                          >* {{ error.$message }}</span
                        >
                      </div>
                    </div>
                  </div>
                </div>
                <div class="border-b-2 py-2 w-full" />
                <div class="py-4 divide-black-600 md:w-2/3 md:p-2 space-y-2">
                  <div class="flex flex-col w-full">
                    <label for="position" class="text-sm mb-2">Position</label>
                    <div class="relative w-full">
                      <input
                        type="text"
                        v-model="workExperienceFormData.jobTitle"
                        :disabled="isLoading"
                        @change="v$.jobTitle.$touch"
                        placeholder="Enter position"
                        class="pl-2 placeholder:text-sm pr-4 h-11 w-full outline-none border rel border-gray-300 rounded-md"
                      />

                      <div
                        class="input-errors"
                        v-for="error of v$.jobTitle.$errors"
                        :key="error.$uid"
                      >
                        <span class="text-xs text-danger-500"
                          >* {{ error.$message }}</span
                        >
                      </div>
                    </div>
                  </div>

                  <div class="flex flex-col w-full items-start justify-start">
                    <label for="presentlyWorking" class="text-sm mb-2"
                      >Presently Working here</label
                    >
                    <div class="w-full flex items-center space-x-2">
                      <input
                        type="checkbox"
                        v-model="workExperienceFormData.presentlyWorking"
                        :disabled="isLoading"
                        @change="v$.presentlyWorking.$touch"
                        class="h-5 w-5 outline-none rounded-md self-start"
                      />
                      <span>Yes</span>
                    </div>

                    <div
                      class="input-errors"
                      v-for="error of v$.presentlyWorking.$errors"
                      :key="error.$uid"
                    >
                      <span class="text-xs text-danger-500"
                        >* {{ error.$message }}</span
                      >
                    </div>
                  </div>
                  <!--  -->
                  <div
                    class="py-4 divide-black-600 grid md:grid-cols-2 items-center w-full md:space-x-2"
                  >
                    <div class="flex flex-col w-full">
                      <label for="first-name" class="text-sm mb-2"
                        >Starting From</label
                      >
                      <div class="relative w-full">
                        <input
                          type="date"
                          placeholder="Choose start date"
                          v-model="workExperienceFormData.startingFrom"
                          :disabled="isLoading"
                          @change="v$.startingFrom.$touch"
                          class="pl-2 placeholder:text-sm pr-4 h-11 w-full outline-none border rel border-gray-300 rounded-md"
                        />

                        <div
                          class="input-errors"
                          v-for="error of v$.startingFrom.$errors"
                          :key="error.$uid"
                        >
                          <span class="text-xs text-danger-500"
                            >* {{ error.$message }}</span
                          >
                        </div>
                      </div>
                    </div>

                    <div
                      v-if="!workExperienceFormData?.presentlyWorking"
                      class="flex flex-col w-full"
                    >
                      <label for="first-name" class="text-sm mb-2"
                        >End Date</label
                      >
                      <div class="relative w-full">
                        <input
                          type="date"
                          placeholder="Choose end date"
                          v-model="workExperienceFormData.endingIn"
                          :disabled="isLoading"
                          @change="v$.endingIn.$touch"
                          class="pl-2 placeholder:text-sm pr-4 h-11 w-full outline-none border rel border-gray-300 rounded-md"
                        />

                        <div
                          class="input-errors"
                          v-for="error of v$.endingIn.$errors"
                          :key="error.$uid"
                        >
                          <span class="text-xs text-danger-500"
                            >* {{ error.$message }}</span
                          >
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="flex flex-col">
                    <label for="first-name" class="text-sm mb-2">Details</label>
                    <textarea
                      v-model="workExperienceFormData.details"
                      :disabled="isLoading"
                      @change="v$.details.$touch"
                      name="details"
                      rows="8"
                      class="border pl-2 border-black-200 rounded-8 w-full"
                      placeholder="Enter details about work experience"
                    />

                    <div
                      class="input-errors"
                      v-for="error of v$.details.$errors"
                      :key="error.$uid"
                    >
                      <span class="text-xs text-danger-500"
                        >* {{ error.$message }}</span
                      >
                    </div>
                  </div>
                </div>
                <div
                  class="flex flex-col w-full md:w-auto items-center md:flex-row md:space-y-0 space-x-0 space-y-3 md:space-x-3 text-xs md:pl-2"
                >
                  <BtnSuccess
                    v-if="!isEdit"
                    @click="handleAddExperience()"
                    :isLoading="isLoading"
                    :disabled="isLoading"
                  >
                    <template #text>
                      {{ !isLoading ? 'Save changes' : 'Saving...' }}
                    </template>
                  </BtnSuccess>

                  <BtnSuccess
                    v-if="isEdit"
                    @click="handleEditExperience()"
                    :isLoading="isLoading"
                    :disabled="isLoading"
                  >
                    <template #text>
                      {{ !isLoading ? 'Update changes' : 'Updating...' }}
                    </template>
                  </BtnSuccess>

                  <button
                    @click="resetForm()"
                    class="md:px-3.5 w-full md:w-auto border text-black-600 rounded-8 py-2"
                  >
                    Cancel
                  </button>

                  <button
                    v-if="isEdit"
                    @click="showDeleteModal()"
                    class="md:px-3.5 w-full md:w-auto text-info-600 py-3"
                  >
                    Delete this work experience
                  </button>
                </div>
              </div>

              <!--  list -->
              <div class="space-y-3 w-full h-full">
                <div
                  v-for="(experience, index) in userWorkExperience"
                  :key="index"
                  class="flex justify-between p-4 mt-4 bg-black-50 items-center rounded-10"
                >
                  <ul class="space-y-2 pl-4">
                    <li class="text-sm font-black text-info-600 list-disc">
                      {{ experience.jobTitle }} at
                      {{ experience.companyOrganization }}
                    </li>
                    <div class="flex gap-x-3">
                      <h1 class="font-black text-xs">
                        {{
                          formatExperienceDates(
                            experience.startingFrom,
                            experience?.endingIn
                          )
                        }}
                      </h1>
                      <h1 class="font-blacl text-xs">
                        {{ experience.companyLocation }}
                      </h1>
                    </div>

                    <p class="text-xs tracking-wider">
                      {{ experience.details }}
                    </p>
                  </ul>
                  <button @click="setEditWorkExperience(index)">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M21.3103 6.87817L17.1216 2.68848C16.9823 2.54916 16.8169 2.43864 16.6349 2.36324C16.4529 2.28783 16.2578 2.24902 16.0608 2.24902C15.8638 2.24902 15.6687 2.28783 15.4867 2.36324C15.3047 2.43864 15.1393 2.54916 15 2.68848L3.43969 14.2497C3.2998 14.3885 3.18889 14.5537 3.11341 14.7358C3.03792 14.9178 2.99938 15.113 3.00001 15.31V19.4997C3.00001 19.8976 3.15804 20.2791 3.43935 20.5604C3.72065 20.8417 4.10218 20.9997 4.50001 20.9997H8.6897C8.88675 21.0004 9.08197 20.9618 9.26399 20.8863C9.44602 20.8109 9.61122 20.6999 9.75001 20.56L21.3103 8.99973C21.4496 8.86044 21.5602 8.69507 21.6356 8.51306C21.711 8.33105 21.7498 8.13596 21.7498 7.93895C21.7498 7.74194 21.711 7.54686 21.6356 7.36485C21.5602 7.18284 21.4496 7.01747 21.3103 6.87817ZM8.6897 19.4997H4.50001V15.31L12.75 7.06005L16.9397 11.2497L8.6897 19.4997ZM18 10.1885L13.8103 5.99973L16.0603 3.74973L20.25 7.93848L18 10.1885Z"
                        fill="#343330"
                      />
                    </svg>
                  </button>
                </div>

                <button
                  @click="isAddWorkExperience = !isAddWorkExperience"
                  class="text-info-600 text-xs items-center flex gap-x-3 mt-2 py-4"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17.5 10C17.5 10.1658 17.4342 10.3247 17.3169 10.4419C17.1997 10.5592 17.0408 10.625 16.875 10.625H10.625V16.875C10.625 17.0408 10.5592 17.1997 10.4419 17.3169C10.3247 17.4342 10.1658 17.5 10 17.5C9.83424 17.5 9.67527 17.4342 9.55806 17.3169C9.44085 17.1997 9.375 17.0408 9.375 16.875V10.625H3.125C2.95924 10.625 2.80027 10.5592 2.68306 10.4419C2.56585 10.3247 2.5 10.1658 2.5 10C2.5 9.83424 2.56585 9.67527 2.68306 9.55806C2.80027 9.44085 2.95924 9.375 3.125 9.375H9.375V3.125C9.375 2.95924 9.44085 2.80027 9.55806 2.68306C9.67527 2.56585 9.83424 2.5 10 2.5C10.1658 2.5 10.3247 2.56585 10.4419 2.68306C10.5592 2.80027 10.625 2.95924 10.625 3.125V9.375H16.875C17.0408 9.375 17.1997 9.44085 17.3169 9.55806C17.4342 9.67527 17.5 9.83424 17.5 10Z"
                      fill="#006EFF"
                    />
                  </svg>
                  Add Experience
                </button>
              </div>
            </div>
          </div>
        </div>
        <!-- education -->
        <div class="bg-white mt-4 rounded-10 space-y-3 p-5">
          <h1 class="text xl font-black font-[Georgia] text-black-600">
            Education
          </h1>

          <!-- edu form -->
          <div v-if="isAddEducation" class="w-full">
            <div class="md:w-2/3 md:p-2 space-y-2">
              <div class="flex flex-col md:flex-row gap-x-2 gap-y-2 md:gap-y-0">
                <div class="flex flex-col w-full">
                  <label for="first-name" class="text-sm mb-2"
                    >School Name</label
                  >
                  <input
                    type="text"
                    v-model="educationFormData.schoolName"
                    :disabled="isLoading"
                    @change="v2$.schoolName.$touch"
                    placeholder="Enter School name"
                    class="pl-2 placeholder:text-sm pr-4 h-11 outline-none border border-gray-300 rounded-md"
                  />

                  <div
                    class="input-errors"
                    v-for="error of v2$.schoolName.$errors"
                    :key="error.$uid"
                  >
                    <span class="text-xs text-danger-500"
                      >* {{ error.$message }}</span
                    >
                  </div>
                </div>
              </div>
            </div>
            <div class="border-b-2 py-2 w-full" />
            <div class="py-4 divide-black-600 md:w-2/3 md:p-2 space-y-2">
              <div class="flex flex-col w-full">
                <label for="fieldOfStudy" class="text-sm mb-2"
                  >Course of study</label
                >
                <div class="relative w-full">
                  <input
                    type="text"
                    v-model="educationFormData.fieldOfStudy"
                    :disabled="isLoading"
                    @change="v2$.fieldOfStudy.$touch"
                    placeholder="Enter course of study"
                    class="pl-2 placeholder:text-sm pr-4 h-11 w-full outline-none border rel border-gray-300 rounded-md"
                  />

                  <div
                    class="input-errors"
                    v-for="error of v2$.fieldOfStudy.$errors"
                    :key="error.$uid"
                  >
                    <span class="text-xs text-danger-500"
                      >* {{ error.$message }}</span
                    >
                  </div>
                </div>
              </div>
              <div class="flex flex-col w-full">
                <label for="fieldOfStudy" class="text-sm">Degree</label>
                <select
                  v-model="educationFormData.degree"
                  :disabled="isLoading"
                  @change="v2$.degree.$touch"
                  class="outline-none mt-2 bg-white w-full text-sm font-thin placeholder:font-thin placeholder:text-[#958D8D] rounded-lg px-3 py-2.5 border border-black-200 border-solid"
                >
                  <option value="" disabled>Select your degree</option>

                  <optgroup
                    v-for="group in schoolDegrees"
                    :label="group.label"
                    :key="group.label"
                  >
                    <option
                      v-for="degree in group.options"
                      :value="degree.value"
                      :key="degree.value"
                    >
                      {{ degree.text }}
                    </option>
                  </optgroup>
                </select>

                <div
                  class="input-errors"
                  v-for="error of v2$.degree.$errors"
                  :key="error.$uid"
                >
                  <span class="text-xs text-danger-500"
                    >* {{ error.$message }}</span
                  >
                </div>
              </div>
              <div
                class="py-4 divide-black-600 grid md:grid-cols-2 items-center w-full md:space-x-2"
              >
                <div class="flex flex-col w-full">
                  <label for="first-name" class="text-sm mb-2"
                    >Start Year</label
                  >
                  <div class="relative w-full">
                    <input
                      type="month"
                      placeholder="Choose start date"
                      v-model="educationFormData.startingYear"
                      :disabled="isLoading"
                      @change="v2$.startingYear.$touch"
                      class="pl-2 placeholder:text-sm pr-4 h-11 w-full outline-none border rel border-gray-300 rounded-md"
                    />

                    <div
                      class="input-errors"
                      v-for="error of v2$.startingYear.$errors"
                      :key="error.$uid"
                    >
                      <span class="text-xs text-danger-500"
                        >* {{ error.$message }}</span
                      >
                    </div>
                  </div>
                </div>
                <!--  -->
                <div class="flex flex-col w-full">
                  <label for="first-name" class="text-sm mb-2">End Year</label>
                  <div class="relative w-full">
                    <input
                      type="month"
                      placeholder="Choose end date"
                      v-model="educationFormData.endingYear"
                      :disabled="isLoading"
                      @change="v2$.endingYear.$touch"
                      class="pl-2 placeholder:text-sm pr-4 h-11 w-full outline-none border rel border-gray-300 rounded-md"
                    />

                    <div
                      class="input-errors"
                      v-for="error of v2$.endingYear.$errors"
                      :key="error.$uid"
                    >
                      <span class="text-xs text-danger-500"
                        >* {{ error.$message }}</span
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="flex flex-col w-full md:w-auto items-center md:flex-row md:space-y-0 space-x-0 space-y-3 md:space-x-3 text-xs md:pl-2"
            >
              <BtnSuccess
                v-if="!isEditEducation"
                :isLoading="isLoading"
                :disabled="isLoading"
              >
                <template #text>
                  {{ !isLoading ? 'Save changes' : 'Saving...' }}
                </template>
              </BtnSuccess>

              <BtnSuccess
                v-if="isEditEducation"
                :isLoading="isLoading"
                :disabled="isLoading"
              >
                <template #text>
                  {{ !isLoading ? 'Update Education' : 'Updating...' }}
                </template>
              </BtnSuccess>

              <button
                @click="resetEduForm()"
                class="md:px-3.5 w-full md:w-auto border text-black-600 rounded-8 py-2"
              >
                Cancel
              </button>

              <button
                v-if="isEdit"
                @click="showDeleteModal()"
                class="md:px-3.5 w-full md:w-auto text-info-600 py-3"
              >
                Delete this education
              </button>
            </div>
          </div>

          <!-- edu list -->
          <div class="space-y-3">
            <div
              class="flex justify-between p-4 mt-4 bg-black-50 items-center rounded-10"
            >
              <ul class="space-y-2 md:pl-4">
                <li class="text-sm font-black text-info-600">
                  Univerisity of Lagos
                </li>
                <li class="text-xs font-black text-black-600">
                  BACHELOR OF SCIENCE
                </li>
                <div class="flex gap-x-4">
                  <h1 class="font-black text-xs">May - June 2020</h1>
                  <h1 class="font-blacl text-xs">Lagos, Nigeria.</h1>
                </div>
              </ul>
              <button>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21.3103 6.87817L17.1216 2.68848C16.9823 2.54916 16.8169 2.43864 16.6349 2.36324C16.4529 2.28783 16.2578 2.24902 16.0608 2.24902C15.8638 2.24902 15.6687 2.28783 15.4867 2.36324C15.3047 2.43864 15.1393 2.54916 15 2.68848L3.43969 14.2497C3.2998 14.3885 3.18889 14.5537 3.11341 14.7358C3.03792 14.9178 2.99938 15.113 3.00001 15.31V19.4997C3.00001 19.8976 3.15804 20.2791 3.43935 20.5604C3.72065 20.8417 4.10218 20.9997 4.50001 20.9997H8.6897C8.88675 21.0004 9.08197 20.9618 9.26399 20.8863C9.44602 20.8109 9.61122 20.6999 9.75001 20.56L21.3103 8.99973C21.4496 8.86044 21.5602 8.69507 21.6356 8.51306C21.711 8.33105 21.7498 8.13596 21.7498 7.93895C21.7498 7.74194 21.711 7.54686 21.6356 7.36485C21.5602 7.18284 21.4496 7.01747 21.3103 6.87817ZM8.6897 19.4997H4.50001V15.31L12.75 7.06005L16.9397 11.2497L8.6897 19.4997ZM18 10.1885L13.8103 5.99973L16.0603 3.74973L20.25 7.93848L18 10.1885Z"
                    fill="#343330"
                  />
                </svg>
              </button>
            </div>
          </div>
          <!-- button cross -->
          <button
          @click="isAddEducation = !isAddEducation"
            class="text-info-600 text-xs items-center flex gap-x-3 mt-2 py-4"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.5 10C17.5 10.1658 17.4342 10.3247 17.3169 10.4419C17.1997 10.5592 17.0408 10.625 16.875 10.625H10.625V16.875C10.625 17.0408 10.5592 17.1997 10.4419 17.3169C10.3247 17.4342 10.1658 17.5 10 17.5C9.83424 17.5 9.67527 17.4342 9.55806 17.3169C9.44085 17.1997 9.375 17.0408 9.375 16.875V10.625H3.125C2.95924 10.625 2.80027 10.5592 2.68306 10.4419C2.56585 10.3247 2.5 10.1658 2.5 10C2.5 9.83424 2.56585 9.67527 2.68306 9.55806C2.80027 9.44085 2.95924 9.375 3.125 9.375H9.375V3.125C9.375 2.95924 9.44085 2.80027 9.55806 2.68306C9.67527 2.56585 9.83424 2.5 10 2.5C10.1658 2.5 10.3247 2.56585 10.4419 2.68306C10.5592 2.80027 10.625 2.95924 10.625 3.125V9.375H16.875C17.0408 9.375 17.1997 9.44085 17.3169 9.55806C17.4342 9.67527 17.5 9.83424 17.5 10Z"
                fill="#006EFF"
              />
            </svg>
            Add Education
          </button>
        </div>

        <!-- language -->
        <div class="bg-white mt-4 rounded-10 space-y-3 p-5">
          <h1 class="text xl font-black font-[Georgia]">Languages</h1>
          <div class="space-y-3">
            <div
              class="flex justify-between p-4 mt-4 bg-black-50 items-center rounded-10"
            >
              <h1 class="text-sm font-black">ENGLISH</h1>
              <button>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21.3103 6.87817L17.1216 2.68848C16.9823 2.54916 16.8169 2.43864 16.6349 2.36324C16.4529 2.28783 16.2578 2.24902 16.0608 2.24902C15.8638 2.24902 15.6687 2.28783 15.4867 2.36324C15.3047 2.43864 15.1393 2.54916 15 2.68848L3.43969 14.2497C3.2998 14.3885 3.18889 14.5537 3.11341 14.7358C3.03792 14.9178 2.99938 15.113 3.00001 15.31V19.4997C3.00001 19.8976 3.15804 20.2791 3.43935 20.5604C3.72065 20.8417 4.10218 20.9997 4.50001 20.9997H8.6897C8.88675 21.0004 9.08197 20.9618 9.26399 20.8863C9.44602 20.8109 9.61122 20.6999 9.75001 20.56L21.3103 8.99973C21.4496 8.86044 21.5602 8.69507 21.6356 8.51306C21.711 8.33105 21.7498 8.13596 21.7498 7.93895C21.7498 7.74194 21.711 7.54686 21.6356 7.36485C21.5602 7.18284 21.4496 7.01747 21.3103 6.87817ZM8.6897 19.4997H4.50001V15.31L12.75 7.06005L16.9397 11.2497L8.6897 19.4997ZM18 10.1885L13.8103 5.99973L16.0603 3.74973L20.25 7.93848L18 10.1885Z"
                    fill="#343330"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div class="space-y-3">
            <div
              class="flex justify-between p-4 mt-4 bg-black-50 items-center rounded-10"
            >
              <h1 class="text-sm font-black">YORUBA</h1>
              <button>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21.3103 6.87817L17.1216 2.68848C16.9823 2.54916 16.8169 2.43864 16.6349 2.36324C16.4529 2.28783 16.2578 2.24902 16.0608 2.24902C15.8638 2.24902 15.6687 2.28783 15.4867 2.36324C15.3047 2.43864 15.1393 2.54916 15 2.68848L3.43969 14.2497C3.2998 14.3885 3.18889 14.5537 3.11341 14.7358C3.03792 14.9178 2.99938 15.113 3.00001 15.31V19.4997C3.00001 19.8976 3.15804 20.2791 3.43935 20.5604C3.72065 20.8417 4.10218 20.9997 4.50001 20.9997H8.6897C8.88675 21.0004 9.08197 20.9618 9.26399 20.8863C9.44602 20.8109 9.61122 20.6999 9.75001 20.56L21.3103 8.99973C21.4496 8.86044 21.5602 8.69507 21.6356 8.51306C21.711 8.33105 21.7498 8.13596 21.7498 7.93895C21.7498 7.74194 21.711 7.54686 21.6356 7.36485C21.5602 7.18284 21.4496 7.01747 21.3103 6.87817ZM8.6897 19.4997H4.50001V15.31L12.75 7.06005L16.9397 11.2497L8.6897 19.4997ZM18 10.1885L13.8103 5.99973L16.0603 3.74973L20.25 7.93848L18 10.1885Z"
                    fill="#343330"
                  />
                </svg>
              </button>
            </div>
          </div>
          <!-- button cross -->
          <button
            class="text-info-600 text-xs items-center flex gap-x-3 mt-2 py-4"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.5 10C17.5 10.1658 17.4342 10.3247 17.3169 10.4419C17.1997 10.5592 17.0408 10.625 16.875 10.625H10.625V16.875C10.625 17.0408 10.5592 17.1997 10.4419 17.3169C10.3247 17.4342 10.1658 17.5 10 17.5C9.83424 17.5 9.67527 17.4342 9.55806 17.3169C9.44085 17.1997 9.375 17.0408 9.375 16.875V10.625H3.125C2.95924 10.625 2.80027 10.5592 2.68306 10.4419C2.56585 10.3247 2.5 10.1658 2.5 10C2.5 9.83424 2.56585 9.67527 2.68306 9.55806C2.80027 9.44085 2.95924 9.375 3.125 9.375H9.375V3.125C9.375 2.95924 9.44085 2.80027 9.55806 2.68306C9.67527 2.56585 9.83424 2.5 10 2.5C10.1658 2.5 10.3247 2.56585 10.4419 2.68306C10.5592 2.80027 10.625 2.95924 10.625 3.125V9.375H16.875C17.0408 9.375 17.1997 9.44085 17.3169 9.55806C17.4342 9.67527 17.5 9.83424 17.5 10Z"
                fill="#006EFF"
              />
            </svg>
            Add Education
          </button>
        </div>

        <!-- skills -->
        <div class="bg-white mt-4 rounded-10 space-y-3 p-5">
          <h1 class="text xl font-black font-[Georgia]">Skills</h1>
          <h1 class="text-xs pt-3">Details</h1>
          <!-- grid button -->
          <div class="md:border md:p-4">
            <div class="py-3 grid grid-cols-2 md:grid-cols-4 gap-2 w-full">
              <!-- Repeat this button element 14 times -->
              <div
                class="text-xs flex items-center justify-between px-2 rounded-5 py-2 border gap-x-2"
              >
                Branding Des
                <button>
                  <svg
                    width="15"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16.0673 15.1832C16.1254 15.2412 16.1714 15.3102 16.2028 15.386C16.2343 15.4619 16.2505 15.5432 16.2505 15.6253C16.2505 15.7075 16.2343 15.7888 16.2028 15.8647C16.1714 15.9405 16.1254 16.0095 16.0673 16.0675C16.0092 16.1256 15.9403 16.1717 15.8644 16.2031C15.7885 16.2345 15.7072 16.2507 15.6251 16.2507C15.543 16.2507 15.4617 16.2345 15.3858 16.2031C15.3099 16.1717 15.241 16.1256 15.1829 16.0675L10.0001 10.8839L4.81729 16.0675C4.70002 16.1848 4.54096 16.2507 4.3751 16.2507C4.20925 16.2507 4.05019 16.1848 3.93292 16.0675C3.81564 15.9503 3.74976 15.7912 3.74976 15.6253C3.74976 15.4595 3.81564 15.3004 3.93292 15.1832L9.11651 10.0003L3.93292 4.81753C3.81564 4.70026 3.74976 4.5412 3.74976 4.37535C3.74976 4.2095 3.81564 4.05044 3.93292 3.93316C4.05019 3.81588 4.20925 3.75 4.3751 3.75C4.54096 3.75 4.70002 3.81588 4.81729 3.93316L10.0001 9.11675L15.1829 3.93316C15.3002 3.81588 15.4593 3.75 15.6251 3.75C15.791 3.75 15.95 3.81588 16.0673 3.93316C16.1846 4.05044 16.2505 4.2095 16.2505 4.37535C16.2505 4.5412 16.1846 4.70026 16.0673 4.81753L10.8837 10.0003L16.0673 15.1832Z"
                      fill="#3D3D3D"
                    />
                  </svg>
                </button>
              </div>
              <div
                class="text-xs flex items-center justify-between px-2 rounded-5 py-2 border gap-x-2"
              >
                Design System
                <button>
                  <svg
                    width="15"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16.0673 15.1832C16.1254 15.2412 16.1714 15.3102 16.2028 15.386C16.2343 15.4619 16.2505 15.5432 16.2505 15.6253C16.2505 15.7075 16.2343 15.7888 16.2028 15.8647C16.1714 15.9405 16.1254 16.0095 16.0673 16.0675C16.0092 16.1256 15.9403 16.1717 15.8644 16.2031C15.7885 16.2345 15.7072 16.2507 15.6251 16.2507C15.543 16.2507 15.4617 16.2345 15.3858 16.2031C15.3099 16.1717 15.241 16.1256 15.1829 16.0675L10.0001 10.8839L4.81729 16.0675C4.70002 16.1848 4.54096 16.2507 4.3751 16.2507C4.20925 16.2507 4.05019 16.1848 3.93292 16.0675C3.81564 15.9503 3.74976 15.7912 3.74976 15.6253C3.74976 15.4595 3.81564 15.3004 3.93292 15.1832L9.11651 10.0003L3.93292 4.81753C3.81564 4.70026 3.74976 4.5412 3.74976 4.37535C3.74976 4.2095 3.81564 4.05044 3.93292 3.93316C4.05019 3.81588 4.20925 3.75 4.3751 3.75C4.54096 3.75 4.70002 3.81588 4.81729 3.93316L10.0001 9.11675L15.1829 3.93316C15.3002 3.81588 15.4593 3.75 15.6251 3.75C15.791 3.75 15.95 3.81588 16.0673 3.93316C16.1846 4.05044 16.2505 4.2095 16.2505 4.37535C16.2505 4.5412 16.1846 4.70026 16.0673 4.81753L10.8837 10.0003L16.0673 15.1832Z"
                      fill="#3D3D3D"
                    />
                  </svg>
                </button>
              </div>
              <div
                class="text-xs flex items-center justify-between px-2 rounded-5 py-2 border gap-x-2"
              >
                Figma
                <button>
                  <svg
                    width="15"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16.0673 15.1832C16.1254 15.2412 16.1714 15.3102 16.2028 15.386C16.2343 15.4619 16.2505 15.5432 16.2505 15.6253C16.2505 15.7075 16.2343 15.7888 16.2028 15.8647C16.1714 15.9405 16.1254 16.0095 16.0673 16.0675C16.0092 16.1256 15.9403 16.1717 15.8644 16.2031C15.7885 16.2345 15.7072 16.2507 15.6251 16.2507C15.543 16.2507 15.4617 16.2345 15.3858 16.2031C15.3099 16.1717 15.241 16.1256 15.1829 16.0675L10.0001 10.8839L4.81729 16.0675C4.70002 16.1848 4.54096 16.2507 4.3751 16.2507C4.20925 16.2507 4.05019 16.1848 3.93292 16.0675C3.81564 15.9503 3.74976 15.7912 3.74976 15.6253C3.74976 15.4595 3.81564 15.3004 3.93292 15.1832L9.11651 10.0003L3.93292 4.81753C3.81564 4.70026 3.74976 4.5412 3.74976 4.37535C3.74976 4.2095 3.81564 4.05044 3.93292 3.93316C4.05019 3.81588 4.20925 3.75 4.3751 3.75C4.54096 3.75 4.70002 3.81588 4.81729 3.93316L10.0001 9.11675L15.1829 3.93316C15.3002 3.81588 15.4593 3.75 15.6251 3.75C15.791 3.75 15.95 3.81588 16.0673 3.93316C16.1846 4.05044 16.2505 4.2095 16.2505 4.37535C16.2505 4.5412 16.1846 4.70026 16.0673 4.81753L10.8837 10.0003L16.0673 15.1832Z"
                      fill="#3D3D3D"
                    />
                  </svg>
                </button>
              </div>
              <div
                class="text-xs flex items-center justify-between px-2 rounded-5 py-2 border gap-x-2"
              >
                Graphic Design
                <button>
                  <svg
                    width="15"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16.0673 15.1832C16.1254 15.2412 16.1714 15.3102 16.2028 15.386C16.2343 15.4619 16.2505 15.5432 16.2505 15.6253C16.2505 15.7075 16.2343 15.7888 16.2028 15.8647C16.1714 15.9405 16.1254 16.0095 16.0673 16.0675C16.0092 16.1256 15.9403 16.1717 15.8644 16.2031C15.7885 16.2345 15.7072 16.2507 15.6251 16.2507C15.543 16.2507 15.4617 16.2345 15.3858 16.2031C15.3099 16.1717 15.241 16.1256 15.1829 16.0675L10.0001 10.8839L4.81729 16.0675C4.70002 16.1848 4.54096 16.2507 4.3751 16.2507C4.20925 16.2507 4.05019 16.1848 3.93292 16.0675C3.81564 15.9503 3.74976 15.7912 3.74976 15.6253C3.74976 15.4595 3.81564 15.3004 3.93292 15.1832L9.11651 10.0003L3.93292 4.81753C3.81564 4.70026 3.74976 4.5412 3.74976 4.37535C3.74976 4.2095 3.81564 4.05044 3.93292 3.93316C4.05019 3.81588 4.20925 3.75 4.3751 3.75C4.54096 3.75 4.70002 3.81588 4.81729 3.93316L10.0001 9.11675L15.1829 3.93316C15.3002 3.81588 15.4593 3.75 15.6251 3.75C15.791 3.75 15.95 3.81588 16.0673 3.93316C16.1846 4.05044 16.2505 4.2095 16.2505 4.37535C16.2505 4.5412 16.1846 4.70026 16.0673 4.81753L10.8837 10.0003L16.0673 15.1832Z"
                      fill="#3D3D3D"
                    />
                  </svg>
                </button>
              </div>
              <div
                class="text-xs flex items-center justify-between px-2 rounded-5 py-2 border gap-x-2"
              >
                Illustration
                <button>
                  <svg
                    width="15"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16.0673 15.1832C16.1254 15.2412 16.1714 15.3102 16.2028 15.386C16.2343 15.4619 16.2505 15.5432 16.2505 15.6253C16.2505 15.7075 16.2343 15.7888 16.2028 15.8647C16.1714 15.9405 16.1254 16.0095 16.0673 16.0675C16.0092 16.1256 15.9403 16.1717 15.8644 16.2031C15.7885 16.2345 15.7072 16.2507 15.6251 16.2507C15.543 16.2507 15.4617 16.2345 15.3858 16.2031C15.3099 16.1717 15.241 16.1256 15.1829 16.0675L10.0001 10.8839L4.81729 16.0675C4.70002 16.1848 4.54096 16.2507 4.3751 16.2507C4.20925 16.2507 4.05019 16.1848 3.93292 16.0675C3.81564 15.9503 3.74976 15.7912 3.74976 15.6253C3.74976 15.4595 3.81564 15.3004 3.93292 15.1832L9.11651 10.0003L3.93292 4.81753C3.81564 4.70026 3.74976 4.5412 3.74976 4.37535C3.74976 4.2095 3.81564 4.05044 3.93292 3.93316C4.05019 3.81588 4.20925 3.75 4.3751 3.75C4.54096 3.75 4.70002 3.81588 4.81729 3.93316L10.0001 9.11675L15.1829 3.93316C15.3002 3.81588 15.4593 3.75 15.6251 3.75C15.791 3.75 15.95 3.81588 16.0673 3.93316C16.1846 4.05044 16.2505 4.2095 16.2505 4.37535C16.2505 4.5412 16.1846 4.70026 16.0673 4.81753L10.8837 10.0003L16.0673 15.1832Z"
                      fill="#3D3D3D"
                    />
                  </svg>
                </button>
              </div>
              <div
                class="text-xs flex items-center justify-between px-2 rounded-5 py-2 border gap-x-2"
              >
                Microsoft
                <button>
                  <svg
                    width="15"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16.0673 15.1832C16.1254 15.2412 16.1714 15.3102 16.2028 15.386C16.2343 15.4619 16.2505 15.5432 16.2505 15.6253C16.2505 15.7075 16.2343 15.7888 16.2028 15.8647C16.1714 15.9405 16.1254 16.0095 16.0673 16.0675C16.0092 16.1256 15.9403 16.1717 15.8644 16.2031C15.7885 16.2345 15.7072 16.2507 15.6251 16.2507C15.543 16.2507 15.4617 16.2345 15.3858 16.2031C15.3099 16.1717 15.241 16.1256 15.1829 16.0675L10.0001 10.8839L4.81729 16.0675C4.70002 16.1848 4.54096 16.2507 4.3751 16.2507C4.20925 16.2507 4.05019 16.1848 3.93292 16.0675C3.81564 15.9503 3.74976 15.7912 3.74976 15.6253C3.74976 15.4595 3.81564 15.3004 3.93292 15.1832L9.11651 10.0003L3.93292 4.81753C3.81564 4.70026 3.74976 4.5412 3.74976 4.37535C3.74976 4.2095 3.81564 4.05044 3.93292 3.93316C4.05019 3.81588 4.20925 3.75 4.3751 3.75C4.54096 3.75 4.70002 3.81588 4.81729 3.93316L10.0001 9.11675L15.1829 3.93316C15.3002 3.81588 15.4593 3.75 15.6251 3.75C15.791 3.75 15.95 3.81588 16.0673 3.93316C16.1846 4.05044 16.2505 4.2095 16.2505 4.37535C16.2505 4.5412 16.1846 4.70026 16.0673 4.81753L10.8837 10.0003L16.0673 15.1832Z"
                      fill="#3D3D3D"
                    />
                  </svg>
                </button>
              </div>
              <div
                class="text-xs flex items-center justify-between px-2 rounded-5 py-2 border gap-x-2"
              >
                Mobile Design
                <button>
                  <svg
                    width="15"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16.0673 15.1832C16.1254 15.2412 16.1714 15.3102 16.2028 15.386C16.2343 15.4619 16.2505 15.5432 16.2505 15.6253C16.2505 15.7075 16.2343 15.7888 16.2028 15.8647C16.1714 15.9405 16.1254 16.0095 16.0673 16.0675C16.0092 16.1256 15.9403 16.1717 15.8644 16.2031C15.7885 16.2345 15.7072 16.2507 15.6251 16.2507C15.543 16.2507 15.4617 16.2345 15.3858 16.2031C15.3099 16.1717 15.241 16.1256 15.1829 16.0675L10.0001 10.8839L4.81729 16.0675C4.70002 16.1848 4.54096 16.2507 4.3751 16.2507C4.20925 16.2507 4.05019 16.1848 3.93292 16.0675C3.81564 15.9503 3.74976 15.7912 3.74976 15.6253C3.74976 15.4595 3.81564 15.3004 3.93292 15.1832L9.11651 10.0003L3.93292 4.81753C3.81564 4.70026 3.74976 4.5412 3.74976 4.37535C3.74976 4.2095 3.81564 4.05044 3.93292 3.93316C4.05019 3.81588 4.20925 3.75 4.3751 3.75C4.54096 3.75 4.70002 3.81588 4.81729 3.93316L10.0001 9.11675L15.1829 3.93316C15.3002 3.81588 15.4593 3.75 15.6251 3.75C15.791 3.75 15.95 3.81588 16.0673 3.93316C16.1846 4.05044 16.2505 4.2095 16.2505 4.37535C16.2505 4.5412 16.1846 4.70026 16.0673 4.81753L10.8837 10.0003L16.0673 15.1832Z"
                      fill="#3D3D3D"
                    />
                  </svg>
                </button>
              </div>
              <div
                class="text-xs flex items-center justify-between px-2 rounded-5 py-2 border gap-x-2"
              >
                Notion
                <button>
                  <svg
                    width="15"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16.0673 15.1832C16.1254 15.2412 16.1714 15.3102 16.2028 15.386C16.2343 15.4619 16.2505 15.5432 16.2505 15.6253C16.2505 15.7075 16.2343 15.7888 16.2028 15.8647C16.1714 15.9405 16.1254 16.0095 16.0673 16.0675C16.0092 16.1256 15.9403 16.1717 15.8644 16.2031C15.7885 16.2345 15.7072 16.2507 15.6251 16.2507C15.543 16.2507 15.4617 16.2345 15.3858 16.2031C15.3099 16.1717 15.241 16.1256 15.1829 16.0675L10.0001 10.8839L4.81729 16.0675C4.70002 16.1848 4.54096 16.2507 4.3751 16.2507C4.20925 16.2507 4.05019 16.1848 3.93292 16.0675C3.81564 15.9503 3.74976 15.7912 3.74976 15.6253C3.74976 15.4595 3.81564 15.3004 3.93292 15.1832L9.11651 10.0003L3.93292 4.81753C3.81564 4.70026 3.74976 4.5412 3.74976 4.37535C3.74976 4.2095 3.81564 4.05044 3.93292 3.93316C4.05019 3.81588 4.20925 3.75 4.3751 3.75C4.54096 3.75 4.70002 3.81588 4.81729 3.93316L10.0001 9.11675L15.1829 3.93316C15.3002 3.81588 15.4593 3.75 15.6251 3.75C15.791 3.75 15.95 3.81588 16.0673 3.93316C16.1846 4.05044 16.2505 4.2095 16.2505 4.37535C16.2505 4.5412 16.1846 4.70026 16.0673 4.81753L10.8837 10.0003L16.0673 15.1832Z"
                      fill="#3D3D3D"
                    />
                  </svg>
                </button>
              </div>
              <div
                class="text-xs flex items-center justify-between px-2 rounded-5 py-2 border gap-x-2"
              >
                Product Design
                <button>
                  <svg
                    width="15"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16.0673 15.1832C16.1254 15.2412 16.1714 15.3102 16.2028 15.386C16.2343 15.4619 16.2505 15.5432 16.2505 15.6253C16.2505 15.7075 16.2343 15.7888 16.2028 15.8647C16.1714 15.9405 16.1254 16.0095 16.0673 16.0675C16.0092 16.1256 15.9403 16.1717 15.8644 16.2031C15.7885 16.2345 15.7072 16.2507 15.6251 16.2507C15.543 16.2507 15.4617 16.2345 15.3858 16.2031C15.3099 16.1717 15.241 16.1256 15.1829 16.0675L10.0001 10.8839L4.81729 16.0675C4.70002 16.1848 4.54096 16.2507 4.3751 16.2507C4.20925 16.2507 4.05019 16.1848 3.93292 16.0675C3.81564 15.9503 3.74976 15.7912 3.74976 15.6253C3.74976 15.4595 3.81564 15.3004 3.93292 15.1832L9.11651 10.0003L3.93292 4.81753C3.81564 4.70026 3.74976 4.5412 3.74976 4.37535C3.74976 4.2095 3.81564 4.05044 3.93292 3.93316C4.05019 3.81588 4.20925 3.75 4.3751 3.75C4.54096 3.75 4.70002 3.81588 4.81729 3.93316L10.0001 9.11675L15.1829 3.93316C15.3002 3.81588 15.4593 3.75 15.6251 3.75C15.791 3.75 15.95 3.81588 16.0673 3.93316C16.1846 4.05044 16.2505 4.2095 16.2505 4.37535C16.2505 4.5412 16.1846 4.70026 16.0673 4.81753L10.8837 10.0003L16.0673 15.1832Z"
                      fill="#3D3D3D"
                    />
                  </svg>
                </button>
              </div>
              <div
                class="text-xs flex items-center justify-between px-2 rounded-5 py-2 border gap-x-2"
              >
                Internet Savvy
                <button>
                  <svg
                    width="15"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16.0673 15.1832C16.1254 15.2412 16.1714 15.3102 16.2028 15.386C16.2343 15.4619 16.2505 15.5432 16.2505 15.6253C16.2505 15.7075 16.2343 15.7888 16.2028 15.8647C16.1714 15.9405 16.1254 16.0095 16.0673 16.0675C16.0092 16.1256 15.9403 16.1717 15.8644 16.2031C15.7885 16.2345 15.7072 16.2507 15.6251 16.2507C15.543 16.2507 15.4617 16.2345 15.3858 16.2031C15.3099 16.1717 15.241 16.1256 15.1829 16.0675L10.0001 10.8839L4.81729 16.0675C4.70002 16.1848 4.54096 16.2507 4.3751 16.2507C4.20925 16.2507 4.05019 16.1848 3.93292 16.0675C3.81564 15.9503 3.74976 15.7912 3.74976 15.6253C3.74976 15.4595 3.81564 15.3004 3.93292 15.1832L9.11651 10.0003L3.93292 4.81753C3.81564 4.70026 3.74976 4.5412 3.74976 4.37535C3.74976 4.2095 3.81564 4.05044 3.93292 3.93316C4.05019 3.81588 4.20925 3.75 4.3751 3.75C4.54096 3.75 4.70002 3.81588 4.81729 3.93316L10.0001 9.11675L15.1829 3.93316C15.3002 3.81588 15.4593 3.75 15.6251 3.75C15.791 3.75 15.95 3.81588 16.0673 3.93316C16.1846 4.05044 16.2505 4.2095 16.2505 4.37535C16.2505 4.5412 16.1846 4.70026 16.0673 4.81753L10.8837 10.0003L16.0673 15.1832Z"
                      fill="#3D3D3D"
                    />
                  </svg>
                </button>
              </div>
              <div
                class="text-xs flex items-center justify-between px-2 rounded-5 py-2 border gap-x-2"
              >
                UI/UX Design
                <button>
                  <svg
                    width="15"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16.0673 15.1832C16.1254 15.2412 16.1714 15.3102 16.2028 15.386C16.2343 15.4619 16.2505 15.5432 16.2505 15.6253C16.2505 15.7075 16.2343 15.7888 16.2028 15.8647C16.1714 15.9405 16.1254 16.0095 16.0673 16.0675C16.0092 16.1256 15.9403 16.1717 15.8644 16.2031C15.7885 16.2345 15.7072 16.2507 15.6251 16.2507C15.543 16.2507 15.4617 16.2345 15.3858 16.2031C15.3099 16.1717 15.241 16.1256 15.1829 16.0675L10.0001 10.8839L4.81729 16.0675C4.70002 16.1848 4.54096 16.2507 4.3751 16.2507C4.20925 16.2507 4.05019 16.1848 3.93292 16.0675C3.81564 15.9503 3.74976 15.7912 3.74976 15.6253C3.74976 15.4595 3.81564 15.3004 3.93292 15.1832L9.11651 10.0003L3.93292 4.81753C3.81564 4.70026 3.74976 4.5412 3.74976 4.37535C3.74976 4.2095 3.81564 4.05044 3.93292 3.93316C4.05019 3.81588 4.20925 3.75 4.3751 3.75C4.54096 3.75 4.70002 3.81588 4.81729 3.93316L10.0001 9.11675L15.1829 3.93316C15.3002 3.81588 15.4593 3.75 15.6251 3.75C15.791 3.75 15.95 3.81588 16.0673 3.93316C16.1846 4.05044 16.2505 4.2095 16.2505 4.37535C16.2505 4.5412 16.1846 4.70026 16.0673 4.81753L10.8837 10.0003L16.0673 15.1832Z"
                      fill="#3D3D3D"
                    />
                  </svg>
                </button>
              </div>
              <div
                class="text-xs flex items-center justify-between px-2 rounded-5 py-2 border gap-x-2"
              >
                Web Design
                <button>
                  <svg
                    width="15"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16.0673 15.1832C16.1254 15.2412 16.1714 15.3102 16.2028 15.386C16.2343 15.4619 16.2505 15.5432 16.2505 15.6253C16.2505 15.7075 16.2343 15.7888 16.2028 15.8647C16.1714 15.9405 16.1254 16.0095 16.0673 16.0675C16.0092 16.1256 15.9403 16.1717 15.8644 16.2031C15.7885 16.2345 15.7072 16.2507 15.6251 16.2507C15.543 16.2507 15.4617 16.2345 15.3858 16.2031C15.3099 16.1717 15.241 16.1256 15.1829 16.0675L10.0001 10.8839L4.81729 16.0675C4.70002 16.1848 4.54096 16.2507 4.3751 16.2507C4.20925 16.2507 4.05019 16.1848 3.93292 16.0675C3.81564 15.9503 3.74976 15.7912 3.74976 15.6253C3.74976 15.4595 3.81564 15.3004 3.93292 15.1832L9.11651 10.0003L3.93292 4.81753C3.81564 4.70026 3.74976 4.5412 3.74976 4.37535C3.74976 4.2095 3.81564 4.05044 3.93292 3.93316C4.05019 3.81588 4.20925 3.75 4.3751 3.75C4.54096 3.75 4.70002 3.81588 4.81729 3.93316L10.0001 9.11675L15.1829 3.93316C15.3002 3.81588 15.4593 3.75 15.6251 3.75C15.791 3.75 15.95 3.81588 16.0673 3.93316C16.1846 4.05044 16.2505 4.2095 16.2505 4.37535C16.2505 4.5412 16.1846 4.70026 16.0673 4.81753L10.8837 10.0003L16.0673 15.1832Z"
                      fill="#3D3D3D"
                    />
                  </svg>
                </button>
              </div>
              <div
                class="text-xs flex items-center justify-between px-2 rounded-5 py-2 border gap-x-2"
              >
                Web Savvy
                <button>
                  <svg
                    width="15"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16.0673 15.1832C16.1254 15.2412 16.1714 15.3102 16.2028 15.386C16.2343 15.4619 16.2505 15.5432 16.2505 15.6253C16.2505 15.7075 16.2343 15.7888 16.2028 15.8647C16.1714 15.9405 16.1254 16.0095 16.0673 16.0675C16.0092 16.1256 15.9403 16.1717 15.8644 16.2031C15.7885 16.2345 15.7072 16.2507 15.6251 16.2507C15.543 16.2507 15.4617 16.2345 15.3858 16.2031C15.3099 16.1717 15.241 16.1256 15.1829 16.0675L10.0001 10.8839L4.81729 16.0675C4.70002 16.1848 4.54096 16.2507 4.3751 16.2507C4.20925 16.2507 4.05019 16.1848 3.93292 16.0675C3.81564 15.9503 3.74976 15.7912 3.74976 15.6253C3.74976 15.4595 3.81564 15.3004 3.93292 15.1832L9.11651 10.0003L3.93292 4.81753C3.81564 4.70026 3.74976 4.5412 3.74976 4.37535C3.74976 4.2095 3.81564 4.05044 3.93292 3.93316C4.05019 3.81588 4.20925 3.75 4.3751 3.75C4.54096 3.75 4.70002 3.81588 4.81729 3.93316L10.0001 9.11675L15.1829 3.93316C15.3002 3.81588 15.4593 3.75 15.6251 3.75C15.791 3.75 15.95 3.81588 16.0673 3.93316C16.1846 4.05044 16.2505 4.2095 16.2505 4.37535C16.2505 4.5412 16.1846 4.70026 16.0673 4.81753L10.8837 10.0003L16.0673 15.1832Z"
                      fill="#3D3D3D"
                    />
                  </svg>
                </button>
              </div>
              <div
                class="text-xs flex items-center justify-between px-2 rounded-5 py-2 border gap-x-2"
              >
                Webflow
                <button>
                  <svg
                    width="15"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16.0673 15.1832C16.1254 15.2412 16.1714 15.3102 16.2028 15.386C16.2343 15.4619 16.2505 15.5432 16.2505 15.6253C16.2505 15.7075 16.2343 15.7888 16.2028 15.8647C16.1714 15.9405 16.1254 16.0095 16.0673 16.0675C16.0092 16.1256 15.9403 16.1717 15.8644 16.2031C15.7885 16.2345 15.7072 16.2507 15.6251 16.2507C15.543 16.2507 15.4617 16.2345 15.3858 16.2031C15.3099 16.1717 15.241 16.1256 15.1829 16.0675L10.0001 10.8839L4.81729 16.0675C4.70002 16.1848 4.54096 16.2507 4.3751 16.2507C4.20925 16.2507 4.05019 16.1848 3.93292 16.0675C3.81564 15.9503 3.74976 15.7912 3.74976 15.6253C3.74976 15.4595 3.81564 15.3004 3.93292 15.1832L9.11651 10.0003L3.93292 4.81753C3.81564 4.70026 3.74976 4.5412 3.74976 4.37535C3.74976 4.2095 3.81564 4.05044 3.93292 3.93316C4.05019 3.81588 4.20925 3.75 4.3751 3.75C4.54096 3.75 4.70002 3.81588 4.81729 3.93316L10.0001 9.11675L15.1829 3.93316C15.3002 3.81588 15.4593 3.75 15.6251 3.75C15.791 3.75 15.95 3.81588 16.0673 3.93316C16.1846 4.05044 16.2505 4.2095 16.2505 4.37535C16.2505 4.5412 16.1846 4.70026 16.0673 4.81753L10.8837 10.0003L16.0673 15.1832Z"
                      fill="#3D3D3D"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!--  -->
      <div
        class="bg-white md:w-1/3 rounded-lg p-3 h-full md:flex flex-col md:flex-row items-center md:space-x-2 hidden"
      >
        <div
          class="bg-black-50 flex space-x-2 p-2 w-full items-center md:justify-center justify-between rounded-8"
        >
          <span>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="24" height="24" rx="4.8" fill="#0A66C2" />
              <path
                d="M5.10034 6.08908C5.10034 5.54346 5.55712 5.10059 6.1202 5.10059H17.8799C18.4432 5.10059 18.8998 5.54346 18.8998 6.08908V17.9117C18.8998 18.4574 18.4432 18.9 17.8799 18.9H6.1202C5.55718 18.9 5.10034 18.4575 5.10034 17.9118V6.08892V6.08908Z"
                fill="white"
              />
              <path
                d="M9.29385 16.6487V10.4362H7.22889V16.6487H9.29406H9.29385ZM8.2618 9.58813C8.98174 9.58813 9.42995 9.11108 9.42995 8.5149C9.41648 7.90514 8.98174 7.44141 8.27549 7.44141C7.56876 7.44141 7.10718 7.90514 7.10718 8.51485C7.10718 9.11103 7.55523 9.58808 8.24827 9.58808H8.26164L8.2618 9.58813ZM10.4368 16.6487H12.5016V13.1798C12.5016 12.9943 12.5151 12.8084 12.5696 12.676C12.7189 12.3048 13.0586 11.9207 13.6292 11.9207C14.3762 11.9207 14.6752 12.4903 14.6752 13.3256V16.6487H16.7399V13.0867C16.7399 11.1785 15.7214 10.2906 14.3628 10.2906C13.249 10.2906 12.7598 10.9131 12.488 11.3371H12.5018V10.4364H10.4369C10.4639 11.0192 10.4368 16.649 10.4368 16.649L10.4368 16.6487Z"
                fill="#0A66C2"
              />
            </svg>
          </span>
          <h1 class="text-xs">Import linkedin profile</h1>
          <button>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22.5 12.75V18.75C22.5 19.1478 22.342 19.5294 22.0607 19.8107C21.7794 20.092 21.3978 20.25 21 20.25H3C2.60218 20.25 2.22064 20.092 1.93934 19.8107C1.65804 19.5294 1.5 19.1478 1.5 18.75V12.75C1.5 12.3522 1.65804 11.9706 1.93934 11.6893C2.22064 11.408 2.60218 11.25 3 11.25H6.75C6.94891 11.25 7.13968 11.329 7.28033 11.4697C7.42098 11.6103 7.5 11.8011 7.5 12C7.5 12.1989 7.42098 12.3897 7.28033 12.5303C7.13968 12.671 6.94891 12.75 6.75 12.75H3V18.75H21V12.75H17.25C17.0511 12.75 16.8603 12.671 16.7197 12.5303C16.579 12.3897 16.5 12.1989 16.5 12C16.5 11.8011 16.579 11.6103 16.7197 11.4697C16.8603 11.329 17.0511 11.25 17.25 11.25H21C21.3978 11.25 21.7794 11.408 22.0607 11.6893C22.342 11.9706 22.5 12.3522 22.5 12.75ZM11.4694 12.5306C11.539 12.6004 11.6217 12.6557 11.7128 12.6934C11.8038 12.7312 11.9014 12.7506 12 12.7506C12.0986 12.7506 12.1962 12.7312 12.2872 12.6934C12.3783 12.6557 12.461 12.6004 12.5306 12.5306L17.0306 8.03063C17.1714 7.88989 17.2504 7.69902 17.2504 7.5C17.2504 7.30098 17.1714 7.11011 17.0306 6.96937C16.8899 6.82864 16.699 6.74958 16.5 6.74958C16.301 6.74958 16.1101 6.82864 15.9694 6.96937L12.75 10.1897V2.25C12.75 2.05109 12.671 1.86032 12.5303 1.71967C12.3897 1.57902 12.1989 1.5 12 1.5C11.8011 1.5 11.6103 1.57902 11.4697 1.71967C11.329 1.86032 11.25 2.05109 11.25 2.25V10.1897L8.03063 6.96937C7.88989 6.82864 7.69902 6.74958 7.5 6.74958C7.30098 6.74958 7.11011 6.82864 6.96938 6.96938C6.82864 7.11011 6.74958 7.30098 6.74958 7.5C6.74958 7.69902 6.82864 7.88989 6.96937 8.03063L11.4694 12.5306ZM18.75 15.75C18.75 15.5275 18.684 15.31 18.5604 15.125C18.4368 14.94 18.2611 14.7958 18.0555 14.7106C17.85 14.6255 17.6238 14.6032 17.4055 14.6466C17.1873 14.69 16.9868 14.7972 16.8295 14.9545C16.6722 15.1118 16.565 15.3123 16.5216 15.5305C16.4782 15.7488 16.5005 15.975 16.5856 16.1805C16.6708 16.3861 16.815 16.5618 17 16.6854C17.185 16.809 17.4025 16.875 17.625 16.875C17.9234 16.875 18.2095 16.7565 18.4205 16.5455C18.6315 16.3345 18.75 16.0484 18.75 15.75Z"
                fill="#343330"
              />
            </svg>
          </button>
        </div>
        <!--  -->
        <div class="bg-black-200 w-px hidden md:flex text-white">2</div>
        <!--  -->
        <div
          class="bg-black-50 flex space-x-2 p-2 w-full items-center rounded-8 mt-2 md:mt-2 justify-between"
        >
          <h1 class="text-xs">Import from resume</h1>
          <button>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22.5 12.75V18.75C22.5 19.1478 22.342 19.5294 22.0607 19.8107C21.7794 20.092 21.3978 20.25 21 20.25H3C2.60218 20.25 2.22064 20.092 1.93934 19.8107C1.65804 19.5294 1.5 19.1478 1.5 18.75V12.75C1.5 12.3522 1.65804 11.9706 1.93934 11.6893C2.22064 11.408 2.60218 11.25 3 11.25H6.75C6.94891 11.25 7.13968 11.329 7.28033 11.4697C7.42098 11.6103 7.5 11.8011 7.5 12C7.5 12.1989 7.42098 12.3897 7.28033 12.5303C7.13968 12.671 6.94891 12.75 6.75 12.75H3V18.75H21V12.75H17.25C17.0511 12.75 16.8603 12.671 16.7197 12.5303C16.579 12.3897 16.5 12.1989 16.5 12C16.5 11.8011 16.579 11.6103 16.7197 11.4697C16.8603 11.329 17.0511 11.25 17.25 11.25H21C21.3978 11.25 21.7794 11.408 22.0607 11.6893C22.342 11.9706 22.5 12.3522 22.5 12.75ZM11.4694 12.5306C11.539 12.6004 11.6217 12.6557 11.7128 12.6934C11.8038 12.7312 11.9014 12.7506 12 12.7506C12.0986 12.7506 12.1962 12.7312 12.2872 12.6934C12.3783 12.6557 12.461 12.6004 12.5306 12.5306L17.0306 8.03063C17.1714 7.88989 17.2504 7.69902 17.2504 7.5C17.2504 7.30098 17.1714 7.11011 17.0306 6.96937C16.8899 6.82864 16.699 6.74958 16.5 6.74958C16.301 6.74958 16.1101 6.82864 15.9694 6.96937L12.75 10.1897V2.25C12.75 2.05109 12.671 1.86032 12.5303 1.71967C12.3897 1.57902 12.1989 1.5 12 1.5C11.8011 1.5 11.6103 1.57902 11.4697 1.71967C11.329 1.86032 11.25 2.05109 11.25 2.25V10.1897L8.03063 6.96937C7.88989 6.82864 7.69902 6.74958 7.5 6.74958C7.30098 6.74958 7.11011 6.82864 6.96938 6.96938C6.82864 7.11011 6.74958 7.30098 6.74958 7.5C6.74958 7.69902 6.82864 7.88989 6.96937 8.03063L11.4694 12.5306ZM18.75 15.75C18.75 15.5275 18.684 15.31 18.5604 15.125C18.4368 14.94 18.2611 14.7958 18.0555 14.7106C17.85 14.6255 17.6238 14.6032 17.4055 14.6466C17.1873 14.69 16.9868 14.7972 16.8295 14.9545C16.6722 15.1118 16.565 15.3123 16.5216 15.5305C16.4782 15.7488 16.5005 15.975 16.5856 16.1805C16.6708 16.3861 16.815 16.5618 17 16.6854C17.185 16.809 17.4025 16.875 17.625 16.875C17.9234 16.875 18.2095 16.7565 18.4205 16.5455C18.6315 16.3345 18.75 16.0484 18.75 15.75Z"
                fill="#343330"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- modals -->
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
          <h3 class="text-lg font-bold">Notice</h3>

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

        <p class="py-2 w-2/3 text-sm text-center">
          Do you want to delete this work experience ?
        </p>

        <div class="space-x-4 flex items-center justify-between w-full">
          <BtnPrimary
            @click="handleDeleteExperience()"
            :isLoading="isDeleting"
            :disabled="isDeleting"
            class="rounded-8 px-3.5 py-2 text-white text-xs bg-primary-1 !flex-1"
          >
            <template #text>
              {{ !isDeleting ? 'Yes, Delete' : 'Deleting...' }}
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
  </div>
</template>
