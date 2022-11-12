import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import path from 'path'

export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const proxyUrl = `http://localhost:${env.VITE_APP_SERVER_PORT}`

  return defineConfig({
    plugins: [react(), tsconfigPaths()],
    define: {
      'process.env.NODE_ENV': `"${mode}"`,
    },
    server: {
      port: env.PORT,
      proxy: {
        '/call': proxyUrl,
        '/get-signed-url': proxyUrl,
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    build: {
      target: 'es2015',
      outDir: 'build',
    },
    envPrefix: 'VITE_APP_',
  })
}
