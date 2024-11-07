export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();
  const script = document.createElement('script');
  script.src = `https://maps.googleapis.com/maps/api/js?key=${config.public.googleApiKey}&libraries=places`;
  script.async = true;
  document.head.appendChild(script);
});
