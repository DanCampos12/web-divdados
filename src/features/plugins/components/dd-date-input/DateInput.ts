import { PluginFunction } from 'vue'
import DateInputComponent from './components/DateInputComponent.vue'

export class DateInput {
  install: PluginFunction<any> = (Vue) => {
    Vue.component('dd-date-input', DateInputComponent)
  }
}
