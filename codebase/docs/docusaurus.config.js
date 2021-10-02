module.exports = {
  title: 'Vuexy React Admin Template',
  tagline: 'Best selling, Production Ready, Carefully Crafted, Extensive Admin Template',
  url: 'https://pixinvent.com',
  baseUrl: '/demo/vuexy-react-admin-dashboard-template/documentation/',
  // url: 'https://your-docusaurus-test-site.com',
  // baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'facebook', // Usually your GitHub org/user name.
  projectName: 'vuexy-react', // Usually your repo name.
  themeConfig: {
    navbar: {
      title: 'Vuexy',
      logo: {
        alt: 'Vuexy',
        src: 'img/logo.png'
      },
      items: [
        { to: '/docs/', label: 'Guide', position: 'right' },
        { to: '/faq', label: 'FAQ', position: 'right' },
        { to: '/blog', label: 'Articles', position: 'right' },
        {
          href: 'https://pixinvent.com/demo/vuexy-react-admin-dashboard-template/landing/',
          label: 'Demo',
          position: 'right'
        },
        {
          href: 'https://1.envato.market/vuexy_admin',
          label: 'Purchase',
          position: 'right'
        }
      ]
    },
    prism: {
      theme: require('prism-react-renderer/themes/dracula'),
      defaultLanguage: 'jsx'
    },
    footer: {},
    colorMode: {
      disableSwitch: true
    }
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js')
        },
        blog: {
          path: './blog',
          showReadingTime: true
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css')
        }
      }
    ]
  ]
}
