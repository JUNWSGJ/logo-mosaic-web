import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import VueDevTools from 'vite-plugin-vue-devtools'
import VueRouter from 'unplugin-vue-router/vite'
import VueComponents from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import UnoCss from 'unocss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    VueRouter(),
    VueComponents({
      resolvers: [NaiveUiResolver()]
    }),
    VueDevTools(),
    UnoCss()
  ],
  server: {
    proxy: {
      '/api': 'http://47.100.0.227:8002',
      '/images': 'http://47.100.0.227:8002',
      // '/api': 'http://localhost:8002',
      // '/images': 'http://localhost:8002',
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
