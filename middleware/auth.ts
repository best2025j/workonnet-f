import { useAuthStore } from '~/store/index';

export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore();

  if (import.meta.server) return;

  console.log('Middleware AuthStore:', {
    isAuthenticated: authStore.isAuthenticated,
    userToken: authStore.userToken,
  });

  if (!authStore.isAuthenticated) {
    return navigateTo('/');
  }
});
