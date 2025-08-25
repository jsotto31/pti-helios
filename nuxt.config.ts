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

  app: {
    pageTransition: { name: 'fade', mode: 'out-in' },
    head: {
      link: [
        {
          rel: 'icon',
          type: 'image/png',
          href: '/atom.png' // put favicon.png inside /public folder
        }
      ]
    }
  },

})