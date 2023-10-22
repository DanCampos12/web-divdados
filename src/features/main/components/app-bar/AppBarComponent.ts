import { UserEntity } from '@/models'
import { Component, Vue } from 'vue-property-decorator'
import { Mutation, State } from 'vuex-class'

@Component
export default class AppBarComponent extends Vue {
  @State('user', { namespace: 'auth' })
  readonly user!: UserEntity

  @State('date', { namespace: 'home' })
  readonly date!: string

  @Mutation('setDate', { namespace: 'home' })
  readonly setDate!: (value: string) => void

  showDatePicker = false

  onDateChange ($event: string) {
    if ($event === this.date) return
    this.setDate($event)
    this.showDatePicker = false
  }

  get userInitials () {
    const initials = this.user.name.split(' ') || []
    if (initials.length > 1) return `${initials.shift()?.charAt(0)}${initials.pop()?.charAt(0)}`.toUpperCase()
    return `${initials.shift()?.charAt(0)}}`.toUpperCase() || ''
  }

  get isMobile () {
    return this.$vuetify.breakpoint.xs || this.$vuetify.breakpoint.sm
  }
}
