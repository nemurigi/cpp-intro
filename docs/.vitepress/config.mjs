import { defineConfig } from 'vitepress'

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function getSidebar() {
  const sidebar = []
  const docsDir = path.resolve(__dirname, '../../docs/pages')

  const files = fs.readdirSync(docsDir)

  files.forEach(file => {
    const filePath = path.join(docsDir, file)
    const stat = fs.statSync(filePath)

    if (!stat.isDirectory() && path.extname(file) === '.md') {
      const content = fs.readFileSync(filePath, 'utf-8')
      const titleMatch = content.match(/^(#+)\s+(.*)$/m)
      let title = titleMatch[2]
      let name = path.basename(file, '.md')

      sidebar.push({
        text: title,
        link: '/pages/'+name,
      })
    }
  })

  return sidebar
}

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "江添亮のC++入門",
  description: "『江添亮のC++入門』のvitepress移植",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    // search: {
    //   provider: 'local'
    // },
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' }
    ],

    sidebar: [
      {
        items: getSidebar()
        // text: 'Examples',
        // items: [
        //   { text: 'Markdown Examples', link: '/markdown-examples' },
        //   { text: 'Runtime API Examples', link: '/api-examples' }
        // ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  },
  markdown: {
    math: true
  }
})
