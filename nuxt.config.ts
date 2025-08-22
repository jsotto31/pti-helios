// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetifyConfig from './vuetify.config'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  debug: true,
  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/scripts',
    'vuetify-nuxt-module',
    '@pinia/nuxt'
  ],

  vuetify: vuetifyConfig(),

  runtimeConfig: {
    public: {
      apiUrl: process.env.API_URL || '',
      secret_key: process.env.SECRET_KEY || ''
    },
    appName: process.env.APP_NAME || '',
  },

css: [
  '~/assets/styles/global.scss'  // this makes the SCSS global across all components
],

  app: {
    pageTransition: { name: 'fade', mode: 'out-in' },
    head: {
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Geist:wght@100..900&display=swap'
        }
      ]
    }
  }
})