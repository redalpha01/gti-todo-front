import './assets/main.css'

// Vuetify
import 'vuetify/styles';
import {createVuetify} from 'vuetify';
import {aliases, md} from 'vuetify/iconsets/md';

const vuetify = createVuetify({
    icons: {
        defaultSet: 'md',
        aliases,
        sets: {
            md,
        },
    },
    theme: {
        // defaultTheme: 'dark',
    },
});

import { createApp } from 'vue'
import {createPinia} from 'pinia'

const pinia = createPinia();

import App from './App.vue'

createApp(App)
    .use(pinia)
    .use(vuetify)
    .mount('#app')
