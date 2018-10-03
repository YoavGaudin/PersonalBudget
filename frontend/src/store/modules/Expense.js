import * as types from '../types'
import { store } from '../../store/store'

const state = {
  expenses: [
  ],
  maxId: 3
}

const getters = {
  [types.EXPENSES]: state => {
    const periodId = store.getters[types.ACTIVE_PERIOD]
    return state.expenses.filter((cat) => cat.periodId === parseInt(periodId))
  },
}

const mutations = {
  [types.ADD_EXPENSE]: (state, payload) => {
    const periodId = store.getters[types.ACTIVE_PERIOD]
    state.maxId++
    const expense = Object.assign({}, payload, {periodId: parseInt(periodId), id: state.maxId})
    state.expenses.push(expense)
    let budget = Object.assign({}, store.getters[types.BUDGET])
    budget.plannedExpenses = Object.assign({[expense.categoryId]: {planned: 0, spent: 0}}, budget.plannedExpenses)
    budget.plannedExpenses[expense.categoryId].spent += expense.total
    store.commit(types.SET_BUDGET, budget)
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
