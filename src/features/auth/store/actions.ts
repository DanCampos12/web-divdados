import { AuthState, ChangePasswordDTO, RootState, UpdatePreferenceDTO, UserEntity } from '@/models'
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
  async putUser ({ commit }: { commit: Commit }, user: UserEntity) {
    try {
      const response = await AuthService.putUser(user)
      commit('setUser', response.data)
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
      commit('setUser', response.data.user)
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
      commit('setUser', response.data.user)
      return response.data
    } catch (error: any) {
      throw error.response.data
    }
  },
  async changePassword ({ commit }: { commit: Commit }, changePasswordDTO: ChangePasswordDTO) {
    try {
      const response = await AuthService.changePassword(changePasswordDTO)
      const authConfig = {
        id: response.data.user.id || '',
        idToken: response.data.idToken
      }
      Vue.$authorizer.setLocalStorageAuthConfig(authConfig)
      commit('setUser', response.data.user)
      return response.data
    } catch (error: any) {
      throw error.response.data
    }
  },
  async updatePreferences ({ commit }: { commit: Commit }, updatePreferenceDTO: UpdatePreferenceDTO) {
    try {
      const response = await AuthService.updatePreferences(updatePreferenceDTO)
      commit('setUser', response.data)
      return response.data
    } catch (error: any) {
      throw error.response.data
    }
  },
  async signOut ({ commit }: { commit: Commit }) {
    try {
      Vue.$authorizer.clearLocalStorageAuthConfig()
      commit('setUser', new UserEntity())
    } catch (error: any) {
      throw error.response.data
    }
  }
}
