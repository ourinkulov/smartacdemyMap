import { defineConfig } from 'vite'
import EnvironmentPlugin from 'vite-plugin-environment'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react(),
    EnvironmentPlugin('all', { prefix: 'VITE_APP_' }),
  ],
})