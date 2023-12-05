import { PluginFunction } from 'vue'
import store from '@/core/store'
export class Authorizer {
  readonly install: PluginFunction<Authorizer> = (Vue) => {
    Vue.prototype.$authorizer = this
    Vue.$authorizer = this
  }

  getLocalStorageIdToken () {
    return localStorage.getItem('idToken')
  }

  setLocalStorageIdToken (idToken: string) {
    localStorage.setItem('idToken', idToken)
  }

  async authorize (idTokenFromQuery?: string) {
    try {
      if (idTokenFromQuery) this.setLocalStorageIdToken(idTokenFromQuery)
      const idToken = this.getLocalStorageIdToken()
      if (!idToken) return false
      await store.dispatch('auth/refreshToken', { idToken })
      return true
    } catch {
      this.setLocalStorageIdToken('')
      return false
    }
  }
}
