import VueTelInput from './vue-3-tel-input/index';

export default defineNuxtPlugin((nuxtApp) => {
  const VueTelInputOptions = {
    mode: 'international',
    onlyCountries: ['NG'],
  };

  nuxtApp.vueApp.use(VueTelInput, VueTelInputOptions);
});
