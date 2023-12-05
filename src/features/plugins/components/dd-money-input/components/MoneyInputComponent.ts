import { Prop, Component, Vue, Watch } from 'vue-property-decorator'
import helper from './MoneyInputHelper'

@Component
export default class MoneyInputComponent extends Vue {
  @Prop({ type: Boolean, default: false })
  readonly disabled!: boolean

  @Prop({ type: Boolean, default: false })
  readonly flat!: boolean

  @Prop({ type: Boolean, default: false })
  readonly dense!: boolean

  @Prop({ type: Boolean, default: false })
  readonly hideDetails!: boolean

  @Prop({ type: Boolean })
  readonly outlined!: boolean

  @Prop({ type: String, default: '' })
  readonly autocomplete!: string

  @Prop({ type: String, default: '' })
  readonly hint!: string

  @Prop({ type: Boolean, default: false })
  readonly persistentHint!: boolean

  @Prop({ type: Boolean, default: false })
  readonly loading!: boolean

  @Prop({ type: Boolean, default: false })
  readonly readonly!: boolean

  @Prop({ type: String, default: '' })
  readonly label!: string

  @Prop({ type: Number, default: null })
  readonly value!: number

  @Prop({ type: Array, default: () => [] })
  readonly rules!: Array<() => string | boolean>

  @Prop({ type: Number, default: null })
  readonly width!: number

  @Prop({ type: Boolean, default: false })
  readonly clearable!: boolean

  @Prop({ type: Number, default: 2 })
  readonly maximumFractionDigits!: number

  @Watch('value')
  onValueChange () {
    const input = this.$refs.moneyInput.$el.querySelector('input')
    this.formattedValue = helper.formatValueString(this.value, this.maximumFractionDigits)
    this.$nextTick(() => {
      if (input.value.length > this.length) {
        this.cursorStart++
        this.cursorEnd++
      }
      input.setSelectionRange(this.cursorStart, this.cursorEnd)
    })
  }

  time = new Date().getTime()
  date = ''
  formattedValue = ''
  showDatePickerMenu = false
  cursorStart = 0
  cursorEnd = 0
  length = 0
  $refs!: any

  mounted () {
    if (!this.value) return
    this.formattedValue = helper.formatValueString(this.value, this.maximumFractionDigits)
  }

  onBlur ($event: any) {
    this.$emit('blur', $event)
    const value = helper.formatValueNumber($event.target.value)
    this.$emit('input', value)
  }

  onFocus ($event: any) {
    this.$emit('focus', $event)
    $event.target.setSelectionRange(0, $event.target.value.length)
  }

  onInput ($event: string) {
    if (!$event) return
    const input = this.$refs.moneyInput.$el.querySelector('input')
    this.cursorStart = input.selectionStart
    this.cursorEnd = input.selectionEnd
    this.length = $event.length
    const value = helper.formatValueNumber($event)
    this.$emit('input', value)
  }
}
