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

app.use(Quasar, {
  plugins: {
    LoadingBar,
    Notify,
  },
  config: {
    config: {
      loadingBar: {
        
      },
      notify: {
        icon: 'i-hugeicons'
      }
    },
    brand: {
      primary: '#5e44ff',
      secondary: '#0d0924',
      // dark: '#0d0924',
      negative: '#9b1c31',
    },
  }
})

app.use(router)

app.mount('#app')
