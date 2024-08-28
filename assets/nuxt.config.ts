// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  pages: true,
  // ssr: true,
  experimental: {
    payloadExtraction: false,
  },
  css: [
    '~/assets/css/styles.css',
    '~/assets/css/main.css',
    '~/assets/css/loaders.css',
    // 'https://unpkg.com/nprogress@0.2.0/nprogress.css',
  ],
  build: {
    // vue-toastification - old commonjs module
    transpile: ['vue-toastification'],
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: [
    '@vueuse/nuxt',
    '@pinia/nuxt',
    // '@pinia-plugin-persistedstate/nuxt',
    // '@vite-pwa/nuxt',
  ],
  pinia: {
    autoImports: [
      // automatically imports `defineStore`
      'defineStore', // import { defineStore } from 'pinia'
      'storeToRefs',
      ['defineStore', 'definePiniaStore'], // import { defineStore as definePiniaStore } from 'pinia'
    ],
  },
  plugins: [
    { src: '~/plugins/vue-3-tel-input/index.js', mode: 'client' }, // only on client side
  ],
  // pwa: {
  //   manifest: {
  //     name: 'Earngage',
  //     short_name: 'Earngage',
  //     description: 'Engagement while earning',
  //     theme_color: '#100E0E',
  //     icons: [
  //       {
  //         src: 'pwa-192x192.png',
  //         sizes: '192x192',
  //         type: 'image/png',
  //       },
  //       {
  //         src: 'pwa-512x512.png',
  //         sizes: '512x512',
  //         type: 'image/png',
  //       },
  //       {
  //         src: 'pwa-512x512.png',
  //         sizes: '512x512',
  //         type: 'image/png',
  //         purpose: 'any maskable',
  //       },
  //     ],
  //   },
  //   workbox: {
  //     navigateFallback: '/',
  //     globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
  //   },
  //   client: {
  //     installPrompt: true,
  //     // you don't need to include this: only for testing purposes
  //     // if enabling periodic sync for update use 1 hour or so (periodicSyncForUpdates: 3600)
  //     periodicSyncForUpdates: 3600,
  //   },
  //   devOptions: {
  //     enabled: true,
  //     type: 'module',
  //   },
  // },
  app: {
    keepalive: true,
    head: {
      charset: 'utf-8',
      viewport:
        'width=device-width,initial-scale=1,maximum-scale=1,viewport-fit=cover',
      title: 'Earngage',
      bodyAttrs: {
        class: 'overflow-x-hidden',
      },
      link: [
        { rel: 'icon', href: '/favicon.ico', sizes: 'any' },
        { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
      ],
      meta: [
        {
          name: 'apple-mobile-web-app-status-bar-style',
          content: 'black-translucent',
        },
        // open graph social image
        { property: 'og:title', content: 'Earngage' },
        { property: 'og:description', content: 'Earngage App' },
        { property: 'og:type', content: 'website' },
        // { property: 'og:image', content: '' },
        // { property: 'og:image:width', content: '3800' },
        // { property: 'og:image:height', content: '1900' },
      ],
    },
  },
  // runtimeConfig: {
  //   // Private keys are only available on the server
  //   passphrase: 'uiwejsdui',
  //   // Public keys that are exposed to the client
  //   public: {
  //     API_BASE_URL: process.env.NUXT_PUBLIC_API_BASE || '/api/',
  //     BASE_API_BROWSER_URL: '',
  //   },
  // },
});
