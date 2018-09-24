import Vue from 'vue'
import Vuex from 'vuex'
import income from './modules/Income'
import expense from './modules/Expense'
import expenseCategory from './modules/ExpenseCategory'
import budget from './modules/Budget'
import period from './modules/Period'
import configuration from './modules/Configuration'

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
    expenseCategory,
    budget,
    period,
    configuration
  }
})
