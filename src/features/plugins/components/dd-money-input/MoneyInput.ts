import { PluginFunction } from 'vue'
import MoneyInputComponent from './components/MoneyInputComponent.vue'

export class MoneyInput {
  install: PluginFunction<any> = (Vue) => {
    Vue.component('dd-money-input', MoneyInputComponent)
  }
}
