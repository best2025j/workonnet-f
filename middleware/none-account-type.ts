import { type IUserAuthData } from '~/types';
import { useAuthStore } from '~/store/index';

export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore();

  if (import.meta.server) return;

  if (
    (authStore.loggedInUser as IUserAuthData)?.accountType != LOGGED_USER.GUEST
  ) {
    return navigateTo('/');
  }
});
