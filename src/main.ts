import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import { routes } from 'vue-router/auto-routes'
import 'uno.css'

createApp(App)
  .use(
    createRouter({
      routes: routes,
      history: createWebHashHistory()
    })
  )
  .mount('#app')
