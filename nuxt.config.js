import ApiService from './services/ApiService.js';
import colors from 'vuetify/es5/util/colors';

module.exports = {
    /*
    ** Nuxt rendering mode
    ** See https://nuxtjs.org/api/configuration-mode
    */
    mode: 'universal',
    /*
    ** Nuxt target
    ** See https://nuxtjs.org/api/configuration-target
    */
    target: 'server',
    /*
    ** Headers of the page
    ** See https://nuxtjs.org/api/configuration-head
    */
    head: {
        titleTemplate: '%s ' + 'codingmemo.ovh',
        // title: 'codingmemo.ovh' || '',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
        ]
    },
    /*
    ** Customize the progress-bar color
    */
    loading: { color: '#fff' },
    /*
    ** Global CSS
    */
    css: [
        { src: '~/node_modules/highlight.js/styles/tomorrow-night-bright', lang: 'css' }
    ],
    /*
    ** Plugins to load before mounting the App
    */
    plugins: [
    ],
    /*
    ** Nuxt.js dev-modules
    */
    buildModules: [
        '@nuxtjs/vuetify',
    ],
    /*
    ** Nuxt.js modules
    */
    modules: [
        '@nuxtjs/axios',
    ],
    /*
    ** vuetify module configuration
    ** https://github.com/nuxt-community/vuetify-module
    */
    vuetify: {
        customVariables: ['~/assets/variables.scss'],
        theme: {
        dark: true,
        themes: {
            dark: {
            primary: colors.blue.darken2,
            accent: colors.grey.darken3,
            secondary: colors.amber.darken3,
            info: colors.teal.lighten1,
            warning: colors.amber.base,
            error: colors.deepOrange.accent4,
            success: colors.green.accent3
            }
        }
        }
    },
    /*
    ** Build configuration
    */
    build: {
        /*
        ** You can extend webpack config here
        */
        extend (config, ctx) {
        }
    },
    server: {
        host: '0.0.0.0',
        port: 9012
    }
    ,
    generate: {
        routes: () => {
        return ApiService.getLanguages().then(response => {
            return response.data.map(language => {
            return '/languages/' + language.name
            })
        })
        }
    },
    telemetry: true,
    // https://medium.com/@mitsuyawatanabe/how-to-start-express-project-in-nuxt-2-x-d3406c92a8ca
    serverMiddleware: [
        { path: '/api', handler: '~/server/api.js' },
    ],
    axios: {
        baseURL: (process.env.NODE_ENV !== 'production') ? 'http://localhost:9012/api' : 'http://codingmemo.ovh/api',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
    }
}
