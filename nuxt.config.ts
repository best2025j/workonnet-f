// https://nuxt.com/docs/api/configuration/nuxt-config

import { defineNuxtConfig } from "nuxt/config";
// import { defineNuxtConfig } from 'nuxt3';

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  plugins: [{ src: '~/plugins/scroll-behavior.client.ts', mode: 'client' }],
  modules: ['@pinia/nuxt', '@pinia-plugin-persistedstate/nuxt'],
  pinia: {
    storesDirs: ['./store/**'],
  },
});