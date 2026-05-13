import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "Claude Code CLI",
  description: "Documentation for the Claude Code CLI",
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Architecture', link: '/architecture' },
      { text: 'API', link: '/api/' }
    ],

    sidebar: [
      {
        text: 'Guide',
        items: [
          { text: 'Architecture', link: '/architecture' },
          { text: 'MCP Integration', link: '/mcp/' }
        ]
      },
      {
        text: 'API Reference',
        items: [
          { text: 'Overview', link: '/api/' },
          { text: 'Commands API', link: '/api/commands' },
          { text: 'Tools API', link: '/api/tools' },
          { text: 'Tasks API', link: '/api/tasks' },
          { text: 'Context API', link: '/api/context' }
        ]
      },
      {
        text: 'Tools',
        items: [
          { text: 'Built-in Tools', link: '/tools/built-in' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Ph34k/claude-code-sourcemap' }
    ]
  }
})