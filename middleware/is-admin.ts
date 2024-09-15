import { type IUserAuthData } from '~/types';
import { useAuthStore } from '~/store/index';

export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore();

  if (import.meta.server) return;

  if (
    (authStore.currentUserType as any as IUserAuthData).accountType !==
    LOGGED_USER.ADMIN
  ) {
    return navigateTo('/admin/dashboard');
  }
});
