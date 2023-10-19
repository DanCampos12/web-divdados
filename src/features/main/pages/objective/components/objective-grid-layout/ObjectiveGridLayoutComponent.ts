import { Component, Prop, Vue } from 'vue-property-decorator'
import { GridLayout, GridItem } from 'vue-grid-layout'
import { Objective, ObjectiveEntity, ObjectiveGridLayout, Operation, OperationEntity, Snackbar } from '@/models'
import { Action, Mutation, State } from 'vuex-class'

@Component({
  components: {
    GridLayout,
    GridItem
  }
})
export default class ObjectiveGridLayoutComponent extends Vue {
  @Action('deleteObjective', { namespace: 'objective' })
  readonly deleteObjective!: (objective: ObjectiveEntity) => Promise<string>

  @Action('completeObjective', { namespace: 'objective' })
  readonly completeObjective!: ({ objective, shouldLaunchOperation }: {
    objective: ObjectiveEntity, shouldLaunchOperation: boolean }) => Promise<Objective>

  @Action('postOperation', { namespace: 'operation' })
  readonly postOperation!: (operation: OperationEntity) => Promise<Operation>

  @State('objectiveGridLayout', { namespace: 'objective' })
  readonly objectiveGridLayout!: ObjectiveGridLayout[]

  @State('isEditMode', { namespace: 'objective' })
  readonly isEditMode!: boolean

  @Mutation('setSnackbar')
  readonly setSnackbar!: (snackbar: Snackbar) => void

  @Prop({ type: Boolean, default: false })
  readonly loading!: boolean

  showDeleteDialog = false
  objectiveSelected = new ObjectiveEntity()
  operationInProgress = false
  showCompleteDialog = false
  shouldLaunchOperation = true
  statusConfig: Record<string, { icon: string; description: string; color: string; }> = {
    inProgress: { icon: 'mdi-progress-clock', description: 'Em progresso', color: 'grey' },
    completed: { icon: 'mdi-progress-check', description: 'Concluído', color: 'success' },
    expired: { icon: 'mdi-progress-close', description: 'Expirado', color: 'error' }
  }

  startDeleteObjective (objective: Objective) {
    this.showDeleteDialog = true
    this.objectiveSelected = ObjectiveEntity.parse(objective)
  }

  finishDeleteObjectiveProcess () {
    this.operationInProgress = false
    this.showDeleteDialog = false
    this.objectiveSelected = new ObjectiveEntity()
  }

  async onDeleteObjective () {
    try {
      this.operationInProgress = true
      await this.deleteObjective(this.objectiveSelected)
      this.setSnackbar({
        visible: true,
        color: 'green lighten-1',
        icon: 'mdi-check-circle',
        messages: ['Operação realizada com sucesso']
      })
      this.$emit('operationPerformed')
    } catch (errors: any) {
      this.setSnackbar({
        visible: true,
        color: 'red lighten-1',
        icon: 'mdi-alert-circle',
        messages: errors.map((e: any) => e.message)
      })
    } finally {
      this.finishDeleteObjectiveProcess()
    }
  }

  startCompleteObjective (objective: Objective) {
    this.showCompleteDialog = true
    this.objectiveSelected = ObjectiveEntity.parse(objective)
  }

  finishCompleteObjectiveProcess () {
    this.operationInProgress = false
    this.showCompleteDialog = false
    this.shouldLaunchOperation = true
    this.objectiveSelected = new ObjectiveEntity()
  }

  async onCompleteObjective () {
    try {
      this.operationInProgress = true
      await this.completeObjective({
        objective: this.objectiveSelected,
        shouldLaunchOperation: this.shouldLaunchOperation
      })
      this.setSnackbar({
        visible: true,
        color: 'green lighten-1',
        icon: 'mdi-check-circle',
        messages: ['Operação realizada com sucesso']
      })
      this.$emit('operationPerformed')
    } catch (errors: any) {
      this.setSnackbar({
        visible: true,
        color: 'red lighten-1',
        icon: 'mdi-alert-circle',
        messages: errors.map((e: any) => e.message)
      })
    } finally {
      this.finishCompleteObjectiveProcess()
    }
  }

  get isMobile () {
    return this.$vuetify.breakpoint.xs || this.$vuetify.breakpoint.sm
  }
}
