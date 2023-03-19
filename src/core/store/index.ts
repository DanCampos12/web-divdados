import { RootState } from '@/models'
import Vue from 'vue'
import Vuex, { StoreOptions } from 'vuex'
import { auth } from '@/features/auth/store'

Vue.use(Vuex)

const store: StoreOptions<RootState> = {
  modules: {
    auth
  }
}

const vuexStore = new Vuex.Store<RootState>(store)
export default vuexStore
