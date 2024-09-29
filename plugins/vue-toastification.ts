// toast.js
import Toast, { POSITION } from 'vue-toastification';
import 'vue-toastification/dist/index.css';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Toast, {
    position: POSITION.TOP_RIGHT,
    hideProgressBar: false,
    toastClassName: 'custom-toasts',
    timeout: 3000,
  });
});
