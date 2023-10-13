import { PluginFunction } from 'vue'
import PercentComponent from './components/PercentComponent.vue'

export class Percent {
  install: PluginFunction<any> = (Vue) => {
    Vue.component('dd-percent', PercentComponent)
  }
}
