import { Category, CategoryState } from '@/models'
import { MutationTree } from 'vuex'

export const mutations: MutationTree<CategoryState> = {
  setCategories (state: CategoryState, payload?: Category[]) {
    state.categories = payload || []
  }
}
