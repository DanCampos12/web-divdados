import { Module } from 'vuex'
import { state } from './state'
import { actions } from './actions'
import { mutations } from './mutations'
import { RootState, HomeState } from '@/models'

export const home: Module<HomeState, RootState> = {
  namespaced: true,
  actions,
  mutations,
  state
}
