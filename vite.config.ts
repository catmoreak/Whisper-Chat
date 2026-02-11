import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env.UPLOADTHING_TOKEN': JSON.stringify(process.env.UPLOADTHING_TOKEN),
  },
})
