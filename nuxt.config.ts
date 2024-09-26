// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config';

export default defineNuxtConfig({
  ssr: true,
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  css: ['@/assets/css/main.css', '@/assets/css/loaders.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  plugins: [{ src: '@/plugins/scroll-behavior.client.ts', mode: 'client' }],
  modules: ['@pinia/nuxt', '@pinia-plugin-persistedstate/nuxt', '@vueuse/nuxt'],
  pinia: {
    storesDirs: ['./store/**', './store/modules/**'],
  },

  // config
  runtimeConfig: {
    apiBaseUrl: '',
    public: {
      apiSecret: '',
    },
  },
});

