import Vue from 'vue'
import AppComponent from './AppComponent.vue'
import './registerServiceWorker'
import router from './router'
import store from './core/store'
import vuetify from './features/plugins/vuetify/vuetify'
import VueDebounce from 'vue-debounce'
import authorizer from './features/plugins/authorizer'
import './features/plugins/components/dd-date-input'
import './features/plugins/components/dd-money-input'
import './features/plugins/components/dd-date'
import './features/plugins/components/dd-money'
import './features/plugins/components/dd-percent'
import moment from 'moment'
import { options, theme } from '@/helpers/Highcharts'
import Highcharts from 'highcharts'
import HighchartsVue from 'highcharts-vue'
import HighchartsMore from 'highcharts/highcharts-more'
import stockInit from 'highcharts/modules/stock'

Vue.config.productionTip = false

// highcharts-vue
stockInit(Highcharts)
HighchartsMore(Highcharts)
Highcharts.createElement('link', {
  href: 'https://fonts.googleapis.com/css?family=Dosis:400,600',
  rel: 'stylesheet',
  type: 'text/css'
}, undefined, document.getElementsByTagName('head')[0])
Highcharts.setOptions(theme)
Highcharts.setOptions(options)
Vue.use(HighchartsVue)

// vue-debounce
Vue.use(VueDebounce)

moment.locale('pt-br')

new Vue({
  router,
  store,
  vuetify,
  authorizer,
  render: h => h(AppComponent)
}).$mount('#app')
