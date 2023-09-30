import { getTemplate } from '@/helpers'
import { Component, Prop, Vue } from 'vue-property-decorator'
import TemplateDesktop from './template-desktop/TemplateDesktop.vue'
import TemplateMobile from './template-mobile/TemplateMobile.vue'
import { Category, Operation } from '@/models'

@Component({
  components: {
    TemplateDesktop,
    TemplateMobile
  }
})
export default class OperationTableComponent extends Vue {
  @Prop({ type: Array, default: [] })
  readonly operations!: Operation[]

  @Prop({ type: Boolean, default: false })
  readonly loading!: boolean

  @Prop({ type: Array, default: [] })
  readonly categories!: Category[]

  get template () {
    return getTemplate(this.$vuetify.breakpoint.xs || this.$vuetify.breakpoint.sm)
  }
}
