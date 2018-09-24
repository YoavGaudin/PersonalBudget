import * as types from '../types'
import {store} from '../../store/store'

const state = {
  budgets: [
    {periodId: 0,
      plannedExpenses: {
        0: {planned: 3000, spent: 0},
        1: {planned: 1500, spent: 2000},
        2: {planned: 2000, spent: 1500},
        3: {planned: 1760, spent: 1760},
        4: {planned: 0, spent: 0}
      }}
  ]
}

const getters = {
  [types.BUDGET]: state => {
    const periodId = store.getters[types.ACTIVE_PERIOD]
    return state.budgets.find(b => b.periodId === parseInt(periodId))
  },
  [types.TOTAL_EXPENSE]: state => {
    const periodId = store.getters[types.ACTIVE_PERIOD]
    const budget = state.budgets.find(budget => budget.periodId === parseInt(periodId))
    if (budget) {
      return Object.values(budget.plannedExpenses).reduce((sum, e) => {
        sum.spent += e.spent
        sum.planned += e.planned
        return sum
      }, {spent: 0, planned: 0})
    }
    return null
  }
}

const mutations = {
  [types.ADD_BUDGET]: (state, payload) => {
    const periodId = store.getters[types.ACTIVE_PERIOD]
    const newBudjet = Object.assign({}, payload, {periodId: periodId})
    state.budgets.push(newBudjet)
  },
  [types.SET_BUDGET]: (state, payload) => {
    const periodId = store.getters[types.ACTIVE_PERIOD]
    let budget = state.budgets.find(b => b.periodId === parseInt(periodId))
    if (budget) {
      Object.assign(budget, payload)
    } else {
      [types.ADD_BUDGET](payload)
    }
  }
}

const actions = {

}

export default {
  state,
  mutations,
  actions,
  getters
}
