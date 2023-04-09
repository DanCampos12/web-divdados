import { Component, Vue } from 'vue-property-decorator'
import SideBarComponent from './components/side-bar/SideBarComponent.vue'
import AppBarComponent from './components/app-bar/AppBarComponent.vue'
import FooterBarComponent from './components/footer-bar/FooterBarComponent.vue'
import { State } from 'vuex-class'
import { UserEntity } from '@/models'

@Component({
  components: {
    SideBarComponent,
    AppBarComponent,
    FooterBarComponent
  }
})
export default class MainComponent extends Vue {
  @State('user', { namespace: 'auth' })
  readonly user!: UserEntity

  created () {
    if (!this.user.isLogged()) this.$router.replace({ name: 'Auth.SignIn' })
  }

  sideBarVisible = false

  setSideBarVisible (value: boolean) {
    this.sideBarVisible = value
  }

  get isMobile () {
    return this.$vuetify.breakpoint.xs || this.$vuetify.breakpoint.sm
  }

  get showSideBar () {
    return !this.isMobile || this.sideBarVisible
  }
}
