import { Category, CategoryEntity, OperationEntity, Snackbar, UserEntity } from '@/models'
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { Action, Mutation, State } from 'vuex-class'
import helper from './OperationFormHelper'

@Component
export default class OperationFormComponent extends Vue {
  @Action('postCategory', { namespace: 'category' })
  readonly postCategory!: (category: CategoryEntity) => Promise<CategoryEntity>

  @State('user', { namespace: 'auth' })
  readonly user!: UserEntity

  @Mutation('setSnackbar')
  readonly setSnackbar!: (snackbar: Snackbar) => void

  @Prop({ type: Array, default: [] })
  readonly categories!: Category[]

  @Prop({ type: Boolean, default: false })
  readonly value!: boolean

  @Prop({ type: Object, default: new OperationEntity() })
  readonly operationSelected!: OperationEntity

  @Watch('value')
  onValueChange () {
    if (!this.value || !this.operationSelected.isEdit()) return
    this.operation = OperationEntity.parse(this.operationSelected)
  }

  formValid = false
  operationInProgress = false
  operation = new OperationEntity()
  isNewCategory = false
  category = new CategoryEntity()
  menuColor = false
  operationTypes = [
    { key: 'I', name: 'Entrada' },
    { key: 'O', name: 'Saída' }
  ]

  $refs!: any
  rules: Record<string, (value: string) => boolean | string> = {
    required: helper.rulesRequired
  }

  async save () {
    try {
      this.operationInProgress = true
      const action = helper.getActionAPI(this.operation)
      this.operation.userId = this.user.id || ''
      this.category.userId = this.user.id || ''
      if (this.isNewCategory) {
        const category = await this.postCategory(this.category)
        this.operation.categoryId = category.id || ''
      }
      await this.$store.dispatch(action, this.operation)
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
      this.operation = new OperationEntity()
      this.category = new CategoryEntity()
      this.isNewCategory = false
      this.menuColor = false
      this.$refs.form.resetValidation()
    }, 250)
  }

  disableForEditing (disableInEdit: boolean) {
    return helper.disableForEditing(this.operation, disableInEdit)
  }

  fieldHintMessage (disableInEdit: boolean, fieldType?: string) {
    if (fieldType === 'category' && this.isNewCategory) return 'Campo não editável'
    return helper.fieldHintMessage(helper.disableForEditing(this.operation, disableInEdit))
  }

  get disableConfirmButton () {
    return helper.disableConfirmButton(this.formValid, this.operationInProgress, this.operation)
  }

  get formTitle () {
    return helper.getFormTitle(this.operation)
  }
}
