import { Component, Vue } from 'vue-property-decorator'
import ConfigurationBasicInfoComponent from './components/configuration-basic-info/ConfigurationBasicInfoComponent.vue'
import ConfigurationChangePasswordComponent from './components/configuration-change-password/ConfigurationChangePasswordComponent.vue'
import ConfigurationPreferenceComponent from './components/configuration-preference/ConfigurationPreferenceComponent.vue'

@Component({
  components: {
    ConfigurationBasicInfoComponent,
    ConfigurationChangePasswordComponent,
    ConfigurationPreferenceComponent
  }
})
export default class ConfigurationComponent extends Vue {
  get isMobile () {
    return this.$vuetify.breakpoint.xs || this.$vuetify.breakpoint.sm
  }
}
