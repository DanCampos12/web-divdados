import { ObjectiveEntity, Snackbar, UserEntity } from '@/models'
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { Mutation, State } from 'vuex-class'
import helper from './ObjectiveFormHelper'

@Component
export default class ObjectiveFormComponent extends Vue {
  @State('user', { namespace: 'auth' })
  readonly user!: UserEntity

  @Mutation('setSnackbar')
  readonly setSnackbar!: (snackbar: Snackbar) => void

  @Prop({ type: Boolean, default: false })
  readonly value!: boolean

  @Prop({ type: Object, default: new ObjectiveEntity() })
  readonly objectiveSelected!: ObjectiveEntity

  @Watch('value')
  onValueChange () {
    if (!this.value || !this.objectiveSelected.isEdit()) return
    this.objective = ObjectiveEntity.parse(this.objectiveSelected)
  }

  formValid = false
  operationInProgress = false
  objective = new ObjectiveEntity()

  $refs!: any
  rules: Record<string | number, (value: string) => boolean | string> = {
    required: (value: string) => !!value || 'Campo obrigatório'
  }

  async save () {
    try {
      this.operationInProgress = true
      const action = helper.getActionAPI(this.objective)
      this.objective.userId = this.user.id || ''
      await this.$store.dispatch(action, this.objective)
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
      this.objective = new ObjectiveEntity()
      this.$refs.form.resetValidation()
    }, 250)
  }

  disableForEditing (disableInEdit: boolean) {
    return helper.disableForEditing(this.objective, disableInEdit)
  }

  fieldHintMessage (disableInEdit: boolean) {
    return helper.fieldHintMessage(helper.disableForEditing(this.objective, disableInEdit))
  }

  get disableConfirmButton () {
    return helper.disableConfirmButton(this.formValid, this.operationInProgress, this.objective)
  }

  get formTitle () {
    return helper.getFormTitle(this.objective)
  }
}
