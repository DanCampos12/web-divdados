import { Component, Vue } from 'vue-property-decorator'
import SideBarComponent from './components/side-bar/SideBarComponent.vue'
import AppBarComponent from './components/app-bar/AppBarComponent.vue'

@Component({
  components: {
    SideBarComponent,
    AppBarComponent
  }
})
export default class MainComponent extends Vue {

}
