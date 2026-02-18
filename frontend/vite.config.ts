import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/ARK404/', // <-- your GitHub repo name
  plugins: [react()],
})
