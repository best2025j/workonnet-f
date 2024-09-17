import { useAuthStore } from '~~/store/index';

export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore();

  if (import.meta.server) return;

  if (authStore.isAuthenticated && authStore.userToken !== 'no-auth') {
    if (authStore.currentUserType === LOGGED_USER.ADMIN) {
      return navigateTo('/admin/dashboard');
    }

    if (authStore.currentUserType === LOGGED_USER.JOBSEEKER) {
      return navigateTo('/dashboard/jobseeker');
    }

    if (authStore.currentUserType === LOGGED_USER.RECRUITER) {
      return navigateTo('/dashboard/recruiter');
    }

    return;
  }

  return;
});
