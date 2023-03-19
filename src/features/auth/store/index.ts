import { Module } from 'vuex'
import { state } from './state'
import { actions } from './actions'
import { mutations } from './mutations'
import { RootState, AuthState } from '@/models'

export const auth: Module<AuthState, RootState> = {
  namespaced: true,
  actions,
  mutations,
  state
}
