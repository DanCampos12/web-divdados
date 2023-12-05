import { Module } from 'vuex'
import { state } from './state'
import { actions } from './actions'
import { mutations } from './mutations'
import { RootState, CategoryState } from '@/models'

export const category: Module<CategoryState, RootState> = {
  namespaced: true,
  actions,
  mutations,
  state
}
