import { Prop, Component, Vue } from 'vue-property-decorator'

@Component
export default class PercentComponent extends Vue {
  @Prop({ type: Number, default: null })
  readonly value!: number

  get valueFormatted () {
    return this.value
      ? this.value.toLocaleString('pt-br', { style: 'percent', maximumFractionDigits: 1 })
      : '0,0%'
  }
}
