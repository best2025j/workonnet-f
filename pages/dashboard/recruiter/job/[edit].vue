<script setup lang="ts">
import { POSITION, useToast } from 'vue-toastification';
import { required, helpers, minLength } from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core';
import type { ApiErrorResponse, ApiSuccessResponse, IJobPost } from '~/types';

definePageMeta({
  title: 'Edit job opening',
  pageName: 'dashboard.recruiter.job.create',
  layout: 'dashboard',
  middleware: ['auth', 'is-recruiter'],
});

const skillList = ref(availableSkillList);

const route = useRoute();
const toast = useToast();
const authStore = useAuthStore();
const isLoading = ref<boolean>(false);
const jobStore = useJobStore();
const editId = computed(() => (route.params.edit as string).split('-')[0]);

const formData = reactive({
  title: '',
  description: '',
  requirements: [''],
  benefits: [''],
  location: '',
  jobType: '',
  level: '',
  skills: [''],
  expectedSalary: '',
  educationRequirement: [],
});

const selectedEduFormData = ref<string | null>(null);

const addEducationalRequirement = () => {
  if (selectedEduFormData.value) {
    const filtered = formData.educationRequirement.filter(
      (value) => value === selectedEduFormData.value
    );

    if (filtered && filtered.length > 0) {
      return false;
    }
    // add
    (formData.educationRequirement as string[]).push(selectedEduFormData.value);

    selectedEduFormData.value = null;
  }
};

const removeEduRequirement = (index: number) => {
  formData.educationRequirement.splice(index, 1);
};

const addRequirement = () => formData.requirements.push('');

const removeRequirement = (index: number) => {
  formData.requirements.splice(index, 1);
};

const addBenefit = () => formData.benefits.push('');
const removeBenefit = (index: number) => {
  formData.benefits.splice(index, 1);
};

const rules = computed(() => {
  return {
    title: {
      required: helpers.withMessage('Job title is required', required),
    },
    description: {
      required: helpers.withMessage('Job description is required', required),
    },
    location: {
      required: helpers.withMessage(
        'Please select job location type',
        required
      ),
    },
    jobType: {
      required: helpers.withMessage('Job type is required', required),
    },
    level: {
      required: helpers.withMessage('Experience Level is required', required),
    },
    expectedSalary: {
      required: helpers.withMessage('Expected salary is required', required),
    },
    skills: {
      $each: {
        required: helpers.withMessage('Skills is required', required),
        minLength: helpers.withMessage('Add atleast one skill', minLength(1)),
      },
    },
    benefits: {
      $each: {
        required: helpers.withMessage('Benefit is required', required),
        minLength: helpers.withMessage('Add atleast one benefit', minLength(1)),
      },
    },
    requirements: {
      $each: {
        required: helpers.withMessage('Requirement is required', required),
        minLength: helpers.withMessage(
          'Add atleast one requirement',
          minLength(1)
        ),
      },
    },
  };
});

const v$ = useVuelidate(rules, formData);

const handleJobPost = async (status: string) => {
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

  formData.expectedSalary = convertCurrencyToNumber(
    formData.expectedSalary
  ).toString();

  try {
    const token = authStore.userToken;
    await $fetch('/api/recruiter/job/edit', {
      method: 'POST',
      body: formData,
      query: {
        jobListingId: editId.value,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    toast.success('Job post was successfully updated', {
      timeout: 3000,
      position: POSITION.TOP_RIGHT,
    });

    setTimeout(() => {
      isLoading.value = false;
    }, 2000);
  } catch (error: any) {
    const errorData = error.data as ApiErrorResponse;

    toast.error('An error occurred try again', {
      timeout: 3000,
      position: POSITION.TOP_RIGHT,
    });
  }

  setTimeout(() => {
    isLoading.value = false;
  }, 2000);
};

const getJob = async () => {
  try {
    isLoading.value = true;
    const token = authStore.userToken;
    const response = await jobStore.$api.fetchRecruiterSingle(
      token,
      editId.value
    );
    const responseData = response as ApiSuccessResponse;
    setEditJob(responseData.data as IJobPost);

    setTimeout(() => {
      isLoading.value = false;
    }, 1000);
  } catch (e) {
    console.log(e);
  }
};

const setEditJob = (data: IJobPost) => {
  formData.title = data.title;
  formData.description = data.description;
  formData.requirements = data.requirements;
  formData.benefits = data.benefits;
  formData.location = data.location;
  formData.jobType = data.jobType;
  formData.level = data.level;
  formData.skills = data.skills;
  formData.expectedSalary = data.expectedSalary.toString();
  formData.educationRequirement = data.educationRequirement as any;
};

function convertCurrencyToNumber(currency: string): number {
  // Remove commas and any other characters except digits and decimal points
  const cleanedValue = currency.replace(/[^0-9.]/g, '');
  // Convert the cleaned string to a number
  return parseFloat(cleanedValue);
}

const formatNumber = (): void => {
  const value = formData.expectedSalary.toString().replace(/\D/g, ''); // Remove non-numeric characters
  formData.expectedSalary = new Intl.NumberFormat('en-NG', {
    minimumFractionDigits: 0,
  }).format(Number(value));
};

onMounted(async () => {
  await getJob();
});
</script>

<template>
  <div class="font-[Nexa] scrollbar-hide bg-white p-2 rounded-10 w-full h-full">
    <div class="flex justify-between items-center p-2">
      <div>
        <h1 class="font-[Georgia] font-black text-xl md:text-2xl">
          Job details
        </h1>
      </div>

      <div class="flex gap-3">
        <!-- for modal triggering -->
        <BtnPrimary
          @click="handleJobPost('published')"
          :isLoading="isLoading"
          :disabled="isLoading"
          class="!px-4 !py-2 !rounded-5 !text-xs"
        >
          <template #text>
            {{ isLoading ? 'Updating' : 'Update' }}
          </template>
        </BtnPrimary>
      </div>
    </div>

    <!-- form input with dropdown  -->
    <div class="md:p-4 space-y-4 w-full md:w-3/4">
      <!-- occupation -->
      <div class="flex flex-col w-full">
        <label for="job title" class="text-sm mb-2">Job Title</label>
        <input
          type="text"
          v-model="formData.title"
          :disabled="isLoading"
          @change="v$.title.$touch"
          placeholder="Enter a job title"
          class="placeholder:text-sm text-sm px-3 py-2 outline-none border border-gray-300 rounded-md"
        />

        <div
          class="input-errors"
          v-for="error of v$.title.$errors"
          :key="error.$uid"
        >
          <span class="text-xs text-danger-500">* {{ error.$message }}</span>
        </div>
      </div>

      <!-- input with drop down  -->
      <div class="flex flex-col md:flex-row gap-2">
        <div class="flex flex-col w-full relative">
          <label class="text-sm mb-2" for="location"
            >Location Type
            <select
              v-model="formData.location"
              :disabled="isLoading"
              @change="v$.location.$touch"
              class="outline-none mt-2 bg-white w-full text-sm font-thin placeholder:font-thin placeholder:text-[#958D8D] rounded-lg px-3 py-2.5 border border-black-200 border-solid"
            >
              <option value="" disabled selected>Select location type</option>
              <option value="remote">Remote</option>
              <option value="hybrid">Hybrid</option>
              <option value="onsite">Onsite</option>
            </select>
          </label>

          <div
            class="input-errors"
            v-for="error of v$.location.$errors"
            :key="error.$uid"
          >
            <span class="text-xs text-danger-500">* {{ error.$message }}</span>
          </div>
        </div>

        <div class="flex flex-col w-full relative">
          <label class="text-sm mb-2"
            >Experience Level
            <select
              v-model="formData.level"
              :disabled="isLoading"
              @change="v$.level.$touch"
              class="outline-none mt-2 bg-white w-full text-sm font-thin placeholder:font-thin placeholder:text-[#958D8D] rounded-lg px-3 py-2.5 border border-black-200 border-solid"
            >
              <option value="" disabled selected>Select a level</option>
              <option value="junior">Junior</option>
              <option value="intern">Intern</option>
              <option value="senior">Senior</option>
              <option value="mid">Mid-Level</option>
              <option value="mid-senior">Mid/Senior</option>
            </select>
          </label>

          <div
            class="input-errors"
            v-for="error of v$.level.$errors"
            :key="error.$uid"
          >
            <span class="text-xs text-danger-500">* {{ error.$message }}</span>
          </div>
        </div>
      </div>

      <!--  -->
      <div class="flex flex-col md:flex-row gap-2">
        <div class="flex flex-col w-full relative">
          <label class="text-sm mb-2"
            >Job Type
            <select
              v-model="formData.jobType"
              :disabled="isLoading"
              @change="v$.jobType.$touch"
              class="outline-none mt-2 bg-white w-full text-sm font-thin placeholder:font-thin placeholder:text-[#958D8D] rounded-lg px-3 py-2.5 border border-black-200 border-solid"
            >
              <option value="" disabled selected>Select a type</option>
              <option value="full-time">Full Time</option>
              <option value="contract">Contract</option>
              <option value="part-time">Part Time</option>
            </select>
          </label>

          <div
            class="input-errors"
            v-for="error of v$.jobType.$errors"
            :key="error.$uid"
          >
            <span class="text-xs text-danger-500">* {{ error.$message }}</span>
          </div>
        </div>
        <div class="flex flex-col w-full relative">
          <label for="first-name" class="text-sm mb-2"
            >Expected Salary <span class="text-xs">(per month)</span></label
          >

          <input
            type="text"
            v-model="formData.expectedSalary"
            :disabled="isLoading"
            @change="v$.expectedSalary.$touch"
            @input="formatNumber"
            placeholder="Enter amount"
            class="pl-28 placeholder:text-xs pr-4 py-2 outline-none border border-gray-300 rounded-md"
          />

          <div
            class="input-errors"
            v-for="error of v$.expectedSalary.$errors"
            :key="error.$uid"
          >
            <span class="text-xs text-danger-500">* {{ error.$message }}</span>
          </div>

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
      </div>

      <div class="flex items-start space-x-2">
        <div class="w-full space-y-2">
          <h1 class="text-sm">Requirements</h1>

          <button
            type="button"
            @click="addRequirement"
            class="flex items-center gap-2"
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
            <h1 class="text-success-600 text-xs">Add New Requirement</h1>
          </button>
          <!-- Input form to add new requirement -->
          <div class="flex flex-col space-y-2">
            <div
              v-for="(requirement, index) in formData.requirements"
              :key="index"
              class="flex space-x-2 items-center"
            >
              <input
                type="text"
                v-model="formData.requirements[index]"
                placeholder="Enter requirement"
                class="placeholder:text-sm text-sm px-3 py-2 outline-none border border-gray-300 rounded-md flex-grow"
              />
              <button type="button" @click="removeRequirement(index)">
                <svg
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
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>
              </button>

              <div
                class="input-errors"
                v-for="error of v$.requirements.$errors"
                :key="error.$uid"
              >
                <span class="text-xs text-danger-500"
                  >* {{ error.$message }}</span
                >
              </div>
            </div>
          </div>
        </div>

        <!-- Benefits -->
        <div class="w-full space-y-2">
          <h1 class="text-sm">Benefits</h1>

          <button
            type="button"
            @click="addBenefit"
            class="flex items-center gap-2"
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
            <h1 class="text-success-600 text-xs">Add New Benefit</h1>
          </button>
          <!-- Input form to add new benefit -->
          <div class="flex flex-col space-y-2">
            <div
              v-for="(benefit, index) in formData.benefits"
              :key="index"
              class="flex space-x-2 items-center"
            >
              <input
                type="text"
                v-model="formData.benefits[index]"
                placeholder="Enter benefit"
                class="placeholder:text-sm text-sm px-3 py-2 outline-none border border-gray-300 rounded-md flex-grow"
              />
              <button type="button" @click="removeBenefit(index)">
                <svg
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
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>
              </button>

              <div
                class="input-errors"
                v-for="error of v$.benefits.$errors"
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

      <!--  -->
      <div class="py-1 space-y-2">
        <h1 class="text-sm">Skill Sets</h1>
        <button type="button" class="flex items-center gap-2">
          <h1 class="text-success-600 text-xs">Add New Skills</h1>
        </button>

        <!-- Input form to add new skills -->
        <div class="mt-4 flex flex-col">
          <Multiselect
            v-model="formData.skills"
            mode="tags"
            :searchable="true"
            :options="skillList"
            placeholder="Add skills"
          />

          <div
            class="input-errors"
            v-for="error of v$.skills.$errors"
            :key="error.$uid"
          >
            <span class="text-xs text-danger-500">* {{ error.$message }}</span>
          </div>
        </div>
      </div>

      <!-- educational requirement -->
      <div class="py-1 space-y-2">
        <h1 class="text-sm">Education Requirement <small>(optional)</small></h1>
        <div class="flex items-center justify-between space-x-6 w-[59%]">
          <div class="flex flex-col w-full">
            <label for="fieldOfStudy" class="text-sm"
              >Select Degree(s) -
              <small>select a degree and click add button</small></label
            >
            <select
              v-model="selectedEduFormData"
              :disabled="isLoading"
              class="outline-none mt-2 bg-white w-full text-sm font-thin placeholder:font-thin placeholder:text-[#958D8D] rounded-lg px-3 py-2.5 border border-black-200 border-solid"
            >
              <option value="null" disabled>Select degree</option>

              <optgroup
                v-for="group in schoolDegrees"
                :label="group.label"
                :key="group.label"
              >
                <option
                  v-for="degree in group.options"
                  :value="degree.text"
                  :key="degree.value"
                >
                  {{ degree.text }}
                </option>
              </optgroup>
            </select>
          </div>

          <div class="flex-shrink-0 pt-6 flex items-center justify-center">
            <button
              type="button"
              class="flex items-center justify-center gap-2"
              @click="addEducationalRequirement"
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
              <h1 class="text-success-600 text-xs">Add Degree</h1>
            </button>
          </div>
        </div>

        <div class="flex flex-col space-y-2 w-1/2">
          <div
            v-for="(degree, index) in formData.educationRequirement"
            :key="index"
            class="flex space-x-2 items-center"
          >
            <input
              type="text"
              readonly
              :value="degree"
              class="text-sm px-3 py-2 outline-none border border-gray-300 rounded-md flex-grow"
            />
            <button type="button" @click="removeEduRequirement(index)">
              <svg
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
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>
            </button>

            <div
              class="input-errors"
              v-for="error of v$.benefits.$errors"
              :key="error.$uid"
            >
              <span class="text-xs text-danger-500"
                >* {{ error.$message }}</span
              >
            </div>
          </div>
        </div>
      </div>

      <!-- company -->
      <div class="flex flex-col w-full">
        <label for="Job description" class="text-sm mb-2"
          >Job Description</label
        >
        <textarea
          type="text"
          rows="10"
          v-model="formData.description"
          :disabled="isLoading"
          @change="v$.description.$touch"
          placeholder="Enter a detailed job description"
          class="p-2 border border-gray-300 rounded-lg w-full outline-none"
        />

        <div
          class="input-errors"
          v-for="error of v$.description.$errors"
          :key="error.$uid"
        >
          <span class="text-xs text-danger-500">* {{ error.$message }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
