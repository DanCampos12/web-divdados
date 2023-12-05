import { PluginFunction } from 'vue'
import MoneyComponent from './components/MoneyComponent.vue'

export class Money {
  install: PluginFunction<any> = (Vue) => {
    Vue.component('dd-money', MoneyComponent)
  }
}
