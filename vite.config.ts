import { defineConfig } from '@vben/vite-config';
import ElementPlus from 'unplugin-element-plus/vite';

import UnpluginVueRouter from 'unplugin-vue-router/vite';

export default defineConfig(async () => {
  return {
    application: {},
    vite: {
      plugins: [
        ElementPlus({}),
        UnpluginVueRouter({
          dts: './typings/typed-router.d.ts',
          extensions: ['.page.vue', '.layout.vue'],
          routesFolder: [
            {
              extensions: ['.page.vue', '.layout.vue'],
              src: 'apps/core/src/pages',
              path: file => `core${file.slice(file.lastIndexOf('/apps/core/src/pages') + '/apps/core/src/pages'.length)}`,
            },
            {
              extensions: ['.page.vue', '.layout.vue'],
              src: 'apps/exam/src/pages',
              path: file => `exam${file.slice(file.lastIndexOf('/apps/exam/src/pages') + '/apps/exam/src/pages'.length)}`,
            },
          ],
        }),
      ],
      server: {
        proxy: {
          '/api': {
            changeOrigin: true,
            rewrite: path => path.replace(/^\/api/, ''),
            // mock代理目标地址
            target: 'http://localhost:5320/api',
            ws: true,
          },
        },
      },
    },
  };
});
