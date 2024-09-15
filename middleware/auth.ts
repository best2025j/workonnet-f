import type { RouteLocationNormalized } from 'vue-router';
import { useAuthStore } from '~/store/index';

export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore();

  if (import.meta.server) return;

  if (!authStore.isAuthenticated) {
    return navigateTo('/auth/signin');
  }

  if (to.path === '/') return navigateTo('/home');

  if (to.path === '/wallet') return navigateTo('/home');

  if (to.path === '/creator/wallet') return navigateTo('/creator/challenges');

  return;
  // if (isHydrated.value) return handleAuth(to);
  // onHydrated(() => handleAuth(to));
});

// function handleAuth(to: RouteLocationNormalized) {}
