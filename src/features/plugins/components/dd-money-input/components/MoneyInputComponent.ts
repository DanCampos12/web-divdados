import { Prop, Component, Vue, Watch } from 'vue-property-decorator'
import helper from './MoneyInputHelper'
import Debounce from '@/helpers/Debounce'

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
  readonly fractionDigits!: number

  @Watch('value')
  onValueChange () {
    this.setDisplayValue(!this.isTyping)
  }

  displayValue = ''
  showDatePickerMenu = false
  isTyping = false
  debounce = new Debounce()

  mounted () {
    if (!this.value) return
    this.setDisplayValue(true)
  }

  onFocus ($event: { target: { value: string, setSelectionRange: (start: number, end: number) => void } }) {
    this.$emit('focus', $event)
    $event.target.setSelectionRange(0, $event.target.value.length)
  }

  onBlur ($event: { target: { value: string } }) {
    const value = helper.formatValueNumber($event.target.value)
    this.$emit('blur', value)
    this.setDisplayValue(true)
  }

  onInput ($event: string) {
    this.isTyping = true
    const value = helper.formatValueNumber($event)
    this.$emit('input', value)
    this.setDisplayValue(false, $event)
    this.debounce.wait(750, () => { this.isTyping = false })
  }

  setDisplayValue (formatWithZeros: boolean, originalValue?: string) {
    this.$nextTick(() => {
      this.displayValue = helper.formatValueString(this.value, this.fractionDigits, formatWithZeros, originalValue)
    })
  }
}
