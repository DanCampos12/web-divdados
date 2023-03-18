import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'
import pt from 'vuetify/src/locale/pt'

Vue.use(Vuetify)

export default new Vuetify({
  icons: {
    iconfont: 'mdi'
  },
  theme: {
    dark: false,
    options: {
      customProperties: true
    },
    themes: {
      light: {
        primary: '#17967F',
        offset: '#FFFFFF',
        action: '#E86C30',
        error: '#B71C1C',
        success: '#00C853',
        scroll: '#D1D1D1'
      },
      dark: {
        primary: '#17967F',
        offset: '#B71C1C',
        action: '#FF7043',
        success: '#00C853',
        scroll: '#616161'
      }
    }
  },
  lang: {
    locales: { pt },
    current: 'pt'
  }
})
