import { AuthState, RootState } from '@/models'
import { ActionTree, Commit } from 'vuex'
import { AuthService } from '../service/AuthService'

export const actions: ActionTree<AuthState, RootState> = {
  async signInWithCustomToken ({ commit }: { commit: Commit }, idToken: string) {
    try {
      const response = await AuthService.signInWithCustomToken(idToken)
      commit('setUser', response.data.user)
      return response.data.idToken || ''
    } catch (error: any) {
      throw error.response.data
    }
  },
  async signInWithEmailAndPassoword ({ commit }: { commit: Commit }, { email, password }:
    { email: string, password: string }) {
    try {
      const response = await AuthService.signInWithEmailAndPassoword({ email, password })
      commit('setUser', response.data.user)
      return response.data.idToken || ''
    } catch (error: any) {
      throw error.response.data
    }
  },
  async refreshToken (_, idToken: string) {
    try {
      const response = await AuthService.refreshToken(idToken)
      return response.data || ''
    } catch (error: any) {
      throw error.response.data
    }
  }
}
