import { CategoryEntity, Snackbar, UserEntity } from '@/models'
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { Mutation, State } from 'vuex-class'
import helper from './CategoryFormHelper'

@Component
export default class CategoryFormComponent extends Vue {
  @State('user', { namespace: 'auth' })
  readonly user!: UserEntity

  @Mutation('setSnackbar')
  readonly setSnackbar!: (snackbar: Snackbar) => void

  @Prop({ type: Boolean, default: false })
  readonly value!: boolean

  @Prop({ type: Object, default: new CategoryEntity() })
  readonly categorySelected!: CategoryEntity

  @Watch('value')
  onValueChange () {
    if (!this.value || !this.categorySelected.isEdit()) return
    this.category = CategoryEntity.parse(this.categorySelected)
  }

  formValid = false
  operationInProgress = false
  category = new CategoryEntity()
  menuColor = false
  $refs!: any
  rules: Record<string, (value: string) => boolean | string> = {
    required: (value: string) => !!value || 'Campo obrigatório'
  }

  async save () {
    try {
      this.operationInProgress = true
      const action = helper.getActionAPI(this.category)
      this.category.userId = this.user.id || ''
      await this.$store.dispatch(action, this.category)
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
      this.category = new CategoryEntity()
      this.$refs.form.resetValidation()
    }, 250)
  }

  get disableConfirmButton () {
    return helper.disableConfirmButton(this.formValid, this.operationInProgress, this.category.isAutomaticInput)
  }

  get fieldHintMessage () {
    return helper.fieldHintMessage(this.category.isAutomaticInput)
  }

  get formTitle () {
    return helper.getFormTitle(this.category)
  }
}
