import * as types from '../types'
import {store} from '../store'
import axiosInstance from '../axios'

const emptyBudget = {periodId: null, plannedExpenses: {}}

const copyPlannedExpenses = (expenses) => {
  return Object.entries(expenses).reduce((acc, item) => {
    const key = item[0]
    const value = Object.assign({}, item[1])
    acc[key] = value
    return acc
  }, {})
}
const copyBudget = (budget) => {
  let copy = {}
  copy['periodId'] = budget.periodId
  copy['plannedExpenses'] = copyPlannedExpenses(budget.plannedExpenses)
  return copy
}
const state = {
  budgets: [],
}

const getters = {
  [types.BUDGET]: state => {
    const periodId = store.getters[types.ACTIVE_PERIOD]
    const budget = state.budgets.find((b, i) => b.periodId === parseInt(periodId) || i === state.budgets.length - 1)
    return budget ? {periodId: periodId, plannedExpenses: copyPlannedExpenses(budget.plannedExpenses)} : emptyBudget
  },
  [types.TOTAL_EXPENSE]: state => {
    const budget = store.getters[types.BUDGET]
    return Object.values(budget.plannedExpenses).reduce((sum, e) => {
      sum.spent += e.spent
      sum.planned += e.planned
      return sum
    }, {spent: 0, planned: 0})
  }
}

const mutations = {
  [types.ADD_BUDGET]: (state, payload) => {
    const periodId = store.getters[types.ACTIVE_PERIOD]
    const newBudget = copyBudget(payload)
    state.budgets.push(newBudget)
  },
  [types.SET_BUDGET]: (state, payload) => {
    const periodId = store.getters[types.ACTIVE_PERIOD]
    const budgetIndex = state.budgets.indexOf(b => b.periodId === parseInt(periodId))
    if (budgetIndex >= 0) {
      const budget = Object.assign({}, state.budgets[budgetIndex], copyPlannedExpenses(payload.plannedExpenses))
      state.budgets.splice(budgetIndex, 1, budget)
    } else {
      const newBudget = Object.assign({}, {plannedExpenses: copyPlannedExpenses(payload.plannedExpenses), periodId: periodId})
      state.budgets.push(newBudget)
    }
  },
  [types.SET_ALL_BUDGETS]: (state, payload) => {
    state.budgets = payload.slice()
  }
}

const actions = {
  [types.SAVE_BUDGETS]: ({state}) => {
    axiosInstance.put('budgets.json', state.budgets)
      .then(response => {
        // JSON responses are automatically parsed.
        alert("Data has been saved to server")
      })
      .catch(e => {
        alert("Data failed to save")
      })
  },
  [types.LOAD_BUDGETS]: ({state, commit}) => {
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
