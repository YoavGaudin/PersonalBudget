import * as types from '../types'
import {store} from '../store'
import axiosInstance from '../axios'

const emptyBudget = {databaseId: null, periodId: null, plannedExpenses: {}}

const state = {
  budgets: [],
}

const getters = {
  [types.BUDGET]: state => {
    const periodId = store.getters[types.ACTIVE_PERIOD]
    const budget = state.budgets.find(b => b.periodId === parseInt(periodId))
    return budget ? budget : emptyBudget
  },
  [types.TOTAL_EXPENSE]: state => {
    const periodId = store.getters[types.ACTIVE_PERIOD]
    const budget = state.budgets.find(budget => budget.periodId === parseInt(periodId))
    if (!budget) {
      state.budgets.push(Object.assign({}, emptyBudget, {periodId: periodId}))
      return {spent: 0, planned: 0}
    }
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
    const budgetIndex = state.budgets.indexOf(b => b.periodId === parseInt(periodId))
    if (budgetIndex) {
      const budget = Object.assign({}, state.budgets[budgetIndex], payload)
      state.budgets.splice(budgetIndex, 1, budget)
    } else {
      [types.ADD_BUDGET](payload)
    }
  },
  [types.SET_ALL_BUDGETS]: (state, payload) => {
    state.budgets = payload.slice()
  }
}

const actions = {
  [types.SAVE_BUDGETS]: ({ state }) => {
    axiosInstance.put('budgets.json', state.budgets)
      .then(response => {
        // JSON responses are automatically parsed.
        alert("Data has been saved to server")
      })
      .catch(e => {
        alert("Data failed to save")
      })
  },
  [types.LOAD_BUDGETS]: ({ state, commit }) => {
    axiosInstance.get('budgets.json')
      .then(response => {
        commit(types.SET_ALL_BUDGETS, response.data)
      })
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
