import { useLocalStore } from '~/store/index';

export default defineNuxtRouteMiddleware((to, from) => {
  const localStore = useLocalStore();

  if (import.meta.server) return;

  if (localStore.errorData !== null) {
    return;
  }

  return navigateTo('/');
});
