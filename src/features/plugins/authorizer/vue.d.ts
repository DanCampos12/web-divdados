import Vue from 'vue'
import { Authorizer } from './Authorizer'

declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    authorizer?: Authorizer;
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $authorizer: Authorizer;
  }
  interface VueConstructor {
    $authorizer: Authorizer;
  }
}
