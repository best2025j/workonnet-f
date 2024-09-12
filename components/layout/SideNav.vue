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
import SpeekerIcon from "../icons/SpeekerIcon.vue";

const route = useRoute();
const localStore = useLocalStore();

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
    to: "/dashboard/recruiter",
    icon: DashBoardIcon,
    name: "Dashboard",
    pageName: "dashboard.recruiter.job.index",
  },
  {
    to: "/dashboard/recruiter/jobs-openings?tab=active",
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
    pageName: "dashboard.recruiter.company-profile.index",
  },
  {
    to: "/dashboard/recruiter/settings",
    icon: SettingIcon,
    name: "Settings",
    pageName: "dashboard.recruiter.settings",
  },
];

const admin = [
  {
    to: "/admin/dashboard/",
    icon: DashBoardIcon,
    name: "Dashboard",
    pageName: "admin.dashboard.index",
  },
  {
    to: "/admin/dashboard/posted-jobs?tab=under-review",
    icon: ApplicationIcon,
    name: "Jobs",
    pageName: "admin.dashboard.posted-jobs",
  },
  {
    to: "/admin/dashboard/recruiters",
    icon: SpeekerIcon,
    name: "Recruiters",
    pageName: "admin.dashboard.recruiters",
  },
  {
    to: "/admin/dashboard/jobseekers",
    icon: CandidatesIcon,
    name: "Jobseekers",
    pageName: "admin.dashboard.jobseekers",
  },
  {
    to: "/admin/dashboard/subscriptions",
    icon: NairaIcon,
    name: "Subscriptions",
    pageName: "admin.dashboard.subscriptions",
  },
];

// const isActive = (pageName: string) => route.meta?.pageName === pageName;

const isActive = (pageName: string) => {
  return route.meta?.pageName === pageName;
};
</script>

<template>
  <aside class="bg-[#FFFFFF] text-black-800 min-h-screen fixed">
    <!-- logo -->
    <div>
      <img src="/assets/images/logo.png" class="w-full h-auto" alt="logo" />
    </div>

    <!-- side nav -->
    <nav class="">
      <!-- jobseekers sidenav -->
      <ul
        class="w-full"
        v-show="localStore.$state.currentUserType === LOGGED_USER.JOBSEEKER"
      >
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

      <!-- recruiters sidenav -->
      <ul
        class="w-full"
        v-show="localStore.$state.currentUserType === LOGGED_USER.RECRUITER"
      >
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

      <!-- admin -->
      <ul
        class="w-full"
        v-show="localStore.$state.currentUserType === LOGGED_USER.ADMIN"
      >
        <li v-for="(link, index) in admin" :key="index">
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
      <div
        v-show="localStore.$state.currentUserType === LOGGED_USER.RECRUITER"
        class="flex justify-center items-center mt-4 py-4 w-[218px] bg-westside-100 flex-col mx-auto rounded-10 space-y-4"
      >
        <span
          ><svg
            width="44"
            height="30"
            viewBox="0 0 44 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M43.7499 3V15C43.7499 15.5967 43.5129 16.169 43.0909 16.591C42.6689 17.0129 42.0967 17.25 41.4999 17.25C40.9032 17.25 40.3309 17.0129 39.9089 16.591C39.487 16.169 39.2499 15.5967 39.2499 15V8.4375L25.0918 22.5975C24.8828 22.8073 24.6344 22.9737 24.3609 23.0873C24.0874 23.2008 23.7942 23.2593 23.498 23.2593C23.2019 23.2593 22.9087 23.2008 22.6352 23.0873C22.3617 22.9737 22.1133 22.8073 21.9043 22.5975L15.9999 16.6875L4.09179 28.5919C3.66911 29.0146 3.09582 29.252 2.49804 29.252C1.90027 29.252 1.32698 29.0146 0.904294 28.5919C0.481605 28.1692 0.244141 27.5959 0.244141 26.9981C0.244141 26.4004 0.481605 25.8271 0.904293 25.4044L14.4043 11.9044C14.6133 11.6946 14.8617 11.5282 15.1352 11.4146C15.4087 11.3011 15.7019 11.2426 15.998 11.2426C16.2942 11.2426 16.5874 11.3011 16.8609 11.4146C17.1344 11.5282 17.3828 11.6946 17.5918 11.9044L23.4999 17.8125L36.0624 5.25H29.4999C28.9032 5.25 28.3309 5.01295 27.9089 4.59099C27.487 4.16903 27.2499 3.59674 27.2499 3C27.2499 2.40326 27.487 1.83097 27.9089 1.40901C28.3309 0.987053 28.9032 0.75 29.4999 0.75H41.4999C42.0967 0.75 42.6689 0.987053 43.0909 1.40901C43.5129 1.83097 43.7499 2.40326 43.7499 3Z"
              fill="#0FA968"
            />
          </svg>
        </span>
        <div class="w-[173px] text-center space-y-4 pb-2">
          <h1 class="font-black text-base">Discover our advanced feature</h1>
          <p class="text-xs">Subscribe to get more out of workonnect</p>
        </div>
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
