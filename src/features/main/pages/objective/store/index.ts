import { Module } from 'vuex'
import { state } from './state'
import { actions } from './actions'
import { mutations } from './mutations'
import { RootState, ObjectiveState } from '@/models'

export const objective: Module<ObjectiveState, RootState> = {
  namespaced: true,
  actions,
  mutations,
  state
}
