import { Component, Vue, Watch } from 'vue-property-decorator'
import helper from './FooterBarHelper'

type MenuOption = {
  key: string;
  name: string;
  to: string;
  icon: string;
}

@Component
export default class FooterBarComponent extends Vue {
  @Watch('$route.name')
  onRouteChange () {
    this.setPageSelected()
  }

  pageSelected = ''
  menuOptions = [
    { key: 'home', name: 'Início', to: 'Main.Home', icon: 'mdi-home-circle-outline' },
    { key: 'operation', name: 'Operações', to: 'Main.Operation', icon: 'mdi-finance' },
    { key: 'event', name: 'Eventos', to: 'Main.Event', icon: 'mdi-calendar-sync' },
    { key: 'objective', name: 'Objetivos', to: 'Main.Objective', icon: 'mdi-bullseye-arrow' },
    { key: 'category', name: 'Categorias', to: 'Main.Category', icon: 'mdi-shape-outline' }
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

  get isPageConfig () {
    return this.$route.name === 'Main.Settings'
  }
}
