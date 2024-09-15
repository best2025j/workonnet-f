import { useAuthStore } from '~~/store/index';

export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore();

  if (import.meta.server) return;

  if (authStore.isAuthenticated === true && authStore.userToken !== 'no-auth') {
    if (to.path !== '/') {
      return navigateTo('/');
    }
  }
});
