import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'node:path'
import { readdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('.', import.meta.url))

function getHtmlFiles(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = resolve(directory, entry.name)

    if (entry.isDirectory()) {
      return getHtmlFiles(fullPath)
    }

    return entry.isFile() && entry.name.endsWith('.html') ? [fullPath] : []
  })
}

export default defineConfig({
  plugins: [tailwindcss()],
  base: '/School-dashbord/',
  build: {
    rolldownOptions: {
      input: [
        resolve(root, 'index.html'),
        ...getHtmlFiles(resolve(root, 'pages')),
      ],
    },
  },
})