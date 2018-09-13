import Vue from 'vue'
import Vuex from 'vuex'
import income from './modules/Income'
import expense from './modules/Expense'
import period from './modules/Period'

import actions from './actions'
import getters from './getters'
import mutations from './mutations'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    value: 0
  },
  getters,
  mutations,
  actions,
  modules: {
    income,
    expense,
    period
  }
})
