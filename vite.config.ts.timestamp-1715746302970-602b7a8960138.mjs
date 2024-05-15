// vite.config.ts
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "file:///D:/my_workspace/logo-mosaic-web/node_modules/.pnpm/vite@5.2.11_@types+node@20.12.11/node_modules/vite/dist/node/index.js";
import vue from "file:///D:/my_workspace/logo-mosaic-web/node_modules/.pnpm/@vitejs+plugin-vue@5.0.4_vite@5.2.11_vue@3.4.27/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import vueJsx from "file:///D:/my_workspace/logo-mosaic-web/node_modules/.pnpm/@vitejs+plugin-vue-jsx@3.1.0_vite@5.2.11_vue@3.4.27/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs";
import VueDevTools from "file:///D:/my_workspace/logo-mosaic-web/node_modules/.pnpm/vite-plugin-vue-devtools@7.1.3_vite@5.2.11_vue@3.4.27/node_modules/vite-plugin-vue-devtools/dist/vite.mjs";
import VueRouter from "file:///D:/my_workspace/logo-mosaic-web/node_modules/.pnpm/unplugin-vue-router@0.8.6_vue-router@4.3.2_vue@3.4.27/node_modules/unplugin-vue-router/dist/vite.mjs";
import VueComponents from "file:///D:/my_workspace/logo-mosaic-web/node_modules/.pnpm/unplugin-vue-components@0.27.0_vue@3.4.27/node_modules/unplugin-vue-components/dist/vite.js";
import { NaiveUiResolver } from "file:///D:/my_workspace/logo-mosaic-web/node_modules/.pnpm/unplugin-vue-components@0.27.0_vue@3.4.27/node_modules/unplugin-vue-components/dist/resolvers.js";
import UnoCss from "file:///D:/my_workspace/logo-mosaic-web/node_modules/.pnpm/unocss@0.60.0_postcss@8.4.38_vite@5.2.11/node_modules/unocss/dist/vite.mjs";
var __vite_injected_original_import_meta_url = "file:///D:/my_workspace/logo-mosaic-web/vite.config.ts";
var vite_config_default = defineConfig({
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
      "/api": "http://47.100.0.227:8002",
      "/images": "http://47.100.0.227:8002"
      // '/api': 'http://localhost:8002',
      // '/images': 'http://localhost:8002',
    }
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxteV93b3Jrc3BhY2VcXFxcbG9nby1tb3NhaWMtd2ViXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxteV93b3Jrc3BhY2VcXFxcbG9nby1tb3NhaWMtd2ViXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9teV93b3Jrc3BhY2UvbG9nby1tb3NhaWMtd2ViL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZmlsZVVSTFRvUGF0aCwgVVJMIH0gZnJvbSAnbm9kZTp1cmwnXHJcblxyXG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xyXG5pbXBvcnQgdnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSdcclxuaW1wb3J0IHZ1ZUpzeCBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUtanN4J1xyXG5pbXBvcnQgVnVlRGV2VG9vbHMgZnJvbSAndml0ZS1wbHVnaW4tdnVlLWRldnRvb2xzJ1xyXG5pbXBvcnQgVnVlUm91dGVyIGZyb20gJ3VucGx1Z2luLXZ1ZS1yb3V0ZXIvdml0ZSdcclxuaW1wb3J0IFZ1ZUNvbXBvbmVudHMgZnJvbSAndW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvdml0ZSdcclxuaW1wb3J0IHsgTmFpdmVVaVJlc29sdmVyIH0gZnJvbSAndW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvcmVzb2x2ZXJzJ1xyXG5pbXBvcnQgVW5vQ3NzIGZyb20gJ3Vub2Nzcy92aXRlJ1xyXG5cclxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcclxuICBwbHVnaW5zOiBbXHJcbiAgICB2dWUoKSxcclxuICAgIHZ1ZUpzeCgpLFxyXG4gICAgVnVlUm91dGVyKCksXHJcbiAgICBWdWVDb21wb25lbnRzKHtcclxuICAgICAgcmVzb2x2ZXJzOiBbTmFpdmVVaVJlc29sdmVyKCldXHJcbiAgICB9KSxcclxuICAgIFZ1ZURldlRvb2xzKCksXHJcbiAgICBVbm9Dc3MoKVxyXG4gIF0sXHJcbiAgc2VydmVyOiB7XHJcbiAgICBwcm94eToge1xyXG4gICAgICAnL2FwaSc6ICdodHRwOi8vNDcuMTAwLjAuMjI3OjgwMDInLFxyXG4gICAgICAnL2ltYWdlcyc6ICdodHRwOi8vNDcuMTAwLjAuMjI3OjgwMDInLFxyXG4gICAgICAvLyAnL2FwaSc6ICdodHRwOi8vbG9jYWxob3N0OjgwMDInLFxyXG4gICAgICAvLyAnL2ltYWdlcyc6ICdodHRwOi8vbG9jYWxob3N0OjgwMDInLFxyXG4gICAgfVxyXG4gIH0sXHJcbiAgcmVzb2x2ZToge1xyXG4gICAgYWxpYXM6IHtcclxuICAgICAgJ0AnOiBmaWxlVVJMVG9QYXRoKG5ldyBVUkwoJy4vc3JjJywgaW1wb3J0Lm1ldGEudXJsKSlcclxuICAgIH1cclxuICB9XHJcbn0pXHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBcVIsU0FBUyxlQUFlLFdBQVc7QUFFeFQsU0FBUyxvQkFBb0I7QUFDN0IsT0FBTyxTQUFTO0FBQ2hCLE9BQU8sWUFBWTtBQUNuQixPQUFPLGlCQUFpQjtBQUN4QixPQUFPLGVBQWU7QUFDdEIsT0FBTyxtQkFBbUI7QUFDMUIsU0FBUyx1QkFBdUI7QUFDaEMsT0FBTyxZQUFZO0FBVHdKLElBQU0sMkNBQTJDO0FBWTVOLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxJQUNQLElBQUk7QUFBQSxJQUNKLE9BQU87QUFBQSxJQUNQLFVBQVU7QUFBQSxJQUNWLGNBQWM7QUFBQSxNQUNaLFdBQVcsQ0FBQyxnQkFBZ0IsQ0FBQztBQUFBLElBQy9CLENBQUM7QUFBQSxJQUNELFlBQVk7QUFBQSxJQUNaLE9BQU87QUFBQSxFQUNUO0FBQUEsRUFDQSxRQUFRO0FBQUEsSUFDTixPQUFPO0FBQUEsTUFDTCxRQUFRO0FBQUEsTUFDUixXQUFXO0FBQUE7QUFBQTtBQUFBLElBR2I7QUFBQSxFQUNGO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLLGNBQWMsSUFBSSxJQUFJLFNBQVMsd0NBQWUsQ0FBQztBQUFBLElBQ3REO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
