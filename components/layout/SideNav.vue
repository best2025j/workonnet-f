<script setup lang="ts">
import ApplicationIcon from "../icons/ApplicationIcon.vue";
import CandidatesIcon from "../icons/CandidatesIcon.vue";
import CompanyIcon from "../icons/CompanyIcon.vue";
import DashBoardIcon from "../icons/DashboardIcon.vue";
import JobIcon from "../icons/JobIcon.vue";
import MessageIcon from "../icons/MessageIcon.vue";
import NairaIcon from "../icons/NairaIcon.vue";
import ProfileIcon from "../icons/ProfileIcon.vue";
import SearchIcon from "../icons/SearchIcon.vue";
import SettingIcon from "../icons/SettingIcon.vue";

const route = useRoute();

const jobSeekerLinks = [
  {
    to: "/dashboard/jobseeker",
    icon: DashBoardIcon,
    name: "Dashboard",
    pageName: "dashboard.jobseeker.index",
  },
  {
    to: "/dashboard/jobseeker/my-applications?tab=applied",
    icon: ApplicationIcon,
    name: "My Applications",
    pageName: "dashboard.jobseeker.my-applications.index",
  },
  {
    to: "/dashboard/jobseeker/find-jobs",
    icon: SearchIcon,
    name: "Find Jobs",
    pageName: "dashboard.jobseeker.find-jobs.index",
  },
  {
    to: "/dashboard/jobseeker/messages",
    icon: MessageIcon,
    name: "Messages",
    pageName: "dashboard.jobseeker.messages",
  },
  {
    to: "/dashboard/jobseeker/browse-companies",
    icon: CompanyIcon,
    name: "Browse Companies (AI)",
    pageName: "dashboard.jobseeker.browse-companies",
  },
  {
    to: "/dashboard/jobseeker/pricing",
    icon: NairaIcon,
    name: "Pricing",
    pageName: "dashboard.jobseeker.pricing",
  },
  {
    to: "/dashboard/jobseeker/my-profile",
    icon: ProfileIcon,
    name: "My Public Profile",
    pageName: "dashboard.jobseeker.my-profile.index",
  },
  {
    to: "/dashboard/jobseeker/settings",
    icon: SettingIcon,
    name: "Settings",
    pageName: "dashboard.jobseeker.settings",
  },
];

const recruiterLinks = [
  {
    to: "/dashboard/recruiter/job",
    icon: DashBoardIcon,
    name: "Dashboard",
    pageName: "dashboard.recruiter.job.index",
  },
  {
    to: "/dashboard/recruiter/jobs-openings",
    icon: JobIcon,
    name: "Jobs Opening",
    pageName: "dashboard.recruiter.jobs-opening.index",
  },
  {
    to: "/dashboard/recruiter/candidates",
    icon: CandidatesIcon,
    name: "Candidates",
    pageName: "dashboard.recruiter.candidates",
  },

  {
    to: "/dashboard/recruiter/messages",
    icon: MessageIcon,
    name: "Messages",
    pageName: "dashboard.recruiter.messages",
  },

  {
    to: "/dashboard/recruiter/pricing",
    icon: NairaIcon,
    name: "Pricing",
    pageName: "dashboard.recruiter.pricing",
  },

  {
    to: "/dashboard/recruiter/company-profile",
    icon: CompanyIcon,
    name: "Company Profile",
    pageName: "dashboard.recruiter.company-profile",
  },
  {
    to: "/dashboard/recruiter/settings",
    icon: SettingIcon,
    name: "Settings",
    pageName: "dashboard.recruiter.settings",
  },
];

enum LOGGED_USER {
  RECRUITER = "recruiter",
  JOBSEEKER = "jobseeker",
}

// switch for jobseekers and recruiter manually
const currentUser = ref(LOGGED_USER.RECRUITER);

const isActive = (pageName: string) => route.meta?.pageName === pageName;
</script>

<template>
  <aside class="bg-[#FFFFFF] text-black-800 min-h-screen fixed">
    <!-- logo -->
    <div>
      <img src="/assets/images/logo.png" class="w-full h-auto" alt="logo" />
    </div>

    <!-- side nav -->
    <nav class="">
      <ul class="w-full" v-show="currentUser === LOGGED_USER.JOBSEEKER">
        <li v-for="(link, index) in jobSeekerLinks" :key="index">
          <NuxtLink
            :to="link.to"
            :class="[
              isActive(link.pageName)
                ? 'bg-westside-100 text-primary-1 border-primary-1 border-l-4 !pl-11 font-[900]'
                : 'pl-12',
              'flex items-center py-4 text-xs',
            ]"
          >
            <!-- Render Icon -->
            <component
              :is="link.icon"
              class="inline-block mr-2"
              :isActive="isActive(link.pageName)"
            />
            {{ link.name }}
          </NuxtLink>
        </li>
      </ul>

      <ul class="w-full" v-show="currentUser === LOGGED_USER.RECRUITER">
        <li v-for="(link, index) in recruiterLinks" :key="index">
          <NuxtLink
            :to="link.to"
            :class="[
              isActive(link.pageName)
                ? 'bg-westside-100 text-primary-1 border-primary-1 border-l-4 !pl-11 font-[900]'
                : 'pl-12',
              'flex items-center py-4 text-xs',
            ]"
          >
            <!-- Render Icon -->
            <component
              :is="link.icon"
              class="inline-block mr-2"
              :isActive="isActive(link.pageName)"
            />
            {{ link.name }}
          </NuxtLink>
        </li>
      </ul>

      <!--  -->
      <div class="flex justify-center items-center py-4">
        <img src="/assets/images/discover.png" alt="no image yet" />
      </div>

      <!--  Logout Button -->
      <div class="absolute bottom-0 left-0 right-0 w-full">
        <button
          class="flex py-6 w-full gap-2 pl-12 justify-start rounded hover:text-primary-1"
        >
          <IconsLogoutIcon />
          Logout
        </button>
      </div>
    </nav>
  </aside>
</template>
