import Vue from 'vue'
import Vuex from 'vuex'
import addRoutes from './addRoutes'
import login from './login'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    addRoutes,
    login
  }
})

export default store
