import { createApp } from 'vue'

import { Quasar, LoadingBar } from 'quasar'
import 'quasar/dist/quasar.css'

import App from './App.vue'
import router from './router'

import 'virtual:uno.css'

const app = createApp(App)

app.use(Quasar, {
  plugins: {
    LoadingBar
  },
  config: {
    config: {
      loadingBar: {
        
      }
    },
    brand: {
      primary: '#2bb1a6'
    }
  }
})

app.use(router)

app.mount('#app')
