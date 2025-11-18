import { defineConfig } from '@vben/vite-config';

export default defineConfig(async () => {
  return {
    application: {
      nitroMock: false, // 禁用mock服务
    },
    vite: {
      server: {
        proxy: {
          '/api': {
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api/, '/api/v1'),
            // SperoMind后端服务地址
            target: 'http://localhost:8080',
            ws: true,
          },
        },
      },
    },
  };
});
