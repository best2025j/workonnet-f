export default defineNuxtRouteMiddleware((to, from) => {
  const authPages = ['auth/signin/recruiter', 'auth/signin/jobseeker'];
  if (import.meta.server) return;
  if (authPages.includes(to.path)) return;
});
