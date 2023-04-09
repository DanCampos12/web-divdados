import { Snackbar, UserEntity } from '@/models'
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import helper from './SideBarHelper'
import { Action, Mutation, State } from 'vuex-class'

type MenuOption = {
  key: string;
  name: string;
  to: string;
  icon: string;
}

@Component
export default class SideBarComponent extends Vue {
  @Action('signOut', { namespace: 'auth' })
  readonly signOut$!: (id: string) => Promise<string>

  @State('user', { namespace: 'auth' })
  readonly user!: UserEntity

  @Prop({ type: Boolean, default: false })
  readonly value!: boolean

  @Mutation('setSnackbar')
  readonly setSnackbar!: (snackbar: Snackbar) => void

  @Watch('$route.name')
  onRouteChange () {
    this.setPageSelected()
  }

  showSignOutDialog = false
  loading = false
  pageSelected = ''
  menuOptions = [
    { key: 'home', name: 'Início', to: 'Main.Home', icon: 'mdi-home-circle-outline' },
    { key: 'operation', name: 'Operações', to: 'Main.Operation', icon: 'mdi-finance' },
    { key: 'event', name: 'Eventos', to: 'Main.Event', icon: 'mdi-calendar-check' },
    { key: 'objective', name: 'Objetivos', to: 'Main.Objective', icon: 'mdi-chart-bar-stacked' },
    { key: 'category', name: 'Categorias', to: 'Main.Category', icon: 'mdi-shape-outline' },
    { key: 'configuration', name: 'Configurações', to: 'Main.Configuration', icon: 'mdi-cog-outline' }
  ]

  onSelectMenu (item: MenuOption) {
    this.$router.push({ name: item.to })
    this.pageSelected = item.key
  }

  isPageSelected (key: string) {
    return helper.isPageSelected(this.pageSelected, key)
  }

  setPageSelected () {
    const page = this.menuOptions.find((item) => item.to === this.$route.name)
    this.pageSelected = (page || { key: '' }).key
  }

  created () {
    this.setPageSelected()
  }

  async signOut () {
    try {
      this.loading = true
      await this.signOut$(this.user.id || '')
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

  get isMobile () {
    return this.$vuetify.breakpoint.xs || this.$vuetify.breakpoint.sm
  }
}
