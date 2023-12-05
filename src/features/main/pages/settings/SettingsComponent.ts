import { Component, Vue } from 'vue-property-decorator'
import SettingsBasicInfoComponent from './components/settings-basic-info/SettingsBasicInfoComponent.vue'
import SettingsChangePasswordComponent from './components/settings-change-password/SettingsChangePasswordComponent.vue'
import SettingsPreferenceComponent from './components/settings-preference/SettingsPreferenceComponent.vue'

@Component({
  components: {
    SettingsBasicInfoComponent,
    SettingsChangePasswordComponent,
    SettingsPreferenceComponent
  }
})
export default class SettingsComponent extends Vue {
  get isMobile () {
    return this.$vuetify.breakpoint.xs || this.$vuetify.breakpoint.sm
  }
}
