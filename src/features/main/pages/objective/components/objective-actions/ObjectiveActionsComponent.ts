import { Objective, ObjectiveGridLayout, ReorderObjectiveDTO, Snackbar, UserEntity } from '@/models'
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Action, Mutation, State } from 'vuex-class'
import helper from './ObjectiveActionsHelper'

@Component
export default class ObjectiveActionsComponent extends Vue {
  @Action('reorderObjectives', { namespace: 'objective' })
  readonly reorderObjectives!: (reorderObjectiveDTO: ReorderObjectiveDTO) => Promise<Objective[]>

  @State('objectiveGridLayout', { namespace: 'objective' })
  readonly objectiveGridLayout!: ObjectiveGridLayout[]

  @State('tabSelected', { namespace: 'objective' })
  readonly tabSelected!: number

  @State('isEditMode', { namespace: 'objective' })
  readonly isEditMode!: boolean

  @State('user', { namespace: 'auth' })
  readonly user!: UserEntity

  @Mutation('setIsEditMode', { namespace: 'objective' })
  readonly setIsEditMode!: (value: boolean) => void

  @Mutation('setObjectiveGridLayout', { namespace: 'objective' })
  readonly setObjectiveGridLayout!: (objectives: Objective[]) => void

  @Mutation('setSnackbar')
  readonly setSnackbar!: (snackbar: Snackbar) => void

  @Prop({ type: Array, default: [] })
  readonly objectives!: Objective[]

  operationInProgress = false
  toggleIsEditButtonConfig: Record<number, { icon: string; description: string; color: string; }> = {
    0: { icon: 'mdi-pencil', description: 'Alterar Ordenação', color: 'blue' },
    1: { icon: 'mdi-close', description: 'Cancelar', color: 'error lighten-1' }
  }

  onIsEditModeChange (value: boolean) {
    this.setIsEditMode(value)
    if (!this.isEditMode) this.setObjectiveGridLayout(this.objectives)
  }

  async onReorderObjective () {
    try {
      this.operationInProgress = true
      const reorderObjectiveDTO = new ReorderObjectiveDTO(this.user.id || '', this.objectiveGridLayout)
      await this.reorderObjectives(reorderObjectiveDTO)
      this.setSnackbar({
        visible: true,
        color: 'green lighten-1',
        icon: 'mdi-check-circle',
        messages: ['Operação realizada com sucesso']
      })
      this.$emit('operationPerformed')
      this.setIsEditMode(false)
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

  get disableSabeOrderedButton () {
    return helper.disableSabeOrderedButton(this.operationInProgress, this.objectives, this.objectiveGridLayout)
  }

  get isMobile () {
    return this.$vuetify.breakpoint.xs || this.$vuetify.breakpoint.sm
  }
}
