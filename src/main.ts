import Vue from 'vue'
import AppComponent from './AppComponent.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './features/plugins/vuetify/vuetify'
import VueDebounce from 'vue-debounce'

Vue.config.productionTip = false
Vue.use(VueDebounce)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(AppComponent)
}).$mount('#app')
