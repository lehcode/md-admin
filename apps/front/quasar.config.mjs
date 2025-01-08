export default function (/* ctx */) {
  return {
    boot: [],
    css: [
      'app.scss'
    ],
    extras: [
      'material-icons',
      'material-icons-outlined',
      'material-icons-round',
      'material-icons-sharp'
    ],
    build: {
      target: {
        browser: ['es2019', 'edge88', 'firefox78', 'chrome87', 'safari13.1'],
        node: 'node16'
      },
      vueRouterMode: 'history',
      sassAddon: '@/scss/quasar-variables.scss'
    },
    framework: {
      config: {},
      plugins: [
        'Dialog',
        'Notify',
        'Loading'
      ],
      components: 'all',
      directives: ['Ripple', 'ClosePopup']
    }
  }
}