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
import moment from 'moment'

Vue.config.productionTip = false
Vue.use(VueDebounce)
moment.locale('pt-br')

new Vue({
  router,
  store,
  vuetify,
  authorizer,
  render: h => h(AppComponent)
}).$mount('#app')
