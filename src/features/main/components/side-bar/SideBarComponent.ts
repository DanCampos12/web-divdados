import { User, UserEntity } from '@/models'
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Mutation } from 'vuex-class'
import helper from './SideBarHelper'

type MenuOption = {
  key: string;
  name: string;
  to: string;
  icon: string;
}

@Component
export default class SideBarComponent extends Vue {
  @Mutation('setUser', { namespace: 'auth' })
  readonly setUser!: (user: User) => void

  @Prop({ type: Boolean, default: false })
  readonly value!: boolean

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

  created () {
    const page = this.menuOptions.find((item) => item.to === this.$route.name)
    this.pageSelected = (page || { key: '' }).key
  }

  signOut () {
    this.setUser(new UserEntity())
    this.$authorizer.setLocalStorageIdToken('')
    this.$router.push({ name: 'Auth.SignIn' })
  }

  get isMobile () {
    return this.$vuetify.breakpoint.mobile
  }
}
