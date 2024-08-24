<script setup lang="ts">
import ApplicationIcon from './icons/ApplicationIcon.vue';
import CompanyIcon from './icons/CompanyIcon.vue';
import DashBoardIcon from './icons/DashboardIcon.vue';
import MessageIcon from './icons/MessageIcon.vue';
import NairaIcon from './icons/NairaIcon.vue';
import ProfileIcon from './icons/ProfileIcon.vue';
import SearchIcon from './icons/SearchIcon.vue';
import SettingIcon from './icons/SettingIcon.vue';




    const route = useRoute();

    const links = [
      { to: "/dashboard/jobseeker", icon: DashBoardIcon, name: "Dashboard" },
      { to: "/dashboard/jobseeker/my-applications", icon: ApplicationIcon, name: "My Applications" },
      { to: "/dashboard/jobseeker/find-jobs", icon: SearchIcon, name: "Find Jobs" },
      { to: "/dashboard/jobseeker/messages", icon: MessageIcon, name: "Messages" },
      { to: "/dashboard/jobseeker/browse-companies", icon: CompanyIcon, name: "Browse Companies (AI)" },
      { to: "/dashboard/jobseeker/pricing", icon: NairaIcon, name: "Pricing" },
      { to: "/dashboard/jobseeker/my-profile", icon: ProfileIcon, name: "My Public Profile" },
      { to: "/dashboard/jobseeker/settings", icon: SettingIcon, name: "Settings" },
    ];

const isActive = (path: string) => route.path === path;

console.log(route.path)

</script>

<template>
  <aside class="bg-[#FFFFFF] text-[#454545] min-h-screen fixed">
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
              'flex items-center py-4',
              isActive(link.to)
                ? 'bg-[#FFF6D3] text-[#FE8900] border-[#FE8900] border-l-4 pl-11 font-[900]' : 'pl-12',
              'text-xs',
            ]"
          >
            <!-- Render Icon -->
            <component
              :is="link.icon"
              class="inline-block mr-2"
              :isActive="isActive(link.to)"
            />
            {{ link.name }}
          </NuxtLink>
        </li>
      </ul>

      <!--  Logout Button -->
      <div class="absolute bottom-0 left-0 right-0 w-full">
        <NuxtLink
          to="/logout"
          class="flex py-6 w-full gap-2 pl-12 justify-start rounded hover:text-[#FE8900]"
        >
          <IconsLogoutIcon />
          Logout
        </NuxtLink>
      </div>
    </nav>
  </aside>
</template>
