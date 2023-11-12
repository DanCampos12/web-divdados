import { Snackbar, UpdatePreferenceDTO, User, UserEntity } from '@/models'
import { Component, Vue } from 'vue-property-decorator'
import { Action, Mutation, State } from 'vuex-class'
import NotificationComponent from '../notification/NotificationComponent.vue'

@Component({
  components: {
    NotificationComponent
  }
})
export default class AppBarComponent extends Vue {
  @Action('signOut', { namespace: 'auth' })
  readonly signOut$!: () => Promise<void>

  @Action('updatePreferences', { namespace: 'auth' })
  readonly updatePreferences!: (updatePreferenceDTO: UpdatePreferenceDTO) => Promise<User>

  @Mutation('setSnackbar')
  readonly setSnackbar!: (snackbar: Snackbar) => void

  @State('user', { namespace: 'auth' })
  readonly user!: UserEntity

  @State('date', { namespace: 'home' })
  readonly date!: string

  @Mutation('setDate', { namespace: 'home' })
  readonly setDate!: (value: string) => void

  userEntity = new UserEntity()
  showDatePicker = false
  showSignOutDialog = false
  loading = false

  created () {
    this.userEntity = UserEntity.parse(this.user)
  }

  onDateChange ($event: string) {
    if ($event !== this.date) this.setDate($event)
    this.showDatePicker = false
  }

  async signOut () {
    try {
      this.loading = true
      this.signOut$()
      window.location.reload()
      this.setSnackbar({
        visible: true,
        color: 'green lighten-1',
        icon: 'mdi-check-circle',
        messages: ['Operação realizada com sucesso']
      })
    } catch (errors: any) {
      this.setSnackbar({
        visible: true,
        color: 'red lighten-1',
        icon: 'mdi-alert-circle',
        messages: errors.map((e: any) => e.message)
      })
    } finally {
      this.loading = false
      this.showSignOutDialog = false
    }
  }

  onThemeChange () {
    this.userEntity.toggleTheme()
    this.savePreference()
  }

  onDisplayValuesChange () {
    this.userEntity.toggleDisplayValues()
    this.savePreference()
  }

  async savePreference () {
    try {
      this.loading = true
      await this.updatePreferences(new UpdatePreferenceDTO(this.userEntity))
      this.userEntity = UserEntity.parse(this.user)
      this.$vuetify.theme.dark = this.user.preference.dark
    } finally {
      this.loading = false
    }
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
