import { PluginFunction } from 'vue'
import store from '@/core/store'

const THIRTY_MINUTES = 30 * 60 * 10000
const REFRESH_TOKEN = 'auth/refreshToken'

type AuthConfig = { id: string, idToken: string }

export class Authorizer {
  readonly install: PluginFunction<Authorizer> = (Vue) => {
    Vue.prototype.$authorizer = this
    Vue.$authorizer = this
  }

  setLocalStorageAuthConfig ({ id, idToken }: AuthConfig) {
    localStorage.setItem('authConfig', JSON.stringify({ id, idToken }))
    if (this.getLocalStorageAuthConfig().idToken) this.initializeValidateTokenTimer()
  }

  getLocalStorageAuthConfig () {
    return JSON.parse(localStorage.getItem('authConfig') || '{}') as AuthConfig
  }

  clearLocalStorageAuthConfig () {
    localStorage.setItem('authConfig', JSON.stringify('{}'))
  }

  async authorize () {
    try {
      const authConfig = this.getLocalStorageAuthConfig()
      if (!authConfig.idToken) return false
      await store.dispatch(REFRESH_TOKEN, authConfig)
      return true
    } catch {
      this.clearLocalStorageAuthConfig()
      return false
    }
  }

  async refreshToken () {
    try {
      const authConfig = this.getLocalStorageAuthConfig()
      await store.dispatch(REFRESH_TOKEN, authConfig)
    } catch {
      this.clearLocalStorageAuthConfig()
      window.location.reload()
    }
  }

  initializeValidateTokenTimer () {
    setInterval(async () => {
      await this.refreshToken()
    }, THIRTY_MINUTES)
  }
}
