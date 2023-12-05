import { getTemplate } from '@/helpers'
import { Component, Prop, Vue } from 'vue-property-decorator'
import TemplateDesktop from './template-desktop/TemplateDesktop.vue'
import TemplateMobile from './template-mobile/TemplateMobile.vue'
import { Event, EventEntity, Snackbar } from '@/models'
import { Action, Mutation } from 'vuex-class'

@Component({
  components: {
    TemplateDesktop,
    TemplateMobile
  }
})
export default class EventTableComponent extends Vue {
  @Action('deleteEvent', { namespace: 'event' })
  readonly deleteEvent!: (event: EventEntity) => Promise<string>

  @Mutation('setSnackbar')
  readonly setSnackbar!: (snackbar: Snackbar) => void

  @Prop({ type: Array, default: [] })
  readonly events!: Event[]

  @Prop({ type: Boolean, default: false })
  readonly loading!: boolean

  eventSelected = new EventEntity()
  showDeleteDialog = false
  showEffectDialog = false
  operationInProgress = false

  startDeleteEvent (event: Event) {
    this.showDeleteDialog = true
    this.eventSelected = EventEntity.parse(event)
  }

  finishDeleteEventProcess () {
    this.operationInProgress = false
    this.showDeleteDialog = false
    this.eventSelected = new EventEntity()
  }

  async onDeleteEvent () {
    try {
      this.operationInProgress = true
      await this.deleteEvent(this.eventSelected)
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
      this.finishDeleteEventProcess()
    }
  }

  get template () {
    return getTemplate(this.$vuetify.breakpoint.xs || this.$vuetify.breakpoint.sm)
  }
}
