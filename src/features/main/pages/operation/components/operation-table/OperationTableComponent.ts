import { getTemplate } from '@/helpers'
import { Component, Prop, Vue } from 'vue-property-decorator'
import TemplateDesktop from './template-desktop/TemplateDesktop.vue'
import TemplateMobile from './template-mobile/TemplateMobile.vue'
import { Operation, OperationEntity, Snackbar } from '@/models'
import { Action, Mutation } from 'vuex-class'

@Component({
  components: {
    TemplateDesktop,
    TemplateMobile
  }
})
export default class OperationTableComponent extends Vue {
  @Action('deleteOperation', { namespace: 'operation' })
  readonly deleteOperation!: (operation: OperationEntity) => Promise<string>

  @Action('effectOperation', { namespace: 'operation' })
  readonly effectOperation!: (operation: OperationEntity) => Promise<Operation>

  @Mutation('setSnackbar')
  readonly setSnackbar!: (snackbar: Snackbar) => void

  @Prop({ type: Array, default: [] })
  readonly operations!: Operation[]

  @Prop({ type: Boolean, default: false })
  readonly loading!: boolean

  operationSelected = new OperationEntity()
  showDeleteDialog = false
  showEffectDialog = false
  operationInProgress = false

  startDeleteOperation (operation: Operation) {
    this.showDeleteDialog = true
    this.operationSelected = OperationEntity.parse(operation)
  }

  finishDeleteOperationProcess () {
    this.operationInProgress = false
    this.showDeleteDialog = false
    this.operationSelected = new OperationEntity()
  }

  async onDeleteOperation () {
    try {
      this.operationInProgress = true
      await this.deleteOperation(this.operationSelected)
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
      this.finishDeleteOperationProcess()
    }
  }

  startEffectOperation (operation: Operation) {
    this.showEffectDialog = true
    this.operationSelected = OperationEntity.parse(operation)
  }

  finishEffectOperationProcess () {
    this.operationInProgress = false
    this.showEffectDialog = false
    this.operationSelected = new OperationEntity()
  }

  async onEffectOperation () {
    try {
      this.operationInProgress = true
      await this.effectOperation(this.operationSelected)
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
      this.finishEffectOperationProcess()
    }
  }

  get template () {
    return getTemplate(this.$vuetify.breakpoint.xs || this.$vuetify.breakpoint.sm)
  }
}
