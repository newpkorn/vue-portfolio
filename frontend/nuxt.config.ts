// nuxt.config.js
export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      baseApiUrl: process.env.NUXT_PUBLIC_BASE_API_URL,
    },
  },
  build: {
    transpile: ['@vuepic/vue-datepicker']
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  css: [
    '@/assets/css/main.css',
    'vue-final-modal/style.css',
  ],
  modules: [
    '@pinia/nuxt',
    '@vee-validate/nuxt',
    '@vueuse/nuxt',
    'vue3-carousel-nuxt',
  ],
  carousel: {
    prefix: 'Base'
  },
})
