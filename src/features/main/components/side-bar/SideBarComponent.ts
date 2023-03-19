import { Component, Vue } from 'vue-property-decorator'
import helper from './SideBarHelper'

type MenuOption = {
  key: string;
  name: string;
  to: string;
  icon: string;
}

@Component
export default class SideBarComponent extends Vue {
  pageSelected = ''
  menuOptions = [
    { key: 'home', name: 'Início', to: 'Main.Home', icon: 'mdi-home-circle-outline' },
    { key: 'operation', name: 'Operações', to: 'Main.Operation', icon: 'mdi-finance' },
    { key: 'event', name: 'Eventos', to: 'Main.Event', icon: 'mdi-calendar-check' },
    { key: 'objective', name: 'Objetivos', to: 'Main.Objective', icon: 'mdi-chart-bar-stacked' },
    { key: 'category', name: 'Categorias', to: 'Main.Category', icon: 'mdi-shape-outline' }
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

  get isMobile () {
    return this.$vuetify.breakpoint.mobile
  }
}
