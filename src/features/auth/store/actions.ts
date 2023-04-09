import { AuthState, RootState, UserEntity } from '@/models'
import { ActionTree, Commit } from 'vuex'
import { AuthService } from '../service/AuthService'
import Vue from 'vue'

export const actions: ActionTree<AuthState, RootState> = {
  async signUp (_, user: UserEntity) {
    try {
      const response = await AuthService.signUp(user)
      return response.data
    } catch (error: any) {
      throw error.response.data
    }
  },
  async signIn ({ commit }: { commit: Commit }, { email, password }: { email: string, password: string }) {
    try {
      const response = await AuthService.signIn({ email, password })
      const authConfig = {
        id: response.data.user.id || '',
        idToken: response.data.idToken
      }
      Vue.$authorizer.setLocalStorageAuthConfig(authConfig)
      commit('setUser', UserEntity.parse(response.data.user))
      return response.data
    } catch (error: any) {
      throw error.response.data
    }
  },
  async refreshToken ({ commit }: { commit: Commit }, { id, idToken }: { id: string; idToken: string }) {
    try {
      const response = await AuthService.refreshToken({ id, idToken })
      const authConfig = {
        id: response.data.user.id || '',
        idToken: response.data.idToken
      }
      Vue.$authorizer.setLocalStorageAuthConfig(authConfig)
      commit('setUser', UserEntity.parse(response.data.user))
      return response.data
    } catch (error: any) {
      throw error.response.data
    }
  },
  async signOut ({ commit }: { commit: Commit }, id: string) {
    try {
      const response = await AuthService.signOut(id)
      Vue.$authorizer.clearLocalStorageAuthConfig()
      commit('setUser', new UserEntity())
      return response.data
    } catch (error: any) {
      throw error.response.data
    }
  }
}
