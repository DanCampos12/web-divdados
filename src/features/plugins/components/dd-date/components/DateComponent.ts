import moment from 'moment'
import { Prop, Component, Vue } from 'vue-property-decorator'

@Component
export default class DateComponent extends Vue {
  @Prop({ type: String, default: 'DD/MM/YYYY' })
  readonly value!: string

  @Prop({ type: String, default: 'DD/MM/YYYY' })
  readonly format!: string

  get valueFormatted () {
    const date = moment(this.value)
    return date.isValid() ? moment(this.value).format(this.format) : ''
  }
}
