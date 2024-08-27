import { createApp } from 'vue'

import { Quasar, LoadingBar, Notify } from 'quasar'
import 'quasar/dist/quasar.css'

import App from './App.vue'
import router from './router'

import 'virtual:uno.css'

// Import icon libraries
import '@quasar/extras/material-icons/material-icons.css'
import '@quasar/extras/ionicons-v4/ionicons-v4.css'

const app = createApp(App)

const color = localStorage.getItem('primary-color') ?? '#5e44ff'
app.use(Quasar, {
  plugins: {
    LoadingBar,
    Notify,
  },
  config: {
    brand: {
      primary: color,
      secondary: '#0d0924',
      // dark: '#0d0924',
      negative: '#9b1c31',
    },
    notify: {
      position: 'bottom-left',
    }
  }
})

app.use(router)

app.mount('#app')
