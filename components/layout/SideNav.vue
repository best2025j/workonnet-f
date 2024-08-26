<script setup lang="ts">
import ApplicationIcon from '../icons/ApplicationIcon.vue';
import CompanyIcon from "../icons/CompanyIcon.vue";
import DashBoardIcon from "../icons/DashboardIcon.vue";
import MessageIcon from "../icons/MessageIcon.vue";
import NairaIcon from "../icons/NairaIcon.vue";
import ProfileIcon from "../icons/ProfileIcon.vue";
import SearchIcon from "../icons/SearchIcon.vue";
import SettingIcon from "../icons/SettingIcon.vue";

const route = useRoute();

const links = [
  { to: "/dashboard/jobseeker", icon: DashBoardIcon, name: "Dashboard", pageName: 'dashboard.index' },
  {
    to: "/dashboard/jobseeker/my-applications?tab=applied",
    icon: ApplicationIcon,
    name: "My Applications",
    pageName: 'dashboard.my-applications'
  },
  { to: "/dashboard/jobseeker/find-jobs", icon: SearchIcon, name: "Find Jobs", pageName: 'dashboard.find-jobs' },
  { to: "/dashboard/jobseeker/messages", icon: MessageIcon, name: "Messages", pageName: 'dashboard.messages' },
  {
    to: "/dashboard/jobseeker/browse-companies",
    icon: CompanyIcon,
    name: "Browse Companies (AI)",
    pageName: 'dashboard.browse-companies'
  },
  { to: "/dashboard/jobseeker/pricing", icon: NairaIcon, name: "Pricing", pageName: 'dashboard.pricing' },
  {
    to: "/dashboard/jobseeker/my-profile",
    icon: ProfileIcon,
    name: "My Public Profile",
    pageName: 'dashboard.my-profile'
  },
  { to: "/dashboard/jobseeker/settings", icon: SettingIcon, name: "Settings", pageName: 'dashboard.settings' },
];

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
      <ul class="w-full">
        <li v-for="(link, index) in links" :key="index">
          <NuxtLink
            :to="link.to"
            :class="[
              isActive(link.pageName) ? 'bg-westside-100 text-primary-1 border-primary-1 border-l-4 !pl-11 font-[900]' : 'pl-12',
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
