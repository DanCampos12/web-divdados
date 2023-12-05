import { Category, CategoryEntity, EventEntity, EventPeriod, Snackbar, UserEntity } from '@/models'
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { Action, Mutation, State } from 'vuex-class'
import helper from './EventFormHelper'

@Component
export default class EventFormComponent extends Vue {
  @Action('postCategory', { namespace: 'category' })
  readonly postCategory!: (category: CategoryEntity) => Promise<CategoryEntity>

  @State('user', { namespace: 'auth' })
  readonly user!: UserEntity

  @State('eventPeriods', { namespace: 'event' })
  readonly eventPeriods!: EventPeriod[];

  @Mutation('setSnackbar')
  readonly setSnackbar!: (snackbar: Snackbar) => void

  @Prop({ type: Array, default: [] })
  readonly categories!: Category[]

  @Prop({ type: Boolean, default: false })
  readonly value!: boolean

  @Prop({ type: Object, default: new EventEntity() })
  readonly eventSelected!: EventEntity

  @Watch('value')
  onValueChange () {
    if (!this.value || !this.eventSelected.isEdit()) return
    this.event = EventEntity.parse(this.eventSelected)
  }

  formValid = false
  operationInProgress = false
  event = new EventEntity()
  isNewCategory = false
  category = new CategoryEntity()
  menuColor = false
  operationTypes = [
    { key: 'I', name: 'Entrada' },
    { key: 'O', name: 'Saída' }
  ]

  $refs!: any
  rules: Record<string | number, (value: string) => boolean | string> = {
    required: (value: string) => !!value || 'Campo obrigatório'
  }

  async save () {
    try {
      this.operationInProgress = true
      const action = helper.getActionAPI(this.event)
      this.event.userId = this.user.id || ''
      this.category.userId = this.user.id || ''
      if (this.isNewCategory) {
        const category = await this.postCategory(this.category)
        this.event.categoryId = category.id || ''
      }
      await this.$store.dispatch(action, this.event)
      this.setSnackbar({
        visible: true,
        color: 'green lighten-1',
        icon: 'mdi-check-circle',
        messages: ['Operação realizada com sucesso']
      })
      this.$emit('operationPerformed')
      this.cancel()
    } catch (errors: any) {
      this.setSnackbar({
        visible: true,
        color: 'red lighten-1',
        icon: 'mdi-alert-circle',
        messages: errors.map((e: any) => e.message)
      })
    } finally {
      this.operationInProgress = false
    }
  }

  cancel () {
    this.$emit('closeForm')
    setTimeout(() => {
      this.event = new EventEntity()
      this.category = new CategoryEntity()
      this.isNewCategory = false
      this.menuColor = false
      this.$refs.form.resetValidation()
    }, 250)
  }

  get disableForEditing () {
    return this.event.isEdit()
  }

  get fieldHintMessage () {
    return helper.fieldHintMessage(this.event)
  }

  get disableConfirmButton () {
    return helper.disableConfirmButton(this.formValid, this.operationInProgress)
  }

  get formTitle () {
    return helper.getFormTitle(this.event)
  }
}
