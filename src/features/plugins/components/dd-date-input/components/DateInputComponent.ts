import { Prop, Watch, Component, Vue } from 'vue-property-decorator'
import helper from './DateInputHelper'
import VMasker from 'vanilla-masker'
import moment from 'moment'

@Component
export default class DateInputComponent extends Vue {
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

  @Prop({ type: String, default: 'DD/MM/YYYY' })
  readonly inputFormat!: string

  @Prop({ type: String, default: 'YYYY-MM-DD' })
  readonly outputFormat!: string

  @Prop({ type: String, default: '99/99/9999' })
  readonly pattern!: string

  @Prop({ type: String, default: '' })
  readonly value!: string

  @Prop({ type: String })
  readonly name!: string

  @Prop({ type: Array, default: () => [] })
  readonly rules!: Array<() => string | boolean>

  @Prop({ type: Number, default: null })
  readonly width!: number

  @Prop({ type: Boolean, default: false })
  readonly clearable!: boolean

  @Watch('pattern')
  onPatternChange (newValue: string) {
    this.formattedValue = VMasker.toPattern(this.value, newValue)
  }

  @Watch('value')
  onValueChange (newValue: string) {
    if (!newValue) {
      this.formattedValue = ''
      return
    }

    if (newValue.length >= this.inputFormat.length) {
      this.date = moment(newValue).format(this.inputFormat)
      this.formattedValue = VMasker.toPattern(this.date, this.pattern)
    } else {
      this.formattedValue = VMasker.toPattern(newValue, this.pattern)
    }

    const input = this.$refs.dateInput.$el.querySelector('input')
    if (!input) return
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
  showWarningTooltip = false
  $refs!: any

  mounted () {
    const input = this.$refs.dateInput.$el.querySelector('input')
    input.maxLength = this.inputFormat.length
    if (!this.value) return
    const value = moment(this.value).format(this.inputFormat)
    this.formattedValue = VMasker.toPattern(value, this.pattern)
  }

  onBlur ($event: any) {
    this.$emit('blur', $event)
    const date = helper.completeDate($event.target.value)
    this.$emit('input', date.isValid() ? date.format(this.outputFormat) : '')
  }

  onFocus ($event: any) {
    this.$emit('focus', $event)
    $event.target.setSelectionRange(0, $event.target.value.length)
  }

  onInput ($event: string) {
    if (!$event) return
    const input = this.$refs.dateInput.$el.querySelector('input')
    this.cursorStart = input.selectionStart
    this.cursorEnd = input.selectionEnd
    this.length = $event.length

    if ($event.length === this.inputFormat.length) {
      const date = moment($event.split('/').join(''), 'DDMMYYYY').format(this.outputFormat)
      this.$emit('input', date)
      return
    }

    this.$emit('input', $event)
  }

  onDatePickerChange ($event: string) {
    this.date = $event
    this.$emit('input', this.date)
    this.showDatePickerMenu = false
  }

  get datePickerValue () {
    return (this.value.length === this.outputFormat.length) ? this.value : ''
  }
}
