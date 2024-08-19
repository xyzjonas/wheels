import { createApp } from 'vue'

import { Quasar } from 'quasar'
import 'quasar/dist/quasar.css'

import App from './App.vue'
import router from './router'

import 'virtual:uno.css'

const app = createApp(App)

app.use(Quasar, {
  plugins: {}, // import Quasar plugins and add here
  config: {
    brand: {
      primary: '#029f48'
    }
  }
})

app.use(router)

app.mount('#app')
