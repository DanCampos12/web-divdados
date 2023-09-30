import { UserEntity } from '@/models'
import { Prop, Component, Vue } from 'vue-property-decorator'
import { State } from 'vuex-class'

@Component
export default class MoneyComponent extends Vue {
  @State('user', { namespace: 'auth' })
  readonly user!: UserEntity

  @Prop({ type: Number, default: null })
  readonly value!: number

  get valueFormatted () {
    const valueFormatted = this.value
      ? this.value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL', maximumFractionDigits: 2 })
      : 'R$ 0,00'

    return this.user.preference.displayValues ? valueFormatted : '0'.repeat(valueFormatted.length)
  }
}
