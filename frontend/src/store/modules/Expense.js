import * as types from '../types'
import { store } from '../../store/store'

const state = {
  expenses: [
    {categoryId: 0, id: 0, periodId: 1, total: 3000, desc: ''},
    {categoryId: 1, id: 1, periodId: 1, total: 2000, desc: ''},
    {categoryId: 2, id: 2, periodId: 1, total: 1500, desc: ''},
    {categoryId: 3, id: 3, periodId: 1, total: 1760, desc: ''}
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
