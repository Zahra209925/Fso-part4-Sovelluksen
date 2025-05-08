import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: "https://github.com/Zahra209925/Fso-part4-Sovelluksen.git/",
  plugins: [react()],
})
