import type { RouteLocationNormalized } from 'vue-router';
import { useAuthStore } from '~/store/index';

export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore();

  if (import.meta.server) return;

  if (!authStore.isAuthenticated) {
    return navigateTo('/');
  }

  if (to.path === '/') {
    if ((authStore.currentUserType as LOGGED_USER) === LOGGED_USER.JOBSEEKER)
      return navigateTo('/dashboard/jobseeker');
    if ((authStore.currentUserType as LOGGED_USER) === LOGGED_USER.RECRUITER)
      return navigateTo('/dashboard/recruiter');
    if ((authStore.currentUserType as LOGGED_USER) === LOGGED_USER.ADMIN)
      return navigateTo('/admin/dashboard');
  }

  return;
});
