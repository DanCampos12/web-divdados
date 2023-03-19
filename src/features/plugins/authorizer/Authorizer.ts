import { PluginFunction } from 'vue'
import store from '@/core/store'

const THIRTY_MINUTES = 30 * 60 * 10000
const SIGN_IN_WITH_CUSTOM_TOKEN = 'auth/signInWithCustomToken'
const REFRESH_TOKEN = 'auth/refreshToken'

export class Authorizer {
  readonly install: PluginFunction<Authorizer> = (Vue) => {
    Vue.prototype.$authorizer = this
    Vue.$authorizer = this
  }

  setLocalStorageIdToken (idToken: string) {
    localStorage.setItem('idToken', idToken)
    if (this.getLocalStorageIdToken()) this.initializeValidateTokenTimer()
  }

  getLocalStorageIdToken () {
    return localStorage.getItem('idToken') || ''
  }

  async authorize () {
    try {
      let idToken = this.getLocalStorageIdToken()
      if (!idToken) return false
      idToken = await store.dispatch(SIGN_IN_WITH_CUSTOM_TOKEN, idToken)
      this.setLocalStorageIdToken(idToken)
      return true
    } catch {
      this.setLocalStorageIdToken('')
      return false
    }
  }

  initializeValidateTokenTimer () {
    setInterval(async () => {
      let idToken = this.getLocalStorageIdToken()
      idToken = await store.dispatch(REFRESH_TOKEN, idToken)
      this.setLocalStorageIdToken(idToken)
    }, THIRTY_MINUTES)
  }
}
