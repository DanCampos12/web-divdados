import { Component, Vue } from 'vue-property-decorator'
import SideBarComponent from './components/side-bar/SideBarComponent.vue'
import AppBarComponent from './components/app-bar/AppBarComponent.vue'
import FooterBarComponent from './components/footer-bar/FooterBarComponent.vue'

@Component({
  components: {
    SideBarComponent,
    AppBarComponent,
    FooterBarComponent
  }
})
export default class MainComponent extends Vue {
  sideBarVisible = false

  setSideBarVisible (value: boolean) {
    this.sideBarVisible = value
  }

  get isMobile () {
    return this.$vuetify.breakpoint.mobile
  }

  get showSideBar () {
    return !this.isMobile || this.sideBarVisible
  }
}
