import { useAuthStore } from '~/store/index';

export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore();

  if (import.meta.server) return;

  if (authStore.currentUserType !== LOGGED_IN_USER.JOBSEEKER) {
    return navigateTo('/');
  }
});
