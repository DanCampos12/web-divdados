import Vue from 'vue'
import AppComponent from './AppComponent.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './features/plugins/vuetify'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(AppComponent)
}).$mount('#app')
