import { PluginFunction } from 'vue'
import DateComponent from './components/DateComponent.vue'

export class Date {
  install: PluginFunction<any> = (Vue) => {
    Vue.component('dd-date', DateComponent)
  }
}
