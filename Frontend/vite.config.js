import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  server:{
    host:true,
    allowedHosts:[
            '75e9ad898c67.ngrok-free.app' 
    ]
  }
})
