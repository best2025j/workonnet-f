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

  imports: {
    autoImport: true,
  },
  plugins: [{ src: '@/plugins/scroll-behavior.client.ts', mode: 'client' }],
  modules: [
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    '@vueuse/nuxt',
    'nuxt-vue3-google-signin',
  ],
  pinia: {
    storesDirs: ['./store/**', './store/modules/**'],
  },
  googleSignIn: {
    clientId: process.env.NUXT_PUBLIC_GOOGLE_CLIENT_ID,
  },
  // app: {
  //   head: {
  //     title: 'Workonnect Africa',
  //     charset: 'utf-8',
  //     viewport: 'width=device-width, initial-scale=1',
  //     link: [{ rel: 'icon', type: 'image/x-icon', href: './favicon.ico' }],
  //   },
  // },

  // config
  runtimeConfig: {
    apiBaseUrl: '',
    public: {
      apiSecret: '',
      paystackKey: '',
      linkedinId: '',
      linkedinSecret: '',
    },
  },

  build: {
    transpile: ['vue-toastification'],
  },
});