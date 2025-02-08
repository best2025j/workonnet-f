import VueTelInput from './vue-3-tel-input';

const VueTelInputOptions = {
  mode: 'international',
  onlyCountries: ['NG'],
};

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueTelInput, VueTelInputOptions);
});
