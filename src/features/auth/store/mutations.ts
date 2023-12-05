import { AuthState, User, UserEntity } from '@/models'
import { MutationTree } from 'vuex'

export const mutations: MutationTree<AuthState> = {
  setUser (state: AuthState, user: User) {
    state.user = UserEntity.parse(user)
  }
}
