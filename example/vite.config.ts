import { defineConfig } from 'vite'
import networkQr from 'vite-plugin-network-qr'

export default defineConfig({
  plugins: [
    networkQr({
      label: 'Scan this example',
    }),
  ],
})
