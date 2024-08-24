<script>
import BellIcon from "~/components/icons/BellIcon.vue";
import DashBoardIcon from "~/components/icons/DashBoardIcon.vue";
import ApplicationIcon from "~/components/icons/ApplicationIcon.vue";
import SearchIcon from "~/components/icons/SearchIcon.vue";
import MessageIcon from "~/components/icons/MessageIcon.vue";
import CompanyIcon from "~/components/icons/CompanyIcon.vue";
import NairaIcon from "~/components/icons/NairaIcon.vue";
import ProfileIcon from "~/components/icons/ProfileIcon.vue";
import SettingIcon from "~/components/icons/SettingIcon.vue";

export default {
  name: "JobSeekerSideNav",
  components: {
    BellIcon,
  },

  setup() {
    const route = useRoute();

    const links = [
      { to: "/jobseeker/", icon: DashBoardIcon, name: "Dashboard" },
      { to: "/jobseeker/", icon: ApplicationIcon, name: "My Applications" },
      { to: "/jobseeker/", icon: SearchIcon, name: "Find Jobs" },
      { to: "/jobseeker/", icon: MessageIcon, name: "Messages" },
      { to: "/jobseeker/", icon: CompanyIcon, name: "Browse Companies (AI)" },
      { to: "/jobseeker/", icon: NairaIcon, name: "Pricing" },
      { to: "/jobseeker/", icon: ProfileIcon, name: "My Public Profile" },
      { to: "/jobseeker/", icon: SettingIcon, name: "Settings" },
      // Add other links here with corresponding icons
    ];

    const isActive = (path) => route.path === path;

    return { links, isActive };
  },
};
</script>

<template>
  <aside class="bg-[#FFFFFF] text-[#454545] w-64 min-h-screen text-xs relative">
    <!-- logo -->
    <div>
      <img src="/assets/images/logo.png" class="w-full h-auto" alt="logo" />
    </div>

    <!-- side nav -->
    <nav>
      <ul class="space-y-4">
        <li v-for="(link, index) in links" :key="index">
          <NuxtLink
            :to="link.to"
            :class="[
              'flex items-center py-2 px-4 rounded',
              isActive(link.to)
                ? 'bg-[#FE8900] text-white'
                : 'hover:bg-[#FFF6D3] hover:text-[#FE8900] hover:border-[#FE8900] hover:border-l-4',
            ]"
          >
            <!-- Render Icon -->
            <component
              :is="link.icon"
              class="h-6 w-6 inline-block mr-2"
              :class="[
                isActive(link.to) ? 'text-white' : 'text-[#454545]',
                'hover:text-[#FE8900] flex  items-center',
              ]"
            />
            {{ link.name }}
          </NuxtLink>
        </li>
      </ul>
    </nav>

    <!--  Logout Button -->
    <div class="absolute bottom-0 left-0 w-full">
      <NuxtLink
        to="/logout"
        class="flex pl-4 py-10 w-full justify-start border rounded hover:text-[#FE8900]"
      >
        Logout
      </NuxtLink>
    </div>
  </aside>
</template>
